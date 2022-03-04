/*:
 * @author Synrec
 * @plugindesc v1.1 Preloads all image and audio for the game on start
 * 
 * @target MZ
 * 
 * @help
 * This plugin will load the audio and image data that usually appears
 * when loading a new project.
 * 
 * Plugin will NOT load animations. Don't ask because it never will either.
 * 
 * Please check out my site https://synrec.dev for more info.
 * 
 * WARNING: This is extremely consumptive on the device memory.
 * May require increasing the device requirements for your project.
 * 
 * TERMS OF USE:
 * > You are REQUIRED to credit Synrec in your project.
 * > Not to be re-sold or redistributed in non-game projects
 * > Do not redistribute, this includes edits.
 * > Can be used in commercial or free RPG Maker MZ games.
 * > Do not redistribute for educational purposes.
 * > Do not use for malicious intent.
 * 
 * 
 * @param Audio Settings
 * 
 * @param BGM To Ignore
 * @desc List of BGM files to ignore when loading data.
 * @type file[]
 * @dir audio/bgm
 * @default []
 * @parent Audio Settings
 * 
 * @param Ignore All BGM
 * @desc Ignores all audio in folder
 * @type boolean
 * @default true
 * @parent BGM To Ignore
 * 
 * @param BGS To Ignore
 * @desc List of BGS files to ignore when loading data.
 * @type file[]
 * @dir audio/bgs
 * @default []
 * @parent Audio Settings
 * 
 * @param Ignore All BGS
 * @desc Ignores all audio in folder
 * @type boolean
 * @default true
 * @parent BGS To Ignore
 * 
 * @param ME To Ignore
 * @desc List of ME files to ignore when loading data.
 * @type file[]
 * @dir audio/me
 * @default []
 * @parent Audio Settings
 * 
 * @param Ignore All ME
 * @desc Ignores all audio in folder
 * @type boolean
 * @default true
 * @parent ME To Ignore
 * 
 * @param SE To Ignore
 * @desc List of SE files to ignore when loading data.
 * @type file[]
 * @dir audio/se
 * @default []
 * @parent Audio Settings
 * 
 * @param Ignore All SE
 * @desc Ignores all audio in folder
 * @type boolean
 * @default true
 * @parent SE To Ignore
 * 
 * @param Image Settings
 * 
 * @param BattleBacks1 To Ignore
 * @desc Ignores listed images
 * @type file[]
 * @dir img/battlebacks1
 * @default []
 * @parent Image Settings
 * 
 * @param Ignore All BattleBacks1
 * @desc Ignores entire folder
 * @type boolean
 * @default true
 * @parent BattleBacks1 To Ignore
 * 
 * @param BattleBacks2 To Ignore
 * @desc Ignores listed images
 * @type file[]
 * @dir img/battlebacks2
 * @default []
 * @parent Image Settings
 * 
 * @param Ignore All BattleBacks2
 * @desc Ignores entire folder
 * @type boolean
 * @default true
 * @parent BattleBacks2 To Ignore
 * 
 * @param Characters To Ignore
 * @desc Ignores listed images
 * @type file[]
 * @dir img/characters
 * @default []
 * @parent Image Settings
 * 
 * @param Ignore All Characters
 * @desc Ignores entire folder
 * @type boolean
 * @default true
 * @parent Characters To Ignore
 * 
 * @param Enemies To Ignore
 * @desc Ignores listed images
 * @type file[]
 * @dir img/enemies
 * @default []
 * @parent Image Settings
 * 
 * @param Ignore All Enemies
 * @desc Ignores entire folder
 * @type boolean
 * @default true
 * @parent Enemies To Ignore
 * 
 * @param Faces To Ignore
 * @desc Ignores listed images
 * @type file[]
 * @dir img/faces
 * @default []
 * @parent Image Settings
 * 
 * @param Ignore All Faces
 * @desc Ignores entire folder
 * @type boolean
 * @default true
 * @parent Faces To Ignore
 * 
 * @param Parallaxes To Ignore
 * @desc Ignores listed images
 * @type file[]
 * @dir img/parallaxes
 * @default []
 * @parent Image Settings
 * 
 * @param Ignore All Parallaxes
 * @desc Ignores entire folder
 * @type boolean
 * @default true
 * @parent Parallaxes To Ignore
 * 
 * @param Pictures To Ignore
 * @desc Ignores listed images
 * @type file[]
 * @dir img/pictures
 * @default []
 * @parent Image Settings
 * 
 * @param Ignore All Pictures
 * @desc Ignores entire folder
 * @type boolean
 * @default true
 * @parent Pictures To Ignore
 * 
 * @param SV Actors To Ignore
 * @desc Ignores listed images
 * @type file[]
 * @dir img/sv_actors
 * @default []
 * @parent Image Settings
 * 
 * @param Ignore All SV Actors
 * @desc Ignores entire folder
 * @type boolean
 * @default true
 * @parent SV Actors To Ignore
 * 
 * @param SV Enemies To Ignore
 * @desc Ignores listed images
 * @type file[]
 * @dir img/sv_enemies
 * @default []
 * @parent Image Settings
 * 
 * @param Ignore All SV Enemies
 * @desc Ignores entire folder
 * @type boolean
 * @default true
 * @parent SV Enemies To Ignore
 * 
 * @param System To Ignore
 * @desc Ignores listed images
 * @type file[]
 * @dir img/system
 * @default []
 * @parent Image Settings
 * 
 * @param Ignore All System
 * @desc Ignores entire folder
 * @type boolean
 * @default true
 * @parent System To Ignore
 * 
 * @param Tilesets To Ignore
 * @desc Ignores listed images
 * @type file[]
 * @dir img/tilesets
 * @default []
 * @parent Image Settings
 * 
 * @param Ignore All Tilesets
 * @desc Ignores entire folder
 * @type boolean
 * @default true
 * @parent Tilesets To Ignore
 * 
 * @param Titles1 To Ignore
 * @desc Ignores listed images
 * @type file[]
 * @dir img/titles1
 * @default []
 * @parent Image Settings
 * 
 * @param Ignore All Titles1
 * @desc Ignores entire folder
 * @type boolean
 * @default true
 * @parent Titles1 To Ignore
 * 
 * @param Titles2 To Ignore
 * @desc Ignores listed images
 * @type file[]
 * @dir img/titles2
 * @default []
 * @parent Image Settings
 * 
 * @param Ignore All Titles2
 * @desc Ignores entire folder
 * @type boolean
 * @default true
 * @parent Titles2 To Ignore
 * 
 */

let SynrecPL = {};
SynrecPL.Version = '1.1';
SynrecPL.Plugin = PluginManager.parameters('Synrec_Preloader')

SynrecPL.IgnoreBGM = JSON.parse(SynrecPL.Plugin['BGM To Ignore']);
SynrecPL.IgnoreBGS = JSON.parse(SynrecPL.Plugin['BGS To Ignore']);
SynrecPL.IgnoreME = JSON.parse(SynrecPL.Plugin['ME To Ignore']);
SynrecPL.IgnoreSE = JSON.parse(SynrecPL.Plugin['SE To Ignore']);

SynrecPL.IgnoreAllBGM = eval(SynrecPL.Plugin['Ignore All BGM']);
SynrecPL.IgnoreAllBGS = eval(SynrecPL.Plugin['Ignore All BGS']);
SynrecPL.IgnoreAllME = eval(SynrecPL.Plugin['Ignore All ME']);
SynrecPL.IgnoreAllSE = eval(SynrecPL.Plugin['Ignore All SE']);

SynrecPL.IgnoreBattBack1 = JSON.parse(SynrecPL.Plugin['BattleBacks1 To Ignore']);
SynrecPL.IgnoreBattBack2 = JSON.parse(SynrecPL.Plugin['BattleBacks2 To Ignore']);
SynrecPL.IgnoreCharas = JSON.parse(SynrecPL.Plugin['Characters To Ignore']);
SynrecPL.IgnoreEnems = JSON.parse(SynrecPL.Plugin['Enemies To Ignore']);
SynrecPL.IgnoreFaces = JSON.parse(SynrecPL.Plugin['Faces To Ignore']);
SynrecPL.IgnoreParallax = JSON.parse(SynrecPL.Plugin['Parallaxes To Ignore']);
SynrecPL.IgnorePictures = JSON.parse(SynrecPL.Plugin['Pictures To Ignore']);
SynrecPL.IgnoreSvAct = JSON.parse(SynrecPL.Plugin['SV Actors To Ignore']);
SynrecPL.IgnoreSvEnem = JSON.parse(SynrecPL.Plugin['SV Enemies To Ignore']);
SynrecPL.IgnoreSys = JSON.parse(SynrecPL.Plugin['System To Ignore']);
SynrecPL.IgnoreTileset = JSON.parse(SynrecPL.Plugin['Tilesets To Ignore']);
SynrecPL.IgnoreTitle1 = JSON.parse(SynrecPL.Plugin['Titles1 To Ignore']);
SynrecPL.IgnoreTitle2 = JSON.parse(SynrecPL.Plugin['Titles2 To Ignore']);

SynrecPL.IgnoreAllBattBack1 = eval(SynrecPL.Plugin['Ignore All BattleBacks1']);
SynrecPL.IgnoreAllBattBack2 = eval(SynrecPL.Plugin['Ignore All BattleBacks2']);
SynrecPL.IgnoreAllCharas = eval(SynrecPL.Plugin['Ignore All Characters']);
SynrecPL.IgnoreAllEnems = eval(SynrecPL.Plugin['Ignore All Enemies']);
SynrecPL.IgnoreAllFaces = eval(SynrecPL.Plugin['Ignore All Faces']);
SynrecPL.IgnoreAllParallax = eval(SynrecPL.Plugin['Ignore All Parallaxes']);
SynrecPL.IgnoreAllPictures = eval(SynrecPL.Plugin['Ignore All Pictures']);
SynrecPL.IgnoreAllSvAct = eval(SynrecPL.Plugin['Ignore All SV Actors']);
SynrecPL.IgnoreAllSvEnem = eval(SynrecPL.Plugin['Ignore All SV Enemies']);
SynrecPL.IgnoreAllSys = eval(SynrecPL.Plugin['Ignore All System']);
SynrecPL.IgnoreAllTileset = eval(SynrecPL.Plugin['Ignore All Tilesets']);
SynrecPL.IgnoreAllTitle1 = eval(SynrecPL.Plugin['Ignore All Titles1']);
SynrecPL.IgnoreAllTitle2 = eval(SynrecPL.Plugin['Ignore All Titles2']);


PrelrdScnBse = Scene_Base.prototype.start;
Scene_Base.prototype.start = function() {
    PrelrdScnBse.call(this);
    SceneManager.preloadData();
}

SceneManager.preloadData = function(){
    this.preloadAudio();
    this.preloadImage();
}

SceneManager.preloadAudio = function(){
    if(!this._savedBgm)this._savedBgm = [];
    if(!this._savedBgs)this._savedBgs = [];
    if(!this._savedMe)this._savedMe = [];
    if(!this._savedSe)this._savedSe = [];
    //const source = process.cwd().replace(/\\/g, '/');
    const fs = require('fs');
    const bgmDir = `./audio/bgm/`;
    const bgsDir = `./audio/bgs/`;
    const meDir = `./audio/me/`;
    const seDir = `./audio/se/`;
    const bgmFiles = fs.readdirSync(`${bgmDir}`, 'utf-8', (e,f)=>{
        if(e){
            throw (`No such directory: ${e}`);
        }
        return f;
    });
    const bgsFiles = fs.readdirSync(`${bgsDir}`, 'utf-8', (e,f)=>{
        if(e){
            throw (`No such directory: ${e}`);
        }
        return f;
    });
    const meFiles = fs.readdirSync(`${meDir}`, 'utf-8', (e,f)=>{
        if(e){
            throw (`No such directory: ${e}`);
        }
        return f;
    });
    const seFiles = fs.readdirSync(`${seDir}`, 'utf-8', (e,f)=>{
        if(e){
            throw (`No such directory: ${e}`);
        }
        return f;
    });
    if(this._savedBgm.length <= 0 && !SynrecPL.IgnoreAllBGM)this.preloadBgm(bgmFiles, bgmDir);
    if(this._savedBgs.length <= 0 && !SynrecPL.IgnoreAllBGS)this.preloadBgs(bgsFiles, bgsDir);
    if(this._savedMe.length <= 0 && !SynrecPL.IgnoreAllME)this.preloadMe(meFiles, meDir);
    if(this._savedSe.length <= 0 && !SynrecPL.IgnoreAllSE)this.preloadSe(seFiles, seDir);
}

SceneManager.preloadImage = function(){
    if(!this._savedBattBack1)this._savedBattBack1 = [];
    if(!this._savedBattBack2)this._savedBattBack2 = [];
    if(!this._savedCharas)this._savedCharas = [];
    if(!this._savedEnems)this._savedEnems = [];
    if(!this._savedFaces)this._savedFaces = [];
    if(!this._savedParallax)this._savedParallax = [];
    if(!this._savedPictures)this._savedPictures = [];
    if(!this._savedSvAct)this._savedSvAct = [];
    if(!this._savedSvEnem)this._savedSvEnem = [];
    if(!this._savedSys)this._savedSys = [];
    if(!this._savedTileset)this._savedTileset = [];
    if(!this._savedTitles1)this._savedTitles1 = [];
    if(!this._savedTitles2)this._savedTitles2 = [];
    const fs = require('fs');
    const battBack1Dir = `./img/battlebacks1/`;
    const battBack2Dir = `./img/battlebacks2/`;
    const charasDir = `./img/characters/`;
    const enemsDir = `./img/enemies/`;
    const facesDir = `./img/faces/`;
    const parallaxDir = `./img/parallaxes/`;
    const picturesDir = `./img/pictures/`;
    const svActDir = `./img/sv_actors/`;
    const svEnemDir = `./img/sv_enemies/`;
    const sysDir = `./img/system/`;
    const tilesetDir = `./img/tilesets/`;
    const titles1Dir = `./img/titles1/`;
    const titles2Dir = `./img/titles2/`;
    const battBack1Files = fs.readdirSync(`${battBack1Dir}`, 'utf-8', (e,f)=>{
        if(e){
            throw (`No such directory: ${e}`);
        }
        return f;
    });
    const battBack2Files = fs.readdirSync(`${battBack2Dir}`, 'utf-8', (e,f)=>{
        if(e){
            throw (`No such directory: ${e}`);
        }
        return f;
    });
    const charasFiles = fs.readdirSync(`${charasDir}`, 'utf-8', (e,f)=>{
        if(e){
            throw (`No such directory: ${e}`);
        }
        return f;
    });
    const enemsFiles = fs.readdirSync(`${enemsDir}`, 'utf-8', (e,f)=>{
        if(e){
            throw (`No such directory: ${e}`);
        }
        return f;
    });
    const facesFiles = fs.readdirSync(`${facesDir}`, 'utf-8', (e,f)=>{
        if(e){
            throw (`No such directory: ${e}`);
        }
        return f;
    });
    const parallaxFiles = fs.readdirSync(`${parallaxDir}`, 'utf-8', (e,f)=>{
        if(e){
            throw (`No such directory: ${e}`);
        }
        return f;
    });
    const picturesFiles = fs.readdirSync(`${picturesDir}`, 'utf-8', (e,f)=>{
        if(e){
            throw (`No such directory: ${e}`);
        }
        return f;
    });
    const svActFiles = fs.readdirSync(`${svActDir}`, 'utf-8', (e,f)=>{
        if(e){
            throw (`No such directory: ${e}`);
        }
        return f;
    });
    const svEnemFiles = fs.readdirSync(`${svEnemDir}`, 'utf-8', (e,f)=>{
        if(e){
            throw (`No such directory: ${e}`);
        }
        return f;
    });
    const sysFiles = fs.readdirSync(`${sysDir}`, 'utf-8', (e,f)=>{
        if(e){
            throw (`No such directory: ${e}`);
        }
        return f;
    });
    const tilesetFiles = fs.readdirSync(`${tilesetDir}`, 'utf-8', (e,f)=>{
        if(e){
            throw (`No such directory: ${e}`);
        }
        return f;
    });
    const titles1Files = fs.readdirSync(`${titles1Dir}`, 'utf-8', (e,f)=>{
        if(e){
            throw (`No such directory: ${e}`);
        }
        return f;
    });
    const titles2Files = fs.readdirSync(`${titles2Dir}`, 'utf-8', (e,f)=>{
        if(e){
            throw (`No such directory: ${e}`);
        }
        return f;
    });
    if(this._savedBattBack1.length <= 0 && !SynrecPL.IgnoreAllBattBack1)this.preloadBattBack1(battBack1Files, battBack1Dir);
    if(this._savedBattBack2.length <= 0 && !SynrecPL.IgnoreAllBattBack2)this.preloadBattBack2(battBack2Files, battBack2Dir);
    if(this._savedCharas.length <= 0 && !SynrecPL.IgnoreAllCharas)this.preloadCharas(charasFiles, charasDir);
    if(this._savedEnems.length <= 0 && !SynrecPL.IgnoreAllEnems)this.preloadEnems(enemsFiles, enemsDir);
    if(this._savedFaces.length <= 0 && !SynrecPL.IgnoreAllFaces)this.preloadFaces(facesFiles, facesDir);
    if(this._savedParallax.length <= 0 && !SynrecPL.IgnoreAllParallax)this.preloadParallax(parallaxFiles, parallaxDir);
    if(this._savedPictures.length <= 0 && !SynrecPL.IgnoreAllPictures)this.preloadPictures(picturesFiles, picturesDir);
    if(this._savedSvAct.length <= 0 && !SynrecPL.IgnoreAllSvAct)this.preloadSvAct(svActFiles, svActDir);
    if(this._savedSvEnem.length <= 0 && !SynrecPL.IgnoreAllSvEnem)this.preloadSvEnem(svEnemFiles, svEnemDir);
    if(this._savedSys.length <= 0 && !SynrecPL.IgnoreAllSys)this.preloadSys(sysFiles, sysDir);
    if(this._savedTileset.length <= 0 && !SynrecPL.IgnoreAllTileset)this.preloadTileset(tilesetFiles, tilesetDir);
    if(this._savedTitles1.length <= 0 && !SynrecPL.IgnoreAllTitle1)this.preloadTitle1(titles1Files, titles1Dir);
    if(this._savedTitles2.length <= 0 && !SynrecPL.IgnoreAllTitle2)this.preloadTitle2(titles2Files, titles2Dir);
}

SceneManager.preloadBgm = function(files, dir){
    this._savedBgm = [];
    const path = require('path');
    const audioExt = AudioManager.audioFileExt();
    for(let i = 0; i < files.length; i++){
        const file = files[i];
        const url = `${dir}/${file}`
        const isIgnored = this.ignorePreloadBGM(url);
        if(!isIgnored){
            const buffer = new WebAudio(url);
            buffer.name = path.basename(file, audioExt);
            this._savedBgm.push(buffer);
        }
    }
}

SceneManager.ignorePreloadBGM = function(BGM){
    const path = require('path');
    const audioExt = AudioManager.audioFileExt();
    if(!BGM)return false;
    for(let i = 0; i < SynrecPL.IgnoreBGM.length; i++){
        const bgm = `${SynrecPL.IgnoreBGM[i]}${audioExt}`;
        const baseBgm = path.basename(bgm);
        const checkBgm = path.basename(BGM);
        if(checkBgm == baseBgm)return true;
    }
    return false;
}

SceneManager.preloadBgs = function(files, dir){
    this._savedBgs = [];
    const path = require('path');
    const audioExt = AudioManager.audioFileExt();
    for(let i = 0; i < files.length; i++){
        const file = files[i];
        const url = `${dir}/${file}`
        const isIgnored = this.ignorePreloadBGS(url);
        if(!isIgnored){
            const buffer = new WebAudio(url);
            buffer.name = path.basename(file, audioExt);
            this._savedBgs.push(buffer);
        }
    }
}

SceneManager.ignorePreloadBGS = function(BGS){
    const path = require('path');
    const audioExt = AudioManager.audioFileExt();
    if(!BGS)return false;
    for(let i = 0; i < SynrecPL.IgnoreBGS.length; i++){
        const bgs = `${SynrecPL.IgnoreBGS[i]}${audioExt}`;
        const baseBgs = path.basename(bgs);
        const checkBgs = path.basename(BGS);
        if(checkBgs == baseBgs)return true;
    }
    return false;
}

SceneManager.preloadMe = function(files, dir){
    this._savedMe = [];
    const path = require('path');
    const audioExt = AudioManager.audioFileExt();
    for(let i = 0; i < files.length; i++){
        const file = files[i];
        const url = `${dir}/${file}`
        const isIgnored = this.ignorePreloadME(url);
        if(!isIgnored){
            const buffer = new WebAudio(url);
            buffer.name = path.basename(file, audioExt);
            this._savedMe.push(buffer);
        }
    }
}

SceneManager.ignorePreloadME = function(ME){
    const path = require('path');
    const audioExt = AudioManager.audioFileExt();
    if(!ME)return false;
    for(let i = 0; i < SynrecPL.IgnoreME.length; i++){
        const me = `${SynrecPL.IgnoreME[i]}${audioExt}`;
        const baseMe = path.basename(me);
        const checkMe = path.basename(ME);
        if(checkMe == baseMe)return true;
    }
    return false;
}

SceneManager.preloadSe = function(files, dir){
    this._savedSe = [];
    const path = require('path');
    const audioExt = AudioManager.audioFileExt();
    for(let i = 0; i < files.length; i++){
        const file = files[i];
        const url = `${dir}/${file}`
        const isIgnored = this.ignorePreloadSE(url);
        if(!isIgnored){
            const buffer = new WebAudio(url);
            buffer.name = path.basename(file, audioExt);
            this._savedSe.push(buffer);
        }
    }
}

SceneManager.ignorePreloadSE = function(SE){
    const path = require('path');
    const audioExt = AudioManager.audioFileExt();
    if(!SE)return false;
    for(let i = 0; i < SynrecPL.IgnoreSE.length; i++){
        const se = `${SynrecPL.IgnoreSE[i]}${audioExt}`;
        const baseSe = path.basename(se);
        const checkSe = path.basename(SE);
        if(checkSe == baseSe)return true;
    }
    return false;
}

SceneManager.preloadBattBack1 = function(files, dir){
    const path = require('path');
    for(let i = 0; i < files.length; i++){
        const file = files[i];
        const url = `${dir}/${file}`
        const isIgnored = this.ignorePreloadBattBack1(url);
        if(!isIgnored){
            let image = {};
            image.name = path.basename(file, '.png');
            image.data = Bitmap.load(url);
            this._savedBattBack1.push(image);
        }
    }
}

SceneManager.ignorePreloadBattBack1 = function(img){
    const path = require('path');
    const imageExt = '.png';
    if(!img)return false;
    for(let i = 0; i < SynrecPL.IgnoreBattBack1.length; i++){
        const img = `${SynrecPL.IgnoreBattBack1[i]}${imageExt}`;
        const baseImg = path.basename(img);
        const checkImg = path.basename(img);
        if(checkImg == baseImg)return true;
    }
    return false;
}

SceneManager.preloadBattBack2 = function(files, dir){
    const path = require('path');
    for(let i = 0; i < files.length; i++){
        const file = files[i];
        const url = `${dir}/${file}`
        const isIgnored = this.ignorePreloadBattBack2(url);
        if(!isIgnored){
            let image = {};
            image.name = path.basename(file, '.png');
            image.data = Bitmap.load(url);
            this._savedBattBack2.push(image);
        }
    }
}

SceneManager.ignorePreloadBattBack2 = function(img){
    const path = require('path');
    const imageExt = '.png';
    if(!img)return false;
    for(let i = 0; i < SynrecPL.IgnoreBattBack2.length; i++){
        const img = `${SynrecPL.IgnoreBattBack2[i]}${imageExt}`;
        const baseImg = path.basename(img);
        const checkImg = path.basename(img);
        if(checkImg == baseImg)return true;
    }
    return false;
}

SceneManager.preloadCharas = function(files, dir){
    const path = require('path');
    for(let i = 0; i < files.length; i++){
        const file = files[i];
        const url = `${dir}/${file}`
        const isIgnored = this.ignorePreloadCharas(url);
        if(!isIgnored){
            let image = {}
            image.name = path.basename(file, '.png');
            image.data = Bitmap.load(url);
            this._savedCharas.push(image);
        }
    }
}

SceneManager.ignorePreloadCharas = function(img){
    const path = require('path');
    const imageExt = '.png';
    if(!img)return false;
    for(let i = 0; i < SynrecPL.IgnoreCharas.length; i++){
        const img = `${SynrecPL.IgnoreCharas[i]}${imageExt}`;
        const baseImg = path.basename(img);
        const checkImg = path.basename(img);
        if(checkImg == baseImg)return true;
    }
    return false;
}

SceneManager.preloadEnems = function(files, dir){
    const path = require('path');
    for(let i = 0; i < files.length; i++){
        const file = files[i];
        const url = `${dir}/${file}`
        const isIgnored = this.ignorePreloadEnems(url);
        if(!isIgnored){
            let image = {};
            image.name = path.basename(file, '.png');
            image.data = Bitmap.load(url);
            this._savedEnems.push(image);
        }
    }
}

SceneManager.ignorePreloadEnems = function(img){
    const path = require('path');
    const imageExt = '.png';
    if(!img)return false;
    for(let i = 0; i < SynrecPL.IgnoreEnems.length; i++){
        const img = `${SynrecPL.IgnoreEnems[i]}${imageExt}`;
        const baseImg = path.basename(img);
        const checkImg = path.basename(img);
        if(checkImg == baseImg)return true;
    }
    return false;
}

SceneManager.preloadFaces = function(files, dir){
    const path = require('path');
    for(let i = 0; i < files.length; i++){
        const file = files[i];
        const url = `${dir}/${file}`
        const isIgnored = this.ignorePreloadFaces(url);
        if(!isIgnored){
            let image = {};
            image.name = path.basename(file, '.png');
            image.data = Bitmap.load(url);
            this._savedFaces.push(image);
        }
    }
}

SceneManager.ignorePreloadFaces = function(img){
    const path = require('path');
    const imageExt = '.png';
    if(!img)return false;
    for(let i = 0; i < SynrecPL.IgnoreFaces.length; i++){
        const img = `${SynrecPL.IgnoreFaces[i]}${imageExt}`;
        const baseImg = path.basename(img);
        const checkImg = path.basename(img);
        if(checkImg == baseImg)return true;
    }
    return false;
}

SceneManager.preloadParallax = function(files, dir){
    const path = require('path');
    for(let i = 0; i < files.length; i++){
        const file = files[i];
        const url = `${dir}/${file}`
        const isIgnored = this.ignorePreloadParallax(url);
        if(!isIgnored){
            let image = {};
            image.name = path.basename(file, '.png');
            image.data = Bitmap.load(url);
            this._savedParallax.push(image);
        }
    }
}

SceneManager.ignorePreloadParallax = function(img){
    const path = require('path');
    const imageExt = '.png';
    if(!img)return false;
    for(let i = 0; i < SynrecPL.IgnoreParallax.length; i++){
        const img = `${SynrecPL.IgnoreParallax[i]}${imageExt}`;
        const baseImg = path.basename(img);
        const checkImg = path.basename(img);
        if(checkImg == baseImg)return true;
    }
    return false;
}

SceneManager.preloadPictures = function(files, dir){
    const path = require('path');
    for(let i = 0; i < files.length; i++){
        const file = files[i];
        const url = `${dir}/${file}`
        const isIgnored = this.ignorePreloadPicture(url);
        if(!isIgnored){
            let image = {};
            image.name = path.basename(file, '.png');
            image.data = Bitmap.load(url);
            this._savedPictures.push(image);
        }
    }
}

SceneManager.ignorePreloadPicture = function(img){
    const path = require('path');
    const imageExt = '.png';
    if(!img)return false;
    for(let i = 0; i < SynrecPL.IgnorePictures.length; i++){
        const img = `${SynrecPL.IgnorePictures[i]}${imageExt}`;
        const baseImg = path.basename(img);
        const checkImg = path.basename(img);
        if(checkImg == baseImg)return true;
    }
    return false;
}

SceneManager.preloadSvAct = function(files, dir){
    const path = require('path');
    for(let i = 0; i < files.length; i++){
        const file = files[i];
        const url = `${dir}/${file}`
        const isIgnored = this.ignorePreloadSvAct(url);
        if(!isIgnored){
            let image = {};
            image.name = path.basename(file, '.png');
            image.data = Bitmap.load(url);
            this._savedSvAct.push(image);
        }
    }
}

SceneManager.ignorePreloadSvAct = function(img){
    const path = require('path');
    const imageExt = '.png';
    if(!img)return false;
    for(let i = 0; i < SynrecPL.IgnoreSvAct.length; i++){
        const img = `${SynrecPL.IgnoreSvAct[i]}${imageExt}`;
        const baseImg = path.basename(img);
        const checkImg = path.basename(img);
        if(checkImg == baseImg)return true;
    }
    return false;
}

SceneManager.preloadSvEnem = function(files, dir){
    const path = require('path');
    for(let i = 0; i < files.length; i++){
        const file = files[i];
        const url = `${dir}/${file}`
        const isIgnored = this.ignorePreloadSvEnem(url);
        if(!isIgnored){
            let image = {};
            image.name = path.basename(file, '.png');
            image.data = Bitmap.load(url);
            this._savedSvEnem.push(image);
        }
    }
}

SceneManager.ignorePreloadSvEnem = function(img){
    const path = require('path');
    const imageExt = '.png';
    if(!img)return false;
    for(let i = 0; i < SynrecPL.IgnoreSvEnem.length; i++){
        const img = `${SynrecPL.IgnoreSvEnem[i]}${imageExt}`;
        const baseImg = path.basename(img);
        const checkImg = path.basename(img);
        if(checkImg == baseImg)return true;
    }
    return false;
}

SceneManager.preloadSys = function(files, dir){
    const path = require('path');
    for(let i = 0; i < files.length; i++){
        const file = files[i];
        const url = `${dir}/${file}`
        const isIgnored = this.ignorePreloadSys(url);
        if(!isIgnored){
            let image = {};
            image.name = path.basename(file, '.png');
            image.data = Bitmap.load(url);
            this._savedSys.push(image);
        }
    }
}

SceneManager.ignorePreloadSys = function(img){
    const path = require('path');
    const imageExt = '.png';
    if(!img)return false;
    for(let i = 0; i < SynrecPL.IgnoreSys.length; i++){
        const img = `${SynrecPL.IgnoreSys[i]}${imageExt}`;
        const baseImg = path.basename(img);
        const checkImg = path.basename(img);
        if(checkImg == baseImg)return true;
    }
    return false;
}

SceneManager.preloadTileset = function(files, dir){
    const path = require('path');
    for(let i = 0; i < files.length; i++){
        const file = files[i];
        const url = `${dir}/${file}`
        const isIgnored = this.ignorePreloadTileset(url);
        if(!isIgnored){
            let image = {};
            image.name = path.basename(file, '.png');
            image.data = Bitmap.load(url);
            this._savedTileset.push(image);
        }
    }
}

SceneManager.ignorePreloadTileset = function(img){
    const path = require('path');
    const imageExt = '.png';
    if(!img)return false;
    for(let i = 0; i < SynrecPL.IgnoreTileset.length; i++){
        const img = `${SynrecPL.IgnoreTileset[i]}${imageExt}`;
        const baseImg = path.basename(img);
        const checkImg = path.basename(img);
        if(checkImg == baseImg)return true;
    }
    return false;
}

SceneManager.preloadTitle1 = function(files, dir){
    const path = require('path');
    for(let i = 0; i < files.length; i++){
        const file = files[i];
        const url = `${dir}/${file}`
        const isIgnored = this.ignorePreloadTitle1(url);
        if(!isIgnored){
            let image = {};
            image.name = path.basename(file, '.png');
            image.data = Bitmap.load(url);
            this._savedTitles1.push(image);
        }
    }
}

SceneManager.ignorePreloadTitle1 = function(img){
    const path = require('path');
    const imageExt = '.png';
    if(!img)return false;
    for(let i = 0; i < SynrecPL.IgnoreTitle1.length; i++){
        const img = `${SynrecPL.IgnoreTitle1[i]}${imageExt}`;
        const baseImg = path.basename(img);
        const checkImg = path.basename(img);
        if(checkImg == baseImg)return true;
    }
    return false;
}

SceneManager.preloadTitle2 = function(files, dir){
    const path = require('path');
    for(let i = 0; i < files.length; i++){
        const file = files[i];
        const url = `${dir}/${file}`
        const isIgnored = this.ignorePreloadTitle2(url);
        if(!isIgnored){
            let image = {};
            image.name = path.basename(file, '.png');
            image.data = Bitmap.load(url);
            this._savedTitles2.push(image);
        }
    }
}

SceneManager.ignorePreloadTitle2 = function(img){
    const path = require('path');
    const imageExt = '.png';
    if(!img)return false;
    for(let i = 0; i < SynrecPL.IgnoreTitle2.length; i++){
        const img = `${SynrecPL.IgnoreTitle2[i]}${imageExt}`;
        const baseImg = path.basename(img);
        const checkImg = path.basename(img);
        if(checkImg == baseImg)return true;
    }
    return false;
}

PrelrdAudioPlyBgm = AudioManager.playBgm;
AudioManager.playBgm = function(bgm, pos) {
    if (this.isCurrentBgm(bgm)) {
        PrelrdAudioPlyBgm.call(this, bgm, pos);
    }else{
        if(this.hasSavedBgm(bgm, pos))return;
    }
}

PrelrdAudioPlyBgs = AudioManager.playBgs;
AudioManager.playBgs = function(bgs, pos) {
    if (this.isCurrentBgs(bgs)) {
        PrelrdAudioPlyBgs.call(this, bgs, pos)
    } else {
        if(this.hasSavedBgs(bgs, pos))return;
    }
}

PrelrdAudioPlyMe = AudioManager.playMe;
AudioManager.playMe = function(me) {
    this.stopMe();
    if (me.name) {
        if(this.hasSavedMe(me))return;
        PrelrdAudioPlyMe.call(this, me);
    }
}

PrelrdAudioPlySe = AudioManager.playSe;
AudioManager.playSe = function(se) {
    if (se.name) {
        if(this.hasSavedSe(se))return;
        PrelrdAudioPlySe.call(this, se);
    }
};

AudioManager.hasSavedBgm = function(bgm, pos){
    const savedBgm = SceneManager._savedBgm;
    const name = bgm.name;
    for(let i = 0; i < savedBgm.length; i++){
        const saved = savedBgm[i];
        if(saved.name == name){
            saved.frameCount = Graphics.frameCount;
            this.stopBgm();
            this._bgmBuffer = saved;
            this.updateBgmParameters(bgm);
            if (!this._meBuffer) {
                this._bgmBuffer.play(true, pos || 0);
            }
            this.updateCurrentBgm(bgm, pos);
            return true;
        }
    }
    return false;
}

AudioManager.hasSavedBgs = function(bgs, pos){
    const savedBgs = SceneManager._savedBgs;
    const name = bgs.name;
    for(let i = 0; i < savedBgs.length; i++){
        const saved = savedBgs[i];
        if(saved.name == name){
            saved.frameCount = Graphics.frameCount;
            this.stopBgs();
            this._bgsBuffer = saved;
            this.updateBgsParameters(bgs);
            if (!this._meBuffer) {
                this._bgsBuffer.play(true, pos || 0);
            }
            this.updateCurrentBgs(bgs, pos);
            return true;
        }
    }
    return false;
}

AudioManager.hasSavedMe = function(me){
    const savedMe = SceneManager._savedMe;
    const name = me.name;
    for(let i = 0; i < savedMe.length; i++){
        const saved = savedMe[i];
        if(saved.name == name){
            saved.frameCount = Graphics.frameCount;
            if (this._bgmBuffer && this._currentBgm) {
                this._currentBgm.pos = this._bgmBuffer.seek();
                this._bgmBuffer.stop();
            }
            this._meBuffer = saved;
            this.updateMeParameters(me);
            this._meBuffer.play(false);
            this._meBuffer.addStopListener(this.stopMe.bind(this));
            return true;
        }
    }
    return false;
}

AudioManager.hasSavedSe = function(se){
    const savedSe = SceneManager._savedSe;
    const name = se.name;
    for(let i = 0; i < savedSe.length; i++){
        const saved = savedSe[i];
        if(saved.name == name){
            saved.frameCount = Graphics.frameCount;
            const latestBuffers = this._seBuffers.filter(
                buffer => buffer.frameCount === Graphics.frameCount
            );
            if (latestBuffers.find(buffer => buffer.name === se.name)) {
                return;
            }
            const buffer = saved;
            this.updateSeParameters(buffer, se);
            buffer.play(false);
            this._seBuffers.push(buffer);
            this.cleanupSe();
            return true;
        }
    }
    return false;
}

SynrecPLImgManLoadBattBack1 = ImageManager.loadBattleback1;
ImageManager.loadBattleback1 = function(filename) {
    const base = SynrecPLImgManLoadBattBack1.call(this, filename);
    const preload = this.preloadBattBack1(filename);
    return preload ? preload : base;
}

ImageManager.preloadBattBack1 = function(filename){
    if(!SceneManager._savedBattBack1)return undefined;
    for(let i = 0; i < SceneManager._savedBattBack1.length; i++){
        const image = SceneManager._savedBattBack1[i]
        const name = image.name;
        if(name == filename){
            return image.data;
        }
    }
    return undefined;
}

SynrecPLImgManLoadBattBack2 = ImageManager.loadBattleback2;
ImageManager.loadBattleback2 = function(filename) {
    const base = SynrecPLImgManLoadBattBack2.call(this, filename);
    const preload = this.preloadBattBack2(filename);
    return preload ? preload : base;
}

ImageManager.preloadBattBack2 = function(filename){
    if(!SceneManager._savedBattBack2)return undefined;
    for(let i = 0; i < SceneManager._savedBattBack2.length; i++){
        const image = SceneManager._savedBattBack2[i]
        const name = image.name;
        if(name == filename){
            return image.data;
        }
    }
    return undefined;
}

SynrecPLImgManLoadEnem = ImageManager.loadEnemy;
ImageManager.loadEnemy = function(filename) {
    const base = SynrecPLImgManLoadEnem.call(this, filename);
    const preload = this.preloadEnem(filename);
    return preload ? preload : base;
}

ImageManager.preloadEnem = function(filename){
    if(!SceneManager._savedEnems)return undefined;
    for(let i = 0; i < SceneManager._savedEnems.length; i++){
        const image = SceneManager._savedEnems[i]
        const name = image.name;
        if(name == filename){
            return image.data;
        }
    }
    return undefined;
}

SynrecPLImgManLoadChar = ImageManager.loadCharacter;
ImageManager.loadCharacter = function(filename) {
    const base = SynrecPLImgManLoadChar.call(this, filename);
    const preload = this.preloadChar(filename);
    return preload ? preload : base;
}

ImageManager.preloadChar = function(filename){
    if(!SceneManager._savedCharas)return undefined;
    for(let i = 0; i < SceneManager._savedCharas.length; i++){
        const image = SceneManager._savedCharas[i]
        const name = image.name;
        if(name == filename){
            return image.data;
        }
    }
    return undefined;
}

SynrecPLImgManLoadFace = ImageManager.loadFace;
ImageManager.loadFace = function(filename) {
    const base = SynrecPLImgManLoadFace.call(this, filename);
    const preload = this.preloadFace(filename);
    return preload ? preload : base;
}

ImageManager.preloadFace = function(filename){
    if(!SceneManager._savedFaces)return undefined;
    for(let i = 0; i < SceneManager._savedFaces.length; i++){
        const image = SceneManager._savedFaces[i]
        const name = image.name;
        if(name == filename){
            return image.data;
        }
    }
    return undefined;
}

SynrecPLImgManLoadParallax = ImageManager.loadParallax;
ImageManager.loadParallax = function(filename) {
    const base = SynrecPLImgManLoadParallax.call(this, filename);
    const preload = this.preloadParallax(filename);
    return preload ? preload : base;
}

ImageManager.preloadParallax = function(filename){
    if(!SceneManager._savedParallax)return undefined;
    for(let i = 0; i < SceneManager._savedParallax.length; i++){
        const image = SceneManager._savedParallax[i]
        const name = image.name;
        if(name == filename){
            return image.data;
        }
    }
    return undefined;
}

SynrecPLImgManLoadPicture = ImageManager.loadPicture;
ImageManager.loadPicture = function(filename) {
    const base = SynrecPLImgManLoadPicture.call(this, filename);
    const preload = this.preloadPicture(filename);
    return preload ? preload : base;
}

ImageManager.preloadPicture = function(filename){
    if(!SceneManager._savedPictures)return undefined;
    for(let i = 0; i < SceneManager._savedPictures.length; i++){
        const image = SceneManager._savedPictures[i]
        const name = image.name;
        if(name == filename){
            return image.data;
        }
    }
    return undefined;
}

SynrecPLImgManLoadSvAct = ImageManager.loadSvActor;
ImageManager.loadSvActor = function(filename) {
    const base = SynrecPLImgManLoadSvAct.call(this, filename);
    const preload = this.preloadSvAct(filename);
    return preload ? preload : base;
}

ImageManager.preloadSvAct = function(filename){
    if(!SceneManager._savedSvAct)return undefined;
    for(let i = 0; i < SceneManager._savedSvAct.length; i++){
        const image = SceneManager._savedSvAct[i]
        const name = image.name;
        if(name == filename){
            return image.data;
        }
    }
    return undefined;
}

SynrecPLImgManLoadSvEnem = ImageManager.loadSvEnemy;
ImageManager.loadSvEnemy = function(filename) {
    const base = SynrecPLImgManLoadSvEnem.call(this, filename);
    const preload = this.preloadSvEnem(filename);
    return preload ? preload : base;
}

ImageManager.preloadSvEnem = function(filename){
    if(!SceneManager._savedSvEnem)return undefined;
    for(let i = 0; i < SceneManager._savedSvEnem.length; i++){
        const image = SceneManager._savedSvEnem[i]
        const name = image.name;
        if(name == filename){
            return image.data;
        }
    }
    return undefined;
}

SynrecPLImgManLoadSys = ImageManager.loadSystem;
ImageManager.loadSystem = function(filename) {
    const base = SynrecPLImgManLoadSys.call(this, filename);
    const preload = this.preloadSys(filename);
    return preload ? preload : base;
}

ImageManager.preloadSys = function(filename){
    if(!SceneManager._savedSys)return undefined;
    for(let i = 0; i < SceneManager._savedSys.length; i++){
        const image = SceneManager._savedSys[i]
        const name = image.name;
        if(name == filename){
            return image.data;
        }
    }
    return undefined;
}

SynrecPLImgManLoadTileset = ImageManager.loadTileset;
ImageManager.loadTileset = function(filename) {
    const base = SynrecPLImgManLoadTileset.call(this, filename);
    const preload = this.preloadTileset(filename);
    return preload ? preload : base;
}

ImageManager.preloadTileset = function(filename){
    if(!SceneManager._savedTileset)return undefined;
    for(let i = 0; i < SceneManager._savedTileset.length; i++){
        const image = SceneManager._savedTileset[i]
        const name = image.name;
        if(name == filename){
            return image.data;
        }
    }
    return undefined;
}

SynrecPLImgManLoadTitle1 = ImageManager.loadTitle1;
ImageManager.loadTitle1 = function(filename) {
    const base = SynrecPLImgManLoadTitle1.call(this, filename);
    const preload = this.preloadTitle1(filename);
    return preload ? preload : base;
}

ImageManager.preloadTitle1 = function(filename){
    if(!SceneManager._savedTitles1)return undefined;
    for(let i = 0; i < SceneManager._savedTitles1.length; i++){
        const image = SceneManager._savedTitles1[i]
        const name = image.name;
        if(name == filename){
            return image.data;
        }
    }
    return undefined;
}

SynrecPLImgManLoadTitle2 = ImageManager.loadTitle2;
ImageManager.loadTitle2 = function(filename) {
    const base = SynrecPLImgManLoadTitle2.call(this, filename);
    const preload = this.preloadTitle2(filename);
    return preload ? preload : base;
}

ImageManager.preloadTitle2 = function(filename){
    if(!SceneManager._savedTitles2)return undefined;
    for(let i = 0; i < SceneManager._savedTitles2.length; i++){
        const image = SceneManager._savedTitles2[i]
        const name = image.name;
        if(name == filename){
            return image.data;
        }
    }
    return undefined;
}