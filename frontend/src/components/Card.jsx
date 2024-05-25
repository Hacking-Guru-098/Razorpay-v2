import React from "react";

const Card = ({ image, title, price, onCheckout }) => {
	return (
		<>
			<div className='p-4 md:w-1/3'>
				<div className='h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden'>
					<img
						className='lg:h-48 md:h-36 w-full object-cover object-center'
						src={image}
						alt='blog'
					/>
					<div className='p-6'>
						<h1 className='title-font text-lg font-medium text-gray-900 mb-3'>
							{title}
						</h1>
						<div className='flex items-center flex-wrap '>
							<button
								onClick={() => onCheckout({ name: title, amount: price })}
								className='bg-black text-white px-6 py-2 rounded-lg'
							>
								Pay Now &#8377;{price}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Card;
