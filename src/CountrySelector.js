import {
  useState,
  useEffect,
  useRef,
} from 'react'
import styled from 'styled-components'
import {
  // List,
  Button,
} from 'grommet'
import {
  Close,
} from 'grommet-icons';

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
  /* max-height: calc(var(--vh, 1vh) * 100); */
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

const countryList = [
  'HK',
  'US',
  'JP',
]

const CountrySelector = ({region, setRegion, setIsShowCountrySelector}) => {
  const [selectedCountry, setSelectedCountry] = useState(region.country)
  // const regionRef = useRef(region)

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

  // useEffect(() => {
  //   setSelectedCountry(regionRef.curent)
  // }, [])

  return (
    <CountrySelectorContainer>
      <CountrySelectorHeader>
        <CountrySelectorHeaderTitle>
          Select a Country
        </CountrySelectorHeaderTitle>
        <Button icon={<Close />} onClick={onCloseHandler} />
      </CountrySelectorHeader>
      <CountrySelectorMain>
        <List>
          {countryList.map(country => {
            return (
              <ListItem key={country} onClick={() => setSelectedCountry(country)}>
                <span>{country}</span>
                {(selectedCountry === country) && <span>O</span>}
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
