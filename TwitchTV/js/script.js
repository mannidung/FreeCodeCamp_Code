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
			html += "<span class='streamer-name'>" + streamers[i] + "</span>";
			html += "<br>";
			html += "<a href='http://twitch.tv/" + streamers[i] + "' target='new'>";
			html += "<div class='streamer-avatar' id='" + streamers[i] + "'>";
			html += "</div>";
			html += "</a>";
			html += "<div class='streamer-info' id='" + streamers[i] + "-info'>";
			html += "</div>";
			html += "</td>";
		} else if (i%3 === 0 && i != 0) {
			html += "</tr>";
			html += "<tr>";
			html += "<td>";
			html += "<span class='streamer-name'>" + streamers[i] + "</span>";
			html += "<br>";
			html += "<a href='http://twitch.tv/" + streamers[i] + "' target='new'>";
			html += "<div class='streamer-avatar' id='" + streamers[i] + "'>";
			html += "</div>";
			html += "</a>";
			html += "<div class='streamer-info' id='" + streamers[i] + "-info'>";
			html += "</div>";
			html += "</td>";
		} else if (i === streamers.length){
			html += "<td>";
			html += "<span class='streamer-name'>" + streamers[i] + "</span>";
			html += "<br>";
			html += "<a href='http://twitch.tv/" + streamers[i] + "' target='new'>";
			html += "<div class='streamer-avatar' id='" + streamers[i] + "'>";
			html += "</div>";
			html += "</a>";
			html += "<div class='streamer-info' id='" + streamers[i] + "-info'>";
			html += "</div>";
			html += "</td>";
			html += "</tr>";
		} else {
			html += "<td>";
			html += "<span class='streamer-name'>" + streamers[i] + "</span>";
			html += "<br>";
			html += "<a href='http://twitch.tv/" + streamers[i] + "' target='new'>";
			html += "<div class='streamer-avatar' id='" + streamers[i] + "'>";
			html += "</div>";
			html += "</a>";
			html += "<div class='streamer-info' id='" + streamers[i] + "-info'>";
			html += "</div>";
			html += "</td>";
		}
		setStreamerInfo(streamers[i]);
	}
	$("#body").append(html);
});

function setStreamerInfo(streamerUserName) {

	// Get avatars for the streamers
	$.getJSON('https://api.twitch.tv/kraken/channels/' + streamerUserName + '?callback=?',
		function(json, textStatus) {
			var stream = json["stream"];
			var links = json["links"];
			if (json.logo === undefined) {
				$("#" + streamerUserName).css('background-color', 'gray');
			} else if (json.logo === null) {
				$("#" + streamerUserName).css('background-color', '#363636');
			} else {
				$("#" + streamerUserName).css('background-image', 'url(' + json["logo"] + ')');
				$("#" + streamerUserName).css('background-size', '100%');
			}
		});

	// Get information about their channels
	$.getJSON('https://api.twitch.tv/kraken/streams/' + streamerUserName + '?callback=?',
		function(json, textStatus) {
			var stream = json["stream"];
			var links = json["links"];
			if (json.stream === undefined) {
				$("#" + streamerUserName).css('border-color', 'gray');
				$("#" + streamerUserName + '-info').html("User nonexistent <i class='fa fa-frown-o fa-1x'></i>");
			} else if (stream === null) {
				$("#" + streamerUserName).css('border-color', '#92140C');
				$("#" + streamerUserName).css('box-shadow', '0 0 20px #92140C');
				$("#" + streamerUserName + '-info').text("User offline");
			} else {
				$("#" + streamerUserName).css('border-color', '#77FF94');
				$("#" + streamerUserName).css('background-image', 'url(' + json["stream"]["channel"]["logo"] + ')');
				$("#" + streamerUserName).css('background-size', '100%');
				$("#" + streamerUserName).css('box-shadow', '0 0 20px #77FF94');
				$("#" + streamerUserName + '-info').text(json["stream"]["channel"]["status"]);
			}
		});
}