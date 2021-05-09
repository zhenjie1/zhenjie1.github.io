import * as friend from '@/store/modules/friend'
import * as group from '@/store/modules/group'

export * from './Root'
export * from './Actions'
export * from './Store'

export type Modules = {
	friend: [friend.State, friend.Actions, friend.Mutations, friend.Getters]
	group: [group.State, group.Actions, group.Mutations, group.Getters]
}
