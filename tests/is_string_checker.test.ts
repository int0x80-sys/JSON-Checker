import IsString from "../src/is_string_checker";

import { expect } from "chai";

describe("JsonChecker: IsString", () => {
	it("returns false on validate a value that is not an string", () => {
		const valuesToTest = [
			undefined,
			null,
			32,
			{},
			{ dummy: "dummy" },
			[],
			[324, "str", {  }, null, undefined]
		];
    
		const stringChecker = IsString();
    
		valuesToTest.forEach(valToTest =>
			expect(stringChecker.validate(valToTest)).not.to.be.true);
	});
    
	it("returns true on validate a value that is an string", () => {
		const valuesToTest = [
			"Matias",
			"Ezequiel",
			"Sosa",
			`age ${27}`,
			"312"
		];
    
		const stringChecker = IsString();
    
		valuesToTest.forEach(valToTest =>
			expect(stringChecker.validate(valToTest)).to.be.true);
	});
    
	it("returns false on validate an string that do not satisfy the custom constraint", () => {
		const cases = [
			{
				checker: IsString(str => str.startsWith("Ma")),
				values: ["Elena", "Hernan", "Joel", "Joaco"]
			},
			{
				checker: IsString(str => /^[a-z]*$/g.test(str)),
				values: ["JULIAN", "ARMANDO", "SOL", "KEVIN"]
			}
		];
    
		cases.forEach(({ checker, values }, i) =>
			values.forEach((value, j) =>
				expect(checker.validate(value), `Test fail at index ${i}|${j}`).not.to.be.true));
	});
    
	it("returns false on validate an string that satisfy the custom constraint", () => {
		const cases = [
			{
				checker: IsString(str => str.startsWith("Ma")),
				values: ["Maradona", "Martin", "Marcelo", "Matias"]
			},
			{
				checker: IsString(str => /^[a-z]*$/g.test(str)),
				values: ["julian", "armando", "sol", "kevin"]
			}
		];
    
		cases.forEach(({ checker, values }, i) =>
			values.forEach((value, j) =>
				expect(checker.validate(value), `Test fail at index ${i}|${j}`).to.be.true));
	});
});
