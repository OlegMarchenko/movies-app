import React, {Component} from "react";
import Strapi from "strapi-sdk-javascript/build/main";
import StrapiService from "../../services/strapi-service";
import {setToken} from "../../utils";
import ToastMessage from "../toast-message";
import { history } from "../../utils/history";

const strapiService = new StrapiService();
const apiUrl = process.env.API_URL || strapiService._apiBase;
const strapi = new Strapi(apiUrl);


export default class SignupPage extends Component {

    state = {
        username: '',
        email: '',
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
        const {username, email, password} = this.state;

        // Basic validation
        if (this.isFormEmpty(this.state)) {
            this.showToast('Fill in all fields');
            return;
        }

        try {
            this.setState({loading: true});
            const response = await strapi.register(username, email, password);
            this.setState({loading: false});
            setToken(response.jwt);
            history.push('/')
        } catch (err) {
            this.setState({loading: false});
            this.showToast(err.message)
        }
    };

    isFormEmpty = ({username, email, password}) => {
        return !username || !email || !password;
    };

    showToast = (toastMessage) => {
        this.setState({toast: true, toastMessage});
        setTimeout(() => this.setState({toast: false, toastMessage: ''}), 5000);
    };

    render() {

        const {toastMessage, toast} = this.state;

        return (
            <section className="modal signup">
                <form onSubmit={this.handleSubmit}>
                    <h3>Sign Up form</h3>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Name"
                        onChange={this.handleChange}/>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email Address"
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