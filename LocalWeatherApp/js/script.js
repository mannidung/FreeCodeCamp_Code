$(document).ready(function() {

	// Helper functions to convert kelvin to celsius and fahrenheit
	var kelvinToCelsius = function(temp) {
		return parseInt(temp - 273.15);
	};

	var kelvinToFahrenheit = function(temp) {
		return parseInt((temp - 273.15)*1.8 + 32);
	};


	var latitude = 0;
	var longitude = 0;

	var place = "Metropolis";
	var weather = "Thunderstorms";
	var tempK = 293; // temperature in Kelvin
	var tempC = kelvinToCelsius(tempK);
	var tempF = kelvinToFahrenheit(tempK);
	var isCelciusActive = true; // Keep track on what unit is shown

	var OWM_API_ID = "12f8689c16ff0fa4b67e11ae4fd55fc1";

	var setWeatherFromPosition = function(latitude, longitude) {
		$.getJSON("http://api.openweathermap.org/data/2.5/weather?"
			+ "lat=" + latitude
			+ "&lon=" + longitude
			+ "&APPID=" + OWM_API_ID,
			function(json) {
				place = json["name"];
				weather = json["weather"][0]["main"];
				tempK = json["main"]["temp"];
				tempC = kelvinToCelsius(tempK);
				tempF = kelvinToFahrenheit(tempK);

				$("#city").text(place.toUpperCase());
				$("#weather-condition").text(weather);
				$("#weather-temperature").text(tempC);
				$("#weather-temperature-unit").text("C");
				$('title').text("Weather in " + place);


			// Change the weather icon
			var weatherIconDiv = $("#weather-icon");
			var body = $("body");
			var container = $(".container");
			var unitButton = $("#unit-button");

			switch (weather) {
				case "Thunderstorms":
				weatherIconDiv.html("<ul><li class='icon-basecloud icon-thunder'></li></ul>");
				body.animate({
					backgroundColor: "rgb(204, 204, 204)"},
					3000);
				container.animate({
					backgroundColor: "rgb(204, 204, 204)"},
					3000);
				unitButton.animate({
					backgroundColor: "rgb(204, 204, 204)"},
					3000);

				break;
				case "Drizzle":
				weatherIconDiv.html("<ul><li class='icon-basecloud icon-showers'></li></ul>");
				body.animate({
					backgroundColor: "#82b2e4"},
					3000);
				container.animate({
					backgroundColor: "#82b2e4"},
					3000);
				unitButton.animate({
					backgroundColor: "#82b2e4"},
					3000);
				break;
				case "Rain":
				weatherIconDiv.html("<ul><li class='icon-basecloud icon-rainy'></li></ul>");
				body.animate({
					backgroundColor: "#82b2e4"},
					3000);
				container.animate({
					backgroundColor: "#82b2e4"},
					3000);
				unitButton.animate({
					backgroundColor: "#82b2e4"},
					3000);
				break;
				case "Snow":
				weatherIconDiv.html("<ul><li class='icon-basecloud icon-snowy'></li></ul>");
				body.animate({
					backgroundColor: "rgb(204, 204, 204)"},
					3000);
				container.animate({
					backgroundColor: "rgb(204, 204, 204)"},
					3000);
				unitButton.animate({
					backgroundColor: "rgb(204, 204, 204)"},
					3000);
				break;
				case "Clear":
				weatherIconDiv.html("<ul><li class='icon-sun'></li></ul>");
				body.animate({
					backgroundColor: "rgb(255, 165, 0)"},
					3000);
				container.animate({
					backgroundColor: "rgb(255, 165, 0)"},
					3000);
				unitButton.animate({
					backgroundColor: "rgb(255, 165, 0)"},
					3000);
				break;
				case "Clouds":
				weatherIconDiv.html("<ul><li class='icon-cloud'></li></ul>");
				body.animate({
					backgroundColor: "rgb(204, 204, 204)"},
					3000);
				container.animate({
					backgroundColor: "rgb(204, 204, 204)"},
					3000);
				unitButton.animate({
					backgroundColor: "rgb(204, 204, 204)"},
					3000);
				break;
				default:
					// statements_def
					break;
				}
			}
			);
	}

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			latitude = position.coords.latitude;
			longitude = position.coords.longitude;
			$("#latitude").text(position.coords.latitude);
			$("#longitude").text(position.coords.longitude);

			setWeatherFromPosition(latitude, longitude);
		});
	} else {
		// Show some kind of error message since position isn't working
	}

	// City buttons
	$("#berlin").click(function(event) {
		setWeatherFromPosition(52.52, 13.41);
	});

	$("#abudhabi").click(function(event) {
		setWeatherFromPosition(24.46, 54.36);
	});

	$("#sydney").click(function(event) {
		setWeatherFromPosition(-33.86, 151.21);
	});

	$("#lima").click(function(event) {
		setWeatherFromPosition(-12.04, -77.02);
	});

	$("#newyork").click(function(event) {
		setWeatherFromPosition(40.71, -74.01);
	});

	// Change the unit
	$("#unit-button").click(function(event) {
		if (isCelciusActive) {
			isCelciusActive = false;
			$("#weather-temperature").text(tempF);
			$("#weather-temperature-unit").text("F");
			$("#button-temperature-unit").text("C");
		} else {
			isCelciusActive = true;
			$("#weather-temperature").text(tempC);
			$("#weather-temperature-unit").text("C");
			$("#button-temperature-unit").text("F");
		}
	});

});