import * as React from 'react'
import * as styles from './post_preview_layout.module.css'
import { Link } from 'gatsby'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import Tag from '../Tag/Tag'


const gridStyle = {
    display: 'grid',
    gridTemplateRows: 'auto auto',
    gridRowGap: '20px'
};


const PostPreviewLayout = ({ PostData, PostNodes }) => {

    const ThumbnailImage = (PostData.frontmatter.thumbnail != null? getImage(PostData.frontmatter.thumbnail.childImageSharp.gatsbyImageData) : false);

    const displayTag = PostData.frontmatter.tag.split("#").map((node) => {
        if(node != "") return node;
    });

    const containerStyle = (ThumbnailImage == false? {height: 'auto', paddingTop: '20px'} : gridStyle);


    let date = new Date(PostData.frontmatter.date);
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    const days = ['SUN', 'MON', "TUE", 'WED', 'THUR', 'FRI', 'SAT'];

    
    return (
        <article className={styles.container} style={containerStyle}>
            {
                ThumbnailImage && (
                    <Link to={`/posts/${PostData.slug}`} state={PostNodes} style={{maxHeight: '500px'}}>
                        <GatsbyImage
                            image={ThumbnailImage}
                            alt="thumbnail image"
                            className={styles.ThumbnailImage}
                            imgStyle={{margin: '0', maxHeight: '500px'}}
                            style={{overflow: 'hidden'}}
                            defer
                        />
                    </Link>
                )
            }

            <Link to={`/posts/${PostData.slug}`} state={PostNodes} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '180px', padding: '0 20px 20px 20px'}}>
                <div>
                    <div style={{display: 'flex', margin: '0 0 5px 0', alignItems: 'center'}}>
                        {
                            PostData.frontmatter.tag != null && displayTag.map((node, index) => {
                                if(index != 0) {
                                    return (
                                        <Tag TagData={node} key={node} backgroundStyle={{marginRight: '0'}} textStyle={{fontWeight: '300', fontSize: '14px'}} />
                                    )
                                }
                            })
                        }
                    </div>

                    <p className={styles.postTitle} style={{color: '#212121'}}>
                        {PostData.frontmatter.title}
                    </p>

                    <p className={styles.postContent}>
                        {PostData.excerpt}
                    </p>
                </div>

                <p style={{color: 'black', margin: '0 10px 0 0', fontSize: '14px', color: '#757575'}}>
                    {date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + date.getDate() + '일'}
                </p>
            </Link>
            
        </article>
    )
}


export default PostPreviewLayout