
info.setScore(0)
let strana = 0 // 1 - up, 2 - right, 3 - down, 4 - left
let hlava_x = 8
let hlava_y = 6
let had_hlava = sprites.create(assets.image`had_hlava`, SpriteKind.Player)
had_hlava.z=100
scene.setBackgroundImage(assets.image`moon`)
had_hlava.setPosition(pixel(hlava_x), pixel(hlava_y))
//controller.moveSprite(had_hlava,100,100)

let telo_kind = SpriteKind.create()

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    strana = 1
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    strana = 2
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    strana = 3
})

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    strana = 4
})

game.onUpdateInterval(500, function() {
    if(strana==0){
        return
    }
    let had_telo = sprites.create(assets.image`had_telo`, telo_kind)
    had_telo.setPosition(pixel(hlava_x), pixel(hlava_y))
    
    if (strana==1) {
        hlava_y--
        if (hlava_y<0){
            hlava_y=11
        }
    }

    if (strana == 2) {
        hlava_x++
        if (hlava_x > 15) {
            hlava_x = 0
        }
    }

    if (strana == 3) {
        hlava_y++
        if (hlava_y > 11) {
            hlava_y = 0
        }
    }

    if (strana == 4) {
        hlava_x--
        if (hlava_x < 0) {
            hlava_x = 15
        }
    }

    had_hlava.setPosition(pixel(hlava_x), pixel(hlava_y))
})


sprites.onOverlap(SpriteKind.Player, telo_kind, function(sprite: Sprite, otherSprite: Sprite) {
    
    game.gameOver(false)
})


function pixel(x:number):number {
    return x*10+5    
}