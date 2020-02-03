import React from "react";
import {StrapiServiceConsumer} from "../strapi-service-context";

const withStrapiService = (mapMethodsToProps) => (Wrapped) => {

    return (props) => {
        return (
            <StrapiServiceConsumer>
                {
                    (strapiService) => {
                        const serviceProps = mapMethodsToProps(strapiService);
                        return (
                            <Wrapped {...props} {...serviceProps}/>
                        )
                    }
                }
            </StrapiServiceConsumer>
        )
    }

};

export default withStrapiService;
