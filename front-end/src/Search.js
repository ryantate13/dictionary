import React from 'react';
import Loading from './Loading';
import Result from './Result';
import './Search.css';

export default function Search(props){
    return <div id={'search'} className={props.is_mobile ? 'mobile' : null}>
        <h1>Search</h1>
        {
            props.loading
                ?
                <Loading progress={props.letters.length / 26} />
                :
                <div>
                    <form onSubmit={e => {
                        e.preventDefault();
                        props.dispatch({type: 'search_term', term: props.search_term})
                    }}>
                        <input
                            list={props.search_suggestions.length ? 'search-suggestions' : null}
                            type="search"
                            value={props.search_term}
                            onChange={e => props.dispatch({type: 'search_term', term: e.target.value})}
                            placeholder={'Enter a search term...'}
                        />
                    </form>
                    {
                        props.search_suggestions.length
                            ?
                            <datalist id="search-suggestions">
                                {
                                    props.search_suggestions.map(s =>  <option key={s} value={s}/>)
                                }
                                <option value="foo"/>
                            </datalist>
                            :
                            null
                    }
                </div>
        }
        {
            props.search_result
                ?
                <Result word={props.search_result} synonymClick={term => props.dispatch({type: 'search_term', term})} />
                :
                null
        }
    </div>;
}