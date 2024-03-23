import { auth } from "@/auth";
import Image from "next/image";

export default async function Profile() {
	const session = await auth();
	return (
		<>
			<header className="flex flex-row justify-center w-full col-span-1 col-start-1 row-span-1 row-start-1 border-b sm:col-span-2 sm:justify-start h-fit border-b-gray-600 ">
				<div className="flex flex-col items-center justify-between">
					<div className="flex justify-center w-full">
						<Image
							src={session?.user.image}
							alt={`${session?.user.name} profile picture`}
							width={100}
							height={100}
							className="object-cover rounded-full drop-shadow-2xl"
						/>
					</div>
					<h1 className="text-xl font-black">{session?.user.name}</h1>
					<h2 className="">
						{new Intl.DateTimeFormat(undefined, {
							dateStyle: "medium",
						}).format(new Date(session?.user.createdAt))}
					</h2>
				</div>
			</header>
			<main className="col-span-1 row-span-1 row-start-3 overflow-auto sm:row-start-2 sm:col-start-2 h-fit">
				<div>{session?.user.email}</div>
				<details>
				<summary>{session?.user.role}</summary>
					<pre>{JSON.stringify(session, null, 2)}</pre>
				</details>
			</main>
			<aside className="col-span-1 col-start-1 row-span-1 row-start-2 sm:row-start-2 h-fit">
				OPTIONS HERE AND SETTINGS
			</aside>
		</>
	);
}
