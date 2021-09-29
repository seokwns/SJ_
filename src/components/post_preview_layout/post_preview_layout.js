import * as React from 'react'
import * as styles from './post_preview_layout.module.css'
import { Link } from 'gatsby'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import Tag from '../Tag/Tag'


const PostPreviewLayout = ({ PostData }) => {

    const ThumbnailImage = (PostData.frontmatter.thumbnail != null? getImage(PostData.frontmatter.thumbnail.childImageSharp.gatsbyImageData) : false);

    const displayTag = PostData.frontmatter.tag.split("#").map((node) => {
        if(node != "") return node;
    });

    const PostInfoStyle = (ThumbnailImage == false? 
        {
            borderRadius: '10px',
        } : 
        {
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
        }
    );

    
    return (
        <article className={styles.container}>
            {ThumbnailImage && (<GatsbyImage image={ThumbnailImage} alt="thumbnail image" className={styles.ThumbnailImage} onClick={() => window.location.href=`/posts/${PostData.slug}`} defer/>)}
            <div className={styles.PostInfo} style={PostInfoStyle}>
                <div onClick={() => window.location.href=`/posts/${PostData.slug}`} style={{cursor: 'pointer'}}>
                    <Link to={`/posts/${PostData.slug}`}><p className={styles.postTitle} style={{color: '#212121'}}>{PostData.frontmatter.title}</p></Link>
                    <p className={styles.postContent}>{PostData.excerpt}</p>
                </div>
                <div className={styles.bottomItem}>
                    <div style={{display: 'flex', marginTop: '40px'}}>
                        {
                            PostData.frontmatter.tag != null && displayTag.map((node, index) => {
                                if(index != 0) {
                                    return (
                                        <Tag TagData={node} key={node}/>
                                    )
                                }
                            })
                        }
                    </div>
                    <div style={{display: 'flex'}}>
                        <p style={{color: '#616161'}}>{PostData.frontmatter.date}</p>
                    </div>
                </div>
            </div>
        </article>
    )
}


export default PostPreviewLayout