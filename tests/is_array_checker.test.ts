import IsArray from "../src/is_array_checker";
import IsBoolean from "../src/is_boolean_checker";
import IsNumber from "../src/is_number_checker";
import IsString from "../src/is_string_checker";

import { expect } from "chai";

describe("JsonChecker: IsArray", () => {
	it("return false validating an object that is not an array", () => {
		const valuesToTests = [
			undefined,
			null,
			"32",
			{},
			{ dummy: "dummy" },
		];
      
		const arrayChecker = IsArray();
      
		valuesToTests.forEach((valToTest, index) =>
			expect(arrayChecker.validate(valToTest), `Test fail at index ${index}`).not.to.be.true);
	});

	it("return true validating an object that is an array", () => {
		const arraysToTests = [
			[],
			[32],
			[ 32, "str"],
			[ "32", "str", null ],
			[ 32, null, "str" ],
			[ 32, "str", undefined ],
		];
          
		const arrayChecker = IsArray();
      
		arraysToTests.forEach((arrayToCheck, index) =>
			expect(arrayChecker.validate(arrayToCheck), `Test fail at index ${index}`).to.be.true);
	});

	it("return false validating an array that is not of the expected type", () => {
		const cases = [
			{
				valueToTest: [32, "STR", null],
				checker: IsArray().andIsEmpty()
			},
			{
				valueToTest: [3242, "mes", true],
				checker: IsArray().ofLength(10)
			},
			{
				valueToTest: [32, "STR", null],
				checker: IsArray.ofStrings()
			},
			{
				valueToTest: [4239.32, 35465, "1548"],
				checker: IsArray.ofNumbers()
			},
			{
				valueToTest: [true, "false"],
				checker: IsArray.ofBooleans()
			},
			{
				valueToTest: [-123932.56, `STR${32}`, null],
				checker: IsArray.ofNulls()
			},
			{
				valueToTest: [[324, 2312], ["str", 882.321, null], { }],
				checker: IsArray.ofArrays()
			},
			{
				valueToTest: [[324, null, false], ["str", 32], []],
				checker: IsArray.ofTuples(
					IsString(),
					IsNumber(),
					IsBoolean()
				)
			},
			{
				valueToTest: [
					{ "field1": "pi", "field2": 3.14 },
					{ "field1": "e", "field2": 2.71 },
					{ "field1": 9.8, "field2": 9.8 }
				],
				checker: IsArray.ofObjects({ "field1": IsString(), "field2": IsNumber() })
			}
		];

		cases.forEach(({ valueToTest, checker }, index) =>
			expect(checker.validate(valueToTest), `Test fail at index ${index}`).not.to.be.true);
	});

	it("return true validating an array that satisfy the rules", () => {
		const cases = [
			{
				valueToTest: [],
				checker: IsArray().andIsEmpty()
			},
			{
				valueToTest: [423, "mes", true, false],
				checker: IsArray().ofLength(4)
			},
			{
				valueToTest: ["32", "STR", "null"],
				checker: IsArray.ofStrings()
			},
			{
				valueToTest: [4239.32, 35465, 1548],
				checker: IsArray.ofNumbers()
			},
			{
				valueToTest: [true, false, false],
				checker: IsArray.ofBooleans()
			},
			{
				valueToTest: [null, null, null],
				checker: IsArray.ofNulls()
			},
			{
				valueToTest: [[324, 2312], ["str", 882.321, null], []],
				checker: IsArray.ofArrays()
			},
			{
				valueToTest: [["str", 45, false], ["str", 32, true]],
				checker: IsArray.ofTuples(
					IsString(),
					IsNumber(),
					IsBoolean()
				)
			},
			{
				valueToTest: [
					{ "field1": "pi", "field2": 3.14 },
					{ "field1": "e", "field2": 2.71 },
					{ "field1": "9.8", "field2": 9.8 }
				],
				checker: IsArray.ofObjects({
					"field1": IsString(),
					"field2": IsNumber()
				})
			}
		];

		cases.forEach(({ valueToTest, checker }, index) => 
			expect(checker.validate(valueToTest), `Test fail at index ${index}`).to.be.true);
	});
});
