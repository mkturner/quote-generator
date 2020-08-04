console.log('testing')

// Get Quote from API
async function getQuote() {
    const corsProxyUrl = 'https://gentle-plains-15721.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        // Wait until data comes back, then set to variable to process
        const response = await fetch(corsProxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log('Whoops, no quote...', error);
        getQuote();
    }
}

// Run when page loads
getQuote();