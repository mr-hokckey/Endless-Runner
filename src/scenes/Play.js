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
    }

    update() {

        if (this.gameOver) {

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