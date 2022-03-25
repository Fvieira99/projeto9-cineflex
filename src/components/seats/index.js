import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../footer";
import styled from "styled-components";

function Seats() {
	const labelInfo = [
		{ bgColor: "#8DD7CF", status: "Selecionado" },
		{ bgColor: "#C3CFD9", status: "Disponível" },
		{ bgColor: "#FBE192", status: "Indisponível" },
	];
	const [seats, setSeats] = useState([]);
	const { idSessao } = useParams();

	useEffect(() => {
		const promise = axios.get(
			`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`
		);
		promise.then((response) => {
			console.log(response);
			const {
				data: { day, movie, seats },
			} = response;
			setSeats(seats);
		});
	}, []);

	return (
		<Container>
			<Title>Selecione o(s) assento(s)</Title>
			<SeatsContainer>
				{seats.map((seat) => {
					const { id, name, isAvailable } = seat;
					return (
						<Seat isAvailable={isAvailable}>
							<span>{name}</span>
						</Seat>
					);
				})}
			</SeatsContainer>
			<Labels>
				{labelInfo.map((label) => {
					const { bgColor, status } = label;
					return (
						<div>
							<Circle bgColor={bgColor}></Circle>
							<span>{status}</span>
						</div>
					);
				})}
			</Labels>
			<Input>
				<span>Nome do Comprador:</span>
				<input type="text" placeholder="Digite seu nome..."></input>
			</Input>
			<Input>
				<span>CPF do Comprador:</span>
				<input
					type="text"
					minLength="11"
					maxLength="11"
					placeholder="Digite seu CPF"
				></input>
			</Input>
		</Container>
	);
}

const Container = styled.div`
	min-height: calc(100vh - 177px);
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
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
	background-color: ${(props) =>
		props.isAvailable === true ? "#C3CFD9" : "#FBE192;"};
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
	width: 90%;
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
