import Checker from "../checker";

type ArrayTypeToCheckerArrayType<ArrayType extends unknown[]> = {
	[Index in keyof ArrayType]: Checker<ArrayType[Index]>
};

export default ArrayTypeToCheckerArrayType;
