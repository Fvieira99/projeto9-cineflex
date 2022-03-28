import "./style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const promise = axios.get(
			"https://mock-api.driven.com.br/api/v5/cineflex/movies"
		);
		promise.then((response) => {
			const { data } = response;
			setMovies(data);
		});
	}, []);

	return (
		<div className="Home">
			<h2>Selecione o filme</h2>
			<main>
				{movies.map((movie) => {
					const { posterURL, id, title } = movie;
					return (
						<Link key={id} to={`/sessoes/${id}`}>
							<div className="movie">
								<img src={posterURL} alt={title}></img>
							</div>
						</Link>
					);
				})}
			</main>
		</div>
	);
}

export default Home;
