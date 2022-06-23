import "./utils/css/familyMemberForm";
import { createBlankMemberContainer } from "./utils/familyMemberForm";

function addBlankMemberContainer() {
    let familyMembersContainer = document.querySelector(".members-container") as HTMLDivElement;
    let blankMember: HTMLDivElement = createBlankMemberContainer();

    familyMembersContainer.insertBefore(blankMember, familyMembersContainer.firstChild);
}

let addBlankMemberButton = document.querySelector(".addMemberButton") as HTMLButtonElement
addBlankMemberButton.addEventListener("click",(e:Event) =>{
    addBlankMemberContainer();
});