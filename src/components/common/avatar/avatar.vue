<template>
	<div class="avatar" v-if="show">
		<div class="bg" @click='show = false'></div>
		<div class="content">
			<div class="item">
				<span>拍照</span>
				<input type="file" accept="image/*" capture="camera" class="avatarStyle" @change='UpladFile($event)'>
			</div>
			<div class="item">
				<span>从相册选择</span>
				<input type="file" accept="image/*" multiple class="avatarStyle" @change='UpladFile($event)'>
			</div>
			<div class="cell item" @click='show = false'>取消</div>
		</div>
		<loading :show="loadingShow" text="正在上传"></loading>
	</div>
</template>

<script>
import { updateAvatar } from '../../../config/getData'
import Loading from 'vux/src/components/loading/'

export default {
	data() {
		return {
			show: false,
			loadingShow: false,
			base:''
		};
	},
	props: ["value"],
	watch: {
		show(val) {
			this.$emit('input',val)
		},
		value: {
			handler: function(val) {
			this.show = val;
			},
			immediate: true
		}
	},
	methods:{
		update (file) {
			let param = new FormData()
			  // 创建form对象
			param.append('file', file)  // 通过append向form对象添加数据
			let config = {
                headers: {'Content-Type': 'multipart/form-data'}
			}
			updateAvatar(param,'upImg',config).then( res => {
				if(res == undefined) {
					this.loadingShow = false;
				}else {
					this.$emit('showOk',res.msg, res.rows.url);
					this.loadingShow = false;
				}
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
    }
	},
	components:{
		Loading
	},
	mounted() {
		this.show = this.value;
		
	}
};
</script>


<style lang="scss" scoped>
@import '../../../assets/css/all';

.avatar {@include screen;background-color:transparent;
	.bg{@include screen;background-color:rgba(0,0,0,.5);}
	.item{background-color: white;line-height: 60px;text-align: center;font-size:16px;position: relative;}
	.item + .item{border-top:1px solid #f0f0f0;}
	.cell{margin-top:10px;}
	.content{background-color: #f5f5f5;position: absolute;width:100%;left:0;bottom:0;
	}

}

</style>
