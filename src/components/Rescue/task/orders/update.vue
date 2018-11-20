<template>
	<div class="update">
		<div class="tit">
			<input type="text" maxlength="20" :placeholder='"请输入" + reportAndReturn + "的标题"' v-model='title'>
		</div>
		<div class="box">
			<div class="con" v-for='(item,i) in arr' :key="i" @click='cil(i)'>
				<textarea name="" :placeholder="'请在此输入救援' + reportAndReturn + '信息内容'" v-model='arr[i].value'></textarea>
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
import { updateAvatar, dUpload } from '../../../../config/getData'
export default {
	name: 'update',
	data() {
		return {
			title: '',
			index: '',
			arr: [{ value: '', value1: '' }],
			content: '',
			contentImg: '',
			reportAndReturn: ''
		}
	},
	components: {
		imgUpdate
	},
	methods: {
		cil(i) {
			this.index = i
		},
		delet(i) {
			this.arr[i].value1 = ''
		},
		update(file) {
			let param = new FormData()
			// 创建form对象
			param.append('file', file)  // 通过append向form对象添加数据
			let config = {
				headers: { 'Content-Type': 'multipart/form-data' }
			}
			updateAvatar(param, 'upImg', config).then(res => {
				this.arr[this.index].value1 = res.rows.url
			})
		},
		dataURLtoFile(dataurl, filename) {
			var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			return new File([u8arr], filename, { type: mime });
		},
		photoCompress(file, w, objDiv) {
			var that = this;
			var ready = new FileReader();
			/*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
			ready.readAsDataURL(file);
			ready.onload = function () {
				var re = this.result;
				that.canvasDataURL(re, w, objDiv)
			}
		},
		canvasDataURL(path, obj, callback) {
			var img = new Image();
			img.src = path;
			img.onload = function () {
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
				if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
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
			if (fileObj.size / 1024 > 1025) { //大于1M，进行压缩上传
				that.photoCompress(fileObj, {
					quality: 0.5
				}, function (base64Codes) {
					var bl = that.dataURLtoFile(base64Codes, fileObj.name)
					that.update(bl)
				});
			} else { //小于等于1M 原图上传
				that.update(fileObj)
			}
		},
		addEle() {
			this.arr.push({ value: '', value1: '' })
		},
		submit() {
			let arr = this.arr,
				len = arr.length,
				id = this.$route.params.id,
				status = this.$route.params.sta;
			this.content = '';
			this.contentImg = '';
			if (this.title == '') {
				this.$vux.toast.text('标题不能为空');
				return;
			}
			for (let i = 0; i < len; i++) {
				if (i == len - 1) {
					this.content += arr[i].value
					this.contentImg += arr[i].value1
				} else {
					this.content += arr[i].value + '%##%'
					this.contentImg += arr[i].value1 + '%##%'
				}
			}
			if (this.content.replace("%##%", "") == '') {
				this.$vux.toast.text('内容不能为空')
				return;
			}
			// 报告1  回访0
			dUpload(id, this.content, this.contentImg, this.title, status).then(res => {
				if (res && res.code == 2) {
					this.$router.go(-1)
				}
			})
		}
	},
	created() {
		const status = this.$route.params.sta;
		document.title = status == '0' ? '上传回访' : '上传报告'
		this.reportAndReturn = document.title.replace('上传', '')

	}
}
</script>

<style lang='scss' scoped>
.update {
  position: fixed;
  background-color: #f5f5f5;
  height: 100%;
  left: 0;
  overflow-y: auto;
  top: 0;
  width: 100%;
  z-index: 11;
  .submit {
    position: fixed;
    background-color: #f02b2b;
    bottom: 0;
    left: 0;
  }
  .tit {
    background-color: #ffffff;
    margin-bottom: 10px;
    padding: 10px 0;
    input {
      border: none;
      font-size: 14px;
      padding: 10px;
      width: 100%;
    }
  }
  .box {
    .con {
      background-color: #ffffff;
      display: flex;
      margin-bottom: 10px;
      padding: 10px;
      textarea {
        border: none;
        font-size: 14px;
        height: 120px;
        resize: none;
        width: 60%;
      }
      .item {
        position: relative;
        border: 1px dashed #cccccc;
        height: 100px;
        margin: 10px 0 0 10px;
        width: 100px;
        .delet {
          position: absolute;
          background-color: #f02b2b;
          border-radius: 50%;
          color: #ffffff;
          font-size: 20px;
          height: 16px;
          line-height: 13px;
          right: -5px;
          text-align: center;
          top: -5px;
          width: 16px;
        }
        img {
          position: absolute;
          height: 100%;
          left: 0;
          top: 0;
          width: 100%;
        }
        .hide {
          display: none;
        }
        span {
          position: absolute;
          left: 50%;
          text-align: center;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
        }
        input {
          height: 100%;
          opacity: 0;
          width: 100%;
        }
      }
    }
  }
  .add {
    border: dashed 1px #f02b2b;
    color: #f02b2b;
    font-size: 20px;
    height: 40px;
    line-height: 40px;
    margin: 10px auto;
    margin-bottom: 60px;
    text-align: center;
    width: 90%;
  }
}
</style>
