import { useFormStatus } from "react-dom";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact";

export const Route = createLazyFileRoute("/contact")({
	component: ContactRoute,
});

function ContactRoute() {
	const mutation = useMutation({
		mutationFn: function (e) {
			// "use server"
			e.preventDefault();
			const formData = new FormData(e.target);
			return postContact(
				formData.get("name"),
				formData.get("email"),
				formData.get("message")
			);
		},
	});

	return (
		<div className="contact">
			<h2>Contact</h2>
			{mutation.isSuccess ? (
				<h3>Submitted!</h3>
			) : (
				<form onSubmit={mutation.mutate}>
					<input type="text" name="name" placeholder="Name" required />
					<input type="email" name="email" placeholder="Email" required />
					<textarea placeholder="Message" name="message"></textarea>
					<button>Submit</button>
				</form>
			)}
		</div>
	);
}

// ! it broke the code
// function ContactInput(props) {
// 	const pending = useFormStatus();
// 	return (
// 		<input
// 			disabled={pending}
// 			name={props.name}
// 			type={props.type}
// 			placeholder={props.placeholder}
// 		/>
// 	);
// }
