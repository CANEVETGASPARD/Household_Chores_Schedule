import { MealInTheWeek } from "../customType";

export class Member {
    private name:string;
    private mealInTheWeek:MealInTheWeek[];
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
                    this.mealInTheWeek.push({
                        "day":memberDataKeyList[keyIndex],
                        "meal":memberData[memberDataKeyList[keyIndex]]
                    });
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

    public toString(): string{
        let output = "nom : " + this.getName() + "\n" + "repas : ";
        for (let mealIndex = 0;mealIndex<this.getMealInTheWeek().length;mealIndex++){
            output += "meal on " + this.getMealInTheWeek()[mealIndex].day + " : " + this.getMealInTheWeek()[mealIndex].meal + ", ";
        }
        output += "\n" + "minimum number of task in the week : " + this.getMinimumNumberOfTaskInTheWeek();

        return output
    }

    public isAvailable(studiedMealInTheWeek: MealInTheWeek): boolean {
        let isAvailable: boolean = false;
        for (let mealInTheWeekListIndex = 0; mealInTheWeekListIndex<this.getMealInTheWeek().length;mealInTheWeekListIndex++) {
            if(this.getMealInTheWeek()[mealInTheWeekListIndex].day.toLowerCase() == studiedMealInTheWeek.day.toLowerCase() && (this.getMealInTheWeek()[mealInTheWeekListIndex].meal == studiedMealInTheWeek.meal || this.getMealInTheWeek()[mealInTheWeekListIndex].meal == 3)) {
                isAvailable = true;
            }
        }
        return isAvailable;
    }

    public getName(): string {
        return this.name;
    }

    private getMealInTheWeek(): MealInTheWeek[] {
        return this.mealInTheWeek;
    }

    private getMinimumNumberOfTaskInTheWeek(): number {
        return this.minimumNumberOfTaskInTheWeek;
    }
}
