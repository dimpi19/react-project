import React, { useEffect, useState } from 'react';
import Header from './Componet/Header';
import Home from './Componet/Home';
import { Route, Routes } from 'react-router';
import Category from './Componet/Category';
import Footer from './Componet/Footer';
// import Product from './Componet/Product';
import ProductInfo from './Componet/Redux/ProductInfo';
import Cart from './Componet/Cart';
import WishList from './Componet/WishList';
import Checkout from './Componet/Checkout';
// import Product1 from './Componet/Product1'
import { myContext } from './Componet/context';
import Login from './Componet/Login';
import Signup from './Componet/Signup';
import PrivateRoute from './Componet/PrivateRoute';
import Bill from './Componet/Bill';
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
   const [show, setShow] = useState(false);
  const [showName, setShowName] = useState(null);

    useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) setShowName(user.name);
  }, []);
  return (
    <myContext.Provider value={{show, setShow,showName, setShowName}}>
     {showName &&  <Header />}
      <Routes>
        <Route path='/' element={<PrivateRoute element={<Home />}/>}/>
        <Route path='/cart' element={<PrivateRoute element={<Cart />}/>} />
        <Route path='/checkout' element={<PrivateRoute element={<Checkout />}/>} />
        <Route path='/wishlist' element={<PrivateRoute element={<WishList />}/>} />
        <Route path="/:category" element={<PrivateRoute element={<Category />}/>} />
        <Route path='/:category/:id' element={<PrivateRoute element={<ProductInfo />}/>} />
        <Route path='/login' element={<Login setLogin={setShowName} />} />
        <Route path='/signup' element={<Signup setLogin={setShowName} />} />
         <Route path="/bill" element={<Bill />} />
      </Routes>
      {showName && <Footer />}
    </myContext.Provider>
  );
}

export default App;
