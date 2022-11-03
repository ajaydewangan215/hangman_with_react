import { useCallback, useEffect, useState } from 'react'
import { HangmanDrawing } from './HangmanDrawing'
import { HangmanText } from './HangmanText'
import { Keyboard } from './Keyboard'
import words from './wordList.json'

function getWord() {
  return words[Math.floor(Math.random() * words.length)]
}
function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord)

  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))

  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter))

  const addGuessedLetter = useCallback((letter: string) => {
      if(guessedLetters.includes(letter) || isWinner || isLoser) return
      setGuessedLetters(prev => [...prev, letter])
    }, [guessedLetters, isLoser, isWinner])

    
  useEffect(() => {
    const handle = (e:KeyboardEvent) => {
      const key = e.key
      if(!key.match(/^[a-z]$/)) return
      e.preventDefault()

      addGuessedLetter(key)
    }
    document.addEventListener("keypress", handle)
    return () => {
      document.removeEventListener("keypress", handle)
    }
  }, [guessedLetters])

  useEffect(() => {
    const handle = (e:KeyboardEvent)=> {
      const key = e.key
      if(key !== "Enter") return
      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }
    document.addEventListener("keypress", handle)
    return () => {
      document.removeEventListener("keypress", handle)
    }
  }, [])
  

  return (
    <div style={{
      maxWidth:800,
      display:"flex",
      flexDirection:"column",
      gap:"2rem",
      margin: "0 auto",
      alignItems:"center"
    }}>
      <div style={{fontSize:"2rem", textAlign:"center"}}>
        {isWinner && "Winner!, Refresh to try again"}
        {isLoser && "nice try!, Refresh to try again"}
      </div>

      <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
      <HangmanText reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard 
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  )
}

export default App
