import "./utils/css/familyMemberForm";
import { createBlankMemberContainer } from "./utils/familyMemberForm";

function addBlankMemberContainer() {
    let familyMembersContainer = document.querySelector(".members-container") as HTMLDivElement;
    let blankMember: HTMLDivElement = createBlankMemberContainer();

    familyMembersContainer.insertBefore(blankMember, familyMembersContainer.firstChild);
}

fetch("/getFamilyMembersData", {
    method: "GET",
  })
  .then((response) => response.json())
  .then((data) => console.log(data["familyId"]));

let addBlankMemberButton = document.querySelector(".addMemberButton") as HTMLButtonElement
addBlankMemberButton.addEventListener("click",(e:Event) =>{
    addBlankMemberContainer();
});