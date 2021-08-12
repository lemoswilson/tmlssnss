import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import { commerce } from './lib/commerce';
import Footer from './components/Footer';
import './style/defaults.scss';
import Recover from './pages/Recover';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Shop from './pages/Shop';
import Item from './pages/Item';
import Menu from './components/Menu';
import Overlay from './components/Overlay';
import useBlockOverflow from './hooks/useBlockOverflow';
import Checkout from './pages/Checkout';
import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import useVerify, { useSignOut } from './hooks/useVerify';
import useCart from './hooks/useCart';
import Orders from './pages/Orders';
import UpdatePassword from './pages/updatePassword';
import Search from './components/NavBar/Search';

// stopped at reset password/ checking integration between front and backendd 


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

interface Store {
  products: any[]
}

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

  function closeMenus(e: React.MouseEvent){
      console.log('should be closing menus');
      setUserMenu(false);
      setSearchVisibility(false);
  }
  
  useVerify(user, updateUser);

  const signOut = useSignOut(updateUser);
  
  function closeMenu(){
    setMenuState(false);
  }
  
  useBlockOverflow(isMenuOpen);

  const { 
    handleAddToCart, 
    handleCaptureCheckout, 
    handleEmptyCart, 
    handleRemoveFromCart, 
    handleUpdateCartQty, 
    cart 
  } = useCart(setErrorMessage, setOrder, user, setJustAdded);
  
  return (
    < React.Fragment>
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <div onMouseDown={closeMenus}>
            <Menu signOut={signOut} user={user} close={closeMenu} menuState={isMenuOpen} />
            <NavBar justAdded={justAdded} setSearchBar={setSearchVisibility} isSearchVisible={isSearchVisible} setUserMenu={setUserMenu} userMenu={userMenu} setMenuState={setMenuState} message={'sales message'} userInfo={{user, updateUser}}/>
            <Overlay isMenuOpen={isMenuOpen} closeMenu={closeMenu}/>
            <Switch>
              <Route path={'/login'} render={() => (<Login updateUser={updateUser} user={user}/>)} />
              <Route path={'/recover'} render={() => (<Recover updateUser={updateUser} user={user}/>)} />
              <Route path={'/signup'} render={() => (<SignUp  updateUser={updateUser} user={user}/>)} />
              <Route path={'/shop'} render={() => (<Shop user={user} addToCart={handleAddToCart}/>)} />
              <Route path={'/orders'} render={() => (<Orders updateUser={updateUser} user={user}/>)} />
              <Route path={'/updatePassword'} render={() => (<UpdatePassword user={user}/>)} />
              <Route path={'/item/:id'} render={() => (<Item user={user} addToCart={handleAddToCart}/>)} />
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
