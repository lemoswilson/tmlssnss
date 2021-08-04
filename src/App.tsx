import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import { commerce } from './lib/commerce';
import Footer from './components/Footer';
import './style/defaults.scss';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Shop from './pages/Shop';
import Item from './pages/Item';
import Menu from './components/Menu';
import Overlay from './components/Overlay';
import useBlockOverflow from './hooks/useBlockOverflow';
import Checkout from './pages/Checkout';
import { Cart } from '@chec/commerce.js/types/cart';
import { CheckoutCapture } from '@chec/commerce.js/types/checkout-capture';
import { CheckoutCaptureResponse } from '@chec/commerce.js/types/checkout-capture-response'
import { loadStripe } from '@stripe/stripe-js';



interface Store {
  products: any[]
}

export interface User {
  isAuthenticated: boolean,
  token: string,
  errorMessage: string
}

function App() {

  const [isMenuOpen, setMenuState] = useState(false);
  const [cart, setCart] = useState<Cart>();
  const [order, setOrder] = useState<CheckoutCaptureResponse>()
  const [errorMessage, setErrorMessage] = useState<string>();
  const [user, setUser] = useState<User>({
    isAuthenticated: false,
    token: '',
    errorMessage: '',
  })

  function closeMenu(){
    setMenuState(false);
  }

  useBlockOverflow(isMenuOpen);

  async function fetchCart(){
    setCart(await commerce.cart.retrieve());
  }

  useEffect(() => {
    fetchCart();
  }, [])

  async function handleAddToCart(product: string, quantity: number) {
    const { cart } = await commerce.cart.add(product, quantity);
    setCart(cart);
  }

  async function handleUpdateCartQty(product: string, quantity: number) {
		const { cart } = await commerce.cart.update(product, { quantity })
    setCart(cart)
	}

  async function handleRemoveFromCart(product: string) {
    const { cart } = await commerce.cart.remove(product);
    setCart(cart)
  }

  async function handleEmptyCart(){
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  }

  async function handleCaptureCheckout(checkoutTokenId: string, newOrder: CheckoutCapture){
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder)
      refreshCart()
    } catch (error) {
      setErrorMessage(error.data.error.message)
    }
  }

  async function refreshCart() {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  }

   

  return (
    <React.Fragment>
      <BrowserRouter>
        <Menu close={closeMenu} menuState={isMenuOpen} />
        <NavBar setMenuState={setMenuState} message={'sales message'} userInfo={{user, setUser}}/>
        <Overlay isMenuOpen={isMenuOpen} closeMenu={closeMenu}/>
        <Switch>
          <Route path={'/login'} render={() => (<Login user={user}/>)} />
          <Route path={'/signup'} render={() => (<SignUp user={user}/>)} />
          <Route path={'/shop'} render={() => (<Shop user={user} addToCart={handleAddToCart}/>)} />
          <Route path={'/item/:id'} render={() => (<Item user={user} addToCart={handleAddToCart}/>)} />
          <Route path={'/checkout'} render={() => (<Checkout user={user} cart={cart} handleEmptyCart={handleEmptyCart}  handleRemoveFromCart={handleRemoveFromCart} handleUpdateCartQty={handleUpdateCartQty} />)} />
          <Route path={'/'} render={() => (<Home user={user}/>)} />
        </Switch>
        <Footer/>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App;
