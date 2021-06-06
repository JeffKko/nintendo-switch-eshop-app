import {
  useState,
  useEffect,
} from 'react'
import styled from 'styled-components'
import {
  Button,
} from 'grommet'
import {
  Close,
  Checkmark,
} from 'grommet-icons'
import hkFlagImage from '../assets/icons/hk.svg'
import jpFlagImage from '../assets/icons/jp.svg'
import usFlagImage from '../assets/icons/us.svg'

const CountrySelectorContainer = styled.section`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  transition: transform 400ms, opacity 400ms;
  transform: translate(0, 100%);
  /* opacity: 0; */

  &.is-open {
    transform: translate(0, 0);
    /* opacity: 1; */
  }
`

const CountrySelectorHeader = styled.header`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px 0 12px;
  flex: 0 0 auto;
  border-bottom: 1px solid #DADADA;
`

const CountrySelectorMain = styled.main`
  flex: 1;
  padding: 24px;
`

const CountrySelectorFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #DADADA;
`

const CountrySelectorHeaderTitle = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`

const List = styled.ul`

`

const ListItem = styled.li`
  height: 64px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #DADADA;

  &:active {
    background-color: #F2F2F2;
  }
`

const ListItemMain = styled.div`
  display: flex;
  align-items: center;
`

const countryList = [
  'HK',
  'US',
  'JP',
]

const countryMap = {
  HK: {
    name: '香港',
    flag: hkFlagImage,
  },
  US: {
    name: '美國',
    flag: usFlagImage,
  },
  JP: {
    name: '日本',
    flag: jpFlagImage,
  }
}

const CountrySelector = ({
  region,
  setRegion,
  isShowCountrySelector,
  setIsShowCountrySelector,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(region.country)

  function onCloseHandler() {
    setIsShowCountrySelector(false)
  }

  function onSaveHandler() {
    setRegion(prev => ({
      ...prev,
      country: selectedCountry,
    }))
    setIsShowCountrySelector(false)
  }

  useEffect(() => {
    setSelectedCountry(region.country)
  }, [isShowCountrySelector, region])

  return (
    <CountrySelectorContainer className={isShowCountrySelector ? 'is-open': ''}>
      <CountrySelectorHeader>
        <CountrySelectorHeaderTitle>
          Switch eShop by Region
        </CountrySelectorHeaderTitle>
        <Button icon={<Close />} onClick={onCloseHandler} />
      </CountrySelectorHeader>
      <CountrySelectorMain>
        <List>
          {countryList.map(iso => {
            return (
              <ListItem key={iso} onClick={() => setSelectedCountry(iso)}>
                <ListItemMain>
                  <img width="32" height="32" src={countryMap[iso].flag} alt={countryMap[iso].name} />
                  <span style={{'marginLeft': '16px'}}>{countryMap[iso].name}</span>
                </ListItemMain>
                {(selectedCountry === iso) && <Checkmark />}
              </ListItem>
            )
          })}
        </List>
      </CountrySelectorMain>
      <CountrySelectorFooter>
        <Button primary fill="horizontal" label="SAVE" onClick={onSaveHandler} />
      </CountrySelectorFooter>
    </CountrySelectorContainer>
  )
}

export default CountrySelector
