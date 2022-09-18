import Modal from '../UI/Modal';
import classes from './OrderItem.module.css';

const OrderItem = props => {

    const showFullOrderHandler = () => {
        localStorage.setItem('id', props.id);
        localStorage.setItem('totalAmount', props.totalAmount);
        props.onShowFullOrder();
    }

    const price = `$${props.totalAmount.toFixed(2)}`;

    return (
        <Modal>
            <li className={classes.meals}>
                <div>
                    <h4>Order No. {props.id}</h4>
                    <p>{props.order_date}</p>
                    <p>{price}</p>
                    <p>{props.status}</p>
                </div>
                <div>
                    <button onClick={showFullOrderHandler} id={props.id}>Show more...</button>
                </div>
            </li>
        </Modal>
    );
};

export default OrderItem;