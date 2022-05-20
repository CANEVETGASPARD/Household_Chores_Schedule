let carousselDots = document.getElementsByClassName("dot") as HTMLCollection;
let documentImagesCollection = document.getElementsByClassName("familyLogo") as HTMLCollection;

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

async function caroussel(event: Event, imgsCollection: HTMLCollection) {
    const indexWeight: number = 2; //to match dot index with span index within the caroussel div
    const delayValue: number = 400;
    const translationX: number[] = [0,-450,-900];
    let activeImageIndex: number = Number((document.querySelector(".familyLogo.active") as HTMLImageElement).getAttribute("img-index"));
    let carousselImage = imgsCollection.item(0)?.parentElement as HTMLDivElement;
    let target = event.target as HTMLSpanElement;
    let targetIndex: number = Number(target.getAttribute("dot-index"));

    if(targetIndex!=activeImageIndex){
        let sliderElementCollection = target.parentElement?.children as HTMLCollection;
        carousselImage.style.transitionDuration = (Math.abs(activeImageIndex-targetIndex)*(indexWeight*delayValue/1000)).toString() + "s";
        carousselImage.style.transform = "translateX(" + (translationX[targetIndex]).toString() + "px)";
        imgsCollection[activeImageIndex].classList.remove("active");
        imgsCollection[targetIndex].classList.add("active");
        if(targetIndex<activeImageIndex){
            for (let sliderElementIndex:number = activeImageIndex*indexWeight; targetIndex*indexWeight<sliderElementIndex; sliderElementIndex--) {
                sliderElementCollection[sliderElementIndex].classList.remove("active");
                await delay(delayValue);
            }
        } else if (targetIndex>activeImageIndex) {
            for (let sliderElementIndex:number = activeImageIndex*indexWeight + 1; sliderElementIndex<targetIndex*indexWeight + 1; sliderElementIndex++) {
                sliderElementCollection[sliderElementIndex].classList.add("active");
                await delay(delayValue);
            }
        }
    }
}

for (let dotIndex: number = 0; dotIndex < carousselDots.length; dotIndex++) {
    let dot = carousselDots[dotIndex] as HTMLSpanElement;
    dot.setAttribute('dot-index',dotIndex.toString())
   documentImagesCollection[dotIndex].setAttribute("img-index",dotIndex.toString())
    dot.addEventListener("click", (e: Event) =>{
      caroussel(e,documentImagesCollection);
    });
}