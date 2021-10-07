class Model {
    constructor() {
        this.numberOfColors = 4;
        this.score = 0;
        //
        //
        this._musicOn = true;
        this._sfxOn = true;
        this._charPos = false;
        this.gameTitle="Panjat\nPinang";
        this.instructionText="- Hindari minyak dengan menenkan tombol kanan/kiri atau \n menggunakan keyboard (kanan/kiri) sejauh laju \n bendera yang berada disisi kiri.\n- Anda akan mendapatkan 5 poin setiap minyak yang dilewati. \n- Kumpulkan poin bonus berupa coin yang berjatuhan.\n- Anda memiliki 3x kesempatan dalam satu permainan.";
    }
    set musicOn(val) {
        this._musicOn = val;
        console.log(val);
        mt.emitter.emit(mt.constants.MUSIC_CHANGED);
    }
    get musicOn() {
        return this._musicOn;
    }
    set sfxOn(val) {
        this._sfxOn = val;
        console.log(val);
        mt.emitter.emit(mt.constants.SOUND_CHANGED);
    }
    get sfxOn() {
        return this._sfxOn;
    }
    // change pos char
    

}