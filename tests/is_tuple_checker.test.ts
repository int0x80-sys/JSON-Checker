import IsBoolean from "../src/is_boolean_checker";
import IsNull from "../src/is_null_checker";
import IsNumber from "../src/is_number_checker";
import IsObject from "../src/is_object_checker";
import IsString from "../src/is_string_checker";
import IsTuple from "../src/is_tuple_checker";

import { expect } from "chai";

describe("JsonChecker: IsTuple", () => {
	it("return false validating an object that is not a tuple", () => {
		const valuesToTests = [
			undefined,
			null,
			"32",
			{},
			{ dummy: "dummy" }
		];

		const tupleChecker = IsTuple();

		valuesToTests.forEach((valToTest, index) =>
			expect(tupleChecker.validate(valToTest), `Test fail at index ${index}`).not.to.be.true);
	});

	it("return false validating a tuple that do not satisfy the rules", () => {
		const cases = [
			{
				valueToTest: [32, "STR", null],
				checker: IsTuple(IsNumber(), IsString())
			},
			{
				valueToTest: [32, "STR", false],
				checker: IsTuple(IsNumber(), IsString(), IsNull())
			},
			{
				valueToTest: [],
				checker: IsTuple(IsNumber(), IsString(), IsNull())
			},
			{
				valueToTest: [null, null],
				checker: IsTuple()
			}
		];

		cases.forEach(({ valueToTest, checker }, index) =>
			expect(checker.validate(valueToTest), `Test fail at index ${index}`).not.to.be.true);
	});

	it("return true validating a tuple that satisfy the rules", () => {
		const cases = [
			{
				valueToTest: [],
				checker: IsTuple()
			},
			{
				valueToTest: [32, "STR", false],
				checker: IsTuple(IsNumber(), IsString(), IsBoolean())
			},
			{
				valueToTest: [32, 126, "STR", null, { name: "SomeName", age: 28 }],
				checker: IsTuple(
					IsNumber(),
					IsNumber(),
					IsString(),
					IsNull(),
					IsObject({
						name: IsString(),
						age: IsNumber()
					}))
			}
		];

		cases.forEach(({ valueToTest, checker }, index) => 
			expect(checker.validate(valueToTest), `Test fail at index ${index}`).to.be.true);
	});
});