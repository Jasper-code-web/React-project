// import styles from "./index.css"
import './index.css'

export default function TodoFilter({ visible, setVisible }) {
    return(
        <div className="footer">
            <ul className="filters">
                {
                    ["all", "active", "completed"].map(v => (
                        <li className="filtersLi" key={v}>
                            <button
                                className={visible === v ? "selected" : ""}
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