import { createRoot } from "react-dom/client";
import Pizza from "./Pizza";
import Order from "./Order";

const App = () => {
	return (
		<div>
			<h1>Padre Gino's</h1>
			<Order />
			{/* <Pizza
				name="The Pepperoni Pizza"
				description="Mozzarella Cheese, Pepperoni"
				image={"/public/pizzas/pepperoni.webp"}
/>
			<Pizza
				name="The Hawaiian Pizza"
				description="Sliced Ham, Pineapple, Mozzarella Cheese"
				image={"/public/pizzas/hawaiian.webp"}
			/>
			<Pizza
				name="The Big Meat Pizza"
				description="Bacon, Pepperoni, Italian Sausage, Chorizo Sausage"
				image={"/public/pizzas/big_meat.webp"}
			/> */}
		</div>
	);
};

const container = document.getElementById("root");
// modify the createRoot call, delete "ReactDOM"
const root = createRoot(container);
root.render(<App/>);
