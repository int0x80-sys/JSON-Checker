import Checker from "./checker";

class IsBooleanChecker extends Checker<boolean> {

	constructor(private booleanValue_?: boolean) {
		super();
	}

	validate(object: unknown): object is boolean {
		return typeof object === "boolean" && (
			typeof this.booleanValue_ === "undefined" ||
			this.booleanValue_ === object
		);
	}

	andIsTrue() {
		this.booleanValue_ = true;
	}

	andIsFalse() {
		this.booleanValue_ = false;
	}
}

function IsBoolean(booleanValues?: boolean) {
	return new IsBooleanChecker(booleanValues);
}

export default IsBoolean;
