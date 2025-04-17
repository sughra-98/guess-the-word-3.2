import logo from "/logo.png";
import "./App.css";
import { getRandomWord } from "./utils";
import { useState,useEffect } from "react";
import { use } from "react";

function App() {
  // currWord is the current secret word for this round. Update this with the updater function after each round.
  const [currWord, setCurrentWord] = useState(getRandomWord());
  // guessedLetters stores all letters a user has guessed so far
  const [guessedLetters, setGuessedLetters] = useState([]);

  const[TotalTries, setTotalTries] = useState(0)

  // gameState is the current state of the game. It can be "playing", "won", or "lost".
  const [wonState, setWonState] = useState(false);

  // Add additional states below as required.

  const generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of currWord) {
      if (guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };
  console.log(currWord)
  // create additional function to power the
  const handleInput = (e) => {
    
    const word = e.target.value.toLowerCase();
    const lastletter = word[word.length - 1];
    console.log(word);
    console.log(lastletter);
    if (word.length > guessedLetters.length) {
      // check if the letter is a single letter 
      setGuessedLetters([...guessedLetters, lastletter]);
      setTotalTries(TotalTries + 1)


    }else{
      const filteredgussedletter = guessedLetters.filter((l,idx) => idx !== guessedLetters.length - 1)
      setGuessedLetters(filteredgussedletter)
    }
   

  }

 const handleRestart = () => {
  setCurrentWord(getRandomWord());
  setGuessedLetters([]);
  setTotalTries(0)
  setWonState(false);
 }  
 useEffect(() => {
  
  // Check if the user has lost
  if (TotalTries < 10 && guessedLetters.join("") === currWord) {
    setWonState(true);
  } 
}
, [guessedLetters, currWord, TotalTries]);
  
  return (
    <>
      <div>
        <img src={logo} className="logo" alt="Rocket logo" />
      </div>
      {wonState ? (
        <div className="card ">
          <h1 >Congratulations! 🎉</h1>
          <h3 className="win">You guessed the word: {currWord}</h3>
          <button onClick={handleRestart}>Play Again</button>
        </div>
      )  :(
      <div className="card">
        <h1>Guess The Word 🚀</h1>
        <h3>Word Display</h3>
        
        {TotalTries>=10? <h2 className="lost" >you lost the game , the word is {currWord}</h2> : generateWordDisplay()}
        <h3>Guessed Letters</h3>
        {guessedLetters.length > 0 ? guessedLetters.toString() : "-"}
        <br />
        <h3>Input</h3>
        {TotalTries<10 ?<input type="text" onChange={handleInput} /> : <button onClick={handleRestart}>Restart </button>}
        
      </div>)}
    </>
  );
}

export default App;
