import React, { useContext } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
//import Swal from 'sweetalert2';

const Cart = props => {
    //const [isConfirmed, setIsConfirmed] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };

    const submitedOrderHandler = () => {

        /*Swal.fire({
            icon: 'success',
            title: 'Your order has been successfully created'
          });*/

        let items = [];
        let orderDate = new Date();
        
        cartCtx.items.forEach(item => {
            const orderProducts = {                 
                "num_products": item.amount,                
                "product": {
                    "id": item.id
                },
            }
            items.push(orderProducts);
            //console.log(orderProducts);
        })
        
        const newOrder = {
           // "order": {
                "status": "CREATED",
                "total_price": cartCtx.totalAmount,
                "order_date": orderDate.toISOString().split('T')[0],
                "user":{
                    "id": 1
                },
                "orderProducts": items
          //  }  
        };
        
        //console.log(newOrder);
 
        //setIsConfirmed(true); 
        
        fetch('http://localhost:8000/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOrder)            
        }).then(response => {
            console.log(response);
            cartCtx.items.forEach(item => {
                let allItems = item.amount;
                console.log("all Items: " + allItems);
                while(allItems > 0) {
                    cartCtx.removeItem(item.id);
                    allItems = allItems - 1;
                    
                }
            });

            cartCtx.totalAmount = 0;
            props.onClose();
           // props.SubmitedOrderHandler();
           // console.log(response.json());
           // return response.json();

        });
    };

    
    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    };   

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item => {
                return (
                    <CartItem 
                    key={item.id} 
                    name={item.name} 
                    amount={item.amount} 
                    price={item.price} 
                    image={item.image}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)} />
                );
            }
                
                )}            
        </ul>
        );

    return (
        <Modal onClick={props.onClose} >
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose} >Close</button>
                {hasItems && <button className={classes.button} onClick={submitedOrderHandler} >Confirm</button>}                           
                {hasItems && <button className={classes['button--alt']}  onClick={props.onClose} >Cancel</button>}
            </div>          
        </Modal>
    );
};

export default Cart;