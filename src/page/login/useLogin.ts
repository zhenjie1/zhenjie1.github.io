import { api } from '@/api'
import apiData from '@/api/store'
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import pick from 'lodash/pick'
import { stringEncrypt } from 'js/JSEncrypt'
import { sockets } from '@/plugins/socket'

export default function useLogin() {
	api.login.getImageCode()

	watch(
		() => apiData.login.codeImg,
		(val) => {
			form.codeKey = val.codeKey
			form.img = val.img
		}
	)

	const router = useRouter()
	const loading = ref(false)

	const formElement = ref()
	const form = reactive({
		codeKey: '', // 图形码的 key
		graphCode: '', // 用户输入的图形码
		isForced: 1, // 强制登录
		userName: '', // 用户名
		password: '', // 密码
		img: '',
	})
	const remember = ref(false)

	const submitEv = () => {
		formElement.value.validate(async (valid: boolean) => {
			if (!valid) return
			loading.value = true

			const data = pick(form, ['codeKey', 'graphCode', 'isForced', 'userName', 'password'])
			data.password = await stringEncrypt(data.password)
			api.login
				.startLogin(data)
				.then((res) => {
					router.push('/')
					sockets.startConnect()
				})
				.catch((err) => {
					console.dir(err)
					form.graphCode = ''
					api.login.getImageCode()
					throw err
				})
				.finally(() => {
					loading.value = false
				})
		})
	}

	return {
		form,
		loading,
		submitEv,
		formElement,
		remember,
	}
}
