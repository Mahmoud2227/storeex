import {BrowserRouter, Route, Routes} from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className='container flex flex-col mx-auto min-h-[80vh] p-6'>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/' element={<Home />} />
					<Route path='/product/:id' element={<Product />} />
					<Route path='/cart'>
						<Route index element={<Cart />} />
						<Route path=':id' element={<Cart />} />
					</Route>
				</Routes>
			</main>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
