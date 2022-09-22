import { useCallback, useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import Card from '../UI/Card';
import Modal from "../UI/Modal";
import classes from './OrderItem.module.css';

const OrderRegister = props => {
    const [orders, setOrders] = useState([]);
    const [httpError, setHttpError] = useState(null);


const orderList = useCallback(() => {
    fetch('http://localhost:8000/orders/user/' + localStorage.getItem('idCustomer'), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }, 
        //mode:'no-cors'
    }).then(response => {
        if(!response.ok) {
            throw new Error('Sorry! it was not possible to read the Order');
        }
        //console.log('order list: ' + response.json());
        return response.json();
    }).then(data => {
        //console.log(data);
        setOrders(data);
        return data;
    }).catch(error => {
        //console.log('id: ' + localStorage.getItem('idCustomer'));
        setHttpError(error.message);
    })
}, []);

useEffect(() => {
    orderList();
}, [orderList]);


const ordList = orders.map(order => {

    return (        
        <OrderItem 
        id={order.id}
        key={order.id}
        orderStatus={order.status}
        orderDate={order.order_date}
        totalAmount={order.total_price}
        onShowDetails={props.onShowDetails} >
        </OrderItem>
    );
});

return (
    <Modal onClick={props.onClose}  className={classes.register}>
        <h2 className={classes.title}>Orders List</h2>
            <Card>
                <ul>{ordList}</ul>
            </Card>           
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>                
            </div>          
    </Modal>
);
}


export default OrderRegister;