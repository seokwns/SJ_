import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import * as styles from './main_layout.module.css'
import { Helmet } from 'react-helmet'


const links = [
    {
        url: '/',
        text: 'Home',
        categories: {
        }
    },
    {
        url: '/about',
        text: 'About',
        categories: {
        }
    },
    {
        url: encodeURI('/posts?tag=전체보기'),
        text: 'Posts',
        categories: {
            count: 0
        }
    },
    {
        url: '/photos',
        text: 'Photos',
        categories: {
            count: 0
        }
    },
    {
        url: '/designs',
        text: 'Designs',
        categories: {
            count: 0
        }
    }
];


const MaterialIconStyle = {
    fontSize:'30px',
    margin: '20px', 
    color: 'black'
};


const Layout = ({ pageTitle, pageCat, children }) => {
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


    return (
        <div className={styles.container}>
            <Helmet>
                <title>{pageTitle} | {data.site.siteMetadata.title}</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Helmet>
            <div className={styles.topMenu}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button onClick={() => {
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
                    }}>
                        <span className="material-icons" style={MaterialIconStyle}>menu</span>
                    </button>
                    <nav style={{display: "flex", justifyContent: "center"}}>
                        <ul className={styles.navLinks}>
                            {
                                links.map(node => {
                                    if(node.text == "Posts") {
                                        return (
                                            <li key={node.url}>
                                                <Link to={node.url} state={{tag: "전체보기"}} className={styles.navLinkText} onClick={() => document.body.style.overflowY = 'auto'}>
                                                    {node.text}
                                                </Link>
                                            </li>
                                        )
                                    }
                                    else {
                                        return (
                                            <li key={node.url}>
                                                <Link to={node.url} className={styles.navLinkText} onClick={() => document.body.style.overflowY = 'auto'}>
                                                    {node.text}
                                                </Link>
                                            </li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </nav>
                </div>
                <Link to="/"><h2 className={styles.mobileLogo}>SJ_log</h2></Link>
                <button>
                <span className="material-icons" style={MaterialIconStyle}>search</span>
                </button>
            </div>

            <div className={styles.childrenContainer}>
                {children}
            </div>

            <div className={styles.sideMenu} id='sidebar'>
                <button onClick={() => {
                    document.getElementById('sidebar').style.display = 'none';
                    document.getElementById('bg').style.display = 'none';
                    document.body.style.overflowY = 'auto';
                }}>
                    <span className="material-icons" style={MaterialIconStyle}>clear</span>
                </button>
                <h2 className={styles.sideLogo} onClick={() => document.body.style.overflowY = 'auto'}>SJ_log</h2>
                <nav style={{maxHeight: 'calc(100vh - 180px)', overflowY: 'auto'}} onClick={() => {
                    document.body.style.overflowY = 'auto';
                    document.getElementById('sidebar').style.display = 'none';
                    document.getElementById('bg').style.display = 'none';
                }}>
                    <ul className={styles.sideLinks}>
                        <li>
                            <Link to="/" className={styles.navLinkText}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className={styles.navLinkText}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to={"/posts"} state={{tag: "전체보기"}} className={styles.navLinkText}>
                                Posts
                            </Link>
                        </li>
                        {
                            AllTags.map((node) => (
                                <li key={node}>
                                    <Link to={"/posts"} state={{tag: node}} className={styles.navTagText}>
                                        {node}
                                    </Link>
                                </li>
                            ))
                        }
                        <li>
                            <Link to="/photos" className={styles.navLinkText}>
                                Photos
                            </Link>
                        </li>

                        <li>
                            <Link to="/designs" className={styles.navLinkText}>
                                Designs
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className={styles.background} id='bg'></div>
        </div>
    )
}

export default Layout