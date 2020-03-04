import React, { useState } from "react";
import Strapi from "strapi-sdk-javascript/build/main";
import { setToken } from "../../utils";
import { history } from "../../utils/history";

const strapi = new Strapi('http://localhost:1337');

const SigninPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await strapi.login(username, password);
      setToken(response.jwt);
      history.push('/');
    }
    catch (err) {
      return err
    }
  };

  return (
    <section className="modal signin">
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <input type="text" placeholder="Username" value={username} onChange={(e) => {
          setUsername(e.target.value)
        }}/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => {
          setPassword(e.target.value)
        }}/>
        <button type="submit">Submit</button>
      </form>
    </section>
  )
};

export default SigninPage;