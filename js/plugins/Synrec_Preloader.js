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
 * @param Width
 * @desc Size of the gauge
 * @type text
 * @default 1
 * 
 * @param Height
 * @desc Size of the gauge
 * @type text
 * @default 1
 * 
 * @param Color
 * @desc Color of the gauge
 * @type text
 * @default #ffffff
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