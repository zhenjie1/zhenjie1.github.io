<template>
	<div class="update">
		<div class="tit">
			<input type="text" maxlength="20" placeholder="请输入报告的标题" v-model='title'>
		</div>
		<div class="box">
			<div class="con" v-for='(item,i) in arr' @click='cil(i)'>
				<textarea name="" placeholder="请在此输入救援报告信息内容" v-model='arr[i].value'></textarea>
				<div class="item">
					<span>添加照片</span>
					<input type="file" accept="image/*" multiple class="avatarStyle" @change='UpladFile($event)'>
					<input type="hidden" v-model='arr[i].value1'>
					<img :src="arr[i].value1" alt="" :class='arr[i].value1== ""? "hide":"show"'>
					<i class="delet" :class='arr[i].value1== ""? "hide":"show"' @click='delet(i)'>-</i>
				</div>
			</div>
		</div>

		<div class="add" @click='addEle'>+</div>
		<button class="submit" @click='submit'>确认提交</button>
	</div>
</template>

<script>
	import imgUpdate from './imgUpdate'
	import { updateAvatar,dUpload } from '../../../../config/getData'
	export default {
		name:'update',
		data(){
			return {
				title:'',
				index:'',
				arr:[{value:'',value1:''}],
				content:'',
				contentImg:''
			}
		},
		components: {
			imgUpdate
		},
		watch:{
			// arr(a) {
			// 	console.log(a)
			// }
		},
		methods:{
			cil(i) {
				this.index = i
			},
			delet(i) {
				this.arr[i].value1 = ''
			},
			update (file) {
				let param = new FormData()
				  // 创建form对象
				param.append('file', file)  // 通过append向form对象添加数据
				let config = {
	                headers: {'Content-Type': 'multipart/form-data'}
				}
				updateAvatar(param,'upImg',config).then(res => {
					this.arr[this.index].value1 = res.rows.url
				})
			},
			dataURLtoFile(dataurl, filename) {
		    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		    while(n--){
		        u8arr[n] = bstr.charCodeAt(n);
		    }
		    return new File([u8arr], filename, {type:mime});
			},
			photoCompress(file,w,objDiv){
				var that = this;
	      var ready=new FileReader();
	          /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
	          ready.readAsDataURL(file);
	          ready.onload=function(){
	              var re=this.result;
	              that.canvasDataURL(re,w,objDiv)
	      		}
	  	},
	  	canvasDataURL(path, obj, callback){
	         var img = new Image();
	         img.src = path;
	         img.onload = function(){
	          var that = this;
	          // 默认按比例压缩
	          var w = that.width,
	           h = that.height,
	           scale = w / h;
	           w = obj.width || w;
	           h = obj.height || (w / scale);
	          var quality = 0.7;  // 默认图片质量为0.7
	          //生成canvas
	          var canvas = document.createElement('canvas');
	          var ctx = canvas.getContext('2d');
	          // 创建属性节点
	          var anw = document.createAttribute("width");
	          anw.nodeValue = w;
	          var anh = document.createAttribute("height");
	          anh.nodeValue = h;
	          canvas.setAttributeNode(anw);
	          canvas.setAttributeNode(anh); 
	          ctx.drawImage(that, 0, 0, w, h);
	          // 图像质量
	          if(obj.quality && obj.quality <= 1 && obj.quality > 0){
	           quality = obj.quality;
	          }
	          // quality值越小，所绘制出的图像越模糊
	          var base64 = canvas.toDataURL('image/jpeg', quality);
	          // 回调函数返回base64的值
	          callback(base64);
	        }
	    },
	    UpladFile(e) {
	    	var that = this;
	    	this.loadingShow = true;
	      var fileObj = e.target.files[0] // js 获取文件对象
	      if(fileObj.size/1024 > 1025) { //大于1M，进行压缩上传
	          that.photoCompress(fileObj, {
	              quality: 0.5
	          }, function(base64Codes){
	             var bl = that.dataURLtoFile(base64Codes,fileObj.name)
	             that.update(bl)
	          });
	      }else{ //小于等于1M 原图上传
	          that.update(fileObj)
	      }
	    },
			addEle() {
				this.arr.push({value:'',value1:''})
			},
			submit() {
				let arr = this.arr,
					len = arr.length,
					id = this.$route.params.id,
					status = this.$route.params.sta;
				this.content = '';
				this.contentImg = '';
				if(this.title == '') {
					alert('标题不能为空');
					return;
				}
				for(let i=0;i<len;i++) {
					if(i==len-1) {
						this.content += arr[i].value
						this.contentImg += arr[i].value1
					}else {
						this.content += arr[i].value + '%##%'
						this.contentImg += arr[i].value1 + '%##%'
					}
				}	
				if(this.content.replace("%##%","") == '') {
						alert('内容不能为空')
					 	return;
				}
				// 报告1  回访0
				dUpload(id,this.content,this.contentImg,this.title,status).then(res => {
					if(res && res.code == 2) {
						this.$router.go(-1)
					}
				})
			}
		},
		mounted() {
			// console.log(this.arr[1].vaule)
		}
	}
</script>

<style lang='scss' scoped>
	.update {
		position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: #f5f5f5;
    z-index: 11;
    .submit {
    	background-color: #f02b2b;
    	position: fixed;
    	bottom: 0;
    	left: 0;
    }
    .tit {
    	background-color: #fff;
    	padding: 10px 0;
    	margin-bottom: 10px;
    	input {
    		width: 100%;
    		border: none;
    		padding: 10px;
    		font-size: 14px;
    	}
    }
    .box {
    	.con {
	    	background-color: #fff;
	    	padding: 10px;
	    	display: flex;
	    	margin-bottom: 10px;
	    	textarea {
	    		border:none;
	    		width: 60%;
	    		height: 120px;
	    		font-size: 14px;
	    		resize:none;
	    	}
	    	.item {
		    	width: 100px;
		    	height: 100px;
		    	border: 1px dashed #ccc;
		    	position: relative;
		    	margin: 10px 0 0 10px;
		    	.delet {
		    		width: 16px;
		    		height: 16px;
		    		line-height: 13px;
		    		border-radius: 50%;
		    		position: absolute;
		    		right: -5px;
						top:-5px;
						background-color: #f02b2b;
						color: #fff;
						text-align: center;
						font-size: 20px;
		    	}
		    	img {
		    		width: 100%;
		    		height: 100%;
		    		position: absolute;
		    		top: 0;
		    		left: 0;
		    	}
		    	.hide {
		    		display: none;
		    	}
		    	span {
		    		width: 100%;
		    		text-align: center;
		    		position: absolute;
		    		left: 50%;
		    		top: 50%;
		    		transform:translate(-50%,-50%);
		    	}
		    	input {
		    		opacity: 0;
		    		width: 100%;
		    		height: 100%;
		    	}
		    }
	    }	    
    }
    .add {
    	width: 90%;
    	height: 40px;
    	text-align: center;
    	line-height: 40px;
    	font-size: 20px;
    	color: #f02b2b;
    	border: dashed 1px #f02b2b;
    	margin: 10px auto;
			margin-bottom: 60px;
    }
	}
</style>