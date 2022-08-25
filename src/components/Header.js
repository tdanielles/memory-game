import React from 'react';

function Header(props) {
    const { score, highscore, displayText, changeDeck } = props
    return (
        <header className="header">
            <div className="title">Memory Game!</div>
            <div className="rules">Get points for choosing a different card each time! 2 modes available.</div>
            <div className="selection" onChange={(e) => changeDeck(e)}>
                <select name="decks">
                    <option value="ghibli">Easy - Studio Ghibli Films</option>
                    <option value="naruto">Hard - Naruto Characters</option>
                </select>
            </div>
            <div className="scoreboard">
                <div className="score">Score: {score}</div>
                <div className="highscore">Highscore: {highscore}</div>
            </div>
            <div className="displayText">{displayText}</div>
        </header>
    );
}

export default Header;