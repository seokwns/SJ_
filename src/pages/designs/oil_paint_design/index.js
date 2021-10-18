import * as React from 'react'
import * as styles from './index.module.css'
import Layout from '../../../components/main_layouts/main_layout'
import { graphql } from 'gatsby'
import { Disqus } from 'gatsby-plugin-disqus'


let color = -30;
const randomColor = () => {
    color = Math.floor( ( color % 360 ) + 30 + 10 * Math.random() );
    return 'hsl(' + color + ', 50%, 50%)';
};


const randomMove = (move) => {
    return ((Math.random() * move) * (Math.random() < 0.5? -1 : 1));
};


function WaterPoint(options) {
    for (let key in options) {
        if (options.hasOwnProperty(key)) {
            this[key] = options[key];
        }
    }

    this.c = Math.floor(Math.random() * 2);
    if (!this.fill) this.fill = randomColor();

    this.render();
}

WaterPoint.prototype = {
    
    size: 100,
    speed: 0.3,
    maxRender: 5,
    c: 0,

    build() {
        let move = this.size * 0.15;
        let sx = -this.size;
        let sy = 0;
        let start = [ sx, sy ];

        this.points = [];

        for (let rotation = 0; rotation < 2 * Math.PI; rotation += this.speed) {
            sx += this.size * this.speed * Math.sin(rotation) * (Math.random() < 0.5? 1 : 0.7) + randomMove(move);
            sy += this.size * this.speed * Math.cos(rotation) * (Math.random() < 0.5? 0.7 : 1) + randomMove(move);

            this.points.push([ sx, sy ]);
        }

        this.points.push(start);
    },

    expand() {
        if (!this.points) {
            this.build();
        }

        let move = this.size * 0.07;
        let p = [];
        let x, y, x2, y2;

        for (let i = 0; i < this.points.length - 1; i++) {
            x = this.points[i][0];
            y = this.points[i][1];
            x2 = this.points[i + 1][0];
            y2 = this.points[i + 1][1];

            p.push(
                [x, y],
                [((x + x2) / 2) + randomMove(move), ((y + y2) / 2) + randomMove(move)],
                [x2, y2]
            );
        }

        this.points = p;
    },

    render: function() {
        this.c++;
        if (this.c < (this.maxRender * 3)) {
            requestAnimationFrame(this.render.bind(this));
        }
        if (this.c % 3 == 0) {
            this.draw(this.c / 3);
        }
    },

    draw: function(c) {
        if (this.ctx) {
            this.expand();

            let ctx = this.ctx;
            let layer = (c / this.maxRender);

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.globalCompositeOperation = 'hard-light';
            ctx.globalAlpha = 0.25 - (layer * 0.1);
            ctx.filter = 'url(#pointfilter)';

            ctx.translate(this.x, this.y);
            ctx.scale(1 + layer * 0.2, 1 + layer * 0.2);

            ctx.beginPath();
            ctx.moveTo(this.points[0][0], this.points[0][1]);

            for (let i = 0; i < this.points.length; i++) {
                ctx.lineTo(this.points[i][0], this.points[i][1]);
            }

            ctx.closePath();
            ctx.fillStyle = this.fill;
            ctx.fill();
        }
    }
};


function drawWaterPoints(context, event) {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let x = width * Math.random();
    let y = height * Math.random();

    if (event) {
        event = event.touches? event.touches[0] : event;
        x = event.clientX || event.x;
        y = event.clientY || event.y;
    }

    new WaterPoint({
        ctx: context,
        size: Math.min(width, height) * (0.1 + Math.random() * 0.1),
        x: x,
        y: y - 70
    })
}


const OilEffectPage = ({ data, location }) => {

    const disqusConfig = {
        url: data.site.siteMetadata.siteUrl + location.pathname,
        identifier: location.pathname,
        title: "Oil Paing Design"
    };


    React.useEffect(() => {
        const canvas = document.getElementById('main\-canvas');
        if(canvas.getContext) {
            const ctx = canvas.getContext('2d');
            const container = document.getElementById('home\-container');


            let width = (canvas.width = window.innerWidth);
            let height = (canvas.height = window.innerHeight);
            ctx.setTransform(1, 0, 0, 1, 0, 0);


            
            for(let i = 0; i < 10; i++) {
                new WaterPoint({
                    ctx: ctx,
                    size: Math.min(width, height) * (0.3),
                    x: width * Math.random(),
                    y: height * Math.random()
                });
            }


            window.addEventListener('resize', () => {
                width = (canvas.width = window.innerWidth);
                height = (canvas.height = window.innerHeight);
            });

            container.addEventListener('click', (event) => {
                drawWaterPoints(ctx, event);
            });

            container.addEventListener('touchstart', (event) => {
                drawWaterPoints(ctx, event);
            })
        }
    });


    return (
        <Layout pageTitle="Oil Paint">
            <svg xmlns="http://www.w3.org/2000/svg" version='1.1' width='0' height='0'>
                <defs>
                    <filter id='pointfilter'>
                        <feTurbulence type='fractalNoise' baseFrequency='0.3'  numOctaves='3' result='noise' seed='0' />
                        <feDisplacementMap in='SourceGraphic' in2='noise' scale='10'/>
                    </filter>
                </defs>
            </svg>
            <canvas id='main-canvas'></canvas>
            
            <div className={styles.container} id='home-container'>
                <h1>유화? 물감? </h1>
                <p>도화지에 물감 한방울이 떨어지고 퍼져나가는 느낌을 살린 디자인이다.</p>

                <h2>- Why</h2>
                <p>처음에 기획한 방향은 이게 아니였다. 유화같은 느낌의, 물 위에 형형색색의 기름들이 떠다니는, 그런 느낌을 기반으로 시작했다. 그래서 우선 오래전에 써보고 한번도 안쓴 canvas를 공부하기 시작했다. 도화지에 그림 그리기....라는 생각이 들었다. 내가 원하는 방향으로 붓을 보내어 그림을 그리는 느낌이었다. 색을 채우고, 테두리를 만들고 필터를 쓰는건 부수적인 것이고, 본질은 canvas라는 도화지에 그림 그리기인 것 같았다.</p>
                <p>그러다 문득, '도화지에 그림 그리기'라는 생각을 하자 물감이 떠올랐다. 도화지에서 은은하게 퍼져나가는 물감. 처음 기획했던 것 보다 이게 더 좋은 방향인 것 같아서 급히 계획을 수정하였다. 그래서 탄생한 결과물이 바로 이 배경이다.</p>

                <h2>- How</h2>
                <p>가장 먼저 해야하는건 canvas 추가. main container에 canvas 태그를 추가해주었다. 그 다음 자바스크립트를 이용해서 도형을 그려야 하는데, 처음에는 원 모양을 할려고 했으나 너무 단조로운, 획일적인 느낌이 싫어서 불규칙하게 그려야 했다. 그래서 lineTo 를 이용하여 그릴 때 좌표를 Math.random() 함수를 이용하여 굴곡을 주었고, 부드럽게 다듬기 위해 expand() 함수에서 좌표간 중점을 다시 연결해주면서 완만하게 만들었다.</p>
                <p>가장 난해한 부분이 가장자리 처리였다. 이걸 어떻게 해야 퍼지는 것 같은 효과를 줄지 검색해보다가 svg 필터에서 가능하다는걸 알았다. html을 자세하게? 배우지 않고 필요한걸 그때그때 배우다보니 너무 오래 걸렸다....5일간 (놀기도 했지만ㅋㅋ) 이거 찾아보는 시간이 정말 오래 걸렸다. 국내 자료에서는 블러효과만 다뤄서 그 이외에 옵션들을 찾아볼려면 해외 자료에서 찾아야 했기 때문에 번역 시간까지 더 오래 걸렸다.(영어공부도 이제부터 좀 해야지...)</p>

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


export default OilEffectPage