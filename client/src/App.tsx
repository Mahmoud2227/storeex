import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className="container mx-auto">
				<h1>Welcome to Storeex</h1>
			</main>
			<Routes></Routes>
		</BrowserRouter>
	);
};

export default App;
