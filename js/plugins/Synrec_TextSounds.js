/*:@author Synrec 
 * @target MZ
 * @url https://synrec.dev/
 * @plugindesc v1.6 Create Text Sounds
 * 
 * @command Set Sound
 * @desc Set the text sound
 * 
 * @arg Text Sound
 * @desc Set a custom text sound
 * @type struct<TxtSounds>
 * 
 * @command Clear Sound
 * @desc Clear custom sound
 *
 * @help Create text sounds which play by default or based on
 * face graphic set.
 * You must credit Synrec.
 * 
 * @param Use Font Size Volume
 * @desc Changes volume based on variance from font size
 * @type boolean
 * @default false
 * 
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
 * @param Default Pitch Variance
 * @desc Pitch changes randomly +/- this value
 * @type number
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
 * @param Pitch Variance
 * @desc Pitch changes randomly +/- this value
 * @type number
 * @default 0
 * 
 * @param Pan
 * @desc Sound effect pan
 * @type number
 * @max 100
 * @min -100
 * @default 0
 * 
 */
function SYN_TEXTSOUNDS_DATA_PARSER(parameters){
    if(typeof parameters == 'object'){
        const keys = Object.keys(parameters);
        keys.forEach((key)=>{
            if(isNaN(parameters[key])){
                try{
                    parameters[key] = JSON.parse(parameters[key]);
                }catch(e){
                    parameters[key] = parameters[key];
                }
            }
            if(typeof parameters[key] == 'object'){
                parameters[key] = SYN_TEXTSOUNDS_DATA_PARSER(parameters[key]);
            }else if(Array.isArray(parameters[key])){
                parameters[key] = parameters[key].map((data)=>{
                    if(isNaN(data)){
                        try{
                            data = JSON.parse(data);
                        }catch(e){
                            data = data;
                        }
                    }
                    if(typeof data == 'object'){
                        data = SYN_TEXTSOUNDS_DATA_PARSER(data);
                    }
                    return data;
                })
            }
        })
    }
    return parameters;
}

const SynrecTS = {};
function LOAD_SYNREC_TEXTSOUNDS_DATA(){
    SynrecTS.Plugins = PluginManager.parameters('Synrec_TextSounds');
    SynrecTS.DATA = SYN_TEXTSOUNDS_DATA_PARSER(SynrecTS.Plugins);

    SynrecTS.UseFontVol = eval(SynrecTS.DATA['Use Font Size Volume']);

    SynrecTS.DefaultSound = SynrecTS.DATA['Default Se'];
    SynrecTS.DefaultVol = eval(SynrecTS.DATA['Default Volume']);
    SynrecTS.DefaultPch = eval(SynrecTS.DATA['Default Pitch']);
    SynrecTS.DefaultPchVar = eval(SynrecTS.DATA['Default Pitch Variance']);
    SynrecTS.DefaultPan = eval(SynrecTS.DATA['Default Pan']);
    SynrecTS.DefaultPan = eval(SynrecTS.DATA['Default Pan']);

    SynrecTS.SoundObjects = SynrecTS.DATA['Custom Text Sounds'] || [];
}

function RELOAD_SYNREC_TEXTSOUNDS_DATA(){
    LOAD_SYNREC_TEXTSOUNDS_DATA();
}

LOAD_SYNREC_TEXTSOUNDS_DATA();

if(Utils.RPGMAKER_NAME == "MZ"){
    PluginManager.registerCommand(`Synrec_TextSounds`, `Set Sound`, (obj)=>{
        try{
            const soundFX = JSON.parse(obj['Text Sound']);
            try{
                soundFX['Face Indices'] = JSON.parse(soundFX['Face Indices']).map(id => eval(id));
            }catch(e){
                soundFX['Face Indices'] = [];
            }
            soundFX.effectVol = eval(soundFX['Volume']);
            soundFX.effectPch = eval(soundFX['Pitch']);
            soundFX.effectPchVar = eval(soundFX['Pitch Variance']);
            soundFX.effectPan = eval(soundFX['Pan']);
            $gameSystem.setCustomTextSound(soundFX);
        }catch(e){
            return;
        }
    })
}

Game_System.prototype.customTextSound = function(){
    return this._text_sound || null;
}

Game_System.prototype.setCustomTextSound = function(obj){
    this._text_sound = obj;
}

Game_System.prototype.clearCustomTextSound = function(){
    this._text_sound = null;
}

Window_Message.SOUNDS = SynrecTS.SoundObjects;

SynrecTSWinMsgStrtMsg = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    SynrecTSWinMsgStrtMsg.call(this);
    this.createSoundData();
}

Window_Message.prototype.getCustomTextSound = function(){
    const faceName = $gameMessage._faceName;
    const faceIndex = $gameMessage._faceIndex;
    const custom_sound = $gameSystem.customTextSound();
    if(!custom_sound)return null;
    const face_name = custom_sound['Face File'];
    if(face_name == faceName){
        const face_indicies = custom_sound['Face Indices'];
        if(face_indicies.includes(faceIndex)){
            return JsonEx.makeDeepCopy(custom_sound);
        }
    }
    return null;
}

Window_Message.prototype.createSoundData = function(){
    const faceName = $gameMessage._faceName;
    const faceIndex = $gameMessage._faceIndex;
    const sound = this.getCustomTextSound();
    if(sound){
        const name = sound['Sound Effect'];
        const vol = sound.effectVol;
        const pch = sound.effectPch;
        const pan = sound.effectPan;
        this._pchVar = sound.effectPchVar;
        this._soundText = {name:name, pitch:pch, pan:pan, volume:vol};
        return true;
    }
    const soundObjs = SynrecTS.SoundObjects;
    for(let chkSnd = 0; chkSnd < soundObjs.length; chkSnd++){
        const sound = soundObjs[chkSnd];
        if(sound.file == faceName){
            if(sound.indices.includes(faceIndex)){
                const name = sound.effectName;
                if(name){
                    const vol = sound.effectVol;
                    const pch = sound.effectPch;
                    const pan = sound.effectPan;
                    this._pchVar = sound.effectPchVar;
                    this._soundText = {name:name, pitch:pch, pan:pan, volume:vol};
                    return true;
                }
            }
        }
    }
    const nameDef = SynrecTS.DefaultSound;
    if(!nameDef)return false;
    const pchDef = SynrecTS.DefaultPch;
    const volDef = SynrecTS.DefaultVol;
    const panDef = SynrecTS.DefaultPan;
    this._pchVar = SynrecTS.DefaultPchVar;
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
    const matchChar = /([A-Za-z\u3040-\u30FF\u4E00-\u9FAF])/g;
    const text = textState.text;
    const index = textState.index;
    const chara = text[index];
    if(chara.match(matchChar)){
        if(this._soundText){
            let sound = JsonEx.makeDeepCopy(this._soundText);
            if(!isNaN(this._pchVar)){
                const minPch = sound.pitch - this._pchVar;
                const maxPch = sound.pitch + this._pchVar;
                const diff = maxPch - minPch;
                sound.pitch = minPch + Math.random() * diff;
            }
            if(SynrecTS.UseFontVol){
                const fontSize = this.contents.fontSize;
                const baseSize = $gameSystem.mainFontSize();
                const diff = Math.abs(baseSize - fontSize);
                if(fontSize > baseSize){
                    sound.volume += Math.floor((diff / baseSize) * sound.volume);
                }else if(fontSize < baseSize){
                    sound.volume -= Math.floor((diff / baseSize) * sound.volume);
                }
            }
            AudioManager.stopSe();
            AudioManager.playSe(sound);
        }
    }
}

SynrecTS_ScnBse_SynPlugReload = Scene_Base.prototype.synrecPluginReload
Scene_Base.prototype.synrecPluginReload = function(){
    RELOAD_SYNREC_TEXTSOUNDS_DATA();
    SynrecTS_ScnBse_SynPlugReload.call(this, ...arguments);
}