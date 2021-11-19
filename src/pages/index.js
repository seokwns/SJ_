import * as React from 'react'
import * as styles from './index.module.css'
import { graphql, Link, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet'
import { GatsbyImage } from 'gatsby-plugin-image';


const links = [
    {
        url: '/about',
        text: 'About',
        description: 'Introduction',
        icon: 'badge',
    },
    {
        url: encodeURI('/posts?tag=전체보기'),
        text: 'Posts',
        description: 'Personal Blog',
        icon: 'article',
    },
    {
        url: '/',
        text: 'Portfolio',
        description: 'Preparing',
        icon: 'engineering',
    }
];


const projects = [
    {
        url: encodeURI('/posts?tag=전체보기'),
        text: 'Blog',
        description: 'Personal blog designed by myself',
        language: 'React > Gatsby'
    },
    {
        url: '',
        text: 'Text Viewer',
        description: 'PC/mobile public text viewer',
        language: 'React > Gatsby'
    },
    {
        url: 'https://github.com/SeokjunMoon/baekjoon_algorithm',
        text: 'baekjoon',
        description: 'My solution list to baekjoon algorithm step by step',
        language: 'Node.js'
    },
]


const studies= [
    {
        url: 'https://www.notion.so/seokjun0915/ce74774da9b9490ba0c57deb4e2d0d5b?v=18a42f1be0164babaecf41397098bf54',
        text: 'C',
        description: 'One of the basic programming languages',
        language: 'C'
    },
    {
        url: 'https://www.notion.so/seokjun0915/Python-3068bb2dd968403e9bcbca8a5bd8e68b',
        text: 'Python',
        description: 'One of the basic programming languages',
        language: 'Python'
    },
]


const IndexPage = () => {

    // const data = useStaticQuery(graphql`
    //     query {
    //         headContainerImage: file(relativePath: {eq: "main-header.jpg"}) {
    //             childImageSharp {
    //                 gatsbyImageData(quality: 100)
    //             }
    //         }
    //         profileImage: file(relativePath: {eq: "profile.jpg"}) {
    //             childImageSharp {
    //                 gatsbyImageData(quality: 100)
    //             }
    //         }
    //     }
    // `)


    // const descriptionStyle = {
    //     margin: '30px 0 20px 0',
    //     fontSize: '16px'
    // };

    // const buttonStyle = {
    //     margin: '10px 0',
    //     backgroundColor: 'black',
    //     color: 'white',
    //     padding: '10px 20px',
    //     fontSize: '12px',
    //     width: '100px',
    // };


    const MenuTitleStyle = {
        fontSize: '24px',
        fontWeight: '800',
        margin: '20px 0'
    };


    return (
        <div className={styles.container} id='home-container'>
            <Helmet>
                <title>Welcome | SJ_</title>
                <meta name="google-site-verification" content="S95aiNB-3XMc9IV5nBMwGuCWYRyGgYAmW96lzDuaGss" />
                <meta name="naver-site-verification" content="7d028066a9f9f5a5aa584706364bfecc1189d1c6" />
            </Helmet>

            {/* <div className={styles.topHeader}>
                <GatsbyImage image={data.headContainerImage.childImageSharp.gatsbyImageData} alt='main header' className={styles.headerImage}
                imgStyle={{
                    position: 'absolute',
                    overflow: 'hidden',
                    height: '500px',
                    zIndex: '1'
                }}/>
                <div className={styles.imageBlur}></div>
                <p className={styles.mainText}>Thanks for coming</p>
            </div> */}

            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div className={styles.menu}>
                    <p style={{fontSize: '50px', fontWeight: '800', margin: '70px 0 16px 0'}}>Thanks for coming</p>
                    <p style={{fontSize: '20px', color: '#999999', fontWeight: '400', margin: '0 0 100px 0'}}>It is a blog of a programmer<br/>who is constantly developing,<br/>always acting and contemplating.</p>
                    <p style={MenuTitleStyle}>📑 Menu</p>
                    <div className={styles.menuNav}>
                        {
                            links.map(node => (
                                <Link to={node.url} key={node.text} className={styles.menuItem}>
                                    <span className="material-icons" style={{fontSize: '30px', color: '#424242', margin: '0 0 20px 0'}}>{node.icon}</span>
                                    <div>
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center'}}>
                                            <p style={{fontSize: '24px', width: 'fit-content', color: '#424242'}}>{node.text}</p>
                                            <span className="material-icons" style={{fontSize: '24px', color: '#424242', margin: '14px 0 0 0'}}>navigate_next</span>
                                        </div>
                                        <div style={{fontSize: '16px', color: '#999999', fontWeight: '400', margin: '8px 0 0 0'}}>
                                            {node.description}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>

                <div className={styles.menu}>
                    <p style={MenuTitleStyle}>🗂️ Projects</p>
                    <div className={styles.menuNav}>
                        {
                            projects.map(node => (
                                <Link to={node.url} key={node.text} className={styles.menuItem}>
                                    <div style={{fontSize: '13px', color: '#999999', fontWeight: '800', margin: '0 0 12px 0'}}>
                                        {node.language}
                                    </div>
                                    <div style={{fontSize: '24px', width: 'fit-content', fontWeight: '800', margin: '8px 0 12px 0'}}>
                                        {node.text}
                                    </div>
                                    <div style={{fontSize: '16px', color: '#999999', fontWeight: '400', margin: '8px 0 0 0'}}>
                                        {node.description}
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>

                <div className={styles.menu}>
                    <p style={MenuTitleStyle}>📖 Study</p>
                    <div className={styles.menuNav}>
                        {
                            studies.map(node => (
                                <Link to={node.url} key={node.text} className={styles.menuItem}>
                                    <div style={{fontSize: '14px', color: '#999999', fontWeight: '800', margin: '0 0 12px 0'}}>
                                        {node.language}
                                    </div>
                                    <div style={{fontSize: '24px', width: 'fit-content', fontWeight: '800', margin: '8px 0 12px 0'}}>
                                        {node.text}
                                    </div>
                                    <div style={{fontSize: '16px', color: '#999999', fontWeight: '400', margin: '8px 0 0 0'}}>
                                        {node.description}
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '50px 20px 20px 20px', textAlign: 'center'}}>
                <h2 style={{margin: '20px 0'}}>나는 누굴까요?</h2>
                <p style={descriptionStyle}>항상 생각하고 고민하는, 끊임없이 발전하는 프로그래머 입니다.</p>
                <Link to='/about'><p style={buttonStyle}>About Me</p></Link>


                <h2 style={{margin: '150px 0 20px 0'}}>내 개발일지</h2>
                <p style={descriptionStyle}>이 곳에 한번 담아보았어요. 한번 보시겠어요?</p>
                <Link to='/about'><p style={buttonStyle}>Blog</p></Link>

                <h2 style={{margin: '150px 0 20px 0'}}>소소한 디자인들</h2>
                <p style={descriptionStyle}>가장 먼저 해보고 싶었던 디자인을 해봤어요.</p>
                <Link to='/about'><p style={buttonStyle}>Designs</p></Link>
            </div> */}
        </div>
    )
}


export default IndexPage