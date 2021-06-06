import styled from 'styled-components'

const GamePriceContainer = styled.div`
  color: #FF4040;
  display: flex;
  align-items: center;
`

const GamePriceRegular = styled.span`
  font-size: 12px;
  text-decoration: line-through;
  color: #777777;
  margin-left: 8px;
`

const GamePrice = ({rates, region, discountPrice, regularPrice}) => {

  function exchangePrice(value) {
    const symbol = region.symbols[region.country]
    return Math.round(rates.rates[symbol] * value)
  }

  return (
    <GamePriceContainer>
      {discountPrice
        ? <>
            {rates.base}&nbsp;
            <span style={{'fontWeight': '500'}}>{exchangePrice(discountPrice)}</span>
            <GamePriceRegular>{exchangePrice(regularPrice)}</GamePriceRegular>
          </>
        : regularPrice === '0'
          ? '限時免費中'
          : <>
              {rates.base}&nbsp;<span style={{'fontWeight': '500'}}>{exchangePrice(regularPrice)}</span>
            </>
      }
    </GamePriceContainer>
  )
}

export default GamePrice
