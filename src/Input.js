import { useEffect, useRef } from 'react'

const Input = function() {

  const inputRef = useRef(null)

  useEffect(() => {
    console.log('use effect')
    console.log(inputRef.current)
    inputRef.current.focus()
  }, [])

  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputRef.current.focus()
  }

  return(
    <>
      <input type="text" ref={inputRef} />
      <button onClick={onButtonClick}>click</button>
    </>
  )
}

export default Input