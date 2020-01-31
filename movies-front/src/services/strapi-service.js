import React from 'react';

export default class StrapiService {

    _apiBase = 'http://localhost:1337';

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }

        return await res.json();
    };

    getAllMovies = async () => {
        const res = await this.getResource(`/movies/`);
        return res.map(this._transformMovie);
    };

    getMovie = async (id) => {
        const movie = await this.getResource(`/movies/${id}`);
        return this._transformMovie(movie)
    };

    getAllSerials = async () => {
        const res = await this.getResource(`/serials/`);
        return res.map(this._transformSerial);
    };

    getSerial = async (id) => {
        const serial = await this.getResource(`/serials/${id}`);
        return this._transformSerial(serial)
    };


    preparationData = (items) => {
        return items.map(({id, name}) => {
            return (
                <span key={id}>{name}</span>
            )
        })
    };

    preparationHours = (items) => {
        return items.map(({id, time_interval, start_free_hours, end_free_hours}) => {
            return (
                <span key={id}>{time_interval} ({start_free_hours} - {end_free_hours})</span>
            )
        })
    };

    _transformMovie = (movie) => {
        return {
            id: movie.id,
            name: movie.name,
            image: `${this._apiBase}${movie.image.url}`,
            description: movie.description,
            categories: this.preparationData(movie.categories),
            casts: this.preparationData(movie.casts),
            timeInterval: this.preparationHours(movie.movie_hours)
        }
    };

    _transformSerial = (serial) => {
        return {
            id: serial.id,
            name: serial.name,
            image: `${this._apiBase}${serial.image.url}`,
            description: serial.description,
            seasons: serial.seasons,
            tagline: serial.tagline,
            categories: this.preparationData(serial.categories),
            casts: this.preparationData(serial.casts),
            timeInterval: this.preparationHours(serial.movie_hours)
        }
    };

}