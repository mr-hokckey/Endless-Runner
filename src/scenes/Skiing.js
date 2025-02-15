// This file is for creating ASCII art!
// I found out that you can right click on the canvas at any time and download the image as a png.
// So I used this to make the background using ASCII and colored backgrounds!

class Skiing extends Phaser.Scene {
    constructor() {
        super('skiingScene')
    }

    create() {    
        let skyConfig = {
            backgroundColor: '#00bfff',
            fontStyle: 'Bold'
        }

        let treeTrunksConfig = {
            backgroundColor: '#8b4513',
            color: '#321414'
        }

        let treeLeavesConfig = {
            fontStyle: 'Bold',
            // backgroundColor: '#014421',
            // color: '#01796f'
            color: '#014421'
        }
        
        let snowConfig = {
            backgroundColor: '#f0f8ff',
        }

        let snowBorderConfig = {
            backgroundColor: '#e6e8fa',
        }

        let ascii_sky =
`                                                                


     _____           _ _                                   
    | ____|_ __   __| | | ___  ___ ___                     
    |  _| | '_ \\ / _\` | |/ _ \\/ __/ __|                    
    | |___| | | | (_| | |  __/\\__ \\__ \\                    
    |_____|_| |_|\\__,_|_|\\___||___/___/___ ___ ___          
                              / ___| / ___|_ _|_ _|___ _ __ 
                              \\___ \\| |    | | | |/ _ \\ '__|
                               ___) | |___ | | | |  __/ |   
                              |____/ \\____|___|___\\___|_|   



`
// credit to https://patorjk.com/software/taag/ for letting me create this title art!

        let ascii_snow = 
`*   .     *   .  *   .     *   .  *   .     *   .  *   .     * 
  .   *  .  *   .   *  .  *   .  *   .   *  .  *   .   *  .  *  
*   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *
   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  * 
*   .     *   .  *   .     *   .  *   .     *   .  *   .     * 
  .   *  .  *   .   *  .  *   .  *   .   *  .  *   .   *  .  *  
*   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *
   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  * 
*   .     *   .  *   .     *   .  *   .     *   .  *   .     *  
  .   *  .  *   .   *  .  *   .  *   .   *  .  *   .   *  .  *  
*   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *
   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  * 
*   .     *   .  *   .     *   .  *   .     *   .  *   .     * 
  .   *  .  *   .   *  .  *   .  *   .   *  .  *   .   *  .  *  
*   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *
   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  * 
*   .     *   .  *   .     *   .  *   .     *   .  *   .     *  
  .   *  .  *   .   *  .  *   .  *   .   *  .  *   .   *  .  *  
*   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *
   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  * 
*   .     *   .  *   .     *   .  *   .     *   .  *   .     * 
  .   *  .  *   .   *  .  *   .  *   .   *  .  *   .   *  .  *  
*   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *
   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  * 
*   .     *   .  *   .     *   .  *   .     *   .  *   .     *  
  .   *  .  *   .   *  .  *   .  *   .   *  .  *   .   *  .  *  
*   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *
   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  * 
*   .     *   .  *   .     *   .  *   .     *   .  *   .     *  
  .   *  .  *   .   *  .  *   .  *   .   *  .  *   .   *  .  *  
*   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *
   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  *   .  * `

        let ascii_snowBorder = 
`*   .     *   . 
  .   *  .  *   
*   .  *   .  * 
   .  *   .  *  
*   .     *   . 
  .   *  .  *   
*   .  *   .  * 
   .  *   .  *  
*   .     *   . 
  .   *  .  *   
*   .  *   .  * 
   .  *   .  *  
*   .     *   . 
  .   *  .  *   
*   .  *   .  * 
   .  *   .  *  
*   .     *   . 
  .   *  .  *   
*   .  *   .  * 
   .  *   .  *  
*   .     *   . 
  .   *  .  *   
*   .  *   .  * 
   .  *   .  *  
*   .     *   . 
  .   *  .  *   
*   .  *   .  * 
   .  *   .  *  
*   .     *   . 
  .   *  .  *   
*   .  *   .  * 
   .  *   .  *  `

        let ascii_tree = 
`   /\\
  /XX\\
  /XX\\
 /XXXX\\
 /XXXX\\
/XXXXXX\\`

        let snow = this.add.text(0,0, ascii_snow, snowConfig).setLetterSpacing(0.4)
        
        // draw the sky and the title!

        let sky = this.add.text(0, 0, ascii_sky, skyConfig).setLetterSpacing(0.4)

        // draw the ski hill

        // let snowBorderLeft = this.add.text (0,0, ascii_snowBorder, snowBorderConfig).setLetterSpacing(0.4)
        // let snowBorderRight = this.add.text (480,0, ascii_snowBorder, snowBorderConfig).setLetterSpacing(0.4)

        // this.drawTree(60,   -60)
        // this.drawTree(0,    0)
        // this.drawTree(70,   60)
        // this.drawTree(-50,  90)
        // this.drawTree(20,   135)
        // this.drawTree(80,   195)
        // this.drawTree(0,    255)
        // this.drawTree(60,   300)
        // this.drawTree(-20,  360)
        // this.drawTree(60,   420)

        // this.drawTree(560-60,   -90)
        // this.drawTree(560+20,   -30)
        // this.drawTree(560-60,   90+-60)
        // this.drawTree(560-0,    90+0)
        // this.drawTree(560-70,   90+60)
        // this.drawTree(560+50,   90+90)
        // this.drawTree(560-20,   90+135)
        // this.drawTree(560-80,   90+195)
        // this.drawTree(560-0,    90+255)
        // this.drawTree(560-60,   90+300)
        // this.drawTree(560+20,   90+360)
    }

    drawTree(x, y) {
        let ascii_leaves = 
`   /\\
  /XX\\
  /XX\\
 /XXXX\\
 /XXXX\\
/XXXXXX\\`

        let ascii_trunk = 
`HH
HH`

        this.add.text(x+30, y + 90, ascii_trunk, {
            fontStyle: 'Bold',
            color: '#8b4513'
        }).setLetterSpacing(0.4)

        this.add.text(x, y, ascii_leaves, {
            fontStyle: 'Bold',
            color: '#014421'
        }).setLetterSpacing(0.4)
    }
}