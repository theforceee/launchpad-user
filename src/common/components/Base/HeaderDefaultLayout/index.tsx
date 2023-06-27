import { URLS } from "@constants/index"
import iconSearch from "@images/icon-search.svg"
import logoFull from "@images/logo-full.png"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { HTMLAttributeAnchorTarget, useState } from "react"
import styles from "./header.module.scss"
import { UserMenu } from "./UserMenu"

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
  const [openHeaderMobile, setOpenHeaderMobile] = useState<boolean>(false)

  const handleOpenHeader = () => {
    setOpenHeaderMobile((prevState) => !prevState)
  }

  const renderHeaderMobile = () => {
    if (!openHeaderMobile) return <></>

    return (
      <div className="fixed top-0 left-0 z-50 flex h-screen w-full flex-col overflow-y-auto bg-clr-purple-60 p-5 pb-8">
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

            <UserMenu />
          </div>

          <div className={clsx("block cursor-pointer", "md:hidden")} onClick={handleOpenHeader}>
            {/* <Image src={iconMenu} alt="" width={25} /> */}
          </div>
        </div>
      </nav>

      {renderHeaderMobile()}
    </>
  )
}

export default HeaderDefaultLayout
