import {BrowserRouter, Route, Routes} from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";

import Home from "./pages/Home";
import Product from "./pages/Product";

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className='container mx-auto min-h-[80vh] p-6'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/product/:id' element={<Product />} />
				</Routes>
			</main>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
