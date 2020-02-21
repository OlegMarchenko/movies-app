import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import AdminUsers from './admin-users';
import AdminCategries from './admin-categries';
import AdminCasts from './admin-casts';

const AdminPage = () => {
  return (
    <>
      <ul className="admin-nav">
        <li>
          <Link to="/admin/users">Users</Link>
        </li>
        <li>
          <Link to="/admin/categories">Categories</Link>
        </li>
        <li>
          <Link to="/admin/casts">Casts</Link>
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


