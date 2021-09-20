import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import * as styles from './main_layout.module.css'
import { Helmet } from 'react-helmet'
import { withPrefix } from 'gatsby'


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

    var toggled = false;
    
    return (
        <div className={styles.container}>
            <Helmet>
                <title>{pageTitle} | {data.site.siteMetadata.title}</title>
                <script src="https://kit.fontawesome.com/d43bad4a7f.js" crossorigin="anonymous"></script>
                <script src={withPrefix('layout_toggle_event.js')} type="/text/javascript" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Helmet>
            <div className={styles.topMenu} id='tmenu'>
                <h2 className={styles.topLogo}><Link to={"../"} className={styles.navLinkText}>SJ_</Link></h2>
                <nav style={{display: "flex", justifyContent: "center"}} id='nav_bar'>
                    <ul className={styles.navLinks} id='navlinks'>
                        <li className={styles.liAbout} id="about">
                            <Link to="/about" className={styles.navLinkText}>
                                About
                            </Link>
                        </li>
                        <li className={styles.liPosts} id="posts">
                            <Link to="/posts" className={styles.navLinkText}>
                                Posts
                            </Link>
                        </li>
                        <li className={styles.liPhotos} id="photos">
                            <Link to="/photos" className={styles.navLinkText}>
                                Photos
                            </Link>
                        </li>
                        <li className={styles.liDesigns} id="designs">
                            <Link to="/designs" className={styles.navLinkText}>
                                Designs
                            </Link>
                        </li>
                        <li className={styles.liNow} id="now">
                            {pageTitle}
                        </li>
                    </ul>
                    <a href="#" 
                        className={styles.navToggle} onClick={() => {
                            toggled = !toggled;

                            if(toggled) {
                                document.getElementById('about').style.display = 'block';
                                document.getElementById('posts').style.display = 'block';
                                document.getElementById('photos').style.display = 'block';
                                document.getElementById('designs').style.display = 'block';
                                document.getElementById('now').style.display = 'none';
    
                                document.getElementById('tmenu').style.height = '200px';
                            }
                            else if (!toggled) {
                                document.getElementById('about').style.display = 'none';
                                document.getElementById('posts').style.display = 'none';
                                document.getElementById('photos').style.display = 'none';
                                document.getElementById('designs').style.display = 'none';
                                document.getElementById('now').style.display = 'block';
    
                                document.getElementById('tmenu').style.height = '70px';
                            }

                            window.onresize = (event) => {
                                var innerWidth = window.innerWidth;
                                if(innerWidth >= "971") {
                                    document.getElementById('about').style.display = 'block';
                                    document.getElementById('posts').style.display = 'block';
                                    document.getElementById('photos').style.display = 'block';
                                    document.getElementById('designs').style.display = 'block';
                                    document.getElementById('now').style.display = 'none';
        
                                    document.getElementById('tmenu').style.height = '70px';
                                    document.getElementById('navlinks').style.flexDirection = 'row';
                                }
                                if(innerWidth < "971") {
                                    document.getElementById('about').style.display = 'none';
                                    document.getElementById('posts').style.display = 'none';
                                    document.getElementById('photos').style.display = 'none';
                                    document.getElementById('designs').style.display = 'none';
                                    document.getElementById('now').style.display = 'block';
        
                                    document.getElementById('tmenu').style.height = '70px';
                                    document.getElementById('navlinks').style.flexDirection = 'column';
                                }
                            }
                        }}>
                        <span style={{color: "black"}}>
                            <i aria-hidden className="fas fa-sort-down fa-1x"></i>
                        </span>
                    </a>
                </nav>
                <input type="text" className={styles.searchBox} placeholder="search..." id='sbox'></input>
            </div>
            <div className={styles.childrenContainer} id='chil'>
                {children}
            </div>
        </div>
    )
}

export default Layout