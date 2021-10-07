class SceneOver extends Phaser.Scene {
    constructor() {
        super('SceneOver');
    }
    preload() {}
    create() {
        this.back = this.add.image(0, 0, "bg_over");
        this.back.setOrigin(0, 0);
        this.back.displayWidth = game.config.width;
        this.back.displayHeight = game.config.height;
        this.aGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11
        });
    //    this.aGrid.showNumbers();
        //
        //
        //
        this.titleText = this.add.text(game.config.width/2, 100, mt.model.gameTitle, {
            fontSize: game.config.width / 10,
            color: "#000000",
            align: 'center',
            fontFamily: 'Sigmar One'
        });
        this.titleText.setOrigin(0.5, 0.5);
        //

        // ------- score ------
        this.scoreText = this.add.text(game.config.width/2, 200, 
            "score: " + mt.model.score, 
            {color: '#000', fontFamily: 'Lora', fontSize: '24px'
        });
        this.scoreText.setOrigin(0.5, 0.5);
  
        // 
        // 
        //
        this.btnStart = new TextButton({
            scene: this,
            key: "red",
            event: mt.constants.START_GAME,
            params: this.scene,
            text: "Play Again",
            scale: .5,
            textScale: 20,
            textColor: '#000000'
        });
        Align.center(this.btnStart);
        //
        //
        //
        this.btnInstr = new TextButton({
            scene: this,
            key: "blue",
            event: mt.constants.SHOW_INSTR,
            params: this.scene,
            text: "How to Play",
            scale: .3, //higher-bigger
            textScale: 30,
            textColor: '#000000'
        });
        this.aGrid.placeAtIndex(80, this.btnInstr);
        this.btnSettings = new TextButton({
            scene: this,
            key: "orange",
            event: mt.constants.SHOW_SETTINGS,
            params: this.scene,
            text: "Settings",
            scale: .3,
            textScale: 30,
            textColor: '#000000'
        });
        this.aGrid.placeAtIndex(84, this.btnSettings);
    }
}