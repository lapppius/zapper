import RadiosList from '../components/RadiosList';
import { useEffect, useState } from 'react';
import { getWikidataEntitiesPromise } from '../FetchFunctions';

export default function Radios() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedRadios, setLoadedRadios] = useState([]);

    useEffect(() => {
            setIsLoading(true);
            getWikidataEntitiesPromise().then((response) => {
                const radios = [];
                for (const obj of Object.entries(response.entities)) {
                    try {
                        const radio = {};
                        radio.id = obj[1].id;
                        try {
                            radio.title = obj[1].sitelinks.elwiki.title;
                        } catch (error) {
                            radio.title = obj[1].labels.el.value;
                        }

                        radio.streamUrl =
                            obj[1].claims.P963[0].mainsnak.datavalue.value;

                        radios.push(radio);
                    } catch (error) {}
                }
                setIsLoading(false);
                setLoadedRadios(radios);
            });
 
    }, []);

    return <>{isLoading ? undefined : <RadiosList radios={loadedRadios} />}</>;
}
