import React, {useEffect, useState} from 'react'
import classes from './Exchange.module.css'
import Exchange from "./Exchange.jsx";
import ExchangeDate from "./ExchangeDate.jsx";

const ExchangeContainer = () => {
    const BASE_URL = 'https://api.exchangerate.host/'

    const [currencyOption, setCurrencyOption] = useState([])
    const [exchangeRate, setExchangeRate] = useState()
    const [fromCurrency, setFromCurrency] = useState()
    const [toCurrency, setToCurrency] = useState()
    const [amount, setAmount] = useState(1)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
    const [date, setDate] = useState()
    const [lastDate, setLastDate] = useState()

    let fromAmount, toAmount
    if (amountInFromCurrency) {
        fromAmount = amount
        toAmount = amount * exchangeRate
    } else {
        toAmount = amount
        fromAmount = amount / exchangeRate
    }

    const handleFromAmountChange = (e) => {
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
    }
    const handleToAmountChange = (e) => {
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
    }
    const handleDateChange = (e) => {
        setDate(e.target.value)
    }


    useEffect(() => {
        fetch(`${BASE_URL}latest`)
            .then(res => res.json())
            .then(data => {
                const firstExchange = Object.keys(data.rates)[0]
                setCurrencyOption([data.base, ...Object.keys(data.rates)])
                setExchangeRate(data.rates[firstExchange])
                setFromCurrency(data.base)
                setLastDate(data.date)
                setDate(data.date)
                setToCurrency(firstExchange)
            })
    }, [])

    useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
            fetch(`${BASE_URL}convert?from=${fromCurrency}&to=${toCurrency} `)
                .then(response => response.json())
                .then(data => setExchangeRate(data.info.rate))
        }
    }, [fromCurrency, toCurrency])

    useEffect(() => {
        fetch(`${BASE_URL}${date}?base=${fromCurrency}&${toCurrency}`)
            .then(response => response.json())
            .then(data => {
                setExchangeRate(data.rates[toCurrency])
            })
    }, [date,toCurrency,fromCurrency])

    return (<div>
            <ExchangeDate date={date}
                          handleDateChange={handleDateChange}
            />
            <div className={classes.container}>
                <Exchange currencyOption={currencyOption}
                          label='From:'
                          selectCurrency={fromCurrency}
                          amount={fromAmount}
                          onAmountChange={handleFromAmountChange}
                          onCurrencyChange={e => setFromCurrency(e.target.value)}
                />
                <Exchange
                    currencyOption={currencyOption}
                    label='To:'
                    selectCurrency={toCurrency}
                    amount={toAmount}
                    onAmountChange={handleToAmountChange}
                    onCurrencyChange={e => setToCurrency(e.target.value)}
                />
            </div>
            <span className={classes.lastdate}>Last date of update: {lastDate}</span>
        </div>


    )
}

export default ExchangeContainer