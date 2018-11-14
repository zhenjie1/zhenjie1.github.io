<template>
	<div class="paymentBox" v-if="value">
		<div class="bg" @click='hide'></div>
		<div class="payment">
			<div class="title">选择支付方式<span @click="hide">X</span></div>
			<div>{{money.money}}</div>
			<ul>
				<li v-for="(items, index) in options" :key='index' @click='paymentEv(index)' v-if='isShow(index)'>
					<img :src="items.img" alt="" class="leftImg">
					<div class="right">
						<h3>{{items.title}}</h3>
						<p class="text">{{items.txt}}</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
//该组件接受一个 showList 数组，用来决定显示项 [0,1,2], 如果不传或传空数组，就全部显示
//还接受一个 show false/true ，决定组件是否显示

import {
  allMoney,
  userPass,
  insListDet,
  rescueMoney,
  paySave
} from "../../../config/getData";
import { MessageBox } from "mint-ui";
//import { insListDet } from '../../config/getData'
export default {
  props: {
    value: Boolean,
    data: Object,
    showList: "",
    id: String,
    rescueId: {
      type: String,
      default: ""
    },
    pageNum: Number
  },
  data() {
    return {
      options: [
        {
          title: "天机会余额",
          txt: "可用余额 0.00 元",
          img:
            "https://wx3.sinaimg.cn/thumb150/b103a6f1ly1fqpvwqhvmoj201t01tdft.jpg"
        },
        {
          title: "微信支付",
          txt: "微信单笔限额20000元",
          img:
            "https://wx4.sinaimg.cn/thumb150/b103a6f1ly1fqpvwqhw8vj201n01g0sk.jpg"
        },
        {
          title: "支付宝支付",
          txt: "支付宝单笔限额20000元",
          img:
            "https://wx1.sinaimg.cn/thumb150/b103a6f1ly1fqpvwqj8b4j201h01h3ya.jpg"
        }
      ],
      money: [],
      token: ""
    };
  },
  methods: {
    hide() {
      this.$emit("input", false);
    },
    isShow(index) {
      if (this.showList === undefined || this.showList.toString() === "")
        return true;

      for (let i = 0; i < this.showList.length; i++) {
        if (index === this.showList[i]) {
          return true;
          break;
        }
      }
    },
    paymentEv(index) {
      if (index == 2) {
        window.location.href = "http://ty.tianjistar.com/a/pay/MobilePay";
      } else if (index == 0) {
        MessageBox.prompt("请输入密码", {
          inputType: "password"
        }).then(({ value, action }) => {
          userPass(value).then(res => {
            this.token = res.rows.token;
            if (this.pageNum == 1) {
              // 购买保险
              insListDet(this.id, this.token).then(res => {
                allMoney().then(res => {
                  if (res.code == 2) {
                    alert("购买成功");
                    location.reload();
                  } else if (res.code == 101) {
                    alert("验证失败");
                  } else if (res.code == 300) {
                    alert("余额不足请充值");
                  }
                  this.money = res.rows.money;
                  this.options[0]["txt"] = `可用余额 ${this.money} 元`;
                });
              });
            } else if (this.pageNum == 0) {
              // 救援卡
              rescueMoney(this.rescueId, this.token).then(res => {
                if (res.code == 2) {
                  alert("购买成功");
                  this.$emit("vipType", 1);
                  this.$router.push("/user/personal");
                } else if (res.code == 101) {
                  alert("验证失败");
                } else if (res.code == 300) {
                  alert("余额不足请充值");
                }
                allMoney().then(res => {
                  this.money = res.rows.money;
                  this.options[0]["txt"] = `可用余额 ${this.money} 元`;
                });
              });
            } else if (this.pageNum == 2) {
              var d = this.data;
              // 保存+购买保险
              paySave(
                d.id,
                d.dayId,
                d.typeMen,
                d.userName,
                d.user_id_number,
                d.isMc,
                d.isHospital,
                d.hospitalImgs,
                this.token,
                d.isUploadimg
              ).then(res => {
                if (res && res.code == 2) {
                  localStorage.removeItem("ImgDataArr");
                  localStorage.removeItem("ImgThis");
                  this.$router.push("/user/buyRecord/1");
                }
                if (res == undefined) {
                  alert("订单保存成功");
                  this.$router.push("/user/buyRecord/0");
                }
              });
            }
          });
        });
      }
    },
    getData() {
      allMoney().then(res => {
        this.money = res.rows.money;
        this.options[0]["txt"] = `可用余额 ${this.money} 元`;
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
.paymentBox {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  text-align: left;
  .bg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .payment {
    background-color: white;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 400px;
    overflow-y: auto;
    > .title {
      text-align: center;
      font-size: 18px;
      line-height: 45px;
      border-bottom: 1px solid #e6e6e6;
      position: relative;
      span {
        padding: 0 20px;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    ul {
      li {
        overflow: hidden;
        border-bottom: 1px solid #f5f5f5;
        padding: 6px 0;
        .leftImg {
          width: 26px;
          height: 26px;
          float: left;
          margin: 15px;
        }
        .right {
          float: left;
          margin-top: 5px;
          .text {
            margin-top: 4px;
          }
        }
      }
    }
  }
}
</style>
