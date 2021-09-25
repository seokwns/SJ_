import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import * as styles from './main_layout.module.css'
import { Helmet } from 'react-helmet'


const links = [
    {
        url: '/',
        text: 'Home',
    },
    {
        url: '/about',
        text: 'About',
    },
    {
        url: '/posts',
        text: 'Posts',
        categories: {}
    },
    {
        url: '/photos',
        text: 'Photos',
        categories: {}
    },
    {
        url: '/designs',
        text: 'Designs',
    }
];


const MaterialIconStyle = {
    fontSize:'30px',
    margin: '20px', 
    color: 'black'
};


const Layout = ({ pageTitle, children }) => {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                }
            }
            allMdx {
                nodes {
                    frontmatter {
                        category
                        date
                        tag
                        title
                    }
                    id
                    slug
                    body
                }
            }
        }
    `)


    const makeProperty = (parentProperties, newPropertyName, childrenContent) => {
        
    }


    const parseCategories = () => {
        const DataNodes = data.allMdx.nodes;
        DataNodes.forEach(node => {
            if(node.frontmatter.category != null) {
                const temp = node.frontmatter.category.split("-");
                if(temp[0] == "Posts") {
                    for(let i = 1; i < temp.length; i++) {
                        
                    }
                }
                if(temp[0] == "Photos") {
                    for(let i = 1; i < temp.length; i++) {
                        
                    }
                }
            }
        })
    }
    parseCategories();
    

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
                    <span className="material-icons" style={MaterialIconStyle}>menu</span>
                </button>
                <nav style={{display: "flex", justifyContent: "center"}}>
                    <ul className={styles.navLinks}>
                        {
                            links.map(node => (
                                <li key={node.url}>
                                    <Link to={node.url} className={styles.navLinkText} style={{textAlign: 'center'}}>
                                        {node.text}
                                    </Link>
                                </li>
                            ))
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
                }}>
                    <span className="material-icons" style={MaterialIconStyle}>clear</span>
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