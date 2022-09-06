import { useState } from "react";

const useInput = (validatedValue) => {
    const [inputValue, setInputValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validatedValue(inputValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = event => {
        setInputValue(event.target.value);
    };

    const inputBlurHandler = event => {
        setIsTouched(true);
    };

    const reset = () => {
        setInputValue('');
        setIsTouched(false);
    };

    return {
        value: inputValue, 
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    };
};

export default useInput;