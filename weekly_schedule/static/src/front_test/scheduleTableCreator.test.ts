import { Schedule } from "../utils/scheduleMakerModels/schedule";
import { initTable, addTableHeader } from "../utils/scheduleTableCreator"


describe("test on initTable function", function() {
    let table: HTMLTableElement = initTable();

    test("innerHTML of the init table",function(){
        expect(table.innerHTML).toEqual("");
    });
    test("class of the init table",function(){
        expect(table.className).toEqual("schedule");
    });
});

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
const numberOfMealPerDay: number = 2;
const numberOfTaskPerMeal: number = 2;
let schedule: Schedule = new Schedule(groupData,numberOfMealPerDay,numberOfTaskPerMeal)
let table: HTMLTableElement = initTable();

describe("test on createTableHeader function", function(){
    addTableHeader(schedule,table);
    test("innerHTML of the table",function(){
        expect(table.innerHTML).toEqual("<tr><th></th><th></th><th>monday</th><th>tuesday</th><th>wednesday</th><th>thursday</th><th>friday</th><th>saturday</th><th>sunday</th></tr>");
    });
});