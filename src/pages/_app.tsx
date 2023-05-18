import { wagmiClient } from "@constants/wagmiConfigs"
import useWallet from "@hooks/useWallet"
import "@styles/globals.css"
import { ThemeProvider } from "next-themes"
import type { AppProps } from "next/app"
import { useEffect } from "react"
import { I18nextProvider } from "react-i18next"
import { WagmiConfig } from "wagmi"
import i18n from "../../i18n"

export default function App({ Component, pageProps }: AppProps) {
  const {} = useWallet()

  useEffect(() => {
    wagmiClient.autoConnect()
  }, [])

  return (
    <WagmiConfig client={wagmiClient}>
      <ThemeProvider attribute="class">
        <I18nextProvider i18n={i18n}>
          <Component {...pageProps} />
        </I18nextProvider>
      </ThemeProvider>
    </WagmiConfig>
  )
}
