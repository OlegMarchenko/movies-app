import React, {Component} from "react";
import PropTypes from 'prop-types';
import StrapiService from "../../services/strapi-service";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";



import './random-item.css';


export default class RandomItem extends Component {

    static defaultProps = {
        updateInterval: 10000
    };

    static propTypes = {
        updateInterval: PropTypes.number
    };

    strapiService = new StrapiService();

    state = {
        randomItem: {},
        loading: true,
        error: false
    };

    componentDidMount() {
        const {updateInterval} = this.props;
        this.updateRandomItem();
        this.interval = setInterval(this.updateRandomItem, updateInterval);
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
                    <p>{categories}</p>
                </li>
                <li>
                    <span>Casts: </span>
                    <p>{casts}</p>
                </li>
                <li>
                    <span>Free Time: </span>
                    <p>{timeInterval}</p>
                </li>
            </ul>
        </React.Fragment>
    )
};
