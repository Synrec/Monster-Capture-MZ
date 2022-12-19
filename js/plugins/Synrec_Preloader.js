/*:
 * @author Synrec
 * @plugindesc v2.3 Preloads all image and audio for the game on start
 * @url https://synrec.itch.io
 * @target MZ
 * 
 * @help
 * This plugin will load the audio and image data that usually appears
 * when loading a new project.
 * 
 * Plugin will NEVER preload animations (MZ). 
 * Don't ask because it never will either.
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
 * @desc List of audio files to ignore when loading data.
 * @type file[]
 * @dir audio
 * @default []
 * @parent Audio Settings
 * 
 * @param Ignore All Audio
 * @desc Ignores all audio.
 * @type boolean
 * @default true
 * @parent Audio To Ignore
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
 * @parent Image To Ignore
 * 
 * @param Force Load Data
 * @desc Preloads files selected
 * 
 * @param Force Load Images
 * @parent Force Load Data
 * @desc Preload graphics
 * 
 * @param Load Animations
 * @parent Force Load Images
 * @desc Load graphics (MV Type)
 * @type file[]
 * @dir img/animations/
 * @default []
 * 
 * @param Load Battlebacks 1
 * @parent Force Load Images
 * @desc Load graphics
 * @type file[]
 * @dir img/battlebacks1/
 * @default []
 * 
 * @param Load Battlebacks 2
 * @parent Force Load Images
 * @desc Load graphics
 * @type file[]
 * @dir img/battlebacks2/
 * @default []
 * 
 * @param Load Enemies
 * @parent Force Load Images
 * @desc Load graphics
 * @type file[]
 * @dir img/enemies/
 * 
 * @param Load Characters
 * @parent Force Load Images
 * @desc Load graphics
 * @type file[]
 * @dir img/characters/
 * 
 * @param Load Faces
 * @parent Force Load Images
 * @desc Load graphics
 * @type file[]
 * @dir img/faces/
 * 
 * @param Load Parallaxes
 * @parent Force Load Images
 * @desc Load graphics
 * @type file[]
 * @dir img/parallaxes/
 * 
 * @param Load Pictures
 * @parent Force Load Images
 * @desc Load graphics
 * @type file[]
 * @dir img/pictures/
 * 
 * @param Load Side View Actors
 * @parent Force Load Images
 * @desc Load graphics
 * @type file[]
 * @dir img/sv_actors/
 * 
 * @param Load Side View Enemies
 * @parent Force Load Images
 * @desc Load graphics
 * @type file[]
 * @dir img/sv_enemies/
 * 
 * @param Load System
 * @parent Force Load Images
 * @desc Load graphics
 * @type file[]
 * @dir img/system/
 * 
 * @param Load Tilesets
 * @parent Force Load Images
 * @desc Load graphics
 * @type file[]
 * @dir img/tilesets/
 * 
 * @param Load Titles 1
 * @parent Force Load Images
 * @desc Load graphics
 * @type file[]
 * @dir img/titles1/
 * 
 * @param Load Titles 2
 * @parent Force Load Images
 * @desc Load graphics
 * @type file[]
 * @dir img/titles2/
 * 
 * @param Force Load Audio
 * @parent Force Load Data
 * @desc Preload audio
 * 
 * @param Load BGM
 * @parent Force Load Audio
 * @desc Load audio
 * @type file[]
 * @desc audio/bgm/
 * 
 * @param Load BGS
 * @parent Force Load Audio
 * @desc Load audio
 * @type file[]
 * @desc audio/bgs/
 * 
 * @param Load ME
 * @parent Force Load Audio
 * @desc Load audio
 * @type file[]
 * @desc audio/me/
 * 
 * @param Load SE
 * @parent Force Load Audio
 * @desc Load audio
 * @type file[]
 * @desc audio/se/
 * 
 * @param Event Processing
 * @desc Process events frame by frame instead of all at once
 * @type boolean
 * @default false
 * 
 */

let SynrecPL = {};
SynrecPL.fs = require('fs');
SynrecPL.path = require('path');
SynrecPL.Plugin = PluginManager.parameters('Synrec_Preloader')

SynrecPL.Background = SynrecPL.Plugin['Preload Background'];
SynrecPL.PreloadText = SynrecPL.Plugin['Preload Text'];
SynrecPL.PreloadRate = eval(SynrecPL.Plugin['Load Rate']) || 1;

SynrecPL.IgnoreAudioAll = eval(SynrecPL.Plugin['Ignore All Audio']);
SynrecPL.IgnoreImageAll = eval(SynrecPL.Plugin['Ignore All Image']);

SynrecPL.EvntProc = eval(SynrecPL.Plugin['Event Processing']);

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

SynrecPL.ForcePreload = {};

try{
    SynrecPL.ForcePreload['Load Animation'] = JSON.parse(SynrecPL.Plugin['Load Animations']);
}catch(e){
    SynrecPL.ForcePreload['Load Animation'] = [];
    console.error(`Unable to parse animation array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Battlebacks 1'] = JSON.parse(SynrecPL.Plugin['Load Battlebacks 1']);
}catch(e){
    SynrecPL.ForcePreload['Load Battlebacks 1'] = [];
    console.error(`Unable to parse battlebacks 1 array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Battlebacks 2'] = JSON.parse(SynrecPL.Plugin['Load Battlebacks 2']);
}catch(e){
    SynrecPL.ForcePreload['Load Battlebacks 2'] = [];
    console.error(`Unable to parse battlebacks 2 array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Enemies'] = JSON.parse(SynrecPL.Plugin['Load Enemies']);
}catch(e){
    SynrecPL.ForcePreload['Load Enemies'] = [];
    console.error(`Unable to parse enemies array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Characters'] = JSON.parse(SynrecPL.Plugin['Load Characters']);
}catch(e){
    SynrecPL.ForcePreload['Load Characters'] = [];
    console.error(`Unable to parse characters array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Faces'] = JSON.parse(SynrecPL.Plugin['Load Faces']);
}catch(e){
    SynrecPL.ForcePreload['Load Faces'] = [];
    console.error(`Unable to parse faces array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Parallaxes'] = JSON.parse(SynrecPL.Plugin['Load Parallaxes']);
}catch(e){
    SynrecPL.ForcePreload['Load Parallaxes'] = [];
    console.error(`Unable to parse parallaxes array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Pictures'] = JSON.parse(SynrecPL.Plugin['Load Pictures']);
}catch(e){
    SynrecPL.ForcePreload['Load Pictures'] = [];
    console.error(`Unable to parse pictures array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Side View Actors'] = JSON.parse(SynrecPL.Plugin['Load Side View Actors']);
}catch(e){
    SynrecPL.ForcePreload['Load Side View Actors'] = [];
    console.error(`Unable to parse side view actors array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Side View Enemies'] = JSON.parse(SynrecPL.Plugin['Load Side View Enemies']);
}catch(e){
    SynrecPL.ForcePreload['Load Side View Enemies'] = [];
    console.error(`Unable to parse side view enemies array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load System'] = JSON.parse(SynrecPL.Plugin['Load System']);
}catch(e){
    SynrecPL.ForcePreload['Load System'] = [];
    console.error(`Unable to parse system array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Tilesets'] = JSON.parse(SynrecPL.Plugin['Load Tilesets']);
}catch(e){
    SynrecPL.ForcePreload['Load Tilesets'] = [];
    console.error(`Unable to parse tilesets array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Titles 1'] = JSON.parse(SynrecPL.Plugin['Load Titles 1']);
}catch(e){
    SynrecPL.ForcePreload['Load Titles 1'] = [];
    console.error(`Unable to parse titles 1 array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Titles 2'] = JSON.parse(SynrecPL.Plugin['Load Titles 2']);
}catch(e){
    SynrecPL.ForcePreload['Load Titles 2'] = [];
    console.error(`Unable to parse titles 2 array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load BGM'] = JSON.parse(SynrecPL.Plugin['Load BGM']);
}catch(e){
    SynrecPL.ForcePreload['Load BGM'] = [];
    console.error(`Unable to parse BGM array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load BGS'] = JSON.parse(SynrecPL.Plugin['Load BGS']);
}catch(e){
    SynrecPL.ForcePreload['Load BGS'] = [];
    console.error(`Unable to parse BGS array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load ME'] = JSON.parse(SynrecPL.Plugin['Load ME']);
}catch(e){
    SynrecPL.ForcePreload['Load ME'] = [];
    console.error(`Unable to parse ME array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load SE'] = JSON.parse(SynrecPL.Plugin['Load SE']);
}catch(e){
    SynrecPL.ForcePreload['Load SE'] = [];
    console.error(`Unable to parse SE array, error: ${e}`);
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

SynrecPL_GmMapUpdtEvnts = Game_Map.prototype.updateEvents;
Game_Map.prototype.updateEvents = function() {
    if(SynrecPL.EvntProc){
        const events = this.events();
        const c_events = this._commonEvents;
        if(isNaN(this._eventIndex) || this._eventIndex >= events.length){
            this._eventIndex = 0;
        }
        if(isNaN(this._commonEventIndex) || this._commonEventIndex >= events.length){
            this._commonEventIndex = 0;
        }
        if(events[this._eventIndex])events[this._eventIndex].update();
        if(this._commonEvents[this._commonEventIndex])this._commonEvents[this._commonEventIndex].update();
        this._eventIndex++;
        this._commonEventIndex++;
    }else SynrecPL_GmMapUpdtEvnts.call(this);
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
    const fs = SynrecPL.fs;
    const path = SynrecPL.path;
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
    const fs = SynrecPL.fs;
    const path = SynrecPL.path;
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
        case 'audioF': return this.audioPreloadF();
        case 'image': return this.imagePreload();
        case 'imageF': return this.imagePreloadF();
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
            this._preloadMode = 'audioF';
            break;
        }
    }
}

Scene_Preload.prototype.audioPreloadF = function(){
    SynrecPL.ForcePreload['Load BGM'].forEach((bgm_name)=>{
        AudioManager.createBuffer("bgm/", bgm_name);
    })
    SynrecPL.ForcePreload['Load BGS'].forEach((bgs_name)=>{
        AudioManager.createBuffer("bgs/", bgs_name);
    })
    SynrecPL.ForcePreload['Load ME'].forEach((me_name)=>{
        AudioManager.createBuffer("me/", me_name);
    })
    SynrecPL.ForcePreload['Load SE'].forEach((se_name)=>{
        AudioManager.createBuffer("se/", se_name);
    })
    this._preloadMode = 'image';
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
            this._preloadMode = 'imageF';
            break;
        }
    }
}

Scene_Preload.prototype.imagePreloadF = function(){
    SynrecPL.ForcePreload['Load Animation'].forEach((img_name)=>{
        ImageManager.loadAnimation(img_name)
    })
    SynrecPL.ForcePreload['Load Battlebacks 1'].forEach((img_name)=>{
        ImageManager.loadBattleback1(img_name)
    })
    SynrecPL.ForcePreload['Load Battlebacks 2'].forEach((img_name)=>{
        ImageManager.loadBattleback2(img_name)
    })
    SynrecPL.ForcePreload['Load Enemies'].forEach((img_name)=>{
        ImageManager.loadEnemy(img_name)
    })
    SynrecPL.ForcePreload['Load Characters'].forEach((img_name)=>{
        ImageManager.loadCharacter(img_name)
    })
    SynrecPL.ForcePreload['Load Faces'].forEach((img_name)=>{
        ImageManager.loadFace(img_name)
    })
    SynrecPL.ForcePreload['Load Parallaxes'].forEach((img_name)=>{
        ImageManager.loadParallax(img_name)
    })
    SynrecPL.ForcePreload['Load Pictures'].forEach((img_name)=>{
        ImageManager.loadPicture(img_name)
    })
    SynrecPL.ForcePreload['Load Side View Actors'].forEach((img_name)=>{
        ImageManager.loadSvActor(img_name)
    })
    SynrecPL.ForcePreload['Load Side View Enemies'].forEach((img_name)=>{
        ImageManager.loadSvEnemy(img_name)
    })
    SynrecPL.ForcePreload['Load System'].forEach((img_name)=>{
        ImageManager.loadSystem(img_name)
    })
    SynrecPL.ForcePreload['Load Tilesets'].forEach((img_name)=>{
        ImageManager.loadTileset(img_name)
    })
    SynrecPL.ForcePreload['Load Titles 1'].forEach((img_name)=>{
        ImageManager.loadTitle1(img_name)
    })
    SynrecPL.ForcePreload['Load Titles 2'].forEach((img_name)=>{
        ImageManager.loadTitle2(img_name)
    })
    this._preloadMode = 'complete';
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