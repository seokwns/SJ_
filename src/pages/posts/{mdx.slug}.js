import * as React from 'react'
import * as styles from './{mdx.slug}.module.css'
import Layout from '../../components/main_layouts/main_layout'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Tag from '../../components/Tag/Tag'
import { Disqus } from 'gatsby-plugin-disqus'


const ViewPostPage = ({ data, location }) => {

    const displayTag = data.mdx.frontmatter.tag.split("#").map((node) => {
        if(node != "") return node;
    });


    const { state = {} } = location
    const { posts } = state
    const { current } = state

    const PreviousPostData = (typeof posts !== 'undefiend' && typeof current !== 'undefined')? (posts[current + 1] == null? 'none' : posts[current + 1]) : 'none';
    const NextPostData = (typeof posts !== 'undefiend' && typeof current !== 'undefined')? (posts[current - 1] == null? 'none' : posts[current - 1]) : 'none';


    const disqusConfig = {
        url: data.site.siteMetadata.siteUrl + location.pathname,
        identifier: data.mdx.id,
        title: data.mdx.frontmatter.title
    };


    const BottomPostTitleStyle = {
        fontWeight: '500',
        fontSize: '1.1rem',
        marginTop: '5px'
    };


    const date = new Date(data.mdx.frontmatter.date);
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];


    return (
        <Layout pageTitle={data.mdx.frontmatter.title}>
            <div className={styles.container}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    {
                        displayTag != null && displayTag.map((node, index) => {
                            if(index != 0) {
                                return (
                                    <Tag TagData={node} key={node} textStyle={{fontSize: '1rem'}}/>
                                )
                            }
                        })
                    }
                </div>
                <p className={styles.title}>{ data.mdx.frontmatter.title }</p>
                <div className={styles.bottomDiv}>
                    <p className={styles.date} style={{color: '#616161'}}>{date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + date.getDate() + '일 ' +  days[date.getDay()]}</p>
                </div>
                <MDXRenderer className={styles.content}>
                    { data.mdx.body }
                </MDXRenderer>
                <div className={styles.bottomMenu}>
                    {
                        PreviousPostData != "none" && (
                            <Link to={`/posts/${PreviousPostData.slug}`} state={{posts: posts, current: current + 1}} className={styles.BottomPostItem}>
                                <span className="material-icons" style={{margin: 'auto 20px auto 10px'}}>arrow_back</span>
                                <div>
                                    <p style={{width: '100%'}}>이전 포스트</p>
                                    <p style={BottomPostTitleStyle}>{PreviousPostData.frontmatter.title}</p>
                                </div>
                            </Link>
                        )
                    }
                    {
                        NextPostData != "none" && (
                            <Link to={`/posts/${NextPostData.slug}`} state={{posts: posts, current: current - 1}} className={styles.BottomPostItem} style={{display: 'flex', textAlign: 'right', justifyContent: 'right'}}>
                                <div style={{margin: '0 0 0 auto'}}>
                                    <p style={{width: '100%'}}>다음 포스트</p>
                                    <p style={BottomPostTitleStyle}>{NextPostData.frontmatter.title}</p>
                                </div>
                                <span className="material-icons" style={{margin: 'auto 10px auto 20px'}}>arrow_forward</span>
                            </Link>
                        )
                    }
                </div>
                <Disqus config={disqusConfig} />
            </div>
        </Layout>
    )
}


export const query = graphql`
    query ($id: String) {
        mdx(id: {eq: $id}) {
            frontmatter {
                title
                date
                tag
                thumbnail {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
            body
            slug
            id
        }
        site {
            siteMetadata {
                siteUrl
            }
        }
    }
`


export default ViewPostPage