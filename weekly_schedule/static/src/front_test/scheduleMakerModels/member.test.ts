import { Member } from "../../utils/scheduleMakerModels/member"
import { MealInTheWeek } from "../../utils/customType"

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
        const mealInTheWeekMondayLunch: MealInTheWeek = {
            "day":"monday",
            "meal":1
        }
        expect(member.isAvailable(mealInTheWeekMondayLunch)).toEqual(true);
    })

    test("Member should be available on thursday lunch", function() {
        const mealInTheWeekThursdayLunch: MealInTheWeek = {
            "day":"thursday",
            "meal":1
        }
        expect(member.isAvailable(mealInTheWeekThursdayLunch)).toEqual(true);
    })

    test("Member should be available on friday diner", function() {
        const mealInTheWeekFridayDiner: MealInTheWeek = {
            "day":"friday",
            "meal":2
        }
        expect(member.isAvailable(mealInTheWeekFridayDiner)).toEqual(true);
    })

    test("Member should not be available on saturday lunch", function() {
        const mealInTheWeekSaturdayLunch: MealInTheWeek = {
            "day":"saturday",
            "meal":1
        }
        expect(member.isAvailable(mealInTheWeekSaturdayLunch)).toEqual(false);
    })

    test("Member should not be available on friday lunch", function() {
        const mealInTheWeekFridayLunch: MealInTheWeek = {
            "day":"friday",
            "meal":1
        }
        expect(member.isAvailable(mealInTheWeekFridayLunch)).toEqual(false);
    })

    test("Member should not be available on thursday diner", function() {
        const mealInTheWeekThursdayDiner: MealInTheWeek = {
            "day":"thursday",
            "meal":2
        }
        expect(member.isAvailable(mealInTheWeekThursdayDiner)).toEqual(false);
    })
})