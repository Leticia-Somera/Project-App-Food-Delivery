import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import OrderConfirmed from '../Orders/OrderConfirmed';

const Cart = props => {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    //const ordersArray = [];
    //const newOrder = [];

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem(item);
    };   

    const submitOrderHandler = async () => {
        setIsSubmitting(true);
        await fetch('http://localhost:8000/orders', {
            method: 'POST',
            body: JSON.stringify({
                orderedItems: cartCtx
            })
        });

        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const confirmHandler = (event) => {
        event.preventDefault();
        setIsConfirmed(true);  

    };

    const confirmAlert = () => { 
        /*
        const newOrder =  {key: cartCtx.items.id,
        name: cartCtx.items.name,
        total: totalAmount
        }

                /*key: {cartCtx.items.id}, 
                name: cartCtx.items.name,
                amount: cartCtx.items.amount,
                price: cartCtx.items.price,
                image: cartCtx.items.image, 
                totalAmount
            }*/
        //console.log('new order: ' + newOrder);   
        alert('Your orden has been successfully created!')   
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item => 
                <CartItem 
                key={item.id} 
                name={item.name} 
                amount={item.amount} 
                price={item.price} 
                image={item.image}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)} />
                )}            
        </ul>
        );

    const modalActions = (
        <div>
            <button className={classes['button--alt']} onClick={props.onClose} type='button'>Close</button>
        </div>
    );

    const cartModalContent = 
    <React.Fragment>
        {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                {!isConfirmed && modalActions}
                {hasItems && <button className={classes.button} onConfirm={submitOrderHandler} onClick={confirmHandler} >Confirm</button>}
                <OrderConfirmed />    
                {isConfirmed && confirmAlert()}             
                {hasItems && <button className={classes['button--alt']} type='button' onClick={props.onClose} >Cancel</button>}
            </div>
    </React.Fragment>

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = 
    <React.Fragment>
        <p>Successfully sent the order</p>;
        <div className={classes.actions} >
            <button className={classes.button} onClick={props.onClose} type='button'>Close</button>
        </div>
    </React.Fragment> 
    
    return (
        <Modal onClose={props.onClose} >
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;