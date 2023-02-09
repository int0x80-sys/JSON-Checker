type UnwrapArrayTypes<T> = T extends [lastItem: infer LastItemType]
	? LastItemType
	: T extends [head: infer HeadType, ...tail: infer TailType]
		? HeadType | UnwrapArrayTypes<TailType>
		: never;

export default UnwrapArrayTypes;
