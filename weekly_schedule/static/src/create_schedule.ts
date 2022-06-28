import "./utils/css/familyMemberForm";
import { addAllFilledMemberContainer,addBlankMemberContainer } from "./utils/familyMemberForm";

fetch("/getFamilyMembersData", {
    method: "GET",
  })
  .then((response) => response.json())
  .then((data) => {
        if(Object.keys(data).length == 0) {
            addBlankMemberContainer();
        } else {
            addAllFilledMemberContainer(data);
        }
    });

let addBlankMemberButton = document.querySelector(".addMemberButton") as HTMLButtonElement;
addBlankMemberButton.addEventListener("click",(e:Event) =>{
    addBlankMemberContainer();
});