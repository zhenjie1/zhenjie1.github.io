import Vue from 'vue'
import { rescueType } from './config'

//全局的过滤器
Vue.filter('Rescue', function(value){
	if(value == '') return '未选择';

	value = parseInt(value)

	if ( (value > 0 && value <=6) || value == 100 ) return rescueType[value]
	else return '未知救援'
})

//性别
Vue.filter('sex', function(value){
	if(value == '') return '未知';
	if(isChinese(value)) return value

	value = parseInt(value);

	var str;
	switch(value){
		case 1: str = '男'; break;
		case 2: str = '女'; break;
		case 3: str = '保密'; break;
		default: str = '未知';
	}

	return str;
})


//血型
Vue.filter('bloodType', function(value){
	if(value === '' || value === undefined) return '未设置';

	//判断是不是字母 或 文字
	var isNum = /[a-zA-Z]/g.test(value) || isChinese(value);

	if( isNum ){
		return value
	}else{
		value = parseInt(value)
	}

	var str;
	switch(value){
		case 0: str = 'A'; break;
		case 1: str = 'B'; break;
		case 2: str = 'AB'; break;
		case 3: str = 'O'; break;
		case 4: str = '保密'; break;
		default: str = '未设置';
	}

	return str;
})

function isChinese (str)
{
	if (escape(str).indexOf( "%u" )<0)
	{
	  return false
	} else {
	  return true
	}
}
