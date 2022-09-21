import {BrowserRouter, Route, Routes} from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import UsersList from "./pages/UsersList";

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main className='container flex flex-col mx-auto min-h-[80vh] p-6'>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/' element={<Home />} />
					<Route path='/profile' element={<Profile />} />
					<Route path='/product/:id' element={<Product />} />
					<Route path='/cart'>
						<Route index element={<Cart />} />
						<Route path=':id' element={<Cart />} />
					</Route>
					<Route path='/shipping' element={<Shipping />} />
					<Route path='/payment' element={<Payment />} />
					<Route path='/placeorder' element={<PlaceOrder />} />
					<Route path='/orders/:id' element={<Order />} />
					<Route path='/admin/users' element={<UsersList />} />
				</Routes>
			</main>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
