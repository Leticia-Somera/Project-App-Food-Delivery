import classes from './OrderItem.module.css';

const OrderIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 512 512"
      fill='black'>
     <path d="M101.5 64C114.6 26.7 150.2 0 192 0s77.4 26.7 90.5 64H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h37.5zM224 96c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM160 368c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zM96 392c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24zm64-120c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zM96 296c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z"/></svg>

    );
  };

const OrderItem = props => {

    const showFullOrderHandler = () => {
        localStorage.setItem('id', props.id);
      // console.log('idOrder: ' + localStorage.getItem('idOrder'));
        localStorage.setItem('totalAmount', props.totalAmount);
        props.onShowDetails();
    }

    const price = `$${props.totalAmount.toFixed(2)}`;

    return (
        <div>      
            <ul className={classes['order-items']}>
                <div className={classes['order-header']} >
                <div className={classes.icon}>
                    <OrderIcon  />
                </div>               
                <h3 className={classes['order-num']} >Order No.  {props.id}</h3>                
                <button onClick={showFullOrderHandler} id={props.id}>Show more...</button>
                </div>
                
                <div>                    
                    <p><span>Date: </span>{props.orderDate}</p>
                    <p><span>Total: </span>{price}</p>
                    <p><span>Status: </span>{props.orderStatus}</p>
                </div>                
            </ul>
        </div>
    );
};

export default OrderItem;