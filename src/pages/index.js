import * as React from 'react'
import Layout from '../components/main_layouts/main_layout'
import * as styles from './index.module.css'


const IndexPage = () => { 
  return (
    <Layout pageTitle="Welcome">
      <div className={styles.container}>
        <p style={{fontSize: "40px"}}>반갑습니다!</p>
        <br></br>
        <p style={{fontSize: "20px"}}>진로 고민에 빠진 한 프로그래머의 블로그 입니다</p>
        <p style={{fontSize: "20px"}}>편안한 마음으로 봐주시면 감사하겠습니다</p>
        <br></br>
        <p style={{fontSize: "20px"}}>* 아직 개발 중인 사이트 입니다. 앞으로 열심히 추가할 예정입니다 *</p>
      </div>
      <div className={styles.latestPosts}>

      </div>
    </Layout>
  )
}

export default IndexPage