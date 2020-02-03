import React from "react";
import ItemList from "../item-list";
import {withData, withStrapiService} from '../hoc-helpers'

const withChildFunction = (fn) => (Wrapped) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        )
    }
};

const renderName = ({name}) => <span>{name}</span>;
const renderNameAndSeasons = ({name, seasons}) => <span>{name} ({seasons} seasons)</span>;

const mapMovieMethodsToProps = (strapiService) => {
    return {
        getData: strapiService.getAllMovies
    }
};

const mapSerialMethodsToProps = (strapiService) => {
    return {
        getData: strapiService.getAllSerials
    }
};

const MovieList = withStrapiService(mapMovieMethodsToProps)
                        (withData(
                            withChildFunction(renderName)(ItemList)));

const SerialList = withStrapiService(mapSerialMethodsToProps)
                        (withData(
                            withChildFunction(renderNameAndSeasons)(ItemList)));

export {
    MovieList,
    SerialList
}