import React, { useState } from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
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
                        date
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

            file(relativePath: {eq: "profile.jpg"}) {
                childImageSharp {
                    gatsbyImageData(quality: 100)
                }
            }
        }
    `)


    const initialTags = ['전체보기'];
    const initialPosts = [];
    data.allMdx.nodes.sort((a, b) => {
        let ad = new Date(a.frontmatter.date);
        let bd = new Date(b.frontmatter.date);
        let condition = (ad > bd);
        return condition? -1 : (condition? 0 : 1);
    }).forEach((e) => {
        e.frontmatter.tag.split('#').forEach((v) => {
            if (initialTags.indexOf(v) == -1 && v != '') {
                initialTags.push(v);
            }
        })

        initialPosts.push(e);
    });

    const [ allPosts, setAllPosts ] = useState(data.allMdx.nodes);
    const [ allTags, setAllTags ] = useState(initialTags);
    const [ filteredPosts, setFilteredPosts ] = useState(allPosts);
    const [ filteredTags, setFilteredTags ] = useState(allTags);
    const [ currentTag, setCurrentTag ] = useState('전체보기');

    
    const CurrentTagStyle = {
        fontWeight: '800', 
        color: '#5E35B1'
    };

    const TagStyle = {
        color: '#999999'
    };
    


    return (
        <Layout pageTitle="Posts">
            <div className={styles.container}>
                <div className={styles.profileDiv}>
                    <h3 className={styles.descriptions} style={{margin: '70px 0 16px 0', fontSize: '50px', fontWeight: '800'}}>Blog</h3>
                    <p className={styles.descriptions} style={{fontSize: '20px', lineHeight: '180%', marginBottom: '0', color: '#999999'}}>하나씩 공부해나가는,<br/>마음 가는데로 만들어본 블로그</p>
                    <h3 style={{margin: '70px auto 20px 0'}}>Tags</h3>
                    <div className={styles.TagList}>
                        {
                            filteredTags.map((node, index) => (
                                <div key={index}>
                                    <Tag TagData={node} textStyle={ (node == currentTag? CurrentTagStyle : TagStyle) } backgroundStyle={{margin: '8px 20px 4px 0', padding: '0'}} onClick={ (event) => {
                                        if (node === '전체보기') {
                                            setFilteredPosts(allPosts);
                                        }
                                        else {
                                            setFilteredPosts(allPosts.filter((e) => {
                                                if (e.frontmatter.tag.indexOf(node) != -1) {
                                                    return e;
                                                }
                                            }))
                                        }
                                        setCurrentTag(node);
                                    }}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <div className={styles.ViewPost}>
                        {
                            filteredPosts.map((node, index) => (
                                <div key={index}>
                                    <PostPreviewLayout PostData={node} PostNodes={{posts: filteredPosts, current: index}} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}


export default PostsPage