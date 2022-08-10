import { Group } from "../../utils/scheduleMakerModels/group";
import { MealInTheWeek } from "../../utils/mealInTheWeek";

const groupData: any = {
        "1":{
        "memberName": "Gas",
        "monday": 3,
        "tuesday": 3,
        "wednesday": 3,
        "thursday": 3,
        "friday": 0,
        "saturday": 3,
        "sunday": 0
    },
    "2":{
        "memberName": "Ger",
        "monday": 3,
        "tuesday": 3,
        "wednesday": 3,
        "thursday": 1,
        "friday": 2,
        "saturday": 0,
        "sunday": 0
    },
    "3":{
        "memberName": "Ant",
        "monday": 1,
        "tuesday": 1,
        "wednesday": 1,
        "thursday": 0,
        "friday": 2,
        "saturday": 3,
        "sunday": 0
    }
};
const numberOfTaskForTheMeal: number = 2;
const group: Group = new Group(groupData,numberOfTaskForTheMeal);

describe("tests on group class", function() {
    describe("test on findAvailableMembers function", function() {
        test("Should return Gas and Ger as available members", function() {
            const mealInTheWeekMondayDiner: MealInTheWeek = new MealInTheWeek("monday",2);
            expect(group.findAvailableMembers(mealInTheWeekMondayDiner)).toEqual(["Gas","Ger"])
        })
    
        test("Should return Gas, Ger and Ant as available members", function() {
            const mealInTheWeekMondayLunch: MealInTheWeek = new MealInTheWeek("monday",1);
            expect(group.findAvailableMembers(mealInTheWeekMondayLunch)).toEqual(["Gas","Ger","Ant"])
        })
    
        test("Should return no available members", function() {
            const mealInTheWeekSundayDiner: MealInTheWeek = new MealInTheWeek("sunday",2);
            expect(group.findAvailableMembers(mealInTheWeekSundayDiner)).toEqual([])
        })
    
        test("Should return Ger and Ant as available members", function() {
            const mealInTheWeekFridayDiner: MealInTheWeek = new MealInTheWeek("friday",2);
            expect(group.findAvailableMembers(mealInTheWeekFridayDiner)).toEqual(["Ger","Ant"])
        })
    })

    describe("test on findNewAvailableMembers", function() {
        test("Should return Gas and Ger as available members", function() {
            const mealInTheWeekMondayDiner: MealInTheWeek = new MealInTheWeek("monday",2);
            expect(group.findNewAvailableMembers("Ant",mealInTheWeekMondayDiner)).toEqual(["Gas","Ger"])
        })
    
        test("Should return Ger and Ant as available members", function() {
            const mealInTheWeekMondayLunch: MealInTheWeek = new MealInTheWeek("monday",1);
            expect(group.findNewAvailableMembers("Gas",mealInTheWeekMondayLunch)).toEqual(["Ger","Ant"])
        })
    
        test("Should return no available members", function() {
            const mealInTheWeekSundayDiner: MealInTheWeek = new MealInTheWeek("sunday",2);
            expect(group.findNewAvailableMembers("Ant",mealInTheWeekSundayDiner)).toEqual([])
        })

        test("Should return no available members", function() {
            const mealInTheWeekThursdayDiner: MealInTheWeek = new MealInTheWeek("thursday",2);
            expect(group.findNewAvailableMembers("Gas",mealInTheWeekThursdayDiner)).toEqual([])
        })
    
        test("Should return Ant as available members", function() {
            const mealInTheWeekFridayDiner: MealInTheWeek = new MealInTheWeek("friday",2);
            expect(group.findNewAvailableMembers("Ger",mealInTheWeekFridayDiner)).toEqual(["Ant"])
        })
    })
})