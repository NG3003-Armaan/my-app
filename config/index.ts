interface ConfigType {
  urls: {
    COLLECTION_BACKEND_USER_MANAGEMENT: string
    COLLECTION_BACKEND_PAYMENT_SERVICE: string
    COLLECTION_BACKEND_ALLOCATION: string
  }
}

export const config: Record<"UAT" | "PROD", ConfigType> = {
  UAT: {
    urls: {
      // TODO - use actual uat url
      COLLECTION_BACKEND_USER_MANAGEMENT: "https://devcollections.neogrowth.in:4311",
      COLLECTION_BACKEND_ALLOCATION: "https://devcollections.neogrowth.in:4312",
      COLLECTION_BACKEND_PAYMENT_SERVICE: "https://devcollections.neogrowth.in:4313",
    },
  },
  PROD: {
    urls: {
      COLLECTION_BACKEND_USER_MANAGEMENT: "https://app.advancesuite.in:1234",
      COLLECTION_BACKEND_ALLOCATION: "https://app.neogrowth.in:4312",
      COLLECTION_BACKEND_PAYMENT_SERVICE: "https://app.neogrowth.in:4313",
    },
  },
}

const getEnvironmentConfig = () => {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD") {
    return config["PROD"]
  }

  return config["UAT"]
}

export const appConfig = getEnvironmentConfig()
