import { useContext } from 'react';
import MealItemForm from './MealItemForm';
import classes from './MeailItem.module.css';
import CartContext from '../../../store/cart-context';


const MealItem = props => {
    const cartCtx = useContext(CartContext);
    const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price,
            image: props.image
        });
    };

    return (
    <li className={classes.meal}>
        <div>
            <div><img src={props.image} alt={props.name} /></div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
            <MealItemForm onAddToCart={addToCartHandler} />
        <div>
        </div>
        

    </li>
    )
};

export default MealItem;