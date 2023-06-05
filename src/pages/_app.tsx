import { wagmiClient } from "@constants/wagmiConfigs"
import useWallet from "@hooks/useWallet"
import "@styles/globals.css"
import type { AppProps } from "next/app"
import { useEffect } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { WagmiConfig } from "wagmi"

export default function App({ Component, pageProps }: AppProps) {
  const {} = useWallet()

  useEffect(() => {
    wagmiClient.autoConnect()
  }, [])

  return (
    <WagmiConfig client={wagmiClient}>
      <Component {...pageProps} />
      <ToastContainer />
    </WagmiConfig>
  )
}
