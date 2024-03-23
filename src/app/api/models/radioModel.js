export default class Radio {
	constructor(id, slug, radioName, streamURL, logoURL, parent, genres) {
		this.id = id;
		this.slug = slug || null;
		this.radioName = radioName || null;
		this.streamURL = streamURL || null;
		this.logoURL = logoURL || null;
		this.parent = parent || null;
		this.genres = genres || null;
	}
}
