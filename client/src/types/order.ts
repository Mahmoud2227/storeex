export interface ShippingAddress {
	address: string;
	city: string;
	postalCode: string;
	country: string;
}

type OrderItem = {
	name: string;
	qty: number;
	image: string;
	price: number;
	product: string;
};

type User = {
	_id: string;
	name: string;
	email: string;
};

interface Order {
	_id?: string;
	user?: User;
	orderItems: OrderItem[];
	shippingAddress: ShippingAddress;
	paymentMethod: string;
	taxPrice: number;
	shippingPrice: number;
	totalPrice: number;
	isPaid?: boolean;
	paidAt?: string;
	isDelivered?: boolean;
	deliveredAt?: string;
}

export default Order;
