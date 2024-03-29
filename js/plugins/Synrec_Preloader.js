/*:
 * @author Synrec/Kylestclair
 * @plugindesc v1.0.0 Preloads image and audio for the game on start
 * @url https://synrec.itch.io
 * @target MZ
 * 
 * @help
 * During playtesting, the plugin will create a list of image and audio
 * that was loaded to be preloaded on startup.
 * 
 * 
 * @param Bypass Load Confirm
 * @desc Bypass needing to use a confirm button
 * @type boolean
 * @default false
 * 
 * @param Loading Gauge
 * @desc Setup the loading gauge
 * @type struct<preloadGauge>
 * 
 * @param Preload Background
 * @desc Background Image used for the preload scene.
 * @type file
 * @dir img/system/
 * 
 * @param General Settings
 * 
 * @param Load Rate
 * @parent General Settings
 * @desc Speed to preload data
 * @type number
 * @default 1
 * 
 * @param Ignored Directories
 * @parent General Settings
 * @desc These directories are ignored by the preloader
 * Format: main_dir/sub_dir/
 * @type text[]
 * @default []
 * 
 * @param Ignored Files
 * @parent General Settings
 * @desc These files are ignored by the preloader
 * @type struct<ignoreFile>[]
 * @default []
 * 
 */
/*~struct~preloadGauge:
 * 
 * @param Position X
 * @desc Screen position of gauge
 * @type text
 * @default 0
 * 
 * @param Position Y
 * @desc Screen position of gauge
 * @type text
 * @default 0
 * 
 * @param Radius
 * @desc Size of the gauge
 * @type text
 * @default 1
 * 
 * @param Color
 * @desc Color of the gauge
 * Use 0xHex; eg: 0xffffff
 * @type text
 * @default 0xffffff
 * 
 * @param Complete Text
 * @desc Text when preload complete
 * @type text
 * @default Press OK To Continue
 * 
 * @param Text X
 * @parent Complete Text
 * @desc Position of text
 * @type text
 * @default 0
 * 
 * @param Text Y
 * @parent Complete Text
 * @desc Position of text
 * @type text
 * @default 0
 * @default 0
 * 
 * @param Text Font Face
 * @parent Complete Text
 * @desc Font face of text
 * @type text
 * @default sans-serif
 * 
 * @param Text Size
 * @parent Complete Text
 * @desc Size of text
 * @type text
 * @default 24
 * 
 * @param Text Outline Size
 * @parent Complete Text
 * @desc Size of text
 * @type text
 * @default 4
 * 
 * @param Text Color
 * @parent Complete Text
 * @desc Color of text
 * eg: #ffffff or rgba(255, 255, 255, 1)
 * @type text
 * @default #ffffff
 * 
 * @param Text Outline Color
 * @parent Complete Text
 * @desc Color of text
 * eg: #ffffff or rgba(255, 255, 255, 1)
 * @type text
 * @default rgba(0, 0, 0, 0.5)
 * 
 */
/*~struct~ignoreFile:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default FILE
 * 
 * @param Directory
 * @desc Directory file loaded from
 * Format: main_dir/sub_dir/
 * @type text
 * @default img/pictures/
 * 
 * @param File Name
 * @desc Include sub-directory names as well.
 * @type text
 * 
 */

const Syn_Preload = {};
Syn_Preload.Plugin = PluginManager.parameters(`Synrec_Preloader`);

function IGNORE_FILE_PARSER_PRELOAD(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

try{
    Syn_Preload.IGNORED_FILES = JSON.parse(Syn_Preload.Plugin['Ignored Files']).map((file_data)=>{
        return IGNORE_FILE_PARSER_PRELOAD(file_data);
    }).filter(Boolean)
}catch(e){
    Syn_Preload.IGNORED_FILES = [];
}

try{
    Syn_Preload.IGNORED_FOLDERS = JSON.parse(Syn_Preload.Plugin['Ignored Directories']);
}catch(e){
    Syn_Preload.IGNORED_FOLDERS = [];
}

function PRELOAD_GAUGE_SETTINGS_PARSER_PRELOAD(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        const obj = {};
        obj['Position X'] = 0;
        obj['Position Y'] = 0;
        obj['Width'] = Graphics.width;
        obj['Height'] = Graphics.height;
        obj['Color'] = '#ffffff';
        return obj;
    }
}

Syn_Preload.PRELOAD_GAUGE_SETTINGS = PRELOAD_GAUGE_SETTINGS_PARSER_PRELOAD(Syn_Preload.Plugin['Loading Gauge']);

Syn_Preload.BYPASS_LOAD_CONFIRM = eval(Syn_Preload.Plugin['Bypass Load Confirm']);

Syn_Preload_ScnMngr_UpdtMain = SceneManager.updateMain;
SceneManager.updateMain = function() {
    Syn_Preload_ScnMngr_UpdtMain.call(this, ...arguments);
    this.updatePreload();
}

SceneManager.updatePreload = function(){
    if(!$gameTemp)return;
    const need_preload = $gameTemp._need_preload;
    if(!need_preload){
        if(this._running_preloader){
            this.updatePreloadScene(true);
            this._running_preloader = false;
        }
        return;
    }
    this._running_preloader = true;
    $gameTemp.updatePreloadList();
    this.updatePreloadScene(false);
}

SceneManager.updatePreloadScene = function(show_window_layer){
    const scene = this._scene;
    if(!scene)return;
    const window_layer = scene._windowLayer;
    if(window_layer){
        window_layer.visible = show_window_layer;
    }
    if(!show_window_layer){
        this.drawScenePreloadPIXI();
    }else{
        this.eraseScenePreloadPIXI();
    }
}

SceneManager.drawScenePreloadPIXI = function(){
    const scene = this._scene;
    const gauge_settings = Syn_Preload.PRELOAD_GAUGE_SETTINGS;
    const cur = $gameTemp._current_preload;
    const max = $gameTemp._preload_length;
    const ratio = (cur / max);
    loading_circ.clear();
    if(ratio < 1){
        const x = eval(gauge_settings['Position X']) || 0;
        const y = eval(gauge_settings['Position Y']) || 0;
        const r = eval(gauge_settings['Radius']) || 1;
        const color = eval(gauge_settings['Color']);
        if(!this._preload_pixi_circ){
            this._preload_pixi_circ = new PIXI.Graphics();
            scene.addChild(this._preload_pixi_circ);
        }
        const loading_circ = this._preload_pixi_circ;
        const ratio_arc = (Math.PI * 2) * ratio;
        const line_size = Math.ceil(Math.max(Graphics.width, Graphics.height) / 100);
        loading_circ.lineStyle(line_size, color);
        loading_circ.arc(x, y, r, 0, ratio_arc);
    }else if(!Syn_Preload.BYPASS_LOAD_CONFIRM){
        const x = eval(gauge_settings['Text X']);
        const y = eval(gauge_settings['Text Y']);
        const text = (gauge_settings['Complete Text'] || "");
        if(!this._confirm_sprite){
            const sprite = new Sprite();
            const bitmap = new Bitmap(Graphics.width, Graphics.height);
            bitmap.fontFace = gauge_settings['Text Font Face'];
            bitmap.fontSize = eval(gauge_settings['Text Size']);
            bitmap.outlineWidth = eval(gauge_settings['Text Outline Size']);
            bitmap.textColor = gauge_settings['Text Color'];
            bitmap.outlineColor = gauge_settings['Text Outline Color'];
            bitmap.drawText(text, x, y, Graphics.width, Math.max(36, bitmap.fontSize));
            sprite.bitmap = bitmap;
            scene.addChild(sprite);
            this._confirm_sprite = sprite;
        }
    }
}

SceneManager.eraseScenePreloadPIXI = function(){
    if(this._preload_pixi_circ){
        if(this._preload_pixi_circ.parent){
            this._preload_pixi_circ.parent.removeChild(this._preload_pixi_circ);
            if(this._preload_pixi_circ.destroy)this._preload_pixi_circ.destroy();
            this._preload_pixi_circ = null;
        }
    }
    if(this._confirm_sprite){
        if(this._confirm_sprite.parent){
            this._confirm_sprite.parent.removeChild(this._confirm_sprite);
            if(this._confirm_sprite.destroy)this._confirm_sprite.destroy();
            this._confirm_sprite = null;
        }
    }
}

Syn_Preload_ScnBse_IsBsy = Scene_Base.prototype.isBusy;
Scene_Base.prototype.isBusy = function() {
    const base = Syn_Preload_ScnBse_IsBsy.call(this, ...arguments);
    return base || SceneManager._running_preloader;
}

Game_Temp.prototype.setPreloadList = function(list){
    this._preloader_list = list;
}

Game_Temp.prototype.preloadList = function(){
    return this._preloader_list || {};
}

Game_Temp.prototype.imagePreloadList = function(){
    const whole_list = this.preloadList();
    return whole_list['Image'] || {};
}

Game_Temp.prototype.audioPreloadList = function(){
    const whole_list = this.preloadList();
    return whole_list['Audio'] || {};
}

Game_Temp.prototype.imageIgnoredPreloadList = function(){
    const whole_list = this.preloadList();
    return whole_list['Image File Ignored'] || {};
}

Game_Temp.prototype.audioIgnoredPreloadList = function(){
    const whole_list = this.preloadList();
    return whole_list['Audio File Ignored'] || {};
}

Game_Temp.prototype.imageBannedPreloadList = function(){
    const whole_list = this.preloadList();
    return whole_list['Image Folder Ignored'] || [];
}

Game_Temp.prototype.audioBannedPreloadList = function(){
    const whole_list = this.preloadList();
    return whole_list['Audio Folder Ignored'] || [];
}

Game_Temp.prototype.savePreloadList = function(){
    const is_mz = Utils.RPGMAKER_NAME == "MZ";
    const file_name = `Preload_JSON`;
    if(is_mz){
        const preload_list = this.preloadList();
        const preload_json = JSON.stringify(preload_list);
        StorageManager.saveObject(file_name, preload_json);
    }
}

Game_Temp.prototype.loadPreloadList = function(){
    const is_mz = Utils.RPGMAKER_NAME == "MZ";
    const file_name = `Preload_JSON`;
    if(is_mz){
        const file_exists = StorageManager.exists(file_name);
        if(file_exists){
            StorageManager.loadObject(file_name)
            .then((file)=>{
                const list = JSON.parse(file);
                $gameTemp.setPreloadList(list);
            })
            .catch((e)=>{
                console.error(e);
            })
        }
    }
}

Game_Temp.prototype.resyncBanIgnoreLists = function(){
    const ignored_folders = Syn_Preload.IGNORED_FOLDERS;
    const preload_list = this.preloadList();
    const image_folder_list = preload_list['Image'] || {};
    const audio_folder_list = preload_list['Audio'] || {};
    if(ignored_folders.length > 0){
        for(let i = 0; i < ignored_folders.length; i++){
            const del_fldr = ignored_folders[i];
            delete audio_folder_list[del_fldr];
            delete image_folder_list[del_fldr];
        }
    }
    preload_list['Image'] = image_folder_list;
    preload_list['Audio'] = audio_folder_list;
    const ignored_files = Syn_Preload.IGNORED_FILES;
    if(ignored_files.length > 0){
        const image_match_checker = /^(img\/)(?.+)/gm;
        const audio_match_checker = /^(audio\/)(?.+)/gm;
        const image_list = [];
        const audio_list = [];
        ignored_files.forEach((file_data)=>{
            const file_dir = file_data['Directory'];
            if(file_dir.match(image_match_checker)){
                image_list.push(file_data);
            }
            if(file_dir.match(audio_match_checker)){
                audio_list.push(file_data);
            }
        })
        image_list.forEach((file_data)=>{
            const chk_dir = file_data['Directory'];
            const img_dir = preload_list['Image'][chk_dir];
            if(Array.isArray(img_dir)){
                const index = img_dir.indexOf(file_data['File Name']);
                if(index >= 0){
                    img_dir.splice(index, 1);
                }
            }
            preload_list['Image'][chk_dir] = img_dir;
        })
        audio_list.forEach((file_data)=>{
            const chk_dir = file_data['Directory'];
            const aud_dir = preload_list['Audio'][chk_dir];
            if(Array.isArray(aud_dir)){
                const index = aud_dir.indexOf(file_data['File Name']);
                if(index >= 0){
                    aud_dir.splice(index, 1);
                }
            }
            preload_list['Audio'][chk_dir] = aud_dir;
        })
    }
}

Game_Temp.prototype.generateImageList = function(){
    const list = [];
    const image_preload_list = this.imagePreloadList();
    const folder_keys = Object.keys(image_preload_list);
    for(const folder_name of folder_keys){
        const folder_list = image_preload_list[folder_name];
        for(let i = 0; i < folder_list.length; i++){
            const file_name = folder_list[i];
            const preload_obj = {folder: folder_name, file: file_name};
            list.push(preload_obj);
        }
    }
    this._image_preloads = list;
}

Game_Temp.prototype.generateImageList = function(){
    const list = [];
    const audio_preload_list = this.audioPreloadList();
    const folder_keys = Object.keys(audio_preload_list);
    for(const folder_name of folder_keys){
        const folder_list = audio_preload_list[folder_name];
        for(let i = 0; i < folder_list.length; i++){
            const file_name = folder_list[i];
            const preload_obj = {folder: folder_name, file: file_name};
            list.push(preload_obj);
        }
    }
    this._audio_preloads = list;
}

Syn_Preload_GmTemp_Init = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    Syn_Preload_GmTemp_Init.call(this, ...arguments);
    this.executePreload();
}

Game_Temp.prototype.executePreload = function(){
    this.loadPreloadList();
    this.resyncBanIgnoreLists();
    this.generateImageList();
    this.generateAudioList();
    this._current_preload = 0;
    this._preload_length = this._image_preloads.length + this._audio_preloads.length;
    this._need_preload = true;
}

Game_Temp.prototype.updatePreloadList = function(){
    if(this.updateImagePreload())return;
    if(this.updateAudioPreload())return;
    if(this.updateConfirmPreload())return;
    this._preload_complete = true;
    delete this._need_preload;
}