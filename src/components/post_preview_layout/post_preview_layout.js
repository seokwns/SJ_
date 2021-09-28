import * as React from 'react'
import * as styles from './post_preview_layout.module.css'
import { Link } from 'gatsby'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'


const PostPreviewLayout = ({ PostData }) => {

    const ThumbnailImage = (PostData.frontmatter.thumbnail != null? getImage(PostData.frontmatter.thumbnail.childImageSharp.gatsbyImageData) : false);

    const displayTag = PostData.frontmatter.tag.split("#").map((node, index) => {
        if(index == 0) return;
        else return ("#" + node + " ");
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


    const ExcerptStyle = (ThumbnailImage == false?
        {
            WebkitLineClamp: 5,
            color: '#616161',
        } :
        {
            WebkitLineClamp: 3,
            color: '#616161',
        }
    );
    
    return (
        <article className={styles.container}>
            {ThumbnailImage && (<GatsbyImage image={ThumbnailImage} alt="thumbnail image" className={styles.ThumbnailImage} onClick={() => window.location.href=`/posts/${PostData.slug}`} defer/>)}
            <div className={styles.PostInfo} style={PostInfoStyle}>
                <div onClick={() => window.location.href=`/posts/${PostData.slug}`} style={{cursor: 'pointer'}}>
                    <Link to={`/posts/${PostData.slug}`}><p className={styles.postTitle} style={{color: '#212121'}}>{PostData.frontmatter.title}</p></Link>
                    <p className={styles.postContent} style={ExcerptStyle}>{PostData.excerpt}</p>
                </div>
                <div className={styles.bottomItem}>
                    {
                        PostData.frontmatter.tag != null && (
                            <p style={{color: '#01579B', borderRight: '1px solid #E0E0E0', paddingRight: '10px'}}>{displayTag}</p>
                        )
                    }
                    <p style={{color: '#616161', margin: 'auto 0 auto 10px'}}>{PostData.frontmatter.date}</p>
                </div>
            </div>
        </article>
    )
}


export default PostPreviewLayout