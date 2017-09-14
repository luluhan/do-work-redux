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