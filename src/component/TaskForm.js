
import React,{Component} from 'react';



class TaskForm  extends Component{
  state={
     id:'',
    name:'',
    status:true
  }
  onChange=(e)=>{
        var  target=e.target;
        var name=target.name;
        var  value=target.value;
        if('status'===target.name)
        {
         value=target.value==='true'? true:false;
          // console.log(target.value);
        }
        this.setState({
          [name]:value,
        });
      
  }
  componentWillMount(){
    if(this.props.nguoi)
       this.setState({
           id:this.props.nguoi.id,
           name:this.props.nguoi.name,
           status:this.props.nguoi.status
       });
     // console.log("hihi");
  }

  onSubmit=(e)=>{
       e.preventDefault();
      
       this.props.dongform(this.state);
       // console.log(this.state);
       this.cliesxoa();
       this.dongform();
  }
   componentWillReceiveProps(nextProps)
    {
        if(nextProps && nextProps.nguoi)
        {
          this.setState({
            id:nextProps.nguoi.id,
            name:nextProps.nguoi.name,
            status:nextProps.nguoi.status
          });
          // console.log(this.state);
        }else if(nextProps && !nextProps.nguoi)
        {
          this.setState({
            id:"",
            name:"",
            status:true
          });
        }
     }
  dongform=()=>{
     this.props.tatform();
  }
  cliesxoa=()=>{
      this.setState({
        name:'',
        status:false,
      });
   }
  render() {
    return(
          <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title">Thêm Công Việc</h3>
                        <span className="fa fa-times-circle text-right" onClick={this.dongform}>hi</span>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Tên :</label>
                                <input type="text" className="form-control" name="name" onChange={this.onChange} value={this.state.name}/>
                            </div>
                            <label>Trạng Thái :</label>
                            <select className="form-control" required="required" name="status" onChange={this.onChange} value={this.state.status}>
                                <option value={true}>Kích Hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select>
                            <br/>
                            <div className="text-center">
                                <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                                <button type="button" className="btn btn-danger" onClick={this.cliesxoa}>Hủy Bỏ</button>
                            </div>
                        </form>
                    </div>
                </div>
      );
  }
}
export default TaskForm;
