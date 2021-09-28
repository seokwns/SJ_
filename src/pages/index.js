import * as React from 'react'
import Layout from '../components/main_layouts/main_layout'
import * as styles from './index.module.css'
import { graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'


const IndexPage = ({ data }) => { 

  return (
    <Layout pageTitle="Welcome" pageCat="Home">
      {/* <BackgroundImage Tag="section" fluid={data.file.childImageSharp.fluid} alt="main background" defer> */}
        <div className={styles.container}>
          <p style={{fontSize: "40px", paddingTop: "80px", margin: "0px"}}>Thanks for coming</p>
          <br></br>
          <p>갓 전역한 휴학생의 블로그!</p>
          <p>프론트앤드 공부 겸 Gatsby 공부 겸</p>
          <p>뚝딱뚝딱 만들고 있는 홈페이지 입니다</p>
          <p>생각보다 재미있네요</p>
          <p></p>
          <br></br>
          <p style={{paddingBottom: "80px", marginBottom: '0'}}>그럼 이만.</p>
        </div>
      {/* </BackgroundImage> */}
    </Layout>
  )
}


export const query = graphql`
  query {
    file(relativePath: {eq: "main-container-bg.jpg"}) {
      childImageSharp {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMdx(sort: {order: DESC, fields: frontmatter___date}) {
        nodes {
            frontmatter {
                title
                date(formatString: "MMMM D, YYYY")
                tag
                thumbnail {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
            id
            slug
            excerpt(pruneLength: 1000)
        }
    }
  }
    
`


export default IndexPage