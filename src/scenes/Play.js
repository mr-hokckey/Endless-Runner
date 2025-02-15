class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.speed = 2

        this.tip = 'Hello World!'
        this.gameOver = false

        this.score = 0
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 640, 480, 'ski-hill').setOrigin(0, 0)

        this.physics.world.setBounds(160, 0, 320, 480)

        this.player = new Player(this, 320, 400, 'player', 0)

        this.keys = this.input.keyboard.createCursorKeys()

        this.timer = this.time.addEvent({
            delay: 1000, // ms
            callback: () => {
                this.score++
            },
            callbackScope: this,
            loop: true,
        });

        this.uiConfig = {
            fontSize: '32px',
            color: '#000000',
            fontStyle: 'Bold'
        }
        this.scoreText = this.add.text(0, 0, `GAME OVER!${this.score}`, this.uiConfig)
        this.scoreText.setLetterSpacing(0.8)
        console.log(this.scoreText.width)
    }

    update() {
        // if (keys.down.isDown && this.speed >= 1) {
        //     this.speed -= 0.1
        //     console.log(this.speed)
        // }

        // this.player.play('coasting', true)
        
        // if (keys.left.isDown) {
        //     this.player.x -= 1
        //     this.player.play('veer-left', true)
        //     if (keys.down.isDown) {
        //         this.player.x -= 2
        //         this.player.play('turn-left', true)
        //     }
        // }
        // else if (keys.right.isDown) {
        //     this.player.x += 1
        //     this.player.play('veer-right', true)
        //     if (keys.down.isDown) {
        //         this.player.x += 2
        //         this.player.play('turn-right', true)
        //     }
        // }
        if (this.gameOver) {
            // this.speed = 0
            
            // this.add.text(game.config.width/2, game.config.height/4, `GAME OVER!\nScore: ${this.score}`, this.uiConfig).setOrigin(0.5)

            // this.add.text(game.config.width/2, game.config.height*3/4, 'Press ↑ to go again!', this.uiConfig).setOrigin(0.5)

            if (this.keys.up.isDown) {
                this.scene.restart()
            }
        } else {   
            this.playerFSM.step()

            this.background.tilePositionY -= this.speed;

            this.scoreText.setText(`${this.score}`)
        }
    }
}