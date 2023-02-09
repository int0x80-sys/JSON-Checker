import IsNull from "../src/is_null_checker";
import IsNumber from "../src/is_number_checker";
import IsObject from "../src/is_object_checker";
import IsString from "../src/is_string_checker";

import { expect } from "chai";

describe("JsonChecker: IsObject", () => {
	it("return false validating a value that is not an object", () => {
		const valuesToTests = [
			undefined,
			null,
			"32",
			[],
			[324, "str", {  }, null, undefined]
		];
    
		const objectRules = { };
    
		const objectChecker = IsObject(objectRules);
    
		valuesToTests.forEach((valToTest, index) =>
			expect(objectChecker.validate(valToTest), `Test fail at index ${index}`).not.to.be.true);
	});
    
	it("return false validating an object that do not satisfy the rules", () => {
		const objectsToTest = [
			{},
			{ "field1": "str" },
			{ "field1": 32, "field2": null },
			{ "field1": "32", "field2": "str", "field3": null },
			{ "field1": 32, "field2": null, "field3": "str" },
			{ "field1": 32, "field2": "str", "field3": undefined }
		];
    
		const objectRules = {
			"field1": IsNumber(),
			"field2": IsString(),
			"field3": IsNull()
		};
    
		const objectChecker = IsObject(objectRules);
    
		objectsToTest.forEach((objToTest, index) =>
			expect(objectChecker.validate(objToTest), `Test fail at index ${index}`).not.to.be.true);
	});
    
	it("return true validating an object that satisfy the rules", () => {
		const objectsToTest = [
			{"field1": 32, "field2": "STR", "field3": null},
			{"field1": 4239.32, "field2": "STR", "field3": null},
			{"field1": -123932.56, "field2": `STR${32}`, "field3": null},
			{"field1": 9999999, "field2": "STR", "field3": null},
			{"field1": 325.895, "field2": "STR", "field3": null}
		];
    
		const objectRules = {
			"field1": IsNumber(),
			"field2": IsString(),
			"field3": IsNull()
		};
    
		const objectChecker = IsObject(objectRules);
    
		objectsToTest.forEach((objToTest, index) =>
			expect(objectChecker.validate(objToTest), `Test fail at index ${index}`).to.be.true);
	});
});
