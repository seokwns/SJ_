import * as React from 'react'
import * as styles from './post_preview_layout.module.css'
import { Link } from 'gatsby'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import Tag from '../Tag/Tag'


const PostPreviewLayout = ({ PostData, PostNodes }) => {

    const ThumbnailImage = (PostData.frontmatter.thumbnail != null? getImage(PostData.frontmatter.thumbnail.childImageSharp.gatsbyImageData) : false);

    const displayTag = PostData.frontmatter.tag.split("#").map((node) => {
        if(node != "") return node;
    });

    
    return (
        <article className={styles.container}>
            <Link
                to={`/posts/${PostData.slug}`}
                state={PostNodes}
            >
                {
                    ThumbnailImage && (
                        <GatsbyImage
                            image={ThumbnailImage}
                            alt="thumbnail image"
                            className={styles.ThumbnailImage}
                            defer
                        />
                    )
                }
                <div style={{cursor: 'pointer'}}>
                    <p className={styles.postTitle} style={{color: '#212121'}}>
                        {PostData.frontmatter.title}
                    </p>
                    <p className={styles.postContent}>
                        {PostData.excerpt}
                    </p>
                </div>
            </Link>
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
                <p style={{color: '#757575'}}>
                    {PostData.frontmatter.date}
                </p>
            </div>
        </article>
    )
}


export default PostPreviewLayout