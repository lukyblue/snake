
info.setScore(0)
let had_pole: Sprite[] = []
let jablicka = 3
let strana = 0 // 1 - up, 2 - right, 3 - down, 4 - left
let hlava_x = 8
let hlava_y = 6
let jablicko = sprites.create(assets.image`jablicko`, SpriteKind.Food)
let had_hlava = sprites.create(assets.image`had_hlava`, SpriteKind.Player)
had_hlava.z=100
jablicko.z = 50
scene.setBackgroundImage(assets.image`moon`)
had_hlava.setPosition(pixel(hlava_x), pixel(hlava_y))
jablicko.setPosition(pixel(10), pixel(10))
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

game.onUpdateInterval(350, function() {
    if(strana==0){
        return
    }
    let had_telo = sprites.create(assets.image`had_telo`, telo_kind)
    had_telo.setPosition(pixel(hlava_x), pixel(hlava_y))
    had_pole.push(had_telo)
    if(had_pole.length>jablicka){
        let zadek = had_pole.shift()
        sprites.destroy(zadek)
    }

    

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

sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function(sprite: Sprite, otherSprite: Sprite) {
    info.changeScoreBy(1)
    jablicka++

    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)

    if (jablicka == 190) {
        game.over(true)
    }

    while (true) {
        jablicko.setPosition(pixel(randint(0, 15)), pixel(randint(0, 11)))
        
        if (jablicko.overlapsWith(had_hlava)) {
            continue
        }

        let ok = true
        for (let i = 0; i < had_pole.length; i++) {
            if (jablicko.overlapsWith(had_pole[i])) {
                ok = false
                break
            }
        }

        if (!ok) {
            continue
        }

        break
    }
})


function pixel(x:number):number {
    return x*10+5    
}
