import * as React from 'react'
import { Link } from 'gatsby';
import * as styles from './Tag.module.css'


const ContainerStyle = {
    borderRadius: '20px',
    // backgroundColor: 'rgb(241, 243, 245)',
    marginRight: '10px',
    cursor: 'pointer',
    padding: '4px 8px 4px 0'
};


const TagStyle = {
    // padding: '4px 15px',
    margin: '0',
    color: '#0D47A1',
    fontSize: '0.8rem',
    whiteSpace: 'nowrap',
    fontWeight: '400'
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
            <Link to={"/posts?tag=" + TagData}><p className={styles.TagText} style={thisTextStyle}>{'#' + TagData}</p></Link>
        </div>
    )
}


export default Tag