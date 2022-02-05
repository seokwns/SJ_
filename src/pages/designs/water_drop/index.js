import * as React from 'react'
import * as styles from './index.module.css'
import Layout from '../../../components/main_layouts/main_layout'
import { graphql } from 'gatsby'
import { Disqus } from 'gatsby-plugin-disqus'


function randomExpend() {
    return (Math.floor(15 * Math.random())); //5, 20
}

function makeRadius() {
    const LEFT_TOP_BOTTOM = 40 + 30 * Math.random();
    const LEFT_TOP_RIGHT = LEFT_TOP_BOTTOM > 50? LEFT_TOP_BOTTOM - randomExpend() : LEFT_TOP_BOTTOM + randomExpend();
    const RIGHT_TOP_LEFT = 100 - LEFT_TOP_RIGHT;
    const RIGHT_TOP_BOTTOM = RIGHT_TOP_LEFT > 50? RIGHT_TOP_LEFT - randomExpend() : RIGHT_TOP_LEFT + randomExpend();
    const RIGHT_BOTTOM_TOP = 100 - RIGHT_TOP_BOTTOM;
    const RIGHT_BOTTOM_LEFT = RIGHT_BOTTOM_TOP > 50? RIGHT_BOTTOM_TOP - randomExpend() : RIGHT_BOTTOM_TOP + randomExpend();
    const LEFT_BOTTOM_RIGHT = 100 - RIGHT_BOTTOM_LEFT;
    const LEFT_BOTTOM_TOP = 100 - LEFT_TOP_BOTTOM;

    return (LEFT_TOP_RIGHT + '% ' + RIGHT_TOP_LEFT + '% ' + RIGHT_BOTTOM_LEFT + '% ' + LEFT_BOTTOM_RIGHT + '% / '
        + LEFT_TOP_BOTTOM + '% ' + RIGHT_TOP_BOTTOM + '% ' + RIGHT_BOTTOM_TOP + '% ' + LEFT_BOTTOM_TOP + '%');
}

const MIN_WIDTH = 20;
const MAX_WIDTH = 40;
function randomSize() {
    return (MIN_WIDTH + Math.floor(Math.random() * (MAX_WIDTH - MIN_WIDTH)));
}



function Drop(options) {
    for (let key in options) {
        if (options.hasOwnProperty(key)) {
            this[key] = options[key];
        }
    }

    this.size += 10;
}

Drop.prototype = {
    size: 10,
    x: 0,
    y: 0,

    render: function() {
        let dot = document.createElement('span');
        dot.style.width = this.size + 'px';
        dot.style.height = this.size + 'px';
        dot.style.top = this.y - (this.size / 2) + 'px';
        dot.style.left = this.x - (this.size / 2) + 'px';
        dot.style.borderRadius = makeRadius();

        return dot;

        // let contain = document.createElement('div');
        // let dot = document.createElement('span');
        // let shad = document.createElement('div');

        // let rad = makeRadius();

        // contain.style.position = 'absolute';
        // contain.style.top = this.y - this.size / 2 + 'px';
        // contain.style.left = this.x - this.size / 2 + 'px';
        // contain.style.width = this.size + 'px';
        // contain.style.height = this.size + 'px';

        // dot.style.width = this.size + 'px';
        // dot.style.height = this.size + 'px';
        // dot.style.borderRadius = rad;
        // if (contain != null) contain.appendChild(dot);

        // shad.style.position = 'relative';
        // shad.style.borderRadius = rad;
        // shad.style.width = this.size * 0.3 + 'px';
        // shad.style.height = this.size * 0.3 + 'px';
        // shad.style.top = '12px';
        // shad.style.left = '12px';
        // shad.style.background = 'radial-gradient(circle, white 0%, rgb(234 234 234 / 20%) 100%)';
        // if (contain != null) contain.appendChild(shad);


        // return contain;
    }
}



function WaterDropGlass(options) {
    for (let key in options) {
        if (options.hasOwnProperty(key)) {
            this[key] = options[key];
        }
    }

    this.render();
}

WaterDropGlass.prototype = {

    count: 20,
    dots: null,
    width: 500,
    heigth: 300,
    backgroundColor: 'white',

    build() {
        this.dots = [];

        for (let i = 0; i < this.count; i++) {
            let dot = new Drop({
                size: randomSize(),
                x: Math.round(this.width * Math.random()),
                y: Math.round(this.height * Math.random())
            });

            this.dots.push(dot);
        }
    },

    combine() {
        if (this.dots == null) {
            this.build();
        }

        const len = this.dots.length;

        for (let tk = 0; tk < len; tk++) {
            for (let k = 0; k < len; k++) {
                let dot = this.dots[k];
                for (let i = 0; i < len; i++) {
                    if (i == k) {
                        continue;
                    }

                    let r = ((this.dots[i].size + dot.size) / 2) + 6;
                    if (this.dots[i].size != 0 && dot.size != 0 && 
                        Math.abs(this.dots[i].x - dot.x) <= r&& 
                        Math.abs(this.dots[i].y - dot.y) <= r) {

                        let bigger, smaller;
                        if (this.dots[i].size > dot.size) {
                            bigger = this.dots[i];
                            smaller = dot;
                        }
                        else {
                            bigger = dot;
                            smaller = this.dots[i];
                        }
        
                        bigger.size = Math.ceil(Math.cbrt(Math.pow(bigger.size, 3) + Math.pow(smaller.size, 3)));
                        smaller.size = 0;
                    }
                }
            }
        }
    },

    render: function(target) {
        this.combine();

        let container = document.createElement('div');
        container.style.width = this.width + 'px';
        container.style.height = this.height + 'px';
        container.style.backgroundColor = this.backgroundColor;
        container.style.borderRadius = '10px';
        container.style.boxShadow = '4px 4px 12px 6px rgb(224 224 224 / 30%)';
        container.style.borderTop = '2px solid #EFEFEF';
        container.style.borderLeft = '2px solid #EFEFEF';
        container.style.borderBottom = '2px solid #E0E0E0';
        container.style.borderRight = '2px solid #E0E0E0';
        container.style.position = 'relative';
        container.style.overflow = 'hidden';

        for (let i = 0; i < this.count; i++) {
            setTimeout(() => {
                if (container != null && this.dots[i].size != 0) container.appendChild(this.dots[i].render());
            }, 300);
        }

        if (target != null) target.appendChild(container);
    }
}

const WaterDropPage = ({ data, location }) => {

    const disqusConfig = {
        url: data.site.siteMetadata.siteUrl + location.pathname,
        identifier: location.pathname,
        title: "Water Drop"
    };


    React.useEffect(() => {
        const background = document.querySelector('#gw');
        const glass = new WaterDropGlass({
            count: 50,
            width: background.clientWidth - 10,
            height: 400,
            bkacgroundColor: '#EEEEEE'
        });
        glass.render(background);
    });


    return (
        <Layout pageTitle="Water Drop">
            <div className={styles.container}>
                <h1>Water Drop Effect</h1>

                <div className={styles.glassWindow} style={{backgroundColor: '#FEFEFE'}} id='gw'>
                    
                </div>






                <h2>- Why</h2>
                
                <h2>- How</h2>
                
                <h2>- Use</h2>
                
                <h2>- Conclusion</h2>
                
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


export default WaterDropPage