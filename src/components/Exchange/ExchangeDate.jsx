import React from 'react'
import classes from "./ExchangeDate.module.css";

const ExchangeDate = ({date,handleDateChange}) => {

  return (
    <div className={classes.container}>
        <span className={classes.date}>Choose the date of rates:</span>
        <div>
            <input type={'date'} value={date} onChange={handleDateChange}/>
        </div>
    </div>
  )
}

export default ExchangeDate