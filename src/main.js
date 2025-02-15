// Leo Assimes
// Endless SCIIer
// Time spent: ~20 hours
// 
// Creative tilt
// - I think my idea of an endless runner based on skiing is technically and artistically interesting.
// - I'm proud of how I implemented movement in this game.
// - I'm proud of my usage of ASCII art for the art style of this game.

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    // backgroundColor: '#f0f8ff',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

let lane1 = 300 - 15
let lane2 = 345 - 15
let lane3 = 390 - 15
let lane4 = 435 - 15
