import DefaultLayout from "@components/Layouts/DefaultLayout"
import IdoDetailPage from "@components/Pages/IdoDetailPage"
import useFetch from "@hooks/useFetch"
import styles from "@styles/Home.module.css"
import type { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"

const IdoDetail: NextPage = ({ host }: any) => {
  const router = useRouter()
  const { slug } = router.query
  const { data: resPoolDetail, loading } = useFetch<any>(
    `/pool/${slug}`,
    !!slug
  )

  return (
    <div className={styles.container}>
      <DefaultLayout title="TRAILBLAZE">
        <IdoDetailPage poolDetail={resPoolDetail?.data} loading={loading} />
      </DefaultLayout>
    </div>
  )
}

type Props = { host: string | null }

export const getStaticProps: GetServerSideProps<Props> = async (context) => ({
  props: { host: context.req.headers.host || null }
})

export default IdoDetail
