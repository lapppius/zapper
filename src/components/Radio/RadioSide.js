import { useEffect, useState } from 'react';
import Contact from './Contact';
import Frequencies from './Frequencies';
import styles from './RadioSide.module.css';
import SocialMedia from './SocialMedia';

export default function RadioSide(props) {
    useEffect(() => {
        // if (Object.keys(props).length != 0) console.log(props);
    }, [props]);
    return (
        <aside className={styles.radioSideContainer}>
            <SocialMedia {...props} />
            <Contact {...props} />
            <Frequencies {...props} />
        </aside>
    );
}
