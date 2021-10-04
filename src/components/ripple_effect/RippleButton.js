import * as React from 'react'
import * as styles from './RippleButton.module.css'


const mainButtonStyle = {
    borderRadius: '4px',
    backgroundColor: '#3949AB',
    color: 'white',
    width: '150px',
    height: '36px',
    margin: '6px 10px',
    position: 'relative',
    overflow: 'hidden'
};


const ObjectCopy = (a, b) => {
    const temp = Object.assign({}, a);
    return Object.assign(temp, b);
};


const RippleButton = ({ children, setClickListener, buttonStyle }) => {
    const applicateStyle = (buttonStyle == null? mainButtonStyle : ObjectCopy(mainButtonStyle, buttonStyle));

    return (
        <button className={styles.mainButton} style={applicateStyle} onClick={e => {
            const x = e.pageX - e.target.offsetLeft;
            const y = e.pageY - e.target.offsetTop;

            const ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            e.target.appendChild(ripples);

            setTimeout(() => {
                ripples.remove();
                if (setClickListener != null) setClickListener(e);
            }, 350);
        }}>
            {children}
        </button>
    )
}


export default RippleButton