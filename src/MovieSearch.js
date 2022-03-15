import React from 'react'
import {useState} from 'react';
import MovieCard from './MovieCard';

 
 function SearchMovies() {
    
const [query, setQuery] = useState('');
const [movies, setMovies] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [isError, setIsError] = useState(false);

    const url = `https://api.themoviedb.org/3/search/movie?api_key=5ecdac6bf5cbd1b0af8b74fa33ff3c8f&language=en-US&query=${query}&page=1&include_adult=false`;
     
   
   
const getSearchMovies = async (e) => {
  try{
  if(e){e.preventDefault();}
  setIsLoading(true);
  const response = await fetch(url);
  if(response.status >= 200 && response.status <= 299){
  const data = await response.json();
   setMovies(data.results);
   setIsLoading(false);
   return data;
 }

 else{
   setIsLoading(false);
   setIsError(true);
    throw new Error(response.statusText);
 }
}
catch(e){
  setIsLoading(false);
   setIsError(true);
}
}
if(isLoading){
return(
  <div>
    <div className="center">
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      </div>
  </div>
)
  }
  if(isError){
return(
  <div>
    <h1>Error...</h1>
  </div>
)}
 
  return (
    <div>
        <form className='search-container'>
                        <input type="text" autoComplete="off" name="query" placeholder="Search for movies..."
                            className="search" value={query} onChange= {(e) => setQuery(e.target.value)} required />
                        <button type="submit" className="btn" onClick={getSearchMovies} > Search </button>
                        </form>
                  <div className="card-list">
                    {movies.filter(movie => movie.poster_path).map((movie) => (<MovieCard movie={movie} key={movie.id}/>))}

                    </div>      
                    
    </div>
  )
  

}

export default SearchMovies