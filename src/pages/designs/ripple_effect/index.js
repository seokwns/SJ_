import * as React from 'react'
import * as styles from './index.module.css'
import Layout from '../../../components/main_layouts/main_layout'
import RippleButton from '../../../components/ripple_effect/RippleButton'
import { graphql } from 'gatsby'
import { Disqus } from 'gatsby-plugin-disqus'


const RippleEffectPage = ({ data, location }) => {

    const disqusConfig = {
        url: data.site.siteMetadata.siteUrl + location.pathname,
        identifier: location.pathname,
        title: "Ripple Effect"
    };


    return (
        <Layout pageTitle="Ripple Effect">
            <div className={styles.container}>
                <h1>Ripple Effect Button</h1>
                <RippleButton>HELLO</RippleButton>
                <RippleButton buttonStyle={{width: '100px', backgroundColor: '#212121'}}>Hi</RippleButton>

                <h2>- Why</h2>
                <p>구글에서 이 디자인을 처음 발표하였을 때, 나는 마인크래프트 스크립트에 한창 빠져있었다ㅎㅎ UI 다루는 것에 특히 빠져 있었다. 프로그래스바, 다이얼로그 등 모든 요소들을 새로 디자인하고, 이를 라이브러리로 제작하는 일이 너무 재미있던 그 때, 구글에서 '머터리얼 디자인'을 발표하였고, 나는 바로 Ripple 효과 구현에 도전했다.</p>
                <p>구글링을 통해 만들긴 했지만,,,,무지성 검색 + 대입 방식으로 구현해서 솔직히 이해하지 못했다,,,,,시간이 흐르고 이걸 같은 언어(?) 엔진이 달랐긴 했지만, 언어만 놓고 보면 같은 언어로 다시 만들어서 감회가 새롭다 ㅎㅎ 예전에는 아무것도 모르던 내가 이제는 이게 뭐고, 어떻게 써야 하는지 알고 있었고 어떤걸 찾아보면 되는지 바로바로 기억이 나서 큰 어려움이 없었다. 그래도 지난 시간동안 조금 발전은 했구나 ㅎㅎ</p>

                <h2>- How</h2>
                <p>버튼을 디자인 할 것이다. 그래서 button 요소를 만들었다. 그리고 디자인을 위해 className을 부여해주었고 기본 디자인을 만들었다. (border-radius: 4px 그리고 마진까지) 그 다음 새로운 요소로 클릭 시 물방울이 퍼지는 것 같은 효과를 만들어 내야 했다. 이를 위해 ::before 과 새로운 요소를 그 위에 덮어씌울 지 고민을 하다 우선 가장 익숙했던 ::before을 통해 만들어보기로 했다! 그런데 이게 뭐람. ::before로 생성한 요소의 위치를 잡아줘야 하는데, 이게 같은 파일의 변수를 공유해서 저번에 블로그 디자인 하다가 때려쳤던 기억이,,,,ㅎㅎㅎㅎㅎ</p>
                <p>그래서 바로 새로운 요소를 그 위에 덮는 걸로 방향을 잡았다.</p>
                <p>onClick 함수에서 event 객체에는 정말 많은 정보가 있다. 클릭한 뷰의 정보, 클릭한 좌표 등 내가 필요한 것들은 다 있기에 이 리스너 하나로 모든걸 제어할 수 있었다. 가장 먼저 좌표를 구했다. (이건 예전에도 이해했던 것들이라 어렵지 않았다) 그리고 span을 새로 생성하여 위치도 잡아주었다. 그 다음 우선 span 디자인을 간단히 해주었고 이제 애니메이션을 넣을 차례.</p>
                <p></p>
                <p>위치 변화는 transform의 translate를 통해 중앙(-50%, -50%)로 설정했다. 그리고 @keyframe을 통해 초기값과 최종값을 설정하였고 setTimeout을 통해 생성했던 span을 제거함과 동시에 설정한 클릭 리스너가 있으면 이를 실행하도록 했다. 이제 마지막 애니메이션 실행. 애니메이션 타임을 정하는데 꽤 고민이 있었지만,,,,0.35초로 결정했다(레퍼런스 찾기 귀찮아서...나중에 찾아서 수정해줘야겠다) 애니메이션은 css에서 animation: 이름 시간 플레이종류 (반복횟수) 로 가능하다.</p>

                <h2>- Use</h2>
                <p>완성! 부가적으로 buttonStyle을 추가할 수 있도록 해주었다. 사용법은 간단하다. import 후에 <code>{"<RippleButton> 버튼 내용 </RippleButton>"}</code>  이렇게 기본적으로 생성해주고 'setClickListener'로 클릭 함수 설정, 'buttonStyle'로 버튼 디자인을 변경하면 끝!</p>

                <h2>- Conclusion</h2>
                <p style={{marginBottom: '100px'}}>조금 더 발전된 상태에서 같은 내용을 다시 하다보니 내 부족한 점이 드러났다. 나는 예전부터 써오던 익숙한 것들만 하는 경향이 보였다. 더 쉽고 빠른 방법이 있는데 힘들게 빙 돌아서 할려고 하니 더 어렵고 오래 걸리는 것은 당연한 일,,,,,이제는 하나하나 정리하는 시간이 필요한 것 같군</p>
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