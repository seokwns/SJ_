import * as React from 'react'
import * as styles from './index.module.css'
import { graphql, Link, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet'


const links = [
    {
        url: '/about',
        text: 'About',
        description: 'Introduction',
        icon: 'badge',
    },
    {
        url: '/posts',
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
        url: '/posts',
        text: 'Blog',
        description: 'Personal blog designed by myself',
        language: 'React > Gatsby'
    },
    {
        url: '/projects/baekjoon',
        text: 'baekjoon',
        description: 'My solution list to baekjoon algorithm step by step',
        language: 'Node.js'
    },
    {
        url: '/designs',
        text: 'Web Designs',
        description: 'Custom web designs',
        language: 'JS / CSS'
    },
    {
        url: 'https://seokjunmoon.github.io/perfume_project/',
        text: 'Blooming Fragrance',
        description: 'PROJECT 동아리 4주 프로젝트',
        language: 'JS / CSS'
    },
]


const studies= [
    {
        url: 'https://seokjun0915.notion.site/ce74774da9b9490ba0c57deb4e2d0d5b?v=18a42f1be0164babaecf41397098bf54',
        text: 'C',
        description: 'One of the basic programming languages',
        language: 'C'
    },
    {
        url: 'https://seokjun0915.notion.site/Python-3068bb2dd968403e9bcbca8a5bd8e68b',
        text: 'Python',
        description: 'One of the basic programming languages',
        language: 'Python'
    },
    {
        url: 'https://seokjun0915.notion.site/Rust-e3a86754ff70455ba53797f145cf29c8',
        text: 'Rust',
        description: 'An emerging popular language. Safe and powerful',
        language: 'Rust'
    },
]


const IndexPage = () => {

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

            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div className={styles.menu}>
                    <p style={{fontSize: '50px', fontWeight: '800', margin: '70px 0 16px 0'}}>Thanks for coming</p>
                    <p style={{fontSize: '20px', color: '#999999', fontWeight: '400', margin: '0 0 100px 0'}}>기록해보자</p>
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
        </div>
    )
}


export default IndexPage