



// first array.
var charArr = [
      "Captain Jean-Luc Picard", "Worf", "Data", "Commander William T. Riker", "Deanna Troi"];
  
  var charIm = "";
  
  
  //needed to limit the number of buttons
  var imageLimit = 10;
  
  // my buttons
  function showButtons() {
    $("#buttonItems").empty();
    $("#newChar").val("");
    for (var i = 0; i < charArr.length; i++) {
      var button = $("<button class='btn-success'>");
      button.addClass("crew");
      button.attr("crew-name", charArr[i]);
      button.text(charArr[i]);
       //button.style.background = 'blue';
      // button.setOpaque(true);
      $("#buttonItems").append(button);
      $("#buttonItems").append(" ");
    }
  }
  
  //this will show my buttons 
  showButtons();
  
  // the user should be able to add a new button here
  $("#newChar2").on("click", function (event) {
    $("#entry").empty();
    event.preventDefault();
    var crewInput = $("#newChar").val().trim();
    var crewTerm = $(this).attr("crew-name");
  
    // This is where the magic happens
  
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + crewTerm + "&limit=2&api_key=dc6zaTOxFJmzC";
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (response) {
      if (response.pagination.total_count >= imageLimit) {
        charArr.push(crewInput);
        showButtons();
      } else if (response.pagination.total_count === 0) {
        $("#entry").html(" Sorry no image.  Try again");
      } else if (response.pagination.total_count === 1) {
        $("#entry").html(" Only one image to see.  Try again");
      } else {
        $("#entry").html(" Opps " + response.pagination.total_count + " results for this.  Please select another ");
      }
      $("#newChar").val("");
    });
  });
  $(document).on("click", ".crew", display);
  
  function display() {
    // resets the search so useer can re-enter it again
    $("#entry").empty();
    var crewTerm = $(this).attr("crew-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + crewTerm + "&limit=10&api_key=dc6zaTOxFJmzC";
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function (response) {
  
      // for loop that will display giphs url
      for (var a = 0; a < response.data.length; a++) {
          
        var active = response.data[a].images.fixed_width.url;
        
        var still = response.data[a].images.fixed_width_still.url;
        // this will display the ratings to the images
        var rating = "Rating: " + (response.data[a].rating).toUpperCase();
        
        var charIm = $("<img>");
  
        //ratings div 
        var ratingDiv = $("<div id='ratingDiv'>" + rating + "</div>");
  
        charIm.attr({
          "active": active,
          "still": still,
          "src": still,
          "state": "still"
        });
        // 
        var ratingAndImage = $("<div>");
        $(ratingAndImage).css({
          "float": "left"
        });
        $(ratingAndImage).prepend(ratingDiv, charIm);
        //  add the rating here
        $("#ratings").prepend(ratingAndImage);
        // starting or stopping animation function
        $(charIm).on("click", function (event) {
          // I think this clears any errors
          $("#entry").empty();
  
          var state = $(this).attr("state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("active"));
            $(this).attr("state", "active");
          } else {
            $(this).attr("src", $(this).attr("still"));
            $(this).attr("state", "still");
          }
        });
      }
    });
  }