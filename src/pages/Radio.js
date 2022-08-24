import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import RadioComments from '../components/Radio/RadioComments';
import RadioEpg from '../components/Radio/RadioEPG';
import RadioSide from '../components/Radio/RadioSide';
import RadioHeader from '../components/Radio/RadioHeader';
import styles from './Radio.module.css';
import { useState } from 'react';
import { getWikidataEntityPromise, shortToId } from '../FetchFunctions';
import RadioArticles from '../components/Radio/RadioArticles';

function getRadioInfoPromise(res) {
    return new Promise((resolve, reject) => {
        // twitter: P2002, facebook: P2013, instagram: P2003, email: P968, website: P856, headquarters location: P159, streamUrl: P963, phone: P1329, frequencies: P2144
        const claims = [
            'P2002',
            'P2003',
            'P2013',
            'P968',
            'P856',
            'P159',
            'P963',
            'P1329',
            'P2144',
        ];

        const radio = {};
        for (const claim of claims) {
            try {
                const expression =
                    res.claims[claim][0].mainsnak.datavalue.value;
                switch (claim) {
                    case 'P2002':
                        radio.twitter = expression;
                        break;
                    case 'P2003':
                        radio.instagram = expression;
                        break;
                    case 'P2013':
                        radio.facebook = expression;
                        break;
                    case 'P963':
                        radio.streamUrl = expression;
                        break;
                    case 'P968':
                        radio.email = expression;
                        break;
                    case 'P856':
                        radio.website = expression.replace(/\/+$/, '');
                        break;
                    case 'P159':
                        let city = undefined;
                        let street = undefined;
                        let postcode = undefined;
                        let number = undefined;
                        let lat = undefined;
                        let lon = undefined;

                        try {
                            postcode =
                                res.claims[claim][0].qualifiers.P281[0]
                                    .datavalue.value;
                        } catch {}
                        try {
                            number =
                                res.claims[claim][0].qualifiers.P670[0]
                                    .datavalue.value;
                        } catch {}

                        try {
                            lat =
                                res.claims[claim][0].qualifiers.P625[0]
                                    .datavalue.value.latitude;
                        } catch {}

                        try {
                            lon =
                                res.claims[claim][0].qualifiers.P625[0]
                                    .datavalue.value.longitude;
                        } catch {}

                        try {
                            for (const str of res.claims[claim][0].qualifiers
                                .P6375) {
                                if (str.datavalue.value.language === 'el') {
                                    street = str.datavalue.value.text;
                                }
                            }
                        } catch {}

                        try {
                            city =
                                res.claims[claim][0].mainsnak.datavalue.value
                                    .id;
                        } catch {}

                        const location = {
                            city: city,
                            street: street,
                            number: number,
                            postcode: postcode,
                            lat: lat,
                            lon: lon,
                        };
                        radio.location = location;
                        break;
                    //phones
                    case 'P1329':
                        const phones = [];
                        for (const phone of res.claims[claim]) {
                            phones.push(phone.mainsnak.datavalue.value);
                        }
                        // res.claims[claim][0].mainsnak.datavalue.value;

                        radio.phone = phones;
                        break;
                    //frequencies
                    case 'P2144':
                        const fm = [];
                        const mw = [];
                        const sw = [];
                        for (const freq of res.claims[claim]) {
                            const frequency =
                                freq.mainsnak.datavalue.value.amount.replace(
                                    '+',
                                    ''
                                );
                            const unit =
                                freq.mainsnak.datavalue.value.unit.replace(
                                    'http://www.wikidata.org/entity/',
                                    ''
                                );
                            // MHz Q732707
                            if (
                                frequency >= 87.5 &&
                                frequency <= 108 &&
                                unit === 'Q732707'
                            ) {
                                fm.push(frequency);
                            } else if (
                                frequency >= 531 &&
                                frequency <= 1602 &&
                                unit === 'Q2143992'
                            ) {
                                mw.push(frequency);
                            } else if (unit === 'Q2143992') {
                                sw.push(frequency);
                            }
                        }
                        const frequencies = {
                            fm: fm,
                            mw: mw,
                            sw: sw,
                        };
                        radio.frequencies = frequencies;
                        break;
                    default:
                        break;
                }
            } catch (error) {}
        }
        try {
            radio.title = res.sitelinks.elwiki.title;
        } catch (error) {
            radio.title = res.labels.el.value;
        }
        radio.id = res.id;
        try {
            radio.description = res.descriptions.el.value;
        } catch (error) {}
        resolve(radio);
    });
}

export const Radio = () => {
    const { short } = useParams();
    const [loadedRadio, setLoadedRadio] = useState({});
    const radioRef = useRef(null);
    // const radiosListSes = JSON.parse(sessionStorage.getItem('radiosListSes'));

    useEffect(() => {
        // if (radiosListSes == null) {
        shortToId(short).then((id) => {
            getWikidataEntityPromise(id).then((res) => {
                getRadioInfoPromise(res).then((res) => {
                    setLoadedRadio(res);
                });
            });
        });
        // } else {
        // radiosListSes.forEach((element) => {
        //     if (element.id === id) {
        //         setLoadedRadio(element);
        //     }
        // });
        // }
    }, [short]);
    return (
        <div className={styles.radioContent} ref={radioRef}>
            <RadioHeader {...loadedRadio} />
            <RadioSide {...loadedRadio} />
            {/* <RadioEpg /> */}
            {/* <RadioComments /> */}
            {/* <RadioArticles/> */}
        </div>
    );
};
