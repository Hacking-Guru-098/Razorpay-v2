const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/razorpay");

const orderSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		amount: {
			type: Number,
		},
		order_id: {
			type: String,
		},
		razorpay_payment_id: {
			type: String,
			default: null,
		},
		razorpay_order_id: {
			type: String,
			default: null,
		},
		razorpay_signature: {
			type: String,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

const orderModel = mongoose.model("order", orderSchema);

module.exports = { orderModel };
