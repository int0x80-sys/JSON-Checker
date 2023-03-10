import Checker from "./checker";
import IsBoolean from "./is_boolean_checker";
import IsNull from "./is_null_checker";
import IsNumber, { NumberCheckerConstraint } from "./is_number_checker";
import IsObject, { IsObjectConstraint } from "./is_object_checker";
import IsString, { StringCheckerConstraint } from "./is_string_checker";
import IsTuple, { TupleToCheckerTuple } from "./is_tuple_checker";

import ArrayTypeToCheckerArrayType from "./utils/array_type_to_array_checker_type";
import UnwrapArrayTypes from "./utils/unwrap_array_types";

type IsArrayCheckerProps<ArrayType extends unknown[]> = {
	arrayCheckers?: ArrayTypeToCheckerArrayType<ArrayType>,
	arrayLength?: number,
	condition?: (item: UnwrapArrayTypes<ArrayType>) => boolean
}

class IsArrayChecker<ArrayType extends unknown[]> extends Checker<ArrayType> {

	constructor(private props_: IsArrayCheckerProps<ArrayType> = { }) {
		super();
	}

	ofLength(length: number) {
		this.props_.arrayLength = length;
		return this;
	}

	andIsEmpty() {
		this.ofLength(0);
		return this;
	}

	protected validate_(object: unknown): object is ArrayType {
		const { arrayCheckers, arrayLength, condition } = this.props_;

		return Array.isArray(object) && (
			typeof arrayCheckers === "undefined" ||
			object.every(item =>
				arrayCheckers.some(checker => checker.validate(item)) &&
				(typeof condition === "undefined" || condition(item)))
		) && (
			typeof arrayLength === "undefined" ||
			object.length === arrayLength
		);
	}
}

function IsArray<ArrayType extends unknown[]>(props: IsArrayCheckerProps<ArrayType> = { }) {
	return new IsArrayChecker(props);
}

IsArray.of = function IsArrayOf<ArrayType extends unknown[]>(...checkers: ArrayTypeToCheckerArrayType<ArrayType>) {
	return IsArray({
		arrayCheckers: checkers
	});
};

IsArray.ofStrings = function IsArrayOfStrings(stringConstraint?: StringCheckerConstraint, prop: Omit<IsArrayCheckerProps<[string]>, "arrayCheckers"> = {}) {
	return IsArray({
		...prop,
		arrayCheckers: [IsString(stringConstraint)]
	});
};

IsArray.ofNumbers = function IsArrayOfNumbers(numberConstraint?: NumberCheckerConstraint, prop: Omit<IsArrayCheckerProps<[number]>, "arrayCheckers"> = {}) {
	return IsArray({
		...prop,
		arrayCheckers: [IsNumber(numberConstraint)]
	});
};

IsArray.ofNulls = function IsArrayOfNulls(prop: Omit<IsArrayCheckerProps<[null]>, "arrayCheckers"> = {}) {
	return IsArray({
		...prop,
		arrayCheckers: [IsNull()]
	});
};

IsArray.ofBooleans = function IsArrayOfBooleans(booleanValues?: boolean, prop: Omit<IsArrayCheckerProps<[boolean]>, "arrayCheckers"> = {}) {
	return IsArray({
		...prop,
		arrayCheckers: [IsBoolean(booleanValues)]
	});
};

IsArray.ofObjects = function IsArrayOfObects<ObjectType extends { [key: string]: unknown }>(objectConstraints?: IsObjectConstraint<ObjectType>, prop?: IsArrayCheckerProps<[ObjectType]>) {
	return IsArray({
		...prop,
		arrayCheckers: [IsObject(objectConstraints)]
	});
};

IsArray.ofArrays = function IsArrayOfArrays<ArrayType extends unknown[]>(innerProp?: IsArrayCheckerProps<ArrayType>, prop: Omit<IsArrayCheckerProps<[[UnwrapArrayTypes<ArrayType>]]>, "arrayCheckers"> = {}) {
	return IsArray({
		...prop,
		arrayCheckers: [IsArray(innerProp)]
	});
};

IsArray.ofTuples = function IsArrayOfTUples<TupleType extends [...unknown[]]>(...tupleCheckers: TupleToCheckerTuple<TupleType>) {
	return IsArray<[TupleType]>({
		//eslint-disable-next-line
		//@ts-ignore
		arrayCheckers: [IsTuple<TupleType>(...tupleCheckers)]
	});
};

export default IsArray;
