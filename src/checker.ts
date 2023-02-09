abstract class Checker<TypeToInfer> {

    abstract validate(object: unknown): object is TypeToInfer;
}

export default Checker;
