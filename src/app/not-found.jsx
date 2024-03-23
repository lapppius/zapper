import Image from "next/image";

export default async function NotFound() {
	const endpoint = `https://api.unsplash.com/photos/random`;
	const query = "corgi";
	const url = `${endpoint}?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}&count=1`;
	let data = null;

	try {
		const res = await fetch(url);
		if (!res.ok) {
			throw Error("error occurred", res.statusText, res.status);
		}
		data = await res.json();
	} catch (error) {
		console.log(error);
	}

	return (
		<div className="flex flex-col items-center justify-center h-full gap-y-4">
			<h1 className="text-4xl font-black">Page Not Found</h1>
			<p>The page you requested could not be found.</p>
			{data != null ? (
				<div>
					<Image
						src={data[0].urls.small}
						alt={data[0].alt_description}
						width={400}
						height={400}
						style={{ aspectRatio: "4/3", objectFit: "cover" }}
						className="rounded-md "
					/>
				</div>
			) : null}
		</div>
	);
}
