import React from "react";

function CardForm(props) {
    const { card, cardFrontChange, cardBackChange } = props;
   
    return (
        <div>  
            <div className="form-group">
                <label htmlFor="front">Front</label>
                <textarea className="form-control" type="text" id="front" name="front" value={card.front} placeholder="Front side of card" onChange={cardFrontChange}></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="back">Back</label>
                <textarea className="form-control" type="text" id="back" name="back" value={card.back} placeholder="Back side of card" onChange={cardBackChange}></textarea>
            </div>         
        </div>
    );

}

export default CardForm;