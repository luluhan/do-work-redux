import React from 'react'

import { Route, Switch } from 'react-router-dom'
import Header from '../components/header'
import Home from '../components/home'
import AchieveWorkList from './achieveWorkList'
import DoWorkList from './doWorkList'
import AchieveWorkDetail from './achieveWorkDetail'
import DoWorkDetail from './doWorkDetail'

import '../../styles/assets.css'
import '../../styles/main.scss'
import '../../styles/bootstrap-polyfill.css'

export default () => {
  return (
    <div className="container">
      <Header />
      <div className="m-container">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/achieveWorkList" component={AchieveWorkList}/>
          <Route path="/doWorkList" component={DoWorkList}/>
          <Route path="/work/:id" component={AchieveWorkDetail}/>
          <Route path="/doWork/:id" component={DoWorkDetail}/>
        </Switch>
      </div>
    </div>
  )
}