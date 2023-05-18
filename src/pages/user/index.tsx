import DefaultLayout from "@components/Layouts/DefaultLayout"
import UserPage from "@components/Pages/UserPage"
import styles from "@styles/Home.module.css"

export default function User() {
  return (
    <div className={styles.container}>
      <DefaultLayout title="TRAILBLAZE">
        <UserPage />
      </DefaultLayout>
    </div>
  )
}
