import React from "react";

import './toast-message.css'

const ToastMessage = ({show, message}) => {

    if (show) {
        return (
            <div className="valid-message">{message}</div>
        )
    }

    return (
        <div></div>
    )
};

export default ToastMessage;

