class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload() {
        
    }
    create() {
       
        this.back = this.add.image(0, 0, "bg_home");
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
        this.titleText = this.add.text(game.config.width/2, 210, mt.model.gameTitle, {
            fontSize: game.config.width / 10,
            color: "#000000",
            fontFamily: 'Sigmar One',
            align: 'center'
            
        });
        this.titleText.setOrigin(0.5, 0.5);
        // this.aGrid.placeAtIndex(25, this.titleText);

        //
        //
        this.btnStart = new TextButton({
            scene: this,
            key: "green",
            event: mt.constants.START_GAME,
            params: this.scene,
            text: "Start Game",
            scale: .5,
            textScale: 20,
            textColor: '#000000'
        });
        Align.center(this.btnStart);
        // this.btnStart.fontWeight = 'bold';
        //
        //
        //
        this.btnInstr = new TextButton({
            scene: this,
            key: "blue",
            event: mt.constants.SHOW_INSTR,
            params: this.scene,
            text: "How to Play",
            scale: .35,
            textScale: 30,
            textColor: '#000000'
        });
        this.aGrid.placeAtIndex(79, this.btnInstr);

        this.btnSettings = new TextButton({
            scene: this,
            key: "orange",
            event: mt.constants.SHOW_SETTINGS,
            params: this.scene,
            text: "Settings",
            scale: .35,
            textScale: 30,
            textColor: '#000000'
        });
        this.aGrid.placeAtIndex(85, this.btnSettings);


    }
}