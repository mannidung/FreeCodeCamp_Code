$(document).ready(function() {

	var latitude = 0;
	var longitude = 0;

	var OWM_API_ID = "12f8689c16ff0fa4b67e11ae4fd55fc1";

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;
			$("#latitude").text(position.coords.latitude);
			$("#longitude").text(position.coords.longitude);
			console.log(latitude + ", " + longitude);

			$.getJSON("http://api.openweathermap.org/data/2.5/weather?"
				+ "lat=" + latitude
				+ "&lon=" + longitude
				+ "&APPID=" + OWM_API_ID,
				function(json) {
					console.log(json);
				});
		});
	} else {
		// Show some kind of error message since position isn't working
	}


});