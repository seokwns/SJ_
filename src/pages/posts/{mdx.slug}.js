import * as React from 'react'
import * as styles from './{mdx.slug}.module.css'
import Layout from '../../components/main_layouts/main_layout'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'



const ViewPostPage = ({ data }) => {
    return (
        <Layout pageTitle={data.mdx.frontmatter.title}>
            <div className={styles.container}>
                <p style={{fontSize: '15px', marginBottom: '20px', color: '#01579B'}}>{ data.mdx.frontmatter.category }</p>
                <p style={{fontSize: '30px', margin: '20px 0', textAlign: 'left'}}>{ data.mdx.frontmatter.title }</p>
                <p style={{fontSize: '15px', color: '#9E9E9E', margin: '20px 0 60px 0', paddingBottom: '20px', borderBottom: '1px solid #E0E0E0'}}>{ data.mdx.frontmatter.date }</p>
                <MDXRenderer>
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
                date(formatString: "MMMM D, YYYY")
                category
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