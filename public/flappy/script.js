document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let birdLeft = 220
    let birdBottom = 200
    let gravity = 2

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + "px"
        bird.style.left = birdLeft + "px"
    }

    let timerId = setInterval(startGame, 20)

    clearInterval(timerId)
})