import React from "react"
import { useState } from 'react'
import IntroPage from "./components/IntroPage"
import QuestionsPage from "./components/QuestionsPage"

function App() {
  
  const [isClicked, setIsClicked] = useState(false)

  function startQuiz() {
      setIsClicked(true)
  }

  console.log(isClicked)

  return (
      <>
      {isClicked ? <QuestionsPage/> : <IntroPage handleClick={startQuiz}/>}
      </>
  )
}

export default App
