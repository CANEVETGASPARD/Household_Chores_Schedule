import { removeInputValueOnFocus, setPasswordTypeOnFocus, resetInputIfBlankOnBlur } from "./utils/inputSettingFunctions";

const FormHTMLInputBasicValues: {[name: string]: string} = {"familyName":"Family name", "password": "Password"};
let familyNameInput = document.getElementById("family-name") as HTMLInputElement;
let passwordInput = document.getElementById("password") as HTMLInputElement;
let formContainer = document.getElementById("form-container") as HTMLDivElement;

formContainer.style.height =  "450px";

familyNameInput.addEventListener("focus", (e:Event) =>{removeInputValueOnFocus(e,FormHTMLInputBasicValues)});
familyNameInput.addEventListener("blur", (e:Event) => {resetInputIfBlankOnBlur(e,FormHTMLInputBasicValues)});

passwordInput.addEventListener("focus", (e:Event) =>{
    removeInputValueOnFocus(e,FormHTMLInputBasicValues);
    setPasswordTypeOnFocus(e);
});
passwordInput.addEventListener("blur", (e:Event) => {resetInputIfBlankOnBlur(e,FormHTMLInputBasicValues)});