import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Rates from '../contexts/Rates'
import Region from '../contexts/Region'
import GameItem from '../components/GameItem'
import { Spinner } from 'grommet'

const ListSpinner = styled(Spinner)`
  margin: 24px auto;
`

const GameListContainer = styled.div`
  padding: 16px 0;
`

const Sales = function() {
  const [isShowSpinner, setIsShowSpinner] = useState(true)
  const [gameList, setGameList] = useState([])
  const [pageCount, setPageCount] = useState([10, -10])

  const spinnerRef = useRef(null)
  const observer = useRef(null)
  const totalCount = useRef(null)

  const RatesContext = useContext(Rates)

  console.log('update')

  useEffect(() => {
    console.log('effect []')

    const el = spinnerRef.current

    observer.current = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio <= 0) return

        console.log('intersectiong')

        setPageCount(prevPageCount => {
          console.log(prevPageCount)
          return [10, prevPageCount[1] + 10]
        })
      })
    })

    observer.current.observe(el)

    return () => {
      if (observer.current !== null) {
        observer.current.unobserve(el)
      }
    }
  }, [])

  const fetchGameList = useCallback(() => {
    let gameList = []

    console.log('fetchGameList')

    axios(`${process.env.REACT_APP_API_URL}/ranking?count=${pageCount[0]}&offset=${pageCount[1]}&country=HK`)
      .then(res => {
        gameList = res.data.contents
        totalCount.current = res.data.total

        console.log(res.data.contents.map(v => v.id).join())

        return axios(`${process.env.REACT_APP_API_URL}/price?ids=${res.data.contents.map(v => v.id).join()}&country=HK`)
          .then(({data: {prices}}) => {
            console.log(prices)

            gameList = gameList.map((v, i) => ({
              ...v,
              regularPrice: prices[i].regular_price,
              discountPrice: prices[i].discount_price,
            }))

            setGameList(prevGameList => [...prevGameList, ...gameList])
          })
      })
      .finally(() => {
      })
  }, [pageCount])

  useEffect(() => {
    if (pageCount[1] === -10) return
    console.log('effect fetchGameList')
    fetchGameList()

    if (pageCount[1] > totalCount.current) {
      observer.current.unobserve(spinnerRef.current)
      observer.current = null
      setIsShowSpinner(false)
      return false
    }

  }, [fetchGameList, pageCount])

  return (
    <GameListContainer>
      {!!Object.keys(RatesContext.rates).length && !!gameList.length && gameList.map((gData, i) => <GameItem data={gData} key={gData.id} />)}
      {isShowSpinner && <div ref={spinnerRef}><ListSpinner /></div>}
    </GameListContainer>
  )
}

export default Sales
