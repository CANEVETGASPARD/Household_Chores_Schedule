import { Member } from "./member"
import { MealInTheWeek } from "../customType";

export class Group {
    private groupSize: number;
    private Members: Member[];

    constructor(membersData: any, numberOfTaskForTheMeal:number) {
        this.Members = [];
        let memberKeyList: any[] = Object.keys(membersData);
        this.groupSize = memberKeyList.length;
        for (let keyIndex: number = 0; keyIndex<memberKeyList.length; keyIndex++) { 
            let memberData: any = membersData[memberKeyList[keyIndex]];
            let member = new Member(memberData,numberOfTaskForTheMeal);
            this.Members.push(member);
        }
    }

    public toString(): string{
        let output: string = "number of members : " + this.getGroupSize() + "\n" + "Members details : ";
        for(let memberIndex: number = 0; memberIndex<this.getMembers().length;memberIndex++) {
            output += "\n" + this.getMembers()[memberIndex].toString();
        }
        return output;
    }

    public findAvailableMembers(studiedMealInTheWeek: MealInTheWeek): string[] {
        let availableMembersWithinGroup: string[] = [];
        for (let memberIndex = 0; memberIndex<this.getGroupSize();memberIndex++) {
            if(this.getMembers()[memberIndex].isAvailable(studiedMealInTheWeek)) {
                availableMembersWithinGroup.push(this.getMembers()[memberIndex].getName());
            }
        }
        return availableMembersWithinGroup;
    } 

    public findNewAvailableMembers(previousAvailableMember:string, studiedMealInTheWeek:MealInTheWeek):string[] {
        let differentAvailableMembersWithinGroup: string[] = [];
        for (let memberIndex = 0; memberIndex<this.getGroupSize();memberIndex++) {
            if(this.getMembers()[memberIndex].isAvailable(studiedMealInTheWeek) && this.getMembers()[memberIndex].getName() != previousAvailableMember) {
                differentAvailableMembersWithinGroup.push(this.getMembers()[memberIndex].getName());
            }
        }
        return differentAvailableMembersWithinGroup;
    } 

    private getGroupSize(): number {
        return this.groupSize;
    }

    private getMembers(): Member[] {
        return this.Members;
    }
}