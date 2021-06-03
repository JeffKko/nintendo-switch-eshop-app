import styled from 'styled-components'

const GameDetailContainer = styled.section`
  position: fixed;
  /* top: 0;
  right: 0;
  bottom: 0;
  left: 0; */
  z-index: 100;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  top: 25;
  left: "10%";
  right: "10%";
  padding: 15;
  /* transition: transform 400ms, opacity 400ms;
  transform: translate(0, 100%); */
  /* opacity: 0; */

  &.is-open {
    transform: translate(0, 0);
    /* opacity: 1; */
  }
`


const GameDetail = () => {
  return(
    <GameDetailContainer>
      123
    </GameDetailContainer>
  )
}

export default GameDetail
