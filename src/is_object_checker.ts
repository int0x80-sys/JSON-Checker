import Checker from "./checker";

export type IsObjectConstraint<ObjectType extends object> = { [K in keyof ObjectType]: Checker<ObjectType[K]> };

class IsObjectChecker<ObjectType extends { [key: string]: unknown }> extends Checker<ObjectType> {

	constructor(
        private objectRules_?: { [K in keyof ObjectType]: Checker<ObjectType[K]> }
	) {
		super();
	}

	validate(object: unknown): object is ObjectType {
		return typeof object === "object" &&
			!Array.isArray(object) &&
			object !== null &&
			(
				!this.objectRules_ ||
				Object
					.keys(this.objectRules_)
					.every((key) => 
						this.keyExistsInObjectRule_(object, key) &&
						this.objectRules_?.[key]
							.validate((object as { [K in keyof ObjectType]: unknown })[key]))
			);

	}

	keyExistsInObjectRule_(object: object, key: unknown): key is keyof ObjectType {
		return typeof key === "string" && key in object;
	}
}

function IsObject<ObjectType extends { [key: string]: unknown }>(objectRules?: IsObjectConstraint<ObjectType>) {
	return new IsObjectChecker<ObjectType>(objectRules);
}

export default IsObject;
