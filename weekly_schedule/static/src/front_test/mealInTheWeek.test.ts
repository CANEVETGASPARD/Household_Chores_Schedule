import { MealInTheWeek } from "../utils/mealInTheWeek";

describe("test on MealInTheWeek object", function() {
    const dayIndex = "tuesday";
    const mealIndex = 3; //lunch and diner
    const mealInTheWeek: MealInTheWeek = new MealInTheWeek(dayIndex,mealIndex);

    test("getDay",function(){
        expect(mealInTheWeek.getDay()).toEqual("tuesday");
    });
    test("getMeal",function(){
        expect(mealInTheWeek.getMeal()).toEqual(3);
    });
    test("toString",function(){
        expect(mealInTheWeek.toString()).toEqual("tuesday lunch and diner");
    });
});