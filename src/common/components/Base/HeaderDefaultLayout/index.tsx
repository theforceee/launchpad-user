import { Switch } from "@headlessui/react"
import clsx from "clsx"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useRouter } from "next/router"
import { HTMLAttributeAnchorTarget, useState } from "react"
import { useTranslation } from "react-i18next"

type RouteTypes = {
  label: string
  uri: string
  target?: HTMLAttributeAnchorTarget
}

const routes: Array<RouteTypes> = [
  {
    label: "Home",
    uri: "/"
  },
  {
    label: "User Page",
    uri: "/user"
  },
  {
    label: "Route 2",
    uri: "https://bscscan.com/",
    target: "_blank"
  },
  {
    label: "Route 3",
    uri: "/r"
  }
]

const HeaderDefaultLayout = () => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState<boolean>(false)

  const handleOpenHeader = () => {
    setOpen((prevState) => !prevState)
  }

  const handleToogleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleLanguageChange = (language: string | undefined) => {
    i18n.changeLanguage(language)
    router.push(router.pathname, router.asPath, { locale: language })
  }

  const renderHeaderMobile = () => {
    if (!open) return <></>

    return (
      <div className="fixed top-0 left-0 w-full h-screen overflow-y-auto bg-[#04060C] flex flex-col p-5 pb-8 z-50">
        <div className="flex justify-between">
          {/* <Image src={logo} alt="" />
          <Image
            src={iconClose}
            alt=""
            onClick={handleOpenHeader}
            className="cursor-pointer"
          /> */}
        </div>
        <div className="flex flex-col gap-6 text-white justify-center w-full text-center text-lg font-semibold mt-10">
          {routes.map((item: RouteTypes, index: number) => (
            <Link
              key={index}
              href={item.uri}
              target={item?.target ?? "_self"}
              className={clsx("hover:tracking-wider duration-500", {
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
          "absolute -translate-x-1/2 left-1/2 h-20 w-full flex items-center justify-between max-w-screen-main bg-fuchsia-800 text-white",
          "md:px-[120px]",
          "xs:px-[60px]",
          "pl-5 pr-6"
        )}
      >
        {/* <Link href="/">Logo</Link> */}
        <div className={clsx("gap-5 hidden", "md:flex")}>
          {routes.map((item: RouteTypes, index: number) => (
            <Link
              key={index}
              href={item.uri}
              target={item?.target ?? "_self"}
              className={clsx("hover:tracking-wider duration-500", {
                "text-main": router.asPath === item.uri
              })}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="ml-auto flex items-center">
          <Switch
            checked={theme === "dark"}
            onChange={handleToogleTheme}
            className={clsx(
              "relative inline-flex h-6 w-11 items-center rounded-full",
              "bg-gray-200",
              "dark:bg-blue-600"
            )}
          >
            <span
              className={clsx(
                "inline-block h-4 w-4 transform rounded-full bg-white transition",
                "translate-x-1",
                "dark:translate-x-6"
              )}
            />
          </Switch>

          <div className="flex gap-3 ml-10">
            <button
              className="text-yellow-500 font-semibold p-2"
              onClick={() => handleLanguageChange("en")}
            >
              EN
            </button>
            <button
              className="text-yellow-500 font-semibold p-2"
              onClick={() => handleLanguageChange("vi")}
            >
              VI
            </button>
          </div>
        </div>
        <div
          className={clsx("block cursor-pointer", "md:hidden")}
          onClick={handleOpenHeader}
        >
          {/* <Image src={iconMenu} alt="" width={25} /> */}
        </div>
      </nav>

      {renderHeaderMobile()}
    </>
  )
}

export default HeaderDefaultLayout
