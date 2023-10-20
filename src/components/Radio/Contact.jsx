import { useEffect, useRef, useState } from "react";
import { getWikidataEntityPromise } from "../../FetchFunctions";

import styles from "./Contact.module.css";
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
      {street != undefined ? " " + street : null}
      {number != null ? " " + number : null}
      {postcode != undefined ? " " + postcode : null}
    </>
  );
  return (
    <>
      <address className={styles.ContactContainer}>
        {props.website ? (
          <li>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 22Q9.95 22 8.125 21.212Q6.3 20.425 4.938 19.062Q3.575 17.7 2.788 15.875Q2 14.05 2 12Q2 9.925 2.788 8.113Q3.575 6.3 4.938 4.938Q6.3 3.575 8.125 2.787Q9.95 2 12 2Q14.075 2 15.887 2.787Q17.7 3.575 19.062 4.938Q20.425 6.3 21.212 8.113Q22 9.925 22 12Q22 14.05 21.212 15.875Q20.425 17.7 19.062 19.062Q17.7 20.425 15.887 21.212Q14.075 22 12 22ZM15.95 8H18.9Q18.175 6.75 17.087 5.825Q16 4.9 14.6 4.45Q15.05 5.275 15.388 6.162Q15.725 7.05 15.95 8ZM10.1 8H13.9Q13.6 6.9 13.125 5.925Q12.65 4.95 12 4.05Q11.35 4.95 10.875 5.925Q10.4 6.9 10.1 8ZM4.25 14H7.65Q7.575 13.5 7.537 13.012Q7.5 12.525 7.5 12Q7.5 11.475 7.537 10.988Q7.575 10.5 7.65 10H4.25Q4.125 10.5 4.062 10.988Q4 11.475 4 12Q4 12.525 4.062 13.012Q4.125 13.5 4.25 14ZM9.4 19.55Q8.95 18.725 8.613 17.837Q8.275 16.95 8.05 16H5.1Q5.825 17.25 6.912 18.175Q8 19.1 9.4 19.55ZM5.1 8H8.05Q8.275 7.05 8.613 6.162Q8.95 5.275 9.4 4.45Q8 4.9 6.912 5.825Q5.825 6.75 5.1 8ZM12 19.95Q12.65 19.05 13.125 18.075Q13.6 17.1 13.9 16H10.1Q10.4 17.1 10.875 18.075Q11.35 19.05 12 19.95ZM9.65 14H14.35Q14.425 13.5 14.463 13.012Q14.5 12.525 14.5 12Q14.5 11.475 14.463 10.988Q14.425 10.5 14.35 10H9.65Q9.575 10.5 9.538 10.988Q9.5 11.475 9.5 12Q9.5 12.525 9.538 13.012Q9.575 13.5 9.65 14ZM14.6 19.55Q16 19.1 17.087 18.175Q18.175 17.25 18.9 16H15.95Q15.725 16.95 15.388 17.837Q15.05 18.725 14.6 19.55ZM16.35 14H19.75Q19.875 13.5 19.938 13.012Q20 12.525 20 12Q20 11.475 19.938 10.988Q19.875 10.5 19.75 10H16.35Q16.425 10.5 16.462 10.988Q16.5 11.475 16.5 12Q16.5 12.525 16.462 13.012Q16.425 13.5 16.35 14Z" />
              </svg>
            </span>
            <a
              href={props.website}
              target="_blank"
              title={`${props.title} στο web`}
            >
              {props.website.replace(/^https?:\/\//, "")}
            </a>
          </li>
        ) : null}
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
              {props.email.replace("mailto:", "")}
            </a>
          </li>
        ) : null}
        {props.phone ? (
          <li className={styles.phonesList}>
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
            <ul>
              {props.phone.map((phone, ix) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone}`}
                    title={`${
                      props.phone.length > 1 ? `${ix + 1}ος` : ""
                    } τηλεφωνικός αριθμός "${props.title}" `}
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
                      : ""
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
          ""
        )}
      </address>
    </>
  );
}
