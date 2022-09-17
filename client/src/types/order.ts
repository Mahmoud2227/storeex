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

interface Order {
	_id?: string;
	user?: string;
	orderItems: OrderItem[];
	shippingAddress: ShippingAddress;
	paymentMethod: string;
	itemsPrice: number;
	taxPrice: number;
	shippingPrice: number;
	totalPrice: number;
	isPaid?: boolean;
	paidAt?: string;
	isDelivered?: boolean;
	deliveredAt?: string;
}

export default Order;
