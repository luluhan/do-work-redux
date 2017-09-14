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