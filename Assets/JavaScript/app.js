//https://stackoverflow.com/questions/44298501/how-to-pause-and-start-gif-using-jquery-ajax
var topics = ["Porsche", "BMW", "Mercedes", "Tesla", "Bentley"];
// Function for displaying additoinal topics to the page as  data button
  function renderButtons() {

    $("#topics").empty();

    for (var i = 0; i < topics.length; i++) {
      $("#topics").append('<button class="tag-buttons btn btn-primary">' + topics[i] + '</button>');
    }

  }

  // Add tags function //

$(document).on('click', '#addTopics', function(event) {

  event.preventDefault();

  var newTopics = $("#Giphy").val().trim();
  topics.push(newTopics);

  $("#topics").append('<button class="tag-buttons btn btn-primary">' + newTopics + '</button>');

});

// Tag button function //

$(document).on('click', '.tag-buttons', function(event) {

  // Keeps page from reloading //
  event.preventDefault();

  var type = this.innerText;
  console.log(this.innerText);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + window.encodeURI(type) + "&api_key=glo3Suv6j1x7pl2Y2A1ITmD4QnryJQ3i&l&rating=pg-13&limit=10";
    //var queryURL = "https://api.giphy.com/v1/gifs/trending?q=" + car + "&api_key=glo3Suv6j1x7pl2Y2A1ITmD4QnryJQ3i&l&rating=pg-13&limit=5";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(queryURL);
    console.log(response);

    // storing the data from the AJAX request in the results variable
    var results = response.data;

    for (var i = 0; i < response.data.length; i++) {

      // Creating and storing a div tag
      var carDiv = $("<div>");
      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + results[i].rating);
      // var p2 = $("<p>").text("Plot: " + results[i].plot);
      // var p3 = $("<p>").text("Released: " + results[i].released);
      // var pThree = $("<p>").text("Plot: " + plot);

      // Appending the paragraph and image tag to the carDiv

      //carDiv.append(carGifImage);
      carDiv.prepend(p);
      // carDiv.prepend(p2);
      // carDiv.prepend(p3);



      $("#giphyPhoto").append('<img class="gif" src="' + response.data[i].images.fixed_height_still.url + '">');
    }
  });

  $("#photo").empty();

});
renderButtons();

$('body').on('click', '.gif', function() {
    	var src = $(this).attr("src");
      if($(this).hasClass('playing')){
         //stop
         $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
         $(this).removeClass('playing');
      } else {
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
      }
    });
