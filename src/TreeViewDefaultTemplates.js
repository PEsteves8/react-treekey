import React from 'react';

export let defaultToggle = node => {
        const svg = {
            style: {
             fill: 'white',
             strokeWidth: 0,
             transformOrigin: 'center',
             transform: `rotate(${node.$expanded ? '90deg' : '0'})`
         },
         points: '0,0,0,10,8,5',
         height: 10,
         width: 8
     }

     return <svg height={svg.height} width={svg.width}>
                <polygon points={svg.points} style={svg.style} />
            </svg>
    }

export let defaultHeader = node => {
    return <span>{node.name}</span>
}