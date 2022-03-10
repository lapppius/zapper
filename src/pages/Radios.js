import RadiosList from '../components/RadiosList';
import { useEffect, useState } from 'react';
import { getWikidataEntitiesPromise } from '../FetchFunctions';

export default function Radios() {
    const radiosSession = sessionStorage.getItem('radiosListSes');
    const [isLoading, setIsLoading] = useState(true);
    const [loadedRadios, setLoadedRadios] = useState([]);
    // const test1 = sessionStorage.getItem('test1');

    useEffect(() => {
        if (radiosSession === null) {
            setIsLoading(true);
            getWikidataEntitiesPromise().then((response) => {
                console.log(response)
                const radios = [];
                for (const obj of Object.entries(response.entities)) {
                    const radio = {
                        id: obj[1].id,
                        title: obj[1].sitelinks.elwiki.title,
                        streamUrl:
                            obj[1].claims.P963[0].mainsnak.datavalue.value,
                    };
                    radios.push(radio);
                }
                setIsLoading(false);
                setLoadedRadios(radios);
                sessionStorage.setItem('radiosListSes', JSON.stringify(radios));
            });
        } else {
            setIsLoading(false);
            setLoadedRadios(JSON.parse(radiosSession));
        }
        // if (test1 == null) {
        //     console.log('null');
        // } else {
        //     console.log(test1);
        // }
    }, []);

    return <>{isLoading ? undefined : <RadiosList radios={loadedRadios} />}</>;
}
