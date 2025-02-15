// Leo Assimes
// Endless SCIIer
// Time spent: ~20 hours
// 
// Creative tilt
// - I think my idea of an endless runner based on skiing is technically and artistically interesting.
// - I'm proud of how I implemented movement in this game. It was a technical challenge to implement everything
//   using a FSM, and I also thought pretty hard about how different button presses should work, with the
//   goal of making things simple, yet sophisticated.
// - I'm proud of my usage of ASCII art for the art style of this game. I found out that I can save the canvas
//   as an image on my local PC, so I used text boxes to create art assets with ASCII. I think it gave the game
//   a nice charm.

// Credits
// - colorhexa.com/color-names - for random HEX colors
// - 

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

let lane = [200, 280, 360, 440]

