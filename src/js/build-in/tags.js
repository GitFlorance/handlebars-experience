export default function unhideTags() {
    let tagButton = document.querySelector(".tags__button");
    let tagItems = document.querySelectorAll(".tags__item");

    console.log(tagItems);

    function toggleTags(arg) {
    arg.forEach(item => {
        item.classList.toggle('tags__visible');
    })
    };

    tagButton.addEventListener('click',()=>{
        toggleTags(tagItems)
    });
}