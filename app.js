$(document).ready(function () {

    var topices = ['funny animals', 'funny baby', 'funny movies'];

    let api_key = 'CB3u9m9EcYrw3EnygcS0FX4P91gsyN8N';
    // let api_key = 'CpiVtI10MbfNYbPPYsXddJqPI4hlSssd';
    let queryUrl = 'https://api.giphy.com/v1/gifs';
    renderButtons();

    $(document).on('click', '.gif', function () { //listener for dynamicaly generated elements
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
            console.log("nick", data);

            data.forEach(element => {
                console.log(element.images.fixed_height.url);

                $('.gifContainer').append(`<div></div><img src='${element.images.fixed_height.url}'><p>${element.rating}</p></div>`);

            });

        })
    })

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
});