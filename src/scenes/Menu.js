class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    preload() {
        this.load.image('ski-hill', './assets/skiing.png')
        this.load.image('title', './assets/title.png')
        this.load.image('rock', './assets/rock.png')

        this.load.spritesheet('player', './assets/player.png', {
            frameWidth: 40,
            frameHeight: 60
        })
    }

    create() {
        this.keys = this.input.keyboard.createCursorKeys()

        this.background = this.add.tileSprite(0, 0, 640, 480, 'title').setOrigin(0, 0)

        this.uiConfig = {
            fontSize: '32px',
            color: '#000000',
            fontStyle: 'Bold'
        }
        this.add.text(game.config.width/2, game.config.height*3/4, 'Press ← or → to lean\na direction, press ↓ to\ntwist and get a sharper turn.\nPress ↑ to play!', this.uiConfig).setOrigin(0.5).setLetterSpacing(0.8)

        this.uiConfig = {
            fontSize: '32px',
            color: '#000000',
            fontStyle: 'Bold'
        }

        this.anims.create({
            key: 'coasting',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                frames: [0, 1, 0, 2]
            })
        })

        this.anims.create({
            key: 'veer-left',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 1,
                end: 1
            })
        })

        this.anims.create({
            key: 'veer-right',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 2,
                end: 2
            })
        })

        this.anims.create({
            key: 'turn-left',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 3,
                end: 3
            })
        })

        this.anims.create({
            key: 'turn-right',
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 4,
                end: 4
            })
        })
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
            this.scene.start('playScene')
        }
    }
}