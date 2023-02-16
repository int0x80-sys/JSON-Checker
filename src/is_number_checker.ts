import Checker from "./checker";

export type NumberCheckerConstraint = (n: number) => boolean;

class IsNumberChecker extends Checker<number> {

	constructor(private constraint_?: NumberCheckerConstraint) {
		super();
	}

	protected validate_(object: unknown): object is number {
		return typeof object === "number"
            && (!this.constraint_ || this.constraint_(object));
	}
}

function IsNumber(constraint?: NumberCheckerConstraint) {
	return new IsNumberChecker(constraint);
}

export default IsNumber;
