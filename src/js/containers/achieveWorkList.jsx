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