import "./style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
	const [films, setFilms] = useState([]);

	useEffect(() => {
		const promise = axios.get(
			"https://mock-api.driven.com.br/api/v5/cineflex/movies"
		);
		promise.then((response) => {
			console.log(response);
			const { data } = response;
			setFilms(data);
		});
	}, []);

	return (
		<div className="Home">
			<h2>Selecione o filme</h2>
			<main>
				{films.map((film) => {
					const { posterURL, id, title } = film;
					return (
						<Link key={id} to={`/sessoes/${id}`}>
							<div className="film">
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
