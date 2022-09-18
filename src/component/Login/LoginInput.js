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
        value: inputEmail, 
        isValid: inputEmailIsValid,
        hasError: emailInputHasError, 
        valueChangeHandler: emailChangeHandler, 
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput
    } = useInput(value => value.includes('@'));

    const { 
        value: inputPassword, 
        isValid: inputPasswordIsValid,
        hasError: passwordInputHasError, 
        valueChangeHandler: passwordChangeHandler, 
        inputBlurHandler: passwordBlurHandler,
        reset: resetPasswordInput
    } = useInput(value => value.trim() !== '');
        
    let formIsValid = false;    

    if(inputEmailIsValid && inputPasswordIsValid){ 
        formIsValid = true;
    }

    const formSubmitHandler = event => {
        event.preventDefault();

        if(!inputEmailIsValid){
            return;
        }
       
       // console.log('Submited!');
       // console.log(inputEmail, inputPassword);
        
        resetEmailInput();
        resetPasswordInput();
    };
    const CartProviderHandler = () => {
       // console.log('test submit button');
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
                <label htmlFor="email">Email</label>
                <input  
                type='email' 
                id='email' 
                placeholder='Your Email'
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler} 
                value={inputEmail} />
                {emailInputHasError && <p className={classes['error-text']} >Username must not be empty</p>}
            </div>
            <div className={classes['form-control']}>
                <label htmlFor="password">Password</label>
                <input  
                type='password' 
                id='password' 
                placeholder='Your Password'
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler} 
                value={inputPassword} />
                {passwordInputHasError && <p className={classes['error-text']} >Password must not be empty</p>}
            </div>
            <div>
                <button disabled={!formIsValid} type="button"  className={classes['form-actions']} onClick={CartProviderHandler} >Submit</button>
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