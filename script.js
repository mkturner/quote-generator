/* 
    Hide content container
    Show loading animation
    Fetch data from API
    Manipulate Dom to insert data from API
    Show content container
    Hide loading animation
*/

// Target IDs to dynamically fill content
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading animation
function showLoadingAnimation() {
    /* This function hides the content box and shows a loading animation 
        until the promise in the api fetch() is finished. This provides 
        some context to the user that work is still being done. This is 
        especially helpful when the CORS proxy is warming up from a 
        cold start.
    */
    loader.hidden = false;
    quoteContainer.hidden = true; // hide until ready
}

function hideLoadingAnimation() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote from API
async function getQuote() {
    // Show loading animation until content ready.
    showLoadingAnimation();

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

        // When done loading, show quote
        hideLoadingAnimation();
    } catch (error) {
        await getQuote();
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text="${quote}" --${author}`;
    window.open(twitterUrl, '_blank');
}

// Run when page loads
getQuote();

// Run when 'Get New Quote' button is clicked
// addEventListener instead of onclick if you need multiple listeners on a target
newQuoteButton.addEventListener('click', getQuote, false);

// Tweet Quote
twitterButton.addEventListener('click', tweetQuote, false);