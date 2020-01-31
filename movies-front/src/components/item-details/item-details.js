import React, {Component} from "react";

import './item-details.css';

const Record = ({item, field, label}) => {
    return (
        <li>
            <span>{label}</span>
            <p>{item[field]}</p>
        </li>
    )
};

export {
    Record
}

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

    updateItem() {
        const {itemId, getData} = this.props;
        if (!itemId) {
            return;
        }
        getData(itemId)
            .then((item) => {
                this.setState({item})
            })
    }

    render() {

        const {item} = this.state;

        if (!item) {
            return <div className="item-details"><span>Select a movie from a list</span></div>
        }

        const {name, image,} = item;

        return (
            <div className="item-details">
                <img src={image} alt={name} title={name} className="item-details-img"/>
                <ul className="item-details-desc">
                    {
                        Record.Children.map(this.props.children, (child) => {
                            return  React.cloneElement(child, {item});
                        })
                    }
                </ul>
            </div>
        )
    }
};