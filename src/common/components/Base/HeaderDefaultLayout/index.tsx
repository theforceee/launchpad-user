import { get, post } from "@/common/request"
import { openModal } from "@components/Base/Modal"
import ConnectWalletDialog from "@components/Pages/LandingPage/ConnectWalletDialog"
import SwitchNetworkDialog from "@components/Pages/LandingPage/SwitchNetworkDialog"
import { URLS } from "@constants/index"
import { AppContext } from "@contexts/AppContext"
import iconSearch from "@images/icon-search.svg"
import iconWallet from "@images/icon-wallet.png"
import logoFull from "@images/logo-full.png"
import { Button, Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react"
import { displayWalletAddress, formatCurrency, setAccountToken } from "@utils/index"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { HTMLAttributeAnchorTarget, useContext, useState } from "react"
import { toast } from "react-toastify"
import { SiweMessage } from "siwe"
import { useAccount, useDisconnect, useNetwork, useSignMessage } from "wagmi"
import styles from "./header.module.scss"

type RouteTypes = {
  label: string
  uri: string
  target?: HTMLAttributeAnchorTarget
}

const mainRoutes: Array<RouteTypes> = [
  {
    label: "IDO",
    uri: URLS.IDO
  },
  {
    label: "INO",
    uri: URLS.INO
  },
  {
    label: "NFT",
    uri: URLS.NFT
  },
  {
    label: "Stats",
    uri: URLS.STATS
  },
  {
    label: "FAQ",
    uri: URLS.FAQ
  }
]

const userRoutes: Array<RouteTypes> = [
  {
    label: "Profile",
    uri: URLS.PROFILE + "#profile"
  },
  {
    label: "Staking",
    uri: URLS.PROFILE + "#staking"
  },
  {
    label: "Favorites",
    uri: URLS.PROFILE + "#favorite"
  }
]

const HeaderDefaultLayout = () => {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { isUserSigned } = useContext(AppContext)
  const { disconnect } = useDisconnect()
  const { signMessageAsync } = useSignMessage({
    onError(error) {
      toast.error("Fail to sign in: " + error.message)
    }
  })

  const [loadingSignIn, setLoadingSignIn] = useState<boolean>(false)
  const [openHeaderMobile, setOpenHeaderMobile] = useState<boolean>(false)
  const [openNetworkDialog, setOpenNetworkDialog] = useState<boolean>(false)

  const openConnectWallet = () => {
    openModal(ConnectWalletDialog)
  }

  const handleOpenHeader = () => {
    setOpenHeaderMobile((prevState) => !prevState)
  }

  const handleSignIn = async () => {
    setLoadingSignIn(true)
    try {
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
      setLoadingSignIn(false)

      if (!loginRes || loginRes.status !== 200) {
        toast.error("Fail to login: " + loginRes.message)
        return
      }

      const userToken = loginRes.data?.token?.token
      setAccountToken(address, userToken)
      window.location.reload()
    } catch (error) {
      console.log("Fail to login", error)
    }
  }

  const renderHeaderMobile = () => {
    if (!openHeaderMobile) return <></>

    return (
      <div className="fixed top-0 left-0 z-50 flex h-screen w-full flex-col overflow-y-auto bg-[#04060C] p-5 pb-8">
        <div className="flex justify-between">
          {/* <Image src={logo} alt="" />
          <Image
            src={iconClose}
            alt=""
            onClick={handleOpenHeader}
            className="cursor-pointer"
          /> */}
        </div>
        <div className="text-lg mt-10 flex w-full flex-col justify-center gap-6 text-center font-semibold text-white">
          {mainRoutes.map((item: RouteTypes, index: number) => (
            <Link
              key={index}
              href={item.uri}
              target={item?.target ?? "_self"}
              className={clsx("duration-500 hover:tracking-wider", {
                "text-main": router.asPath === item.uri
              })}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  const renderUserMenu = () => {
    return (
      <Popover placement="bottom-end">
        <PopoverHandler>
          <div className="pr-10">
            <Image alt="" src={iconWallet} className="cursor-pointer" />
          </div>
        </PopoverHandler>
        <PopoverContent
          className={clsx(
            styles.headerShadow,
            "z-30 mt-3 flex flex-col items-center rounded-[14px] border-none bg-main/80 py-5 px-6 text-14/18 text-white"
          )}
        >
          {isConnected ? (
            <>
              {!isUserSigned && (
                <button
                  onClick={handleSignIn}
                  disabled={loadingSignIn}
                  className="btnGradientOrange btnSmall mb-3 w-full"
                >
                  <span>{loadingSignIn ? "Signing In" : "Sign In"}</span>
                </button>
              )}
              <div
                className="flex cursor-pointer items-center text-[#0091FF]"
                onClick={() => setOpenNetworkDialog(true)}
              >
                <div className="mr-2 h-2 w-2 rounded-full bg-green-400"></div>
                <span className="">{chain?.name + " Network Connected"}</span>
              </div>

              <div className="relative mb-1 mt-4 grid grid-cols-2 rounded-xl bg-white/10 py-3 px-5 text-12/16">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-[20px] bg-[#000122] py-1 px-3 font-semibold">
                  BALANCES
                </div>
                <div className="flex flex-col border-r border-white/30 py-1 pr-3">
                  <div className="ml-auto flex">
                    <span className="text-white/80">1.44</span>
                    <span className="w-10 text-right font-semibold">ETH</span>
                  </div>
                  <div className="ml-auto mt-1 flex">
                    <span className="text-white/80">{formatCurrency("156233")}</span>
                    <span className="w-10 text-right font-semibold">USDT</span>
                  </div>
                </div>
                <div className="flex py-1 pl-3">
                  <span className="w-10 text-white/80">1,872</span>
                  <span className="font-semibold">BLAZE</span>
                </div>
              </div>

              {userRoutes.map((item: RouteTypes, index: number) => (
                <a
                  key={index}
                  href={item.uri}
                  target={item.target || "_self"}
                  className={clsx(
                    "mt-4 border-none outline-none duration-200 hover:text-blazeOrange",
                    {
                      "text-blazeOrange": router.pathname === item.uri
                    }
                  )}
                >
                  {item.label}
                </a>
              ))}
              <div
                className="mt-5 cursor-pointer border-none duration-200 hover:text-blazeOrange"
                onClick={() => disconnect()}
              >
                Log Out
              </div>

              <div className="mt-4 text-[#3A92F7]">{displayWalletAddress(address)}</div>
            </>
          ) : (
            <>
              <Button
                size="sm"
                color="deep-orange"
                className="flex items-center gap-3"
                onClick={openConnectWallet}
              >
                Connect Wallet
              </Button>
            </>
          )}
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <>
      <nav
        className={clsx(
          "absolute left-1/2 mt-3 flex h-[72px] w-full max-w-screen-main -translate-x-1/2 px-6"
          // "md:px-[120px]",
          // "xs:px-[60px]",
          // "pl-5 pr-6"
        )}
      >
        <div
          className={clsx(
            styles.headerShadow,
            "flex w-full items-center justify-between rounded-xl bg-main/70 pl-10 text-white"
          )}
        >
          <div className="flex w-full flex-1 items-center pr-10">
            <Link href={URLS.HOME}>
              <Image alt="" src={logoFull} />
            </Link>

            <div className="ml-12 flex h-12 w-full max-w-lg rounded-xl bg-white/20 px-[14px]">
              <Image alt="" src={iconSearch} />
              <input
                type="text"
                className="ml-2 w-full bg-transparent outline-none"
                placeholder="Search"
              />
            </div>
          </div>

          <div className={clsx("hidden items-center gap-12", "md:flex")}>
            {mainRoutes.map((item: RouteTypes, index: number) => (
              <Link
                key={index}
                href={item.uri}
                target={item?.target ?? "_self"}
                className={clsx("hover: duration-200", {
                  "text-blazeOrange": router.asPath === item.uri
                })}
              >
                {item.label}
              </Link>
            ))}

            {renderUserMenu()}
          </div>

          <div className={clsx("block cursor-pointer", "md:hidden")} onClick={handleOpenHeader}>
            {/* <Image src={iconMenu} alt="" width={25} /> */}
          </div>
        </div>
      </nav>

      {renderHeaderMobile()}

      <SwitchNetworkDialog
        handleClose={() => setOpenNetworkDialog(false)}
        show={openNetworkDialog}
      />
    </>
  )
}

export default HeaderDefaultLayout
