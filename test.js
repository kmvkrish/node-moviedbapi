var api = require("node-moviedbapi")("<<your api key>>");

console.log("==============================Movies=============================");
api.discoverMovies(1, 2016, (response) => {
	console.log(response);
});

console.log("=============================TV Shows============================");
api.discoverTV(1, (response) => {
	console.log(response);
});

console.log("=============================Similar Movies======================");
api.similarMovies(271110, (response) => {
	console.log(response);
});