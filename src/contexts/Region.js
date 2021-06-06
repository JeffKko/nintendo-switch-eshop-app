import React from 'react'

const RegionContext = React.createContext({})

RegionContext.displayName = 'RegionContext'

export const defaultRegion = {
  country: 'HK',
  symbols: {
    HK: 'HKD',
    US: 'USD',
    JP: 'JPY',
  }
}

export default RegionContext
