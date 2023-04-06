import FooterDefaultLayout from "@components/Base/FooterDefaultLayout"
import HeaderDefaultLayout from "@components/Base/HeaderDefaultLayout"
import MainDefaultLayout from "@components/Base/MainDefaultLayout"
import { headDefault } from "@constants/index"
import Head from "next/head"

type LayoutProps = {
  children?: any
  title?: string
  image?: string
  description?: string
}
const DefaultLayout = (props: LayoutProps) => {
  const { children, description, image, title } = props
  const {
    description: defaultDescription,
    image: defaultImage,
    title: defaultTitle,
    keywords: defaultKeywords
  } = headDefault

  return (
    <>
      <Head>
        <title>{title || defaultTitle}</title>
        <meta charSet="utf-8" />
        {/* <link rel="shortcut icon" href="/logo.svg" /> */}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={title || defaultTitle} key="title" />
        <meta
          property="og:description"
          content={description || defaultDescription}
          key="description"
        />
        <meta property="og:image" content={image || defaultImage} key="image" />
        <meta name="keywords" content={defaultKeywords}></meta>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title || defaultTitle} />
        <meta
          name="twitter:description"
          content={description || defaultDescription}
        />
        <meta name="twitter:image" content={image || defaultImage} />
      </Head>

      <HeaderDefaultLayout />
      <MainDefaultLayout>{children}</MainDefaultLayout>
      <FooterDefaultLayout />
    </>
  )
}

export default DefaultLayout
