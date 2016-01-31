

$(document).ready(function() {

	/* Get references to items that we need to use */
	var quoteText = $("#quote-text");
	var quoteOriginator = $("#quote-originator");
	var newQuoteButton = $("#new-quote-button");
	var twitterLink = $("#twitter-share-button-link");

	/* Create some useful constants */
	var thisPageURL = window.location.href;
	var tweetPostpend = '&hashtags=FreeCodeCamp,LearnToCode,JavaScript&via=exilmas&url=' + thisPageURL;


	/* FUNCTIONS */
	/* Function to get a random quote from mashape and replace the current text with new one*/
	var getQuote = function getQuote() {
		$.ajax({
			headers: {
				"X-Mashape-Key": "dE8bC964NAmshmHVwM1JqCDNUacQp1sQbPtjsnv4TOyKo3eAWW",
				"Content-Type": "application/x-www-form-urlencoded",
				Accept: "application/json"
			}, 
			url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=",
			success: function (result) {
				var resultObject = $.parseJSON(result); // Objectify result

				var quote = resultObject["quote"];
				var originator = resultObject["author"];

				quoteText.text(quote);
				quoteOriginator.text(originator)
				twitterLink.attr({
					href: 'https://twitter.com/intent/tweet?text=\"' +
					quote + "\" - " + originator + " " +
					tweetPostpend
				});

			}
		})
	}

	/* THE PART OF THE SCRIPT THAT DOES SOMETHING USEFUL */
	getQuote();

	newQuoteButton.click(function () {
		var queryResult = getQuote();
		return false;
	})
})

