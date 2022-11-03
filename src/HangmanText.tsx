type HangmanTextProps = {
    guessedLetters: string[],
    wordToGuess: string,
    reveal?: boolean
}
export function HangmanText({guessedLetters, wordToGuess, reveal=false}: HangmanTextProps) {
    return <div style={{
        display:"flex",
        gap:"0.5rem",
        fontSize:"6rem",
        fontWeight:"bold",
        textTransform:"uppercase",
        fontFamily:"monospace"
    }}>{wordToGuess.split("").map( (letter, index) => {
        return <span key={index} style={{borderBottom:".1em solid black"}}>
                <span style={{visibility:guessedLetters.includes(letter) || reveal ? "visible" :"hidden", color: !guessedLetters.includes(letter) || reveal ? "red" : "black"}}>{letter}</span>
            </span>
    })}</div>
}