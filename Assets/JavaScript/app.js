// https://stackoverflow.com/questions/17724017/using-jquery-to-build-table-rows-from-ajax-response-json

//create an array of strings,

var cars =[  ]  // should this array be empty or hold items.

var response;


//Try using a loop that appends a button for each string in the array

        //Function for displaying movie data
        function renderButtons() {

          // Deleting the movie buttons prior to adding new movie buttons
          // (this is necessary otherwise we will have repeat buttons)
          $("#movies-view").empty();

          // Looping through the array of movies
          for (var i = 0; i < cars.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array.
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class
            a.addClass("car");
            // Adding a data-attribute with a value of the movie at index i
            a.attr("data-name", cars[i]);
            // Providing the button's text with a value of the movie at index i
            a.text(cars[i]);
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
        cars.push(car);

          // calling renderButtons which handles the processing of our movie array
          renderButtons();
        });
        //
        // // Calling the renderButtons function at least once to display the initial list of movies
        // renderButtons();

//When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.



        // Adding click event listen listener to all buttons
        $("button").on("click", function() {
          // Grabbing and storing the data-animal property value from the button
          var gif = $(this).attr("data-animal");

          // Constructing a queryURL using the animal name
           var queryURL = "https://api.giphy.com/v1/gifs/trending?q=" +
             gif + "&api_key=glo3Suv6j1x7pl2Y2A1ITmD4QnryJQ3i&limit=5";

            //var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=glo3Suv6j1x7pl2Y2A1ITmD4QnryJQ3i&limit=15";
            //http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC&rating=pg-13


          // Performing an AJAX request with the queryURL
          $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {
              console.log(queryURL);
              console.log(response);
              //['Rating']['Plot']['Released']

              //console.log(typeof response);
              // the JSON response comes back as a string, that needs to be converted into an object, so we can access the key/value pairs within the JSON object arrry
              // convert string to JSON
              //response = $.parseJSON(response);

              // storing the data from the AJAX request in the results variable
              var results = response.data;

              // Looping through each result item
              for (var i = 0; i < results.length; i++) {

                // Creating and storing a div tag
                var animalDiv = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);
                var p2 = $("<p>").text("Plot: " + results[i].plot);
                var p3 = $("<p>").text("Released: " + results[i].released);
                // var pThree = $("<p>").text("Plot: " + plot);


                // Creating and storing an image tag
                var animalImage = $("<img>");
                // Setting the src attribute of the image to a property pulled off the result item
                animalImage.attr("src", results[i].images.fixed_height.url);

                // Appending the paragraph and image tag to the animalDiv

                animalDiv.append(animalImage);
                animalDiv.prepend(p);
                animalDiv.prepend(p2);
                animalDiv.prepend(p3);

                // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                $("#gifs-appear-here").prepend(animalDiv);
              }
            });
        });

//When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

            // <img src="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif">
            // <img src="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200_s.gif" data-still="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200_s.gif" data-animate="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200.gif" data-state="still" class="gif">
            // <img src="https://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif" data-still="https://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif" data-animate="https://media3.giphy.com/media/W6LbnBigDe4ZG/200.gif" data-state="still" class="gif">
            // <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            // <script type="text/javascript">
            //
            //   $(".gif").on("click", function() {
            //     // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
            //     var state = $(this).attr("data-state");
            //     // If the clicked image's state is still, update its src attribute to what its data-animate value is.
            //     // Then, set the image's data-state to animate
            //     // Else set src to the data-still value
            //     if (state === "still") {
            //       $(this).attr("src", $(this).attr("data-animate"));
            //       $(this).attr("data-state", "animate");
            //     } else {
            //       $(this).attr("src", $(this).attr("data-still"));
            //       $(this).attr("data-state", "still");
            //     }
            //   });

//Under every gif, display its rating (PG, G, so on).

        // // Storing the rating data
        // var rating = response.Rated;
        //
        // // Creating an element to have the rating displayed
        // var pOne = $("<p>").text("Rating: " + rating);
        //
        // // Displaying the rating
        // movieDiv.append(pOne);

        // // Storing the release year
        // var released = response.Released;
        //
        // // Creating an element to hold the release year
        // var pTwo = $("<p>").text("Released: " + released);
        //
        // // Displaying the release year
        // movieDiv.append(pTwo);

        // // Storing the plot
        // var plot = response.Plot;
        //
        // // Creating an element to hold the plot
        // var pThree = $("<p>").text("Plot: " + plot);
        //
        // // Appending the plot
        // movieDiv.append(pThree);


//Only once you get images displaying with button presses should you move on to the next step.

//Add a form to your page takes the value from a user input box and adds it into your topics array.

    // this is in the button code above

//Then make a function call that takes each topic in the array remakes the buttons on the page.

            // // This function handles events where a movie button is clicked
            // $("#add-movie").on("click", function(event) {
            //   event.preventDefault();
            //   // This line grabs the input from the textbox
            //   var movie = $("#movie-input").val().trim();
            //
            //   // Adding movie from the textbox to our array
            //   movies.push(movie);
            //
            //   // Calling renderButtons which handles the processing of our movie array
            //   renderButtons();
            // });
