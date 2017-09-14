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