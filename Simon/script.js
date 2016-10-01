var animationLength = 500;
var timeoutLength = 2*animationLength;

var sequence = [];
var playerSequence = [];


$(document).ready(function() {

  var tone = document.createElement('audio');
  tone.setAttribute('autoplay', 'autoplay');

  function addItemToSequence() {
    var index = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    sequence.push(index);
  }

  /* Button colors */
  var red = "#FF5964";
  var blue = "#35A7FF";
  var green = "#6BF178";
  var yellow = "#FFE74C";

  function buttonsChangeVisibility(opacity) {
    for (var i = 1; i <= 4; i++) {
      $("#b" + i).animate(
      {
        "opacity" : opacity
      }, animationLength);
    }
  }

  function makeVisible() {
    buttonsChangeVisibility(1.0);
  }

  function makeInvisible() {
    buttonsChangeVisibility(0.0);
  }

  function animateButton(buttonName, toneSource) {
    tone.setAttribute('src', toneSource);
    tone.play();
    $(buttonName).animate(
    {
      "opacity" : 1.0
    },
    animationLength).animate({
      "opacity" : 0.0
    }, animationLength);
  };

  function playSequence() {
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

  function checkPlayerInput(id) {
    var indexCheck = playerSequence.length;
    console.log(sequence[indexCheck]);
    if (id == sequence[indexCheck]) {
      playerSequence.push(id);
      addItemToSequence();
      playSequence();
      return true;
    } else {
      return false;
    }
    console.log(indexCheck);
  };

  $(".button").click(function (event) {
    var id = event.target.id[1];
    checkPlayerInput(id);
    console.log(id);
  });

  $("#add").click(function () {
    console.log("============");
    console.log("Adding item to sequence");
    addItemToSequence();
    console.log("Item added. Sequence is now:");
    console.log(sequence);
    console.log("============");
  });

  $("#play").click(function () {
    console.log("Playing sequence");
    playSequence();
  });

  /*
  animateButton("#button-1", "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
  animateButton("#button-2", "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
  animateButton("#button-3", "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
  animateButton("#button-4", "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
  */

  //animateButton("#button-1", "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");

  //playSequence();
  makeVisible();

});
