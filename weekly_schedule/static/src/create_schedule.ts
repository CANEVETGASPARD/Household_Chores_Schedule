import "./utils/css/familyMemberForm";
import { addAllFilledMemberContainer,addBlankMemberContainer } from "./utils/familyMemberForm";
import { Member } from "./utils/scheduleMakerModels/member";

fetch("/getFamilyMembersData", {
    method: "GET",
  })
  .then((response) => response.json())
  .then((data) => {
        if(Object.keys(data).length == 0) {
            addBlankMemberContainer();
        } else {
            addAllFilledMemberContainer(data);
            let memberKeyList: any[] = Object.keys(data);
            let numberOfTaskForAMeal = 2;
            for (let keyIndex: number = 0; keyIndex<memberKeyList.length; keyIndex++) { 
                let memberData: any = data[memberKeyList[keyIndex]];
                let member: Member = new Member(memberData,numberOfTaskForAMeal);
                console.log(member.toString());
            }
        }
    });

let addBlankMemberButton = document.querySelector(".addMemberButton") as HTMLButtonElement;
addBlankMemberButton.addEventListener("click",(e:Event) =>{
    addBlankMemberContainer();
});