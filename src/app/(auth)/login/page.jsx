import AuthMain from "@/components/UI/AuthMain";
import LoginButton from "@/components/Auth/LoginButton";

export default async function Login({ searchParams }) {
	const callbackUrl = searchParams.callbackUrl;

	// Fetches available providers from the next-auth endpoint
	// because getProviders() function is client side only
	const providersEndpoint = `${process.env.BASE_URL}/api/auth/providers`;
	const res = await fetch(providersEndpoint);
	const providers = await res.json();

	return (
		<AuthMain title="Login">
			{Object.values(providers).map((provider) => (
				<div key={provider.name} style={{ marginBottom: 0 }}>
					<LoginButton provider={provider} callbackUrl={callbackUrl} />
				</div>
			))}
		</AuthMain>
	);
}
