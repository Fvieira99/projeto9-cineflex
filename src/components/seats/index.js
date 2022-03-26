import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../footer";
import styled from "styled-components";

function Seats() {
	const labelInfo = [
		{ bgColor: "#8DD7CF", status: "Selecionado" },
		{ bgColor: "#C3CFD9", status: "Disponível" },
		{ bgColor: "#FBE192", status: "Indisponível" },
	];

	const [bookingName, setBookingName] = useState("");
	const [bookingCPF, setBookingCPF] = useState("");
	const [selected, setSelected] = useState([]);
	const [movieInfo, setMovieInfo] = useState({});
	const [seats, setSeats] = useState([]);
	const { idSessao } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		const promise = axios.get(
			`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
		);
		promise.then((response) => {
			console.log(response);
			const {
				data: {
					day: { weekday, date },
					movie: { title, posterURL },
					seats,
					name,
				},
			} = response;
			setSeats(seats);
			setMovieInfo({
				date: date,
				weekday: weekday,
				title: title,
				posterURL: posterURL,
				name: name,
			});
		});
	}, []);

	function submitInfo(e) {
		e.preventDefault();
		const promise = axios.post(
			"https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many",
			{
				ids: selected,
				name: bookingName,
				cpf: bookingCPF,
			}
		);

		promise.then((response) => {
			console.log(response);
			navigate("/sucesso", {
				state: {
					id: selected,
					name: bookingName,
					cpf: bookingCPF,
					date: movieInfo.date,
					title: movieInfo.title,
					time: movieInfo.name,
				},
			});
			setBookingName("");
			setBookingCPF("");
		});

		promise.catch((err) => console.log(err));
	}
	return (
		<Container>
			<Title>Selecione o(s) assento(s)</Title>
			<SeatsContainer>
				{seats.map((seat, index) => {
					const { id, name, isAvailable } = seat;
					return (
						<Seat
							key={index}
							onClick={() => {
								if (isAvailable && !selected.some((number) => number === id)) {
									setSelected([...selected, id]);
								}
							}}
							isAvailable={isAvailable}
							id={id}
							selected={selected}
						>
							<span>{name}</span>
						</Seat>
					);
				})}
			</SeatsContainer>
			<Labels>
				{labelInfo.map((label, index) => {
					const { bgColor, status } = label;
					return (
						<div key={index}>
							<Circle bgColor={bgColor}></Circle>
							<span>{status}</span>
						</div>
					);
				})}
			</Labels>
			<form onSubmit={submitInfo}>
				<Input>
					<span>Nome do Comprador:</span>
					<input
						onChange={(e) => {
							setBookingName(e.target.value);
						}}
						type="text"
						placeholder="Digite seu nome..."
					></input>
				</Input>
				<Input>
					<span>CPF do Comprador:</span>
					<input
						onChange={(e) => {
							setBookingCPF(e.target.value);
						}}
						type="text"
						maxLength={11}
						minLength={11}
						pattern="[0-9]{11}"
						placeholder="Digite seu CPF"
					></input>
				</Input>
				<button type="submit">Reservar Assento(s)</button>
			</form>
			<Footer
				time={movieInfo.name}
				weekday={movieInfo.weekday}
				title={movieInfo.title}
				url={movieInfo.posterURL}
				style="show"
			></Footer>
		</Container>
	);
}

const Container = styled.div`
	min-height: calc(100vh - 177px);
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	form {
		width: 90%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		margin-bottom: 137px;
	}

	form button {
		margin-top: 25px;
		width: 225px;
		height: 42px;
		background-color: #e8833a;
		border-radius: 3px;
		border: none;
		color: #ffffff;
		font-family: "Roboto";
		font-style: normal;
		font-weight: 400;
		font-size: 18px;
	}
`;

const SeatsContainer = styled.div`
	width: 90%;
	height: 250px;
	gap: 10px;
	display: flex;
	flex-wrap: wrap;
`;

const Seat = styled.div`
	width: 26px;
	height: 26px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	background-color: ${(props) => {
		if (
			props.isAvailable === true &&
			props.selected.some((id) => id === props.id)
		) {
			return "#8DD7CF;";
		} else if (props.isAvailable === true) {
			return "#C3CFD9;";
		} else {
			return "#FBE192;";
		}
	}}
		
	pointer-events: ${(props) => (props.isAvailable === true ? "auto" : "none")}
	
	border: 1px solid #808f9d;
	border-radius: 12px;

	span {
		font-family: "Roboto";
		font-style: normal;
		font-weight: 400;
		font-size: 13px;
		color: #4e5a65;
	}
`;

const Title = styled.h1`
	width: 100%;
	height: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: "Roboto";
	font-style: normal;
	font-weight: 400;
	font-size: 24px;
	line-height: 28px;
	color: #293845;
`;

const Labels = styled.div`
	width: 90%;
	height: 50px;
	display: flex;
	justify-content: space-around;
	margin-bottom: 45px;
	margin-top: 10px;

	div {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	div span {
		font-family: "Roboto";
		font-style: normal;
		font-weight: 400;
		font-size: 13px;
		color: #4e5a65;
	}
`;

const Circle = styled.div`
	width: 26px;
	height: 26px;
	background-color: ${(props) => props.bgColor};
	border: 1px solid #1aae9e;
	border-radius: 17px;
`;

const Input = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;

	span {
		font-family: "Roboto";
		font-style: normal;
		font-weight: 400;
		font-size: 18px;
		color: #293845;
	}

	input {
		height: 51px;
		text-indent: 10px;
		font-family: "Roboto";
		font-style: normal;
		font-weight: 400;
		font-size: 18px;
	}

	input::placeholder {
		font-family: "Roboto";
		font-style: normal;
		font-weight: 400;
		font-size: 18px;
		color: #afafaf;
	}
`;

export default Seats;
