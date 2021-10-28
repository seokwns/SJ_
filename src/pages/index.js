import * as React from 'react'
import * as styles from './index.module.css'
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet'


const links = [
    {
        url: '/about',
        text: 'About'
    },
    {
        url: encodeURI('/posts?tag=전체보기'),
        text: 'Posts'
    },
    {
        url: '/designs',
        text: 'Designs'
    },
    {
        url: '/',
        text: 'Portfolio'
    }
];


const MainTextStyle = {
    margin: '0',
    padding: '10px 40px 10px 10px',
    textAlign: 'right',
    fontWeight: '500',
    fontSize: '4rem',
    borderRight: '3px solid black'
};


const IndexPage = () => {


    return (
        <div className={styles.container} id='home-container'>
            <Helmet>
                <title>Welcome | SJ_</title>
            </Helmet>
            <div className={styles.contentDiv}>
                <p style={MainTextStyle}>Thanks<br/>for<br/>coming</p>
                <div className={styles.menuNav}>
                    <ul className={styles.menuList}>
                        {
                            links.map(node => (
                                <li key={node.text} className={styles.menuItems}>
                                    <Link to={node.url}>
                                        {node.text}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            <div className={styles.bottomWaves}>
                <span></span>
            </div>
        </div>
    )
}


export default IndexPage