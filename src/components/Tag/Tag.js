import * as React from 'react'
import * as styles from "./Tag.module.css"


const Tag = ({ TagData }) => {
    return (
        <div className={styles.container}>
            <p className={styles.TagDiv} style={{color: 'white'}}>{TagData}</p>
        </div>
    )
}


export default Tag