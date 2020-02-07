import React from "react";

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

