import clsx from "clsx"
import React, { useMemo, useState } from "react"
import styles from "./card.module.scss"
import Image from "next/image"
import { URLS, currencies } from "@constants/index"
import BigNumber from "bignumber.js"
import { formatCurrency } from "@utils/index"

import fakeImage from "@images/fake-project-image.png"
import fakeLogo from "@images/fake-project-logo.png"
import iconFavorite from "@images/icon-favorite.svg"
import iconFavoriteChecked from "@images/icon-favorite-checked.svg"
import iconNotification from "@images/icon-notification.svg"
import iconNotificationChecked from "@images/icon-notification-checked.svg"

type CardProps = {
  cardData: any
}

const Card = (props: CardProps) => {
  const { cardData } = props

  const [favoriteChecked, setFavoriteChecked] = useState<boolean>(false)
  const [notiChecked, setNotiChecked] = useState<boolean>(false)

  const totalRaise = useMemo(() => {
    if (!cardData?.pools) return 0
    const privatePool = cardData.pools[0]
    const publicPool = cardData.pools[1]

    const privateRaise = privatePool
      ? new BigNumber(privatePool.token_allocated ?? 0).multipliedBy(
          privatePool.conversion_rate ?? 0
        )
      : 0
    const publicRaise = publicPool
      ? new BigNumber(publicPool.token_allocated ?? 0).multipliedBy(
          publicPool.conversion_rate ?? 0
        )
      : 0

    return new BigNumber(privateRaise).plus(publicRaise).toNumber()
  }, [cardData?.pools])

  const displayCurrency = (pools: Array<any> | undefined) => {
    if (!pools) return "N/A"

    return pools[0].accepted_currency ?? currencies.NATIVE
  }

  const handleFavorite = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    slug: string
  ) => {
    event.preventDefault()
    setFavoriteChecked((prev) => !prev)
  }
  const handleNotification = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    slug: string
  ) => {
    event.preventDefault()
    setNotiChecked((prev) => !prev)
  }

  if (!cardData) return <></>

  return (
    <div className={clsx(styles.cardHover, "relative flex")}>
      <div className={clsx(styles.hoverContent, "z-20 flex bg-[#333350]/90")}>
        <a
          href={`${URLS.IDO}/${cardData?.slug}`}
          className={clsx(styles.btnViewProject)}
        >
          View Project
        </a>
        <div className="absolute top-3 right-3 flex space-x-1">
          <div
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-white"
            onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              handleFavorite(event, cardData?.slug)
            }
          >
            <Image
              src={favoriteChecked ? iconFavoriteChecked : iconFavorite}
              alt=""
            />
          </div>
          <div
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-white"
            onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              handleNotification(event, cardData?.slug)
            }
          >
            <Image
              src={notiChecked ? iconNotificationChecked : iconNotification}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className={clsx(styles.cardContent, "absolute z-10 flex flex-col")}>
        <div className="flex flex-col items-center p-3">
          <div className="relative w-full">
            <div className="absolute top-3 left-3 rounded-[20px] bg-[#CCF9DC] px-4 py-1 font-bold text-[#00A63B]">
              IDO
            </div>
            <div className="absolute left-1/2 -bottom-8 h-[60px] w-[60px] -translate-x-1/2">
              <Image src={fakeLogo} alt="" className="object-contain" />
            </div>
            <Image src={fakeImage} alt="" className="w-full object-contain" />
          </div>
          <div className="mt-12 text-24/32 font-bold text-white">
            {cardData?.name || `Project's name`}
          </div>
          <div className="mt-1 text-16/24 text-[#9999A7]">
            {cardData?.token?.token_id || `$TOKEN`}
          </div>
          <div className="mt-3 mb-2 flex gap-1">
            <div className="rounded bg-[#333350] px-3 py-2 text-white">
              <span className="">RAISING</span>
              <span className="ml-1">{formatCurrency(totalRaise)}</span>
            </div>
            <div className="rounded bg-[#333350] px-3 py-2">
              <span className="text-[#36C992]">
                {displayCurrency(cardData?.pools)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-center rounded-b-[20px] bg-[#504FBE] py-4 text-16/24 text-white">
          <span className="">Starts in</span>
          <div className="ml-2 font-semibold">{`44h : 13m : 10s`}</div>
        </div>
      </div>
    </div>
  )
}

export default Card
