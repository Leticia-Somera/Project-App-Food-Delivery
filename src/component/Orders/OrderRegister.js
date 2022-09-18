import { useCallback, useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import Card from '../UI/Card';
import classes from './OrderItem.module.css';

const OrderRegister = props => {
    const [orders, setOrders] = useState([]);
    const [httpError, setHttpError] = useState(null);


const orderList = useCallback(() => {
    fetch('http://localhost:8000/orders' + localStorage.getItem('idUser'), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + localStorage.getItem('token')
        }, 
        mode:'cors'
    }).then(response => {
        if(!response.ok) {
            throw new Error('Sorry! the order could not be readSorry! it was not possible to read the Order');
        }
        return response.json();
    }).then(data => {
        console.log(data);
        setOrders(data);
        return data;
    }).catch(error => {
        setHttpError(error.message);
    })
}, []);

useEffect(() => {
    orderList();
}, [orderList]);

const ordList = orders.map(order => {
    return (
        <OrderItem 
        id={order.idOrder}
        key={order.idOrder}
        orderStatus={order.status}
        orderDate={order.order_date}
        totalAmount={order.totalAmount}
        onShowDetails={props.onShowDetails} />
    );
});

return (
    <section className={classes.meals}>
        <Card>
            <ul>{ordList}</ul>
        </Card>
    </section>
);
}


export default OrderRegister;