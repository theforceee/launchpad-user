import ConnectWalletDialog from "@components/Pages/LandingPage/ConnectWalletDialog"
import SwitchNetworkDialog from "@components/Pages/LandingPage/SwitchNetworkDialog"
import { URLS } from "@constants/index"
import { Wallet } from "@constants/networks"
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler
} from "@material-tailwind/react"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { HTMLAttributeAnchorTarget, useEffect, useState } from "react"
import { useAccount, useDisconnect, useNetwork } from "wagmi"

import iconSearch from "@images/icon-search.svg"
import iconWallet from "@images/icon-wallet.png"
import logoFull from "@images/logo-full.png"

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
    uri: URLS.PROFILE
  },
  {
    label: "Staking",
    uri: URLS.STAKING
  },
  {
    label: "Favorites",
    uri: URLS.FAVORITES
  }
]

const HeaderDefaultLayout = () => {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { disconnect } = useDisconnect()

  const [open, setOpen] = useState<boolean>(false)

  const [openConnectDialog, setOpenConnectDialog] = useState<boolean>(false)
  const [openNetworkDialog, setOpenNetworkDialog] = useState<boolean>(false)

  useEffect(() => {
    isConnected && setOpenConnectDialog(false)
  }, [isConnected])

  async function handleSelectWallet(wallet: Wallet) {
    setOpenConnectDialog(false)
  }

  const handleOpenHeader = () => {
    setOpen((prevState) => !prevState)
  }

  const renderHeaderMobile = () => {
    if (!open) return <></>

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
        <div className="flex w-full items-center justify-between rounded-xl bg-main/80 pl-10 text-white">
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

            <Popover placement="bottom-end">
              <PopoverHandler>
                <div className="pr-10">
                  <Image alt="" src={iconWallet} className="cursor-pointer" />
                </div>
              </PopoverHandler>
              <PopoverContent className="mt-3 flex flex-col items-center rounded-[14px] border-none bg-main/80 py-5 px-6 text-14/18 text-white">
                {isConnected ? (
                  <>
                    <div
                      className="flex cursor-pointer items-center text-[#0091FF]"
                      onClick={() => setOpenNetworkDialog(true)}
                    >
                      <div className="mr-2 h-2 w-2 rounded-full bg-green-400"></div>
                      <span className="">{chain?.name}</span>
                    </div>
                    <div className="mt-2 text-blazeOrange">{address}</div>
                    {userRoutes.map((item: RouteTypes, index: number) => (
                      <a
                        key={index}
                        href={item.uri}
                        target={item.target || "_self"}
                        className="mt-5 border-none outline-none duration-200 hover:text-blazeOrange"
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
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      color="deep-orange"
                      className="flex items-center gap-3"
                      onClick={() => setOpenConnectDialog(true)}
                    >
                      Connect Wallet
                    </Button>
                  </>
                )}
              </PopoverContent>
            </Popover>
          </div>

          <div
            className={clsx("block cursor-pointer", "md:hidden")}
            onClick={handleOpenHeader}
          >
            {/* <Image src={iconMenu} alt="" width={25} /> */}
          </div>
        </div>
      </nav>

      {renderHeaderMobile()}

      <ConnectWalletDialog
        handleClose={() => setOpenConnectDialog(false)}
        show={openConnectDialog}
        onConnectWallet={handleSelectWallet}
      />

      <SwitchNetworkDialog
        handleClose={() => setOpenNetworkDialog(false)}
        show={openNetworkDialog}
      />
    </>
  )
}

export default HeaderDefaultLayout
