import Checker from "./checker";

class IsNullChecker extends Checker<null> {

	protected validate_(object: unknown): object is null {
		return typeof object === "object" && object === null;
	}
}

function IsNull() {
	return new IsNullChecker;
}

export default IsNull;
