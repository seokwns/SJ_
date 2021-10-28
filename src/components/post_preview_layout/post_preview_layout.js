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

    let sp = PostData.frontmatter.date.split(' ')
    let date = new Date(sp[0].split('년')[0], sp[1].split('월')[0], sp[2].split('일')[0]);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC']
    const days = ['SUN', 'MON', "TUE", 'WED', 'THUR', 'FRI', 'SAT'] ;

    
    return (
        <article className={styles.container}>
            {
                ThumbnailImage && (
                    <GatsbyImage
                        image={ThumbnailImage}
                        alt="thumbnail image"
                        className={styles.ThumbnailImage}
                        imgStyle={{height: '150px', margin: 'auto 0'}}
                        defer
                    />
                )
            }
            {
                !ThumbnailImage && (
                    <div style={{textAlign: 'center', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        {/* <p style={{margin: '0', fontSize: '0.8rem'}}>
                            {months[date.getMonth()]}
                        </p> */}
                        <div height='0'></div>
                        <p style={{fontSize: '3rem', fontWeight: '800', margin: '0'}}>
                            {date.getDate()}
                        </p>
                        <p style={{margin: '0', fontSize: '0.8rem'}}>
                            {days[date.getDay()]}
                        </p>
                    </div>
                )
            }
            <Link
                to={`/posts/${PostData.slug}`}
                state={PostNodes}
                style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}
            >

                <div>
                    <div style={{display: 'flex', marginTop: '0'}}>
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
                    <div style={{cursor: 'pointer'}}>
                        <p className={styles.postTitle} style={{color: '#212121'}}>
                            {PostData.frontmatter.title}
                        </p>
                        <p className={styles.postContent}>
                            {PostData.excerpt}
                        </p>
                    </div>
                </div>
                <div className={styles.bottomItem}>
                    <p style={{color: '#757575', margin: '10px 0'}}>
                        {PostData.frontmatter.date}
                    </p>
                </div>
            </Link>
        </article>
    )
}


export default PostPreviewLayout