import * as React from 'react'
import * as styles from './{mdx.slug}.module.css'
import Layout from '../../components/main_layouts/main_layout'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Tag from '../../components/Tag/Tag'



const ViewPostPage = ({ data }) => {

    const displayTag = data.mdx.frontmatter.tag.split("#").map((node) => {
        if(node != "") return node;
    });
    
    
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