//import { useState } from "react";

//import Header from "./component/Layout/Header";
//import Meals from "./component/Meals/Meals";
//import Cart from "./component/Cart/Cart";
//import CartProvider from "./store/CartProvider";
import LoginInput from "./component/Login/LoginInput";
//import LoginForm from "./component/Login/LoginForm";

function App() {
  /*
  const [cartProviderIsShown, setCartProviderIsShown] = useState(false);
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartProviderHandler = () => {
      setCartProviderIsShown(true);
  };

  const hideCartProviderHandler = () => {
    setCartIsShown(false);
  }

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  }
/*
  const showLogHandler = () => {
    console.log("showLogHandler");
    setLogIsShown(true);
  }
<LoginInput />
  const hideLogHandler = () => {
    setLogIsShown(false);
  }*/

  return (    
      <LoginInput/>           
  );
 };

export default App;