class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad');
    }
    preload() {
        this.progText = this.add.text(0, 0, "0%", {
            color: '#ffffff',
            fontSize: game.config.width / 10
        });
        this.progText.setOrigin(0.5, 0.5);
        Align.center(this.progText);
        // Effect.preload(this, 7);
        this.load.on('progress', this.showProgress, this);
        this.load.image("btnStart", "images/btnStart.png");
        this.load.image("titleBack", "images/titleBack.jpg");
        this.load.image("blue", "images/buttons/blue.png");
        this.load.image("red", "images/buttons/red.png");
        this.load.image("orange", "images/buttons/orange.png");
        this.load.image("green", "images/buttons/green.png");
        this.load.image("sample", "images/sample.png");
        this.load.image("coin", "images/pinang/coin.png");
        this.load.image("insImg", "images/pinang/inst-example.png");


        //
        //
        //

        this.load.spritesheet('main_sprite_left', 'images/pinang/main_sprite_left.png', { frameWidth: 498, frameHeight: 822 });
        this.load.spritesheet('main_sprite_right', 'images/pinang/main_sprite_right.png', { frameWidth: 341, frameHeight: 563 });
        
        this.load.image('obs_right', 'images/pinang/main_obs_right.png');
        this.load.image('obs_left', 'images/pinang/main_obs_left.png');


        this.load.image('bg_bottom', 'images/pinang/bg_game_3.png');
        this.load.image('bg_main', 'images/pinang/bg_game_2.png');
        this.load.image('bg_top', 'images/pinang/bg_game_1.png');

        this.load.image('bg_home', 'images/pinang/bg_home.png');
        this.load.image('bg_over', 'images/pinang/bg_over.png');


        this.load.image('btnLeft', 'images/pinang/left.png');
        this.load.image('btnRight', 'images/pinang/right.png');
        this.load.image('flag', 'images/pinang/nav_icon.png');
        this.load.image('barFlag', 'images/pinang/nav_bar.png');




        // JSON SPRITE
        // this.load.atlas('sprite_left', 'images/pinang/sprite_left.png', 'json/sprite_left.json');
        // this.load.json('sprite_left_shape', 'json/sprite_left_shape.json');

        // JSON BACKGROUND
        // this.load.tilemapTiledJSON('map', 'json/bg_game.json');
        // this.load.spritesheet('bg_game', 'images/pinang/bg_game.png', {
        //     frameWidth: 480, 
        //     frameHeight: 640
        // });

        this.load.audio("pop", "audio/swish1.wav");
        this.load.audio("wrong", "audio/wrong.wav");
        this.load.audio("levelUp", "audio/levelUp.wav");
        this.load.audio("audio_bg", "audio/background.mp3");
    }
    create() {
        mt.emitter = new Phaser.Events.EventEmitter();
        mt.controller = new Controller();
        mt.mediaManager = new MediaManager({
            scene: this
        });
        this.scene.start("SceneTitle");
    }
    showProgress(prog) {
        var per = Math.floor((prog / 1) * 100);
        this.progText.setText(per + "%");
        
    }
    update() {}
}