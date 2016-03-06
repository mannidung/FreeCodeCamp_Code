$(document).ready(function() {

	var streamers = ["freecodecamp",
	"storbeck",
	"terakilobyte",
	"habathcx",
	"RobotCaleb",
	"thomasballinger",
	"noobs2ninjas",
	"beohoff",
	"medrybw",
	"brunofin",
	"comster404"];


	var html = "";

	for (var i = 0; i < streamers.length; i++) {
		if (i === 0) {
			html += "<tr>";
			html += "<td>";
			html += "<span class'streamer-name'>" + streamers[i] + "</span>";
			html += "<br>";
			html += "<div class='streamer-avatar' id='" + streamers[i] + "'>";
			html += "</div>";
			html += "<div class='streamer-info' id='" + streamers[i] + "-info'>";
			html += "</div>";
			html += "</td>";
		} else if (i%3 === 0 && i != 0) {
			html += "</tr>";
			html += "<tr>";
			html += "<td>";
			html += "<span class'streamer-name'>" + streamers[i] + "</span>";
			html += "<br>";
			html += "<div class='streamer-avatar' id='" + streamers[i] + "'>";
			html += "</div>";
			html += "<div class='streamer-info' id='" + streamers[i] + "-info'>";
			html += "</div>";
			html += "</td>";
		} else if (i === streamers.length){
			html += "<td>";
			html += "<span class'streamer-name'>" + streamers[i] + "</span>";
			html += "<br>";
			html += "<div class='streamer-avatar' id='" + streamers[i] + "'>";
			html += "</div>";
			html += "<div class='streamer-info' id='" + streamers[i] + "-info'>";
			html += "</div>";
			html += "</td>";
			html += "</tr>";
		} else {
			html += "<td>";
			html += "<span class'streamer-name'>" + streamers[i] + "</span>";
			html += "<br>";
			html += "<div class='streamer-avatar' id='" + streamers[i] + "'>";
			html += "</div>";
			html += "<div class='streamer-info' id='" + streamers[i] + "-info'>";
			html += "</div>";
			html += "</td>";
		}
		console.log(i);
		console.log(streamers[i]);
		setStreamerInfo(streamers[i]);
	}
	$("#body").append(html);
});

function setStreamerInfo(streamerUserName) {
	$.getJSON('https://api.twitch.tv/kraken/channels/' + streamerUserName + '?callback=?',
			function(json, textStatus) {
				console.log(streamerUserName);
				console.log(json);
				var stream = json["stream"];
				var links = json["links"];
			if (json.logo === undefined) {
				$("#" + streamerUserName).css('background-color', 'gray');
			} else if (json.logo === null) {
				$("#" + streamerUserName).css('background-color', 'blue');
			} else {
				$("#" + streamerUserName).css('background-image', 'url(' + json["logo"] + ')');
				$("#" + streamerUserName).css('background-size', '100%');
			}
		});

	$.getJSON('https://api.twitch.tv/kraken/streams/' + streamerUserName + '?callback=?',
			function(json, textStatus) {
				console.log(streamerUserName);
				console.log(json);
				var stream = json["stream"];
				var links = json["links"];
			if (json.stream === undefined) {
				$("#" + streamerUserName).css('border-color', 'gray');
			} else if (stream === null) {
				$("#" + streamerUserName).css('border-color', 'red');
			} else {
				$("#" + streamerUserName).css('border-color', 'green');
				$("#" + streamerUserName).css('background-image', 'url(' + json["stream"]["channel"]["logo"] + ')');
				$("#" + streamerUserName).css('background-size', '100%');
				$("#" + streamerUserName + '-info').text(json["stream"]["channel"]["status"]);
			}
		});
}