### 本项目基于react+redux的前端开发流程

下面举个例子，写个作业系统的简易demo，来看看整个的开发流程吧。

首先，我们来看看这个实例的原型：
![图1](http://os8ri8oj4.bkt.clouddn.com/QQ20170912-0@2x.png)
![图2](http://os8ri8oj4.bkt.clouddn.com/QQ20170912-1@2x.png)
![图3](http://os8ri8oj4.bkt.clouddn.com/QQ20170912-2@2x.png)
![图4](http://os8ri8oj4.bkt.clouddn.com/QQ20170913-0@2x.png)
![图5](http://os8ri8oj4.bkt.clouddn.com/QQ20170913-1@2x.png)
![图6](http://os8ri8oj4.bkt.clouddn.com/QQ20170913-2@2x.png)

这个原型图已经很清晰了，你大概知道他的功能了吧。

它可以做三件事：加作业；写作业；查作业；

### RESTful API设计

数据接口使用[RESTful API](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)接口。

例如：  

新增一个作业(addWork)使用POST请求，JSON数据包含在body中，url如下：  

```
POST  ／api／work
```  

写作业(doWork)其实也是一个更新的过程，使用PUT请求，例如，更新一个id为1的作业，其url如下： 

```
PUT  ／api／work／1
``` 

查看作业使用GET请求，例如，查看id为1的作业，其url如下：

```
GET  ／api／work／1
``` 

待完成作业列表，其url如下：

```
GET  ／api／doWork
``` 

已完成作业列表，其url如下：

```
GET  ／api／achieveWork
``` 

### redux数据流  

redux的数据流是单向循环的，就像一个生产的流水线：


```
store(存放状态) -> container(显示状态) -> reducer(处理动作) -> store
```

* store是应用的状态管理中心，保存着应用的状态(state)，当收到状态的更新时，会触发视觉组件进行更新。 
* container是视觉组件的容器，负责把传入的状态变量渲染成视觉组件，在浏览器显示出来
* reducer是动作(action)的处理中心，负责处理各种动作并产生新的状态(state)，返回给store

*从对象的包含关系上讲，reducer是store的一部分，但在逻辑上我们把它分出来，这样会比较容易理解整个redux流程*  

redux只是定义了应用的数据流程，只解决了“数据层”的问题，一般还会使用react，angular等作为“显示层”来一起使用。  

### 按任务分工来分步讲解  

按照开发的内容，我们把项目分成两组：“布局” 和 “逻辑”，一共四种任务。  

* 布局组－负责container、component部分
	* 任务1：静态布局－使用html＋css静态布局
	* 任务2：动态布局－使用jsx语法对静态布局做动态渲染处理
* 逻辑组－负责action、reducer部分
	* 任务1：action开发－制作redux流程的action
	* 任务2：reducer开发－制作redux流程的reducer

==布局组==要求对html＋css布局比较熟悉，只需要会简单的js即可，不需要完整地理解redux流程。  

==逻辑组==要求对js比较熟悉，最好可以比较完整地理解redux流程，但基本不需要涉及html＋css布局工作。 

### 布局组

任务1: 静态布局  

任务内容：  

* 容器组件(container)：已完成作业容器(主页)、待完成作业容器（作业清单）、已完成作业详情容器、写作业详情容器
* 显示组件(component)：页面头部组件、首页显示组件、新增作业弹框组件、作业模块组件

redux的组件分为两类，一类是容器组件container，一类是普通显示组件component。容器负责接收store中的state和发送action。大多数时候需要和store直接连接，容器一般不需要多次使用。普通组件放在容器里面，由容器确定显示的时机、数量和内容，普通组件通常都会多次使用。  

1.页面头部组件  

components/header.jsx的代码如下：  

```js
import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.PureComponent {
  render() {
    return (
      <nav className="navbar navbar-light bg-faded">
        <Link to="/" className="navbar-brand">作业系统</Link>
        <ul className="nav navbar-nav pull-right">
          <li className="nav-item"><Link to="/achieveWorkList" className="nav-link">主页</Link></li>
          <li className="nav-item"><Link to="/doWorkList" className="nav-link">作业清单</Link></li>
        </ul>
      </nav>
    )
  }
}

export default Header
```  

[关于react中路由的使用](http://www.jianshu.com/p/e3adc9b5f75c)   

2.首页显示组件  

components/home.jsx的代码如下：  

```js
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
```

3.已完成作业容器(主页)

containers/achieveWorkList.jsx的代码如下：  

```js
import React from 'react'
import Work from '../components/work'

class AchieveWorkList extends React.PureComponent {
  render() {
    const workData = [{
      id: 1,
      title: '什么是https？',
      desc: '简单地讲， HTTPS 是加过密的 HTTP。这样，由于网路上传输的数据是加密的，在浏览网页时，除了你自己可以看到你在看什么网页，第三方是无法得知你在干什么的。'
    },{
      id: 2,
      title: '什么是https？',
      desc: '简单地讲， HTTPS 是加过密的 HTTP。这样，由于网路上传输的数据是加密的，在浏览网页时，除了你自己可以看到你在看什么网页，第三方是无法得知你在干什么的。'
    }]
    const type = 'achieve'

    return (
      <div className="main-body">
        <div className="page-header">
          <h4>作业列表 <small>已完成作业</small></h4>
        </div>
        <div className="work-box row">
          {
            workData.length
            ? workData.map((item) => {
              return <Work data={item} type={type} key={item.id} />
            })
            : <h4>你还没有完成任何作业～</h4>
          }
        </div>
      </div>
    )
  }
}

export default AchieveWorkList
```  
在已完成作业列表里调用了一个作业块模块组件（componenets/work.jsx），这个组件在待完成作业列表里也用到了。  

4.作业模块组件  

components/work.jsx的代码如下：  

```js
import React from 'react'
import { Link } from 'react-router-dom'

class Work extends React.PureComponent {
  render() {
    const { data, type } = this.props
    return (
      <div className="col-lg-4">
        <h2>{data.title}</h2>
        <p>{data.desc}</p>
        {
          type === 'achieve'
          ? <p><Link to={`/work/${data.id}`} className="btn btn-primary">查看详情</Link></p>
          : <p><Link to={`/doWork/${data.id}`} className="btn btn-primary">写作业</Link></p>
        }
      </div>
    )
  }
}

export default Work
```  

5.待完成作业容器(作业清单)  

containers/doWorkList.jsx的代码如下：  

```js
import React from 'react'
import Modal from '../components/Modal'
import Work from '../components/work'

class DoWorkList extends React.PureComponent {
  state = {
    isModalOpen: false
  }
  addWork = (isModalOpen) => {
    this.setState({
      isModalOpen
    })
  }
  render() {
    const workData = [{
      id: 1,
      title: '什么是https？',
      desc: '简单地讲， HTTPS 是加过密的 HTTP。这样，由于网路上传输的数据是加密的，在浏览网页时，除了你自己可以看到你在看什么网页，第三方是无法得知你在干什么的。'
    },{
      id: 2,
      title: '什么是https？',
      desc: '简单地讲， HTTPS 是加过密的 HTTP。这样，由于网路上传输的数据是加密的，在浏览网页时，除了你自己可以看到你在看什么网页，第三方是无法得知你在干什么的。'
    }]
    const type = 'doing'
    return (
      <div className="main-body">
        <div className="page-header">
          <h4>作业列表 <small>待完成作业</small></h4>
          <button className="btn btn-primary pull-right" onClick={() => { this.addWork(true) }}>加作业</button>
          <Modal isOpen={this.state.isModalOpen} />
        </div>
        <div className="work-box row">
          {
            workData.map((item) => {
              return <Work data={item} type={type} key={item.id} />
            })
          }
        </div>
      </div>
    )
  }
}

export default DoWorkList
```  

这个容器中还使用了一个新增作业的弹框组件。  

6.新增作业弹框组件  

components/Modal/index.jsx的代码如下：  

```js
import React from 'react'
import './index.css'

class Modal extends React.PureComponent {
  render() {
    return (
      <form className={this.props.isOpen ? 'modal fade in' : 'modal fade'}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="input-group">
                <span className="input-group-addon">标题</span>
                <input type="text" className="form-control" placeholder="title" />
              </div>
              <div className="form-group">
                <textarea className="form-control" rows="3" placeholder="描述"></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default">
                关闭
              </button>
              <button type="button" className="btn btn-primary">
                提交
              </button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default Modal
```  

7.已完成作业详情容器  

containers/achieveWorkDetail.jsx的代码如下：  

```js
import React from 'react'
import ReactMarkdown from 'react-markdown'

class AchieveWorkDetail extends React.PureComponent {
  render() {
    const content = '### http存在的安全隐患  \n\n 1. http明文传输不仅会泄露数据，也很容易被人注入数据比如某运营商的套餐售卖信息并不是原网页的内容，而是网页数据经过运营商服务时被强行注入的数据。这个情况，业内叫`流量劫持`。  \n\n 2. http不仅内容不是加密的，协议本身也不是加密的，于是协议指令本身也可能被修改 \n\n 3. HTTP 传输的 Web 网页中对于系统设备的授权是统一的比如你去访问一个视频聊天网站，需要访问你手机上的摄像头，你同意了。但是万万没想到，这个页面在通过某个网络节点的时候，被黑客注入了一段代码，在这个时候，注入的脚本在浏览器看来，已经是原网页的一部分，自然就有了对镜头的访问权限。我天，一大波xx门事件即将泄露。'
    return (
      <div className="main-body">
        <div className="bs-callout bs-callout-danger">
          <h4>什么是https</h4>
          <p>简单地讲， HTTPS 是加过密的 HTTP。这样，由于网路上传输的数据是加密的，在浏览网页时，除了你自己可以看到你在看什么网页，第三方是无法得知你在干什么的</p>
        </div>
        <ReactMarkdown source={content} />
      </div>
    )
  }
}

export default AchieveWorkDetail
```  

这里用了一个Markdown格式转换的工具[react-markdown](https://github.com/rexxars/react-markdown)  

8.写作业详情容器  

containers/doWorkDetail.jsx的代码如下：  

```js
import React from 'react'

class DoWorkDetail extends React.PureComponent {
  render() {
    return (
      <div className="main-body">
        <form>
          <div className="bs-callout bs-callout-danger">
            <h4>标题：什么是https</h4>
            <p>描述：简单地讲， HTTPS 是加过密的 HTTP。这样，由于网路上传输的数据是加密的，在浏览网页时，除了你自己可以看到你在看什么网页，第三方是无法得知你在干什么的</p>
          </div>
          <div className="form-group">
            <textarea className="form-control" placeholder="写答案"></textarea>
          </div>
          <button className="btn btn-primary pull-right">提交作业</button>
        </form>
      </div>
    )
  }
}

export default DoWorkDetail
```  

好了，框架已经完成了，至于css部分，集成了bootstrap框架的样式。  

在index.html中引入bootstrap.css:  

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>作业系统</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <link href="http://cdn.bootcss.com/bootstrap/4.0.0-alpha/css/bootstrap.css" rel="stylesheet">
</head>
<body>
  <div id="app" class="app"></div>

  <script>__REACT_DEVTOOLS_GLOBAL_HOOK__ = parent.__REACT_DEVTOOLS_GLOBAL_HOOK__</script>
  <script type="text/javascript" src="/assets/app.js"></script>
</body>
</html>
```  

[bootstrap使用教程](http://v3.bootcss.com/components/)  

这就是任务1的内容，html＋css。  

未完成，待续～









