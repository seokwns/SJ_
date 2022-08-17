import * as React from 'react'
import * as styles from './post_preview_layout.module.css'
import { Link } from 'gatsby'
import Tag from '../Tag/Tag'


const flexStyle = {
    display: 'flex',
    flexDirection: 'column',
};


const PostPreviewLayout = ({ PostData, PostNodes }) => {

    const containerStyle = flexStyle;
    let date = new Date(PostData.frontmatter.date);

    
    return (
        <div className={styles.container} style={containerStyle}>
            <Link to={`/posts/${PostData.slug}`} state={PostNodes} className={styles.PostInfo}>
                <div>
                    <div style={{display: 'flex', margin: '0 0 16px 0', alignItems: 'center'}}>
                        {
                            PostData.frontmatter.tag.map((node, index) => {
                                return (
                                    <div key={index}><Tag TagData={node} backgroundStyle={{marginRight: '0'}} textStyle={{fontWeight: '800', fontSize: '16px'}} onClick={(event) => {}}/></div>
                                )
                            })
                        }
                    </div>

                    <div className={styles.postTitle} style={{color: '#212121'}}>
                        {PostData.frontmatter.title}
                    </div>

                    <div className={styles.postContent}>
                        {PostData.excerpt}
                    </div>
                </div>

                <div style={{color: 'black', margin: '24px 0 0 0', fontSize: '16px', color: '#757575'}}>
                    {date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + date.getDate() + '일'}
                </div>
            </Link>
        </div>
    )
}


export default PostPreviewLayout