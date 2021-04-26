import { TextInput } from 'components/TextInput/TextInput';
import './Home.css';
import { useFetchAllMovies } from './rest';

const Home = () => {
  const { data, loading } = useFetchAllMovies();

  return (
    <div className="home-container">
      <h1>Popular Movies</h1>
      <TextInput />

      {loading ? (
        <div>Loading movies...</div>
      ) : (
        <ol>
          {data.map(movie => (
            <li key={movie.id}>
              {movie.title}
              <ul>
                <li>Release Daste: {movie.releaseDate}</li>
                <li>Description: {movie.overview}</li>
                <li>Average Vote: {movie.voteAverage}</li>
                <li>Total Votes: {movie.voteCount}</li>
                <li>Genres: {movie.genres.join(', ')}</li>
              </ul>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Home;
