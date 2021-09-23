import { api } from '@/api'
import apiData from '@/api/store'
import { GroupList } from '@/api/wechatGroup'
import { useStore } from '@/store'
import { Ref, onMounted, ref } from 'vue'
import { templateRef } from '@vueuse/core'
import { TablePage } from 'components/common/tablePage/tablePageLogic'
import { ElMessageBox } from 'element-plus'

// 获取 ref table
let tableComp: Ref<any>
const select = ref([])

export default function useWechatGroup() {
	// 表格
	const awaitFn = (page: TablePage) => api.wechatGroup.getGroupList(page.index, page.size)

	onMounted(() => (tableComp = templateRef('table')))

	return {
		select,
		awaitFn,
	}
}

export function useWechatGroupFun() {
	const { state } = useStore()

	return {
		select,
		// 编辑分组名称
		handlerEdit(row: GroupList) {
			ElMessageBox.prompt('', '编辑分组', {
				inputValue: row.groupName,
				inputValidator: (val) => {
					if (!val) return '分组名称不能为空!'
					if (val.length > 32) return '分组名称不能大于 32 位!'
					return true
				},
				inputPlaceholder: '请输入新的分组名称!',
			}).then(async ({ value }) => {
				await api.wechatGroup.changeName({
					groupId: row.groupId,
					groupName: value,
				})
				// 刷新数据
				tableComp.value?.initDataFn?.()
			})
		},

		// 删除一个分组
		handlerDelete(id: number) {
			ElMessageBox.confirm('确定要删除吗?', '删除提醒', {
				type: 'warning',
			}).then(() => {
				api.wechatGroup.groupDelete(id).then(() => {
					// 刷新数据
					tableComp.value?.initDataFn?.()
				})
			})
		},

		// 添加一个分组
		handlerAdd() {
			ElMessageBox.prompt('请输入分组名称!', '添加分组', {
				inputValidator: (val) => {
					if (!val) return '分组名称不能为空!'
					if (val.length > 32) return '分组名称不能大于 32 位!'
					return true
				},
				inputPlaceholder: '请输入新的分组名称!',
			}).then(async ({ value }) => {
				await api.wechatGroup.add(value)
				// 刷新数据
				tableComp.value?.initDataFn?.()
			})
		},

		// 修改微信分组所属客服
		handlerChangeCustomer(row: GroupList, customer: any) {
			if (!customer) return console.warn('未找到该客服')

			const { deptId } = state.user.userInfo
			const data = {
				cServiceIds: [deptId, row.userId],
				groupIds: [row.groupId],
				userId: customer.id,
				groupUsersId: JSON.stringify([deptId, customer.id]),
				userName: customer.userName,
			}

			api.wechatGroup.changeCustomer(data)
		},
	}
}
