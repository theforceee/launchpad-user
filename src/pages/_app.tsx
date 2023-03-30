import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { useEffect } from "react"
import { WagmiConfig } from "wagmi"
import { wagmiClient } from "../../constants/wagmiConfigs"

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    wagmiClient.autoConnect()
  }, [])

  return (
    <WagmiConfig client={wagmiClient}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}
