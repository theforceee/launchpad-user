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
  wallet_address: Address
}

export const IdContext = createContext<IdContextValues>({} as IdContextValues)

export const useId = () => useContext<IdContextValues>(IdContext)

export function IdProvider({ children }: PropsWithChildren) {
  const [isSigningIn, setIsSigningIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { disconnect } = useDisconnect()
  const { signMessageAsync } = useSignMessage()

  const fetchUserInfo = useCallback(async () => {
    const userInfoRes = await get("info")
    setUser(userInfoRes.data)
  }, [])

  const clearUser = useCallback(async () => {
    clearAccountToken()
    setUser(null)
  }, [])

  const logout = useCallback(() => {
    clearUser()
    disconnect()
  }, [disconnect, clearUser])

  const login = useCallback(async () => {
    if (!address || !chain) return

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
        toast.error("Failed to sign in: " + loginRes.message)
        return
      }

      const userToken = loginRes.data?.token?.token
      saveUserData(address, userToken)

      await fetchUserInfo()
    } catch (err: any) {
      toast.error("Failed to sign in: " + err?.message || err)
    } finally {
      setIsSigningIn(false)
    }
  }, [chain, address])

  useEffect(() => {
    if (!isConnected) return

    const isWalletLocked = !address
    if (isWalletLocked) {
      clearUser()
      return
    }

    const userData = getUserData()
    if (!userData) {
      return
    }

    if (userData.wallet !== address) {
      logout()
      return
    }

    fetchUserInfo()
  }, [isConnected, address, logout, clearUser])

  // Show sign-in dialog after connecting wallet
  useEffect(() => {
    if (!isConnected || !address) return

    const userData = getUserData()
    if (!userData) {
      setTimeout(() => login(), 1000)
    }
  }, [isConnected, address, login])

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
