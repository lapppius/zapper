import { PlayerProvider } from "@/contexts/PlayerContext";
import Header from "../components/Header";
import Player from "../components/Player/Player";
import "./globals.scss";

import { Manrope } from "next/font/google";

export const metadata = {
	metadataBase: process.env.VERCEL_URL
		? new URL(`https://${process.env.VERCEL_URL}`)
		: new URL(`http://localhost:${process.env.PORT || 3000}`),
	title: {
		template: "%s | Zapper Music",
		default: "Zapper Music", // a default is required when creating a template
	},
};

const manrope = Manrope({
	weight: "300",
	subsets: ["latin", "greek"],
});

export default function RootLayout({ children }) {
	return (
		<PlayerProvider>
			<html lang="en" className={manrope.className}>
				<body className="flex flex-col  w-full p-0  bg-[image:var(--background-noise)] bg-[color:var(--dark)] items-center">
					<Header />
					<div className="relative flex justify-center flex-auto w-full overflow-auto root_layout h-fit">
						{children}
					</div>
					<Player />
				</body>
			</html>
		</PlayerProvider>
	);
}
