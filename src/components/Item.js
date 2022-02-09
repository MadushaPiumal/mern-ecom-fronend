import React from "react";
import "../style/Item.css";

const Item = (centerItem) => {
  return (
    <div className="item">
      <div className="item__description">
        <h2>{centerItem.centerItem.name}</h2>
        <div className="item__price">{centerItem.centerItem.price}</div>
        
      </div>
    </div>
  );
};

export default Item;
