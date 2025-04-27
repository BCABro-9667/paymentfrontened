import React from 'react';
import UserDetails from './components/UserDetails';
import TopSupporters from './components/TopSupporters';
import PaymentForm from './components/PaymentForm';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
   <>
    <div className="app">
      <ToastContainer position="top-center" />
      <UserDetails />
      <div className="main-section">
        <TopSupporters />
        <ToastContainer />
        <PaymentForm />
      </div>
    </div>
      <Footer/>
   </>

  );
};

export default App;
