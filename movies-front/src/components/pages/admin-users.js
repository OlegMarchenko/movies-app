import React, { useState } from 'react';
import Query from '../Query';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_USER, GET_USERS, REGISTER_USER, UPDATE_USERS } from '../../queries/user/users';

const AdminUsers = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [registerUser] = useMutation(REGISTER_USER, UPDATE_USERS);
  const [deleteUser] = useMutation(DELETE_USER, UPDATE_USERS);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({
      variables: {
        username,
        email,
        password
      }
    });
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="item-holder admin">
      <Query query={GET_USERS}>
        {({ data: { users } }) => {
          return (
            <ul className="item-list">
              {users.map(({ id, username }) => {
                return (
                  <li key={id}>
                    <span>{username}</span>
                    <button onClick={() => {
                      deleteUser({
                        variables: {
                          id
                        }
                      })
                    }}>
                      <i className="fas fa-minus"></i>
                    </button>
                  </li>
                )
              })}
            </ul>
          )
        }}
      </Query>
      <div className="item-details">
        <form className="form-holder" onSubmit={handleSubmit}>
          <div className="form">
            <div className="form-group">
              <input type="text" placeholder="Username" value={username} onChange={(e) => {
                setUsername(e.target.value)
              }}/>
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email" value={email} onChange={(e) => {
                setEmail(e.target.value)
              }}/>
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" value={password} onChange={(e) => {
                setPassword(e.target.value)
              }}/>
            </div>
          </div>
          <button type="submit" disabled={!username || !email || !password}>
            <i className="fas fa-plus-circle"></i>
          </button>
        </form>
      </div>
    </div>
  )
};

export default AdminUsers;