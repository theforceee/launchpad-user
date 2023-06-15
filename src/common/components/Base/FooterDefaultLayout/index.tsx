import clsx from "clsx"
import { ChangeEvent, ChangeEventHandler, HTMLAttributeAnchorTarget, useState } from "react"
import styles from "./footer.module.scss"
import Image from "next/image"

import poweredBy from "@images/powered.svg"
import iconDiscord from "@images/icon-discord.svg"
import iconTelegram from "@images/icon-telegram.svg"
import iconTwitter from "@images/icon-twitter.svg"
import { toast } from "react-toastify"

type BlazeSocialTypes = {
  iconUri: string
  uri: string
  target?: HTMLAttributeAnchorTarget | undefined
}
const blazeSocials: Array<BlazeSocialTypes> = [
  {
    iconUri: iconTelegram,
    uri: "https://telegram.org/"
  },
  {
    iconUri: iconTwitter,
    uri: "https://twitter.com/"
  },
  {
    iconUri: iconDiscord,
    uri: "https://discord.com/"
  }
]

const FooterDefaultLayout = () => {
  const [inputEmail, setInputEmail] = useState<string>("")

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value)
  }

  const handleSignUp = () => {
    toast.success(inputEmail)
  }

  return (
    <div className={clsx(styles.bgFooter, "w-full bg-black text-white")}>
      <div className="mx-auto flex h-[300px] max-w-screen-main justify-between !pt-20">
        <div className="ml-40 flex max-w-[400px] flex-col">
          <span className="text-28/36 font-bold">Stay Connected</span>
          <span className="mt-3 text-white/60">
            Join our mailing list to keep your finger on the pulse of the market.
          </span>
          <div className="mt-1 flex rounded-lg bg-white/20 p-[6px]">
            <input
              type="text"
              value={inputEmail}
              onChange={handleChangeEmail}
              placeholder="Enter your email address"
              className="w-full bg-transparent pl-1 pr-2 outline-none"
            />
            <div
              className="btnGradientPurple btnMedium !h-[38px] !w-[120px] !rounded-[6px]"
              onClick={handleSignUp}
            >
              <span>Sign up</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col pr-40">
            <span className="text-28/36 font-bold">Engage The Community</span>
            <span className="mt-3 text-white/60">Join our vibrant web3 community.</span>
          </div>
          <div className="mt-1 flex items-center space-x-5">
            {blazeSocials.map(({ iconUri, uri }: BlazeSocialTypes, index: number) => (
              <a href={uri} key={index} target="_blank">
                <Image src={iconUri} alt="" />
              </a>
            ))}
            <a href="#" className="btnBorderGradient btnSmall !h-[38px] !max-w-none px-8">
              <span>Help Center</span>
            </a>
            <Image src={poweredBy} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterDefaultLayout
