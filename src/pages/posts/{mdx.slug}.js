import * as React from 'react'
import * as styles from './{mdx.slug}.module.css'
import Layout from '../../components/main_layouts/main_layout'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'



const ViewPostPage = ({ data }) => {

    const displayTag = data.mdx.frontmatter.tag.split("#").map((node, index) => {
        if(index == 0) return;
        else return ("#" + node + " ");
    });

    return (
        <Layout pageTitle={data.mdx.frontmatter.title} pageCat="Posts">
            <script type="text/javascript">
                const temp = location.href.split("?");
                const data = temp.split(":");
                const key = data[0];
                const vale = data[1];
            </script>
            <div className={styles.container}>
                <p className={styles.title}>{ data.mdx.frontmatter.title }</p>
                <div className={styles.bottomDiv}>
                    <p className={styles.category} style={{color: '#01579B'}}>{ displayTag }</p>
                    <p className={styles.date}>{ data.mdx.frontmatter.date }</p>
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
                date(formatString: "MMMM D, YYYY")
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