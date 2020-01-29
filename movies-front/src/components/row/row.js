import React from "react";

import './row.css';

const Row = ({left, right}) => {
    return (
        <div className="item-holder">
            {left}
            {right}
        </div>
    )
};

export default Row;