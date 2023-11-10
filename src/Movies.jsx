import React, { useEffect, useState } from 'react';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=en-US&page=1`,
          {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmFkY2ExMzg2MThlMDkxODE4YzdlNzc0YzY3OTA0YyIsInN1YiI6IjY0ZWRiNjVlZTJiY2E4MDExYzI2YjBmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e5zxPUJGUCnvi6ZSh7R5fCRnBuNI9-HvBr5ZGjQjUuQ'
              
            }
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMovies(data.results);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (input) {
      fetchData();
    }
  }, [input]);

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  return (
    <div className='ml-5'>
      <form onSubmit={handleChange} className="mb-4">
        <label className="block text-lg font-bold mt-8 text-gray-700">
          Movie Name:
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className=" mt-1 block w-[700px] h-[40px]"
          placeholder="Enter a movie name"
        />
        <button type="submit" className="py-1.5 px-3 rounded-md bg-slate-500 m-auto mt-2">
          Submit
        </button>
      </form>
      <div className=''>
        <h1 >The Movies</h1>
        {movies.length > 0 ? (
          movies.map((item, id) => (
            <div key={id}>
              <h4>{item.original_title}</h4>
              <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.original_title} />
              <hr />
            </div>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default Movies;
