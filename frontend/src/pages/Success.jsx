import React from "react";
import {useSearchParams} from react-router-dom
const Success = () => {
	const [query] = useSearchParams()
	console.log(query.get("payment_id"));
	return <div>
		
	</div>;
};

export default Success;
