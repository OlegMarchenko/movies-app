import React, {Component} from "react";
import StrapiService from "../../services/strapi-service";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";


import './random-item.css';


export default class RandomItem extends Component {

    strapiService = new StrapiService();

    state = {
        randomItem: {},
        loading: true,
        error: false
    };

    componentDidMount() {
        this.updateRandomItem();
        this.interval = setInterval(this.updateRandomItem, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onRandomItemLoaded = (randomItem) => {
        this.setState({
            randomItem,
            loading: false
        })
    };

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    };

    updateRandomItem = () => {

        function randomInteger(min, max) {
            let rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        }
        const id = randomInteger(1, 5);


        this.strapiService
            .getMovie(id)
            .then(this.onRandomItemLoaded)
            .catch(this.onError);
    };

    render() {

        const {randomItem, loading, error} = this.state;

        const hasData = !(loading || error);

        const errorMessage = error ? <ErrorIndicator/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = hasData ? <RandomView randomItem={randomItem}/> : null;

        return (
            <div className="random-item item-details">
                {spinner}
                {content}
                {errorMessage}
            </div>
        )
    }
};

const RandomView = ({randomItem}) => {

    const {name, image, categories, timeInterval, casts} = randomItem;

    const renderItems = (items) => {
        return items.map(({id,name}) => {
            return (
                <span key={id}>{name}</span>
            )
        });
    };

    const renderMovieHours = (items) => {
        return items.map(({id,time_interval, start_free_hours, end_free_hours}) => {
            return (
                <span key={id}>{time_interval} ({start_free_hours} - {end_free_hours})</span>
            )
        });
    };

    const categoriesList = renderItems(categories);
    const castsList = renderItems(casts);
    const freeTimeList = renderMovieHours(timeInterval);

    return (
        <React.Fragment>
            <img src={image} alt={name} title={name} className="item-details-img"/>
            <ul className="item-details-desc">
                <li>
                    <span>Title: </span>
                    <p>{name}</p>
                </li>
                <li>
                    <span>Categories: </span>
                    <p>{categoriesList}</p>
                </li>
                <li>
                    <span>Casts: </span>
                    <p>{castsList}</p>
                </li>
                <li>
                    <span>Free Time: </span>
                    <p>{freeTimeList}</p>
                </li>
            </ul>
        </React.Fragment>
    )
};
