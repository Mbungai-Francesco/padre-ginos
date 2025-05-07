import { expect, test, afterEach, vi } from "vitest";
import { render, cleanup } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import { usePizzaOfTheDay } from "../usePizzaOfTheDay"

const fetchMocker = createFetchMock(vi)
fetchMocker.enableMocks()

const testPizza ={
  id: "calabrese",
  name: "The Calabrese Pizza",
  category: "Supreme",
  description: "lol pizza from Calabria",
  image: "/public/pizzas/calabrese.webp",
  sizes: {
    S : 12.25,
    M : 16.25,
    L : 20.25
  }
}

function getPizzaOfTheDay() {
  let pizza;

  function TestComponent(){
    pizza = usePizzaOfTheDay()
    return null
  }

  render(<TestComponent />)

  return pizza
}

test("usePizzaOfTheDay() gives null when first call", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testPizza))
  const pizza = getPizzaOfTheDay()

  expect(pizza).toBe(null)
})