import * as React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../../components/main_layouts/main_layout'
import PostPreviewLayout from '../../components/post_preview_layout/post_preview_layout'
import * as styles from './index.module.css'
import Tag from '../../components/Tag/Tag'


const PostsPage = ({ location }) => {


    const data = useStaticQuery(graphql`
        query {
            allMdx(sort: {order: DESC, fields: frontmatter___date}) {
                nodes {
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
                    id
                    slug
                    excerpt(pruneLength: 1000)
                }
            }
        }
    `)

    
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

    AllTags.sort();
    AllTags.unshift("전체보기");


    const { state = {} } = location
    const { tag } = state


    const PostNodes = data.allMdx.nodes;
    let NodesData = [];
    for (let i = 0; i < PostNodes.length; i++) {
        if(tag == "전체보기") {
            NodesData.push(PostNodes[i])
        } else {
            if(PostNodes[i].frontmatter.tag.indexOf(tag) != -1) {
                NodesData.push(PostNodes[i])
            }
        }
    }
    return (
        <Layout pageTitle="Posts" pageCat="Posts">
            <div className={styles.container}>
                <div className={styles.TagList}>
                    {
                        AllTags.map(node => {
                            if(node == tag) {
                                return (
                                    <Tag TagData={node} key={node} backgroundStyle={{backgroundColor: '#0091EA'}} textStyle={{color: 'white'}}/>
                                )
                            } else {
                                return (
                                    <Tag TagData={node} key={node}/>
                                )
                            }
                        })
                    }
                </div>
                <div className={styles.ViewPost}>
                {
                    NodesData.map(node => (
                        <PostPreviewLayout PostData={node} key={node.id}/>
                    ))
                }
                </div>
            </div>
        </Layout>
    )
}


export default PostsPage