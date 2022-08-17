import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import * as styles from './main_layout.module.css'
import { Helmet } from 'react-helmet'


const links = [
    {
        url: '/',
        text: 'Home'
    },
    {
        url: '/about',
        text: 'About'
    },
    {
        url: '/posts',
        text: 'Posts'
    },
    {
        url: '/designs',
        text: 'Designs'
    }
];


const designs = [
    {
        title: 'Ripple Effect',
        url: '/designs/ripple_effect',
        description: 'Google의 Material Design 중 클릭 효과인 Ripple 효과를 구현하였습니다'
    },
    {
        title: 'Rainy Background',
        url: '/designs/rainy_background',
        description: '비가 내리는 모션이 추가된 배경화면입니다'
    },
    {
        title: 'Oil Paint Design',
        url: '/designs/oil_paint_design',
        description: '유화 디자인'
    },
    {
        title: 'Water Drop',
        url: '/designs/water_drop',
        description: '유리창에 맺힌 물방울 효과입니다'
    }
];



const Layout = ({ pageTitle, textColor, children }) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
            allMdx(sort: {order: DESC, fields: frontmatter___date}) {
                nodes {
                    frontmatter {
                        tag
                    }
                }
            }
        }
    `)

    textColor = (textColor === null? "#000000" : textColor);

    const MaterialIconStyle = {
        fontSize:'30px',
        margin: '20px', 
        color: textColor
    };

    const AllTags = [];
    const _nodes = data.allMdx.nodes;


    const CloseSideMenuFunction = () => {
        document.getElementById('sidebar').style.display = 'none';
        document.getElementById('bg').style.display = 'none';
        document.body.style.overflowY = 'auto';
    };


    const OpenSideMenuFunction = () => {
        let sbar = document.getElementById('sidebar').style;
        let bg = document.getElementById('bg').style;

        bg.display = 'block';
        sbar.display = 'block';

        document.body.style.overflowY = 'hidden';

        document.getElementById('bg').addEventListener('click', () => {
            document.getElementById('sidebar').style.display = 'none';
            document.getElementById('bg').style.display = 'none';
            document.body.style.overflowY = 'auto';
        });
    }


    _nodes.map((value) => {
        const tag_split = value.frontmatter.tag.split("#");
        tag_split.map(_tag => {
            if(AllTags.indexOf(_tag) === -1 && _tag !== "") AllTags.push(_tag);
            return _tag;
        });
        return value;
    });

    AllTags.sort();
    AllTags.unshift("전체보기");


    return (
        <div className={styles.container}>

            <Helmet>
                <title>{pageTitle} | {data.site.siteMetadata.title}</title>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0"/>
                <meta name="google-site-verification" content="S95aiNB-3XMc9IV5nBMwGuCWYRyGgYAmW96lzDuaGss" />
                <meta name="naver-site-verification" content="7d028066a9f9f5a5aa584706364bfecc1189d1c6" />
            </Helmet>

            <div className={styles.topMenu}>
                
                <div style={{display: 'flex', justifyContent: 'center'}}>

                    <button onClick={() => OpenSideMenuFunction()}>
                        <span className="material-icons" style={MaterialIconStyle} defer>menu</span>
                    </button>

                    <Link to='/' style={{display: 'flex', alignItems: 'center'}}><p style={{margin: 'auto 0', fontWeight: '800', fontSize: '18px', color: textColor}}>SJ_</p></Link>
                </div>
                <button>
                <span className="material-icons" style={MaterialIconStyle} defer>search</span>
                </button>
            </div>

            <div className={styles.childrenContainer}>
                {children}
            </div>

            <div className={styles.sideMenu} id='sidebar'>
                <button onClick={() => CloseSideMenuFunction()}>
                    <span className="material-icons" style={MaterialIconStyle} defer>clear</span>
                </button>

                <h2 className={styles.sideLogo} onClick={() => document.body.style.overflowY = 'auto'}>SJ_log</h2>

                <nav style={{maxHeight: 'calc(100vh - 180px)', overflowY: 'auto'}} onClick={() => CloseSideMenuFunction()}>
                    <ul className={styles.sideLinks}>
                        <li>
                            <Link to="/" className={styles.sideNavLinkText}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className={styles.sideNavLinkText}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to={links[2].url}className={styles.sideNavLinkText}>
                                Posts
                            </Link>
                        </li>
                        {
                            AllTags.map((node) => {
                                if(node !== "전체보기") {
                                    return (
                                        <li key={node}>
                                            <Link to={"/posts?tag=" + node} className={styles.navTagText}>
                                                {node}
                                            </Link>
                                        </li>
                                    )
                                }
                            })
                        }
                        <li>
                            <Link to="/designs" className={styles.sideNavLinkText}>
                                Designs
                            </Link>
                        </li>
                        {
                            designs.map((node) => (
                                <li key={node.url}>
                                    <Link to={node.url} className={styles.navTagText}>
                                        {node.title}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </div>

            <div className={styles.background} id='bg'></div>
            
        </div>
    )
}

export default Layout