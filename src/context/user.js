// user context
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserContext = React.createContext();

function getUserFromLocalStorage() {
  const someone = localStorage.getItem('user');
  const nobody = { username: null, token: null };
  return someone ? JSON.parse(someone) : nobody;
}
function UserProvider({ children }) {
  const [user, setUser] = useState(getUserFromLocalStorage());
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: 'success',
  });
  const [height, setHeight] = useState(0);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setHeight(window.pageYOffset);
    });
    return () => window.removeEventListener('scroll', () => {});
  }, []);

  function userLogin(person) {
    setUser(person);
    localStorage.setItem('user', JSON.stringify(person));
  }
  function userLogout() {
    setUser({ username: null, token: null });
    localStorage.removeItem('user');
  }
  function showAlert({ type = 'success', msg }) {
    setAlert({ show: true, type, msg });
  }
  function hideAlert() {
    setAlert({ ...alert, show: false });
  }
  return (
    <UserContext.Provider
      value={{
        user,
        userLogin,
        userLogout,
        alert,
        hideAlert,
        showAlert,
        height,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.object,
};

export { UserProvider, UserContext };
