/*:
 * @author Synrec/Kylestclair
 * @plugindesc v3.4 Preloads image and audio for the game on start
 * @url https://synrec.itch.io
 * @target MZ
 * 
 * @help
 * This plugin will load the audio and image data that usually appears
 * when loading a new project.
 * 
 * 
 * 
 * TERMS OF USE:
 * > You are REQUIRED to credit Synrec/Kylestclair in your project.
 * > Not to be re-sold or redistributed in non-game projects
 * > Do not redistribute, this includes edits.
 * > Can be used in commercial or free RPG Maker MZ games.
 * > Do not redistribute for educational purposes.
 * > Do not use for malicious intent.
 * 
 * @param Loading Video Name
 * @desc Name of the video for preload
 * @type text
 * 
 * @param Loading Bar Configuration
 * @desc Setup the loading bar
 * 
 * @param Bypass Load Confirm
 * @parent Loading Bar Configuration
 * @desc Bypass needing to use a confirm button
 * @type boolean
 * @default false
 * 
 * @param Gauge Position
 * @parent Loading Bar Configuration
 * @desc Select where the gauge is positioned
 * @type select
 * @option top
 * @option below
 * @default top
 * 
 * @param Gauge Border Color
 * @parent Loading Bar Configuration
 * @desc Hex Color or RGBA
 * @type text
 * @default #000000
 * 
 * @param Gauge Background Color
 * @parent Loading Bar Configuration
 * @desc Hex Color or RGBA
 * @type text
 * @default #ffffff
 * 
 * @param Gauge Bar Color
 * @parent Loading Bar Configuration
 * @desc Hex Color or RGBA
 * @type text
 * @default #00ff00
 * 
 * @param Gauge Size Height Ratio
 * @desc Height ratio to screen size
 * @type number
 * @decimals 3
 * @default 0.100
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
 * @param Preload Video
 * @desc Video shown during preload.
 * @type text
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
 * @param Audio Resource To Ignore
 * @desc Will not reserve audio data, will not preload
 * @type struct<lockaud>[]
 * @default []
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
 * @param Image Resource To Ignore
 * @desc Will not reserve image data, will not preload
 * @type struct<lockimg>[]
 * @default []
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
/*~struct~lockaud:
 *
 * @param Main Directory
 * @desc Path of the directory used
 * @type text
 * @default audio/se/
 * 
 * @param Name Used
 * @desc Name used for finding the audio
 * @type text
 * @default Attack1
 * 
 */
/*~struct~lockimg:
 *
 * @param Main Directory
 * @desc Path of the directory used
 * @type text
 * @default img/pictures/
 * 
 * @param Name Used
 * @desc Name used for finding the audio
 * @type text
 * @default Actor1_1
 * 
 */

const is_MV_Preload = Utils.RPGMAKER_NAME == "MV";
let SynrecPL = {};
SynrecPL.fs = require('fs');
SynrecPL.path = require('path');
SynrecPL.Plugin = PluginManager.parameters('Synrec_Preloader')

SynrecPL.Bypass_Confirm = eval(SynrecPL.Plugin['Bypass Load Confirm']);

SynrecPL.Background = SynrecPL.Plugin['Preload Background'];
SynrecPL.PreloadText = SynrecPL.Plugin['Preload Text'];
SynrecPL.PreloadRate = eval(SynrecPL.Plugin['Load Rate']) || 1;

SynrecPL.Preload_Video = SynrecPL.Plugin['Loading Video Name'];

SynrecPL.IgnoreAudioAll = eval(SynrecPL.Plugin['Ignore All Audio']);
SynrecPL.IgnoreImageAll = eval(SynrecPL.Plugin['Ignore All Image']);

SynrecPL.EvntProc = eval(SynrecPL.Plugin['Event Processing']);

SynrecPL.Audio_Ignored = [];
SynrecPL.Image_Ignored = [];
try{
    SynrecPL.Audio_Ignored = JSON.parse(SynrecPL.Plugin['Audio Resource To Ignore']).map((path)=>{
        try{
            path = JSON.parse(path);
        }catch(e){
            path = {};
            console.warn(`Failed to parse path information`);
        }
        return path
    });
}catch(e){
    console.warn(`Failed to parse Ignored Audio paths.`);
}

try{
    SynrecPL.Image_Ignored = JSON.parse(SynrecPL.Plugin['Image Resource To Ignore']).map((path)=>{
        try{
            path = JSON.parse(path);
        }catch(e){
            path = {};
            console.warn(`Failed to parse path information`);
        }
        return path
    });
}catch(e){
    console.warn(`Failed to parse Ignored Image paths.`);
}

try{
    SynrecPL.IgnoreAudio = JSON.parse(SynrecPL.Plugin['Audio To Ignore']);
}catch(e){
    console.warn(e);
    SynrecPL.IgnoreAudio = [];
}
try{
    SynrecPL.IgnoreImage = JSON.parse(SynrecPL.Plugin['Image To Ignore']);
}catch(e){
    console.warn(e);
    SynrecPL.IgnoreImage = [];
}

SynrecPL.ForcePreload = {};

try{
    SynrecPL.ForcePreload['Load Animation'] = JSON.parse(SynrecPL.Plugin['Load Animations']);
}catch(e){
    SynrecPL.ForcePreload['Load Animation'] = [];
    console.warn(`Unable to parse animation array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Battlebacks 1'] = JSON.parse(SynrecPL.Plugin['Load Battlebacks 1']);
}catch(e){
    SynrecPL.ForcePreload['Load Battlebacks 1'] = [];
    console.warn(`Unable to parse battlebacks 1 array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Battlebacks 2'] = JSON.parse(SynrecPL.Plugin['Load Battlebacks 2']);
}catch(e){
    SynrecPL.ForcePreload['Load Battlebacks 2'] = [];
    console.warn(`Unable to parse battlebacks 2 array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Enemies'] = JSON.parse(SynrecPL.Plugin['Load Enemies']);
}catch(e){
    SynrecPL.ForcePreload['Load Enemies'] = [];
    console.warn(`Unable to parse enemies array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Characters'] = JSON.parse(SynrecPL.Plugin['Load Characters']);
}catch(e){
    SynrecPL.ForcePreload['Load Characters'] = [];
    console.warn(`Unable to parse characters array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Faces'] = JSON.parse(SynrecPL.Plugin['Load Faces']);
}catch(e){
    SynrecPL.ForcePreload['Load Faces'] = [];
    console.warn(`Unable to parse faces array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Parallaxes'] = JSON.parse(SynrecPL.Plugin['Load Parallaxes']);
}catch(e){
    SynrecPL.ForcePreload['Load Parallaxes'] = [];
    console.warn(`Unable to parse parallaxes array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Pictures'] = JSON.parse(SynrecPL.Plugin['Load Pictures']);
}catch(e){
    SynrecPL.ForcePreload['Load Pictures'] = [];
    console.warn(`Unable to parse pictures array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Side View Actors'] = JSON.parse(SynrecPL.Plugin['Load Side View Actors']);
}catch(e){
    SynrecPL.ForcePreload['Load Side View Actors'] = [];
    console.warn(`Unable to parse side view actors array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Side View Enemies'] = JSON.parse(SynrecPL.Plugin['Load Side View Enemies']);
}catch(e){
    SynrecPL.ForcePreload['Load Side View Enemies'] = [];
    console.warn(`Unable to parse side view enemies array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load System'] = JSON.parse(SynrecPL.Plugin['Load System']);
}catch(e){
    SynrecPL.ForcePreload['Load System'] = [];
    console.warn(`Unable to parse system array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Tilesets'] = JSON.parse(SynrecPL.Plugin['Load Tilesets']);
}catch(e){
    SynrecPL.ForcePreload['Load Tilesets'] = [];
    console.warn(`Unable to parse tilesets array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Titles 1'] = JSON.parse(SynrecPL.Plugin['Load Titles 1']);
}catch(e){
    SynrecPL.ForcePreload['Load Titles 1'] = [];
    console.warn(`Unable to parse titles 1 array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load Titles 2'] = JSON.parse(SynrecPL.Plugin['Load Titles 2']);
}catch(e){
    SynrecPL.ForcePreload['Load Titles 2'] = [];
    console.warn(`Unable to parse titles 2 array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load BGM'] = JSON.parse(SynrecPL.Plugin['Load BGM']);
}catch(e){
    SynrecPL.ForcePreload['Load BGM'] = [];
    console.warn(`Unable to parse BGM array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load BGS'] = JSON.parse(SynrecPL.Plugin['Load BGS']);
}catch(e){
    SynrecPL.ForcePreload['Load BGS'] = [];
    console.warn(`Unable to parse BGS array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load ME'] = JSON.parse(SynrecPL.Plugin['Load ME']);
}catch(e){
    SynrecPL.ForcePreload['Load ME'] = [];
    console.warn(`Unable to parse ME array, error: ${e}`);
}

try{
    SynrecPL.ForcePreload['Load SE'] = JSON.parse(SynrecPL.Plugin['Load SE']);
}catch(e){
    SynrecPL.ForcePreload['Load SE'] = [];
    console.warn(`Unable to parse SE array, error: ${e}`);
}

SynrecPL.Gauge_Position = SynrecPL.Plugin['Gauge Position'] || 'top';
SynrecPL.Gauge_Color_Border = SynrecPL.Plugin['Gauge Border Color'] || '#000000';
SynrecPL.Gauge_Color_Background = SynrecPL.Plugin['Gauge Background Color'] || '#ffffff';
SynrecPL.Gauge_Color_Bar = SynrecPL.Plugin['Gauge Bar Color'] || '#00ff00';
SynrecPL.Gauge_Height_Ratio = eval(SynrecPL.Plugin['Gauge Size Height Ratio']) || 0.1;

ImageManager._preloadedImages = {};
AudioManager._preloadedAudio = {};

SynrecPLImgMngrLoadBitmap = ImageManager.loadBitmap;
ImageManager.loadBitmap = function(folder, filename, hue, smooth) {
    const permanent_ignores = SynrecPL.Image_Ignored;
    if(permanent_ignores.some((path)=>{
        if(
            (path['Main Directory'] == folder &&
            path['Name Used'] == filename) ||
            (path['Main Directory'] == folder &&
            !path['Name Used'])
        )return true;
    }))return SynrecPLImgMngrLoadBitmap.call(this,folder, filename, hue, smooth);
    const preloads = ImageManager._preloadedImages;
    const folderPreload = preloads[`${folder}`];
    if(folderPreload){
        if(folderPreload[`${filename}`]){
            const savedBitmap = folderPreload[`${filename}`];
            savedBitmap._paintOpacity = 255;
            return savedBitmap;
        }
    }else ImageManager._preloadedImages[`${folder}`] = {};
    const newBitmap = SynrecPLImgMngrLoadBitmap.call(this,folder, filename, hue, smooth);
    newBitmap.destroy = function(){this._paintOpacity = 0}
    if(!this.isIgnored(folder, filename))ImageManager._preloadedImages[`${folder}`][`${filename}`] = newBitmap;
    return newBitmap;
}

ImageManager.isIgnored = function(path, name){
    const length = path.split('/').length;
    const folder = path.split('/')[length - 2];
    const folderFile = folder.concat('/',name);
    if(SynrecPL.IgnoreImage.includes(folderFile)){
        return true;
    }
}

SynrecPLAudMngrCrtBuffer = AudioManager.createBuffer;
AudioManager.createBuffer = function(folder, name) {
    const permanent_ignores = SynrecPL.Audio_Ignored;
    if(permanent_ignores.some((path)=>{
        if(
            (path['Main Directory'] == folder &&
            path['Name Used'] == name) ||
            (path['Main Directory'] == folder &&
            !path['Name Used'])
        )return true;
    }))return SynrecPLAudMngrCrtBuffer.call(this, folder, name);
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
    const x = 0;
    const y = SynrecPL.Gauge_Position == 'top' ? 0 : Graphics.height - (Graphics.height * SynrecPL.Gauge_Height_Ratio);
    this.move(x,y)
}

Sprite_PreloadGauge.prototype.createBackSprite = function(){
    this._backSprite = new Sprite();
    this._backSprite.bitmap = new Bitmap(Graphics.width, Graphics.height * SynrecPL.Gauge_Height_Ratio);
    this.addChild(this._backSprite);
    const bitmap = this._backSprite.bitmap;
    bitmap.fillRect(0, 0, bitmap.width, bitmap.height, SynrecPL.Gauge_Color_Border);
    bitmap.fillRect(2, 2, bitmap.width - 4, bitmap.height - 4, SynrecPL.Gauge_Color_Background);
}

Sprite_PreloadGauge.prototype.createGaugeSprite = function(){
    this._gaugeSprite = new Sprite();
    this._gaugeSprite.bitmap = new Bitmap(Graphics.width, Graphics.height * SynrecPL.Gauge_Height_Ratio);
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
    const y = 4
    const w = bitmap.width - 8;
    const h = bitmap.height - 8;
    bitmap.clear();
    if(rate < 1){
        bitmap.fillRect(x, y, w * rate, h, SynrecPL.Gauge_Color_Bar);
    }else{
        this._backSprite.bitmap.clear();
        bitmap.drawText(SynrecPL.PreloadText, x, y, bitmap.width, bitmap.height, 'center');
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
    this.createVideoSprite();
    this.createSpriteGauge();
    this.createPreloadList();
}

Scene_Preload.prototype.createBackground = function(){
    this._background = new TilingSprite();
    if(SynrecPL.Background)this._background.bitmap = ImageManager.loadPicture(SynrecPL.Background);
    this._background.move(0, 0, Graphics.width, Graphics.height);
    this.addChild(this._background);
}

Scene_Preload.prototype.createVideoSprite = function(){
    if(SynrecPL.Preload_Video){
        const src = `videos/${SynrecPL.Preload_Video}.webm`;
        const is_MZ = Utils.RPGMAKER_NAME == 'MZ';
        this._videoSprite = new PIXI.Sprite();
        const videoTexture = is_MZ ? new PIXI.Texture.from(src) : new PIXI.Texture.fromVideo(src);
        const source = is_MZ ? videoTexture.baseTexture.resource.source : videoTexture.baseTexture.source;
        source.loop = true;
        source.preload = 'auto';
        source.autoload = true;
        source.autoplay = true;
        this._videoSprite.texture = videoTexture;
        this.addChild(this._videoSprite);
        this._videoSprite.x = 0;
        this._videoSprite.y = 0;
        this._videoSprite.width = Graphics.width;
        this._videoSprite.height = Graphics.height;
    }
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
        const is_test = Utils.isOptionValid("test");
        const dir = !is_test && is_MV_Preload ? `./www/audio/` : `./audio/`;
        const dir_load = !is_test && is_MV_Preload ? `www/audio/` : `audio/`;
        const folders = fs.readdirSync(dir);
        folders.forEach((folder)=>{
            try{
                const files = fs.readdirSync(`${dir}${folder}/`);
                files.forEach((file)=>{
                    if(file.match(/.*.ogg_/gi)){
                        const obj = {};
                        obj.dir = `${folder}/`;
                        obj.file = path.basename(file, '.ogg_');
                        audioList.push(obj);
                    }else if(file.match(/.*.ogg/gi)){
                        const obj = {};
                        obj.dir = `${folder}/`;
                        obj.file = path.basename(file, '.ogg');
                        audioList.push(obj);
                    }
                    if(file.match(/.*.m4a_/gi)){
                        const obj = {};
                        obj.dir = `${folder}/`;
                        obj.file = path.basename(file, '.m4a_');
                        audioList.push(obj);
                    }else if(file.match(/.*.m4a/gi)){
                        const obj = {};
                        obj.dir = `${folder}/`;
                        obj.file = path.basename(file, '.m4a');
                        audioList.push(obj);
                    }else if(file.match(/.*.rpgmvo/gi)){
                        const obj = {};
                        obj.dir = `${folder}/`;
                        obj.file = path.basename(file, '.rpgmvo');
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
        const is_test = Utils.isOptionValid("test");
        const dir = !is_test && is_MV_Preload ? `./www/img/` : `./img/`;
        const dir_load = !is_test && is_MV_Preload ? `www/img/` : `img/`;
        const folders = fs.readdirSync(dir);
        folders.forEach((folder)=>{
            try{
                const files = fs.readdirSync(`${dir}${folder}/`);
                files.forEach((file)=>{
                    if(file.match(/.*.png_/gi)){
                        const obj = {};
                        obj.dir = `${dir_load}${folder}/`;
                        obj.file = path.basename(file, '.png_');
                        imageList.push(obj);
                    }else if(file.match(/.*.png/gi)){
                        const obj = {};
                        obj.dir = `${dir_load}${folder}/`;
                        obj.file = path.basename(file, '.png');
                        imageList.push(obj);
                    }else if(file.match(/.*.rpgmvp/gi)){
                        const obj = {};
                        obj.dir = `${dir_load}${folder}/`;
                        obj.file = path.basename(file, '.rpgmvp');
                        imageList.push(obj);
                    }
                })
            }catch(e){
                console.error(`Failed to preload image file.`)
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
    this.updateVideo()
    this.updatePreload();
}

Scene_Preload.prototype.updateVideo = function(){
    if(this._video_texture)this._video_texture.update();
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
        if(audio_object){
            const folder = audio_object.dir;
            const name = audio_object.file;
            AudioManager.createBuffer(folder, name);
            this._audioPreload++;
            if(this._audioPreload >= this._audioMax){
                this._preloadMode = 'audioF';
                break;
            }
        }else{
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
        if(image_object){
            const folder = image_object.dir;
            const name = image_object.file;
            if(folder == `img/system/`){
                if(name == "Loading"){
                    this._imagePreload++;
                    return;
                }
            }
            ImageManager.loadBitmap(folder, name);
            this._imagePreload++;
            if(this._imagePreload >= this._imageMax){
                this._preloadMode = 'imageF';
                break;
            }
        }else{
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
    if(
        Input.isTriggered('ok') || 
        Input.isTriggered('cancel') || 
        SynrecPL.Bypass_Confirm || 
        TouchInput.isTriggered()
    ){
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