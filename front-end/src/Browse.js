import React from 'react';
import Result from './Result';
import './Browse.css';

export default function Browse(props){
    return <div id={'browse'} className={props.is_mobile ? 'mobile' : null}>
        <nav id="browse-select" style={{width: props.is_mobile ? '100%' : props.window.height / (props.letters.length || 26)}}>
            {props.letters.map(l => <button
                key={l}
                className={l === props.browse_letter ? 'active' : ''}
                onClick={() => props.dispatch({type: 'browse_letter', letter: l})}
            >
                {l.toUpperCase()}
            </button>)}
        </nav>
        <div id="browse-words">
            {
                props.browse_words.map(word => <div
                    key={word}
                    id={word.toLowerCase().replace(/\s/g, '_')}
                    className={`browse-word ${word === props.browse_word ? 'active' : ''}`}
                    onClick={() => props.dispatch({type: 'browse_word', word})}
                >
                    {word}
                </div>)
            }
        </div>
        {
            props.browse_result
                ?
                <div id="result">
                    <h1>{props.browse_result.word}</h1>
                    <Result
                        word={props.browse_result}
                        synonymClick={synonym => props.dispatch({type: 'browse_synonym', synonym})}
                    />
                </div>
                :
                null
        }
    </div>;
}