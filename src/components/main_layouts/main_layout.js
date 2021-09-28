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
        url: '/posts',
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
        }
    `)


    return (
        <div className={styles.container}>
            <Helmet>
                <title>{pageTitle} | {data.site.siteMetadata.title}</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <script>
                    document.body.style.minWidth = '340px';
                </script>
            </Helmet>
            <div className={styles.topMenu}>
                <button className={styles.SideMenuButton} onClick={() => {
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
                                const ns = (pageCat == node.text? {textAlign: 'center', borderBottom: '3px solid #212121'} : {textAlign: 'center'});
                                return (
                                    <li key={node.url}>
                                        <Link to={node.url} className={styles.navLinkText} style={ns}>
                                            {node.text}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <Link to="/"><h2 className={styles.mobileLogo}>SJ_log</h2></Link>
                </nav>
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
                <p className={styles.sideLogo}>SJ_log</p>
                <nav style={{maxHeight: 'calc(100vh - 180px)', overflowY: 'auto'}}>
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
                            <Link to="/posts" className={styles.navLinkText}>
                                Posts
                            </Link>
                        </li>
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