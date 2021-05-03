export {}

declare global {
	namespace User {
		type state = {
			userInfo: {
				brand: number
				companyCode: string
				companyId: number
				companyName: string
				deptId: string
				deptTopLevel: number
				email: string
				invitationCode: string | null
				lastLoginTime: string
				limitWx: string
				phone: string | null
				position: 0 | 1 | 2 | 3
				realName: string
				remark: string | null
				startDate: string
				status: number
				stopDate: string
				userId: number
				userName: string
			}
		}
	}
}
