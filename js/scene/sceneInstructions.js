class SceneInstructions extends Phaser.Scene {
    constructor() {
        super('SceneInstructions');
    }
    preload() {}
    create() {
        console.log("SceneInstructions!");
        this.back = this.add.image(0, 0, "titleBack");
        this.back.setOrigin(0, 0);
        this.back.displayWidth = game.config.width;
        this.back.displayHeight = game.config.height;

        // var c = Phaser.Color.getRandomColor(50, 255, 255);
        // game.stage.backgroundColor = c;

        this.aGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11
        });
    //    this.aGrid.showNumbers();

        //
        //
        this.sampleImage = this.add.image(0, 0, "insImg");
        Align.scaleToGameW(this.sampleImage, .5);
        this.aGrid.placeAtIndex(38, this.sampleImage);
        this.text1 = this.add.text(0, 0, mt.model.instructionText, {
            color: "#000000",
            fontSize: game.config.width / 35,
            fontFamily: "Lora",
            backgroundColor:"#ffffff"
        });
        this.text1.setOrigin(0.5, 0.5);
        this.aGrid.placeAtIndex(82, this.text1);


        this.btnStart = new TextButton({
            scene: this,
            key: "green",
            event: mt.constants.SHOW_TITLE,
            params:this.scene,
            text: "Home",
            scale: .35,
            textScale: 25,
            textColor: '#ffffff'
        });
        this.aGrid.placeAtIndex(104,this.btnStart);

    }
    update() {}
}