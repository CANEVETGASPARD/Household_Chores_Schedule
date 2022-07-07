import { Group } from "./group"

export class Schedule {
   private numberOfMealPerDay: number;
   private numberOfTaskForTheMeal: number;
   private group: Group;
   private schedule: string[][];

   constructor(numberOfMealPerDay: number, numberOfTaskForTheMeal:number, membersData: any) {
      this.numberOfMealPerDay = numberOfMealPerDay;
      this.numberOfTaskForTheMeal = numberOfTaskForTheMeal;
      this.group = new Group(membersData,numberOfTaskForTheMeal);
      this.schedule = [[]]; //change this init with proper init => init with proper array row and column size
   }

   public getNumberOfMealPerDay(): number {
      return this.numberOfMealPerDay;
   } 

   public getNumberOfTaskForTheMeal(): number {
      return this.numberOfTaskForTheMeal;
   }

   public getGroup(): Group {
      return this.group;
   }

   public getSchedule(): string[][] {
      return this.schedule;
   }

   public setTableau(newSchedule: string[][]) {
      this.schedule = newSchedule;// add verif for array size
   }

   public setScheduleValue(rowIndex:number, columnIndex:number, newValue:string) {
      //add verif for array size
      this.schedule[rowIndex][columnIndex] = newValue
   }
}