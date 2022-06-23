function createNameContainer(memberName:string): HTMLDivElement {
    let memberTextInputcontainer = document.createElement("div") as HTMLDivElement;
    memberTextInputcontainer.classList.add("memberTextInput");
    let memberNameInput = document.createElement("input");
    memberNameInput.classList.add("memberName");
    memberNameInput.setAttribute("type","text");
    memberNameInput.setAttribute("name","Name");
    memberNameInput.setAttribute("value",memberName);
    memberTextInputcontainer.appendChild(memberNameInput);
    return memberTextInputcontainer;
}

function createDayContainer(dayName: string): HTMLDivElement{
    let dayContainer = document.createElement("div") as HTMLDivElement;
    dayContainer.classList.add(dayName);

    let dayPContainer = document.createElement("div") as HTMLDivElement;
    dayPContainer.classList.add("day");
    let dayP = document.createElement("p");
    dayP.innerHTML = dayName[0].toUpperCase();
    dayPContainer.appendChild(dayP);

    let lunchInput = document.createElement("input") as HTMLInputElement;
    lunchInput.setAttribute("type","checkbox");
    lunchInput.setAttribute("id","lunch");
    lunchInput.setAttribute("name",dayName);

    let dinerInput = document.createElement("input") as HTMLInputElement;
    dinerInput.setAttribute("type","checkbox");
    dinerInput.setAttribute("id","diner");
    dinerInput.setAttribute("name",dayName);

    dayContainer.appendChild(dayPContainer);
    dayContainer.appendChild(lunchInput);
    dayContainer.appendChild(dinerInput);

    return dayContainer;
}

function createTaskLabelContainer(): HTMLDivElement{
    let legendContainer = document.createElement("div") as HTMLDivElement;
    legendContainer.classList.add("legend");

    let blankDayPContainer = document.createElement("div") as HTMLDivElement;
    blankDayPContainer.classList.add("day");
    
    let lunchLabel = document.createElement("label") as HTMLLabelElement;
    lunchLabel.setAttribute("for","lunch");
    lunchLabel.innerHTML = "lunch";

    let dinerLabel = document.createElement("label") as HTMLLabelElement;
    dinerLabel.setAttribute("for","diner");
    dinerLabel.innerHTML = "diner";

    legendContainer.appendChild(blankDayPContainer);
    legendContainer.appendChild(lunchLabel);
    legendContainer.appendChild(dinerLabel);

    return legendContainer
}

function createSettingsSymbolsContainer(): HTMLDivElement {
    let settingsSymbolsContainer = document.createElement("div") as HTMLDivElement;
    settingsSymbolsContainer.classList.add("formSettingsSymbols-container");

    let validationSymbolImg = document.createElement("img") as HTMLImageElement;
    validationSymbolImg.setAttribute("src","{{ url_for('static', filename='assets/formValidation.png') }}");
    validationSymbolImg.setAttribute("alt","form-validation");
    validationSymbolImg.classList.add("validation");

    let removeSymbolImg = document.createElement("img") as HTMLImageElement;
    removeSymbolImg.setAttribute("src","{{ url_for('static', filename='assets/formRemove.png') }}");
    removeSymbolImg.setAttribute("alt","form-remove");
    removeSymbolImg.classList.add("remove");

    settingsSymbolsContainer.appendChild(validationSymbolImg);
    settingsSymbolsContainer.appendChild(removeSymbolImg);

    return settingsSymbolsContainer
}

function createWeekForm(memberName: string): HTMLFormElement{
    let memberForm = document.createElement("form") as HTMLFormElement;
    memberForm.setAttribute("method", "POST");
    memberForm.classList.add("member-form");

    let memberTextInput: HTMLDivElement = createNameContainer(memberName);

    let weekForm = document.createElement("div") as HTMLDivElement;
    weekForm.classList.add("week-form");

    let legend: HTMLDivElement = createTaskLabelContainer();
    weekForm.appendChild(legend);

    const DAYS: string[] = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"]
    for (let dayIndex: number = 0; dayIndex<DAYS.length;dayIndex++) {
        let dayContainer: HTMLDivElement = createDayContainer(DAYS[dayIndex]);
        weekForm.appendChild(dayContainer);
    }

    let settingsSymbolsContainer: HTMLDivElement = createSettingsSymbolsContainer();

    memberForm.appendChild(memberTextInput);
    memberForm.appendChild(weekForm);
    memberForm.appendChild(settingsSymbolsContainer);
    
    return memberForm;
}

export function createMemberContainer(): HTMLDivElement {
    let memberContainer = document.createElement("div") as HTMLDivElement;
    memberContainer.classList.add("member-container");
    return memberContainer;
}

export function createBlankMemberContainer(): HTMLDivElement {
    let memberContainer = document.createElement("div") as HTMLDivElement;
    memberContainer.classList.add("member-container");

    let memberForm: HTMLFormElement = createWeekForm("Name");
    memberContainer.appendChild(memberForm);

    return memberContainer;
}