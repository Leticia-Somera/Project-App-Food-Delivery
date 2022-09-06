import { useState } from 'react';
import Header from '../Layout/Header';
import CartProvider from '../../store/CartProvider';
import Cart from '../Cart/Cart';
//import HeaderLogoutButton from '../Layout/HeaderLogoutButton';
import Meals from '../Meals/Meals';
import useInput from './hooks/use-input';
import classes from './LoginInput.module.css';
import mealsHeader from '../../assets/meal_header.jpg'

const LoginInput = props => {
    const [isCartProvider, setIsCartProvider] = useState(false);
    const [cartIsShown, setCartIsShown] = useState(false);
   
    const { 
        value: inputUsername, 
        isValid: inputUsernameIsValid,
        hasError: usernameInputHasError, 
        valueChangeHandler: usernameChangeHandler, 
        inputBlurHandler: usernameBlurHandler,
        reset: resetUsernameInput
    } = useInput(value => value.trim() !== '');

    const { 
        value: inputEmail, 
        isValid: inputEmailIsValid,
        hasError: emailInputHasError, 
        valueChangeHandler: emailChangeHandler, 
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput
    } = useInput(value => value.includes('@'));
        
    let formIsValid = false;    

    if(inputUsernameIsValid && inputEmailIsValid){ 
        formIsValid = true;
    }

    const formSubmitHandler = event => {
        event.preventDefault();

        if(!inputUsernameIsValid){
            return;
        }
       
        console.log('Submited!');
        console.log(inputUsername, inputEmail);
        
        resetUsernameInput();
        resetEmailInput();
    };
    const CartProviderHandler = () => {
        setIsCartProvider(true);
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

    const showForm = (
        <form onSubmit={formSubmitHandler}  className={classes['form-show']} >
            <div className={classes['form-control']}>
                <label htmlFor="username">Username</label>
                <input  
                type='text' 
                id='username' 
                onChange={usernameChangeHandler}
                onBlur={usernameBlurHandler} 
                value={inputUsername} />
                {usernameInputHasError && <p className={classes['error-text']} >Username must not be empty</p>}
            </div>
            <div className={classes['form-control']}>
                <label htmlFor="email">Email</label>
                <input  
                type='text' 
                id='email' 
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler} 
                value={inputEmail} />
                {emailInputHasError && <p className={classes['error-text']} >Email must not be empty</p>}
            </div>
            <div>
                <button disabled={!formIsValid} className={classes['form-actions']} onClick={CartProviderHandler} >Submit</button>
            </div>
        </form>
    );

    

    const showCartProvider = (
        <CartProvider onClose={hideCartProviderHandler}>
            {cartIsShown && <Cart onClose={hideCartHandler} />}
            <Header onShowCart={showCartHandler} />
            <main>
            <Meals />
            </main>
        </CartProvider> 
    );

    


    return (
        <div className={classes.form}>
            <div className={classes['header-image']}>
            <img src={mealsHeader} alt='header_hexafood' />
        </div>
            {!isCartProvider && showForm}
            {isCartProvider && showCartProvider}
        </div>       

    )
};

export default LoginInput;