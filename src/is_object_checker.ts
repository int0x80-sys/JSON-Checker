import Checker from "./checker";

export type IsObjectConstraint<ObjectType extends object> = { [K in keyof ObjectType]: Checker<ObjectType[K]> };

class IsObjectChecker<ObjectType extends { [key: string]: unknown }> extends Checker<ObjectType> {

	constructor(
        private objectRules_?: { [K in keyof ObjectType]: Checker<ObjectType[K]> }
	) {
		super();
	}

	protected validate_(object: unknown): object is ObjectType {
		return typeof object === "object" &&
			!Array.isArray(object) &&
			object !== null &&
			(
				!this.objectRules_ ||
				Object
					.keys(this.objectRules_)
					.every((key) => 
						this.objectRules_?.[key]
							.validate((object as { [K in keyof ObjectType]: unknown })[key]))
			);

	}
}

function IsObject<ObjectType extends { [key: string]: unknown }>(objectRules?: IsObjectConstraint<ObjectType>) {
	return new IsObjectChecker<ObjectType>(objectRules);
}

export default IsObject;
