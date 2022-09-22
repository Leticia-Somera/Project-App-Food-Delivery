import { Fragment, useState } from "react";
import Header from "./component/Layout/Header";
import Meals from "./component/Meals/Meals";
import Cart from "./component/Cart/Cart";
import CartProvider from "./store/CartProvider";
import OrderRegister from './component/Orders/OrderRegister';
import FullOrder from "./component/Orders/FullOrder";
import Login from './component/Authentication/Login';
import Swal from "sweetalert2";

function App() {
  //const [cartProviderIsShown, setCartProviderIsShown] = useState(false);
  const [cartIsShown, setCartIsShown] = useState(false);
  const [showOrdersSummary, setShowOrdersSummary] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [idCustomer, setIdCustomer] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [httpError, setHttpError] = useState(null);

  
  const getIdCustomer = (token, email) => {
    fetch('http://localhost:8000/user/id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
       // 'Access-Control-Request-Headers': 'Content-Type, Authorization'         
      },
      //mode:'no-cors',
      body: JSON.stringify({
        username: email
      })
    }).then(response => {
      if(response.status === 401) {
        throw new Error('Unauthorized operation.');
      }
      if(response.status === 422) {
        throw new Error('Validation failed.');
      }
      if (response.status !== 200 && response.status !== 201) {        
        throw new Error('You could not be authenticated. Try again!');
      }
     
      return response.json();
    }).then(data => {
      setIdCustomer(data);
      localStorage.setItem('idCustomer', data);
      return data;
    }).catch(error => {
      setHttpError(error.message);
      //console.log(error);
      setAuthLoading(false);
      //setIsAuth(false);
    })
  };

  const logoutHandler = () => {
    setIsAuth(false);
    setAuthLoading(false);
    localStorage.removeItem('token');
    localStorage.removeItem('idCustomer');
  }

  const loginHandler = (event, authData) => {
    //console.log('login');
    event.preventDefault();
    setAuthLoading(true);
    fetch('http://localhost:8000/authenticate', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: authData.username,
        password: authData.password
      })
    }).then(response => {
      if (response.status === 401) {
        throw new Error('Unauthorized operation.');
      }
      if (response.status === 422) {
        throw new Error('Validation failed.');
      }
      if (response.status !== 200 && response.status !== 201) {
        //console.log('Http Error!');
        throw new Error('You could not be authenticated. Try again!');
      }
      return response.json();
    }).then(data => {
      setIsAuth(true);
      setToken(data.token);
      setAuthLoading(false);
     
      getIdCustomer(data.token, authData.username);
      
      localStorage.setItem('token', data.token);

      const remainingMiliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(
        new Date().getTime() + remainingMiliseconds
      );
      localStorage.setItem('expiryDate', expiryDate.toISOString());
    }).catch(error => {        
        //console.log(error);
        setIsAuth(false);
        setAuthLoading(false);
        setHttpError(error.message);
      });
    }

    const showCartHandler = () => {
      setCartIsShown(true);
    };
  
    const hideCartHandler = () => {
      setCartIsShown(false);
    }

    const showOrders = () => {
      setShowOrdersSummary(true);
      setShowDetails(false);
    }

    const closeOrders = () => {
      setShowOrdersSummary(false);
    }

    const showOrderCreated = () => {
      setOrderCreated(!orderCreated);
    }

    const closeOrderCreated = () => {
      setOrderCreated();
      showOrders();
    }

    const onShowDetails = () => {
      setShowDetails(true);
      setShowOrdersSummary(false);
    }

    const onCloseDetails = () => {
      showOrders();
    }

    const Popup = () => {
      closeOrderCreated();
      Swal.fire({
        icon: 'success',
        title: 'Your order has been successfully created'
      });
    }

  return (  
    
    //<div>
     
    <CartProvider>
        {isAuth && <Fragment>
        {cartIsShown && <Cart onClose={hideCartHandler} onCreateOrder={showOrderCreated} />}
        <Header onShowCart={showCartHandler} onShowOrd={showOrders} onShowLogout={logoutHandler} showOrdersSummary={showOrdersSummary} showDetails={showDetails} onHideOrdersSummary={closeOrders} />
        
        <main>
          {!showOrdersSummary && !showDetails && <Meals />}  
          {showOrdersSummary && <OrderRegister onClose={closeOrders} onShowDetails={onShowDetails} /> }
          {!showOrdersSummary && showDetails && <FullOrder onClose={onCloseDetails} /> }
          {orderCreated && Popup  }
        </main>
        
        </Fragment>
        }
        {!isAuth && <Login onLogin={loginHandler} loading={authLoading} error={httpError} />}
     </CartProvider>
    //</div>   
       
  );
 };

export default App;