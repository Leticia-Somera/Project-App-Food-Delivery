import { useEffect, useState, useCallback } from "react";
import OrderDetailItem from "./OrderIDetailtem";
import Modal from "../UI/Modal";
import classes from './FullOrder.module.css';

const FullOrder = props => {
    const [orderProducts, setOrderProducts] = useState([]);
    const [httpError, setHttpError] = useState(null);

    const orderProductList = useCallback(() => {
        fetch('http://localhost:8000/order/' + localStorage.getItem('id') + '/fullOrder', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Access-Control-Request-Method': 'GET',
                //'Access-Control-Request-Headers': 'Content-Type, Authorization'            
        }}).then(response => {
            console.log('id local: ' +localStorage.getItem('id'));
        if(!response.ok) {
            throw new Error('Sorry! it was not possible to fetch Orders');
        }
        //console.log('Response reading OK');
        return response.json();
    }).then(data => {
        //console.log(data._embedded.orderProductList);
        setOrderProducts(data._embedded.orderProductList);
        return (data._embedded.orderProductList);
        /*console.log(data.orderItemsList);
        setOrderItems(data.orderProducts);
        return (data.orderProducts);*/
    }).catch(error => {
        console.log(error.message);
        setHttpError(error.message);
    })}, []);

useEffect(() => {
    orderProductList();
}, [orderProductList]);

const cancelOrder = () => {
    fetch('http://localhost:8000/order/' + localStorage.getItem('id'), {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token'),
            'Access-Control-Request-Headers': 'Content-Type, Authorization'
        }}).then(response => {
        if(!response.ok) {
            throw new Error('The order could not be Canceled');
        }
        console.log('auth ok');
        props.onClose();
        return response.json();
    }).catch(error => {
        setHttpError(error.message);
    });
}

const orderProductsAll = orderProducts.map(item => {
    return (
        <OrderDetailItem 
        key={item.id}
        name={item.product.name}
        price={item.product.price}    
        amount={item.num_products}    
        />        
    );
});

return (
    <Modal onClick={props.onClose}>
        <h3>Details Order No. {localStorage.getItem('id')} </h3>
        {httpError && <div className={classes.error} >Sorry! it was not possible to read Order details</div>}
        {!httpError && <ul>{orderProductsAll} </ul>}
        <div className={classes.total}>
            <p>Total Amount {localStorage.getItem('totalAmount')}</p>
        </div>
        <div>
            <button className={classes['button--alt']} onClick={props.onClose} >Close</button>
            <button className={classes.button} onClick={cancelOrder}>Cancel</button>
        </div>
    </Modal>
);
};


export default FullOrder;