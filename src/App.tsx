import React, { useState } from 'react';
import useBlockOverflow from './hooks/useBlockOverflow';
import useNavScroll from './hooks/useNavScroll';
import useVerify, { useSignOut } from './hooks/useVerify';
import useCart from './hooks/useCart';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Recover from './pages/Recover';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Shop from './pages/Shop';
import Item from './pages/Item';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import UpdatePassword from './pages/updatePassword';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Menu from './components/Menu';
import Overlay from './components/Overlay';

import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import './style/defaults.scss';
import Info from './components/Info';

// stopped at reset password/ checking integration between front and backendd 

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

export interface User {
  isAuthenticated: boolean,
  token: string | null,
  errorMessage: string,
  name: string,
}

function App() {

  const [isMenuOpen, setMenuState] = useState(false);
  const [order, setOrder] = useState<CheckoutCaptureResponse>()
  const [errorMessage, setErrorMessage] = useState<string>();
  const [userMenu, setUserMenu] = useState(false);
  const [isSearchVisible, setSearchVisibility] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [user, updateUser] = useState<User>({
    isAuthenticated: false,
    token: '',
    errorMessage: '',
    name: '',
  })
  const signOut = useSignOut(updateUser);
  useVerify(user, updateUser);
  useBlockOverflow(isMenuOpen);

  function closeMenus(e: React.MouseEvent){
    setUserMenu(false);
    setSearchVisibility(false);
  }

  const { 
    handleAddToCart, 
    handleCaptureCheckout, 
    handleEmptyCart, 
    handleRemoveFromCart, 
    handleUpdateCartQty, 
    cart 
  } = useCart(setErrorMessage, setOrder, user, setJustAdded);

  const showNav = useNavScroll();
  
  return (
    < React.Fragment>
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <div onScroll={(e) => {}} onMouseDown={closeMenus}>
            <Menu signOut={signOut} user={user} close={() => setMenuState(false)} menuState={isMenuOpen} />
            <NavBar showNav={showNav} justAdded={justAdded} setSearchBar={setSearchVisibility} isSearchVisible={isSearchVisible} setUserMenu={setUserMenu} userMenu={userMenu} setMenuState={setMenuState} message={'10% off in your first purchase'} userInfo={{user, updateUser}}/>
            <Overlay isMenuOpen={isMenuOpen} closeMenu={() => setMenuState(false)}/>
            <Switch>
              <Route path={'/info'} render={() => <Info/>} />
              <Route path={'/login'} render={() => <Login updateUser={updateUser} user={user}/>} />
              <Route path={'/recover'} render={() => <Recover updateUser={updateUser} user={user}/>} />
              <Route path={'/signup'} render={() => <SignUp  updateUser={updateUser} user={user}/>} />
              <Route path={'/shop'} render={() => <Shop user={user} addToCart={handleAddToCart}/>} />
              <Route path={'/orders'} render={() => <Orders updateUser={updateUser} user={user}/>} />
              <Route path={'/updatePassword'} render={() => <UpdatePassword user={user}/>} />
              <Route path={'/item/:id'} render={() => <Item user={user} addToCart={handleAddToCart}/>} />
                <Route path={'/checkout'} render={() => (
                <Checkout
                  error={errorMessage}
                  handleCaptureCheckout={handleCaptureCheckout}
                  order={order}
                  user={user}
                  cart={cart}
                  handleEmptyCart={handleEmptyCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleUpdateCartQty={handleUpdateCartQty}
                />
                )} />
              <Route path={'/'} render={() => (<Home user={user}/>)} />
            </Switch>
            <Footer/>
          </div>
        </BrowserRouter>
      </Elements>
    </React.Fragment>
  )
}

export default App;
