class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        
    }
    create() {
        this.charLeftGroup = this.physics.add.group();
        this.charRightGroup = this.physics.add.group();
        this.charOnLeft = false;
        this.charOnRight = false;    

        this.obsLeftGroup = this.physics.add.group();
        this.obsRightGroup = this.physics.add.group();

        this.coinLeftGroup = this.physics.add.group();
        this.coinRightGroup = this.physics.add.group();


        this.hit = false;
        this.coinHit = false;
        this.bg = false;
        this.life = 3;

        // this.bottom = false;
        // this.main = false;
        // this.top = false;

        mt.model.score = 0;

        this.aGrid = new AlignGrid({scene:this, rows:11, cols:11});


        // ------- background ------
        mt.mediaManager.setBackground("audio_bg");
        this.loadBackground();
        this.loadFlag();

        
        // this.aGrid.showNumbers();
        // ------- first char ------
        this.createCharLeft();

        // ------- create pos obs & bonus ------
        this.makePosObs();
        
        this.level = 4500;
        this.flag = false;
        this.timeObs = this.time.addEvent({ delay: this.level, callback: this.makePosObs, callbackScope: this, loop: true });

        this.bonus = 8000;
        this.coinFlag = false;
        this.timeCoin = this.time.addEvent({ delay: this.bonus, callback: this.makePosCoin, callbackScope: this, loop: true });


        // ------- score ------
        this.scoreText = this.add.text(0,0, "score: " + mt.model.score, {color: '#000', fontFamily: 'Lora'});
        this.aGrid.placeAtIndex(0, this.scoreText);   

        this.lifeText = this.add.text(0,0, "life: " + this.life, {color: '#000', fontFamily: 'Lora'});
        this.aGrid.placeAtIndex(9, this.lifeText);

        // ------- game & flag timer ------
        this.time.addEvent({ delay: 60000, callback: this.win, callbackScope: this, loop: false });


        this.showButton();

        // this.time.addEvent({ delay: 1000, callback: this.scrollBottom, callbackScope: this, loop: false });
        // this.time.addEvent({ delay: 4000, callback: this.scrollMain, callbackScope: this, loop: false });
        // this.time.addEvent({ delay: 56000, callback: this.scrollMain, callbackScope: this, loop: false });     


    }
    
    // =========== BACKGROUND ================
    loadBackground(){
        // this.bg_top = this.add.tileSprite(0,0,game.config.width,game.config.height,"bg_top");
        // this.bg_top.setOrigin(0, 0);

        this.bg_main = this.add.tileSprite(0,0,game.config.width,game.config.height,"bg_main");
        // this.bg_main = this.physics.add.image(0,0, "bg_main");
        // this.bg_main.displayWidth = game.config.width;
        // this.bg_main.displayHeight = game.config.height;
        // this.bg_main.setGravityY(-100);
        this.bg_main.setOrigin(0, 0);

        // this.bg_bottom = this.add.tileSprite(0,0,game.config.width,game.config.height,"bg_bottom");
        // this.bg_bottom.setOrigin(0, 0);

        // --- TILE MAP ----
        // this.map = this.make.tilemap({key: 'map'});
        // this.tiles = this.map.addTilesetImage('bg_game');
        // this.bg_bottom = this.map.createStaticLayer('bg_game_3', this.tiles, 0, 0);
        // this.bg_main = this.map.createStaticLayer('bg_game_2', this.tiles, 0, 0);
        // this.bg_top = this.map.createStaticLayer('bg_game_1', this.tiles, 0, 0);


    }

    loadFlag(){
        this.navBar =  this.add.image(0,0, "barFlag");
        this.aGrid.placeAtIndex(56, this.navBar);  
        this.navBar.setOrigin(0.5,0.5);

        this.navFlag = this.physics.add.sprite(0,0, "flag");
        this.aGrid.placeAtIndex(78, this.navFlag);  
        this.navFlag.setOrigin(0.5,0.5);


        this.tweens.add({
            targets: this.navFlag,
            duration: 60000,
            y:180
        });

    }
    // ============ CHARACTER ========================================
    createCharLeft(){
        // mt.mediaManager.playSound("pop");
        this.charOnLeft = true;
        if(this.charOnRight == true){
            this.destroyChar(this.charRight);
            game.anims.remove('climb_right');
            this.charOnRight = false;
        }

        this.charLeft = this.physics.add.sprite(game.config.width/2.15, game.config.height/1.5, 'main_sprite_left');
        this.charLeftGroup.add(this.charLeft);
        this.charLeft.scaleX = .25;
        this.charLeft.scaleY = .25;

        var charFrame = this.anims.generateFrameNumbers('main_sprite_left');
        this.anims.create({
            key: 'climb_left',
            frames: charFrame,
            frameRate: 5, //higher - faster
             repeat: -1 //brp kali jalan, -1 infinite , misal 3: 3x play
        });

        this.charLeft.play('climb_left');
        this.charLeft.setImmovable();
        this.charOnLeft = true;


    }
    createCharRight(){
        // mt.mediaManager.playSound("pop");
        this.charOnRight = true;
        if(this.charOnLeft == true){
            this.destroyChar(this.charLeft);
            game.anims.remove('climb_left');
            this.charOnLeft = false;
        }
        this.charRight = this.physics.add.sprite(game.config.width/1.85, game.config.height/1.5, 'main_sprite_right');
        this.charRightGroup.add(this.charRight);
        this.charRight.scaleX = .4;
        this.charRight.scaleY = .4;

        var charFrame = this.anims.generateFrameNumbers('main_sprite_right');
        this.anims.create({
            key: 'climb_right',
            frames: charFrame,
            frameRate: 5, //higher - faster
            repeat: -1 //brp kali jalan, -1 infinite , misal 3: 3x play
        });
        this.charRight.play('climb_right');
        this.charRight.setImmovable();
        this.charOnRight = true;

    }
    // ========== OBSTACLE ===================================
    createObsLeft(){
        this.obs_left = this.physics.add.image(game.config.width/2.2, -100, 'obs_left');
        this.obsLeftGroup.add(this.obs_left);
        this.obs_left.scaleX = .8;
        this.obs_left.scaleY = .8;

        this.obs_left.setGravityY(200);

        // this.physics.add.collider(this.obs_left, this.charLeft, this.hitOil, null,this);

    }
    createObsRight(){
        this.obs_right = this.physics.add.image(game.config.width/1.85, -100, 'obs_right');
        this.obsRightGroup.add(this.obs_right);
        this.obs_right.scaleX = .8;
        this.obs_right.scaleY = .8;

        this.obs_right.setGravityY(200);

        // this.physics.add.collider(this.obs_right, this.charRight, this.hitOil, null,this);

    }
    
    // ============= CUSTOM ================
    hitOil(oil, target){
        this.hit = true;
        mt.mediaManager.playSound("wrong");
        console.log("kena minyak, game over!");
        this.life--;

        if(this.life > 0 ){
            oil.destroy();
            this.lifeText.setText("life: "+this.life);


        }
        else if(this.life == 0){
            if(this.charOnLeft == true){
                this.charLeft.setGravityY(100);
            }else if(this.charOnRight == true){
                this.charRight.setGravityY(100);
            }
            this.lifeText.setText("life: "+this.life);
            this.time.addEvent({ delay: 3500, callback: this.gameOver, callbackScope: this, loop: false });
            // this.gameOver();
        }


    }

    makePosObs(){
        var position = ['left','right'];
        this.obsPosition = position[Math.floor(Math.random()*position.length)];

        console.log('pos: ', this.obsPosition);
        
        if( this.obsPosition == 'left'){
            this.createObsLeft();
        }
        else if(this.obsPosition == 'right'){
            this.createObsRight();
        }

        console.log('time: ',this.level/1000 +" s");
        
    }
   
    showButton(){   

        this.btnLeft = this.add.image(0, 0, "btnLeft");
        this.aGrid.placeAtIndex(103, this.btnLeft);   
        this.btnLeft.scaleX = .3;
        this.btnLeft.scaleY = .3;
        this.btnLeft.setInteractive();
        this.btnLeft.on('pointerdown', this.createCharLeft, this);
        
        //  RIGHT
        this.btnRight = this.add.image(0, 0, "btnRight");
        this.aGrid.placeAtIndex(105, this.btnRight);
        this.btnRight.scaleX = .3;
        this.btnRight.scaleY = .3;
        this.btnRight.setInteractive();
        this.btnRight.on('pointerdown', this.createCharRight, this);

        this.keyBar = this.input.keyboard.createCursorKeys();

    } 

    gameOver(){
        mt.mediaManager.stopMusic("bg_main");
        this.scene.start("SceneOver");
    }

    destroyChar(char){
        char.destroy();      
    }
    win(){
        // alert("YOU WIN!!");
        mt.mediaManager.stopMusic("bg_main");
        mt.mediaManager.playSound("levelUp");
        console.log("YES WIN");
        this.scene.start("SceneWin");

    }

    // ======= BONUS ==========================
    createCoinLeft(){
        this.coinLeft = this.physics.add.image(game.config.width/2.2, -100, "coin");
        this.coinLeftGroup.add(this.coinLeft);
        this.coinLeft.scaleX = .5;
        this.coinLeft.scaleY = .5;

        this.coinLeft.setGravityY(200);
    }
    createCoinRight(){
        this.coinRight= this.physics.add.image(game.config.width/1.85, -100, "coin");
        this.coinRightGroup.add(this.coinRight);
        this.coinRight.setGravityY(200);
        this.coinRight.scaleX = .5;
        this.coinRight.scaleY = .5;
    }
    hitCoin(coin, target){
        this.coinHit = true;
        mt.model.score += 10;
        this.scoreText.setText("score: "+mt.model.score);
        console.log("lgsg kena koin");

        mt.mediaManager.playSound("levelUp");
        coin.destroy();

    }
    makePosCoin(){
        var position = ['left','right'];
        this.coinPosition = position[Math.floor(Math.random()*position.length)];
        console.log('coin pos: ', this.coinPosition);

        if( this.coinPosition == 'left'){
            this.createCoinLeft();
        }
        else if(this.coinPosition == 'right'){
            this.createCoinRight();
        }

    }

  
    // ===== UPDATE =============
    update() {
        this.bg_main.tilePositionY--;

        
        this.obsLeftGroup.children.iterate(function(child){
            if(child){
                if(child.y > game.config.height){
                    child.destroy();
                    mt.model.score += 5;
                    this.flag = true;
                    this.scoreText.setText("score: "+mt.model.score);

                }
                if(child.y >= game.config.height/1.8){
                    this.physics.overlap(child,this.charLeft,this.hitOil, null, this);
                }
            }
        }.bind(this))
        
        this.obsRightGroup.children.iterate(function(child){
            if(child){
                if(child.y > game.config.height){
                    child.destroy();
                    mt.model.score += 5;
                    this.flag = true;
                    this.scoreText.setText("score: "+mt.model.score);
                }
                if(child.y >= game.config.height/1.8){
                    this.physics.overlap(child,this.charRight,this.hitOil, null, this);
                }
            }
        }.bind(this))
        
              
        //if score > 10 , level = 2000
        if(mt.model.score === 10 && this.flag){
            this.timeObs.remove();
            this.level = this.level - 2000;
            this.flag = false;
            console.log("poin = 10 | 2500")
            this.timeObs = this.time.addEvent({ delay: this.level, callback: this.makePosObs, callbackScope: this, loop: true });
            
        }
        else if(mt.model.score === 30 && this.flag){
            this.timeObs.remove();
            this.level = this.level - 1000;
            console.log("time  >30 | 1500");
            this.flag = false;
            this.timeObs = this.time.addEvent({ delay: this.level, callback: this.makePosObs, callbackScope: this, loop: true });

        }
        else if(mt.model.score === 50 && this.flag){
            this.timeObs.remove();
            this.level = this.level - 500;
            console.log("time  >50 | 1000");
            this.flag = false;
            this.time.addEvent({ delay: this.level, callback: this.makePosObs, callbackScope: this, loop: true });
        }

        // ==========================================================
        // ---- BONUS -----------
        this.coinLeftGroup.children.iterate(function(child){
            if(child){
                if(child.y > game.config.height){
                    child.destroy();
                    this.coinFlag = true;
                }
                if(child.y >= game.config.height/1.8){
                    this.physics.overlap(child,this.charLeft,this.hitCoin, null, this);
                }
            }
        }.bind(this))
        
        this.coinRightGroup.children.iterate(function(child){
            if(child){
                if(child.y > game.config.height){
                    child.destroy();
                    this.coinFlag = true;

                }
                if(child.y >= game.config.height/1.8){
                    this.physics.overlap(child,this.charRight,this.hitCoin, null, this);
                }
            }
        }.bind(this))

        if(mt.model.score == 30 && this.coinFlag){
            this.timeCoin.remove();
            this.bonus = this.bonus - 4000;
            this.coinFlag = false;
            this.timeCoin = this.time.addEvent({ delay: this.bonus, callback: this.makePosCoin, callbackScope: this, loop: true });
        }else if(mt.model.score == 50 && this.coinFlag){
            this.timeCoin.remove();
            this.bonus = this.bonus - 4000;
            this.coinFlag = false;
            this.time.addEvent({ delay: this.bonus, callback: this.makePosCoin, callbackScope: this, loop: true });
        }

        // ==== KEYBOARD ======
        if (this.keyBar.left.isDown){
            this.destroyChar(this.charLeft);
            this.createCharLeft();            
        }
        if (this.keyBar.right.isDown){
            if(this.charOnRight == true){
                this.destroyChar(this.charRight);
                this.createCharRight();
            }else{
                this.createCharRight();
            }
        }
        

     
    }
}