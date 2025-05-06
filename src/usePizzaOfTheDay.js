import { useState, useEffect } from "react";

export const usePizzaOfTheDay = () => {
	const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);

	useEffect(() => {
		async function fetchPizzaOfTheDay() {
			const response = await fetch("/api/pizza-of-the-day");
			const data = await response.json();
			setPizzaOfTheDay(data);
		}

		// Wait for 10 seconds before fetching the pizza of the day
		const delay = setTimeout(() => {
			fetchPizzaOfTheDay();
		}, 3000);

		// Clean up the timeout if the component unmounts
		return () => clearTimeout(delay);
	}, []);

	return pizzaOfTheDay;
};
