import * as React from 'react'
import * as styles from './post_preview_layout.module.css'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'


const PostPreviewLayout = ({ PostData }) => {

    const ThumbnailImage = PostData.frontmatter.thumbnail != null? getImage(PostData.frontmatter.thumbnail.childImageSharp.gatsbyImageData) : false;
    
    return (
        <div className={styles.container}>
            <div className={styles.contentDiv}>
                <Link to={`/posts/${PostData.slug}`}><p className={styles.postContent} style={{fontSize: '20px'}}>{PostData.frontmatter.title}</p></Link>
                <p className={styles.postContent}>{PostData.excerpt}</p>
                <div style={{display: 'flex'}}>
                    {
                        PostData.frontmatter.category != null && (
                            <p style={{color: '#01579B', borderRight: '1px solid #E0E0E0', paddingRight: '10px'}}>{PostData.frontmatter.category}</p>
                        )
                    }
                    <p style={{color: '#9E9E9E', marginLeft: '10px'}}>{PostData.frontmatter.date}</p>
                </div>
            </div>
            {ThumbnailImage && (<GatsbyImage image={ThumbnailImage} alt="thumbnail image" className={styles.ThumbnailImage} defer/>)}
        </div>
    )
}


export default PostPreviewLayout