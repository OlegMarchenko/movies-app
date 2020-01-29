import React, {Component} from "react";

import './item-details.css';

export default class ItemDetails extends Component {

    state = {
        item: null
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    onItemLoaded = (item) => {
        this.setState({item})
    };

    updateItem() {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return;
        }
        getData(itemId)
            .then(this.onItemLoaded)
    }

    render() {

        const {item} = this.state;

        if (!item) {
            return <div className="item-details"><span>Select a movie from a list</span></div>
        }

        const {name, image, categories, timeInterval, casts} = item;

        const renderItems = (items) => {
            return items.map(({id, name}) => {
                return (
                    <span key={id}>{name}</span>
                )
            });
        };

        const renderItemHours = (items) => {
            return items.map(({id, time_interval, start_free_hours, end_free_hours}) => {
                return (
                    <span key={id}>{time_interval} ({start_free_hours} - {end_free_hours})</span>
                )
            });
        };

        const categoriesList = renderItems(categories);
        const castsList = renderItems(casts);
        const freeTimeList = renderItemHours(timeInterval);

        return (
            <div className="item-details">
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
            </div>
        )
    }
};