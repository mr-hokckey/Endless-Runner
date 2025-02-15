class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    init() {
        this.speed = 2

        this.tip = 'Watch out for\nthe rocks!'
        this.gameOver = false

        this.score = 0

        this.EASY_INTERVAL = 120
        this.MEDIUM_INTERVAL = 90
        this.HARD_INTERVAL = 60
        this.current_interval = this.EASY_INTERVAL

        this.counter = 0
        this.rockNum = 0
    }

    create() {
        this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
        
        this.background = this.add.tileSprite(0, 0, 640, 480, 'ski-hill').setOrigin(0, 0)

        this.physics.world.setBounds(160, 0, 320, 480)

        //this.rock1 = this.physics.add.sprite(lane[0], 0, 'rock')

        this.rocks = []

        this.player = new Player(this, 320, 400, 'player', 0)
        this.player.setDepth(1)

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

        // Quickly made a rock sprite

        // this.add.text(160, 300, ' ____\n/^|^^\\\n______', {
        //     color: '#6e7f80',
        //     fontStyle: 'Bold'
        // }).setLetterSpacing(0.4)
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

            for (let i = 0; i < this.rocks.length; i++) {
                this.rocks[i].y += this.speed
                if (this.rocks[i].y > 500) {

                }
            }

            this.counter += this.speed

            if (this.counter == this.current_interval) {
                let rock = this.physics.add.sprite(lane[Phaser.Math.Between(0, 3)], 0, 'rock')
                rock.body.setSize(rock.width, rock.height/2).setOffset(0, rock.height/2)
                rock.body.setImmovable(true) // I am unbelievably tempted to delete this line

                this.physics.add.collider(rock, this.player, () => {
                    this.player.destroy()
                    this.gameOver = true
                    this.add.text(game.config.width/2, game.config.height/8, `GAME OVER!\nScore: ${this.score}`, this.uiConfig).setOrigin(0.5).setLetterSpacing(0.8)
                    this.add.text(game.config.width/2, game.config.height*3/8, this.tip, this.uiConfig).setOrigin(0.5).setLetterSpacing(0.8)
                    this.add.text(game.config.width/2, game.config.height*5/8, 'Press ↑ to\ngo again!', this.uiConfig).setOrigin(0.5).setLetterSpacing(0.8)
                })
                
                this.rocks[this.rockNum] = rock
                this.rockNum = (this.rockNum + 1) % 20
                this.counter = 0

                if (this.score == 15) {
                    this.current_interval = this.MEDIUM_INTERVAL
                } else if (this.score == 30) {
                    this.current_interval = this.HARD_INTERVAL
                } 
            }
        }
    }
}