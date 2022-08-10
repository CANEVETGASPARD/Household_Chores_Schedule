import { Member } from "../../utils/scheduleMakerModels/member"
import { MealInTheWeek } from "../../utils/mealInTheWeek"

const memberData: any = {
    "memberName": "Gas",
    "monday": 3,
    "tuesday": 3,
    "wednesday": 3,
    "thursday": 1,
    "friday": 2,
    "saturday": 0,
    "sunday": 0
};
const numberOfTaskForTheMeal: number = 2;
const member: Member = new Member(memberData,numberOfTaskForTheMeal);

describe("test on member object", function() {
    test("Member should be available on monday lunch", function() {
        const mealInTheWeekMondayLunch: MealInTheWeek = new MealInTheWeek("monday",1);
        expect(member.isAvailable(mealInTheWeekMondayLunch)).toEqual(true);
    })

    test("Member should be available on thursday lunch", function() {
        const mealInTheWeekThursdayLunch: MealInTheWeek = new MealInTheWeek("thursday",1);
        expect(member.isAvailable(mealInTheWeekThursdayLunch)).toEqual(true);
    })

    test("Member should be available on friday diner", function() {
        const mealInTheWeekFridayDiner: MealInTheWeek = new MealInTheWeek("friday",2);
        expect(member.isAvailable(mealInTheWeekFridayDiner)).toEqual(true);
    })

    test("Member should not be available on saturday lunch", function() {
        const mealInTheWeekSaturdayLunch: MealInTheWeek = new MealInTheWeek("saturday",1);
        expect(member.isAvailable(mealInTheWeekSaturdayLunch)).toEqual(false);
    })

    test("Member should not be available on friday lunch", function() {
        const mealInTheWeekFridayLunch: MealInTheWeek = new MealInTheWeek("friday",1);
        expect(member.isAvailable(mealInTheWeekFridayLunch)).toEqual(false);
    })

    test("Member should not be available on thursday diner", function() {
        const mealInTheWeekThursdayDiner: MealInTheWeek = new MealInTheWeek("thursday",2);
        expect(member.isAvailable(mealInTheWeekThursdayDiner)).toEqual(false);
    })
})