import clsx from "clsx"
import Link from "next/link"
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
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)

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
          {routes.map((item: RouteTypes, index: number) => (
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
          "absolute left-1/2 flex h-20 w-full max-w-screen-main -translate-x-1/2 items-center justify-between bg-fuchsia-800 text-white",
          "md:px-[120px]",
          "xs:px-[60px]",
          "pl-5 pr-6"
        )}
      >
        {/* <Link href="/">Logo</Link> */}
        <div className={clsx("hidden gap-5", "md:flex")}>
          {routes.map((item: RouteTypes, index: number) => (
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
