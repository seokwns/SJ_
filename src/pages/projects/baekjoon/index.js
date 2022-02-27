import React, { useState } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import * as styles from './index.module.css'
import Layout from '../../../components/main_layouts/main_layout'


const BaekjoonProject = () => {

    const data = useStaticQuery(graphql`
        query {
            allMdx(
                sort: {order: DESC, fields: frontmatter___title}
                filter: {frontmatter: {tag: {regex: "/백준/g"}}}
            ) {
                nodes {
                    frontmatter {
                        title
                        date
                        tag
                    }
                    id
                    slug
                    excerpt(pruneLength: 1000)
                }
            }
        }
    `);

    const [ allData, setAllData ] = useState(data.allMdx.nodes.sort((a, b) => {
        let aa = parseInt(a.frontmatter.title.split('백준 ')[1].split('번')[0]);
        let bb = parseInt(b.frontmatter.title.split('백준 ')[1].split('번')[0]);
        return (aa < bb? -1 : (aa > bb? 0 : +1));
    }));
    const [ filteredData, setFilteredData ] = useState(allData);
    const [ dataFilter, setDataFilter ] = useState('');

    const inputChangeHandler = (event) => {
        const tt = event.target.value;
        setDataFilter(tt);
        setFilteredData(allData.filter((e) => {
            return (e.frontmatter.title.indexOf(tt) != -1);
        }));
    }

    return (
        <Layout pageTitle='Baekjoon'>
            <div className={styles.container}>
                <span className={styles.title}>Baekjoon</span>
                <span className={styles.title_desc}>단계별 풀이 목록 by 주인장</span>
                <input placeholder="문제 검색" id='baekjoon_searcher' className={styles.searcher} value={dataFilter} onChange={(event) => inputChangeHandler(event)}/>

                <div className={styles.solution_list}>
                    {
                        filteredData.map((e, index) => {
                            let _title = e.frontmatter.title.split('백준 ')[1];
                            return (
                                <Link to={`/posts/${e.slug}`} className={styles.solution_item}>
                                    <span>{_title}</span>
                                </Link >
                            )
                        })
                    }
                </div>
            </div>
        </Layout>
    )
};


export default BaekjoonProject