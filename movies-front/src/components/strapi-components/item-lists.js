import React from "react";
import ItemList from "../item-list";
import {withData, withStrapiService} from '../hoc-helpers'

const withChildFunction = (Wrapped, fn) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        )
    }
};

const renderName = ({name}) => <span>{name}</span>;

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

const MovieList = withStrapiService(withData(
    withChildFunction(ItemList, renderName)), mapMovieMethodsToProps);

const SerialList = withStrapiService(withData(
    withChildFunction(ItemList, renderName)), mapSerialMethodsToProps);

export {
    MovieList,
    SerialList
}