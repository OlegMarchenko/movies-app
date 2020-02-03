import React from "react";
import PropTypes from 'prop-types';

import './row.css';

const Row = ({left, right}) => {
    return (
        <div className="item-holder">
            {left}
            {right}
        </div>
    )
};

Row.propTypes = {
    left: PropTypes.node,
    right: PropTypes.node
};

export default Row;