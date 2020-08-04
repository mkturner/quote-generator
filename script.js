console.log('testing')

// Target IDs to dynamically fill content
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');

// Get Quote from API
async function getQuote() {
    const corsProxyUrl = 'https://gentle-plains-15721.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        // Wait until data comes back, then set to variable to process
        const response = await fetch(corsProxyUrl + apiUrl);
        const data = await response.json();

        // Edit page dynamically
        if (data.quoteAuthor === '') {
            // If author if blank, add unknown
            authorText.innerText = 'Unknown'
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            // Remove decreased font size if quote is short
            quoteText.classList.remove('long-quote')
        }

        quoteText.innerText = data.quoteText;
    } catch (error) {
        await getQuote();
    }
}

// Run when page loads
getQuote();

// Run when 'Get New Quote' button is clicked
// newQuoteButton.onclick();