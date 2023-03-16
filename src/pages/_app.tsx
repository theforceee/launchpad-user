import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { WagmiConfig } from "wagmi"
import { wagmiClient } from "../../constants/wagmiConfigs"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}
