import * as React from 'react'
import * as styles from './index.module.css'
import Layout from '../../../components/main_layouts/main_layout'
import { graphql } from 'gatsby'
import { Disqus } from 'gatsby-plugin-disqus'


const RippleEffectPage = ({ data, location }) => {

    const disqusConfig = {
        url: data.site.siteMetadata.siteUrl + location.pathname,
        identifier: location.pathname,
        title: "Rainy Background"
    };


    React.useEffect(() => {
        const homeContainer = document.querySelector('#home\-container');
        const innerWidth = window.innerWidth * 0.4;

        const count = (innerWidth > 500? 500 : innerWidth);

        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const drop = document.createElement('span');

                drop.style.top = '0';
                drop.style.left = 'calc(' + (Math.random() * 100) + 'vw - 20px)';

                if (homeContainer != null) homeContainer.appendChild(drop);
            }, Math.random() * 1000);
        }
    });


    return (
        <Layout pageTitle="Rainy Background">
            <div className={styles.container} id='home-container'>
                <h1>Rainy Background</h1>
                <p>비가 오는 배경화면. 500개의 빗방울들이 랜덤한 위치에서 떨어진다.</p>

                <h1>- Why</h1>
                <p>오늘은 무엇을 할까 고민을 하고 있었다. 새로운 디자인을 하고 싶은데, 무엇을 해야 좋을지 고민을 해봐도 도저히 좋은 아이디어가 떠오르지 않았다. 주변을 둘러봐도 내 머리가 딸려서 그러나 도저히 좋은 아이디어가 떠오르지 않아,,,,,그래서 곰곰히 생각을 하고 있었다. 지금은 가을. 가을하면 낙엽, 비(뭔가 비가 내리는 분위기가 갑자기 떠오름) 등등 생각해보다가 가장 만만한! 비를 주제로 삼았다.</p>

                <h1>- How</h1>
                <p>우선 빗방울 요소들을 가장 배경이 되는 요소에 추가해야 한다. javascript를 통해 빗방울 500개를 만들어주었다. (for문을 이용했는데, 추후에 바꿔야겠다) span을 생성하여 최대한 빗방울처럼 보이게 디자인을 해보았,,,,지만,,,,뭔가 좀 어색한 느낌이 든다ㅜㅜ 이거는 천천히 색깔들 바꿔가면서 도전해봐야지</p>
                <p>그리고 css로 넘어와서는 나머지 애니메이션 효과를 주었다. animation으로 애니메이션 생성 및 속성을 부여하고, @keyframe으로 초기값과 최종값을 설정해주었다. 빗방울은 떨어지면서 점점 빨라지므로 애니메이션 속성에서 ease-in을 부여하고 계속 비가 내리는 것이 컨셉이므로 infinite 속성도 부여했다. 그리고 빗방울은 지면과 가까울수록 더 길어지기 때문에 최종 높이 또한 늘어나게 설정해주었다. 이렇게만 해주면 완성! 정말 어렵지 않았다. 어려웠다면....색상 선정이 진짜 힘들었다. 빗물과 최대한 비슷해야 하는데 이게 생각보다 많이 어려웠다.</p>

                <h1>- Use</h1>
                <p>이건 정말 쉽다. 배경 요소의 아이디만 바꿔주고 고대로 복사, 붙여넣기 후 내가 원하는 모양대로 수치만 조금 바꿔주면 끝. 나중에 변수로 한꺼번에 옵션을 다룰 수 있게 바꿔야겠다.</p>

                <h1>- Conclusion</h1>
                <p style={{marginBottom: '100px'}}>오늘은 비가 내리는 배경화면 만들기를 해보았다. 어제 했던 내용의 연장선 같은 느낌이라 어렵지 않았고 복습하는 느낌으로 정말 좋았던 것 같다. 빗방울 디자인을 바꿔야 하는데...이건 좀 공부한 뒤에 수정해야지 지금은 무리...ㅜㅜ 나중에는 유리에 빗방울이 맺힌 디자인도 추가해봐야겠다.</p>
                <Disqus config={disqusConfig} />
            </div>
        </Layout>
    )
}


export const query = graphql`
    query {
        site {
            siteMetadata {
                siteUrl
            }
        }
    }
`


export default RippleEffectPage