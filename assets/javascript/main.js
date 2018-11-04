$(document).ready(() => {
  // Variables
  const celebs = [
    "emma stone",
    "emma watson",
    "chris hemsworth",
    "steve carell",
    "liam neeson",
    "jim carrey",
    "sheldon cooper",
    "amy farrah fowler"
  ];

  // click event to take in user input and add to array
  $("#add-celeb").click(event => {
    event.preventDefault();
    const person = $("#celeb-input")
      .val()
      .trim();
    celebs.push(person);

    renderButtons();
  });
  //create buttons for the array items
  function renderButtons() {
    $("#celeb-buttons").empty();
    for (let i = 0; i < celebs.length; i++) {
      const createButton = $("<button>");
      createButton.attr("data-name", celebs[i]);
      createButton.attr("id", "user-input");
      createButton.text(celebs[i]);
      $("#celeb-buttons").append(createButton);
      $("#celeb-input").val("");
    }
  }

  // Displays the images to the page based on the button
  function displayGIF() {
    const celebButton = $(this).attr("data-name");
    const limit = 10;
    const APIKEY = "KnMVVGrq3rhGrzPMOG2M298JsmOlMerp";
    //API call
    const queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      celebButton +
      "&limit=" +
      limit +
      "&api_key=" +
      APIKEY;
    //ajax call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      for (let i = 0; i < limit; i++) {
        const celebImage = $("<img>");
        celebImage.attr("src", response.data[i].images.original_still.url);
        celebImage.attr(
          "data-still",
          response.data[i].images.original_still.url
        );
        celebImage.attr("data-animate", response.data[i].images.original.url);
        celebImage.attr("alt", "Nothin");
        celebImage.attr("data-state", "still");
        celebImage.attr("class", "gif");
        $("#celebs").append(celebImage);

        const newDiv = $("<div>");
        const rating = response.data[i].rating;
        const pRating = $("<p>").text(`Rating: ${rating}`);
        newDiv.append(celebImage);
        newDiv.prepend(pRating);
        $("#celebs").prepend(newDiv);
      }
    });
  }
  // Change from animate to still and vice versa
  function imageChangeState() {
    const state = $(this).attr("data-state");
    const animateImage = $(this).attr("data-animate");
    const stillImage = $(this).attr("data-still");

    if (state == "still") {
      $(this).attr("src", animateImage);
      $(this).attr("data-state", "animate");
    } else if (state == "animate") {
      $(this).attr("src", stillImage);
      $(this).attr("data-state", "still");
    }
  }
  //call functions for displaying gifs and changing still/animate
  renderButtons();
  $(document).on("click", "#user-input", displayGIF);
  $(document).on("click", ".gif", imageChangeState);

});
