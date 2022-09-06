import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import HeaderLogoutButton from "./HeaderLogoutButton";
import HeaderOrdersButton from "./HeaderOrdersButton";
import mealsHeader from '../../assets/meal_header.jpg';
import logo from '../../assets/logo2.svg';
import classes from './Header.module.css';

const Header = props => {
    return (
    <Fragment>
        <header className={classes.header}>
            <div className={classes['header-logo']}>
                <img className={classes['logo-img']} src={logo} alt="Hexafood logo"/>
            </div>
            <div className={classes['header-buttons']}>
                <HeaderOrdersButton onClick={props.onShowOrder} className={classes['header-small-buttons']}/>
                <HeaderCartButton onClick={props.onShowCart} className={classes['header-cart-button']}/>
                <HeaderLogoutButton onClick={props.onShowLog} className={classes['header-small-buttons']}/>   
            </div>                     
        </header>
        <div className={classes['header-image']}>
            <img src={mealsHeader} alt='header_hexafood' />
        </div>
    </Fragment>
    );
};

export default Header;