import "./utils/css/familyMemberForm";
import { addAllFilledMemberContainer,addBlankMemberContainer } from "./utils/familyMemberForm";
import { Group } from "./utils/scheduleMakerModels/group";

fetch("/getFamilyMembersData", {
    method: "GET",
  })
  .then((response) => response.json())
  .then((data) => {
        if(Object.keys(data).length == 0) {
            addBlankMemberContainer();
        } else {
            addAllFilledMemberContainer(data);
            let numberOfTaskForAMeal = 2;
            let Familygroup = new Group(data, numberOfTaskForAMeal);
            console.log(Familygroup.toString());
        }
    });

let addBlankMemberButton = document.querySelector(".addMemberButton") as HTMLButtonElement;
addBlankMemberButton.addEventListener("click",(e:Event) =>{
    addBlankMemberContainer();
});