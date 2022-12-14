import classes from './CartItem.module.css';

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div><img alt={props.name} src={props.image} className={classes.image}/></div>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove} type='button'>-</button>
        <button onClick={props.onAdd} type='button'>+</button>
      </div>
    </li>
  );
};

export default CartItem;