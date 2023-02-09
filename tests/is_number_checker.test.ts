import IsNumber from "../src/is_number_checker";

import { expect } from "chai";

describe("JsonChecker: IsNumber", () => {
	it("returns false validating a value that is not a number", () => {
		const valuesToTest = [
			undefined,
			null,
			"32",
			{},
			{ dummy: "dummy" },
			[],
			[324, "str", {  }, null, undefined]
		];

		const numberChecker = IsNumber();

		valuesToTest.forEach((valToTest, index) =>
			expect(numberChecker.validate(valToTest), `Test fail at index ${index}`).to.not.be.true
		);
	});

	it("returns true validating a value that is a number", () => {
		const valuesToTest = [
			34,
			4564562,
			879205,
			3.15,
			3.14,
			7.62
		];

		const numberChecker = IsNumber();

		valuesToTest.forEach((valToTest, index)=>
			expect(numberChecker.validate(valToTest), `Test fail at index ${index}`).to.be.true);
	});

	it("return false validating a number that do not satisfy the custom constraint", () => {
		const cases = [
			{
				checker: IsNumber(num => num % 2 == 0),
				values: [3.23, 4.523, 5, 10003245, 0.0324, 0.2, -203, -0.0324, -2043]
			},
			{
				checker: IsNumber(num => num % 2 != 0),
				values: [4, 6, 20, -30, -10032, 32]
			},
			{
				checker: IsNumber(num => num > 0 && num < 100),
				values: [0, -10, -0.001, -3042, 100, 101, 1024]
			}
		];

		cases.forEach(({ checker, values }, i) => 
			values.forEach((value, j) =>
				expect(checker.validate(value), `Test fail at index ${i}|${j}`).not.to.be.true));
	});

	it("return true validating a number that satisfy the custom constraint", () => {
		const cases = [
			{
				checker: IsNumber(num => num % 2 == 0),
				values: [4, 6, 20, -30, -10032, 32]
			},
			{
				checker: IsNumber(num => num % 2 != 0),
				values: [3.23, 4.523, 5, 10003245, 0.0324, 0.2, -203, -0.0324, -2043]
			},
			{
				checker: IsNumber(num => num <= 0 || num >= 100),
				values: [0, -10, -0.001, -3042, 100, 101, 1024]
			}
		];

		cases.forEach(({ checker, values }, i) => 
			values.forEach((value, j) =>
				expect(checker.validate(value), `Test fail at index ${i}|${j}`).to.be.true));
	});
});
