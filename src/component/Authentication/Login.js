import { useState } from 'react';
//import Auth from './Auth';
import { required, length, email} from './Validator';
import Button from '../UI/Button';
import classes from './Login.module.css';
import mealsHeader from '../../assets/meal_header.jpg';

const Login = props => {
    const [state, setState] = useState({
        loginForm: {
            email: {
                value: '',
                valid: false,
                touched: false,
                validators: [required, email]
            },
            password: {
                value: '',
                valid: false,
                touched: false,
                validators: [required, length({min: 8})]
            },
            formIsValid: false
        }
    });

    const inputSubmitHandler = (input, value) => {
        setState(prevState => {
            value = input.target.value;
            let isValid = true;
            for(const validator of prevState.loginForm[input.target.id].validators) {
                isValid = isValid && validator(input.target.value);
            }
            const updatedForm = {
                ...prevState.loginForm,
                [input.target.id]: {
                    ...prevState.loginForm[input.target.id],
                    valid: isValid,
                    value: value
                }
            }
            let formIsValid = true;
            for(const inputName in updatedForm) {
                formIsValid = formIsValid && updatedForm[inputName].valid;
            }
            return {
                loginForm: updatedForm,
                formIsValid: formIsValid
            };
        });
    };

    const inputBlurHandler = input => {
        setState(prevState => {
            return {
                loginForm: {
                    ...prevState.loginForm,
                    [input]: {
                        ...prevState.loginForm[input],
                        touched: true
                    }
                }
            };
        });
    };

    
 
    return (
        <div >
            <div className={classes['header-image']}>
                <img src={mealsHeader} alt='header_hexafood' />
            </div>
            <h2>Welcome to Hexafood!</h2> 

            <form onSubmit={event => 
                    props.Login(event, {
                        email: state.loginForm.email.value,
                        password: state.loginForm.password.value
                    })
                }
                className={classes['form-show']}>

                    <div className={classes['form-control']}>
                        {props.error && <div className={classes.error}>{props.error}</div>}
                        <label htmlFor="email">Email</label>
                        <input  
                        type='email' 
                        id='email' 
                        placeholder='Your Email'
                        onChange={inputSubmitHandler}
                        onBlur={inputBlurHandler.bind(this, 'email')} 
                        value={state.loginForm['email'].value} />
                    </div>
                    <div className={classes['form-control']}>
                        <label htmlFor="password">Password</label>
                        <input  
                        type='password' 
                        id='password' 
                        placeholder='Your Password'
                        onChange={inputSubmitHandler}
                        onBlur={inputBlurHandler.bind(this, 'password')} 
                        value={state.loginForm['password'].value} />
                    </div>
                        <Button design="raised" type="submit" loading={props.loading} className={classes['form-actions']}>Login</Button>

                </form>
        </div>
    );
};

export default Login;

/*
<Auth>
            <div className={classes['form-control']}>
                <div className={classes['header-image']}>
                    <img src={mealsHeader} alt='header_hexafood' />
                </div>    
                <h2>Welcome to Hexafood!</h2>     
                <form onSubmit={event => 
                    props.Login(event, {
                        email: state.loginForm.email.value,
                        password: state.loginForm.password.value
                    })
                }>

                    <div className={classes['form-control']}>
                        {props.error && <div className={classes.error}>{props.error}</div>}
                        <label htmlFor="email">Email</label>
                        <input  
                        type='email' 
                        id='email' 
                        placeholder='Your Email'
                        onChange={inputSubmitHandler}
                        onBlur={inputBlurHandler.bind(this, 'email')} 
                        value={state.loginForm['email'].value} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input  
                        type='password' 
                        id='password' 
                        placeholder='Your Password'
                        onChange={inputSubmitHandler}
                        onBlur={inputBlurHandler.bind(this, 'password')} 
                        value={state.loginForm['password'].value} />
                    </div>
                        <button disabled={!props.error} type="submit" loading={props.loading} className={classes['form-actions']} >Submit</button>

                </form>
            </div>  
        </Auth>
*/