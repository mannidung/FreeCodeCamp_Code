var streamers = [];

$(document).ready(function() {

	streamers = ["freecodecamp",
	"storbeck",
	"terakilobyte",
	"habathcx",
	"RobotCaleb",
	"thomasballinger",
	"noobs2ninjas",
	"beohoff",
	"medrybw"];


	var html = "";

	for (var i = 0; i < streamers.length; i++) {
		$.getJSON('https://api.twitch.tv/kraken/streams/freecodecamp?callback=?',
			function(json, textStatus) {
				console.log(streamers[i]);
				console.log(json);
				var stream = json["stream"];
				var links = json["links"];
				if (stream === null) {
				// Set color of border to red
				$("#" + streamers[i]).css('border-color', 'red');
			} else {
				$("#" + streamers[i]).css('border-color', 'green');
			}
		});
	}
});