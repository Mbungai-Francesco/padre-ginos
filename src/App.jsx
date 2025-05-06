import { createRoot } from "react-dom/client";
import Pizza from "./Pizza";
import Order from "./Order";
import { StrictMode, useState } from "react";
import PizzaOfTheDay from "./PizzaOfTheDay";
import Header from "./Header";
import { CartContext } from "./contexts";

const App = () => {
	const cartHook = useState([])
	return (
		<StrictMode>
			<CartContext.Provider value={cartHook}>
				<div>
					<Header />
					<Order />
					<PizzaOfTheDay />
				</div>
			</CartContext.Provider>
		</StrictMode>
	);
};

const container = document.getElementById("root");
// modify the createRoot call, delete "ReactDOM"
const root = createRoot(container);
root.render(<App />);
