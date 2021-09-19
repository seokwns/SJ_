import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import {
    container,
    navLinks,
    navLinkItem,
    navLinkText,
    topMenu,
    searchBox,
    topLogo,
    childrenContainer,
} from './main_layout.module.css'



const links = [
    {
        text: "About",
        url: "/about",
    },
    {
        text: "Posts",
        url: "/posts",
    },
    {
        text: "Photos",
        url: "/photos",
    },
    {
        text: "Designs",
        url: "/designs",
    },
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
        <div className={container}>
            <title>{pageTitle} | {data.site.siteMetadata.title}</title>
            <div className={topMenu}>
                <h2 className={topLogo}><Link to={"../"} className={navLinkText}>SJ_</Link></h2>
                <nav>
                    <ul className={navLinks}>
                        {links.map(link => (
                            <li key={link.url} className={navLinkItem}>
                                <Link to={link.url} className={navLinkText}>
                                    {link.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <input type="text" className={searchBox} placeholder="search..."></input>
            </div>
            <main className={childrenContainer}>
                {children}
            </main>
        </div>
    )
}

export default Layout