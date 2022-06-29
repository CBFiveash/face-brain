import React from "react";
import Tilt from "react-parallax-tilt";
import './Logo.css';
import brain from './brain.png';

const  Logo = () => {
    return (
        <div className='ma4 mt0'>
                <Tilt
                className="tilt-img br2 shadow-2"
                tiltMaxAngleX={35}
                tiltMaxAngleY={35}
                perspective={900}
                scale={1.1}
                transitionSpeed={2000}
                gyroscope={true}>
                <img style={{paddingTop: '5px'}} src={brain} className="inner-element" alt="pic" />
        </Tilt>
      </div>
    );
}
export default Logo;