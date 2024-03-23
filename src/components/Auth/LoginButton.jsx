"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Button from "../UI/Button";

export default function LoginButton({ provider, callbackUrl }) {
	const [isLoading, setIsLoading] = useState(false);

	const signInWith = async () => {
		try {
			setIsLoading(true);
			await signIn(provider.id, {
				callbackUrl: "http://192.168.1.41:3000/radios",
			});
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div>
			<Button
				disabled={isLoading}
				onClick={signInWith}
				className="flex items-center gap-2 disabled:opacity-60"
				title={`Sign in with ${provider.name}`}
				loading={isLoading}
			/>
		</div>
	);
}
