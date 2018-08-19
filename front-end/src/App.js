import React, {Component} from 'react';
import './App.css';
import Nav from "./Nav";
import Home from './Home';
import Browse from './Browse';
import Search from './Search';

const MOBILE_WIDTH = 900;

class App extends Component {
    constructor(props) {
        super(props);

        ['dispatch'].forEach(m => this[m] = this[m].bind(this));

        this.doing_resize = false;
        window.addEventListener('resize', () => {
            if(this.doing_resize)
                return;
            this.doing_resize = true;
            requestAnimationFrame(() => {
                this.dispatch({type: 'window_resize'});
                this.doing_resize = false;
            });
        });

        this.routes = {
            home: {
                path: '/',
                name: 'Dictionary',
                icon: '📖',
                component: Home
            },
            search: {
                path: '/search',
                name: 'Search',
                icon: '🔍',
                component: Search
            },
            browse: {
                path: '/browse',
                name: 'Browse',
                icon: '📰',
                component: Browse
            },
            not_found: {
                path: '/404',
                name: 'Not Found',
                icon: '😐',
                component: Browse
            }
        };

        const local = (key, fall_back) => localStorage.getItem(key) || fall_back;

        this.state = {
            route: local('route', 'home'),
            window: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            nav_open: false,
            letters: [],
            is_mobile: window.innerWidth <= MOBILE_WIDTH,
            loading: true,
            search_term: local('search_term', ''),
            search_suggestions: [],
            search_result: null,
            browse_letter: local('browse_letter', 'a'),
            browse_words: [],
            browse_word: local('browse_word', null),
            browse_definition: null
        };

        window.App = this;
    }

    componentDidMount(){

        const setup = () => {
            this.props.dict.init().catch(console.error);
            this.props.dict.get_retrieved()
                .then(retrieved => this.dispatch({type: 'progress', retrieved}))
                .catch(console.error);
            this.dispatch({type: 'search_term', term: this.state.search_term});
            this.dispatch({type: 'browse_letter', letter: this.state.browse_letter});
            document.title = this.routes[this.state.route].name;

            Object.keys(this.routes).forEach(route => {
                if(this.routes[route].path === document.location.pathname.replace(process.env.PUBLIC_URL, ''))
                    this.schedule({type: 'request_route', route});
            });
        };
        this.props.dict.get_word('dictionary').then(def => {
            if(def && def.search_term)
                setup();
            else
                this.props.dict.invalidate_cache().then(setup);
        });
    }

    schedule(event){
        setTimeout(() => this.dispatch(event));
    }

    update(event, state){
        switch(event.type){
            case 'window_resize':
                state.window = {
                    width: window.innerWidth,
                    height: window.innerHeight
                };
                state.is_mobile = state.window.width <= MOBILE_WIDTH;
                break;
            case 'toggle_nav':
                state.nav_open =  !state.nav_open;
                break;
            case 'progress':
                state.letters = Object.keys(event.retrieved);
                if(state.letters.length < 26)
                    requestAnimationFrame(() => this.props.dict.get_retrieved()
                        .then(retrieved => this.dispatch({type: 'progress', retrieved}))
                        .catch(console.error));
                else
                    state.loading = false;
                break;
            case 'request_route':
                state.nav_open = false;
                let matching_route = null;
                if(event.route)
                    if(this.routes[event.route])
                        matching_route = event.route;
                if(event.path){
                    const matching_routes = Object.keys(this.routes).filter(r => this.routes[r].path === event.path);
                    if(matching_routes.length)
                        matching_route = matching_routes[0];
                }
                if(matching_route){
                    document.title = this.routes[matching_route].name;
                    state.route = matching_route;
                    localStorage.route = state.route;
                    // window.history.pushState(
                    //     {
                    //         route: state.route
                    //     },
                    //     this.routes[matching_route].name,
                    //     process.env.PUBLIC_URL + this.routes[matching_route].path
                    // );
                }
                else
                    console.error({error: 'invalid route', ...event});
                break;
            case 'search_term':
                const term = localStorage.search_term = state.search_term = event.term;
                if(term){
                    this.props.dict.get_word(term)
                        .then(result => this.dispatch({type: 'search_result', result}))
                        .catch(console.error);
                    if(term.length >= 2)
                        this.props.dict.get_matches(term)
                            .then(suggestions => this.dispatch({type: 'search_suggestions', suggestions}))
                            .catch(console.error);
                }
                else{
                    state.search_suggestions = [];
                    state.search_result = null;
                }
                break;
            case 'search_result':
                state.search_result = event.result;
                break;
            case 'search_suggestions':
                state.search_suggestions = event.suggestions;
                break;
            case 'browse_letter':
                localStorage.browse_letter = state.browse_letter = event.letter.toLowerCase();
                state.browse_words = [];
                state.browse_result = null;
                this.props.dict.get_matches(event.letter, null)
                    .then(words => {
                        this.dispatch({type: 'browse_words', words});
                        if(event.then_select)
                            this.schedule({type: 'browse_word', word: event.then_select, scroll_to: event.then_select});
                    })
                    .catch(console.error);
                break;
            case 'browse_words':
                state.browse_words = event.words;
                break;
            case 'browse_word':
                localStorage.browse_word = state.browse_word = event.word;
                this.props.dict.get_word(event.word)
                    .then(word => this.dispatch({type: 'browse_result', word, scroll_to: event.scroll_to}))
                    .catch(console.error);
                break;
            case 'browse_result':
                state.browse_result = event.word;
                if(event.scroll_to && !state.is_mobile){
                    const id = event.word.word.toLowerCase().replace(/\s/g, '_'),
                        word_el = document.getElementById(id);
                    if(word_el)
                        document.getElementById('browse-words').scrollTop = word_el.offsetTop;
                    else
                        console.error('word id not found', id);
                }
                break;
            case 'browse_synonym':
                const word = event.synonym,
                    letter = word[0].toLowerCase();
                if(state.browse_letter !== letter)
                    this.schedule({type: 'browse_letter', letter, then_select: word});
                else
                    this.schedule({type: 'browse_word', word, scroll_to: word});
                break;
            default:
                console.log(event);
        }
        return state;
    }

    dispatch(event){
        this.setState(state => this.update(event, state));
    }

    render() {
        const Route = this.routes[this.state.route].component;
        return (
            <div id="app" className={this.state.is_mobile ? 'mobile' : ''}>
                <Nav
                    is_mobile={this.state.is_mobile}
                    window={this.state.window}
                    dispatch={this.dispatch}
                    routes={this.routes}
                    open={this.state.nav_open}
                />
                <div id="main">
                    <Route dispatch={this.dispatch} {...this.state} />
                </div>
            </div>
        );
    }
}

export default App;
