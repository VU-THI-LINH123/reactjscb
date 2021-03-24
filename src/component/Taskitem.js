
import React,{Component} from 'react';



class Taskitem  extends Component{

 onUpdatestatus=()=>{
 
  this.props.onUpdatestatus(this.props.nguoi.id);

 }
 onDelete=()=>{
  this.props.onDelete(this.props.nguoi.id);
 }
 onUpdate=()=>{
  this.props.onUpdate(this.props.nguoi.id);
 }
  render() {
    var nguoi=this.props.nguoi;
    return(
         <tr>
           <td>{this.props.index}</td>
            <td>{nguoi.name}</td>
              <td className="text-center">
                 <span className={nguoi.status===true?'label label-danger':'label label-success'}
                     onClick={this.onUpdatestatus}
                  >
                      {nguoi.status===true?'kich hoat':'het hang'}
                  </span>
                  </td>
                  <td className="text-center">
                  <button type="button" className="btn btn-warning" onClick={this.onUpdate}>
                  <span className="fa fa-pencil mr-5" ></span>Sửa
                  </button>
                  &nbsp;
                <button type="button" className="btn btn-danger" onClick={this.onDelete}>
                <span className="fa fa-trash mr-5" ></span>Xóa
                </button>
              </td>
            </tr>
      );
  }
}
export default Taskitem;