import {
  useLocation,
} from 'react-router-dom'
import {
  useEffect,
  useState,
} from 'react'
import styled from 'styled-components'
import {
  Box,
  Button,
  Heading,
} from 'grommet'
import {
  Language,
} from 'grommet-icons';

const AppBar = (props) => {
  const {pathname} = useLocation()
  const [appBarTitle, setAppBarTitle] = useState('')

  useEffect(() => {
    let title = ''

    switch (pathname) {
      case '/':
        title = '限時特價'
        break;
      case '/ranking':
        title = '熱銷排行'
        break;
      case '/new':
        title = '最新發佈'
        break;
      default:
        break;
    }
    setAppBarTitle(title)
  }, [pathname])

  function onClickHandler() {
    // props.setShowSidebar(prev => !prev)
    props.setIsShowCountrySelector(prev => !prev)
  }

  return (
    <Box
      tag='header'
      direction='row'
      align='center'
      justify='between'
      background='brand'
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation='medium'
      style={{ zIndex: '1' }}
      {...props}
    >
      <Heading level='3' margin='none'>{appBarTitle}</Heading>
      <Button icon={<Language />} onClick={onClickHandler} />
    </Box>
  )
}


// const AppBar = styled(
//   (props) => (
//     <Box
//       tag='header'
//       direction='row'
//       align='center'
//       justify='between'
//       background='brand'
//       pad={{ left: 'medium', right: 'small', vertical: 'small' }}
//       elevation='medium'
//       style={{ zIndex: '1' }}
//       {...props}
//     />
//   )
// )`

// `

export default styled(AppBar)`
  flex: 0 1 auto;
`
