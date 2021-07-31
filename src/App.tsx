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
  const [user, setUser] = useState<User>({
    isAuthenticated: false,
    token: '',
    errorMessage: '',
  })


  // const [state, setState] = useState<Store>({
  //     products: []
  // })

  // function fetchProducts() {
  //   commerce.products.list().then((p) => {
  //     setState({products: p.data})
  //   }).catch((error) => {
  //     console.log('there was an error fetching the products', error)
  //   })
  // }

  // useEffect(() => {
  //   fetchProducts()
  // }, [])


  return (
    <React.Fragment>
      <BrowserRouter>
        <NavBar setMenuState={setMenuState} message={'sales message'} userInfo={{user, setUser}}/>
        <Switch>
          <Route path={'/login'} render={() => (<Login user={user}/>)} />
          <Route path={'/signup'} render={() => (<SignUp user={user}/>)} />
          <Route path={'/shop'} render={() => (<Shop user={user}/>)} />
          <Route path={'/item/:id'} render={() => (<Item user={user}/>)} />
          <Route path={'/'} render={() => (<Home user={user}/>)} />
        </Switch>
        <Footer/>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App;
