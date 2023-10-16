const WIKIDATA_API = 'https://www.wikidata.org/w/api.php';
const LANG = 'el';
const MAX_CACHE_AGE = 86400;
const idsTest = JSON.parse(sessionStorage.getItem('idsTest'));

// Get the wikidata IDs for every radio station in an array of object
export function getRadiosIDPromise(source) {
    return new Promise((resolve, reject) => {
        fetch(source)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let IDs = '';
                for (let i = 0; i < data.length; i++) {
                    IDs += data[i].wikiID;
                    if (i + 1 !== data.length) {
                        IDs += '|';
                    }
                }
                resolve(IDs);
            });
    });
}

export function getWikidataEntitiesPromise() {
    return new Promise((resolve, reject) => {
        getRadiosIDPromise('wikisource.json').then((data) => {
            let apiBase = WIKIDATA_API;
            const params = {
                action: 'wbgetentities',
                props: 'claims|descriptions|labels|sitelinks',
                format: 'json',
                languages: LANG,
                sitefilter: LANG + 'wiki',
                ids: data,
                languagefallback: LANG,
                smaxage: MAX_CACHE_AGE,
                maxage: MAX_CACHE_AGE,
            };

            apiBase = apiBase + '?origin=*';
            Object.keys(params).forEach((key) => {
                apiBase += '&' + key + '=' + params[key];
            });
            fetch(apiBase)
                .then((response) => {
                    return response.json();
                })
                .then((entries) => {
                    resolve(entries);
                });
        });
    });
}

export function getWikidataEntityPromise(entityID) {
    return new Promise((resolve, reject) => {
        let apiBase = WIKIDATA_API;
        const params = {
            action: 'wbgetentities',
            props: 'claims|descriptions|labels|sitelinks',
            format: 'json',
            languages: LANG,
            sitefilter: LANG + 'wiki',
            ids: entityID,
            languagefallback: LANG,
            smaxage: MAX_CACHE_AGE,
            maxage: MAX_CACHE_AGE,
        };

        apiBase = apiBase + '?origin=*';
        Object.keys(params).forEach((key) => {
            apiBase += '&' + key + '=' + params[key];
        });
        fetch(apiBase)
            .then((response) => {
                return response.json();
            })
            .then((entries) => {
                resolve(Object.entries(entries.entities)[0][1]);
            });
    });
}

export function fetchWikiSummary(title) {
    return new Promise((resolve, reject) => {
        if (title) {
            fetch(
                `https://el.wikipedia.org/api/rest_v1/page/summary/${encodeURI(
                    title
                )}`
            )
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    resolve(res);
                });
        }
    });
}

export function shortToId(short) {
    return new Promise((resolve, reject) => {
        fetch('wikisource.json', { cache: 'no-store' })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                for (const item of res) {
                    if (item.name === short.replaceAll('_', ' ')) {
                        resolve(item.wikiID);
                    }
                }
            });
    });
}

export function idToShort(id) {
    return new Promise((resolve, reject) => {
        fetch('wikisource.json', { cache: 'no-store' })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                for (const item of res) {
                    if (item.wikiID === id) {
                        resolve(encodeURI(item.name.replaceAll(' ', '_')));
                    }
                }
            });
    });
}
