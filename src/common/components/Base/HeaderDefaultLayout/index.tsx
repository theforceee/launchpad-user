import { Switch } from "@headlessui/react"
import clsx from "clsx"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useRouter } from "next/router"
import { HTMLAttributeAnchorTarget, useState } from "react"

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
    label: "Route 1",
    uri: "/c"
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
  const { asPath } = useRouter()
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState<boolean>(false)

  const handleOpenHeader = () => {
    setOpen((prevState) => !prevState)
  }

  const handleToogleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
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
                "text-main": asPath === item.uri
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
                "text-main": asPath === item.uri
              })}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="ml-auto">
          <Switch
            checked={theme === "dark"}
            onChange={handleToogleTheme}
            className={clsx(
              "relative inline-flex h-6 w-11 items-center rounded-full",
              theme === "dark" ? "bg-blue-600" : "bg-gray-200"
            )}
          >
            <span
              className={clsx(
                "inline-block h-4 w-4 transform rounded-full bg-white transition",
                theme === "dark" ? "translate-x-6" : "translate-x-1"
              )}
            />
          </Switch>
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
