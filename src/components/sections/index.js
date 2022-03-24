import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Sections() {
	const [sections, setSections] = useState([]);
	const { idFilme } = useParams;

	useEffect(() => {
		const promise = axios.get(
			`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes `
		);
		promise.then(() => {});
	}, []);

	return (
		<div className="Sections">
			<h2>Selecione a sessão</h2>
		</div>
	);
}

export default Sections;
