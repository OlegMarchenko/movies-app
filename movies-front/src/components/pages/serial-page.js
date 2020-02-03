import React from "react";
import {withRouter} from 'react-router-dom';
import Row from "../row";
import {SerialList, SerialDetails} from "../strapi-components";

const SerialPage = ({ history, match }) => {
    const {id} = match.params;
    return (
        <Row
            left={<SerialList onItemSelected={(id) => history.push(`${id}`)}/>}
            right={<SerialDetails itemId={id} />}
        />
    )
};

export default withRouter(SerialPage);