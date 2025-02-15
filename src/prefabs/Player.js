// Hero prefab
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)           // add player to existing scene
        scene.physics.add.existing(this)   // add physics body to scene

        this.body.setSize(this.width, this.height/3).setOffset(0, this.height*2/3)
        this.body.setCollideWorldBounds(true)

        // set custom player properties
        this.direction = 0 // -1 == left, 1 == right, 0 == neither
        this.veerVelocity = 50
        this.turnVelocity = 150

        // initialize state machine managing player (initial state, possible states, state args[])
        scene.playerFSM = new StateMachine('coasting', {
            coasting: new CoastingState(),
            veer: new VeerState(),
            turn: new TurnState(),
            twist: new TwistState(),
            fall: new FallState(),
        }, [scene, this])
    }
}

class CoastingState extends State {
    enter(scene, player) {
        player.setVelocity(0)
        player.direction = 0
        player.anims.play('coasting')
    }

    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, down, } = scene.keys

        if (down.isDown) {
            this.stateMachine.transition('twist')
            return
        }

        if (left.isDown || right.isDown) {
            this.stateMachine.transition('veer')
            return
        }
    }
}

class VeerState extends State {
    execute(scene, player) {
        const { left, right, up, down, } = scene.keys

        if (!(left.isDown || right.isDown)) {
            this.stateMachine.transition('coasting')
            return
        }
        
        if (left.isDown && !right.isDown) {
            player.direction = -1
            player.setVelocityX(-player.veerVelocity)
            player.anims.play('veer-left')
        }
        else if (right.isDown && !left.isDown) {
            player.direction = 1
            player.setVelocityX(player.veerVelocity)
            player.anims.play('veer-right')
        }

        if (down.isDown) {
            this.stateMachine.transition('turn')
            return
        }
    }
}

class TurnState extends State {
    execute(scene, player) {
        // scene.speed = 1.5
        scene.player.body.setCollideWorldBounds(false)

        const { left, right, up, down, } = scene.keys

        if (scene.player.body.checkWorldBounds()) {
            scene.tip = "Stay on course!\nWatch out for\nthe trees!"
            this.stateMachine.transition('fall')
            return
        }

        if (!(down.isDown)) {
            // scene.speed = 2
            scene.player.body.setCollideWorldBounds(true)
            this.stateMachine.transition('veer')
            return
        }

        if (left.isDown && !right.isDown) {
            player.setVelocityX(-player.turnVelocity)
            player.anims.play('turn-left')
        }
        else if (right.isDown && !left.isDown) {
            player.setVelocityX(player.turnVelocity)
            player.anims.play('turn-right')
        }

        if (!(left.isDown || right.isDown) && down.isDown) {
            // scene.speed = 2
            this.stateMachine.transition('twist')
            return
        }
    }
}

class TwistState extends State {
    execute(scene, player) {
        const { left, right, up, down, } = scene.keys

        player.setVelocityX(player.direction * (player.turnVelocity - player.veerVelocity))
        
        if (scene.player.body.checkWorldBounds()) {
            scene.tip = 'Tip: you lost\nbalance! For a\nclean turn,\nrelease ↓ before\nreleasing ← or →'
            this.stateMachine.transition('fall')
            return
        }
        
        if (player.direction == -1) {
            if (Phaser.Input.Keyboard.JustDown(right) && Phaser.Input.Keyboard.JustDown(down)) {
                this.stateMachine.transition('coasting')
                return
            }
        }
        else if (player.direction == 1) {
            if (Phaser.Input.Keyboard.JustDown(left) && Phaser.Input.Keyboard.JustDown(down)) {
                player.direction = 0
            }
        }
        else {
            player.anims.play('coasting')
            if (!down.isDown) {
                this.stateMachine.transition('coasting')
                return
            }
            else if (Phaser.Input.Keyboard.JustDown(left) || Phaser.Input.Keyboard.JustDown(right)) {
                scene.tip = 'Tip: Shift your\nweight before\nyou twist. Hold\n← or →, then ↓,\nin that order.'
                this.stateMachine.transition('fall')
            }
        }
    }
}

class FallState extends State {
    enter(scene, player) {
        scene.gameOver = true

        scene.speed = 0
            
        scene.add.text(game.config.width/2, game.config.height/8, `GAME OVER!\nScore: ${scene.score}`, scene.uiConfig).setOrigin(0.5).setLetterSpacing(0.8)
        scene.add.text(game.config.width/2, game.config.height*3/8, scene.tip, scene.uiConfig).setOrigin(0.5).setLetterSpacing(0.8)
        scene.add.text(game.config.width/2, game.config.height*5/8, 'Press ↑ to\ngo again!', scene.uiConfig).setOrigin(0.5).setLetterSpacing(0.8)
    }
}

