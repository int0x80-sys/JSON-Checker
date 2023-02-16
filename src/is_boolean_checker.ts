import Checker from "./checker";

class IsBooleanChecker extends Checker<boolean> {

	constructor(private booleanValue_?: boolean) {
		super();
	}

	andIsTrue() {
		this.booleanValue_ = true;
	}

	andIsFalse() {
		this.booleanValue_ = false;
	}

	protected validate_(object: unknown): object is boolean {
		return typeof object === "boolean" && (
			typeof this.booleanValue_ === "undefined" ||
			this.booleanValue_ === object
		);
	}
}

function IsBoolean(booleanValues?: boolean) {
	return new IsBooleanChecker(booleanValues);
}

export default IsBoolean;
