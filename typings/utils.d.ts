export type Fn<T = any, P = any> = {
	[key: string]: (...args: T[]) => P
}

export type ObjReturnType<T extends Fn> = { [K in keyof T]: ReturnType<T[K]> }
