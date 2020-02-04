import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import Header from './components/Header';
import Alert from './components/Alert';
import PrivateRoute from './components/PrivateRoute';
import ScrollButton from './components/ScrollButton';

const App = () => (
  <Router>
    <Header />
    <Alert />
    <ScrollButton />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
      <Route exact path="/connexion">
        <Login />
      </Route>
      <Route exact path="/products">
        <Products />
      </Route>
      <Route exact path="/products/:id">
        <ProductDetails />
      </Route>
      <Route exact path="/cart">
        <Cart />
      </Route>
      <PrivateRoute exact path="/commander" name="Bakate">
        <Checkout />
      </PrivateRoute>
      <Route exact path="*">
        <Error />
      </Route>
    </Switch>
  </Router>
);

export default App;
