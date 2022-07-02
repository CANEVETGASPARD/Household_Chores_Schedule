import { removeInputValueOnFocus, resetInputIfBlankOnBlur } from "./inputSettingFunctions";
import { FormCheckBoxValue } from "./customType";

function createNameContainer(memberName:string): HTMLDivElement {
    const memberNameInputBasicValue: {[name: string]: string} = {"Name":"Name"}
    let memberTextInputcontainer = document.createElement("div") as HTMLDivElement;
    memberTextInputcontainer.classList.add("memberTextInput");
    let memberNameInput = document.createElement("input");
    memberNameInput.classList.add("memberName");
    memberNameInput.setAttribute("type","text");
    memberNameInput.setAttribute("name","Name");
    memberNameInput.setAttribute("value",memberName);
    memberNameInput.addEventListener("focus", (e:Event) =>{removeInputValueOnFocus(e,memberNameInputBasicValue)})
    memberNameInput.addEventListener("blur", (e:Event) => {resetInputIfBlankOnBlur(e,memberNameInputBasicValue)})
    memberTextInputcontainer.appendChild(memberNameInput);
    return memberTextInputcontainer;
}

function createDayContainer(dayName: string, lunchCheckboxValue: boolean, dinerCheckboxValue: boolean): HTMLDivElement{
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
    lunchInput.setAttribute("value","lunch");
    lunchInput.checked = lunchCheckboxValue;

    let dinerInput = document.createElement("input") as HTMLInputElement;
    dinerInput.setAttribute("type","checkbox");
    dinerInput.setAttribute("id","diner");
    dinerInput.setAttribute("name",dayName);
    dinerInput.setAttribute("value","diner");
    dinerInput.checked = dinerCheckboxValue;

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

function deleteMember(memberId:string) {
    fetch("/delete-member", {
      method: "POST",
      body: JSON.stringify({ id: memberId }),
    }).then((_res) => {
      window.location.href = "/create";
    });
  }

function createSettingsSymbolsContainer(memberId:string): HTMLDivElement {
    let settingsSymbolsContainer = document.createElement("div") as HTMLDivElement;
    settingsSymbolsContainer.classList.add("formSettingsSymbols-container");

    let validationSymbol = document.createElement("button") as HTMLButtonElement;
    validationSymbol.classList.add("validation");
    validationSymbol.setAttribute("type","submit")

    let removeSymbol = document.createElement("div") as HTMLDivElement;
    removeSymbol.classList.add("remove");
    removeSymbol.addEventListener("click", () =>{deleteMember(memberId)});

    settingsSymbolsContainer.appendChild(validationSymbol);
    settingsSymbolsContainer.appendChild(removeSymbol);

    return settingsSymbolsContainer
}

function createWeekForm(memberId:string, memberName: string, memberFormCheckboxValue: FormCheckBoxValue): HTMLFormElement{
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
        let dayContainer: HTMLDivElement = createDayContainer(DAYS[dayIndex],memberFormCheckboxValue[DAYS[dayIndex]]["lunch"],memberFormCheckboxValue[DAYS[dayIndex]]["diner"]);
        weekForm.appendChild(dayContainer);
    }

    let settingsSymbolsContainer: HTMLDivElement = createSettingsSymbolsContainer(memberId);

    memberForm.appendChild(memberTextInput);
    memberForm.appendChild(weekForm);
    memberForm.appendChild(settingsSymbolsContainer);
    
    return memberForm;
}

function createFilledMemberContainer(memberId:string,filledFormCheckboxValue: FormCheckBoxValue, memberName: string): HTMLDivElement {
    let memberContainer = document.createElement("div") as HTMLDivElement;
    memberContainer.classList.add("member-container");

    let memberForm: HTMLFormElement = createWeekForm(memberId,memberName,filledFormCheckboxValue);
    memberContainer.appendChild(memberForm);

    return memberContainer;
}

function createBlankMemberContainer(): HTMLDivElement {
    let memberContainer = document.createElement("div") as HTMLDivElement;
    memberContainer.classList.add("member-container");

    let blankFormCheckboxValue: FormCheckBoxValue = {
        "monday":{"lunch":false,"diner":false},
        "tuesday":{"lunch":false,"diner":false},
        "wednesday":{"lunch":false,"diner":false},
        "thursday":{"lunch":false,"diner":false},
        "friday":{"lunch":false,"diner":false},
        "saturday":{"lunch":false,"diner":false},
        "sunday":{"lunch":false,"diner":false}};
    let memberForm: HTMLFormElement = createWeekForm("None","Name",blankFormCheckboxValue);
    memberContainer.appendChild(memberForm);

    return memberContainer;
}

function createMemberNameAndFormCheckboxValueParameter(memberData: any): [string,FormCheckBoxValue] {
    let memberDataKeyList: any[] = Object.keys(memberData);
    let memberName:string = "";
    let formCheckboxValue: FormCheckBoxValue = {};
    for (let keyIndex: number = 0; keyIndex<memberDataKeyList.length; keyIndex++) {
        if(memberDataKeyList[keyIndex] == "memberName") {
            memberName = memberData[memberDataKeyList[keyIndex]];
        } else {
            if ( memberData[memberDataKeyList[keyIndex]] == 0) {
                formCheckboxValue[memberDataKeyList[keyIndex]] = {"lunch":false,"diner":false};
            } else if (memberData[memberDataKeyList[keyIndex]] == 1) {
                formCheckboxValue[memberDataKeyList[keyIndex]] = {"lunch":true,"diner":false};
            } else if (memberData[memberDataKeyList[keyIndex]] == 2) {
                formCheckboxValue[memberDataKeyList[keyIndex]] = {"lunch":false,"diner":true};
            } else {
                formCheckboxValue[memberDataKeyList[keyIndex]] = {"lunch":true,"diner":true};
            }
        }
    }
    return [memberName,formCheckboxValue]
}

function addFilledMemberContainer(memberId:string,memberData: any) {
    let familyMembersContainer = document.querySelector(".members-container") as HTMLDivElement;
    let [memberName,formCheckboxValue]: [string,FormCheckBoxValue] = createMemberNameAndFormCheckboxValueParameter(memberData);
    let filledMember: HTMLDivElement = createFilledMemberContainer(memberId,formCheckboxValue,memberName);
    familyMembersContainer.insertBefore(filledMember, familyMembersContainer.firstChild);
}

export function addBlankMemberContainer() {
    let familyMembersContainer = document.querySelector(".members-container") as HTMLDivElement;
    let blankMember: HTMLDivElement = createBlankMemberContainer();
    familyMembersContainer.insertBefore(blankMember, familyMembersContainer.firstChild);
}

export function addAllFilledMemberContainer(data:any) {
    let memberKeyList: any[] = Object.keys(data);
    for (let keyIndex: number = 0; keyIndex<memberKeyList.length; keyIndex++) { 
        let memberData: any = data[memberKeyList[keyIndex]];
        addFilledMemberContainer(memberKeyList[keyIndex],memberData);
    }
}