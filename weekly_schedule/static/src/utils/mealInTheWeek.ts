export class MealInTheWeek {
    public day: string;
    public meal: number;

    readonly MEAL: string[] = ["lunch", "diner","lunch and diner"];

    constructor(day: string, meal: number) {
        this.day = day;
        this.meal = meal;
    }

    public toString(): string {
        return this.getDay()+ " " + this.MEAL[this.getMeal()-1];
    }

    public getDay(): string {
        return this.day;
    }

    public getMeal(): number {
        return this.meal;
    }
}