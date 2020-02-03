import  React from "react";
import ItemList from "../item-list";
import {
    withData,
    withStrapiService,
    withChildFunction,
    compose
} from '../hoc-helpers'

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

const MovieList = compose(
                    withStrapiService(mapMovieMethodsToProps),
                    withData,
                    withChildFunction(renderName))(ItemList);

const SerialList = compose(
                    withStrapiService(mapSerialMethodsToProps),
                    withData,
                    withChildFunction(renderNameAndSeasons))(ItemList);
export {
    MovieList,
    SerialList
}