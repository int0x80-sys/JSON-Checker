import Checker from "./checker";

export type TupleToCheckerTuple<Tuple extends [...unknown[]]> = {
    [Index in keyof Tuple]: Checker<Tuple[Index]>
} & { length: Tuple["length"] };

class IsTupleChecker<TupleType extends [...unknown[]]> extends Checker<TupleType> {

	constructor(private tupleCheckers_: TupleToCheckerTuple<TupleType>) {
		super();
	}

	validate(object: unknown): object is TupleType {
		return Array.isArray(object) &&
            object.length === this.tupleCheckers_.length &&
            this.tupleCheckers_.every((checker, index) => checker.validate(object[index]));
	}
}

function IsTuple<TupleType extends [...unknown[]]>(...tupleCheckers: TupleToCheckerTuple<TupleType>) {
	return new IsTupleChecker(tupleCheckers);
}

export default IsTuple;
