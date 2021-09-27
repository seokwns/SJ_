import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/main_layouts/main_layout'
import PostPreviewLayout from '../../components/post_preview_layout/post_preview_layout'
import * as styles from './index.module.css'

const PostsPage = ({ data }) => {
    const PostNodes = data.allMdx.nodes;
    let NodesData = [];
    for (let i = 0; i < PostNodes.length; i++) {
        let np = (i === 0? null : PostNodes[i-1]);
        let pp = (i === PostNodes.length - 1 ? null : PostNodes[i+1]);
        NodesData.push([PostNodes[i], pp, np]);
    }
    return (
        <Layout pageTitle="Posts" pageCat="Posts">
            <div className={styles.container}>
                <div className={styles.ViewPost}>
                {
                    NodesData.map(node => (
                        <PostPreviewLayout PostData={node[0]} key={node[0].id}/>
                    ))
                }
                </div>
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
                    date(formatString: "YYYY.M.D")
                    tag
                    thumbnail {
                        childImageSharp {
                            fluid {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
                id
                slug
                excerpt(pruneLength: 1000)
                fileAbsolutePath
            }
        }
    }
    
`


export default PostsPage