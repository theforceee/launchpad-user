import { wagmiClient } from "@constants/wagmiConfigs"
import useWallet from "@hooks/useWallet"
import "@styles/globals.css"
import { ThemeProvider } from "next-themes"
import type { AppProps } from "next/app"
import { useEffect } from "react"
import { WagmiConfig } from "wagmi"

export default function App({ Component, pageProps }: AppProps) {
  const {} = useWallet()
  useEffect(() => {
    wagmiClient.autoConnect()
  }, [])

  return (
    <WagmiConfig client={wagmiClient}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </WagmiConfig>
  )
}
