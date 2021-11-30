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
        description: '유화 느낌을 도전하다가 변질되어버린(?) 종이에 물감이 퍼지는 효과입니다'
    }
]


const DesignPage = () => {
    return (
        <Layout pageTitle="Designs">
            <div className={styles.container}>
                <p style={{margin: '40px auto 40px 40px', fontSize: '50px', fontWeight: '800'}}>CSS / Javascript</p>
                <div className={styles.designItems}>
                    {
                        designs.map(node => (
                            <Link to={node.url} key={node.title} className={styles.items}>
                                <p style={{margin: '0 0 16px 0', fontSize: '24px', fontWeight: '800'}}>{node.title}</p>
                                <p style={{fontSize: '16px', color: '#757575', fontWeight: '400', margin: '8px 0 0 0'}}>{node.description}</p>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}


export default DesignPage