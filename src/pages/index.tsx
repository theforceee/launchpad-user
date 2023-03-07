import DefaultLayout from "@/components/Layouts/DefaultLayout"
import LandingPage from "@/components/Pages/LandingPage"
import styles from "@/styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <DefaultLayout title="Firebird">
        <LandingPage />
      </DefaultLayout>
    </div>
  )
}
