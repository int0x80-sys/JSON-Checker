import Checker from "./checker";

export type StringCheckerConstraint = (s: string) => boolean;

class IsStringChecker extends Checker<string> {

	constructor(private constraint_?: StringCheckerConstraint) {
		super();
	}

	validate(object: unknown): object is string {
		return typeof object === "string"
            && (!this.constraint_ || this.constraint_(object));
	}
}

function IsString(constraint?: StringCheckerConstraint) {
	return new IsStringChecker(constraint);
}

export default IsString;
