//
import classes from './MealItemForm.module.css';

const MealItemForm = props => {

    const submitHandler = event => {
        event.preventDefault();

        const enteredAmount = 1;
        const enteredAmountNumber = +enteredAmount;
        props.onAddToCart(enteredAmountNumber);
    };

    return (
        <form  onSubmit={submitHandler} >
            <div className={classes.form}>            
                <button>+ Add</button>
            </div>            
        </form>
    )
};

export default MealItemForm;

/*
<form  onSubmit={submitHandler} >
            <div className={classes.form}>
            <Input className={classes['form-input']}
                ref={amountInputRef}
                label="Amount" 
                input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }} />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1 - 5). </p>}
            </div>

            
        </form>*/