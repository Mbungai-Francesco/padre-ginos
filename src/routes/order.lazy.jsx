import { useContext, useEffect, useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import Pizza from "../Pizza";
import Cart from "../Cart";
import { CartContext } from "../contexts";

export const Route = createLazyFileRoute("/order")({
	component: Order
})

const intl = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

export default function Order() {
	const [pizzaTypes, setPizzaTypes] = useState([]);
	const [pizzaType, setPizzaType] = useState("pepperoni");
	const [pizzaSize, setPizzaSize] = useState("M");
	const [loading, setLoading] = useState(true);
	const [cart, setCart] = useContext(CartContext);

	async function checkout(){
		setLoading(true);

		await fetch("/api/order",{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({cart}),
		})
		
		setCart([])
		setLoading(false)
	}

	let price, selectedPizza;

	if (!loading) {
		// console.log(pizzaTypes);
		// console.log(pizzaType);

		selectedPizza = pizzaTypes.find((pizza) => pizzaType == pizza.id);
		// console.log(selectedPizza);
		price = intl.format(selectedPizza.sizes[pizzaSize]);
	}

	const fetchPizzaTypes = async () => {
		// await new Promise((resolve) => setTimeout(resolve, 5000));

		const pizzaRes = await fetch("/api/pizzas");
		const pizzaJson = await pizzaRes.json();
		setPizzaTypes(pizzaJson);
		setLoading(false);
	};

	useEffect(() => {
		fetchPizzaTypes();
	}, []);

	return (
		<div className="order">
			<h2>Create Order</h2>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }]);
				}}
			>
				<div>
					<div>
						<label htmlFor="pizza-type">Pizza Type</label>
						<select
							onChange={(e) => setPizzaType(e.target.value)}
							name="pizza-type"
							value={pizzaType}
						>
							{pizzaTypes.map((pizza) => (
								<option key={pizza.id} value={pizza.id}>
									{pizza.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="pizza-size">Pizza Size</label>
						<div>
							<span>
								<input
									checked={pizzaSize === "S"}
									onChange={(e) => setPizzaSize(e.target.value)}
									type="radio"
									name="pizza-size"
									value="S"
									id="pizza-s"
								/>
								<label htmlFor="pizza-s">Small</label>
							</span>
							<span>
								<input
									checked={pizzaSize === "M"}
									onChange={(e) => setPizzaSize(e.target.value)}
									type="radio"
									name="pizza-size"
									value="M"
									id="pizza-m"
								/>
								<label htmlFor="pizza-m">Medium</label>
							</span>
							<span>
								<input
									checked={pizzaSize === "L"}
									onChange={(e) => setPizzaSize(e.target.value)}
									type="radio"
									name="pizza-size"
									value="L"
									id="pizza-l"
								/>
								<label htmlFor="pizza-l">Large</label>
							</span>
						</div>
					</div>
					<button type="submit">Add to Cart</button>
				</div>
				<div className="order-pizza">
					{loading ? (
						<h1>Loading pizza</h1>
					) : (
						<Pizza
							name={selectedPizza.name}
							description={selectedPizza.description}
							image={selectedPizza.image}
						/>
					)}
					<p>{price}</p>
				</div>
			{loading ? <h2>Loading ...</h2> : <Cart cart={cart} checkout={checkout} />}
			</form>
		</div>
	);
}
