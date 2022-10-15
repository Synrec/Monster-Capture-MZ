/*:
 * @author Synrec
 * @plugindesc v2.0 Preloads all image and audio for the game on start
 * @url https://synrec.itch.io
 * @target MZ
 * 
 * @help
 * This plugin will load the audio and image data that usually appears
 * when loading a new project.
 * 
 * Plugin will NEVER preload animations. Don't ask because it never will either.
 * 
 * 
 * 
 * TERMS OF USE:
 * > You are REQUIRED to credit Synrec in your project.
 * > Not to be re-sold or redistributed in non-game projects
 * > Do not redistribute, this includes edits.
 * > Can be used in commercial or free RPG Maker MZ games.
 * > Do not redistribute for educational purposes.
 * > Do not use for malicious intent.
 * 
 * @param General Settings
 * 
 * @param Load Rate
 * @desc Speed to preload data
 * @type number
 * @default 1
 * @parent General Settings
 * 
 * @param Preload Background
 * @desc Background Image used for the preload scene.
 * @type file
 * @dir img/pictures
 * @parent General Settings
 * 
 * @param Preload Text
 * @desc Text to display when preload ends.
 * @type text
 * @default COMPLETE!
 * @parent General Settings
 * 
 * @param Audio Settings
 * 
 * @param Audio To Ignore
 * @desc List of BGM files to ignore when loading data.
 * @type file[]
 * @dir audio
 * @default []
 * @parent Audio Settings
 * 
 * @param Ignore All Audio
 * @desc Ignores all audio.
 * @type boolean
 * @default true
 * @parent BGM To Ignore
 * 
 * @param Image Settings
 * 
 * @param Image To Ignore
 * @desc Ignores listed images
 * @type file[]
 * @dir img
 * @default []
 * @parent Image Settings
 * 
 * @param Ignore All Image
 * @desc Ignores all images.
 * @type boolean
 * @default true
 * @parent BattleBacks1 To Ignore
 * 
 */
const fs = require('fs');
const path = require('path');

let SynrecPL = {};
SynrecPL.Plugin = PluginManager.parameters('Synrec_Preloader')

SynrecPL.Background = SynrecPL.Plugin['Preload Background'];
SynrecPL.PreloadText = SynrecPL.Plugin['Preload Text'];
SynrecPL.PreloadRate = eval(SynrecPL.Plugin['Load Rate']) || 1;

SynrecPL.IgnoreAudioAll = eval(SynrecPL.Plugin['Ignore All Audio']);
SynrecPL.IgnoreImageAll = eval(SynrecPL.Plugin['Ignore All Image']);

try{
    SynrecPL.IgnoreAudio = JSON.parse(SynrecPL.Plugin['Audio To Ignore']);
}catch(e){
    console.error(e);
    SynrecPL.IgnoreAudio = [];
}
try{
    SynrecPL.IgnoreImage = JSON.parse(SynrecPL.Plugin['Image To Ignore']);
}catch(e){
    console.error(e);
    SynrecPL.IgnoreImage = [];
}

ImageManager._preloadedImages = {};
AudioManager._preloadedAudio = {};

SynrecPLImgMngrLoadBitmap = ImageManager.loadBitmap;
ImageManager.loadBitmap = function(folder, filename) {
    const preloads = ImageManager._preloadedImages;
    const folderPreload = preloads[`${folder}`];
    if(folderPreload){
        if(folderPreload[`${filename}`]){
            const savedBitmap = folderPreload[`${filename}`];
            savedBitmap._paintOpacity = 255;
            return savedBitmap;
        }
    }else ImageManager._preloadedImages[`${folder}`] = {};
    const newBitmap = SynrecPLImgMngrLoadBitmap.call(this, folder, filename);
    newBitmap.destroy = function(){this._paintOpacity = 0}
    if(!this.isIgnored(folder, filename))ImageManager._preloadedImages[`${folder}`][`${filename}`] = newBitmap;
    return newBitmap;
}

ImageManager.isIgnored = function(path, name){
    const folder = path.split('/')[2];
    const folderFile = folder.concat('/',name);
    if(SynrecPL.IgnoreImage.includes(folderFile)){
        console.log(folderFile);
        return true;
    }
}

SynrecPLAudMngrCrtBuffer = AudioManager.createBuffer;
AudioManager.createBuffer = function(folder, name) {
    const preloads = AudioManager._preloadedAudio;
    const folderPreload = preloads[`${folder}`];
    if(folderPreload){
        if(folderPreload[`${name}`]){
            folderPreload[`${name}`].frameCount = Graphics.frameCount;
            const savedBuffer = folderPreload[`${name}`];
            return savedBuffer;
        }
    }else AudioManager._preloadedAudio[`${folder}`] = {};
    const newBuffer = SynrecPLAudMngrCrtBuffer.call(this, folder, name);
    newBuffer.destroy = function(){this.stop()} //Special thanks to snaphat for the mod.
    if(!this.isIgnored(folder.concat(name)))AudioManager._preloadedAudio[`${folder}`][`${name}`] = newBuffer;
    return newBuffer;
}

AudioManager.isIgnored = function(folderFile){
    if(SynrecPL.IgnoreAudio.includes(folderFile)){
        return true;
    }
}

function Sprite_PreloadGauge(){
    this.initialize(...arguments);
}

Sprite_PreloadGauge.prototype = Object.create(Sprite.prototype);
Sprite_PreloadGauge.prototype.constructor = Sprite_PreloadGauge;

Sprite_PreloadGauge.prototype.initialize = function(bitmap){
    Sprite.prototype.initialize.call(this, bitmap);
    this.createBackSprite();
    this.createGaugeSprite();
}

Sprite_PreloadGauge.prototype.createBackSprite = function(){
    this._backSprite = new Sprite();
    this._backSprite.bitmap = new Bitmap(Graphics.width, Graphics.height * 0.1);
    this.addChild(this._backSprite);
    const bitmap = this._backSprite.bitmap
    bitmap.fillRect(0, 0, bitmap.width, bitmap.height, '#000000');
    bitmap.fillRect(2, 2, bitmap.width - 4, bitmap.height - 4, '#ffffff');
}

Sprite_PreloadGauge.prototype.createGaugeSprite = function(){
    this._gaugeSprite = new Sprite();
    this._gaugeSprite.bitmap = new Bitmap(Graphics.width, Graphics.height * 0.1);
    this.addChild(this._gaugeSprite);
}

Sprite_PreloadGauge.prototype.update = function(){
    Sprite.prototype.update.call(this);
    this.updatePreloadGauge();
}

Sprite_PreloadGauge.prototype.updatePreloadGauge = function(){
    const scene = SceneManager._scene;
    const maxLoad = scene._preloadMax;
    const currentLoad = scene._preloadCur;
    const rate = currentLoad/maxLoad;
    const bitmap = this._gaugeSprite.bitmap;
    const x = 4;
    const y = 4;
    const w = bitmap.width - 8;
    const h = bitmap.height - 8;
    bitmap.clear();
    if(rate < 1){
        bitmap.fillRect(x, y, w * rate, h, '#00ff00');
    }else{
        this._backSprite.bitmap.clear();
        bitmap.drawText(SynrecPL.PreloadText, 0, 0, bitmap.width, bitmap.height, 'center');
    }
}

function Scene_Preload(){
    this.initialize(...arguments);
}

Scene_Preload.prototype = Object.create(Scene_Base.prototype);
Scene_Preload.prototype.constructor = Scene_Preload;

Scene_Preload.prototype.initialize = function(){
    Scene_Base.prototype.initialize.call(this);
    this._preloadCur = 0;
    this._preloadMax = Infinity;
}

Scene_Preload.prototype.create = function(){
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createSpriteGauge();
    this.createPreloadList();
}

Scene_Preload.prototype.createBackground = function(){
    this._background = new TilingSprite();
    if(SynrecPL.Background)this._background.bitmap = ImageManager.loadPicture(SynrecPL.Background);
    this._background.move(0, 0, Graphics.width, Graphics.height);
    this.addChild(this._background);
}

Scene_Preload.prototype.createSpriteGauge = function(){
    this._loadGauge = new Sprite_PreloadGauge();
    this.addChild(this._loadGauge);
}

Scene_Preload.prototype.createPreloadList = function(){
    this._preloadList = {};
    this._preloadList.audio = [];
    this._preloadList.image = [];
    if(!SynrecPL.IgnoreAudioAll)this.createAudioPreload();
    if(!SynrecPL.IgnoreImageAll)this.createImagePreload();
    this.initPreload();
}

Scene_Preload.prototype.createAudioPreload = function(){
    const audioList = [];
    try{
        const folders = fs.readdirSync('./audio/');
        folders.forEach((folder)=>{
            try{
                const files = fs.readdirSync(`./audio/${folder}/`);
                files.forEach((file)=>{
                    if(file.match(/.*.ogg/gi)){
                        const obj = {};
                        obj.dir = `${folder}/`;
                        obj.file = path.basename(file, '.ogg');
                        audioList.push(obj);
                    }
                })
            }catch(e){
                console.error(`Failed to preload audio file.`)
            }
        })
    }catch(e){
        console.error(e);
    }
    this._preloadList.audio = audioList;
}

Scene_Preload.prototype.createImagePreload = function(){
    const imageList = [];
    try{
        const folders = fs.readdirSync('./img/');
        folders.forEach((folder)=>{
            try{
                const files = fs.readdirSync(`./img/${folder}/`);
                files.forEach((file)=>{
                    if(file.match(/.*.png/gi)){
                        const obj = {};
                        obj.dir = `./img/${folder}/`;
                        obj.file = path.basename(file, '.png');
                        imageList.push(obj);
                    }
                })
            }catch(e){
                console.error(`Failed to image audio file.`)
            }
        })
    }catch(e){
        console.error(e);
    }
    this._preloadList.image = imageList;
}

Scene_Preload.prototype.initPreload = function(){
    this._preloadCur = 0;
    this._preloadMax = this._preloadList.image.length + this._preloadList.audio.length;
    this._preloadMode = 'audio';
    this._audioPreload = 0;
    this._audioMax = this._preloadList.audio.length;
    this._imagePreload = 0;
    this._imageMax = this._preloadList.image.length;
    this._initPreload = true;
}

Scene_Preload.prototype.update = function(){
    Scene_Base.prototype.update.call(this);
    this.updatePreload();
}

Scene_Preload.prototype.updatePreload = function(){
    if(!this._initPreload)return;
    if(!this._preloadList)return SceneManager.goto(Scene_Title);
    if(this._preloadMax <= 0)return SceneManager.goto(Scene_Title);
    this._preloadCur = this._audioPreload + this._imagePreload;
    switch(this._preloadMode){
        case 'audio': return this.audioPreload();
        case 'image': return this.imagePreload();
        case 'complete': return this.completePreload();
    }
}

Scene_Preload.prototype.audioPreload = function(){
    for(let i = 0; i < SynrecPL.PreloadRate; i++){
        const index = this._audioPreload;
        const audio_object = this._preloadList.audio[index];
        const folder = audio_object.dir;
        const name = audio_object.file;
        AudioManager.createBuffer(folder, name);
        this._audioPreload++;
        if(this._audioPreload >= this._audioMax){
            this._preloadMode = 'image';
            break;
        }
    }
}

Scene_Preload.prototype.imagePreload = function(){
    for(let i = 0; i < SynrecPL.PreloadRate; i++){
        const index = this._imagePreload;
        const image_object = this._preloadList.image[index];
        const folder = image_object.dir;
        const name = image_object.file;
        ImageManager.loadBitmap(folder, name);
        this._imagePreload++;
        if(this._imagePreload >= this._imageMax){
            this._preloadMode = 'complete';
            break;
        }
    }
}

Scene_Preload.prototype.completePreload = function(){
    if(Input.isTriggered('ok') || Input.isTriggered('cancel')){
        SceneManager.goto(Scene_Title);
    }
}

if(Utils.RPGMAKER_NAME == 'MZ'){
    SynrecPLScnBootStrtNormGame = Scene_Boot.prototype.startNormalGame;
    Scene_Boot.prototype.startNormalGame = function() {
        if(SynrecPL.IgnoreAudioAll && SynrecPL.IgnoreImageAll)return SynrecPLScnBootStrtNormGame.call(this);
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Preload);
        Window_TitleCommand.initCommandPosition();
    }
}else{
    SynrecPLScnBootStrt = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        Scene_Base.prototype.start.call(this);
        if (DataManager.isBattleTest() || DataManager.isEventTest()) {
            SynrecPLScnBootStrt.call(this);
        } else {
            this.checkPlayerLocation();
            DataManager.setupNewGame();
            SceneManager.goto(Scene_Preload);
            Window_TitleCommand.initCommandPosition();
        }
        this.updateDocumentTitle();
    }
}