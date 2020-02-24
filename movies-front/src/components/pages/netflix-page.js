import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Query from '../Query';
import {preparationData} from '../../utils/preparationData';
import {history} from "../../utils/history";
import {
    GET_NETFLIX,
    GET_NETFLIX_MOVIE,
} from '../../queries/netflix/netflixes';

const NetflixPage = ({match}) => {

    const {id} = match.params;
    const [movie, setMovie] = useState(id);

    const onItemSelected = (id) => {
        setMovie(id);
        history.push(`${id}`)
    };


    const checkData = movie;
    const withData = (
        <Query query={GET_NETFLIX_MOVIE} id={movie}>
            {({data: {netflix: {id, name, image, categories, casts, price}}}) => (
                <div key={id} className="item-details">
                    <img src={`http://localhost:1337/${image.url}`} alt={name} title={name}
                         className="item-details-img"/>
                    <ul className="item-details-desc">
                        <li>
                            <span>Name:</span>
                            <p>{name}</p>
                        </li>
                        <li>
                            <span>Categories:</span>
                            <p>{preparationData(categories)}</p>
                        </li>
                        <li>
                            <span>Casts:</span>
                            <p>{preparationData(casts)}</p>
                        </li>
                        <li>
                            <span>Price:</span>
                            <p>${price}</p>
                        </li>
                        <li>
                            <span>Details:</span>
                            <p>
                                <Link to={`single/${id}/`}>
                                    <i className="fas fa-external-link-alt"></i>
                                </Link>
                            </p>
                        </li>
                    </ul>
                </div>
            )}
        </Query>
    );
    const withoutData = <div className="item-details"><span>Select a movie from a list</span></div>;

    return (
        <div className="item-holder">
            <Query query={GET_NETFLIX}>
                {({data: {netflixes}}) => (
                    <ul className="item-list">
                        {netflixes.map(({id, name, image}) => (
                                <li key={id}
                                    onClick={() => {
                                        onItemSelected(id);
                                    }}>
                                    <span>{name}</span>
                                </li>
                            )
                        )}
                    </ul>
                )}
            </Query>
            {checkData ? withData : withoutData}
        </div>
    )
};

export default NetflixPage;