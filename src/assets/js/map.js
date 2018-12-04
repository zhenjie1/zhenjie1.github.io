import { findlist } from '../../config/getData.js'

var enterStr = null;

var longitude = null,
	latitude = null;

var map, vm, userMarker;

window.initialize = function () {
	const geographicLocation = vm.$store.state.geographicLocation
	longitude = geographicLocation && geographicLocation.Longitude
	latitude = geographicLocation && geographicLocation.Latitude

	var ggPoint = new BMap.Point(longitude, latitude);

	map = new BMap.Map("map");
	map.centerAndZoom(ggPoint, 19);
	map.enableScrollWheelZoom(true);

	translateCallback(vm)
	// setTimeout(function () {	//经纬度转换
	// 	var convertor = new BMap.Convertor();
	// 	var pointArr = [];
	// 	pointArr.push(ggPoint);
	// 	convertor.translate(pointArr, 1, 5, translateCallback)
	// }, 0)

	function translateCallback(vm) {
		new Promise((resolve) => {
			let lngAndLat = { lng: longitude, lat: latitude };
			map.setCenter(lngAndLat);

			if (enterStr == 'home') {
				getRescue(vm, map, lngAndLat)
				inputAuto(map)
			} else if (enterStr == 'rescue') {
				var p1 = new BMap.Point(lngAndLat.lng, lngAndLat.lat);
				var p2 = new BMap.Point(sessionStorage.lngLat.split(',')[1], sessionStorage.lngLat.split(',')[0]);

				var driving = new BMap.DrivingRoute(map, {
					renderOptions: {
						map: map,
						autoViewport: true
					}
				});
				driving.search(p1, p2);
			}
			resolve()
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
};

window.startMap = function () {
	var myLongitude = this.geographicLocation.Longitude
	var myLatitude = this.geographicLocation.Latitude
	var heLongitude = 113.706701
	var heLatitude = 34.756492
	var myName, heName;
	getGeocoder(myLongitude, myLatitude).then(res => {
		myName = res
	}).then(() => {
		return getGeocoder(heLongitude, heLatitude).then(res => {
			heName = res
		})
	}).then(() => {
		console.log(myName, myLatitude, myLongitude, heName, heLatitude, heLongitude)
		bridge.startMapInAndroid(myName, myLatitude, myLongitude, heName, heLatitude, heLongitude)
	})

}
//更新我的位置
// var myGeography;
window.myGeography = function (latitude, longitude) {
	console.log(latitude,longitude)
	// return
	var point = new BMap.Point(latitude, longitude)
	userMarker.setPosition(point)

	var geographicLocation = {
		Latitude: point.lat,
		Longitude: point.lng
	}
	try {
		vm.$store.dispatch('setGeographicLocation', geographicLocation)
		// map.panTo(point);
	} catch (e) {
		console.error(e)
	}

}

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

function getGeocoder(longitude, latitude) {
	var point = new BMap.Point(longitude, latitude)
	var gc = new BMap.Geocoder();

	return new Promise(resolve => {
		gc.getLocation(point, function (res) {
			resolve(res.address + res.surroundingPois[0]['title'])
		})
	})

}

function getRescue(vm, map, rej) {

	//在当前位置添加图标
	var pt = new BMap.Point(rej.lng, rej.lat);
	addMarker(pt, map, 'user')

	//获取省市区
	var gc = new BMap.Geocoder()
	gc.getLocation(pt, function (res) {
		res = res.addressComponents.district
		vm.$store.dispatch('setDistrict', res)
	})

	//获取救援点
	findlist().then(res => {
		res = res.rows;
		sessionStorage.setRescue = JSON.stringify(res)

		//计算出距离
		level(res, rej);
		res = res.sort(function (a, b) {
			return a.spacing - b.spacing
		})
		if (res instanceof Array) {
			//添加附近救援点
			res.forEach((v, i) => {
				var lngSpan = parseFloat(v['longitude']);
				var latSpan = parseFloat(v['dimensions']);
				var point = new BMap.Point(lngSpan, latSpan);

				addMarker(point, map, 'rescue', i + 1, v);

			})
		}
		// setTimeout(() => upDetaGeography(), 1000)
	})
}

function level(data, myPos) {
	data.map((val, ind) => {
		var lon = Math.abs(val.longitude - myPos.lng);
		var lat = Math.abs(val.dimensions - myPos.lat);

		data[ind].spacing = Math.sqrt(Math.pow(lon, 2) + Math.pow(lat, 2))
	})
}

// 编写自定义函数,创建标注
var onlyMarkerKey;
function addMarker(point, map, type, labelIndex, item) {
	var myIconMax = new BMap.Icon("http://ty.tianjistar.com/static/img/myPosMin.png", new BMap.Size(44, 56));
	var myIconMin = new BMap.Icon("http://ty.tianjistar.com/static/img/myPosMin.png", new BMap.Size(32, 42));

	var rescueIconMax = new BMap.Icon("http://ty.tianjistar.com/static/img/rescueMin.png", new BMap.Size(46, 64));
	var rescueIconMin = new BMap.Icon("http://ty.tianjistar.com/static/img/rescueMin.png", new BMap.Size(34, 46));


	let labelStyleMin = { background: 'none', color: 'white', border: 'none', fontSize: '20px' }
	let labelStyleMax = { background: 'none', color: 'white', border: 'none', fontSize: '28px' }

	var myStyleMin = [myIconMax, [32, 42], labelStyleMin, [10, 4]]
	var resuceStyleMin = [rescueIconMin, [32, 42], labelStyleMin, [10, 4]]
	var resuceStyleMax = [rescueIconMax, [46, 64], labelStyleMax, [14, 6]]

	let marker, label;
	if (type === 'user') {
		marker = new BMap.Marker(point, { icon: myIconMin });
		onlyMarkerKey = marker.ba
		userMarker = marker
		marker.addEventListener('click', function () {
			restore(resuceStyleMin)//把所有的救援点都变小,并删除多余的label
			setLabelStyle(marker, undefined, myStyleMin)//给点击的这个变大
		})
	} else {
		marker = new BMap.Marker(point, { icon: rescueIconMin });
		label = new BMap.Label(labelIndex, { offset: new BMap.Size(10, 4) })
		label.setStyle(labelStyleMin)
		marker.setLabel(label)

		marker.addEventListener('click', function (event, handler) {
			restore(resuceStyleMin)//把所有的救援点都变小,并删除多余的label
			setLabelStyle(marker, label, resuceStyleMax, item.name, point)//只给点击的这个变大
		})
	}
	map.addOverlay(marker);
}

function restore(style) {
	// debugger
	var allOverlay = map.getOverlays();
	for (var i = 0; i < allOverlay.length; i++) {
		try {
			if (allOverlay[i].ba === onlyMarkerKey) continue;
			if (allOverlay[i]['onlyKey'] === '救援名称lable') {
				map.removeOverlay(allOverlay[i])
				continue
			}
			setLabelStyle(allOverlay[i], allOverlay[i].getLabel(), style)
		} catch (e) {

		}
	}
}

function setLabelStyle(marker, label, style, promptTxt, point) {
	if (promptTxt) {
		let nameLabel = new BMap.Label(promptTxt, { position: point, offset: new BMap.Size(10, 4) })
		nameLabel.setStyle({ background: 'rgba(255,255,255,.8)', border: 'none', padding: '2px 8px', boxShadow: '0 2px 6px rgba(0, 0, 0, .2)', borderRadius: '4px', transform: 'translate(-50%, 20px)', marginLeft: '-10px', color: '#333' })
		nameLabel.onlyKey = '救援名称lable'
		map.addOverlay(nameLabel)
	}

	marker.setIcon(style[0])

	if (!label) return
	label.setStyle(style[2])
	label.setOffset(new BMap.Size(style[3][0], style[3][1]))
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

//回到我的位置
export const backMyPosEv = function () {
	var lon = this.geographicLocation.Longitude;
	var lat = this.geographicLocation.Latitude;
	map.panTo(new BMap.Point(lon, lat));
	map.setZoom(18)
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



