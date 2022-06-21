const btnSearch = document.getElementById("btnSearch");
const btnTrending = document.getElementById("btnTrending");
const btnLatest = document.getElementById("btnLatest");
const btnPopular = document.getElementById("btnPopular");

btnSearch.addEventListener("click", function () {
    const search = document.getElementById("search").value;
    displayFilm(search.toLowerCase());
})

btnTrending.addEventListener("click", function () {
    displayFilm("trending");
})

btnLatest.addEventListener("click", function () {
    displayFilm("latest");
})

btnPopular.addEventListener("click", function () {
    displayFilm("popular");
})


async function fetchData(key) {
    if (key == "trending") {
        url = "https://api-lk21.herokuapp.com/api/v1/trending";
    } else if (key == "latest") {
        url = "https://api-lk21.herokuapp.com/api/v1/latest";
    } else if (key == "popular") {
        url = "https://api-lk21.herokuapp.com/api/v1/popular";
    } else if (key == "action") {
        url = "https://api-lk21.herokuapp.com/api/v1/genre/action";
    } else {
        url =  `https://api-lk21.herokuapp.com/api/v1/search?q=${key}`;
    }
    const response = await fetch(url, {
        method: "GET",
    });

    const json = await response.json();
    return json;
}

async function displayFilm(key) {
    try {
        const json = await fetchData(key);
        let cardFilms = `\
        <div class="row my-3 text-center">\
            <h2>${key.toUpperCase()}</h2>\
        </div>\
        <div class="row row-cols-2 row-cols-md-4 g-4" id="cardFilm">\
        `;
        for (let i = 0; i < json.data.length; i++) {
            let cardFilm = `\
                <div class="col">\
                    <div class="card">\
                        <img src="${json.data[i].poster}"
                            class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${json.data[i].options.name}</h5>
                            <p class="card-text">Genre : ${json.data[i].options.genre}</p>
                            <p class="card-text">Rating : ${json.data[i].rating}</p>
                        </div>
                    </div>
                </div>
            `;
    
            cardFilms += cardFilm;
        }
        cardFilms += "</div>";
        document.getElementById("content").innerHTML = cardFilms;    
    } catch (error) {
        let failed = `\
        <div class="row mt-5 text-center">\
        <h1 class="display-1">No results</h1>\
        </div>\
        `;
        document.getElementById("content").innerHTML = failed;    
    }

}
