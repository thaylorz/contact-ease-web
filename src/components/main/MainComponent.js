import PersonListView from "../person/personlistview/PersonListView";

import styles from "./MainComponentStyle.scss"

export default function MainComponent() {
    return (
        <main className={styles.main}>
            <PersonListView />
        </main>
    )
}