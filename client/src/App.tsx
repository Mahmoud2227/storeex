import {BrowserRouter, Route, Routes} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className='container mx-auto min-h-[80vh]'>
				<h1>Welcome to Storeex</h1>
			</main>
			<Routes></Routes>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
