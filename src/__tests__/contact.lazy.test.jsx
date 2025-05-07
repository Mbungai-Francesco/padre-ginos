// test that ensures that alt text renders
import { render, cleanup } from "@testing-library/react";
import { expect, test, afterEach, vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { Route } from "../routes/contact.lazy"

afterEach(cleanup)

const queryClient = new QueryClient()

const fetchMocker = createFetchMock(vi)
fetchMocker.enableMocks()

test("can submit contact form", async () => {
  fetchMocker.mockResponse(JSON.stringify({status: "ok"}))
  const screen = render(
    <QueryClientProvider client={queryClient}>
      <Route.options.component />
    </QueryClientProvider>
  )

  const nameInput = screen.getByPlaceholderText("Name")
  const emailInput = screen.getByPlaceholderText("Email")
  const msgTextArea = screen.getByPlaceholderText("Message")

  const testData = {
    name : "Melvis",
    email: "melvis@example.com",
    message: "great workflow.. keep up"
  }

  nameInput.value = testData.name
  emailInput.value = testData.email
  msgTextArea.value = testData.message

  const btn = screen.getByRole("button")
  btn.click()

  const h3 = await screen.findByRole("heading", {level: 3})

  expect(h3.innerText).toContain("Submitted!")

  const resquest = fetchMocker.requests()
  expect(resquest.length).toBe(1)
  expect(resquest[0].url).toBe("/api/contact")
  expect(fetchMocker).toHaveBeenCalledWith("/api/contact",{
    body: JSON.stringify(testData),
    headers: {
      'Content-Type': 'application/json',
    },
    method: "POST"
  })
})