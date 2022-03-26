import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";

function Confirmation() {
	const location = useLocation();
	const { id, cpf, date, name, time, title } = location.state;
	return (
		<Container>
			<h1>
				Pedido feito <br /> com sucesso!
			</h1>
			<Info>
				<h2>Filme e Sessão</h2>
				<span>{title}</span>
				<span>
					{date} {time}
				</span>
			</Info>

			<Info>
				<h2>Ingressos</h2>
				{id.map((id, index) => {
					return <span key={index}>Assento {id}</span>;
				})}
			</Info>
			<Info>
				<h2>Comprador</h2>
				<span>Nome: {name}</span>
				<span>CPF: {cpf}</span>
			</Info>
			<Link to="/">
				<button>Voltar para Home</button>
			</Link>
		</Container>
	);
}

const Container = styled.div`
	min-height: calc(100vh - 60px);
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: "Roboto";
		font-style: normal;
		font-weight: 700;
		font-size: 24px;
		color: #247a6b;
		margin-bottom: 30px;
	}

	button {
		cursor: pointer;
		margin-top: 100px;
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

const Info = styled.div`
	display: flex;
	flex-direction: column;
	width: 90%;
	margin-bottom: 30px;

	h2 {
		margin-bottom: 10px;
		font-family: "Roboto";
		font-style: normal;
		font-weight: 700;
		font-size: 24px;
		color: #293845;
	}

	span {
		margin-bottom: 10px;
		font-family: "Roboto";
		font-style: normal;
		font-weight: 400;
		font-size: 22px;
		color: #293845;
	}
`;

export default Confirmation;
