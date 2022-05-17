import { removeInputValueOnFocus, setPasswordTypeOnFocus, resetInputIfBlankOnBlur } from "./utils/inputSettingFunctions";

const FormHTMLInputBasicValues: {[name: string]: string} = {"familyName":"Family name", "password": "Password", "confirmPassword": "Confirm password"};
let familyNameInput = document.getElementById("family-name") as HTMLInputElement;
let passwordInput = document.getElementById("password") as HTMLInputElement;
let confirmPasswordInput = document.getElementById("confirm-password") as HTMLInputElement;

familyNameInput.addEventListener("focus", (e:Event) =>{removeInputValueOnFocus(e,FormHTMLInputBasicValues)});
familyNameInput.addEventListener("blur", (e:Event) => {resetInputIfBlankOnBlur(e,FormHTMLInputBasicValues)});

passwordInput.addEventListener("focus", (e:Event) =>{
    removeInputValueOnFocus(e,FormHTMLInputBasicValues);
    setPasswordTypeOnFocus(e);
});
passwordInput.addEventListener("blur", (e:Event) => {resetInputIfBlankOnBlur(e,FormHTMLInputBasicValues)});

confirmPasswordInput.addEventListener("focus", (e:Event) =>{
    removeInputValueOnFocus(e,FormHTMLInputBasicValues);
    setPasswordTypeOnFocus(e);
});
confirmPasswordInput.addEventListener("blur", (e:Event) => {resetInputIfBlankOnBlur(e,FormHTMLInputBasicValues)});