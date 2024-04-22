import { createContext, useContext } from 'react'
import { SIZES } from '../utils/constant'

export const defaultConfig = {
    themeColor: 'Green',
    direction: 'ltr',
    mode: 'light',
    locale: 'en',
    primaryColorLevel: 700,
    cardBordered: false,
    controlSize: SIZES.SM,
    navMode: 'light',
}

export const ConfigContext = createContext(defaultConfig)

const ConfigProvider = ConfigContext.Provider

export const ConfigConsumer = ConfigContext.Consumer

export function useConfig() {
    return useContext(ConfigContext)
}

export default ConfigProvider
