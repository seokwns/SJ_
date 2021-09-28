import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/main_layouts/main_layout'
import PostPreviewLayout from '../../components/post_preview_layout/post_preview_layout'
import * as styles from './index.module.css'
import Tag from '../../components/Tag/Tag'


const PostsPage = ({ data }) => {
    const AllTags = [];
    const _nodes = data.allMdx.nodes;

    _nodes.map((value) => {
        const tag_split = value.frontmatter.tag.split("#");
        tag_split.map(_tag => {
            if(AllTags.indexOf(_tag) === -1 && _tag != "") AllTags.push(_tag);
            return _tag;
        });
        return value;
    });



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
                <div className={styles.TagList}>
                    {
                        AllTags.map(node => (
                            <Tag TagData={"#" + node} key={node}/>
                        ))
                    }
                </div>
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