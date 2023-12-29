import styles from "./index.module.css"
import { styled, css } from "styled-components"
const Button = styled.button`
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #f9f9f9;
    cursor: pointer;
    transition: border-color 0.25s;

    &:hover {
        border-color: #646cff;
    }

    ${(props) => props.selected && css`
        border-color: #646cff;
    `}
`

export default function TodoFilter({ visible, setVisible }) {
    return (
        <div className="footer">
            <ul className={styles.filters}>
                {
                    ["all", "active", "completed"].map(v => (
                        <li className={styles.filtersLi} key={v}>
                            {/* <button
                                className={visible === v ? styles.selected : ""}
                                onClick={() => { setVisible(v) }}
                            >
                                {v}
                            </button> */}
                            <Button
                                selected={visible === v}
                                onClick={() => { setVisible(v) }}
                            >
                                {v}
                            </Button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}