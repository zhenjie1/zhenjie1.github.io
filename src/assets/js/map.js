import mapLngLat from './LatAndLon'
import { geoconv, findlist } from '../../config/getData.js'

var iconUrl = 'http://zj.tianjistar.com/icon/daohang.png';
var enterStr = null;

var longitude = null,
	latitude = null;

var map, vm;

window.initialize = function () {
	mapLngLat(vm).then(res => {
		longitude = res.Longitude
		latitude = res.Latitude
		var ggPoint = new BMap.Point(longitude, latitude);

		map = new BMap.Map("map");
		map.centerAndZoom(ggPoint, 14);
		map.enableScrollWheelZoom(true);

		map.addEventListener('touchstart', function () {
			document.getElementById('suggestId').blur()
		})

		translateCallback()
		// setTimeout(function () {
		// 	var convertor = new BMap.Convertor();
		// 	var pointArr = [];
		// 	pointArr.push(ggPoint);
		// 	convertor.translate(pointArr, 1, 5, translateCallback)
		// }, 0)

		function translateCallback() {
			new Promise((rej) => {

				let lngAndLat = {
					lng: longitude,
					lat: latitude
				}
				map.setCenter(lngAndLat);

				rej({
					lng: lngAndLat.lng,
					lat: lngAndLat.lat
				})
			}).then(rej => {
				if (enterStr == 'home') {
					getRescue(map, rej)
					inputAuto(map)
				} else if (enterStr == 'rescue') {
					var p1 = new BMap.Point(rej.lng, rej.lat);
					var destinationX = sessionStorage.lngLat.split(',')[1]
					var destinationY = sessionStorage.lngLat.split(',')[0]
					var p2 = new BMap.Point(destinationX, destinationY);
					var driving = new BMap.DrivingRoute(map, {
						renderOptions: {
							map: map,
							autoViewport: true
						}
					});
					driving.search(p1, p2);
				}
			}).catch(e => {
				console.log(e)
			})
		}



		map.setMapStyle({
			styleJson: [{
				"featureType": "railway",
				"elementType": "all",
				"stylers": {
					"color": "#ffffff08"
				}
			}]
		});
	});
};

//关键字搜索
function inputAuto(map) {
	function G(id) {
		return document.getElementById(id);
	}

	var ac = new BMap.Autocomplete( //建立一个自动完成的对象
		{
			"input": "suggestId",
			"location": map
		});

	ac.addEventListener("onhighlight", function (e) { //鼠标放在下拉列表上的事件
		var str = "";
		var _value = e.fromitem.value;
		var value = "";
		if (e.fromitem.index > -1) {
			value = _value.province + _value.city + _value.district + _value.street + _value.business;
		}
		str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

		// value = "";
		if (e.toitem.index > -1) {
			_value = e.toitem.value;
			value = _value.province + _value.city + _value.district + _value.street + _value.business;
		}
		str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
		// G("searchResultPanel").innerHTML = str;
	});

	var myValue;
	ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件

		var _value = e.item.value;
		myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
		// G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
		setPlace(myValue);
	});

	function setPlace(myValue) {
		map.clearOverlays();    //清除地图上所有覆盖物
		function myFun() {
			var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
			map.centerAndZoom(pp, 18);
			map.addOverlay(new BMap.Marker(pp));    //添加标注
		}
		var local = new BMap.LocalSearch(map, { //智能搜索
			onSearchComplete: myFun
		});
		local.search(myValue);
	}
}

export const mouseoverMap = function (val) {
	val = val.split(',')
	map.panTo(new BMap.Point(val[0], val[1]))
}

function getRescue(map, rej) {

	//在当前位置添加图标
	var pt = new BMap.Point(rej.lng, rej.lat);
	var myIcon = new BMap.Icon(iconUrl, new BMap.Size(30, 30));
	var marker2 = new BMap.Marker(pt, {
		icon: myIcon
	});
	map.addOverlay(marker2);

	//获取省市区
	var gc = new BMap.Geocoder()
	gc.getLocation(pt, function (res) {
		res = res.addressComponents.district
		sessionStorage.district = res
	})

	findlist().then(res => {
		res = res.rows;
		sessionStorage.setRescue = JSON.stringify(res)
		var lngLatArr = [];

		if (res instanceof Array) {
			//添加附近救援点
			res.forEach(v => {
				var lngSpan = parseFloat(v['longitude']);
				var latSpan = parseFloat(v['dimensions']);
				var point = new BMap.Point(lngSpan, latSpan);
				addMarker(point, map);
			})
		}
	})
}

// 编写自定义函数,创建标注
function addMarker(point, map) {
	var marker = new BMap.Marker(point);
	map.addOverlay(marker);
}


export const loadScript = function (enter, mvvm) {
	vm = mvvm
	enterStr = enter
	var mapUrl = "https://api.map.baidu.com/api?v=2.0&ak=FdnveqDZGzZHbnx08vngQUBH4BNkzi3C&callback=initialize"
	var getScript = document.getElementsByTagName('script');
	for (let i = 0; i < getScript.length; i++) {
		let src = getScript[i].getAttribute('src');
		if (src == mapUrl) {
			initialize()
			return false;
			break;
		}
	}

	var script = document.createElement("script");
	script.src = mapUrl;
	document.body.appendChild(script);


	var script1 = document.createElement("script");
	script1.src = "https://developer.baidu.com/map/jsdemo/demo/convertor.js";
	document.body.appendChild(script1);

}


//快速排序
function quickSort(arr) {
	//如果数组<=1,则直接返回
	if (arr.length <= 1) {
		return arr;
	}
	var pivotIndex = Math.floor(arr.length / 2);
	//找基准，并把基准从原数组删除
	var pivot = arr.splice(pivotIndex, 1)[0];
	//定义左右数组
	var left = [];
	var right = [];

	//比基准小的放在left，比基准大的放在right
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] <= pivot) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	//递归
	return quickSort(left).concat([pivot], quickSort(right));
}



