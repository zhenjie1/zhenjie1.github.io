export type Fn<T = any, P = any> = {
	[key: string]: (...args: T[]) => P
}

export type ObjReturnType<T extends Fn> = { [K in keyof T]: ReturnType<T[K]> }

// 传入对象, 根据 path 自动推倒类型
type ObjectPathType<T, Path extends string> = string extends Path
	? any
	: Path extends keyof T
	? T[Path]
	: Path extends `${infer K}.${infer R}`
	? K extends keyof T
		? ObjectPathType<T[K], R>
		: any
	: any
