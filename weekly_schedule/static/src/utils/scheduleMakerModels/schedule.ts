import { Group } from "./group"
import { randomIntegerGenerator } from "../randomIntegerGenarator";
import { Member } from "./member";
import { MealInTheWeek } from "../mealInTheWeek";

export class Schedule {
   private numberOfMealPerDay: number;
   private numberOfTaskForTheMeal: number;
   private group: Group;
   private schedule: string[][][];

   readonly DAYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

   constructor(membersData: any, numberOfMealPerDay: number, numberOfTaskForTheMeal:number) {
      this.numberOfMealPerDay = numberOfMealPerDay;
      this.numberOfTaskForTheMeal = numberOfTaskForTheMeal;
      this.group = new Group(membersData,numberOfTaskForTheMeal);
      this.schedule = this.initScheduleRandomly(); //change this init with proper init => init with proper array row and column size
   }

   private initScheduleRandomly(): string[][][] {
      const NUMBEROFDAYPERWEEK: number = 7;
      let schedule: string[][][] =  [];
      for (let mealIndex: number = 0; mealIndex<this.getNumberOfMealPerDay();mealIndex++) {
         let mealList: string[][]= []
         for (let dayIndex: number = 0; dayIndex<NUMBEROFDAYPERWEEK;dayIndex++) {
            let dayList: string[] = [];
            let mealInTheWeek: MealInTheWeek = new MealInTheWeek(this.DAYS[dayIndex],mealIndex + 1); //+1 because 1=lunch, 2=diner
            for (let taskIndex: number = 0;taskIndex<this.getNumberOfTaskForTheMeal();taskIndex++) {
               let availableMembers: string[] = this.getGroup().findAvailableMembers(mealInTheWeek);
               if (availableMembers.length == 0) {
                  dayList = ["",""];
               } else if (availableMembers.length == 1) {
                  dayList = [availableMembers[0],availableMembers[0]];
               } else {
                  dayList = [availableMembers[randomIntegerGenerator(availableMembers.length)],availableMembers[randomIntegerGenerator(availableMembers.length)]];
               }
            }
            mealList.push(dayList);
         }
      schedule.push(mealList);
      }

      return schedule
   }

   private getNumberOfMealPerDay(): number {
      return this.numberOfMealPerDay;
   } 

   private getNumberOfTaskForTheMeal(): number {
      return this.numberOfTaskForTheMeal;
   }

   public getGroup(): Group {
      return this.group;
   }

   public getSchedule(): string[][][] {
      return this.schedule;
   }

   private setTableau(newSchedule: string[][][]) {
      this.schedule = newSchedule;// add verif for array size
   }

   private setScheduleValue(mealIndex:number, dayIndex:number, taskIndex:number, newValue:string) {
      //add verif for array size
      this.schedule[mealIndex][dayIndex][taskIndex] = newValue
   }
}