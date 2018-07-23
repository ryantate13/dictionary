import React from 'react';
import './Loading.css';

export default function Loading(props){
    const color = props.progress < .3334
        ?
        'red'
        :
        props.progress < .6667
            ?
            'yellow'
            :
            'green';

    return <div id="loading">
        <h4>Loading Dictionary Data...</h4>
        <div id="progress">
            <div id="progress-bar" style={{width: (props.progress * 100) + '%', backgroundColor: color}}/>
        </div>
    </div>;
}