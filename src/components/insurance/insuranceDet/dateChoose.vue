<template>
		<div>
			<mt-button @click.native="open('picker')" size="large">{{value | formatDate}}</mt-button>
			<mt-datetime-picker class="picker_show"
        ref="picker"
        type="date"
        v-model="value"
        :startDate = "startDate"
        :endDate = "endDate"
			></mt-datetime-picker>
		</div>
</template>
<script scoped>
	import { Button } from 'mint-ui'
	import { DatetimePicker } from 'mint-ui'
	import { formatDate } from './date.js';
	export default {
    filters: {                    //时间转换
    	formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
        }
    },
  	data () {
    	return {
	      value: new Date(),          //定义显示时间
	      visible: false,
	      startDate: new Date('1999-01-01'),      //设置开始时间
	      endDate: new Date('2050-12-12')   //设置结束时间
    	}
  	},
    methods: {
      open(picker) {
        this.$refs[picker].open();    //设置开始
      }
    }
   }
</script>
<style>
	
</style>