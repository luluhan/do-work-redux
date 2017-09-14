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