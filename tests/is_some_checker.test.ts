import IsBoolean from "../src/is_boolean_checker";
import IsNumber from "../src/is_number_checker";
import IsSome from "../src/is_some_checker";
import IsString from "../src/is_string_checker";

import { expect } from "chai";

describe("JsonChecker: IsSome", () => {
	it("returns false validating a value that is neither of the types specifieds", () => {
		const value = null;
		const checker = IsSome(IsString(), IsNumber(), IsBoolean());

		expect(checker.validate(value)).to.be.false;
	});

	it("returns true validating a value that meet some of the types specifieds", () => {
		const cases = [
			{
				value: 32,
				checker: IsSome(IsString(), IsNumber(), IsBoolean())
			},
			{
				value: "str",
				checker: IsSome(IsString(), IsNumber(), IsBoolean())
			},
			{
				value: false,
				checker: IsSome(IsString(), IsNumber(), IsBoolean())
			}
		];

		cases.forEach(({ value, checker }, index) =>
			expect(checker.validate(value), `Test fails at index ${index}`).to.be.true);
	});
});