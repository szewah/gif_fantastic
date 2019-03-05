var topics = ['reactions', 'entertainment', 'sports', 'stickers', 'artists']
var giphy;
var rating = "g"
var queryURL;

function getGifTopics() {
  giphy = $(this).attr("data-name");
  ajaxGifCall();
};

function ajaxGifCall() {
  queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=dc6zaTOxFJmzC&limit=10&rating=" + rating;
  console.log(queryURL);
  $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function(response) {
    console.log(response);    
    renderGifs(response);
  });
};

function renderGifs(response) {
  $("#add-gifs-area").empty();
//renders the gifs onto the page
  var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var gifRow = $("<div class='col-md-4'>");
      
      var gifDivs = $("<div class='card'>");

      var gifImage = $("<img class='card-img-top gif' alt='gif'>").attr("src", results[i].images.fixed_height_still.url);    
      gifImage.attr("data-still", results[i].images.fixed_height_still.url);
      gifImage.attr("data-animate", results[i].images.fixed_height.url);
      gifImage.attr("data-state", "still");

      var gifCardBody = $("<div class='card-body'>")
      var gifRating = $("<h6>").text("Rating: " + results[i].rating);
      var gifTitle = $("<p class='title'>").text(results[i].title);
      var gifReference = $("<p class='rating'>").text("This data is provided by the GIPHY API.");

      var gifDownload = $("<a class='download'>").text("Download");
      gifDownload.attr("href", results[i].images.fixed_height.mp4);
      gifDownload.attr("download", results[i].images.fixed_height.mp4);
      // gifDownload.attr("target", "_blank");
      // gifDownload.attr("download", "");

      gifCardBody.append(gifRating, gifTitle, gifReference, gifDownload);
      gifDivs.append(gifImage, gifCardBody);
      gifRow.append(gifDivs);
      $("#add-gifs-area").append(gifRow);
    }
  };

// render buttons of the category array
function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
      var gifBtn = $("<button class='btn topics'>");
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

$("#reset").on("click", function() {
  event.preventDefault();
  $("#add-gifs-area").empty();
})

// solution thanks to https://github.com/britpicazo/giftastic/blob/master/assets/javascript/app.js
//function that goes to the animated version of the gif once the still is clicked and vice versa
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