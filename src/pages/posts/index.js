import * as React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Layout from '../../components/main_layouts/main_layout'
import PostPreviewLayout from '../../components/post_preview_layout/post_preview_layout'
import * as styles from './index.module.css'
import Tag from '../../components/Tag/Tag'
import { GatsbyImage } from 'gatsby-plugin-image'


const PostsPage = () => {


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

    
    const AllTags = [];
    const _nodes = data.allMdx.nodes;

    _nodes.map((value) => {
        const tag_split = value.frontmatter.tag.split("#");
        tag_split.map(_tag => {
            if (AllTags.indexOf(_tag) === -1 && _tag != "") AllTags.push(_tag);
            return _tag;
        });
        return value;
    });

    AllTags.sort();
    AllTags.unshift("전체보기");


    const tag = (typeof window !== 'undefined'? decodeURI(window.location.href).split("tag=")[1] : "전체보기");
    
    
    const PostNodes = data.allMdx.nodes;
    let NodesData = [];
    for (let i = 0; i < PostNodes.length; i++) {
        if (tag == "전체보기") {
            NodesData.push(PostNodes[i])
        } else {
            if (PostNodes[i].frontmatter.tag.indexOf(tag) != -1) {
                NodesData.push(PostNodes[i])
            }
        }
    }


    if (NodesData.length >= 2) {
        NodesData.sort((a, b) => {
            let ad = new Date(a.frontmatter.date);
            let bd = new Date(b.frontmatter.date);
            let condition = (ad > bd);
            return condition? -1 : (condition? 0 : 1);
        });
    }
    


    return (
        <Layout pageTitle="Posts">
            <div className={styles.container}>
                <div className={styles.profileDiv}>
                    {/* <GatsbyImage image={data.file.childImageSharp.gatsbyImageData} alt='profile image' className={styles.profileImage} /> */}
                    <h3 className={styles.descriptions} style={{margin: '70px 0 16px 0', fontSize: '50px', fontWeight: '800'}}>Blog</h3>
                    <p className={styles.descriptions} style={{fontSize: '20px', lineHeight: '180%', marginBottom: '0', color: '#999999'}}>하나씩 공부해나가는,<br/>마음 가는데로 만들어본 블로그</p>
                    {/* <p className={styles.descriptions} style={{fontSize: '0.9rem', lineHeight: '180%', margin: '40px 20px 10px 20px'}}>sites</p> */}
                    {/* <Link to='https://github.com/SeokjunMoon' className={styles.descriptions} style={{fontSize: '0.8rem', margin: '0 20px', display: 'flex', justifyContent: 'right', alignItems: 'center'}}><p style={{fontSize: '0.8rem', margin: '0'}}>https://github.com/SeokjunMoon</p></Link> */}
                    <h3 style={{margin: '70px auto 20px 0'}}>Tags</h3>
                    <div className={styles.TagList}>
                        {
                            AllTags.map(node => {
                                if(node == tag) {
                                    return (
                                        <Tag TagData={node} key={node} textStyle={{fontWeight: '800', color: '#5E35B1'}} backgroundStyle={{margin: '8px 20px 4px 0', padding: '0'}}/>
                                    )
                                } else {
                                    return (
                                        <Tag TagData={node} key={node} textStyle={{color: '#999999'}} backgroundStyle={{margin: '8px 20px 4px 0', padding: '0'}}/>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                <div>
                    <div className={styles.ViewPost}>
                    {
                        NodesData.map((node, index) => (
                            <PostPreviewLayout 
                                PostData={node}
                                key={node.id}
                                PostNodes={{posts: NodesData, current: index}}
                            />
                        ))
                    }
                    </div>
                </div>
            </div>
        </Layout>
    )
}


export default PostsPage