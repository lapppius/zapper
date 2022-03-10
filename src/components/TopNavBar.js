import { NavLink } from "react-router-dom";
import styles from './TopNavBar.module.css';

export default function TopNavBar() {
    return <>
    <header className={styles.header}>
        <nav>
            <ul>
                <li><NavLink to='/' className={(navData) => navData.isActive ? styles.active:undefined }>Ραδιόφωνα</NavLink></li>
                <li><NavLink to='/about' className={(navData) => navData.isActive ? styles.active:undefined }>Σχετικά</NavLink></li>
                <li><NavLink to='/epg' className={(navData) => navData.isActive ? styles.active:undefined }>Πρόγραμμα</NavLink></li>
            </ul>
        </nav>
    </header>
    </>;
}