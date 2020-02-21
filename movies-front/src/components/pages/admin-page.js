import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import AdminUsers from './admin-users';
import AdminCategries from './admin-categries';
import AdminCasts from './admin-casts';

const AdminPage = () => {
  return (
    <>
      <ul className="admin-nav">
        <li>
          <NavLink to="/admin/users" activeClassName="current">Users</NavLink>
        </li>
        <li>
          <NavLink to="/admin/categories" activeClassName="current">Categories</NavLink>
        </li>
        <li>
          <NavLink to="/admin/casts" activeClassName="current">Casts</NavLink>
        </li>
      </ul>
      <Switch>
        <Route path="/admin/users" component={AdminUsers}/>
        <Route path="/admin/categories" component={AdminCategries}/>
        <Route path="/admin/casts" component={AdminCasts}/>
      </Switch>
    </>
  );
};

export default AdminPage;


