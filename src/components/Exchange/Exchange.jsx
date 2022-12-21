import React from 'react'
import classes  from './Exchange.module.css'

 const Exchange = ({currencyOption , label, selectCurrency, onCurrencyChange, amount ,onAmountChange}) => {
  return (
            <div className={classes.content}>
                <div>
                    <div>
                        <label htmlFor={'from'} > {label}< /label>
                    </div>
                    <input type={"number"} value={amount} onChange={onAmountChange} name='from'/>
                    <div>
                        <select value={selectCurrency} onChange={onCurrencyChange}>
                            {currencyOption.map(option => <option key={option} value={option}>{option}</option>)}
                        </select>
                    </div>

                </div>

            </div>

  )
}

export default Exchange