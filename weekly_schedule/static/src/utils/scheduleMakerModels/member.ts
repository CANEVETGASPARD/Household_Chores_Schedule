import { MealInTheWeek } from "../mealInTheWeek"

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
                    this.mealInTheWeek.push(new MealInTheWeek(memberDataKeyList[keyIndex],memberData[memberDataKeyList[keyIndex]]));
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
            output += "meal on " + this.getMealInTheWeek()[mealIndex].getDay() + " : " + this.getMealInTheWeek()[mealIndex].getMeal() + ", ";
        }
        output += "\n" + "minimum number of task in the week : " + this.getMinimumNumberOfTaskInTheWeek();

        return output
    }

    public isAvailable(studiedMealInTheWeek: MealInTheWeek): boolean {
        let isAvailable: boolean = false;
        for (let mealInTheWeekListIndex = 0; mealInTheWeekListIndex<this.getMealInTheWeek().length;mealInTheWeekListIndex++) {
            if(this.getMealInTheWeek()[mealInTheWeekListIndex].getDay().toLowerCase() == studiedMealInTheWeek.getDay().toLowerCase() && (this.getMealInTheWeek()[mealInTheWeekListIndex].getMeal() == studiedMealInTheWeek.getMeal() || this.getMealInTheWeek()[mealInTheWeekListIndex].getMeal() == 3)) {
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
