import {useEffect} from "react";
import {Link, useParams, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/RTK";
import {addProductToCart} from "../store/slices/cart";
import Message from "../components/UI/Message";

const Cart = () => {
	const {id} = useParams<{id: string}>();
	const [searchParams] = useSearchParams();
	const dispatch = useAppDispatch();
	const cartItems = useAppSelector((state) => state.cart.cartItems);
	const qty = searchParams.get("qty") || 1;
	useEffect(() => {
		if (id) {
			dispatch(addProductToCart(id, +qty));
		}
	}, [dispatch, id, qty]);
	return (
		<div>
      {
        cartItems.map(el => <div key={el.product}>{el.name} - {el.qty}</div>)
      }
    </div>
	);
};

export default Cart;
