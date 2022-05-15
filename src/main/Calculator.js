import React, { useState } from 'react';
import './Calculator.css';

import Button from './components/Button';
import Display from './components/Display';

function Calculator() {

    const [displayValue, setDisplayValue] = useState('0');
    const [clearDisplay, setClearDisplay] = useState(false);
    const [operations, setOperations] = useState(null);
    const [values, setValues] = useState([0, 0]);
    const [valueCurrent, setValueCurrent] = useState(0);

    const setInitialValues = () => {
        setDisplayValue('0');
        setClearDisplay(false);
        setOperations(null);
        setValues([0 ,0]);
        setValueCurrent(0);
    }

    const clearMemory = () => {
        setInitialValues();
    }

    const setOperation = (operation) => {
        if (valueCurrent === 0) {
            setOperations(operation);
            setValueCurrent(1);
            setClearDisplay(true);
        }else {
            const equals = operation === '=';
            const currentOperation = operations;
            const arrayValues = [...values];

            switch (currentOperation) {
                case '+':
                    arrayValues[0] = arrayValues[0] + arrayValues[1];
                    arrayValues[1] = 0;
                    break;
                case '-':
                    arrayValues[0] = arrayValues[0] - arrayValues[1];
                    arrayValues[1] = 0;
                    break;
                case '*':
                    arrayValues[0] = arrayValues[0] * arrayValues[1];
                    arrayValues[1] = 0;
                    break;
                case '/':
                    arrayValues[0] = arrayValues[0] / arrayValues[1];
                    arrayValues[1] = 0;
                    break;
            
                default:
                    break;
            }

            setDisplayValue(arrayValues[0]);
            setOperations(equals ? null : operation);
            setValueCurrent(equals ? 0 : 1);
            setClearDisplay(!equals);
            setValues(arrayValues);
        }
    }

    const addDigit = (n) => {
        if (n === '.' && displayValue.includes('.')) {
            return
        }

        let valueWithZero = false; 

        if (n === '.' && displayValue === '0') {
            valueWithZero = true;
        }

        const cleaningDisplay = displayValue === '0' || clearDisplay;
        const currentValue = cleaningDisplay ? '' : displayValue;
        const valueNew = valueWithZero ? '0' : currentValue ;
        const valueDisplay = valueNew + n;
        
        setDisplayValue(valueDisplay);
        setClearDisplay(false);

        if (n !== '.') {
            const i = valueCurrent;
            const newValue = parseFloat(valueDisplay);
            const newValueArray = [...values];
            newValueArray[i] = newValue;
            setValues(newValueArray);
        }

    }

    return (
        <div className='calculator'>
            <Display value={displayValue} />
            <Button label="AC" click={clearMemory} triple />
            <Button label="/" click={setOperation} operation/>
            <Button label="7" click={addDigit} />
            <Button label="8" click={addDigit} />
            <Button label="9" click={addDigit} />
            <Button label="*" click={setOperation} operation/>
            <Button label="4" click={addDigit} />
            <Button label="5" click={addDigit} />
            <Button label="6" click={addDigit} />
            <Button label="-" click={setOperation} operation/>
            <Button label="1" click={addDigit} />
            <Button label="2" click={addDigit} />
            <Button label="3" click={addDigit} />     
            <Button label="+" click={setOperation} operation/>
            <Button label="0" click={addDigit} double/>
            <Button label="." click={addDigit} />
            <Button label="=" click={setOperation} operation/>         
        </div>
    );
}

export default Calculator;