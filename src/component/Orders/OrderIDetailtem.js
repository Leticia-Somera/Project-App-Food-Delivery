import classes from './OrderDetailItem.module.css';

const OrderDetailItem = (props) => {

    const price = `$${props.price.toFixed(2)}`;

    return (
        <li>
            <div>
                <h3>{props.name}</h3>
                <img src={props.image} alt={props.name} />
                <p>
                    <span className={classes.amount}>{props.amount} x </span>                  
                    <span className={classes.price}>{price}</span>
                    </p>
                <p></p>
            </div>
        </li>
    );

}

export default OrderDetailItem;