export function removeInputValueOnFocus(event: Event, inputBasicValue: {[name: string]: string})
{
    let target = event.target as HTMLInputElement;
    if(target.value == inputBasicValue[target.name]){
        target.value = "";
    }
}

export function setPasswordTypeOnFocus(event: Event)
{
    let target = event.target as HTMLInputElement;
    target.type = "password";
}

export function resetInputIfBlankOnBlur(event: Event, inputBasicValue: {[name: string]: string}){
    let target = event.target as HTMLInputElement;
    if(target.value == ""){
        target.value = inputBasicValue[target.name]
        if(target.type == "password") {
            target.type = "text"
        }
    }
}