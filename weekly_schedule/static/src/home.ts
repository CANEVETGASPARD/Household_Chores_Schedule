let carousselDots = document.getElementsByClassName("dot") as HTMLCollection;
let carousselImages = document.getElementsByClassName("familyLogo") as HTMLCollection;

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

async function caroussel(event: Event, imgsCollection: HTMLCollection) {
    const indexWeigth: number = 2; //to match dot index with span index within the caroussel div
    const delayValue: number = 200;
    let delayCount: number = 0
    let activeImageIndex: number = Number((document.querySelector(".familyLogo.active") as HTMLImageElement).getAttribute("img-index"));
    let target = event.target as HTMLSpanElement;
    let targetIndex: number = Number(target.getAttribute("dot-index"));

    if(targetIndex!=activeImageIndex){
        let sliderElementCollection = target.parentElement?.children as HTMLCollection;
        console.log(sliderElementCollection);
        if(targetIndex<activeImageIndex){
            for (let sliderElementIndex:number = activeImageIndex*indexWeigth; targetIndex*indexWeigth<sliderElementIndex; sliderElementIndex--) {
                sliderElementCollection[sliderElementIndex].classList.remove("active");
                await delay(delayValue);
            }
        } else if (targetIndex>activeImageIndex) {
            for (let sliderElementIndex:number = activeImageIndex*indexWeigth + 1; sliderElementIndex<targetIndex*indexWeigth + 1; sliderElementIndex++) {
                sliderElementCollection[sliderElementIndex].classList.add("active");
                await delay(delayValue);
            }
        }
        imgsCollection[activeImageIndex].classList.remove("active");
        imgsCollection[targetIndex].classList.add("active");
    }
}

for (let dotIndex: number = 0; dotIndex < carousselDots.length; dotIndex++) {
    let dot = carousselDots[dotIndex] as HTMLSpanElement;
    dot.setAttribute('dot-index',dotIndex.toString())
    carousselImages[dotIndex].setAttribute("img-index",dotIndex.toString())
    dot.addEventListener("click", (e: Event) =>{
      caroussel(e,carousselImages);
    });
}