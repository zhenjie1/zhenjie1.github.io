export type Fn = {
	[key: string]: (...args: any) => any
}

export type ObjReturnType<T extends Fn> = { [K in keyof T]: ReturnType<T[K]> }
