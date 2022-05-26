import { Component } from "react";
import { Card } from "../card/Card";
import "../llista/llista.css";
import { Formulari } from "../formulari/Formulari";
import { createUUID } from "../../utilities/createUuId";
import { movieServices } from "../../services/movieServices";

export class Llista extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      formIsActive: false,
      movieToPreview: {},
      isEditMode: false,
    };
  }
  getAllMovies = () => {
    movieServices.getAllMovies().then((res) => {
      this.setState({ movies: res });
    });
  };

  componentDidMount() {
    this.getAllMovies();
  }

  deleteMovie = (id) => {
    let confirmation = window.confirm("Are you sure?");
    if (!confirmation) return;
    movieServices.deleteMovie(parseInt(id)).then((res) => {
      if (res) this.getAllMovies();
      alert("Movie deleted");
    });
  };

  postMovie = (movie) => {
    movieServices.postMovie(movie).then((res) => {
      if (res) this.getAllMovies();
      alert(`${res.title} added! Movie id: ${res.id}`);
      this.exitEditMode();
      this.setState({formIsActive: false})
    });
  };

  toggleForm = () => {
    this.setState({
      formIsActive: !this.state.formIsActive,
    });
  };

  exitEditMode = () => {
    this.setState({
      isEditMode: false,
      movieToPreview: {},
    });
  };

  nextMovieToPreview = (movie) => {
    this.setState({
      isEditMode: true,
      nextMovieToPreview: movie,
    });
  };

  addMovie = (data) => {
    data = createUUID();
    this.setState({ movies: [data, ...this.state.movies] });
    console.log(data);
  };

  deleteMovie = (id) => {
    let moviesToNotDelete = this.state.movies.filter(
      (movie) => movie.id !== id
    );
    this.setState({ movies: moviesToNotDelete });
  };




  render() {
    console.log(this.state)
    return (
      <div className="container">
        <div className="list">
          {this.state.movies.map((movie, key) => (
            <Card key={key} movie={movie} deleteMovie={this.deleteMovie} toggleForm={this.toggleForm} nextMovieToPreview={this.nextMovieToPreview} />
          ))}
        </div>
        {!this.state.formIsActive?
        <button className='form-button' onClick={()=>{this.toggleForm(); this.exitEditMode() }}>Add</button>
        :null}
        {this.state.formIsActive? <Formulari postMovie={this.postMovie} toggleForm={this.toggleForm} formIsActive={this.state.formIsActive} isEditMode={this.state.isEditMode} movieToPreview={this.state.movieToPreview}/> :null}
      </div>
    )
  }
}
