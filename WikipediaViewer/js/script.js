$(document).ready(function() {
	clearList(); // Remove the debug section

	// Click of button
	$("#search-go").click(function() {
		performQueryWithCallback($("#search-text").val());
	});

	// Catch press of enter key
	$('body').keypress(function(e){
		if(e.keyCode==13) {
			performQueryWithCallback($("#search-text").val());
		}
	});
});

// Standard search just to make code look nicer
function performQueryWithCallback(searchText) {
	wikiQuery(searchText, function(returnValue) {
		console.log($("#search-text").val());
		clearList();
		writeList(returnValue);
	});
}

function wikiQuery(queryString, callback) {
	$.getJSON("http://en.wikipedia.org/w/api.php?callback=?",
	{
		srsearch: queryString,
		srlimit: "7",
		action: "query",
		list: "search",
		format: "json"
	},
	function(data) {
		var result = data["query"]["search"];
		callback(result);
	});
}

function clearList() {
	$("#results").html("");
}

function writeList(resultArray) {
	// Set title text to correspond to search
	$('title').text("Wikipedia search for " + $("#search-text").val());


	var resultsArea = $("#results");
	var htmlString = "";

	// Catch the case where no results are returned.
	if (resultArray.length > 1) {
		for (var i = 0; i < resultArray.length; i++) {
			htmlString += '<div class="results-container">';
			htmlString += '<div class="result-header-box">';
			htmlString += '<span class="result-header-text">' + resultArray[i]["title"] + '</span>';
			htmlString += ' <a href="http://en.wikipedia.org/wiki/' + resultArray[i]["title"] + '" target="new"><i class="fa fa-external-link"></i></a>';
			htmlString += '</div>';
			htmlString += '<div class="result-content-box">';
			htmlString += '<span class="result-content-text">';
			htmlString += '... ';
			htmlString += resultArray[i]["snippet"];
			htmlString += '... ';
			htmlString += '</span>';
			htmlString += '<span class="result-content-link">';
			htmlString += ' <a href="http://en.wikipedia.org/wiki/' + resultArray[i]["title"] + '" target="new"><i class="fa fa-external-link"></i></a>';
			htmlString += '</span>';
			htmlString += '</div>';
			htmlString += '</div>';
		}
		resultsArea.html(htmlString);
	} else {
		htmlString += '<div class="results-container">';
		htmlString += '<div class="result-header-box">';
		htmlString += '<span class="result-header-text">No result found...</span>';
		htmlString += '</div>';
		htmlString += '<div class="result-content-box">';
		htmlString += '<span class="result-content-text">';
		htmlString += 'No result could be found. Try to search for something that actually makes sense...';
		htmlString += '</span>';
		htmlString += '</div>';
		htmlString += '</div>';
		resultsArea.html(htmlString);
	}
	
}