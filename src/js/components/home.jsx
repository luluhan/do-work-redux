import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <div className="jumbotron">
    <h1>这是一个用来玩的demo</h1>
    <div className="home-text">
      <p className="lead">我们</p>
      <p className="lead">就是那</p>
      <p className="lead">沉迷于写bug改代码</p>
      <p className="lead">个性逗比随性到飞起来</p>
      <p className="lead">牛逼经常吹破天</p>
      <p className="lead">的</p>
      <p className="lead">宇宙青春无敌！呆萌！美少女！！</p>
    </div>
    <p><Link to="/doWorkList" className="btn btn-lg btn-success">去写作业</Link></p>
  </div>
)