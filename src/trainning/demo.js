import {createStore} from 'redux';
import {status,sort} from './index';
var initialState={
	status:false,
	sort:{
		by:'name',
		value:1//1 tang 1//-1 giam1
	}

}
var myReducer=(state=initialState,action)=>{
	if(action.type==='TOGGLE_STATUS')
	{
		   
		var status=!state.status;
		return status;
	}
	if(action.type==='SORT')
	{
		// console.log(action);
		// state.sort={
		// 	by:action.sort.by,
		// 	value:action.sort.value
		// };
		// return state;
		var {by,value}=action.sort;
		return {
			status:!state.status,
			sort:{
				by:by,
				value:value
			}
		}
	}
    return state;
}
const store =createStore(myReducer);
console.log(store.getState());
//thuc hien mot thay doi status
// var action ={type:'TOGGLE_STATUS'};
store.dispatch(status());

console.log('TOGGLE_STATUS:',store.getState());
// var sortaction ={
// 	type:'SORT',
// 	sort:{
// 		by:'name',
// 		value:-1,
// 	}
// };
store.dispatch(sort({
	by:'vu thi linh',
	value:10
}));
console.log('SORT:',store.getState());
