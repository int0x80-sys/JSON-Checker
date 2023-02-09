abstract class Checker<TypeToInfer> {

	protected type?: TypeToInfer;

    abstract validate(object: unknown): object is TypeToInfer;
}

export default Checker;
