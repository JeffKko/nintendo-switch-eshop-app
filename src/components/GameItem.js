import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { selectRates } from '../stores/slice/rates'
import {
  Card,
  Button,
} from 'grommet'
import {
  Favorite,
} from 'grommet-icons'
import styled from 'styled-components'
import Region from '../contexts/Region'
import GamePrice from './GamePrice'

const GameItemContainer = styled(Card)`
  width: 100%;
`

const GameItemImage = styled.img`
  width: 110px;
  height: 110px;
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
  -webkit-line-clamp: 2;
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

const GameItemContentDate = styled.div`
  font-size: 12px;
  margin-bottom: 4px;
  color: #777777;
`

const GameItemContentNewBadge = styled.span`
  display: inline-block;
  font-size: 12px;
  line-height: 14px;
  border: 1px solid #00873D;
  border-radius: 15px;
  color: #00873D;
  padding: 0 8px;
  margin-left: 8px;

  &:before {
    content: 'NEW';
  }
`

const GameItem = ({className, data}) => {
  // console.log(data)
  const ratesState = useSelector(selectRates)
  const RegionContext = useContext(Region)

  function calculateDiscount(price, discontPrice) {
    return (100 - (Math.round(+discontPrice / +price * 100))) + '% OFF'
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
        <GameItemContentDate>
          {data.release_date_on_eshop}
          {data.is_new && <GameItemContentNewBadge />}
        </GameItemContentDate>
        <GameItemContentTitle>{data.formal_name}</GameItemContentTitle>
        <GameItemContentFooter>
        <GamePrice
          rates={ratesState}
          region={RegionContext}
          discountPrice={data.discountPrice ? data.discountPrice.raw_value : null}
          regularPrice={data.regularPrice.raw_value}
        />
          <Button icon={<Favorite color="red" />} hoverIndicator />
        </GameItemContentFooter>
      </GameItemContent>
    </GameItemContainer>
  )
}

export default GameItem
