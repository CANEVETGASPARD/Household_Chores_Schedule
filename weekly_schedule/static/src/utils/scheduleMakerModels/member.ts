export class Member {
    private name:string;
    private mealInTheWeek:[string,number][];
    private minimumNumberOfTaskInTheWeek:number;

    constructor(memberData: any, numberOfTaskForTheMeal:number) {
        this.mealInTheWeek = []
        this.name = "";
        let numberOfMealInTheWeek : number = 0;
        let memberDataKeyList: any[] = Object.keys(memberData);
        for (let keyIndex: number = 0; keyIndex<memberDataKeyList.length; keyIndex++) {
            if(memberDataKeyList[keyIndex] == "memberName") {
                this.name = memberData[memberDataKeyList[keyIndex]];
            } else {
                if(memberData[memberDataKeyList[keyIndex]] != 0) {
                    this.mealInTheWeek.push([memberDataKeyList[keyIndex],memberData[memberDataKeyList[keyIndex]]]);
                    if (memberData[memberDataKeyList[keyIndex]] == 3){
                        numberOfMealInTheWeek += 2; //member present both in meal and dinner => thus two meals
                    } else {
                        numberOfMealInTheWeek += 1;
                    }
                }
            }
        }
        this.minimumNumberOfTaskInTheWeek = numberOfMealInTheWeek/numberOfTaskForTheMeal;
    }

    public getName(): string {
        return this.name;
    }

    public getMealInTheWeek(): [string,number][] {
        return this.mealInTheWeek;
    }

    public getMinimumNumberOfTaskInTheWeek(): number {
        return this.minimumNumberOfTaskInTheWeek;
    }

    public toString(): string{
        let output = "nom : " + this.getName() + "\n" + "repas : ";
        for (let mealIndex = 0;mealIndex<this.getMealInTheWeek().length;mealIndex++){
            output += "meal on " + this.getMealInTheWeek()[mealIndex][0] + " : " + this.getMealInTheWeek()[mealIndex][1] + ", ";
        }
        output += "\n" + "minimum number of task in the week : " + this.getMinimumNumberOfTaskInTheWeek();

        return output
    }
}
