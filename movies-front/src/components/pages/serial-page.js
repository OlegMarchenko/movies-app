import React from "react";
import Row from "../row";
import {SerialList, SerialDetails} from "../strapi-components";
import { history } from "../../utils/history";

const SerialPage = ({ match }) => {
    const {id} = match.params;
    return (
        <Row
            left={<SerialList onItemSelected={(id) => history.push(`${id}`)}/>}
            right={<SerialDetails itemId={id} />}
        />
    )
};

export default SerialPage;