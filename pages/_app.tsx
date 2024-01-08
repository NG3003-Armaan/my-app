import "../styles/tailwind.css"
import "../styles/global.css"
import "@radix-ui/themes/styles.css"

import { Theme } from "@radix-ui/themes"
import type { AppProps } from "next/app"
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"

import { Loader, Toast } from "components"
import NotificationModal from "components/NotificationModal/NotificationModal"

import store from "store/store"

import { poppins } from "utils/fonts"

const enabledAPIMocking = process.env.NEXT_PUBLIC_API_MOCKING

if (enabledAPIMocking && enabledAPIMocking === "enabled") {
  require("../mocks")
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Theme className="h-full">
        <main className={`min-h-full ${poppins.variable} flex flex-col font-poppins`}>
          <Component {...pageProps} />
        </main>
      </Theme>
      <Toaster />
      <Toast />
      <Loader />
      <NotificationModal />
    </Provider>
  )
}

export default MyApp
