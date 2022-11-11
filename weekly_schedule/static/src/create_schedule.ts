import "./utils/css/familyMemberForm";
import "./utils/css/table";
import { addAllFilledMemberContainer,addBlankMemberContainer } from "./utils/familyMemberForm";
import { Schedule } from "./utils/scheduleMakerModels/schedule";
import {createTable} from "./utils/scheduleTableCreator";

async function fetchFamilyMembersData(): Promise<any> {
    let data : Promise<any> = await fetch("/getFamilyMembersData", {
        method: "GET",
      }).then((response) => response.json());
    return data
}

let familyMembersData: Promise<any> = fetchFamilyMembersData();

familyMembersData.then((data) =>{
    if(Object.keys(data).length == 0) {
        addBlankMemberContainer();
    } else {
        addAllFilledMemberContainer(data);
    }
}) 

let generateScheduleButton = document.querySelector(".generateScheduleButton") as HTMLButtonElement;
generateScheduleButton.addEventListener("click", (e:Event) => {
    familyMembersData.then((data) => {
        if(Object.keys(data).length == 0) {
            console.log("no member")
        } else {
            let numberOfMealPerDay = 2;
            let numberOfTaskForAMeal = 2;
            let familySchedule = new Schedule(data, numberOfMealPerDay, numberOfTaskForAMeal);
            console.log(familySchedule.computeNumberOfTaskPerGroupMember());
            console.log(familySchedule.computeHeuristicCost());
            familySchedule.heuristic(300);
            console.log(familySchedule.computeNumberOfTaskPerGroupMember());
            console.log(familySchedule.computeHeuristicCost());
            console.log(familySchedule.getSchedule())
            let table: HTMLTableElement = createTable(familySchedule);
            let tableContainer= document.querySelector(".schedule-container") as HTMLDivElement;
            tableContainer.appendChild(table)
        }
    });
})

let addBlankMemberButton = document.querySelector(".addMemberButton") as HTMLButtonElement;
addBlankMemberButton.addEventListener("click",(e:Event) =>{
    addBlankMemberContainer();
});