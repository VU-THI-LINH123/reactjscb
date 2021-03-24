
import React,{Component} from 'react';

import TaskForm from './TaskForm';
import Controller from './Controller';
import Tasklist from './Tasklist';

class Bai16  extends Component{
  state={
    mang:[],
    taskform:false,
    nguoi:null,
    filte:{
      name:'',
      status:-1
    },
       keyword:'',

  }
 
   getdata=()=>
   {
    var mang=[
        {
          id:this.getlayid(),
          name:'vu thi linh',
          status:true
        },
        {
          id:this.getlayid(),
          name:'vu thi dung',
          status:true,
        },
        {
          id:this.getlayid(),
          name:'vu tri kien',
          status:false,
        },
        {
          id:this.getlayid(),
          name:'vu tri kien',
          status:false,
        }
    ];
    localStorage.setItem('mang',JSON.stringify(mang));
     var mang=JSON.parse(localStorage.getItem('mang'));
     this.setState({
      mang:mang,
     });
     // console.log(mang)
   }
   s4()
   {
     return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
   }
   getlayid()
   {
    return this.s4()+this.s4()+'-'+this.s4()+'-'+this.s4();
   }
   themcv=()=>{
     if(this.state.nguoi !==null ){
   this.setState({
    taskform:true,
    nguoi:null
   });}else{
    this.setState({
      taskform:!this.state.taskform,
    });
   }
   }
   dongform=(data)=>
   {     
       var mang=this.state.mang;
       // console.log(data);
       if(data.id ===''){
        data.id=this.getlayid();
         mang.push(data);//them phan tu vao mang 
         // console.log(mang);
       }else{
           var index=this.findIndex(data.id);
            mang[index]=data;
             console.log(data.id);
        
       }
         this.setState({
              mang:mang,
              nguoi:null
         });
         
      localStorage.setItem('mang',JSON.stringify(mang));   
   }
   componentWillMount(){
      this.setState({
        mang: JSON.parse(localStorage.getItem('mang'))
      });
  }
   onUpdatestatus=(id)=>{
         var mang=this.state.mang;
       var index=this.findIndex(id);
       console.log(index);
        if(index !==-1)
        {
          mang[index].status=!mang[index].status;
          
          this.setState({
            mang:mang,
          });
           localStorage.setItem('mang',JSON.stringify(mang));
        }
   }
   onDelete=(id)=>{
          var mang=this.state.mang;
       var index=this.findIndex(id);
       // console.log(index);
        if(index !==-1)
        {
          mang.splice(index,1);//xoa phan tu thu index 
          
          this.setState({
            mang:mang,
          });
           localStorage.setItem('mang',JSON.stringify(mang));
        }
   }
   onUpdate=(id)=>{
       
       var index=this.findIndex(id);
       var nguoi=this.state.mang[index];
       // console.log(this.state.nguoi);
        if(index !==-1)
        {
            
          this.setState({
            nguoi:nguoi,
          });
        }
        this.onbatform();
   }
   onbatform=()=>{
    this.setState({
      taskform:true,
    });
    
   }
   findIndex=(id)=>
   {
       // var  check=0;
        var {mang}=this.state;
       // var check=-1;
       //  mang.forEach((pt,index)=>{   //chu y foreach lap lai vo han return gia tri tra ve nhung van lap c2
       //      if(pt.id===id)
       //        {
                  
       //             check=index;
       //         }
       //     }
       //    );
       // return check;

      for(let i=0;i<mang.length;i++) //khi gap return thi vong lap for duoc thoat
      {
        if(mang[i].id===id)
        {
          return i;
        }
      }
      return -1;
   }
   tatform=()=>{

    this.setState({
    taskform:!this.state.taskform,
    nguoi:null
   });
   }
   onFilter=(filtername,filterStatus)=>{
    console.log(filterStatus,'',filtername);
    // console.log(typeof filterStatus)
    filterStatus =parseInt(filterStatus,10);
     // console.log(typeof filterStatus);
     this.setState({
       filte:{
        name:filtername.toLowerCase(),
        status:filterStatus
       }
     });
   
   }
   search1=(keyword)=>{
      this.setState({
        keyword:keyword,
      });
      // console.log(this.state.keyword);
      // console.log(keyword);
   }
  render() {
    var {mang,filte,keyword}=this.state;
    // console.log(filte);
    if(this.state.filte)
    {
      if(filte.name)
      {
        mang=mang.filter((nguoi)=>{
              return nguoi.name.toLowerCase().indexOf(filte.name)!==-1 ;
          
        });
      } 
      }
      mang=mang.filter((nguoi)=>{
        if(filte.status===-1)
        {
          return  nguoi;
        }else{
          return nguoi.status===(filte.status===1? true:false)
        }
      });
   
      if(keyword)
    {
       mang=mang.filter((nguoi)=>{
             if(nguoi.name.toLowerCase().indexOf(keyword)!==-1)
             {
              return nguoi;
           }
        }); 
      }
     var dongmo=this.state.taskform===true?<TaskForm dongform={this.dongform} tatform={this.tatform} nguoi={this.state.nguoi}/>:'';
    
    return(
         
             <div className="container" >
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
            <div className={this.state.taskform?'col-xs-4 col-sm-4 col-md-4 col-lg-4':'col-xs-0 col-sm-0 col-md-0 col-lg-0'}>
              { dongmo }
            </div>
            <div className={this.state.taskform?'col-xs-8 col-sm-8 col-md-8 col-lg-8':'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                <button type="button" className="btn btn-primary" onClick={this.themcv}>
                    <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>
                <button type="button" className="btn btn-primary" onClick={this.getdata} >
                    <span className="fa fa-plus mr-5" ></span>get data
                </button>
               <Controller search1={this.search1} />
                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <Tasklist mang={mang}
                         onUpdatestatus={this.onUpdatestatus}
                         onDelete={this.onDelete}
                         onUpdate={this.onUpdate}
                         onFilter={this.onFilter}
                         />
                    </div>
                </div>
            </div>
        </div>
    </div>
      );
  }
}
export default Bai16;