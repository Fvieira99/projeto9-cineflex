import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../footer";

import "./style.css";

function Sections() {
	const [info, setInfo] = useState({});
	const [sections, setSections] = useState([]);
	const { idFilme } = useParams();

	useEffect(() => {
		const promise = axios.get(
			`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes `
		);
		promise.then((response) => {
			const {
				data: { title, days, posterURL },
			} = response;
			console.log(days);
			setSections(days);
			setInfo({ title: title, url: posterURL });
		});
	}, []);

	return (
		<div className="Sections">
			<h2>Selecione a sessão</h2>
			<main>
				{sections.map((section) => {
					const { weekday, date, showtimes } = section;
					return (
						<div className="section">
							<p>
								{weekday} - {date}
							</p>
							<div className="showtimes">
								{showtimes.map((showtime) => {
									const { name, id } = showtime;
									return (
										<Link to={`/assentos/${id}`}>
											<button>{name}</button>
										</Link>
									);
								})}
							</div>
						</div>
					);
				})}
			</main>

			<Footer title={info.title} url={info.url} style="hidden" />
		</div>
	);
}

export default Sections;
