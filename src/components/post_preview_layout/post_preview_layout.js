import * as React from 'react'
import * as styles from './post_preview_layout.module.css'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'


const PostPreviewLayout = ({ PostData}) => {

    const ThumbnailImage = PostData.frontmatter.thumbnail != null? getImage(PostData.frontmatter.thumbnail.childImageSharp.gatsbyImageData) : false;
    const temp = PostData.frontmatter.category.split("-");
    temp.shift();
    const displayCategory = temp.join(" > ");
    
    return (
        <div className={styles.container}>
            <div className={styles.contentDiv}>
                {ThumbnailImage && (<GatsbyImage image={ThumbnailImage} alt="thumbnail image" className={styles.ThumbnailImage} defer/>)}
                <Link to={`/posts/${PostData.slug}?category:${PostData.frontmatter.category}`}><p className={styles.postTitle}>{PostData.frontmatter.title}</p></Link>
                <p className={styles.postContent}>{PostData.excerpt}</p>
                <div className={styles.bottomItem}>
                    {
                        PostData.frontmatter.category != null && (
                            <p style={{color: '#01579B', borderRight: '1px solid #E0E0E0', paddingRight: '10px'}}>{displayCategory}</p>
                        )
                    }
                    <p style={{color: '#9E9E9E', marginLeft: '10px'}}>{PostData.frontmatter.date}</p>
                </div>
            </div>
        </div>
    )
}


export default PostPreviewLayout