import React from 'react'
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import './index.css';
import HomeScreen from './screens/HomeScreen';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UsersListScreen from './screens/UsersListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductsListScreen from './screens/ProductsListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrdersListScreen from './screens/OrdersListScreen';




const App =()=> {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route exact path='/page/:pageNumber' component={HomeScreen} />
          <Route exact path='/search/:keyword/page/:pageNumber' component={HomeScreen} />
          <Route exact path='/' component={HomeScreen} />
          <Route exact path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          

          {/* admin routes */}
          <Route path='/admin/users' component={UsersListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />

          <Route exact path='/admin/products' component={ProductsListScreen} />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route exact path='/admin/products/:pageNumber' component={ProductsListScreen} />

          <Route path='/admin/orders' component={OrdersListScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
