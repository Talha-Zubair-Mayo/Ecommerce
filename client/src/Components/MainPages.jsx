import React from 'react'
import { Route, Switch } from "react-router-dom";
import NotFound from '../Utils/NotFound';
import Login from './Pages/Auth/Login/Login';
import Register from './Pages/Auth/Register/Register';
import Cart from './Pages/Cart/Cart';
import ProductDetails from './Pages/Products/ProductDetails';
import Products from './Pages/Products/Products';


function Pages() {
    return (
      <>
        <Switch>
          <Route exact path="/">
            <Products />
          </Route>
          <Route path="/detail/:id" exact>
            <ProductDetails/>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route path="*" exact>
            <NotFound />
          </Route>
        </Switch>
      </>
    );
}

export default Pages;
