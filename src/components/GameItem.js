import {
  Card,
  Button,
} from 'grommet';
import {
  Favorite,
} from 'grommet-icons';
import { useContext } from 'react';
import styled from 'styled-components'
import Rates from '../contexts/Rates'
import Region from '../contexts/Region'

const GameItemContainer = styled(Card)`
  width: 100%;

  & + & {
    margin-top: 16px;
  }
`

const GameItemImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
`

const GameItemContent = styled.div`
  flex: 1;
  padding: 8px;
  position: relative;
`

const GameItemContentBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #FF4040;
  color: #FFFFFF;
  padding: 0 8px;
`

const GameItemContentTitle = styled.h2`
  margin: 0;
  font-size: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
  max-height: 54px;
`

const GameItemContentFooter = styled.div`
  display: flex;
  height: 48px;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
  left: 0;
  padding: 0 8px;
  box-sizing: border-box;
`

const GameItemContentFooterPrice = styled.div`
  color: #FF4040;
  display: flex;
  align-items: center;
`
const GameItemContentFooterPriceRegular = styled.span`
  font-size: 12px;
  text-decoration: line-through;
  color: #777777;
  margin-left: 8px;
`

const GameItem = ({className, data}) => {
  // console.log(data)
  const RatesContext = useContext(Rates)
  const RegionContext = useContext(Region)

  function calculateDiscount(price, discontPrice) {
    return (100 - (Math.round(+discontPrice / +price * 100))) + '% OFF'
  }

  function exchangePrice(value) {
    const symbol = RegionContext.symbols[RegionContext.country]
    return Math.round(RatesContext.rates[symbol] * value)
  }

  return (
    <GameItemContainer
      className={className}
      background="light-1"
      direction="row"
      round={false}
    >
      <GameItemImage src={data.hero_banner_url} alt={data.formal_name} loading="lazy" />
      <GameItemContent>
        {data.discountPrice &&
          <GameItemContentBadge>
            { calculateDiscount(data.regularPrice.raw_value, data.discountPrice.raw_value) }
          </GameItemContentBadge>
        }
        <div>{data.id}</div>
        <GameItemContentTitle>{data.formal_name}</GameItemContentTitle>
        <GameItemContentFooter>
        <GameItemContentFooterPrice>
          {data.discountPrice
            ? <>
                {RatesContext.base}&nbsp;
                <span style={{'fontWeight': '500'}}>{exchangePrice(data.discountPrice.raw_value)}</span>
                <GameItemContentFooterPriceRegular>{exchangePrice(data.regularPrice.raw_value)}</GameItemContentFooterPriceRegular>
              </>
            : <>
                {RatesContext.base}&nbsp;<span style={{'fontWeight': '500'}}>{exchangePrice(data.regularPrice.raw_value)}</span>
              </>
          }
        </GameItemContentFooterPrice>
          <Button icon={<Favorite color="red" />} hoverIndicator />
          {/* <Button icon={<ShareOption color="plain" />} hoverIndicator /> */}
        </GameItemContentFooter>
      </GameItemContent>
      {/* <GameLink /> */}
    </GameItemContainer>
  )
}

export default GameItem
