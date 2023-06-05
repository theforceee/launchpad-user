import DefaultLayout from "@components/Layouts/DefaultLayout"
import IdoDetailPage from "@components/Pages/IdoDetailPage"
import { API_BASE_URL } from "@constants/index"
import useFetch, { fetcher } from "@hooks/useFetch"
import styles from "@styles/Home.module.css"
import type { GetServerSideProps, GetStaticPaths, NextPage } from "next"

const IdoDetail: NextPage = ({ slug }: any) => {
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

type Props = { slug: string | string[] | undefined }
export const getStaticProps: GetServerSideProps<Props> = async ({ params }) => {
  return {
    props: { slug: params?.slug }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: resPool } = await fetcher(`${API_BASE_URL}/pool`)

  const paths = resPool?.data.map((pool: any) => {
    return {
      params: { slug: pool?.slug }
    }
  })

  return {
    paths: paths,
    fallback: true
  }
}

export default IdoDetail
