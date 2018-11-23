import {
	taskLoad,
	commonSenseLoad,
} from './allCommFun'
import debounce from 'lodash.debounce'

var that;

export default function (_this) {
	that = _this;
	window.addEventListener('scroll', debounce(scrollEvent, 100))
}

function scrollEvent() {
	if (getScrollTop() + getWindowHeight() == getScrollHeight()) {

		//判断是不是救援人员任务页面
		if (that.$route.path.indexOf('/rescue/task') !== -1) {
			//已完成数据
			// console.log(that)
			if (that.total < that.pageNum * 10) return;
			that.pageNum++;
			taskLoad(that, that.pageNum)

		} else if (that.$route.path.indexOf('/user/home') !== -1) { //首页 - 加载小常识 和  系统公告

			if (that.total < that.pageNum * 10) return;

			//显示加载动画
			that.isShowLoading = true;

			var pageType = that.currentView == 'sense' ? '1' : '2';
			that.pageNum++;
			commonSenseLoad(that, that.pageNum, pageType)

		}
	}
}


//滚动条在Y轴上的滚动距离
function getScrollTop() {
	var scrollTop = 0,
		bodyScrollTop = 0,
		documentScrollTop = 0;
	if (document.body) {
		bodyScrollTop = document.body.scrollTop;
	}
	if (document.documentElement) {
		documentScrollTop = document.documentElement.scrollTop;
	}
	scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
	return scrollTop;
}

//文档的总高度
function getScrollHeight() {　　
	var scrollHeight = 0,
		bodyScrollHeight = 0,
		documentScrollHeight = 0;　　
	if (document.body) {　　　　
		bodyScrollHeight = document.body.scrollHeight;　　
	}　　
	if (document.documentElement) {　　　　
		documentScrollHeight = document.documentElement.scrollHeight;　　
	}　　
	scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;　　
	return scrollHeight;
}

//浏览器视口的高度

function getWindowHeight() {　　
	var windowHeight = 0;　　
	if (document.compatMode == "CSS1Compat") {　　　　
		windowHeight = document.documentElement.clientHeight;　　
	} else {　　　　
		windowHeight = document.body.clientHeight;　　
	}　　
	return windowHeight;
}
