import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../header";
import Home from "../home";
import Sections from "../sections";
import Seats from "../seats";
import Confirmation from "../confirmation";

import "./reset.css";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/sessoes/:idFilme" element={<Sections />}></Route>
				<Route path="/assenpaths/:idSessao" element={<Seats />}></Route>
				<Route path="/sucesso" element={<Confirmation />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
