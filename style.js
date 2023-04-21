
function use_custom_animated_css(){
    var buttons = document.querySelectorAll('.btn')
    for ( let i = 0; i < buttons.length; i++){
        buttons[i].classList.add('no-highlight');
        buttons[i].addEventListener("mouseenter", () => {
            buttons[i].classList.replace('no-highlight', 'highlight');
        })
        buttons[i].addEventListener("mouseleave", () => {
            buttons[i].classList.replace('highlight', 'no-highlight');
        })
    }
}