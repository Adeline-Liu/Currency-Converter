let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");

// Create dropdown menu from the currency list
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    fromDropDown.add(option);
  });

// Create the same dropdown for the other menue
currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    toDropDown.add(option);
  });

// Set default values
fromDropDown.value = "USD";
toDropDown.value = "CAD";

let convertCurrency = () => {
    // Create References
    const amount = document.querySelector("#amount").value;
    const fromCurrency = fromDropDown.value;
    const toCurrency = toDropDown.value;

    // Check if the input amount field is not empty
    if (amount.length != 0) {
        fetch(api)
        .then((resp) => resp.json())
        .then((data) => {
          let fromExchangeRate = data.conversion_rates[fromCurrency];
          let toExchangeRate = data.conversion_rates[toCurrency];
          const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
          result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        });
    } else {
      alert("Please fill in the amount.");
    }
  };

  document
    .querySelector("#convert-button")
    .addEventListener("click", convertCurrency);
  window.addEventListener("load", convertCurrency);