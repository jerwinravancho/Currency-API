const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('fromCurrency');
const toSelect = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const resultText = document.getElementById('resultText');

// 1. Populate the dropdowns when the page loads
async function init() {
    const url = "https://open.er-api.com/v6/latest/USD";
    const response = await fetch(url);
    const data = await response.json();
    
    const currencies = Object.keys(data.rates);
    
    currencies.forEach(currency => {
        let option1 = new Option(currency, currency);
        let option2 = new Option(currency, currency);
        fromSelect.add(option1);
        toSelect.add(option2);
    });

    // Set defaults
    fromSelect.value = "USD";
    toSelect.value = "PHP";
}

// 2. Perform the conversion
async function convert() {
    const from = fromSelect.value;
    const to = toSelect.value;
    const amount = amountInput.value;

    resultText.innerText = "Converting...";

    try {
        const url = `https://open.er-api.com/v6/latest/${from}`;
        const response = await fetch(url);
        const data = await response.json();
        
        const rate = data.rates[to];
        const convertedAmount = (amount * rate).toFixed(2);

        resultText.innerText = `${amount} ${from} = ${convertedAmount} ${to}`;
    } catch (error) {
        resultText.innerText = "Error fetching rates.";
    }
}

convertBtn.addEventListener('click', convert);
init();