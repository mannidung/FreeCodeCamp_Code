var animationLength = 500;
var timeoutLength = 2*animationLength;

var sequence = [];
var playerSequence = [];
var clickAllowed = false;
var easy = true;
var winLimit = 20;


$(document).ready(function() {

  var tone = document.createElement('audio');
  tone.setAttribute('autoplay', 'autoplay');

  function addItemToSequence() {
    var index = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    sequence.push(index);
    setScore(sequence.length);
  }

  function buttonsChangeVisibility(opacity) {
    for (var i = 1; i <= 4; i++) {
      $("#b" + i).animate({
        "opacity" : opacity
      }, animationLength);
    }
  }

  function makeVisible() {
    buttonsChangeVisibility(1.0);
    clickAllowed = true;
  }

  function makeInvisible() {
    clickAllowed = false;
    buttonsChangeVisibility(0.0);
  }

  function setScore(score) {
    $("#score").text(score);
  }

  function reset() {
    sequence = [];
    playerSequence = [];
    setScore(0);
    addItemToSequence();
    clickAllowed = true;
    playSequence();
  }

  function winAnimation() {
    $("#error_message").text("YOU WON!");
    $("#error_message").animate({
      "color": "green"
    }, 250).animate({
      "color": "white"
    }, 250).animate({
      "color": "green"
    }, 250).animate({
      "color": "white"
    }, 250);
  }

  function errorAnimation() {
    $("#error_message").text("WRONG BUTTON");
    $("#error_message").animate({
      "color": "red"
    }, 250).animate({
      "color": "white"
    }, 250).animate({
      "color": "red"
    }, 250).animate({
      "color": "white"
    }, 250);
  }

  function animateButton(buttonName, toneSource) {
    tone.setAttribute('src', toneSource);
    tone.play();
    $(buttonName).animate({
      "opacity" : 1.0
    },animationLength).animate({
      "opacity" : 0.0
    }, animationLength);
  };

  function playSequence() {
    clickAllowed = false;
    makeInvisible();
    // Create a queue
    var i = 0;
    function f() {
      setTimeout(function(){
        var buttonString = "#b" + sequence[i];
        var soundString = "https://s3.amazonaws.com/freecodecamp/simonSound" + sequence[i] + ".mp3";
        animateButton(buttonString, soundString);
        i++;
        if (i < sequence.length) {
          f();
        } else {
          setTimeout(makeVisible, timeoutLength);
        }
      }, timeoutLength);
    };

    // Start queue
    f();
  };

  function checkPlayerInputEasy(id) {
    if (id == sequence[playerSequence.length]) {
      playerSequence.push(id);
      if (playerSequence.length >= winLimit) {
        reset();
        winAnimation();
        return;
      } else if (playerSequence.length == sequence.length) {
        playerSequence = [];
        addItemToSequence();
        playSequence();
      }
    } else {
      errorAnimation();
      playSequence();
    }
  };

  function checkPlayerInputHard(id) {
    if (id == sequence[playerSequence.length]) {
      playerSequence.push(id);
      if (playerSequence.length >= winLimit) {
        reset();
        winAnimation();
        return;
      } else if (playerSequence.length == sequence.length) {
        playerSequence = [];
        addItemToSequence();
        playSequence();
        return true;
      }
    } else {
      errorAnimation();
      reset();
      playSequence();
    }
  };

  $(".button").click(function (event) {
    if (clickAllowed) {
      var id = event.target.id[1];
      checkPlayerFunction(id);
      console.log(id);
    } else {
      console.log("Click not allowed");
    }

  });

  $("#start").click(function () {
    if (clickAllowed) {
      playSequence();
    }
  });

  $("#reset").click(function () {
    if (clickAllowed) {
      reset();
    }
  });

  $("#replay").click(function () {
    if (clickAllowed) {
      console.log("Playing sequence");
      playSequence();
    }
  });

  $("#easy_hard").click(function () {
    if (clickAllowed) {
      if (easy) {
        easy = false;
        checkPlayerFunction = checkPlayerInputHard;
        $("#easy_hard").text("Switch to easy");
        reset();
      } else {
        easy = true;
        checkPlayerFunction = checkPlayerInputEasy;
        $("#easy_hard").text("Switch to hard");
        reset();
      }
    }
  });

  var checkPlayerFunction = checkPlayerInputEasy;
  makeVisible();
  addItemToSequence();
  playSequence();


});
