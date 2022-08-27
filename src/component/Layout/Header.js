import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import mealsHeader from '../../assets/meal_header.jpg';
import classes from './Header.module.css';

const Header = props => {
    return (
    <Fragment>
        <header className={classes.header}>
            <h1>Hexafood</h1>
            <HeaderCartButton onClick={props.onShowCart} />
        </header>
        <div className={classes['header-image']}>
            <img src={mealsHeader} alt='header_hexafood' />
        </div>
    </Fragment>
    );
};

export default Header;