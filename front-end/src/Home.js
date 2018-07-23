import React from 'react';
import './Home.css'

export default function Home(props){
    return <div id={'home'}>
        <h1>Offline Dictionary Browser</h1>
        <p>
            <i>
                Powered by <a href="https://github.com/wordset/wordset-dictionary">Wordset</a>
            </i>
        </p>
        <p>
            Contains 177K words including definitions and synonyms.
        </p>
    </div>;
}