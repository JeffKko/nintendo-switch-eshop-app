import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {
  Box,
  Nav,
  Grommet,
  Collapsible,
} from 'grommet';
import {
  Notification,
  Currency,
  Trophy,
  Grow,
} from 'grommet-icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useLocation,
  useRouteMatch,
} from 'react-router-dom'
import Sales from './pages/Sales'
import Ranking from './pages/Ranking'
import New from './pages/New'
import './App.css';
import AppBar from './AppBar'
import RatesContext from './contexts/Rates'
import RegionContext from './contexts/Region'

const theme = {
  global: {
    colors: {
      brand: '#00739D',
    },
    font: {
      family: 'Roboto',
      size: '16px',
      height: '18px',
    },
  },
}

const Main = styled.main`
  height: calc(var(--vh) * 100 - 60px - 64px);
  overflow: auto;
  padding: 0 16px;
`

const Navbar = styled(Nav)`
  /* position: fixed;
  bottom: 0;
  width: 100%; */
  height: 64px;
`

const NavbarItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 56px;
  color: #DADADA;
  text-decoration: none;

  >svg {
    stroke: #DADADA;
  }

  &.active {
    color: #FFFFFF;

    >svg {
      stroke: #FFFFFF;
    }
  }
`

const NavbarItemText = styled.div`
  margin-top: 4px;
  font-size: 14px;
`

const AppContainer = styled(Grommet)`
  height: calc(var(--vh) * 100);
`

function App() {
  const [isShowSidebar, setShowSidebar] = useState(false)
  // const {pathname} = useLocation()

  const exchange = {
    base: 'TWD',
    rates: [],
  }

  const region = {
    country: 'HK',
  }

  useEffect(() => {
    axios('http://192.168.68.109:8080/rates')
      .then(res => {
        exchange.rates = res.data
      })
  }, [])

  return (
    <AppContainer theme={theme} themeMode="dark">

      <RatesContext.Provider value={exchange}>
      <RegionContext.Provider value={region}>
        <AppBar setShowSidebar={setShowSidebar}>
        </AppBar>
        <Main>
          <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
            <Box flex align='center' justify='center'>
              <Switch>
                <Route path="/" exact>
                  <Sales />
                </Route>
                <Route path="/ranking">
                  <Ranking />
                </Route>
                <Route path="/new">
                  <New />
                </Route>
              </Switch>
            </Box>
            <Collapsible direction="horizontal" open={isShowSidebar}>
              <Box
                flex
                width='medium'
                background='light-2'
                elevation='small'
                align='center'
                justify='center'
              >
                sidebar
              </Box>
            </Collapsible>
          </Box>
        </Main>
        <Navbar
          direction="row"
          justify="center"
          align="center"
          background="brand"
          gap="large"
        >
          <NavbarItem to="/" activeClassName="active" exact>
            <Currency />
            <NavbarItemText>Sales</NavbarItemText>
          </NavbarItem>
          <NavbarItem to="/ranking" activeClassName="active">
            <Trophy />
            <NavbarItemText>Top</NavbarItemText>
          </NavbarItem>
          <NavbarItem to="/new" activeClassName="active">
            <Grow />
            <NavbarItemText>New</NavbarItemText>
          </NavbarItem>
        </Navbar>
      </RegionContext.Provider>
      </RatesContext.Provider>
    </AppContainer>
  );
}

export default App;
