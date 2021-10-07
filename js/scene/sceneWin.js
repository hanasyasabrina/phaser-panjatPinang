class SceneWin extends Phaser.Scene{
    constructor(){
        super('SceneWin');
    }
    preload(){

    }
    create(){
        this.back = this.add.image(0, 0, "bg_over");
        this.back.setOrigin(0, 0);
        this.back.displayWidth = game.config.width;
        this.back.displayHeight = game.config.height;
        this.aGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11
        });

        this.winText = this.add.text(game.config.width/2, 200, 
            "YOU WIN !!!", 
            {color: '#972824', fontFamily: 'Sigmar One', fontSize: '36px'
        });
        this.winText.setOrigin(0.5, 0.5);


        this.scoreText = this.add.text(game.config.width/2, 300, 
            "score: " + mt.model.score, 
            {color: '#000', fontFamily: 'Lora', fontSize: '24px'
        });
        this.scoreText.setOrigin(0.5, 0.5);

        this.btnStart = new TextButton({
            scene: this,
            key: "red",
            event: mt.constants.START_GAME,
            params: this.scene,
            text: "Play Again",
            scale: .40,
            textScale: 20,
            textColor: '#000000'
        });
        this.aGrid.placeAtIndex(71,this.btnStart);


        this.btnHome = new TextButton({
            scene: this,
            key: "green",
            event: mt.constants.SHOW_TITLE,
            params:this.scene,
            text: "Home",
            scale: .35,
            textScale: 25,
            textColor: '#ffffff'
        });
        this.aGrid.placeAtIndex(93,this.btnHome);
    }
    update(){

    }
}