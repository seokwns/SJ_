import * as React from 'react'
import Layout from '../../components/main_layouts/main_layout'
import * as styles from './index.module.css'
import { StaticImage } from 'gatsby-plugin-image'
import { Helmet } from 'react-helmet'

const AboutPage = () => {
    return (
        <Layout pageTitle="About" pageCat="About">
            <Helmet>
                <script src="https://kit.fontawesome.com/d43bad4a7f.js" crossorigin="anonymous"></script>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Helmet>
            <div className={styles.container} style={{paddingTop: '50px'}}>
                <StaticImage src='../../images/profile.jpg' alt='profile image' className={styles.profileImage} defer></StaticImage>
                <p>Moon Seok Jun</p>
            </div>
        </Layout>
    )
}


export default AboutPage