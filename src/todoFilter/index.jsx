import styles from "./index.module.css"
// import './index.css'
console.log('styles',styles)

export default function TodoFilter({ visible, setVisible }) {
    return(
        <div className="footer">
            <ul className={styles.filters}>
                {
                    ["all", "active", "completed"].map(v => (
                        <li className={styles.filtersLi} key={v}>
                            <button
                                className={visible === v ? styles.selected : ""}
                                onClick={() => { setVisible(v) }}
                            >
                                {v}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}