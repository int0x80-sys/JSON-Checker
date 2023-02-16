# JSON Checker

Simple and easy to use typescript-first json validator

## Usage

There are several functions that instantiate different checker types.

### IsNull

Checker that validate if a variable is null:

```javascript
import { IsNull } from "@int0x80-sys/json-checker";

function foo(obj: unknown) {
    const validator = IsNull();

    if(validator.validate(obj)) {
        obj; // type of obj is null
    }
}
```

### IsString

Checker that validate if a variable is an string:

```javascript
import { IsString } from "@int0x80-sys/json-checker";

function foo(obj: unknown) {
    const validator = IsString();

    if(validator.validate(obj)) {
        obj; // type of obj is string
        console.log(obj.length); // no ts errors. Obj is infer to be an string
    }
}
```

Also, you can pass a function to the `IsString` validator to make extra checks over the string to be validated:

```javascript
import { IsString } from "@int0x80-sys/json-checker";

function foo(obj: unknown) {
    const validator = IsString(str => str.startWith("sometext"));

    if(validator.validate(obj)) {
        obj; // type of obj is string. Only pass if the function passed to IsString returns true.
        console.log(obj.length); // no ts errors. Obj is infer to be an string
    }
}
```

### IsNumber

Checker that validate if a variable is an number:

```javascript
import { IsNumber } from "@int0x80-sys/json-checker";

function foo(obj: unknown) {
    const validator = IsNumber();

    if(validator.validate(obj)) {
        obj; // type of obj is number
        console.log(obj.toFixed(2)); // no ts errors. Obj is infer to be an number
    }
}
```

Like the `IsString` checker, you can pass a function to `IsNumber` to make extra validations:

```javascript
import { IsNumber } from "@int0x80-sys/json-checker";

function foo(obj: unknown) {
    const validator = IsNumber(n => n % 2 === 0);

    if(validator.validate(obj)) {
        obj; // type of obj is number. Only pass if the function passed to IsNumber returns true.
        console.log(obj.toFixed(2)); // no ts errors. Obj is infer to be an number
    }
}
```

### IsBoolean

Checker that validate if a variable is a boolean:

```javascript
import { IsBoolean } from "@int0x80-sys/json-checker";

function foo(obj: unknown) {
    const validator = IsBoolean();

    if(validator.validate(obj)) {
        obj; // type of obj is boolean.
    } 
}
```

You can pass `true` or `false` to `IsBoolean` to check if the object is either true or false

```javascript
import { IsBoolean } from "@int0x80-sys/json-checker";

function foo(obj: unknown) {
    const validator = IsBoolean(false);

    if(validator.validate(obj)) {
        obj; // type of obj is boolean. Only pass if the variable of the boolean is false
    } 
}
```

### IsObject

Checker that validate if a variable is an object:

```javascript
import { IsObject } from "@int0x80-sys/json-checker";

function foo(obj: unknown) {
    const validator = IsObject();

    if(validator.validate(obj)) {
        obj; //type of obj is an empty object { }
    }
}
```

Pass an object to `IsObject` with others checkers to infer an specific type of object:

```javascript
import { IsObject, IsString, IsNumber } from "@int0x80-sys/json-checker";

function foo(obj: unknown) {
    const validator = IsObject({
        name: IsString(),
        lastName: IsString(),
        age: IsNumber(),
        props: IsObject({
            speed: IsNumber(n => n > 0 && n < 100),
            damage: IsNumber(n => n > 0 && n < 10)
        })
    });

    if(validator.validate(obj)) {
        /**
         *  type of obj is an object with this props:
         *  {
         *      name: string,
         *      lastName: string,
         *      age: number,
         *      props: {
         *          speed: number,
         *          damage: number
         *      }
         *  }
         */
        obj; //

        console.log(obj.name);
        console.log(obj.lastName);
        console.log(obj.age);
        console.log(obj.props.speed);
        console.log(obj.props.damage);
    }
}

foo({
    name: "Some Name",
    lastName: "Some LastName"
}); //fails.

foo({
    name: "Some Name",
    lastName: "Some LastName",
    age: 28
}); //fails.

foo({
    name: "Some Name",
    lastName: "Some LastName",
    age: 28,
    props: {
        speed: 20,
        damage: 5
    }
}); //pass.
```

### IsArray

Checker that validate if a variable is an array:

```javascript
import { IsArray } from "@int0x80-sys/json-checker";

function foo(obj: unknown) {
    const validator = IsArray();

    if(validator.validate(obj)) {
        obj; //type of obj is an unknow[]
    }
}
```

You can pass some props to `IsArray` checker to infer the type an constraint the length of the array and some condition over the elements in the array:

```javascript
import { IsArray, IsNumber, IsString } from "@int0x80-sys/json-checker";

function foo(obj: unknown) {
    const validator = IsArray({
        arrayCheckers: [IsNumber(), IsString()],
        arrayLength: 3,
        condition: (n: number | string) => {
            if(typeof n === "number")
                return n % 2 === 0
            else
                return n.startsWith("SomeText");
        }
    });

    if(validator.validate(obj)) {
        obj; //type of obj is an (number|string)[] of length 3. Only pass if the elements in the array meets the condition

        obj.push(4);
    }
}
```

The `IsArray` have some methods that returns common types of arrays:

```javascript
import {
    IsArray,
    IsString,
    IsNumber,
    IsNull
} from "@int0x80-sys/json-checker";

IsArray.of(IsString(), IsNumber()); //returns a checker of (string|number)[]

IsArray.ofSrings(s => s.startsWith("SomeText")); // returns a checker of string[]

IsArray.ofNumbers(n => n % 2 === 0); // returns a checker of number[]

IsArray.ofBooleans(); //returns a checker of boolean[]

IsArray.ofObjects({
    name: IsString(),
    lastName: IsString(),
    age: IsNumber()
}); // returns a checker of ({ name: string, lastName: string, age: number })[]

IsArray.ofArrays({
    arrayCheckers: [IsNumber(), IsString()],
    arrayLength: 3,
    condition: (n: number | string) => {
        if(typeof n === "number")
            return n % 2 === 0
        else
            return n.startsWith("SomeText");
    } 
}); // returns a checker of (number, string)[][]

IsArray.ofTuples(IsString(), IsString(), IsNull(), IsNumber()) // returns a checker of [string, string, null, number][];
```

Also, the `IsArray` instances has some methods to make the instantiation of the checker more readable:

```Javascript
IsArray.of(IsString()).andIsEmpty(); //returns a checker of string[] that validates if the array is empty

IsArray.of(IsString()).ofLength(3); //returns a checker of string[] that validates if the array is of length 3
```

### IsTuple

Checker that validates if a variable is a tuple:

```javascript
import { IsTuple, IsString, IsNumber } from "@int0x80-sys/json-checker";

function foo(obj: unknown) {
    const validator = IsTuple(IsString(), IsNumber());

    if(validator.validate(obj)) {
        obj; // type of obj is [string, number]

        obj[0].length; //the first position is an string
        obj[1].toFixed(2); //the second position is a number.
    }
}
```

### IsSome

Checker that validate if a variable is one of the types specified:

```javascript
import { IsSome, IsString, IsNumber } from "@int0x80-sys/json-checker";

function foo(obj: unknown) {
    const validator = IsSome(IsString(), IsNumber());

    if(validator.validate(obj)) {
        obj; //typeo of obj is string | number
    }
}
```

## Custom Checkers

You can create your own checkers extending from the Checker class. The only method that you must to implement is the `validate_` method:

```javascript
import { Checker } from "./src";

class IsFalseChecker extends Checker<false> {

	protected validate_(object: unknown): object is false {
		return typeof object === "boolean" && object === false;
	}
}

function foo(obj: unknown) {
	const validator = new IsFalseChecker;

	if(validator.validate(obj)) {
		obj; // type of obj es false
	}
}

```
