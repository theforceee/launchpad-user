import AppProvider from "@/common/contexts/AppProvider"
import { wagmiConfig } from "@constants/wagmiConfigs"
import "@styles/globals.css"
import { ModalContainer } from "@components/Base/Modal"
import type { AppProps } from "next/app"
import { useEffect } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { WagmiConfig } from "wagmi"

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    wagmiConfig.autoConnect()
  }, [])

  return (
    <WagmiConfig config={wagmiConfig}>
      <AppProvider>
        <Component {...pageProps} />
        <ModalContainer />
      </AppProvider>
      <ToastContainer />
    </WagmiConfig>
  )
}
