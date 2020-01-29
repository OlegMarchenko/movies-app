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

    _transformMovie = (movie) => {
        return {
            id: movie.id,
            name: movie.name,
            image: `${this._apiBase}${movie.image.url}`,
            description: movie.description,
            categories: movie.categories,
            casts: movie.casts,
            timeInterval: movie.movie_hours
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
            categories: serial.categories,
            casts: serial.casts,
            timeInterval: serial.movie_hours
        }
    };
}