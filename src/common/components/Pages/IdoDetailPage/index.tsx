import fakeLogo from "@images/fake-project-logo.png"
import iconDiscord from "@images/icon-discord.svg"
import iconStar from "@images/icon-star-white.svg"
import iconTelegram from "@images/icon-telegram.svg"
import iconTwitter from "@images/icon-twitter.svg"
import iconUSDT from "@images/icon-usdt.png"
import { formatCurrency } from "@utils/index"
import BigNumber from "bignumber.js"
import clsx from "clsx"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import BuyTokenForm from "./BuyTokenForm"
import styles from "./idoDetail.module.scss"
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  Stepper,
  Step,
  Button,
  TabsHeader
} from "@material-tailwind/react"

const TABS = {
  PROJECT_INFO: "1",
  TOKEN_CLAIM: "2"
}
const PROJECT_TABS = {
  ABOUT: "about",
  LITEPAPER: "litepaper",
  TOKENOMICS: "tokenomics"
}

type StepTypes = {
  name: string
  subName?: string
  value: number
}
const timelineSteps: Array<StepTypes> = [
  {
    name: "WHITELIST",
    subName: "",
    value: 0
  },
  {
    name: "PRIVATE",
    subName: "(WL)",
    value: 1
  },
  {
    name: "PRIVATE",
    subName: "(FCFS)",
    value: 2
  },
  {
    name: "PUBLIC",
    subName: "(WL)",
    value: 3
  },
  {
    name: "PUBLIC",
    subName: "(FCFS)",
    value: 4
  },
  {
    name: "CLAIM",
    value: 5
  },
  {
    name: "CLOSED",
    value: 6
  }
]

type IdoDetailPageProps = {
  poolDetail: any
  loading?: boolean
}
const IdoDetailPage = (props: IdoDetailPageProps) => {
  const { poolDetail, loading } = props

  const [activeStep, setActiveStep] = useState<number>(4)
  const [activeTab, setActiveTab] = useState<(typeof TABS)[keyof typeof TABS]>(
    TABS.PROJECT_INFO
  )
  const [projectTab, setProjectTab] = useState<
    (typeof PROJECT_TABS)[keyof typeof PROJECT_TABS]
  >(PROJECT_TABS.ABOUT)

  useEffect(() => {
    console.log("IdoDetailPage", poolDetail, loading)
    console.log("PROJECT_TABS", Object.values(PROJECT_TABS))
  }, [poolDetail, loading])

  const totalRaise = useMemo(() => {
    if (!poolDetail?.pools) return 0
    const privatePool = poolDetail.pools[0]
    const publicPool = poolDetail.pools[1]

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
  }, [poolDetail?.pools])

  return (
    <div
      className={clsx(
        styles.banner,
        "blazePage section flex flex-col text-white"
      )}
    >
      <div className="flex pt-64">
        <div className="flex flex-1 flex-col pr-10">
          <div className="flex justify-between">
            <div className="flex pb-1">
              <div className="flex h-[100px] w-[100px] rounded-3xl">
                <Image src={fakeLogo} alt="" />
              </div>
              <div className="ml-5 flex flex-col pb-2">
                <div className="mt-auto flex items-center">
                  <span className="text-28/36 font-bold">
                    {poolDetail?.name || `Project’s Name`}
                  </span>
                  <Image src={iconStar} alt="" className="ml-2" />
                </div>
                <div className="mt-2 flex">
                  <span className="text-16/20 text-textGray">
                    {poolDetail?.token?.token_id || "$TOKEN"}
                  </span>
                  <div className="ml-5 flex space-x-3">
                    <a href={poolDetail?.telegram}>
                      <Image src={iconTelegram} alt="" />
                    </a>
                    <a href={poolDetail?.twitter}>
                      <Image src={iconTwitter} alt="" />
                    </a>
                    <a href={poolDetail?.discord}>
                      <Image src={iconDiscord} alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto flex pr-3">
              <div className="my-auto flex h-fit items-center justify-center rounded-[20px] bg-[#CCF9DC] py-[6px] px-[16px] text-14/20 font-bold text-[#00A63B]">
                IDO
              </div>
              <div className="ml-3 flex rounded bg-[#333350] px-3 py-2">
                <span className="">RAISING</span>
                <span className=" ml-1">{formatCurrency(totalRaise)}</span>
              </div>
              <div className="ml-1 flex items-center justify-center rounded bg-[#333350] px-3 py-2">
                <div className="h-4 w-4">
                  <Image src={iconUSDT} alt="" className="shrink-0" />
                </div>
                <span className="ml-[6px] text-[#00A63B]">USDT</span>
              </div>
            </div>
          </div>

          <div className="relative mt-5 h-24 rounded-[20px] bg-[#151532] px-5 py-4">
            <div className="mx-auto w-11/12">
              <Stepper
                activeStep={activeStep}
                lineClassName="bg-[#333350]"
                activeLineClassName="bg-[#504FBE]"
                // isLastStep={(value) => setIsLastStep(value)}
                // isFirstStep={(value) => setIsFirstStep(value)}
              >
                {timelineSteps.map(({ name, value, subName }: StepTypes) => (
                  <Step
                    className="h-4 w-4 bg-[#333350] shadow-none"
                    completedClassName="bg-[#504FBE]"
                    activeClassName="bg-[#504FBE]"
                    key={value}
                  >
                    <div
                      className={clsx(
                        "absolute -bottom-8 flex h-auto w-max shrink-0 flex-col text-center font-semibold",
                        activeStep >= value ? "text-white" : "text-white/50"
                      )}
                    >
                      <span className="">{name}</span>
                    </div>
                    <div className="absolute -bottom-12 flex h-auto w-max shrink-0 flex-col text-center text-14/18 font-normal text-textGray">
                      <span className="">{subName}</span>
                    </div>
                  </Step>
                ))}
              </Stepper>
            </div>
          </div>

          <div className="mt-5 flex flex-col">
            <div className="flex justify-between border-b border-[#333350]/50 pb-3">
              <div className="w-full max-w-[360px]">
                <Tabs value={activeTab}>
                  <TabsHeader
                    className="h-[52px] bg-[#151532]"
                    indicatorProps={{
                      className: "bg-[#504FBE] shadow-none"
                    }}
                  >
                    <Tab
                      value={TABS.PROJECT_INFO}
                      onClick={() => setActiveTab(TABS.PROJECT_INFO)}
                      className="font-semibold text-white"
                    >
                      Project Info
                    </Tab>
                    <Tab
                      value={TABS.TOKEN_CLAIM}
                      onClick={() => setActiveTab(TABS.TOKEN_CLAIM)}
                      className="font-semibold text-white"
                    >
                      Token Claim
                    </Tab>
                  </TabsHeader>
                </Tabs>
              </div>

              <div className="mt-auto flex space-x-1">
                {Object.values(PROJECT_TABS).map((item: any, index: number) => (
                  <div
                    className={clsx(
                      "flex cursor-pointer rounded-lg px-5 py-2 font-semibold capitalize duration-300 ease-linear",
                      projectTab === item
                        ? "bg-blazePurple text-white"
                        : "text-textGray"
                    )}
                    key={index}
                    onClick={() => setProjectTab(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {activeTab === TABS.PROJECT_INFO && (
              <div className="mt-5 flex w-full flex-col">
                <span className="text-18/24 font-semibold uppercase">
                  {projectTab}
                </span>
                {projectTab === PROJECT_TABS.ABOUT && (
                  <div
                    className="mt-3 text-16/24 text-[#CCCCD3]"
                    dangerouslySetInnerHTML={{ __html: poolDetail?.about }}
                  ></div>
                )}
                {projectTab === PROJECT_TABS.LITEPAPER && (
                  <div
                    className="mt-3 text-16/24 text-[#CCCCD3]"
                    dangerouslySetInnerHTML={{ __html: poolDetail?.litepaper }}
                  ></div>
                )}
                {projectTab === PROJECT_TABS.TOKENOMICS && (
                  <div className="mt-3 text-16/24 text-[#CCCCD3]">
                    Tokenomicccc
                  </div>
                )}
              </div>
            )}

            {activeTab === TABS.TOKEN_CLAIM && (
              <div className=""> Claim emissions ....</div>
            )}
          </div>
        </div>

        <BuyTokenForm poolDetail={poolDetail} />
      </div>
    </div>
  )
}

export default IdoDetailPage
