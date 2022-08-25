import React, { useState, useEffect } from 'react';
import Card from './Card';

function CardContainer(props) {
    const {handleGameLogic, score, highScore, cardDeck} = props;
    
    let validCardContainer = false;
    
    const generateDeck = () => {
        let amountOfCards = cardDeck.length;
        let generatedCards = [];
        
        for (let i=0; i<6; i++) {
            let randomId = Math.floor(Math.random() * amountOfCards);
            while (generatedCards.includes(cardDeck[randomId])) {
                randomId = Math.floor(Math.random() * amountOfCards);
            }
            if (!cardDeck[randomId].chosen) {
                validCardContainer = true;
            }
            generatedCards = [...generatedCards, cardDeck[randomId]];
        }

        if (validCardContainer) {
            validCardContainer = false;
            return generatedCards;
        } else {
            validCardContainer = false;
            return correctGeneratedCards(generatedCards);
        }
    }

    const correctGeneratedCards = (cards) => {
        const unchosenCards = cardDeck.filter(card => !card.chosen);
        if (unchosenCards === []) {
            return [];
        }
        cards[Math.floor(Math.random() * cards.length)] = unchosenCards[Math.floor(Math.random() * unchosenCards.length)];
        return cards;
    }

    const [displayCards, setDisplayCards] = useState([]);

    useEffect(() => {
        const newCards = generateDeck();
        if (newCards !== []) {
            setDisplayCards(newCards);
        } else {
            console.log("You win!"); 
        }}, [score, highScore, cardDeck]);
    
    return (
        <div className="card-container">
            {displayCards.map((card) => (
                <Card name={card.title} picture={card.pictureDir} handleGameLogic={handleGameLogic} key={card.id} />
            ))}
        </div>
    )
}

export default CardContainer;