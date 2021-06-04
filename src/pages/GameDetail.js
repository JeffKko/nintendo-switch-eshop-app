import {
  useContext,
  useMemo,
} from 'react'
import {
  useHistory,
  useLocation,
} from 'react-router'
import styled from 'styled-components'
import Rates from '../contexts/Rates'
import Region from '../contexts/Region'
import {
  Button,
  Carousel,
  Image,
} from 'grommet'
import {
  Close,
  ShareOption,
} from 'grommet-icons'
import GamePrice from '../components/GamePrice'
import hkFlagImage from '../assets/icons/hk.svg'
import jpFlagImage from '../assets/icons/jp.svg'
import usFlagImage from '../assets/icons/us.svg'

const GameDetailContainer = styled.section`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  /* transition: transform 400ms, opacity 400ms;
  transform: translate(0, 100%);
  opacity: 0; */

  &.is-open {
    /* transform: translate(0, 0);
    opacity: 1; */
  }
`

const GameDetailHeader = styled.header`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px 0 12px;
  flex: 0 0 auto;
  border-bottom: 1px solid #DADADA;
`

const GameDetailHero = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56%;
`

const GameDetailMainWrap = styled.main`
  flex: 1;
  overflow: auto;
`

const GameDetailTag = styled.span`
  border: 1px solid #00739D;
  border-radius: 15px;
  color: #00739D;
  font-size: 12px;
  padding: 0 8px;
  white-space: nowrap;

  & + & {
    margin-left: 8px;
  }
`

const GameDetailMainTitle = styled.h1`
  font-size: 24px;
  line-height: 32px;
  margin: 0;
`

const GameDetailMainReleaseInfo = styled.p`
  font-size: 14px;
  color: #777777;
  margin: 4px 0 16px 0;
`

const GameDetailDiscountInfo = styled.p`
  font-size: 12px;
  color: #777777;
  margin: 4px 0 36px 0;
`

const GameDetailDisciamer = styled.div`
  font-size: 14px;
  padding: 16px;
  background-color: #FFAA15;
  color: white;
  margin-bottom: 16px;
`

const GameDetailGallery = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56%;
`

const GameDetailGalleryInner = styled(Carousel)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const GameDetailFooter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #DADADA;
`

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

const GameDetail = () => {
  const RatesContext = useContext(Rates)
  const RegionContext = useContext(Region)
  const history = useHistory()
  const location = useLocation()

  const gameData = location.state && location.state.data
  const discountInfo = useMemo(() => {
    if (!gameData.discountPrice) return null

    const date = new Date(gameData.discountPrice.end_datetime)

    return `特價到 ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  }, [gameData.discountPrice])

  const discountRangeNum = useMemo(() => {
    if (!gameData.discountPrice) return null

    function exchangePrice(value) {
      const symbol = RegionContext.symbols[RegionContext.country]
      return Math.round(RatesContext.rates[symbol] * value)
    }

    return exchangePrice(
      (+gameData.regularPrice.raw_value) - (+gameData.discountPrice.raw_value)
    )
  }, [gameData.discountPrice, gameData.regularPrice, RegionContext, RatesContext])

  const discountRemainDays = useMemo(() => {
    if (!gameData.discountPrice) return null
    return Math.round((new Date(gameData.discountPrice.end_datetime) - new Date()) / 86400000)
  }, [gameData.discountPrice])

  console.log(gameData)

  function onCloseHandler(e) {
    e.stopPropagation()
    history.goBack()
  }

  return(
    <GameDetailContainer>
      <GameDetailHeader>
        <Button icon={<ShareOption />} onClick={() => {}} />
        <Button icon={<Close />} onClick={onCloseHandler} />
      </GameDetailHeader>
      <GameDetailMainWrap>
        <GameDetailHero>
          <picture style={{
            'position': 'absolute',
            'top': '0',
            'right': '0',
            'bottom': '0',
            'left': '0',
          }}>
            <source
              style={{
                'width': '100%',
                'height': 'auto',
                'objectFit': 'cover',
              }}
              srcSet={gameData.hero_banner_url}
            />
            <img
              style={{
                'width': '100%',
                'height': 'auto',
                'objectFit': 'cover',
              }}
              src={gameData.hero_banner_url}
              alt={gameData.formal_name}
            />
          </picture>
        </GameDetailHero>
        <main style={{
          padding: '24px',
        }}>
          <GameDetailMainTitle>{gameData.formal_name}</GameDetailMainTitle>
          <GameDetailMainReleaseInfo>{gameData.release_date_on_eshop} 上市</GameDetailMainReleaseInfo>
          <div style={{
            marginBottom: '36px',
          }}>
            {
              gameData.is_new &&
              <GameDetailTag>新遊戲</GameDetailTag>
            }
            {
              gameData.discountPrice &&
              <>
                <GameDetailTag>
                  省下 {RatesContext.base} {discountRangeNum}
                </GameDetailTag>
                <GameDetailTag>
                  特價剩下 {discountRemainDays} 天
                </GameDetailTag>
              </>
            }
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
          }}>
            <img
              style={{
                marginRight: '8px',
              }}
              src={countryMap[RegionContext.country].flag}
              alt={RegionContext.country}
            />
            <GamePrice
              rates={RatesContext}
              region={RegionContext}
              discountPrice={gameData.discountPrice.raw_value}
              regularPrice={gameData.regularPrice.raw_value}
            />
          </div>
          {discountInfo &&
            <GameDetailDiscountInfo>{discountInfo}</GameDetailDiscountInfo>
          }
          {
            gameData.strong_disclaimer &&
            <GameDetailDisciamer>{gameData.strong_disclaimer}</GameDetailDisciamer>
          }
          <GameDetailGallery>
            <GameDetailGalleryInner play={3000}>
              {gameData.screenshots.map(v => {
                return (
                  <Image
                    style={{
                      'width': '100%',
                      'height': 'auto',
                      'objectFit': 'cover',
                    }}
                    fit="cover"
                    src={v.images[0].url} key={v.images[0].url}
                  />
                )
              })}
            </GameDetailGalleryInner>
          </GameDetailGallery>
        </main>
      </GameDetailMainWrap>
    </GameDetailContainer>
  )
}

export default GameDetail
