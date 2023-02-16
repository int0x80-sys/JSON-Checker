abstract class Checker<TypeToInfer> {

	private optional_ = false;

	optional(): Checker<TypeToInfer | undefined> {
		this.optional_ = true;
		return this as Checker<TypeToInfer | undefined>;
	}

	validate(object: unknown): object is TypeToInfer {
		return this.optional_ || this.validate_(object);
	}

    protected abstract validate_(object: unknown): object is TypeToInfer;
}

export default Checker;
