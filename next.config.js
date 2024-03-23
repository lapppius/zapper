/**
 * @type {import('next').NextConfig}
 */

const path = require("path");

module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				pathname: "/a/*",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{ protocol: "https", hostname: "picsum.photos" },
		],
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
		prependData: `@use "../src/app/variables.scss" as v;`,
	},
};
