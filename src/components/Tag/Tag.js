import * as React from 'react'
import { Link } from 'gatsby';
import * as styles from './Tag.module.css'


const ContainerStyle = {
    borderRadius: '20px',
    // backgroundColor: 'rgb(241, 243, 245)',
    margin: '0 10px 0 0',
    cursor: 'pointer',
    padding: '0 8px 0 0'
};


const TagStyle = {
    // padding: '4px 15px',
    margin: '0',
    color: '#999999',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    fontWeight: '400',
};


const ObjectCopy = (a, b) => {
    const temp = Object.assign({}, a);
    return Object.assign(temp, b);
};


const Tag = ({ TagData, backgroundStyle, textStyle }) => {
    const thisBackStyle = (backgroundStyle == null? ContainerStyle : ObjectCopy(ContainerStyle, backgroundStyle));
    const thisTextStyle = (textStyle == null? TagStyle : ObjectCopy(TagStyle, textStyle));

    return (
        <div className={styles.ContainerStyle} id='tag-back' style={thisBackStyle}>
            <Link to={"/posts?tag=" + TagData}><p className={styles.TagText} style={thisTextStyle}>{TagData}</p></Link>
        </div>
    )
}


export default Tag