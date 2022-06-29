import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
// import { loadFull } from 'tsparticles';
import { useCallback, useMemo } from 'react';

const ParticlesComponent = (props) => {
    const options = useMemo(() => { 
        return {
            // background: {
            //     color: "#000", //this sets background color of canvas
            // },
            // fullScreen: {
            //     enable: true, // enabling makes canvas fill the entire screen (default = true)
            //     zIndex: 0, // used when FS is enabled, 0 = default
            // },
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push", // adds particles on click
                    },
                    onHover :{
                        enable: true,
                        mode: "repulse", // makes particles run away from cursor
                    },
                },
                modes: {
                    push: {
                        quantity: 10, // number of particles added on click
                    },
                    repulse: {
                        distance: 75, // distance of the particles from cursor
                    },
                },
            },
            particles: {
                links: {
                    enable: true,
                    distance: 115, // max distance for linking the particles
                },
                move: {
                    enable: true,
                    speed: { min: 1, max: 3 },
                },
                opacity: {
                    value: { min: 0.3, max: 0.7 },
                },
                size: {
                    value: { min: 1, max: 3 },
                }
            },
        };
    },  []);
const particlesInit = useCallback((engine) => {
    loadSlim(engine);
}, []);

// setting  an id can be useful for identifying the right particles component for multiple instances/reuse
return <Particles id={props.id} init={particlesInit} options={options} />;
};

export default ParticlesComponent;