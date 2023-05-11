import logoSvg from "../../assets/images/logo.png";
import styles from "../../assets/styles/components/HeaderComponent.module.scss";
import UserAvatar from "../useravatar/UserAvatar";

export default function HeaderComponent() {
    return (
        <header className={styles.header}>
            <div>
                <img src={logoSvg} alt='Logo Contact Ease'></img>
                <div><UserAvatar /></div>
            </div>
        </header>
    )
}