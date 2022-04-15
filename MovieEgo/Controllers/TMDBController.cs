﻿using System.IO;
using System.Net;
using Newtonsoft.Json;
using MovieEgo.DAL.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace MovieEgo.Controllers
{
    [ApiController]
	[Route("[controller]")]
	public class TMDBController : ControllerBase
	{
		[HttpGet]
		public IActionResult getMovie()
		{
			string apiKey = "5faa0dfc8b865cd84a95b608556b810d";
			HttpWebRequest apiRequest = WebRequest.Create("https://api.themoviedb.org/3/movie/550" + "?api_key=" + apiKey) as HttpWebRequest;

			string apiResponse = "";

			using (HttpWebResponse response = apiRequest.GetResponse() as HttpWebResponse)
			{
				StreamReader reader = new StreamReader(response.GetResponseStream());
				apiResponse = reader.ReadToEnd();
			}

			TMDBMovieDto TMDBMovieResponse = JsonConvert.DeserializeObject<TMDBMovieDto>(apiResponse);
			TMDBMovieDto Movie = new TMDBMovieDto();
			Movie.title = TMDBMovieResponse.title;
			Movie.overview = TMDBMovieResponse.overview;
			Movie.poster_path = TMDBMovieResponse.poster_path;

			return Ok(Movie);
		}

		[HttpGet("Popular")]
		public IActionResult getPopularMovies()
		{
			string apiKey = "5faa0dfc8b865cd84a95b608556b810d";
			HttpWebRequest apiRequest = WebRequest.Create("https://api.themoviedb.org/3/movie/popular" + "?api_key=" + apiKey + "&language=en-US&page=1") as HttpWebRequest;

			string apiResponse = "";

			using (HttpWebResponse response = apiRequest.GetResponse() as HttpWebResponse)
			{
				StreamReader reader = new StreamReader(response.GetResponseStream());
				apiResponse = reader.ReadToEnd();
			}

			TMDBMovieListDto TMDBMovieResponse = JsonConvert.DeserializeObject<TMDBMovieListDto>(apiResponse);
			//TMDBMovieDto TMDBPop = JsonConverter(apiResponse);
			//TMDBMovieDto Movie = new TMDBMovieDto();
			//Movie.title = TMDBMovieResponse.title;
			//Movie.overview = TMDBMovieResponse.overview;
			//Movie.poster_path = TMDBMovieResponse.poster_path;

			return Ok(TMDBMovieResponse);
		}
	}
}
