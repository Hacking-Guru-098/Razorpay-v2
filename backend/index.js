const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Razorpay = require("razorpay");
const crypto = require('crypto');
const { orderModel } = require("./db");

const razorpay = new Razorpay({
	key_id: "rzp_test_InJVS9CI3VVZK8",
	key_secret: "ZrVqMVEM299iTJFwG8xaPsny",
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes

app.post("/payment/checkout", async (req, res) => {
	const { name, amount } = req.body;
	
	try {
		const order = await razorpay.orders.create({
			amount: Number(amount * 100),
			currency: "INR",
			receipt: "order_receipt_" + Date.now(), // Ensure receipt ID is unique and within 40 characters
			notes: {
				name: name
			},
		});
		
		await orderModel.create({
			order_id: order.id,
			name: name,
			amount: amount
		});
		
		res.json({ order }); // Send the order details as a response
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Failed to create order" }); // Send error response
	}
});
app.post("/payment/payment-verification", async (req, res) => {
	const { razorpay_payment_id,razorpay_order_id,razorpay_signature } = req.body;
	const body_data = razorpay_order_id+'|'+ razorpay_payment_id
	const expect = crypto.createHmac("sha256", "ZrVqMVEM299iTJFwG8xaPsny").update(body_data).digest("hex");
	const isValid = expect===razorpay_signature
	if(isValid){
		await orderModel.findOneAndUpdate(
			{ order_id: razorpay_order_id },
			{
				$set: {
					razorpay_payment_id,
					razorpay_order_id,
					razorpay_signature,
				}
			}
		);
		res.redirect(`http://localhost:5000/success?payment_id=${razorpay_payment_id}`)
		return
	}
	else{
		res.redirect("http://localhost:5000/failed")
		return
	}
})


app.listen(5000);
