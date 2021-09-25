import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/main_layouts/main_layout'
import PostPreviewLayout from '../../components/post_preview_layout/post_preview_layout'
import * as styles from './index.module.css'

const PostsPage = ({ data }) => {
    const PostNodes = data.allMdx.nodes;
    let NodesData = [];
    for (let i = 0; i < PostNodes.length; i++) {
        let np = (i == 0? null : PostNodes[i-1]);
        let pp = (i == PostNodes.length - 1 ? null : PostNodes[i+1]);
        NodesData.push([PostNodes[i], pp, np]);
    }
    return (
        <Layout pageTitle="Posts">
            <div className={styles.container}>
                <ul style={{listStyle: 'none', margin: '0', padding: '0'}}>
                {
                    NodesData.map(node => (
                        <li key={node[0].id}><PostPreviewLayout PostData={node[0]}></PostPreviewLayout></li>
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