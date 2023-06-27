import { openModal } from "@components/Base/Modal"
import { ConnectWalletDialog } from "@components/Pages/LandingPage/ConnectWalletDialog"
import { SwitchNetworkDialog } from "@components/Pages/LandingPage/SwitchNetworkDialog"
import { URLS } from "@constants/index"
import iconWallet from "@images/icon-wallet.png"
import { Button, Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react"
import { displayWalletAddress, formatCurrency } from "@utils/index"
import clsx from "clsx"
import Image from "next/image"
import { useRouter } from "next/router"
import { useAccount, useNetwork } from "wagmi"
import styles from "./header.module.scss"
import useUserAssets from "@hooks/useUserAssets"
import { useId } from "../Identity"

type Route = {
  label: string
  uri: string
}

const userRoutes: Route[] = [
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

export function UserMenu() {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { logout, login, user } = useId()

  const { blazeBalance, nativeBalanceData, usdtBalance } = useUserAssets()

  const openNetworkDialog = () => {
    openModal(SwitchNetworkDialog)
  }

  const openConnectWallet = () => {
    openModal(ConnectWalletDialog)
  }

  if (address && !user) {
    return (
      <div onClick={login}>
        <Image alt="" src={iconWallet} className="cursor-pointer" />
      </div>
    )
  }

  return (
    <Popover placement="bottom-end">
      <PopoverHandler>
        <div>
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
          user && (
            <>
              <div
                className="flex cursor-pointer items-center text-[#0091FF]"
                onClick={openNetworkDialog}
              >
                <div className="mr-2 h-2 w-2 rounded-full bg-green-400"></div>
                <span className="">{chain?.name}</span>
              </div>

              <div className="relative mb-1 mt-4 grid grid-cols-2 rounded-xl bg-white/10 py-3 px-5 text-12/16">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-[20px] bg-[#000122] py-1 px-3 font-semibold">
                  BALANCES
                </div>
                <div className="flex flex-col border-r border-white/30 py-1 pr-3">
                  <div className="ml-auto flex">
                    <span className="text-white/80">
                      {nativeBalanceData?.formatted
                        ? Math.floor(+nativeBalanceData.formatted * 100) / 100
                        : "-"}
                    </span>
                    <span className="w-10 text-right font-semibold">
                      {nativeBalanceData?.symbol}
                    </span>
                  </div>
                  <div className="ml-auto mt-1 flex">
                    <span className="text-white/80">
                      {usdtBalance ? formatCurrency(usdtBalance, 2) : "-"}
                    </span>
                    <span className="w-10 text-right font-semibold">USDT</span>
                  </div>
                </div>
                <div className="flex py-1 pl-3">
                  <span className="w-10 text-white/80">
                    {blazeBalance ? formatCurrency(blazeBalance, 2) : "-"}
                  </span>
                  <span className="font-semibold">BLAZE</span>
                </div>
              </div>

              {userRoutes.map((item, index: number) => (
                <a
                  key={index}
                  href={item.uri}
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
                onClick={logout}
              >
                Log Out
              </div>

              <div className="mt-4 text-[#3A92F7]">{displayWalletAddress(address)}</div>
            </>
          )
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
