import React from 'react'
// import {render} from 'react-dom'
import {HashRouter, Route, Switch, Redirect,} from 'react-router-dom'
import HelloWorld from './modules/samples/HelloWorld'
import Demo from './modules/samples/Demo'

window.React = React

const router = () => (
    <HashRouter>
        <div className="main">
            <Switch>
                <Route exact path="/" component={Demo}/>
                <Route path="/demo" component={Demo}>
                    <Route path="/hello" component={HelloWorld}/>
                </Route>
            </Switch>
        </div>
    </HashRouter>
)

export default router