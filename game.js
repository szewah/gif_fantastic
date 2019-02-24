var topics = ['reactions', 'entertainment', 'sports', 'stickers', 'artists']
var giphy;
var rating = "g"
var queryURL;

function getGifTopics() {
    giphy = $(this).attr("data-name");
    queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=dc6zaTOxFJmzC&limit=10&" + rating;
    console.log(queryURL);
    ajaxGifCall();
  };

function ajaxGifCall() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
      console.log(response);    
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var gifRow = $("<div class='col-md-4'>");
        var gifDivs = $("<div class='card'>");
        var gifImage = $("<img class='card-img-top gif'>").attr("src", results[i].images.fixed_height_still.url);    
        gifImage.attr("data-still", results[i].images.fixed_height_still.url);
        gifImage.attr("data-animate", results[i].images.fixed_height.url);
        gifImage.attr("data-state", "still");
        var gifCardBody = $("<div class='card-body'>")
        var gifRating = $("<h6>").text("Rating: " + results[i].rating);
        var gifReference = $("<p class='rating'>").text("This data is provided by the GIPHY API.");
        gifCardBody.append(gifRating, gifReference);
        gifDivs.append(gifImage, gifCardBody);
        gifRow.append(gifDivs);
        $("#add-gifs-area").append(gifRow);
      }
    });
  };

// render buttons of the category array
function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
      var gifBtn = $("<button class='btn btn-primary topics'>");
      gifBtn.attr("data-name", topics[i]);
      gifBtn.text(topics[i]);
      $("#buttons-view").append(gifBtn);
    }
  };

// push new value into categories array after submission
$("#topic-form").on("submit", function(event) {
    event.preventDefault();
    var submitValue = $("#input-value").val().trim();
    console.log("input value on submit, ", submitValue)
    topics.push(submitValue);
    renderButtons();
});

$(document).on("click", ".topics", getGifTopics);
renderButtons(); 

// solution thanks to https://github.com/britpicazo/giftastic/blob/master/assets/javascript/app.js

function animate() {
    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still")

    if (state === "still") {
        $(this).attr("src", animateImage);
        $(this).attr("data-state", "animate");
    }

    else if (state == "animate") { 
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still");
}
};

$(document).on("click", ".gif", animate);
