/*:@author Synrec 
 * @target MZ
 *
 * @plugindesc v1.0 Create Text Sounds
 *
 * @help Create text sounds which play by default or based on
 * face graphic set.
 * 
 * You must credit Synrec.
 * 
 * @param Default Se
 * @desc Default text sound effect played
 * @type file
 * @dir audio/se/
 * 
 * @param Default Volume
 * @desc Default sound effect volume
 * @type number
 * @max 100
 * @default 90
 * 
 * @param Default Pitch
 * @desc Default sound effect pitch
 * @type number
 * @max 150
 * @default 100
 * 
 * @param Default Pan
 * @desc Default sound effect pan
 * @type number
 * @max 100
 * @min -100
 * @default 0
 * 
 * @param Custom Text Sounds
 * @desc Setup Custom text sounds based on face graphic and index.
 * @default []
 * @type struct<TxtSounds>[]
 * 
 */
/*~struct~TxtSounds:
 * 
 * @param Face File
 * @desc File of face graphic
 * @type file
 * @dir img/faces/
 * 
 * @param Face Indices
 * @desc Indices of face used for graphic
 * @type number[]
 * @default []
 * @min 0
 * @max 7
 * 
 * @param Sound Effect
 * @desc Name of Sound Effect Used
 * @type file
 * @dir audio/se
 * 
 * @param Volume
 * @desc Default sound effect volume
 * @type number
 * @max 100
 * @default 90
 * 
 * @param Pitch
 * @desc Sound effect pitch
 * @type number
 * @max 150
 * @default 100
 * 
 * @param Pan
 * @desc Sound effect pan
 * @type number
 * @max 100
 * @min -100
 * @default 0
 * 
 */

let SynrecTS = {};
SynrecTS.Version = "1.0";
SynrecTS.Plugins = PluginManager.parameters('Synrec_TextSounds');

SynrecTS.DefaultSound = SynrecTS.Plugins['Default Se'];
SynrecTS.DefaultVol = SynrecTS.Plugins['Default Volume'];
SynrecTS.DefaultPch = SynrecTS.Plugins['Default Pitch'];
SynrecTS.DefaultPan = SynrecTS.Plugins['Default Pan'];

SynrecTS.SoundJSON = JSON.parse(SynrecTS.Plugins['Custom Text Sounds']);
SynrecTS.SoundObjects = [];
for(sound = 0; sound < SynrecTS.SoundJSON.length; sound++){
    SynrecTS.SoundJSON[sound] = JSON.parse(SynrecTS.SoundJSON[sound]);
    var soundFX = {};
    soundFX.index = sound;
    soundFX.file = SynrecTS.SoundJSON[sound]['Face File'] ? SynrecTS.SoundJSON[sound]['Face File'] : "";
    soundFX.indices = SynrecTS.SoundJSON[sound]['Face Indices'] ? JSON.parse(SynrecTS.SoundJSON[sound]['Face Indices']) : [];
    for(idces = 0; idces < soundFX.indices.length; idces++){
        soundFX.indices[idces] = eval(soundFX.indices[idces]);
    }
    soundFX.effectName = SynrecTS.SoundJSON[sound]['Sound Effect'] ? SynrecTS.SoundJSON[sound]['Sound Effect'] : SynrecTS.DefaultSound;
    soundFX.effectVol = !isNaN(SynrecTS.SoundJSON[sound]['Volume']) ? eval(SynrecTS.SoundJSON[sound]['Volume']) : SynrecTS.DefaultVol;
    soundFX.effectPch = !isNaN(SynrecTS.SoundJSON[sound]['Pitch']) ? eval(SynrecTS.SoundJSON[sound]['Pitch']) : SynrecTS.DefaultPch;
    soundFX.effectPan = !isNaN(SynrecTS.SoundJSON[sound]['Pan']) ? eval(SynrecTS.SoundJSON[sound]['Pan']) : SynrecTS.DefaultPan;
    SynrecTS.SoundObjects.push(soundFX);
}

Window_Message.SOUNDS = SynrecTS.SoundObjects;

SynrecTSWinMsgStrtMsg = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    SynrecTSWinMsgStrtMsg.call(this);
    this.createSoundData();
}

Window_Message.prototype.createSoundData = function(){
    this._soundText = undefined;
    const faceName = $gameMessage._faceName;
    const faceIndex = $gameMessage._faceIndex;
    const soundObjs = SynrecTS.SoundObjects;
    for(chkSnd = 0; chkSnd < soundObjs.length; chkSnd++){
        var sound = soundObjs[chkSnd];
        if(sound.file == faceName){
            if(sound.indices.includes(faceIndex)){
                var name = sound.effectName;
                if(name){
                    var vol = sound.effectVol;
                    var pch = sound.effectPch;
                    var pan = sound.effectPan;
                    this._soundText = {name:name, pitch:pch, pan:pan, volume:vol};
                    return true;
                }
            }
        }
    }
    const nameDef = SynrecTS.DefaultSound;
    if(!name)return false;
    const pchDef = SynrecTS.DefaultPch;
    const volDef = SynrecTS.DefaultVol;
    const panDef = SynrecTS.DefaultPan;
    this._soundText = {name:nameDef, pitch:pchDef, pan:panDef, volume:volDef};
    return true;
}

Window_Message.prototype.updateMessage = function() {
    const textState = this._textState;
    if (textState) {
        while (!this.isEndOfText(textState)) {
            if (this.needsNewPage(textState)) {
                this.newPage(textState);
            }
            this.playSound(textState);
            this.updateShowFast();
            this.processCharacter(textState);
            if (this.shouldBreakHere(textState)) {
                break;
            }
        }
        this.flushTextState(textState);
        if (this.isEndOfText(textState) && !this.isWaiting()) {
            this.onEndOfText();
        }
        return true;
    } else {
        return false;
    }
}

Window_Message.prototype.playSound = function(textState){
    var matchChar = /([A-Za-z])/g;
    const text = textState.text;
    const index = textState.index;
    const chara = text[index];
    if(chara.match(matchChar)){
        if(this._soundText){
            AudioManager.stopSe();
            AudioManager.playSe(this._soundText);
        }
    }
}