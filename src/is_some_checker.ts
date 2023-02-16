import Checker from "./checker";

import ArrayTypeToCheckerArrayType from "./utils/array_type_to_array_checker_type";
import UnwrapArrayTypes from "./utils/unwrap_array_types";


class IsSomeChecker<ArrayType extends unknown[]> extends Checker<UnwrapArrayTypes<ArrayType>> {

	constructor(private checkers_: ArrayTypeToCheckerArrayType<ArrayType>) {
		super();
	}

	protected validate_(object: unknown): object is UnwrapArrayTypes<ArrayType> {
		return this.checkers_.some(checker => checker.validate(object));
	}
}

function IsSome<ArrayType extends unknown[]>(...checkers: ArrayTypeToCheckerArrayType<ArrayType>) {
	return new IsSomeChecker(checkers);
}

export default IsSome;
