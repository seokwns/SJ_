import * as React from 'react'
import * as styles from './post_preview_layout.module.css'
import { Link } from 'gatsby'
import Tag from '../Tag/Tag'


// const gridStyle = {
//     display: 'grid',
//     gridTemplateColumns: '1fr 0.5fr',
//     gridColumnGap: '20px',
//     // gridAutoRows: '180px'
// };

const flexStyle = {
    display: 'flex',
    flexDirection: 'column',
};


const PostPreviewLayout = ({ PostData, PostNodes }) => {

    // const ThumbnailImage = (PostData.frontmatter.thumbnail != null? getImage(PostData.frontmatter.thumbnail.childImageSharp.gatsbyImageData) : false);

    const displayTag = PostData.frontmatter.tag.split("#").map((node) => {
        if(node != "") return node;
    });

    // const containerStyle = (ThumbnailImage == false? flexStyle : gridStyle);
    const containerStyle = flexStyle;


    let date = new Date(PostData.frontmatter.date);
    // const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    // const days = ['SUN', 'MON', "TUE", 'WED', 'THUR', 'FRI', 'SAT'];

    
    return (
        <div className={styles.container} style={containerStyle}>
            <Link to={`/posts/${PostData.slug}`} state={PostNodes} className={styles.PostInfo}>
                <div>
                    <div style={{display: 'flex', margin: '0 0 16px 0', alignItems: 'center'}}>
                        {
                            PostData.frontmatter.tag != null && displayTag.map((node, index) => {
                                if(index != 0) {
                                    return (
                                        <Tag TagData={node} key={node} backgroundStyle={{marginRight: '0'}} textStyle={{fontWeight: '800', fontSize: '14px'}} />
                                    )
                                }
                            })
                        }
                    </div>

                    <div className={styles.postTitle} style={{color: '#212121'}}>
                        {PostData.frontmatter.title}
                    </div>

                    <div className={styles.postContent}>
                        {PostData.excerpt}
                    </div>
                </div>

                <div style={{color: 'black', margin: '24px 0 0 0', fontSize: '14px', color: '#757575'}}>
                    {date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + date.getDate() + '일'}
                </div>
            </Link>

            {/* {
                ThumbnailImage && (
                    <Link to={`/posts/${PostData.slug}`} state={PostNodes}>
                        <GatsbyImage
                            image={ThumbnailImage}
                            alt="thumbnail image"
                            className={styles.ThumbnailImage}
                            imgStyle={{margin: '0'}}
                            style={{overflow: 'hidden'}}
                            defer
                        />
                    </Link>
                )
            } */}

        </div>
    )
}


export default PostPreviewLayout