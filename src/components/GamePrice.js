import styled from 'styled-components'

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

const GamePrice = ({rates, region, discountPrice, regularPrice}) => {

  function exchangePrice(value) {
    const symbol = region.symbols[region.country]
    return Math.round(rates.rates[symbol] * value)
  }

  return (
    <GameItemContentFooterPrice>
      {discountPrice
        ? <>
            {rates.base}&nbsp;
            <span style={{'fontWeight': '500'}}>{exchangePrice(discountPrice)}</span>
            <GameItemContentFooterPriceRegular>{exchangePrice(regularPrice)}</GameItemContentFooterPriceRegular>
          </>
        : <>
            {rates.base}&nbsp;<span style={{'fontWeight': '500'}}>{exchangePrice(regularPrice)}</span>
          </>
      }
    </GameItemContentFooterPrice>
  )
}

export default GamePrice
