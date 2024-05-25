import React from "react";
import Card from "../components/Card";
import productData from "../api/product.json";
import axios from "axios";

const Product = () => {
	const checkoutHandler = async ({ name, amount }) => {
		const {data: { order }} = await axios.post("http://localhost:5000/payment/checkout", {
			name,amount
		});
		var options = {
			key: "rzp_test_InJVS9CI3VVZK8", // Enter the Key ID generated from the Dashboard
			amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
			currency: "INR",
			name: "acme corp",
			description: "Test Transaction",
			image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
			order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
			callback_url: "http://localhost:5000/payment/payment-verification",
			prefill: {
				name: "Gaurav Kumar",
				email: "gaurav.kumar@example.com",
				contact: "9000090000",
			},
			notes: {
				address: "Razorpay Corporate Office",
			},
			theme: {
				color: "#3399cc",
			},
		};
		var rzp1 = new Razorpay(options);
		rzp1.open();
	};
	return (
		<>
			<section className='text-gray-600 body-font'>
				<div className='container px-5 py-24 mx-auto'>
					<div className='flex flex-wrap -m-4'>
						{productData.map((c, i) => {
							return (
								<Card
									key={i}
									image={c.image}
									title={c.title}
									price={c.price}
									onCheckout={checkoutHandler}
								/>
							);
						})}
					</div>
				</div>
			</section>
		</>
	);
};

export default Product;
