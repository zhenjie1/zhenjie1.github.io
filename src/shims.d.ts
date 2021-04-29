// type Difference<A, B> = A extends B ? never : A

// type A = { name: string; age: number; visible: boolean }
// type B = { name: number; age: number; qqqq: number }

// type X1<T extends object, U extends object> = Pick<T, Difference<keyof T, keyof U>>

// type X2<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U>>

// type test1 = X1<A, B>
// type test2 = X2<B, A>
// type test3 = X1<B, A>

// type I = test1 & test2 & test3

// type End = Pick<I, keyof I>

// /** 组合 */
// type Assign<
// 	T extends object,
// 	U extends object,
// 	I = X1<T, U> & X2<U, T> & X1<U, T>
// > = Pick<I, keyof I>

// type End1 = Assign<A, B>
type A = {
	id: number
	name: string
}

type X1<T, K extends keyof T> = Partial<Pick<T, K>>
type test2 = Omit<A, 'id'>

type test1 = X1<A, 'id'>

type PickPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type B = PickPartial<A, 'id'>

// const b: B = {
// 	name: '',
// }
