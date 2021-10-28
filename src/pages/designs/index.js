import * as React from 'react'
import Layout from '../../components/main_layouts/main_layout'
import * as styles from './index.module.css'
import { Link } from 'gatsby'


const designs = [
    {
        title: 'Ripple Effect',
        url: '/designs/ripple_effect',
        description: 'Google의 Material Design 중 클릭 효과인 Ripple 효과를 구현하였습니다'
    },
    {
        title: 'Rainy Background',
        url: '/designs/rainy_background',
        description: '비가 내리는 모션이 추가된 배경화면입니다'
    },
    {
        title: 'Oil Paint Design',
        url: '/designs/oil_paint_design',
        description: '유화 디자인'
    }
]


const DesignPage = () => {
    return (
        <Layout pageTitle="Designs">
            <div className={styles.container}>
                <h2 style={{margin: '40px auto 40px 20px'}}>CSS / Javascript Designs</h2>
                <nav className={styles.DesignListNav}>
                    <ul className={styles.DesignList}>
                        {
                            designs.map(node => (
                                <li key={node.title}>
                                    <Link to={node.url}>
                                        <h3>{node.title}</h3>
                                        <p style={{fontSize: '0.9rem', color: '#757575'}}>{node.description}</p>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </div>
        </Layout>
    )
}


export default DesignPage