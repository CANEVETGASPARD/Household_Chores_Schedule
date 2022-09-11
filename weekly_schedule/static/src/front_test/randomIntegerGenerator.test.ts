import { randomIntegerGenerator } from "../utils/randomIntegerGenarator";

describe("test on randomIntegerGenerator function", function() {
    test("sup = 1 must be equal to 0",function(){
        expect(randomIntegerGenerator(1)).toEqual(0);
    });
});