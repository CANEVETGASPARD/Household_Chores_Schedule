import { Schedule } from "./scheduleMakerModels/schedule";

export function createTable(schedule:Schedule):HTMLTableElement {
    removePreviousTableIfExist()
    let table: HTMLTableElement = initTable();
    addTableHeader(schedule,table);
    addTableBody(schedule,table);

    return table
}

function removePreviousTableIfExist(){
    let previousTable = document.querySelector(".schedule") as HTMLTableElement;
    if(previousTable) {
        previousTable.remove();
    }
}

export function initTable(): HTMLTableElement {
    let table: HTMLTableElement = document.createElement("table");
    table.classList.add("schedule");
    return  table;
}

export function addTableHeader(schedule:Schedule,tableDomElement:HTMLTableElement) {
    let row: HTMLTableRowElement = document.createElement("tr");
    let numberOfHeaderBlankCell: number = 2;
    addBlankCells(row,numberOfHeaderBlankCell);
    addDayCells(row,schedule);
    tableDomElement.appendChild(row);
}

function addBlankCells(row: HTMLTableRowElement, numberOfBlankCell:number) {
    for (let i: number = 0;i<numberOfBlankCell;i++) {
        let blankcell: HTMLTableCellElement = document.createElement("th");
        row.appendChild(blankcell);
    }
}

function addDayCells(row: HTMLTableRowElement,schedule:Schedule) {
    for(let dayIndex:number = 0; dayIndex<schedule.DAYS.length;dayIndex++) {
        let dayCell: HTMLTableCellElement = document.createElement("th");
        dayCell.innerHTML = schedule.DAYS[dayIndex];
        row.appendChild(dayCell);
    }
}

function addTableBody(schedule: Schedule,tableDomElement:HTMLTableElement) {
    let rows: HTMLTableRowElement[][] = initBodyRows(schedule);

    const mealName: string[] = ["Lunch", "Meal"];
    addMealCells(rows,mealName,schedule);

    const taskName: string[] = ["Set the table", "Unset the table"]
    addTaskCells(rows,taskName,schedule);

    addMembersCell(rows,schedule);

    addRowsToTable(rows,tableDomElement);
}

function initBodyRows(schedule: Schedule): HTMLTableRowElement[][]{
    let rows: HTMLTableRowElement[][] = [];
    for(let mealIndex: number = 0;mealIndex<schedule.getNumberOfMealPerDay();mealIndex++) {
        let mealrows: HTMLTableRowElement[] = [];
        for(let taskIndex: number = 0;taskIndex<schedule.getNumberOfMealPerDay();taskIndex++) {
            let row: HTMLTableRowElement = document.createElement("tr");
            mealrows.push(row);
        }
        rows.push(mealrows);
    }
    return rows
}

function addMealCells(rows:HTMLTableRowElement[][],mealName: string[], schedule: Schedule) {
    for(let mealIndex: number = 0; mealIndex<schedule.getNumberOfMealPerDay();mealIndex++) {
        let mealCell: HTMLTableCellElement = document.createElement("td");
        mealCell.setAttribute("rowspan","2");
        mealCell.classList.add("mealCell")
        mealCell.innerHTML = mealName[mealIndex];
        rows[mealIndex][0].appendChild(mealCell);
    }
}

function addTaskCells(rows:HTMLTableRowElement[][],taskName: string[], schedule: Schedule) {
    for(let mealIndex: number = 0; mealIndex<schedule.getNumberOfMealPerDay();mealIndex++) {
        for(let taskIndex: number = 0; taskIndex<schedule.getNumberOfTaskForTheMeal();taskIndex++) {
            let taskCell: HTMLTableCellElement = document.createElement("td");
            taskCell.classList.add("taskCell")
            taskCell.innerHTML = taskName[taskIndex];
            rows[mealIndex][taskIndex].appendChild(taskCell);
        }
    }
}

function addMembersCell(rows: HTMLTableRowElement[][],schedule:Schedule) {
    let scheduleArray: string[][][] = schedule.getSchedule();
    for(let mealIndex:number = 0; mealIndex<schedule.getNumberOfMealPerDay();mealIndex++){
        for(let dayIndex:number = 0;dayIndex<schedule.DAYS.length;dayIndex++) {
            for(let taskIndex:number = 0;taskIndex<schedule.getNumberOfTaskForTheMeal();taskIndex++) {
                let memberCell: HTMLTableCellElement = document.createElement("td");
                memberCell.innerHTML = scheduleArray[mealIndex][dayIndex][taskIndex];
                rows[mealIndex][taskIndex].appendChild(memberCell);
            }
        }
    }
}

function addRowsToTable(rows: HTMLTableRowElement[][],tableDomElement:HTMLTableElement) {
    for(let mealIndex:number = 0; mealIndex<rows.length;mealIndex++){
        for(let taskIndex:number=0;taskIndex<rows[0].length;taskIndex++) {
            tableDomElement.appendChild(rows[mealIndex][taskIndex]);
        }
    }
}

