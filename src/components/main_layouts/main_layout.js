import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import * as styles from './main_layout.module.css'
import { Helmet } from 'react-helmet'
import { StaticImage } from 'gatsby-plugin-image'


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
        url: '/photos',
        text: 'Photos'
    },
    {
        url: '/designs',
        text: 'Designs'
    }
];


const Layout = ({ pageTitle, children }) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)
    
    return (
        <div className={styles.container}>
            <Helmet>
                <title>{pageTitle} | {data.site.siteMetadata.title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <script>
                    document.body.style.minWidth = '340px';
                    document.body.style.overflowY = 'hidden';
                </script>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            </Helmet>
            <div className={styles.topMenu}>
                <button onClick={() => {
                    let sbar = document.getElementById('sidebar').style;
                    let bg = document.getElementById('bg').style;

                    const innerWidth = window.innerWidth;
                    if (innerWidth >= '768') {
                        sbar.width = '375px';
                        bg.display = 'block';
                    } else if (innerWidth < '768') {
                        sbar.width = '100%';
                        sbar.height = 'calc(100vh + 50px)';
                    }

                    sbar.display = 'block';

                    document.getElementById('bg').addEventListener('click', () => {
                        document.getElementById('sidebar').style.display = 'none';
                        document.getElementById('bg').style.display = 'none';
                    });
                }}>
                    <span className="material-icons" style={{fontSize:'30px', margin: '20px', color: 'black'}}>menu</span>
                </button>
                <nav style={{display: "flex", justifyContent: "center"}}>
                    <ul className={styles.navLinks}>
                        {
                            links.map(node => (
                                <li key={node.url}>
                                    <Link to={node.url} className={styles.navLinkText}>
                                        {node.text}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                    <h2 className={styles.mobileLogo}>SJ_log</h2>
                </nav>
                <button>
                <span className="material-icons" style={{fontSize:'30px', margin: '20px', color: 'black'}}>search</span>
                </button>
            </div>
            <div className={styles.childrenContainer}>
                {children}
            </div>

            <div className={styles.sideMenu} id='sidebar'>
                <button onClick={() => {
                    document.getElementById('sidebar').style.display = 'none';
                    document.getElementById('bg').style.display = 'none';
                }}>
                    <span className="material-icons" style={{fontSize:'30px', margin: '20px', color: 'black'}}>clear</span>
                </button>
                <p className={styles.sideLogo}>SJ_log</p>
                <nav style={{maxHeight: 'calc(100vh - 180px)', overflowY: 'auto'}}>
                    <ul className={styles.sideLinks}>
                    {
                        links.map(node => (
                            <li key={node.url}>
                                <Link to={node.url} className={styles.navLinkText}>
                                    {node.text}
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