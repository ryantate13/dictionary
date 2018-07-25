import React from 'react';

function capitalize(word){
    return word ? word[0].toUpperCase() + word.slice(1) : '';
}

export default function Result(props){
    return <div id={'results'}>
        <h1>{props.word.word}</h1>
        <h3>Definitions:</h3>
        <ol>
            {
                props.word.meanings.map(d => <div className="result" key={d.id}>
                    <li>
                        <b>{capitalize(d.speech_part + ':')}</b> {capitalize(d.def)}
                        {
                            d.synonyms && d.synonyms.length
                                ?
                                <div>
                                    <b>Synonyms: </b>
                                    {
                                        d.synonyms.map((s,i) => <span key={s}>
                                            <a
                                                href={`/search/${s}`}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    props.synonymClick(s)
                                                }}
                                            >
                                                {s}
                                            </a>
                                            {i === d.synonyms.length -1 ? '' : ', '}
                                        </span>)
                                    }
                                </div>
                                :
                                null
                        }
                    </li>
                </div>)
            }
        </ol>
    </div>
}