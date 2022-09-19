import {Types} from "mongoose";

interface IOrder {
	user: Types.ObjectId;
	orderItems: {
		name: string;
		qty: number;
		image: string;
		price: number;
		product: Types.ObjectId;
	}[],
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  },
  paymentMethod: string;
  paymentResult: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  },
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: number | Date;
  isDelivered: boolean;
  deliveredAt: Date;
}

export default IOrder;
