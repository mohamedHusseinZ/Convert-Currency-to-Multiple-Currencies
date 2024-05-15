// src/CurrencyConverter.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);

  const API_KEY = '331c2e0a260b22db4df13b50';
  const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;

  useEffect(() => {
    axios.get(API_URL + 'USD')
      .then(response => {
        setCurrencies(Object.keys(response.data.conversion_rates));
        setFromCurrency('USD');
        setToCurrency('EUR');
      })
      .catch(error => console.error('Error fetching the currencies:', error));
  }, []);

  const handleConvert = () => {
    if (fromCurrency !== '' && toCurrency !== '' && amount > 0) {
      axios.get(`${API_URL}${fromCurrency}`)
        .then(response => {
          const rate = response.data.conversion_rates[toCurrency];
          setResult((amount * rate).toFixed(2));
        })
        .catch(error => console.error('Error fetching the conversion rate:', error));
    }
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <div>
        <label>From: </label>
        <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div>
        <label>To: </label>
        <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Amount: </label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>
      <button onClick={handleConvert}>Convert</button>
      {result && (
        <h2>{amount} {fromCurrency} = {result} {toCurrency}</h2>
      )}
    </div>
  );
};

export default CurrencyConverter;
