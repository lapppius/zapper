import { useEffect, usePlayer } from "@/contexts/PlayerContext";

function setMediaSession(
	radioName = undefined,
	imgSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAMAAABlApw1AAAAAXNSR0IB2cksfwAAAAlwSFlzAAAOJgAADiYBou8l/AAAAYlQTFRFAAAATk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTbFUJwAAAIN0Uk5TAOn/9CEY1vvmyZBIEWj4/qcrIu7kiiACXPzlnxdP4l5qfgevkdyLQl3gJ0H5oAbL9yV4mRv649/VyrLThEBFPIZgZrsJH7iTCN7AWOvxCr+qqTgS/TPv0gOAqy8FDC6s2uHwugF/cD8UvBojvh1XdRCIVtelTilpS0Mq7Chit3EOdH1EpSKOAAACbUlEQVR4nO3Y91vTQByA8XggbR1EEIjV4sCBdYDWal2oCEoRcSAqIC7cuBdOXH+5UJKSS9Im0RJyz/N+fuTuvpf3KS081TQAAAAAAAAAAAAAAAAAAAAAAAAAwP9ZIfzU1ZtbVzZ4b0gkU6tWr7EPXdvoO3WOvq4WAQEuajK3Nq+v8jAtrW2LQ40N6SAFG2MUMCexKbM4tj3Ia5CMV4AQm7eUxxpbVQwQYltHefB2JQPSOwxrcGan7+6YvQdKErvKr0Gn7+YYvgJCNO62JhspJQNEdo81eu8+JQP0/dborm4lA8SBg9bsnM/OOL6J5x2yZucPV994ZAkCCkddjuVDBmStA9rx0oCkvFzXYA4+cXIJAnqqbHUGnGqb13z6jOMTX++Vz52Vl/v6a/HctQiwfrW0c+flhQHVArTioLRwQbkAbUi3LwyqF5C5aF8YVi/gUsG+oBvSuUgDLl+xuzoSMOCa9FE5Kl8RaYBDa8CA69KfrBvKBRh90sJN1QLGxqUPITGhSMCtyZLbd+7Kzy9yigRk75Xcd/7bPzUiXxHbgEoejCkeMOS4QrWA1EO1A4bbnVcsZ8Cj8AEDhvOKSAMe99g9eRo2QH827boi0oAw/8x56X7uPqdSwIuXHufUCRidyHidUyag8Mr1/lUpoOX1mwrnIg142+vyrugXkJ56/+HjZMUrIg3woM9UCPj0ecGXmXxXtSuWO6DiV4tNVQcTQAABBBBAAAEBOL6T8qB/NbfWf5MXvge8YlY+9qPD/0gIP8f95H6ZW4uz0s9/B32Q6T/SuU7ntxYAAAAAAAAAAAAAAAAAAAAAAAAAgH/1F9k7nWhOWsIVAAAAAElFTkSuQmCC",
	NowPlaying = undefined
) {
	if ("mediaSession" in navigator) {
		navigator.mediaSession.metadata = new MediaMetadata({
			title: radioName,
			artist: NowPlaying,
			album: radioName,
			artwork: [
				{
					src: imgSrc,
					sizes: "128x128 256x256 512x512 ",
					type: "image/png",
				},
			],
		});
	}
}

export default function MediaSession() {
	const playerContext = usePlayer();

	const { curName, nowPlaying, curImg } = playerContext.playerState;

	useEffect(() => {
		if (curName !== undefined && curImg !== null) {
			setMediaSession(curName, curImg, nowPlaying);
		}
	}, [curName, curImg, nowPlaying]);

	return;
}
