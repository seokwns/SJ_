import * as React from 'react'
import * as styles from './index.module.css'
import { graphql, Link, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet'
import { GatsbyImage } from 'gatsby-plugin-image';


const links = [
    {
        url: '/about',
        text: 'About',
        description: '인트로',
        icon: 'badge',
        color: 'rgb(255 204 188 / 40%)',
        iconColor: '#FF8A65'
    },
    {
        url: encodeURI('/posts?tag=전체보기'),
        text: 'Posts',
        description: '개인 블로그',
        icon: 'article',
        color: 'rgb(187 222 251 / 40%)',
        iconColor: '#64B5F6'
    },
    {
        url: '/designs',
        text: 'Designs',
        description: '웹 컴포넌트 디자인',
        icon: 'brush',
        color: 'rgb(225 190 231 / 40%)',
        iconColor: '#BA68C8'
    },
    {
        url: '/',
        text: 'Portfolio',
        description: '준비중!',
        icon: 'engineering',
        color: 'rgb(220 237 200 / 40%)',
        iconColor: '#AED581'
    }
];


const projects = [
    {
        url: '',
        text: 'Custome Blog',
        description: '직접 제작하는 개인 블로그',
        icon: 'auto_stories',
        color: 'rgb(224 224 224 / 40%)',
        iconColor: '#757575'
    },
    {
        url: '',
        text: 'TextViewer',
        description: 'PC/모바일 공용 텍스트 뷰어',
        icon: 'visibility',
        color: 'rgb(224 224 224 / 40%)',
        iconColor: '#757575'
    },
    {
        url: 'https://github.com/SeokjunMoon/baekjoon_algorithm',
        text: '백준알고리즘',
        description: '백준알고리즘 단계별로 풀어보기 풀이 목록',
        icon: 'edit',
        color: 'rgb(224 224 224 / 40%)',
        iconColor: '#757575'
    },
]


const IndexPage = () => {

    const data = useStaticQuery(graphql`
        query {
            headContainerImage: file(relativePath: {eq: "main-header.jpg"}) {
                childImageSharp {
                    gatsbyImageData(quality: 100)
                }
            }
            profileImage: file(relativePath: {eq: "profile.jpg"}) {
                childImageSharp {
                    gatsbyImageData(quality: 100)
                }
            }
        }
    `)


    const profileStyle = {
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        zIndex: '3',
        fontSize: '36px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(224, 224, 224)'
    };


    return (
        <div className={styles.container} id='home-container'>
            <Helmet>
                <title>Welcome | SJ_</title>
                <meta name="google-site-verification" content="S95aiNB-3XMc9IV5nBMwGuCWYRyGgYAmW96lzDuaGss" />
                <meta name="naver-site-verification" content="7d028066a9f9f5a5aa584706364bfecc1189d1c6" />
            </Helmet>

            <div className={styles.topHeader}>
                <GatsbyImage image={data.headContainerImage.childImageSharp.gatsbyImageData} alt='main header' className={styles.headerImage}/>
                <div className={styles.imageBlur}></div>
                <p className={styles.mainText}>Thanks for coming!</p>
                {/* <GatsbyImage image={data.profileImage.childImageSharp.gatsbyImageData} alt='profile' className={styles.profile}/> */}
                <span className="material-icons" style={profileStyle}>person</span>
                <p style={{margin: '10px 0', zIndex: '3', color: 'white', fontSize: '18px'}}>SJ</p>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <div className={styles.menu}>
                    <p style={{fontSize: '18px', fontWeight: '600', margin: '16px 0 8px 0'}}>Menu</p>
                    <div className={styles.menuNav}>
                        {
                            links.map(node => (
                                <Link to={node.url} key={node.text} className={styles.menuItem} style={{backgroundColor: node.color}}>
                                    <span className="material-icons" style={{fontSize: '30px', color: node.iconColor}}>{node.icon}</span>
                                    <div>
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center'}}>
                                            <p style={{fontSize: '16px', width: 'fit-content'}}>{node.text}</p>
                                            <span className="material-icons" style={{fontSize: '24px'}}>navigate_next</span>
                                        </div>
                                        <p style={{fontSize: '12px', color: '#999999', fontWeight: '300', margin: '6px 0 0 0'}}>{node.description}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>

                <div className={styles.menu}>
                    <p style={{fontSize: '18px', fontWeight: '600', margin: '16px 0 8px 0'}}>개인 프로젝트</p>
                    <div className={styles.projectNav}>
                        {
                            projects.map(node => (
                                <Link to={node.url} key={node.text} className={styles.projectItem}>
                                    <div className={styles.projectIconBackground} style={{backgroundColor: node.color}}/>
                                    <span className="material-icons" style={{fontSize: '30px', color: node.iconColor, marginRight: '20px'}}>{node.icon}</span>
                                    <div>
                                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center'}}>
                                            <p style={{fontSize: '16px', width: 'fit-content', fontWeight: '600', margin: '0 0 5px 16px'}}>{node.text}</p>
                                            {/* <span className="material-icons" style={{fontSize: '24px'}}>navigate_next</span> */}
                                        </div>
                                        <p style={{fontSize: '12px', color: '#999999', fontWeight: '300'}}>{node.description}</p>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>

                {/* <div className={styles.footer} style={{backgroundColor: '#F5F5F5'}}>
                    <p>Powered by Gatsby</p>
                </div> */}
            </div>
        </div>
    )
}


export default IndexPage