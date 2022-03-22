import { useEffect, useRef, useState } from 'react';
import { getWikidataEntityPromise } from '../../FetchFunctions';

import styles from './Contact.module.css';
export default function Contact(props) {
    const [city, setCity] = useState(null);
    const [street, setStreet] = useState(null);
    const [number, setNumber] = useState(null);
    const [postcode, setPostcode] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const numRef = useRef(null);

    useEffect(() => {
        if (props.location != undefined) {
            getWikidataEntityPromise(props.location.city).then((res) => {
                setCity(res.labels.el.value);
                setStreet(props.location.street);
                setNumber(props.location.number);
                setPostcode(props.location.postcode);
                setLatitude(props.location.lat);
                setLongitude(props.location.lon);
            });
        }
    }, [props.location]);

    const loc = (
        <>
            {city != undefined ? city : null}
            {street != undefined ? ' ' + street : null}
            {number != null ? ' ' + number : null}
            {postcode != undefined ? ' ' + postcode : null}
        </>
    );
    return (
        <>
            <address className={styles.ContactContainer}>
                {props.email ? (
                    <li>
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24px"
                                height="24px"
                            >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                        </span>
                        <a
                            href={props.email}
                            target="_blank"
                            title={`Αποστολή email σε "${props.title}"`}
                        >
                            {props.email.replace('mailto:', '')}
                        </a>
                    </li>
                ) : null}
                {props.phone ? (
                    <li>
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24px"
                                height="24px"
                            >
                                <path d="M19.23 15.26l-2.54-.29c-.61-.07-1.21.14-1.64.57l-1.84 1.84c-2.83-1.44-5.15-3.75-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52c-.12-1.01-.97-1.77-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07.53 8.54 7.36 15.36 15.89 15.89 1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98z" />
                            </svg>
                        </span>
                        <ul className={styles.phonesList}>
                            {props.phone.map((phone, ix) => (
                                <li key={phone}>
                                    <a
                                        href={`tel:${phone}`}
                                        title={`${
                                            props.phone.length > 1
                                                ? `${ix + 1}ος`
                                                : ''
                                        } τηλεφωνικός αριθμός "${
                                            props.title
                                        }" `}
                                    >
                                        {phone}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </li>
                ) : null}
                {street || number || postcode || city ? (
                    <li>
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                enableBackground="new 0 0 24 24"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                            >
                                <path d="M12,2c-4.2,0-8,3.22-8,8.2c0,3.18,2.45,6.92,7.34,11.23c0.38,0.33,0.95,0.33,1.33,0C17.55,17.12,20,13.38,20,10.2 C20,5.22,16.2,2,12,2z M12,12c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2C14,11.1,13.1,12,12,12z" />
                            </svg>
                        </span>
                        <ul>
                            {latitude && longitude ? (
                                <a
                                    target="_blank"
                                    href={
                                        latitude && longitude
                                            ? `https://www.google.com/maps/search/${latitude},${longitude}`
                                            : ''
                                    }
                                >
                                    {loc}
                                </a>
                            ) : (
                                loc
                            )}
                        </ul>
                    </li>
                ) : (
                    ''
                )}
            </address>
        </>
    );
}
