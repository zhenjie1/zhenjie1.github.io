<template>
	<div class="hello">
		<div class="imgUPTit w94">添加图片</div>
	    <div class="upload">
	      <div class="upload_warp w94">
	      	<div class="upload_warp_img">
		        <div class="upload_warp_img_div" v-for="(item,index) of imgList">
		          	<div class="upload_warp_img_div_top" @click="fileDel(index)">
			            <span class="iconfont icon-shanchu" ></span>
		            	点击删除
		          	</div>
		          	<img :src="item.file.src" class="imgWH">
		        </div>
		        <div class="upload_warp_left fl" @click="fileClick()">
		          <img src="./upload.png">
		          <div class="upImgBtn">点击添加社保照片、住院证明</div>
		        </div>
		    </div>
	      </div>
	      <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
	    </div>
  </div>
</template>

<script>
	import { insUpImages } from '../../../config/getData'
	export default {
//		props:{
//			imgDataArr:[]
//		},
		data(){
			return {
				imgList: [],
    		size: 0.,
    		imgDataArr:[]
			}
		},
		methods:{
			fileClick() {
	            document.getElementById('upload_file').click()
                  	
	            
	        },
	        fileChange(el) {
              	if (!el.target.files[0].size) return;
              	this.fileList(el.target);
              	el.target.value = ''
          	},
          	fileList(fileList) {
              	let files = fileList.files;
              	for (let i = 0; i < files.length; i++) {
                  //判断是否为文件夹
                  if (files[i].type != '') {
                      this.fileAdd(files[i]);
                  } else {
                      //文件夹处理
                      this.folders(fileList.items[i]);
                  }
              	}
          	},
          	//文件夹处理
          	folders(files) {
              	let _this = this;
              	//判断是否为原生file
              	if (files.kind) {
                  	files = files.webkitGetAsEntry();
              	}
              	files.createReader().readEntries(function (file) {
                 	 for (let i = 0; i < file.length; i++) {
                      	if (file[i].isFile) {
                          	_this.foldersAdd(file[i]);
                      	} else {
                          	_this.folders(file[i]);
                      	}
                  	}
              	})
          	},
          	foldersAdd(entry) {
              	let _this = this;
              	entry.file(function (file) {
                  	_this.fileAdd(file)
              	})
          	},
          	fileAdd(file) {
            	//总大小
            	this.size = this.size + file.size;
            	//判断是否为图片文件
            	if (file.type.indexOf('image') == -1) {
                	file.src = 'wenjian.png';
                	this.imgList.push({
                    	file
                	});
            	} else {
              	let reader = new FileReader();
              	reader.vue = this;
              	reader.readAsDataURL(file);
              	reader.onload = function () {
                	file.src = this.result;
                	//图片路径
                	this.vue.imgList.push({
                    	file
                	});
                	//选中file存入本地
                	localStorage.ImgThis =  JSON.stringify(this.vue.imgList)
              	let param = new FormData()  // 创建form对象
				        param.append('file', file)  // 通过append向form对象添加数据	
    						let config = {
    		          headers: {'Content-Type': 'multipart/form-data'}
    						}
                insUpImages(param,'upImg',config).then(res => {
                  	reader.vue.imgDataArr.push(res.rows.url)
                  	localStorage.ImgDataArr = JSON.stringify(reader.vue.imgDataArr)
                })
            	} 
            }
        	},
          	fileDel(index) {
          		//删除本地储存的localStorage.ImgDataArr第index
          		this.imgDataArr.splice(index,1)
          		localStorage.ImgDataArr = JSON.stringify(this.imgDataArr)
          		// //删除本地储存的localStorage.ImgThis第index
          		this.imgList.splice(index,1)
          		localStorage.ImgThis =  JSON.stringify(this.imgList)
          	},
          	dragenter(el) {
              	el.stopPropagation();
              	el.preventDefault();
          	},
          	dragover(el) {
              	el.stopPropagation();
              	el.preventDefault();
          	},
          	drop(el) {
              	el.stopPropagation();
              	el.preventDefault();
              	this.fileList(el.dataTransfer);
          	},
          	retuenPageHis(){
          		this.$router.back(-1)
			}
		},
		mounted(){
			//imgList赋值
			if (localStorage.ImgThis != undefined) {
				this.imgList = JSON.parse(localStorage.ImgThis)
			}
		}
	}
</script>

<style scoped>
	.fr {float: right;}
	.fl {float: left;}
	.clearfix:after {content: "";display: block;clear: both;}
    .upload_warp_img_div_del {
      width: 16px;
    }
    .upload_warp_img_div_top {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 30px;
      background-color: rgba(0, 0, 0, 0.4);
      line-height: 30px;
      text-align: left;
      color: #fff;
      font-size: 12px;
      text-indent: 4px;
      text-align: center;
    }

    .upload_warp_img_div_text {
      white-space: nowrap;
      width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .upload_warp_img_div img {
      max-width: 100%;
      max-height: 100%;
    }

    .upload_warp_img_div {
      position: relative;
      height: 98px;
      width: 99%;
      margin: 0px 5px 20px 0px;
      float: left;
      line-height: 100px;
      display: table-cell;
      text-align: center;
      background-color: #eee;
      cursor: pointer;
      border-radius: 10px;
      overflow: hidden;
    }

    .upload_warp_img {
      overflow: hidden
    }

    .upload_warp_text {
      text-align: left;
      margin-bottom: 10px;
      padding-top: 10px;
      text-indent: 14px;
      border-top: 1px solid #ccc;
      font-size: 14px;
    }

    .upload_warp_right {
      float: left;
      width: 57%;
      margin-left: 2%;
      height: 100%;
      border: 1px dashed #999;
      border-radius: 4px;
      line-height: 130px;
      color: #999;
    }

    .upload_warp_left img {
      margin-top: 16px;
      width: 24px;
      background-color: #fff;
    }

    .upload_warp_left {
      float: left;
      width: 99%;
      height: 98px;
      border-radius: 10px;
      cursor: pointer;
      background-color: #fff;
    }

    .upload_warp {
      /*padding: 3% 5%;*/
    }

    .upload {
      
      width: 100%;
      
    }

    .hello {
      width: 100%;
      text-align: center;
      position: fixed;
		left:0;top:0;
		width:100%;
		height:100%;
		padding-bottom: 50px;
		overflow-y: auto;
		background-color: #f5f5f5;
    }
    .imgWH {width: 100%;height:98px;}
    .claimsHead {position: relative;height: 44px;}
	.claimsHeada {position: absolute;left: 20px;top: 50%;margin-top: -8px;font-size: 16px;height: 16px;}
	.claimsHead h4 {width: 100%;line-height: 44px;color: #000;text-align: center;font-size: 16px;background-color: #fff;}
	.claimsCon {width: 94%;padding: 0 3%;margin-top: 20px;color: #000;font-size: 14px;line-height: 26px;letter-spacing: 1px;}
	.imgUPTit {text-align: left;font-size: 15px;line-height: 30px;margin-top: 20px;margin-bottom: 10px;font-weight: 600;}
	.w94 {width: 92%;padding: 0 4%;}  
	.upImgBtn {line-height: 20px;color: #f02b2b;font-size: 14px;margin-top: 10px;}


</style>