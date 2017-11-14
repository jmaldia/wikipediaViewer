$(document).ready(function() {

    // This gets the random quote from forismatic on load 
    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?").done(update).fail(handleErr);

    // This gets the random quote from forismatic on click (new quote button or tweet button)
    $('#button-new-quote').click(function() {
      $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?").done(update).fail(handleErr);
    });

    // Function to update the quotes on the tweet and on the page
    function update(response) {
      var randomQuote = JSON.stringify(response.quoteText);
      var randomQuoteAuthor = '';
      
      if (response.quoteAuthor) {
        randomQuoteAuthor = JSON.stringify(response.quoteAuthor);
      } else {
        randomQuoteAuthor = "Anonymous";
      }
      
      
      // Updates the page quote
      $('#quote').html('<section id="quote"><h1>' + randomQuote + '</section></h1><p id="author">' + randomQuoteAuthor + '</p>');
      // Updates the twitter URL with current quote
      $('#tweet_btn').attr('href', 'https://twitter.com/intent/tweet?text=' + randomQuote + '&via=jonmaldia&url=http%3A%2F%2Fbit.ly%2Fjonquotes&hashtags=quotes%2Cinspiration' + "%0a-" + randomQuoteAuthor);
    }

    // Error handler
    function handleErr(jqxhr, textStatus, err) {
      console.log("Request Failed: " + textStatus + ", " + err);
    }
});
