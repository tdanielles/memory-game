import './styles/reset.css';
import './styles/styles.css';
import ghibliDeck from './components/game-assets/ghibliDeck';
import narutoDeck from './components/game-assets/narutoDeck';
import React, { useEffect, useState } from 'react';
import CardContainer from './components/CardContainer';
import Header from './components/Header';

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [chosenCards, addCard] = useState([]);
  const [cardDeck, setCards] = useState(ghibliDeck.cards);
  const [deck, setDeck] = useState('ghibli');
  

  // handles score
  const handleScore = () => setScore((prevScore) => prevScore+1)

  // handles high score
  const checkForHighScore = () => {
    if (score >= highScore) {
      setHighScore(score+1);
    }
  }
  
  useEffect(() => {
    reset();
    if (deck === 'ghibli') {
      document.body.removeAttribute('class');
      setCards(ghibliDeck.cards);
      document.body.classList.add('ghibli');
    } else if (deck === 'naruto') {
      document.body.removeAttribute('class');
      setCards(narutoDeck.cards);
      document.body.classList.add('naruto');
    }
  }, [deck])

  // handle the changing of decks
  const handleChangeDeck = (e) => {
    setDeck(e.target.value);
  }

  // toggle chosen cards / unchosen cards
  const handleCard = (cardName) => {
    let index = cardDeck.findIndex(x => x.title === cardName);
    cardDeck[index].chosen = true;
    addCard((chosenCards) => [...chosenCards, cardName]);
  }


  const reset = () => {
    cardDeck.forEach(element => {
      element.chosen = false;
    });
    addCard([]);
    setScore(0);
  }

  // handles game logic
  const handleGameLogic = (cardName) => {
    if (!chosenCards.includes(cardName)) {
      if (chosenCards.length + 1 === cardDeck.length) {
        handleScore();
        checkForHighScore();
        reset();
        setDisplayText('You\'ve cleared this level!');
        return;
      }
      handleCard(cardName);
      handleScore();
      checkForHighScore();
      setDisplayText('');
    } else {
      handleCard(cardName);
      reset();
      setDisplayText('You lost. Try again!')
    }
  }

  return (
    <div className="App" style={{
      background: "url('../background-" + deck + ".jpeg') no-repeat center center fixed",
    }}>
      <Header score={score} highscore={highScore} displayText={displayText} changeDeck={handleChangeDeck}/>
      <CardContainer handleGameLogic={handleGameLogic} score={score} highscore={highScore} cardDeck={cardDeck}/>
    </div>
  );
}

export default App;
