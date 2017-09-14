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