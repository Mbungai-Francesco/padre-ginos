import { createRoot } from "react-dom/client";
import Pizza from "./Pizza";
import Order from "./Order";
import { StrictMode } from "react";
import PizzaOfTheDay from "./PizzaOfTheDay";

const App = () => {
	return (
		<StrictMode>
			<div>
				<h1>Padre Gino's</h1>
				<Order />
				<PizzaOfTheDay />
			</div>
		</StrictMode>
	);
};

const container = document.getElementById("root");
// modify the createRoot call, delete "ReactDOM"
const root = createRoot(container);
root.render(<App />);
