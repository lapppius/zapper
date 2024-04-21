"use client";
import AuthMain from "@/components/UI/AuthMain";
import LoginButton from "@/components/Auth/LoginButton";
import { useEffect, useState } from "react";

export default function Login({ searchParams }) {
  const callbackUrl = searchParams.callbackUrl;
  const [providers, setProviders] = useState();

  // Fetches available providers from the next-auth endpoint
  // because getProviders() function is client side only
  let providersEndpoint;

  if (process.env.NODE_ENV === "development") {
    // Use development endpoint
    providersEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/providers`;
  } else {
    // Use production endpoint
    providersEndpoint = "/api/auth/providers"; // Assuming it's relative to your domain
  }

  useEffect(() => {
    fetch(providersEndpoint)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setProviders(res);
      });
  }, []);

  return (
    <AuthMain title="Login">
      {providers
        ? Object.values(providers).map((provider) => (
            <div key={provider.name} style={{ marginBottom: 0 }}>
              <LoginButton provider={provider} callbackUrl={callbackUrl} />
            </div>
          ))
        : null}
    </AuthMain>
  );
}
