import { Group } from "./group"
import { randomIntegerGenerator } from "../randomIntegerGenarator";
import { Member } from "./member";
import { MealInTheWeek } from "../mealInTheWeek";

export class Schedule {
   private numberOfMealPerDay: number;
   private numberOfTaskForTheMeal: number;
   private group: Group;
   private schedule: string[][][];

   private readonly DAYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

   constructor(membersData: any, numberOfMealPerDay: number, numberOfTaskForTheMeal:number) {
      this.numberOfMealPerDay = numberOfMealPerDay;
      this.numberOfTaskForTheMeal = numberOfTaskForTheMeal;
      this.group = new Group(membersData,numberOfTaskForTheMeal);
      this.schedule = this.initScheduleRandomly(); //change this init with proper init => init with proper array row and column size
   }

   private initScheduleRandomly(): string[][][] {
      let schedule: string[][][] =  [];
      for (let mealIndex: number = 0; mealIndex<this.getNumberOfMealPerDay();mealIndex++) {
         let mealList: string[][]= []
         for (let dayIndex: number = 0; dayIndex<this.DAYS.length;dayIndex++) {
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

      return schedule;
   }

   public heuristic(n: number) {
      let minCost: number = this.computeHeuristicCost();
      let minSchedule: string[][][] = JSON.parse(JSON.stringify(this.getSchedule()));

      for (let heuristicIndex: number = 0; heuristicIndex<n;heuristicIndex++) {
         let randomMealIndex: number = randomIntegerGenerator(this.getNumberOfMealPerDay());
         let randomDayIndex: number = randomIntegerGenerator(this.DAYS.length);
         let randomTaskIndex: number = randomIntegerGenerator(this.getNumberOfTaskForTheMeal());

         let previousAvailableMember: string = this.getSchedule()[randomMealIndex][randomDayIndex][randomTaskIndex];
         let newAvailableMembers: string[] = this.getGroup().findNewAvailableMembers(previousAvailableMember,new MealInTheWeek(this.DAYS[randomDayIndex],randomMealIndex));

         if(newAvailableMembers.length>0) {
            this.setScheduleValue(randomMealIndex,randomDayIndex,randomTaskIndex,newAvailableMembers[randomIntegerGenerator(newAvailableMembers.length)]);
            
            let newCost: number = this.computeHeuristicCost();
            if(newCost<minCost) {
               minSchedule = JSON.parse(JSON.stringify(this.getSchedule()));
               minCost = newCost;
            } else {
               this.setSchedule(minSchedule);
            }
         }
      }
   }

   public computeHeuristicCost(): number {
      let cost: number = 0;
      let numberOfTaskPerGroupMember: {[name: string]: number} = this.computeNumberOfTaskPerGroupMember();
      for (let memberIndex: number = 0; memberIndex<this.getGroup().getGroupSize(); memberIndex++) {
         let member: Member = this.getGroup().getMembers()[memberIndex];
         if (member.getName() in numberOfTaskPerGroupMember) {
            cost += (numberOfTaskPerGroupMember[member.getName()]-member.getMinimumNumberOfTaskInTheWeek())**2;
         } else {
            cost += member.getMinimumNumberOfTaskInTheWeek()**2;
         }
      }
      return cost
   }

   public computeNumberOfTaskPerGroupMember(): {[name: string]: number} {
      let numberOfTaskPerGroupMember: {[name: string]: number} = {};
      for (let mealIndex: number = 0; mealIndex<this.getNumberOfMealPerDay();mealIndex++){
         for (let dayIndex: number = 0; dayIndex<this.DAYS.length; dayIndex++) {
            for (let taskIndex: number = 0; taskIndex<this.getNumberOfTaskForTheMeal(); taskIndex++) {
               let studiedMemberName: string = this.getSchedule()[mealIndex][dayIndex][taskIndex];
               if(studiedMemberName != "") {
                  if (studiedMemberName in numberOfTaskPerGroupMember) {
                     numberOfTaskPerGroupMember[studiedMemberName] += 1;
                  } else {
                     numberOfTaskPerGroupMember[studiedMemberName] = 1
                  }
               }
            }
         }
      }
      return numberOfTaskPerGroupMember
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

   private setSchedule(newSchedule: string[][][]) {
      this.schedule = JSON.parse(JSON.stringify(newSchedule));// add verif for array size
   }

   private setScheduleValue(mealIndex:number, dayIndex:number, taskIndex:number, newValue:string) {
      //add verif for array size
      this.schedule[mealIndex][dayIndex][taskIndex] = newValue
   }
}