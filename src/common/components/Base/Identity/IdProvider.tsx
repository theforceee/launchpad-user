import { get, post } from "@/common/request"
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react"
import { toast } from "react-toastify"
import { SiweMessage } from "siwe"
import { Address, useAccount, useDisconnect, useNetwork, useSignMessage } from "wagmi"
import { clearAccountToken, getUserData, saveUserData } from "./helper"

type IdContextValues = {
  logout: () => void
  login: () => Promise<any>
  user: User | null
  isSigningIn: boolean
}

type User = {
  id: number
  wallet_address: string
  tier?: number | undefined
  position?: number | undefined
}

export const IdContext = createContext<IdContextValues>({} as IdContextValues)

export const useId = () => useContext<IdContextValues>(IdContext)

export function IdProvider({ children }: PropsWithChildren) {
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { disconnect } = useDisconnect()
  const { signMessageAsync } = useSignMessage({
    onError(error) {
      toast.error("Fail to sign in: " + error.message)
    }
  })

  const fetchUserInfo = useCallback(async () => {
    const userInfoRes = await get("info")
    const userData = userInfoRes.data
    setUser((prevUser) => ({
      ...prevUser,
      id: userData?.id,
      wallet_address: userData?.wallet_address
    }))
  }, [])

  const fetchUserStakedInfo = useCallback(async () => {
    const stakedRes = await get("staked-info", { account: address })
    const stakedData = stakedRes.data
    setUser((prevUser: any) => ({
      ...prevUser,
      tier: +stakedData?.tier?.tier,
      position: +stakedData?.userPosition
    }))
  }, [address])

  const logout = useCallback(() => {
    clearAccountToken()
    disconnect()
    setUser(null)
  }, [disconnect])

  useEffect(() => {
    const userdata = getUserData()
    if (userdata?.wallet === address) {
      fetchUserInfo()
      fetchUserStakedInfo()
      return
    }

    clearAccountToken()
    setUser(null)
  }, [address, fetchUserInfo, fetchUserStakedInfo])

  const login = useCallback(async () => {
    if (!address) return

    try {
      setIsSigningIn(true)
      const nonceRes = await get("nonce")
      const nonce = nonceRes?.data?.nonce

      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.id,
        nonce,
        issuedAt: new Date().toISOString()
      })

      const signature = await signMessageAsync({
        message: message.prepareMessage()
      })

      const loginRes = await post("login", {
        body: {
          message,
          signature
        }
      })

      if (!loginRes || loginRes.status !== 200) {
        toast.error("Fail to login: " + loginRes.message)
        return
      }

      const userToken = loginRes.data?.token?.token
      saveUserData(address, userToken)

      await fetchUserInfo()
      await fetchUserStakedInfo()
    } catch (err: any) {
      toast.error("Fail to login: " + err?.message || err)
    } finally {
      setIsSigningIn(false)
    }
  }, [address, chain?.id, signMessageAsync, fetchUserInfo, fetchUserStakedInfo])

  return (
    <IdContext.Provider
      value={{
        logout,
        login,
        user,
        isSigningIn
      }}
    >
      {children}
    </IdContext.Provider>
  )
}
