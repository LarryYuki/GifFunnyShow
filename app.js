$(document).ready(function () {

    var topices = ['funny animals', 'funny baby', 'funny movies', 'funny dog', 'joker', 'funny bird', 'funny horse'];

    let api_key = 'CB3u9m9EcYrw3EnygcS0FX4P91gsyN8N';
    // let api_key = 'CpiVtI10MbfNYbPPYsXddJqPI4hlSssd';
    let queryUrl = 'https://api.giphy.com/v1/gifs';
    renderButtons();

    $(document).on('click', '.gif', function () {
        console.log("hello")

        const searchText = ($(this).attr("data-name"))
        const queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=' +
            api_key +
            '&q=' +
            searchText +
            '&limit=10&offset=0&rating=G&lang=en';
        console.log(queryUrl);
        $.ajax({
            method: 'GET',
            url: queryUrl
        }).then(response => {
            const data = response.data;
            console.log(data);

            data.forEach(element => {
                console.log(element.images.fixed_height_still.url);
                $('.gifContainer').append(`<div><img class="abc" src='${element.images.fixed_height_still.url}' data-animate='${element.images.fixed_height.url}' data-still='${element.images.fixed_height_still.url}' data-state="still"><p>${element.rating}</p></div>`);
            });

        });
    });

    function renderButtons() {
        $("#gif-view").empty();
        for (var i = 0; i < topices.length; i++) {

            var a = $("<button>");
            a.addClass("gif");
            a.attr("data-name", topices[i]);
            a.text(topices[i]);
            $("#gif-view").append(a);
        }
    }
    $("#add-gif").on("click", function (e) {
        e.preventDefault();
        var topice = $("#gifSearch").val().trim();
        topices.push(topice);
        renderButtons();
    });

    $('.gifContainer').on("click", '.abc', function () {
        var state = $(this).attr("data-state");
        console.log(this);
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});