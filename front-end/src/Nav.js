import React from 'react';
import './Nav.css';

export default function Nav(props){
    const routes = props.routes,
        home = props.routes.home;

    return <div id={props.is_mobile ? 'mobile_nav' : 'side_nav'}>
        <div id="logo" onClick={() => props.dispatch({type: 'request_route', route: 'home'})}>
            <h1>
                <span role="img" aria-label={home.name}>{home.icon}</span>
            </h1>
            <h2>{home.name}</h2>
            {
                props.is_mobile
                    ?
                    <button onClick={e => {
                        e.stopPropagation();
                        props.dispatch({type: 'toggle_nav'});
                    }}>≡</button>
                    :
                    null
            }
        </div>
        <ul id="menu" className={props.is_mobile ? (props.open ? 'open' : 'closed') : ''}>
            {
                Object.keys(routes).filter(r => r !== 'home' && r !== 'not_found').map(id => <li
                    onClick={() => {
                        if(props.is_mobile && ! props.open)
                            return;
                        props.dispatch({type: 'request_route', route: id});
                    }}
                    key={id}
                >
                    <i>
                        <span role="img" aria-label={routes[id].name}>{routes[id].icon}</span>
                    </i>
                    {routes[id].name}
                </li>)
            }
        </ul>
    </div>;
}