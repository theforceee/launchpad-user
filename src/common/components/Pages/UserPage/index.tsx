import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react"
import Image, { StaticImageData } from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import TabFavorite from "./TabFavorite"
import TabKyc from "./TabKyc"
import { TabPools } from "./TabPools"
import TabProfile from "./TabProfile"
import TabStaking from "./TabStaking"
import styles from "./user.module.scss"

import iconFavorite from "@images/profile/icon-favorite.png"
import iconKyc from "@images/profile/icon-kyc.png"
import iconPool from "@images/profile/icon-pool.png"
import iconProfile from "@images/profile/icon-profile.png"
import iconStaking from "@images/profile/icon-staking.png"

type UserTabTypes = {
  label: string
  icon: StaticImageData
  hash: string
  Element: any
}
const HASHES = {
  PROFILE: "#profile",
  POOLS: "#pools",
  STAKING: "#staking",
  KYC: "#kyc",
  FAVORITE: "#favorite"
}

const data: Array<UserTabTypes> = [
  {
    icon: iconProfile,
    label: "Profile",
    hash: HASHES.PROFILE,
    Element: TabProfile
  },
  {
    icon: iconPool,
    label: "Pools",
    hash: HASHES.POOLS,
    Element: TabPools
  },
  {
    icon: iconStaking,
    label: "Staking",
    hash: HASHES.STAKING,
    Element: TabStaking
  },
  {
    icon: iconKyc,
    label: "KYC",
    hash: HASHES.KYC,
    Element: TabKyc
  },
  {
    icon: iconFavorite,
    label: "Favorite",
    hash: HASHES.FAVORITE,
    Element: TabFavorite
  }
]

const UserPage = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>()

  useEffect(() => {
    const hash = router.asPath.split("#")[1]
    if (!hash) {
      router.push(HASHES.PROFILE).catch()
      setActiveTab(HASHES.PROFILE)
      return
    }

    setActiveTab("#" + hash)
  }, [router])

  if (!activeTab) return <></>

  return (
    <div className="container">
      <div className="flex w-full pb-20 text-white">
        <div className={styles.userNav}>
          <Tabs value={activeTab}>
            <TabsHeader
              className="mx-auto h-[52px] !bg-[#151532]"
              indicatorProps={{
                className: "bg-[#504FBE] shadow-none"
              }}
            >
              {data.map(({ label, hash, icon }) => (
                <Tab
                  key={hash}
                  value={hash}
                  onClick={() => router.push(hash)}
                  className={"w-[180px] font-semibold text-white "}
                >
                  <div className="flex items-center justify-center">
                    <Image alt="" src={icon} className="mr-1 h-4 w-4" />
                    <span className="">{label}</span>
                  </div>
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody className="mx-auto mt-3 max-w-[1200px] rounded-[20px] bg-[#151532]">
              {data.map(({ hash, Element }) => (
                <TabPanel key={hash} value={hash}>
                  <Element />
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default UserPage
