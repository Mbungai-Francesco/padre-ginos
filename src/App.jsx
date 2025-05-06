import { createRoot } from "react-dom/client";
import Pizza from "./Pizza";
import Order from "./routes/order.lazy";
import { StrictMode, useState } from "react";
import PizzaOfTheDay from "./PizzaOfTheDay";
import Header from "./Header";
import { CartContext } from "./contexts";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({routeTree})

const App = () => {
	return (
		<StrictMode>
			<RouterProvider router={router}/>
		</StrictMode>
	);
};

const container = document.getElementById("root");
// modify the createRoot call, delete "ReactDOM"
const root = createRoot(container);
root.render(<App />);
