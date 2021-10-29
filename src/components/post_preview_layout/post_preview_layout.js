import * as React from 'react'
import * as styles from './post_preview_layout.module.css'
import { Link } from 'gatsby'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import Tag from '../Tag/Tag'


const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '0.5fr 1fr',
    gridColumnGap: '15px',
    gridAutoRows: '180px'
};


const PostPreviewLayout = ({ PostData, PostNodes }) => {

    const ThumbnailImage = (PostData.frontmatter.thumbnail != null? getImage(PostData.frontmatter.thumbnail.childImageSharp.gatsbyImageData) : false);

    const displayTag = PostData.frontmatter.tag.split("#").map((node) => {
        if(node != "") return node;
    });

    const containerStyle = (ThumbnailImage == false? {} : gridStyle);


    let date = new Date(PostData.frontmatter.date);
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    const days = ['SUN', 'MON', "TUE", 'WED', 'THUR', 'FRI', 'SAT'];

    
    return (
        <article className={styles.container} style={containerStyle}>
            {
                ThumbnailImage && (
                    <Link to={`/posts/${PostData.slug}`} state={PostNodes}>
                        <GatsbyImage
                            image={ThumbnailImage}
                            alt="thumbnail image"
                            className={styles.ThumbnailImage}
                            imgStyle={{height: '180px', margin: '0'}}
                            defer
                        />
                    </Link>
                )
            }
            {/* {
                !ThumbnailImage && (
                    <Link to={`/posts/${PostData.slug}`} state={PostNodes} style={{textAlign: 'center', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#FBFBFB'}}>
                        <div height='0'></div>
                        <p style={{fontSize: '3rem', fontWeight: '800', margin: '0'}}>
                            {date.getDate()}
                        </p>
                        <p style={{margin: '0', fontSize: '0.8rem', minHeight: '25px'}}>
                            {days[date.getDay()]}
                        </p>
                    </Link>
                )
            } */}
            <Link to={`/posts/${PostData.slug}`} state={PostNodes} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div>
                    <div style={{display: 'flex', marginTop: '0', alignItems: 'center'}}>
                        {
                            PostData.frontmatter.tag != null && displayTag.map((node, index) => {
                                if(index != 0) {
                                    return (
                                        <Tag TagData={node} key={node} backgroundStyle={{marginRight: '0'}} textStyle={{fontWeight: '800'}} />
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

                <p style={{color: 'black', margin: '0 10px 0 0', fontSize: '0.9rem', color: '#757575'}}>
                        {date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()}
                    </p>
            </Link>
        </article>
    )
}


export default PostPreviewLayout