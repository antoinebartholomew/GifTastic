// https://stackoverflow.com/questions/17724017/using-jquery-to-build-table-rows-from-ajax-response-json

//create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.
var topics = ["Porsche", "BMW", "Tesla"];
var response;

  function displayCarInfo() {



  }

//Try using a loop that appends a button for each string in the array

        //Function for displaying movie data
        function renderButtons() {

          // Deleting the movie buttons prior to adding new movie buttons
          // (this is necessary otherwise we will have repeat buttons)
          $("#movies-view").empty();

          // Looping through the array of movies
          for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array.
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class
            a.addClass("car");
            // Adding a data-attribute with a value of the movie at index i
            a.attr("data-name", topics[i]);
            // Providing the button's text with a value of the movie at index i
            a.text(topics[i]);
            // Adding the button to the HTML
            $("#movies-view").append(a);
          }
        }
        //
        // This function handles events where one button is clicked
        $("#add-movie").on("click", function(event) {
          // event.preventDefault() prevents the form from trying to submit itself.
          // We're using a form so that the user can hit enter instead of clicking the button if they want
          event.preventDefault();

          // This line will grab the text from the input box
          var car = $("#movie-input").val().trim();
          // The movie from the textbox is then added to our array
          topics.push(car);

          // calling renderButtons which handles the processing of our movie array
          renderButtons();
        });

        // Adding a click event listener to all elements with a class of "movie"
        //$(document).on("click", ".topics", displayCarInfo);

        // Calling the renderButtons function to display the intial buttons
        renderButtons();


//When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

        // Adding click event listen listener to all buttons
        $("button").on("click", function() {
          // Grabbing and storing the data-animal property value from the button
          var car = $(this).attr("cars");

          // Constructing a queryURL using the animal name  https://github.com/Giphy/GiphyAPI/issues/1
          var queryURL = "https://api.giphy.com/v1/gifs/trending?q=" + car + "&api_key=glo3Suv6j1x7pl2Y2A1ITmD4QnryJQ3i&l&rating=pg-13&limit=5";

          // Performing an AJAX request with the queryURL
          $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
              console.log(queryURL);
              console.log(response);
              //['Rating']['Plot']['Released']

              // storing the data from the AJAX request in the results variable
              var results = response.data;

              // Looping through each result item
              for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var carDiv = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);
                var p2 = $("<p>").text("Plot: " + results[i].plot);
                var p3 = $("<p>").text("Released: " + results[i].released);
                // var pThree = $("<p>").text("Plot: " + plot);


                // Creating and storing an image tag
                var carGifImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                carGifImage.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and image tag to the animalDiv

                carDiv.append(carGifImage);
                carDiv.prepend(p);
                carDiv.prepend(p2);
                carDiv.prepend(p3);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(carDiv);
              }
            });
        });
