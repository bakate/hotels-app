import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserContext } from '../context/user';

export default function PrivateRoute({ children, ...rest }) {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={() =>
        user && user.token ? children : <Redirect to="/login"></Redirect>
      }
    ></Route>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.object,
};
