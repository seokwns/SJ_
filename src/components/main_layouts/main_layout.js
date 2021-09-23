import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import * as styles from './main_layout.module.css'
import { Helmet } from 'react-helmet'
import { StaticImage } from 'gatsby-plugin-image';


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
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <script>
                    document.body.style.minWidth = '340px';
                    document.body.style.overflowY = 'hidden';
                </script>
            </Helmet>
            <div className={styles.topMenu}>
                <button>
                    <StaticImage src='../../images/icons/outline_menu_black_36dp.png' alt='menu' onClick={() => {
                        let sbar = document.getElementById('sidebar').style;
                        let bg = document.getElementById('bg').style;
                        bg.display = 'block';

                        const innerWidth = window.innerWidth;
                        sbar.width = innerWidth >= '768'? '375px' : '100%';
                        sbar.display = 'block';

                        document.getElementById('bg').addEventListener('click', () => {
                            document.getElementById('sidebar').style.display = 'none';
                            document.getElementById('bg').style.display = 'none';
                        });
                    }} imgStyle={{width: '27px', height: '27px', margin: '20px'}} style={{width: '70px', height: '70px'}}/>
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
                    <StaticImage src='../../images/icons/outline_search_black_36dp.png' alt='search' 
                                 imgStyle={{width: '27px', height: '27px', margin: '22px 5px 18px 25px'}} 
                                 style={{width: '70px', height: '70px'}}/>
                </button>
            </div>
            <div className={styles.childrenContainer}>
                {children}
            </div>

            <div className={styles.sideMenu} id='sidebar'>
                <button>
                    <StaticImage src='../../images/icons/outline_clear_black_36dp.png' alt='close' onClick={() => {
                        document.getElementById('sidebar').style.display = 'none';
                        document.getElementById('bg').style.display = 'none';
                    }} imgStyle={{width: '27px', height: '27px', margin: '20px'}} style={{width: '70px', height: '70px'}}/>
                </button>
                <p className={styles.sideLogo}>SJ_log</p>
                <nav style={{maxHeight: 'calc(100vh - 220px)', overflowY: 'auto'}}>
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