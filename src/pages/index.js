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
    }
];


const MainTextStyle = {
    margin: '0',
    padding: '10px 40px 10px 10px',
    textAlign: 'right',
    fontWeight: '300',
    fontSize: '4rem',
    borderRight: '3px solid black'
};


const IndexPage = () => {


    React.useEffect(() => {
        const homeContainer = document.querySelector('#home\-container');
        const counts = window.innerWidth * 0.5;
        
        for (let i = 0; i < counts; i++) {
            setTimeout(() => {
                const drop = document.createElement('span');


                drop.style.top = '0';
                drop.style.left = (Math.random() * 100) + 'vw';

                if (homeContainer != null) homeContainer.appendChild(drop);
            }, Math.random() * 1000);
        }
    });


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
        </div>
    )
}


export default IndexPage