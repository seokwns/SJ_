import * as React from 'react'
import Layout from '../../components/main_layouts/main_layout'
import * as styles from './index.module.css'
import { GatsbyImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'


const AboutPage = ({ data }) => {
    return (
        <Layout pageTitle="About" pageCat="About">
            <div className={styles.container}>
                <GatsbyImage image={data.file.childImageSharp.gatsbyImageData} className={styles.profileImage} />
                <p>Moon Seok Jun</p>
            </div>
        </Layout>
    )
}


export const query = graphql`
    {
        file(relativePath: {eq: "profile.jpg"}) {
            childImageSharp {
                gatsbyImageData(quality: 100)
            }
        }
    }
`


export default AboutPage