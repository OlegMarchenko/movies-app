import React, {Component} from "react";
import Strapi from "strapi-sdk-javascript/build/main";
import StrapiService from "../../services/strapi-service";
import {setToken} from "../../utils";
import ToastMessage from "../toast-message";

const strapiService = new StrapiService();
const apiUrl = process.env.API_URL || strapiService._apiBase;
const strapi = new Strapi(apiUrl);


export default class SigninPage extends Component {

    state = {
        username: '',
        password: '',
        toast: false,
        toastMessage: '',
        loading: false
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const {username, password} = this.state;

        // Basic validation
        if (this.isFormEmpty(this.state)) {
            this.showToast('Fill in all fields');
            return;
        }

        try {
            this.setState({loading: true});
            const response = await strapi.login(username, password);
            this.setState({loading: false});
            setToken(response.jwt);
            this.redirectUser('/');
            window.location.reload();
        } catch (err) {
            this.setState({loading: false});
            this.showToast(err.message)
        }
    };

    redirectUser = (path) => this.props.history.push(path);

    isFormEmpty = ({username, password}) => {
        return !username || !password;
    };

    showToast = (toastMessage) => {
        this.setState({toast: true, toastMessage});
        setTimeout(() => this.setState({toast: false, toastMessage: ''}), 5000);
    };

    render() {

        const {toastMessage, toast} = this.state;

        return (
            <section className="modal signin">
                <form onSubmit={this.handleSubmit}>
                    <h3>Sign In form</h3>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Name"
                        onChange={this.handleChange}/>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChange}/>
                    <ToastMessage show={toast} message={toastMessage}/>
                    <button type="submit">Submit</button>

                </form>
            </section>
        )
    }
};