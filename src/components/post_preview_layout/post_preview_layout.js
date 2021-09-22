import * as React from 'react'
import * as styles from './post_preview_layout.module.css'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'


const PostPreviewLayout = ({ PostData }) => {

    const ThumbnailImage = PostData.frontmatter.thumbnail != null? getImage(PostData.frontmatter.thumbnail.childImageSharp.gatsbyImageData) : false;
    
    return (
        <div className={styles.container}>
            <div className={styles.contentDiv}>
                {PostData.frontmatter.category != null && (<p style={{color: '#01579B'}}>{PostData.frontmatter.category}</p>)}
                <a href="#"><p className={styles.postContent} style={{fontSize: '20px'}}>{PostData.frontmatter.title}</p></a>
                <p className={styles.postContent}>{PostData.excerpt}</p>
                <p style={{color: '#9E9E9E'}}>{PostData.frontmatter.date}</p>
            </div>
            {ThumbnailImage && (<GatsbyImage image={ThumbnailImage} alt="thumbnail image" className={styles.ThumbnailImage}/>)}
            
        </div>
    )
}


export default PostPreviewLayout