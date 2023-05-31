import DefaultLayout from "@components/Layouts/DefaultLayout"
import IdoPage from "@components/Pages/IdoPage"
import styles from "@styles/Home.module.css"

export default function IDO() {
  return (
    <div className={styles.container}>
      <DefaultLayout title="TRAILBLAZE">
        <IdoPage />
      </DefaultLayout>
    </div>
  )
}
