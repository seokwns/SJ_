import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/main_layouts/main_layout'
import PostPreviewLayout from '../../components/post_preview_layout/post_preview_layout'
import * as styles from './index.module.css'

const PostsPage = ({ data }) => {
    return (
        <Layout pageTitle="Posts">
            <div className={styles.container}>
                <ul style={{listStyle: 'none', margin: '0', padding: '0'}}>
                {
                    data.allMdx.nodes.map(node => (
                        <li key={node.id}><PostPreviewLayout PostData={node}></PostPreviewLayout></li>
                    ))
                }
                </ul>
            </div>
        </Layout>
    )
}


export const query = graphql`
    query {
        allMdx(sort: {order: DESC, fields: frontmatter___date}) {
            nodes {
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
                id
                slug
                excerpt(pruneLength: 1000)
            }
        }
    }
    
`


export default PostsPage