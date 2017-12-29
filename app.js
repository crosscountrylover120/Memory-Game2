/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

$( document ).ready(function() {

  // Modal: https://codepen.io/sawyer22/pen/lAcek
  var globalModal = $('.global-modal');
  $( ".btn-game-play" ).on( "click", function(e) {
    e.preventDefault();
    restart();
    $( globalModal ).toggleClass('global-modal-show');
  });
  $( ".btn-game-end" ).on( "click", function(e) {
    e.preventDefault();
    $( globalModal ).toggleClass('global-modal-show');
  });
  $( ".overlay" ).on( "click", function() {
    $( globalModal ).toggleClass('global-modal-show');
  });
  $( ".global-modal_close" ).on( "click", function() {
    $( globalModal ).toggleClass('global-modal-show');
  });
  $(".mobile-close").on("click", function(){
    $( globalModal ).toggleClass('global-modal-show');
  });

  var isInitialized = false;
  var timeElapsed = 0;
  var timer;

  function startTimer() {
    isInitialized = true;

    timer = setInterval(function(){
      // Update time every second
      timeElapsed += 1;
      var minutes = Math.floor(timeElapsed / 60);
      var seconds = timeElapsed % 60;
      var secondsText = seconds > 9 ? seconds : '0' + seconds;

      document.getElementById("timer").innerText = minutes + ':' + secondsText;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  function resetTimer() {
    stopTimer();
    timeElapsed = 0;
    document.getElementById("timer").innerText = '0:00';
  }

  // Restart Game
  $('.restart').click(function(){
    restart();
  });

  function restart() {
    // shuffle cards
    shuffleCards();

    // Set moves to 0
    document.getElementById("moves").innerText = 0;

    // Flip and hide all cards
    var cards = $('.card');
    for (var i = 0; i < cards.length; i++) {
      $(cards[i]).removeClass('open show match');
    }

    // Reset timer
    resetTimer();

    // reset rating
    var emptyStars = $('.fa-star-o');
    for (var i = 0; i < emptyStars.length; i++) {
      $(emptyStars[i]).removeClass('fa-star-o').addClass('fa-star');
    }

    // reset game state
    isInitialized = false;
  }

  // Card Click
  $('.card').click(function(){
    if (!isInitialized) { startTimer() };

    var isShown = $(this).hasClass('open show') || $(this).hasClass('match');

    if (!isShown) {
      // increase move count
      incrementMoves();

      // rate player
      ratePlayer();

      // flip card
      $(this).addClass('open show');

      // get selected cards
      var selected = $('.open.show');

      // match cards
      switch (selected.length) {
        case 1:
          break;
        case 2:
          var foundMatch = $(selected[0]).find('i').attr('class') === $(selected[1]).find('i').attr('class');

          if (foundMatch) {
            // deselect cards
            $(selected[0]).removeClass('open show');
            $(selected[1]).removeClass('open show');

            // highlight cards
            $(selected[0]).addClass('match');
            $(selected[1]).addClass('match');
          }
          break;
        default:
          for (var i = 0; i < selected.length; i++) {
            $(selected[i]).removeClass('open show');
          }
          $(this).addClass('open show');
      }
    }

    // Check if game is completed
    var cards = $('.card');
    var matches = $('.match');

    if (cards.length == matches.length) {
      stopTimer();
      endGame();
    }
  });

  function incrementMoves() {
    var moves = document.getElementById("moves").innerText;
    moves = Number(moves);
    moves += 1;
    document.getElementById("moves").innerText = moves;
  }

  function ratePlayer() {
    var moves = document.getElementById("moves").innerText;
    moves = Number(moves);

    var stars = $('.fa-star');

    switch (moves) {
      case 24:
        // set 2 star rating
        $(stars[0]).removeClass('fa-star').addClass('fa-star-o');
        break;
      case 40:
        // set 1 star rating
        $(stars[0]).removeClass('fa-star').addClass('fa-star-o');
      default:
        break;
    }
  }

  function endGame() {
    document.getElementById('win-time').innerText = 'YOU WON IN ' + document.getElementById('timer').innerText + ' MINS!!!';
    $( globalModal ).toggleClass('global-modal-show');
  }

  function shuffleCards() {
    var cards = $('.card');
    var icons = [];

    for (var i = 0; i < cards.length; i++) {
      var iconClass = $(cards[i]).find('i').attr('class');
      $(cards[i]).find('i').removeClass(iconClass);
      icons.push(iconClass);
    }

    shuffle(icons);

    for (var i = 0; i < cards.length; i++) {
      $(cards[i]).find('i').addClass(icons[i]);
    }
  }

  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  restart();
});


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
