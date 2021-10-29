import * as React from 'react'
import * as styles from './post_preview_layout.module.css'
import RippleButton from '../ripple_effect/RippleButton'
import { Link } from 'gatsby'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import Tag from '../Tag/Tag'


const RippleButtonStyle = {
    margin: '20px 0 0 0',
    width: '100px',
    backgroundColor: 'white',
    color: 'black',
    border: '2px solid black'
};


const PostPreviewLayout = ({ PostData, PostNodes }) => {

    const ThumbnailImage = (PostData.frontmatter.thumbnail != null? getImage(PostData.frontmatter.thumbnail.childImageSharp.gatsbyImageData) : false);

    const displayTag = PostData.frontmatter.tag.split("#").map((node) => {
        if(node != "") return node;
    });


    let date = new Date(PostData.frontmatter.date.replace(/년|월|일/g, '-'));
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    const days = ['SUN', 'MON', "TUE", 'WED', 'THUR', 'FRI', 'SAT'];

    
    return (
        <article className={styles.container}>
            {/* {
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
                    <div style={{textAlign: 'center', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#FCFCFC'}}>
                        <div height='0'></div>
                        <p style={{fontSize: '3rem', fontWeight: '800', margin: '0'}}>
                            {date.getDate()}
                        </p>
                        <p style={{margin: '0', fontSize: '0.8rem', minHeight: '25px'}}>
                            {days[date.getDay()]}
                        </p>
                    </div>
                )
            } */}
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', marginTop: '0', alignItems: 'center'}}>
                    <p style={{color: 'black', margin: '0 10px 0 0', fontSize: '0.9rem', fontWeight: '800'}}>
                        {date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()}
                    </p>
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

                <Link
                    to={`/posts/${PostData.slug}`}
                    state={PostNodes}
                >
                    <p style={{fontWeight: '800', color: '#0288D1'}}>Read</p>
                </Link>
            </div>
        </article>
    )
}


export default PostPreviewLayout