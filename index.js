var request = require("request");
var open = require("open");

var baseUrl = "https://api.themoviedb.org/3";

var api;
module.exports = function(api_key){
	if(api_key){
		return new MovieDBAPI(api_key);
	}else{
		throw new Error("No API key mentioned!");
	}
};

function executeRequest(options, callback){
	request(
			options, (error, response, body) => {
				if(error){
					callback(error);
				}else if(response.statusCode != 200){
					callback(response.body);
				}else{
					callback(JSON.parse(body));
				}
				
			});
}

function MovieDBAPI(api_key){
	api = this;
	this.api_key = api_key;

	this.discoverMovies = (page, year, callback) => {
		executeRequest({
				url : baseUrl + "/discover/movie",
			 	qs:{ "api_key" : api.api_key, 'page': page, 'year' : year},
			 	method: 'GET',
			 	headers: {
			 		"Accept":"application/json"
			 	}
			}, callback);
	};
	this.discoverTV = function(page, callback){
		var res = null;
		executeRequest(
			{
				url : baseUrl + "/discover/tv",
			 	qs:{ "api_key" : api.api_key, 'page': page},
			 	method: 'GET',
			 	headers: {
			 		"Accept":"application/json"
			 	}
			}, callback);
	};

	this.findMovie = function(imdb_id, callback){
		executeRequest(
			{
				url : baseUrl + "/find/" + imdb_id,
			 	qs:{ "api_key" : api.api_key, 'external_source': 'imdb_id'},
			 	method: 'GET',
			 	headers: {
			 		"Accept":"application/json"
			 	}
			}, callback);
	};
	this.findTVShow = function(tvdb_id, callback){
		executeRequest(
			{
				url : baseUrl + "/find/" + imdb_id,
			 	qs:{ "api_key" : api.api_key, 'external_source': 'tvdb_id'},
			 	method: 'GET',
			 	headers: {
			 		"Accept":"application/json"
			 	}
			}, callback);
	};

	this.movieInfo = function(movie_id, callback){
		executeRequest(
			{
				url : baseUrl + "/movie/" + movie_id,
			 	qs:{ "api_key" : api.api_key},
			 	method: 'GET',
			 	headers: {
			 		"Accept":"application/json"
			 	}
			}, callback);
	};

	this.similarMovies = function(movie_id, callback){
		executeRequest(
			{
				url : baseUrl + "/movie/" + movie_id + "/similar",
			 	qs:{ "api_key" : api.api_key},
			 	method: 'GET',
			 	headers: {
			 		"Accept":"application/json"
			 	}
			}, callback);
	};

	this.recommendedMovies = function(movie_id, callback){
		executeRequest(
			{
				url : baseUrl + "/movie/" + movie_id + "/recommendations",
			 	qs:{ "api_key" : api.api_key},
			 	method: 'GET',
			 	headers: {
			 		"Accept":"application/json"
			 	}
			}, callback);
	};

	this.getMovieImages = function(movie_id, callback){
		executeRequest(
			{
				url : baseUrl + "/movie/" + movie_id + "/images",
			 	qs:{ "api_key" : api.api_key},
			 	method: 'GET',
			 	headers: {
			 		"Accept":"application/json"
			 	}
			}, callback);
	};

	this.getMovieVideos = function(movie_id, callback){
		executeRequest(
			{
				url : baseUrl + "/movie/" + movie_id + "/videos",
			 	qs:{ "api_key" : api.api_key},
			 	method: 'GET',
			 	headers: {
			 		"Accept":"application/json"
			 	}
			}, callback);
	};

	this.getLatestMovies = function(callback){
		if(typeof callback === 'undefined'){
			callback = (response) => { console.log(response); };
		}
		executeRequest({
			url : baseUrl + "/movie/latests",
			 	qs:{ "api_key" : api.api_key},
			 	method: 'GET',
			 	headers: {
			 		"Accept":"application/json"
			 	}
		}, callback);
	};

	this.moviesNowPlaying = function(callback){
		if(typeof callback === 'undefined'){
			callback = (response) => { console.log(response); };
		}
		executeRequest({
			url : baseUrl + "/movie/now_playing",
			 	qs:{ "api_key" : api.api_key},
			 	method: 'GET',
			 	headers: {
			 		"Accept":"application/json"
			 	}
		}, callback);
	};

	this.popularMovies = function(callback){
		if(typeof callback === 'undefined'){
			callback = (response) => { console.log(response); };
		}
		executeRequest({
			url : baseUrl + "/movie/popular",
			 	qs:{ "api_key" : api.api_key},
			 	method: 'GET',
			 	headers: {
			 		"Accept":"application/json"
			 	}
		}, callback);
	};

	this.topRatedMovies = function(callback){
		if(typeof callback === 'undefined'){
			callback = (response) => { console.log(response); };
		}
		executeRequest({
			url : baseUrl + "/movie/top_rated",
			 	qs:{ "api_key" : api.api_key},
			 	method: 'GET',
			 	headers: {
			 		"Accept":"application/json"
			 	}
		}, callback);
	};

	this.upcomingMovies = function(callback){
		if(typeof callback === 'undefined'){
			callback = (response) => { console.log(response); };
		}
		executeRequest({
			url : baseUrl + "/movie/upcoming",
			 	qs:{ "api_key" : api.api_key},
			 	method: 'GET',
			 	headers: {
			 		"Accept":"application/json"
			 	}
		}, callback);
	};

	this.tvShowInfo = function(tv_id, callback){
		executeRequest(
			{
				url : baseUrl + "/tv/" + tv_id,
			 	qs:{ "api_key" : api.api_key},
			 	method: 'GET',
			 	headers: {
			 		"Accept":"application/json"
			 	}
			}, callback);
	};

	this.tvShowSeasonInfo = function(tv_id, season_id, callback){
		executeRequest(
			{
				url : baseUrl + "/tv/" + tv_id + "/season/" + season_id,
			 	qs:{ "api_key" : api.api_key},
			 	method: 'GET',
			 	headers: {
			 		"Accept":"application/json"
			 	}
			}, callback);
	};

	this.tvShowEpisodeInfo = function(tv_id, season_id, episode_id, callback){
		executeRequest(
			{
				url : baseUrl + "/tv/" + tv_id + "/season/" + season_id + "/episode/" + episode_id,
			 	qs:{ "api_key" : api.api_key},
			 	method: 'GET',
			 	headers: {
			 		"Accept":"application/json"
			 	}
			}, callback);
	};

	this.similarTVShows = function(tvdb_id, callback){
		executeRequest({
			url : baseUrl + "/tv/" + tv_id + "/similar",
			qs:{ "api_key" : api.api_key },
			method: 'GET',
			headers: {
				"Accept":"application/json"
			}
		}, callback);
	};

	this.latestTVShows = function(callback){
		if(typeof callback === 'undefined'){
			callback = (response) => { console.log(response); };
		}
		executeRequest({
			url : baseUrl + "/tv/latest",
			qs:{ "api_key" : api.api_key },
			method: 'GET',
			headers: {
				"Accept":"application/json"
			}
		}, callback);
	};

	this.popularTVShows = function(callback){
		if(typeof callback === 'undefined'){
			callback = (response) => { console.log(response); };
		}
		executeRequest({
			url : baseUrl + "/tv/popular",
			qs:{ "api_key" : api.api_key },
			method: 'GET',
			headers: {
				"Accept":"application/json"
			}
		}, callback);
	};

	this.topRatedTVShows = function(callback){
		if(typeof callback === 'undefined'){
			callback = (response) => { console.log(response); };
		}
		executeRequest({
			url : baseUrl + "/tv/top_rated",
			qs:{ "api_key" : api.api_key },
			method: 'GET',
			headers: {
				"Accept":"application/json"
			}
		}, callback);
	};

	this.searchMovie = function(query_item, callback){
		executeRequest({
			url: baseUrl + "/search/movie",
			qs: { api_key: api.api_key, query: query_item },
			method: 'GET',
			headers: {
				"Accept":"application/json"
			}
		}, callback);
	};

	this.searchTVShow = function(query_item, callback){
		executeRequest({
			url: baseUrl + "/search/tv",
			qs: { api_key: api.api_key, query: query_item },
			method: 'GET',
			headers: {
				"Accept":"application/json"
			}
		}, callback);
	};

	this.tvShowAiringToday = function(callback){
		if(typeof callback === 'undefined'){
			callback = (response) => { console.log(response); };
		}
		executeRequest({
			url: baseUrl + 'tv/airing_today',
			qs: { api_key: api_key },
			method: 'GET',
			headers: {
				"Accept": "application/json"
			}
		}, callback);
	};

	this.tvShowOnAir = function(callback){
		if(typeof callback === 'undefined'){
			callback = (response) => { console.log(response); };
		}
		executeRequest({
			url: baseUrl + '/tv/on_the_air',
			qs: { api_key: api_key },
			method: 'GET',
			headers: {
				"Accept": "application/json"
			}
		}, callback);
	};
}
