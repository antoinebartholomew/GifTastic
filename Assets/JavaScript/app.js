  var animals = [];



  $("button").on("click", function() {
    // Grabbing and storing the data-animal property value from the button
    var animal = $(this).attr("data-animal");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // After data comes back from the request
      .done(function(response) {
        console.log(queryURL);

        console.log(response);
      });
