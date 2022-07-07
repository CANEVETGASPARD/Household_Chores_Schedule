import { Member } from "./member"

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

    public getGroupSize() {
        return this.groupSize;
    }

    public getMembers() {
        return this.Members;
    }

    public toString(): string{
        let output: string = "number of members : " + this.groupSize + "\n" + "Members details : ";
        for(let memberIndex: number = 0; memberIndex<this.Members.length;memberIndex++) {
            output += "\n" + this.Members[memberIndex].toString();
        }
        return output
    }
}