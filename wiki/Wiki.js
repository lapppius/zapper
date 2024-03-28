const WIKIDATA_API = "https://www.wikidata.org/w/api.php";
// const EL_WIKIPEDIA_API = "https://el.wikipedia.org/w/api.php";
const LANG = "el";
const MAX_CACHE_AGE = 86400;

export function getWikidataEntity(id) {
	let apiBase = WIKIDATA_API;
	let url = apiBase + "?origin=*";

	const params = {
		action: "wbgetentities",
		props: "claims|descriptions|labels|sitelinks",
		format: "json",
		languages: LANG,
		sitefilter: LANG + "wiki",
		ids: id,
		languagefallback: LANG,
		smaxage: MAX_CACHE_AGE,
		maxage: MAX_CACHE_AGE,
	};

	Object.keys(params).forEach((key) => {
		url += "&" + key + "=" + params[key];
	});
	console.log(url);

	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((entries) => {
			const id = entries.id;
			const objectToModify = Object.entries(entries.entities)[0][1];
			console.log(objectToModify);
			// Object.entries(entries.entities)[0][1].ertID = entity.ertID;
			// console.log(objectToModify);
		});
}
