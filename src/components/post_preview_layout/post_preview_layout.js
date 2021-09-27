import * as React from 'react'
import * as styles from './post_preview_layout.module.css'
import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'


const PostPreviewLayout = ({ PostData }) => {

    const ThumbnailImage = (PostData.frontmatter.thumbnail != null? true : false);

    const displayTag = PostData.frontmatter.tag.split("#").map((node, index) => {
        if(index == 0) return;
        else return ("#" + node + " ");
    });

    const PostInfoStyle = (ThumbnailImage == false? 
        {
            borderRadius: '10px',
            minHeight: '340px'
        } : 
        {
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
            maxHeight: '170px'
        }
    );


    const ExcerptStyle = (ThumbnailImage == false?
        {
            WebkitLineClamp: 5,
            color: '#616161'
        } :
        {
            WebkitLineClamp: 3,
            color: '#616161'
        }
    );
    
    return (
        <div className={styles.container}>
            {ThumbnailImage && (
                <BackgroundImage Tag={`section`} fluid={PostData.frontmatter.thumbnail.childImageSharp.fluid} defer>
                    <div className={styles.ThumbnailImage} onClick={() => window.location.href=`/posts/${PostData.slug}`}></div>
                </BackgroundImage>
            )}
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
                    <p style={{color: '#616161', marginLeft: '10px'}}>{PostData.frontmatter.date}</p>
                </div>
            </div>
        </div>
    )
}


export default PostPreviewLayout