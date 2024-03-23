"use client";
import { useFormStatus } from "react-dom";
import Button from "./Button";

export default function SubmitButton() {
	// useFormStatus gives information about the parent form
	const { pending } = useFormStatus();

	return (
		<Button
			title={pending ? "Saving" : "Save"}
			type="submit"
			aria-disabled={pending}
			disabled={pending}
			className="rounded-[var(--more-radius)] border border-[1px] border-[var(--light)] my-1 disabled:opacity-65"
		/>
	);
}
