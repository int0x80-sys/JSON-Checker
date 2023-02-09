import IsNull from "../src/is_null_checker";

import { expect } from "chai";

describe("JsonChecker: IsNull", () => {
	it("return false validating a non null object", () => {
		const valuesToTest = [
			undefined,
			"32",
			{},
			{ dummy: "dummy" },
			32,
			[],
			[324, "str", {  }, null, undefined]
		];

		const nullChecker = IsNull();

		valuesToTest.forEach((valuesToTest, index) => 
			expect(nullChecker.validate(valuesToTest), `Test fail at index ${index}`).to.not.be.true
		);
	});

	it("return true validating a null object", () => {
		const nullChecker = IsNull();
		expect(nullChecker.validate(null)).to.be.true;
	});
});
