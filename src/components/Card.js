import React from 'react';

function Card(props) {
    const { name, picture, handleGameLogic } = props;
    
    return (
        <div className="card">
            <div className="cardArtContainer">
                <img src={process.env.PUBLIC_URL+picture} alt={name} className="cardArt" 
                     onClick={handleGameLogic.bind(this, name)}></img>
            </div>
            <div className="cardText">{name}</div>
        </div>
    )
}

export default Card;