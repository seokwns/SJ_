import * as React from 'react'
import * as styles from './{mdx.slug}.module.css'
import Layout from '../../components/main_layouts/main_layout'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Tag from '../../components/Tag/Tag'



const ViewPostPage = ({ data, location }) => {

    const displayTag = data.mdx.frontmatter.tag.split("#").map((node) => {
        if(node != "") return node;
    });


    const { state = {} } = location
    const { posts } = state
    const { current } = state

    const PreviousPostData = (typeof posts !== 'undefiend' && typeof current !== 'undefined')? (posts[current + 1] == null? 'none' : posts[current + 1]) : 'none';
    const NextPostData = (typeof posts !== 'undefiend' && typeof current !== 'undefined')? (posts[current - 1] == null? 'none' : posts[current - 1]) : 'none';

    
    return (
        <Layout pageTitle={data.mdx.frontmatter.title} pageCat="Posts">
            <div className={styles.container}>
                <p className={styles.title}>{ data.mdx.frontmatter.title }</p>
                <div className={styles.bottomDiv}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        {
                            displayTag != null && displayTag.map((node, index) => {
                                if(index != 0) {
                                    return (
                                        <Tag TagData={node} key={node}/>
                                    )
                                }
                            })
                        }
                    </div>
                    <p className={styles.date} style={{color: '#616161'}}>{ data.mdx.frontmatter.date }</p>
                </div>
                <MDXRenderer className={styles.content}>
                    { data.mdx.body }
                </MDXRenderer>
                <div className={styles.bottomMenu}>
                    {
                        PreviousPostData != "none" && (
                            <Link to={`/posts/${PreviousPostData.slug}`} state={{posts: posts, current: current + 1}} className={styles.BottomPostItem} style={{margin: 'auto 0 20px 0'}}>
                                <span className="material-icons" style={{margin: 'auto 20px auto 10px'}}>arrow_back</span>
                                <div>
                                    <p style={{width: '100%'}}>이전 포스트</p>
                                    <p style={{fontWeight: '500', fontSize: '1.1rem', marginTop: '5px'}}>{PreviousPostData.frontmatter.title}</p>
                                </div>
                            </Link>
                        )
                    }
                    {
                        NextPostData != "none" && (
                            <Link to={`/posts/${NextPostData.slug}`} state={{posts: posts, current: current - 1}} className={styles.BottomPostItem} style={{textAlign: 'right', justifyContent: 'right', margin: '0'}}>
                                <div>
                                    <p style={{width: '100%'}}>다음 포스트</p>
                                    <p style={{fontWeight: '500', fontSize: '1.1rem', marginTop: '5px'}}>{NextPostData.frontmatter.title}</p>
                                </div>
                                <span className="material-icons" style={{margin: 'auto 10px auto 20px'}}>arrow_forward</span>
                            </Link>
                        )
                    }
                </div>
            </div>
        </Layout>
    )
}


export const query = graphql`
    query ($id: String) {
        mdx(id: {eq: $id}) {
            frontmatter {
                title
                date(formatString: "YYYY년 M월 D일")
                tag
                thumbnail {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
            body
        }
    }
`


export default ViewPostPage