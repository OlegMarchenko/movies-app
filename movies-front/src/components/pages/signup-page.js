import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER_USER, UPDATE_USERS } from "../../queries/user/users";
import { history } from "../../utils/history";

const SignupPage = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [registerUser] = useMutation(REGISTER_USER, UPDATE_USERS);


  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser({
      variables: {
        username,
        email,
        password,
      }
    });
    setUsername('');
    setEmail('');
    setPassword('');
    history.push('/');

  };


  return (
    <section className="modal signup">
      <form onSubmit={handleSubmit}>
        <h3>Sign Up form</h3>
        <input type="text" placeholder="Username" value={username} onChange={(e) => {
          setUsername(e.target.value)
        }}/>
        <input type="email" placeholder="Email" value={email} onChange={(e) => {
          setEmail(e.target.value)
        }}/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => {
          setPassword(e.target.value)
        }}/>
        <button type="submit">Submit</button>
      </form>
    </section>
  )
};

export default SignupPage;