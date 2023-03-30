/*:@author Synrec 
 * @target MZ
 *
 * @plugindesc v1.5 A beastiary for captured enemies
 * 
 * @help
 * This plugin functions as a menu command,
 * This adds a special command in which you can access a beastiary scene.
 * 
 * The beastiary takes all its data from the data base setup.
 * 
 * This plugin follows the permissions outlined in Synrec_MC_Core.js
 * 
 * 
 * 
 * 
 * @param Menu Access By Default
 * @desc Enables menu access by default.
 * @type boolean
 * @default true
 * 
 * @param Background
 * @desc Background image shown
 * @type file
 * @dir img/backgrounds
 * 
 * @param Background Scroll X
 * @desc Scroll X Direction for the background
 * @type number
 * @default 0
 * @parent Background
 * 
 * @param Background Scroll Y
 * @desc Scroll Y Direction for the background
 * @type number
 * @default 0
 * @parent Background
 * 
 * @param List Mode
 * @desc How the listed actors are shown
 * @type select
 * @default 0
 * @option Captured Only
 * @value 0
 * @option Show All
 * @value 1
 * @option Show All, List Captured
 * @value 2
 * 
 * @param List Filter Name
 * @desc Name to filter from actor list
 * @type text
 * @default ----------
 * @parent List Mode
 * 
 * @param Page Names
 * 
 * @param Page Zero Name
 * @desc Name of Page Zero
 * @type text
 * @default Base
 * @parent Page Names
 * 
 * @param Page One Name
 * @desc Name of Page One
 * @type text
 * @default Params
 * @parent Page Names
 * 
 * @param Page Two Name
 * @desc Name of Page Two
 * @type text
 * @default ExParams
 * @parent Page Names
 * 
 * @param Page Three Name
 * @desc Name of Page Three
 * @type text
 * @default SpParams
 * @parent Page Names
 * 
 * @param Page Four Name
 * @desc Name of Page Three
 * @type text
 * @default Traits
 * @parent Page Names
 * 
 * @param Page Enable
 * 
 * @param Page Zero Enable
 * @desc Enable Page Zero
 * @type boolean
 * @default true
 * @parent Page Enable
 * 
 * @param Page One Enable
 * @desc Enable Page One
 * @type boolean
 * @default true
 * @parent Page Enable
 * 
 * @param Page Two Enable
 * @desc Enable Page Two
 * @type boolean
 * @default true
 * @parent Page Enable
 * 
 * @param Page Three Enable
 * @desc Enable Page Three
 * @type boolean
 * @default true
 * @parent Page Enable
 * 
 * @param Page Four Enable
 * @desc Enable Page Four
 * @type boolean
 * @default false
 * @parent Page Enable
 * 
 * @param Profile Data
 * @desc Determine what shows in the profile (page 1) data window
 * @default []
 * @type struct<ProfileActor>[]
 * @parent Page Zero Enable
 * 
 * @param Trait Data
 * @desc Determine what shows in the trait data window
 * @default []
 * @type struct<TraitActor>[]
 * @parent Page Four Enable
 * 
 */
/*~struct~ProfileActor:
 *
 * @param Actor ID
 * @desc Actor for which the trait applies.
 * @type actor
 * @default 1
 * 
 * @param Actor Trait Script
 * @desc Evaluated as a script.
 * @type note
 * @default "this.drawText('Hello World!', 40, 0)"
 * 
 */
/*~struct~TraitActor:
 *
 * @param Actor ID
 * @desc Actor for which the trait applies.
 * @type actor
 * @default 1
 * 
 * @param Actor Trait Script
 * @desc Evaluated as a script.
 * @type note
 * @default "this.drawText('Hello World!', 40, 0)"
 * 
 */

if(!SynrecMC)throw new Error("Core Plugin Missing.");
if(!isObject(SynrecMC))throw new Error("Bad Core Files.");
SynrecMC.Beastiary = {};
SynrecMC.Beastiary.Version = "1.5";

SynrecMC.Beastiary.Plugins = PluginManager.parameters('Synrec_MC_Beastiary');
SynrecMC.Beastiary.Background = SynrecMC.Beastiary.Plugins['Background'];
SynrecMC.Beastiary.BackgroundScrollX = eval(SynrecMC.Beastiary.Plugins['Background Scroll X']);
SynrecMC.Beastiary.BackgroundScrollY = eval(SynrecMC.Beastiary.Plugins['Background Scroll Y']);
SynrecMC.Beastiary.PageZeroName = SynrecMC.Beastiary.Plugins['Page Zero Name'];
SynrecMC.Beastiary.PageOneName = SynrecMC.Beastiary.Plugins['Page One Name'];
SynrecMC.Beastiary.PageTwoName = SynrecMC.Beastiary.Plugins['Page Two Name'];
SynrecMC.Beastiary.PageThreeName = SynrecMC.Beastiary.Plugins['Page Three Name'];
SynrecMC.Beastiary.PageFourName = SynrecMC.Beastiary.Plugins['Page Four Name'];

SynrecMC.Beastiary.enableMenu = eval(SynrecMC.Beastiary.Plugins['Menu Access By Default']);
SynrecMC.Beastiary.ListMode = eval(SynrecMC.Beastiary.Plugins['List Mode']);
SynrecMC.Beastiary.ListFilterName = SynrecMC.Beastiary.Plugins['List Filter Name'];

SynrecMC.Beastiary.PageZeroEnable = eval(SynrecMC.Beastiary.Plugins['Page Zero Enable']);
SynrecMC.Beastiary.PageOneEnable = eval(SynrecMC.Beastiary.Plugins['Page One Enable']);
SynrecMC.Beastiary.PageTwoEnable = eval(SynrecMC.Beastiary.Plugins['Page Two Enable']);
SynrecMC.Beastiary.PageThreeEnable = eval(SynrecMC.Beastiary.Plugins['Page Three Enable']);
SynrecMC.Beastiary.PageFourEnable = eval(SynrecMC.Beastiary.Plugins['Page Four Enable']);

SynrecMC.Beastiary.ProfileData = JSON.parse(SynrecMC.Beastiary.Plugins['Profile Data'])
for(profIdx = 0; profIdx < SynrecMC.Beastiary.ProfileData.length; profIdx++){
    SynrecMC.Beastiary.ProfileData[profIdx] = JSON.parse(SynrecMC.Beastiary.ProfileData[profIdx]);
    SynrecMC.Beastiary.ProfileData[profIdx]['Actor ID'] = eval(SynrecMC.Beastiary.ProfileData[profIdx]['Actor ID']);
}

SynrecMC.Beastiary.TraitData = JSON.parse(SynrecMC.Beastiary.Plugins['Trait Data'])
for(traitIdx = 0; traitIdx < SynrecMC.Beastiary.TraitData.length; traitIdx++){
    SynrecMC.Beastiary.TraitData[traitIdx] = JSON.parse(SynrecMC.Beastiary.TraitData[traitIdx]);
    SynrecMC.Beastiary.TraitData[traitIdx]['Actor ID'] = eval(SynrecMC.Beastiary.TraitData[traitIdx]['Actor ID']);
}

// BUG
// Draw Text EX Bug noticed by engine manufacturer.

Scene_Menu.prototype.openBeastiary = function(){
    SoundManager.playOk();
    SceneManager.push(Scene_Beastiary);
}

function Scene_Beastiary(){
    this.initialize(...arguments);
}

Scene_Beastiary.prototype = Object.create(Scene_Base.prototype);
Scene_Beastiary.prototype.constructor = Scene_Beastiary;

Scene_Beastiary.prototype.start = function(){
    $gameParty.checkCaptured();
    Scene_Base.prototype.start.call(this);
}

Scene_Beastiary.prototype.update = function(){
    Scene_Base.prototype.update.call(this);
    this.updateBackground();
}

Scene_Beastiary.prototype.updateBackground = function(){
    this._background.origin.x += SynrecMC.Beastiary.BackgroundScrollX;
    this._background.origin.y += SynrecMC.Beastiary.BackgroundScrollY;
}

Scene_Beastiary.prototype.create = function(){
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createWindowLayer();
    this.createCommandWindow();
    this.createSelectorWindow();
    this.createDataWindow();
}

Scene_Beastiary.prototype.createBackground = function(){
    const bitmapName = SynrecMC.Beastiary.Background;
    this._background = new TilingSprite();
    if(bitmapName){
        this._background.bitmap = ImageManager.loadBackground(bitmapName);
    }else{
        this._backgroundFilter = new PIXI.filters.BlurFilter();
        this._background.filters = [this._backgroundFilter];
        this._background.opacity = 192;
    }
    this.addChild(this._background);
}

Scene_Beastiary.prototype.createCommandWindow = function(){
    const x = Graphics.width / 3;
    const y = 0;
    const w = Graphics.width - (Graphics.width / 3);
    const h = Graphics.height / 9;
    const rect = new Rectangle(x, y, w, h);
    this._commandWindow = new Window_BeastiaryCommand(rect);
    this._commandWindow.setHandler('cancel', this.returnToSelect.bind(this));
    this._commandWindow.deactivate();
    this._commandWindow.select(0);
    this.addWindow(this._commandWindow);
}

Scene_Beastiary.prototype.createSelectorWindow = function(){
    const x = 0;
    const y = 0;
    const w = Graphics.width / 3;
    const h = Graphics.height;
    const rect = new Rectangle(x, y, w, h);
    this._selector = new Window_BeastSelc(rect);
    this._selector.setHandler('ok', this.optionSelect.bind(this));
    this._selector.setHandler('cancel', this.popScene.bind(this));
    this._selector.activate();
    this._selector.select(0);
    this.addWindow(this._selector);
}

Scene_Beastiary.prototype.createDataWindow = function(){
    const x = Graphics.width / 3;
    const y = Graphics.height / 9;
    const w = Graphics.width - x;
    const h = Graphics.height - y;
    const rect = new Rectangle(x, y, w, h);
    this._dataWindow = new Window_BeastData(rect);
    this._dataWindow._selectorWindow = this._selector;
    this._dataWindow._commandWindow = this._commandWindow;
    this.addWindow(this._dataWindow);
}

Scene_Beastiary.prototype.optionSelect = function(){
    this._selector.deactivate();
    this._commandWindow.activate();
}

Scene_Beastiary.prototype.returnToSelect = function(){
    this._selector.activate();
    this._commandWindow.deactivate();
}

synrecWinMnCmdAddOriCmds = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    synrecWinMnCmdAddOriCmds.call(this);
    if(SynrecMC.Beastiary.enableMenu)this.addBeastiaryCommand();
}

Window_MenuCommand.prototype.addBeastiaryCommand = function(){
    if(!this._handlers)this._handlers = {};
    this.addCommand('Beastiary', 'beastiary');
    let scene = SceneManager._scene;
    this.setHandler("beastiary", scene.openBeastiary.bind(scene));
}

function Window_BeastData(){
    this.initialize(...arguments);
}

Window_BeastData.prototype = Object.create(Window_Base.prototype);
Window_BeastData.prototype.constructor = Window_BeastData;

Window_BeastData.prototype.initialize = function(rect){
    if(MONSTER_CAPTURE_MV){
        const x = rect.x;
        const y = rect.y;
        const w = rect.width;
        const h = rect.height;
        Window_Base.prototype.initialize.call(this,x,y,w,h);
    }else{
        Window_Base.prototype.initialize.call(this, rect);
    }
}

Window_BeastData.prototype.standardPadding = function(){
    return 12;
}

Window_BeastData.prototype.update = function(){
    Window_Base.prototype.update.call(this);
    this.updateMode();
    this.updateData();
}

Window_BeastData.prototype.updateMode = function(){
    const modeIdx = this._commandWindow.currentData();
    this._mode = modeIdx.symbol.toString();
}

Window_BeastData.prototype.updateData = function(){
    if(!this._selectorWindow)return;
    if(this._data != this._selectorWindow.item()){
        this._data = this._selectorWindow.item();
        this.refresh();
    }
}

Window_BeastData.prototype.drawData = function(){
    if(this._data){
        switch(this._mode){
            case 'page0':
                this.drawBasicData();
                break;
            case 'page1':
                this.drawParamData();
                break;
            case 'page2':
                this.drawExParamData();
                break;
            case 'page3':
                this.drawSpParamData();
                break;
            case 'page4':
                this.drawTraitData();
                break;
        }
    }
}

Window_BeastData.prototype.drawBasicData = function(){
    const faceName = this._data._faceName;
    const faceIndex = this._data._faceIndex;
    this.drawFace(faceName, faceIndex, 0, 0, 144, 144);
    const name = this._data._name;
    this.drawText(name, 0, 0, this.contentsWidth(), 'center')
    const classId = this._data._classId;
    const classification = $dataClasses[classId];
    this.drawText(classification.name, 0, this.lineHeight(), this.contentsWidth(), 'center');
    const profile = this._data._profile;
    const proHeight = 148;
    this.drawTextEx(profile, 0, proHeight, this.contentsWidth());
    const genders = this._data.actor().meta.genderArray;
    const yH = this.contentsHeight() - (this.lineHeight() + 12);
    if(genders){
        this.drawText(genders, 0, yH, this.contentsWidth())
    }else{
        this.drawText("Unspecified", 0, yH, this.contentsWidth())
    }
    const charName = this._data._characterName;
    const charIdx = this._data._characterIndex;
    this.drawCharacter(charName, charIdx, this.contentsWidth() - 96, 96);
    this.drawProfData();
}

Window_BeastData.prototype.drawProfData = function(){
    const actorId = this._data._actorId;
    for(i = 0; i < SynrecMC.Beastiary.ProfileData.length; i++){
        if(SynrecMC.Beastiary.ProfileData[i]['Actor ID'] == actorId){
            eval(eval(SynrecMC.Beastiary.ProfileData[i]['Actor Trait Script']));
            return;
        }
    }
}

Window_BeastData.prototype.drawParamData = function(){
    const iconSize = 32;
    const maxHp = this._data.param(0);
    const maxMp = this._data.param(1);
    const maxAtk = this._data.param(2);
    const maxDef = this._data.param(3);
    const maxMat = this._data.param(4);
    const maxMdf = this._data.param(5);
    const maxAgi = this._data.param(6);
    const maxLuk = this._data.param(7);

    const hpIcon = SynrecMC.hpIcon;
    const mpIcon = SynrecMC.mpIcon;
    const atkIcon = SynrecMC.atkIcon;
    const defIcon = SynrecMC.defIcon;
    const matIcon = SynrecMC.matIcon;
    const mdfIcon = SynrecMC.mdfIcon;
    const agiIcon = SynrecMC.agiIcon;
    const lukIcon = SynrecMC.lukIcon;

    const faceName = this._data._faceName;
    const faceIndex = this._data._faceIndex;
    this.drawFace(faceName, faceIndex, 0, 0, 144, 36);

    const name = this._data._name;
    this.drawText(name, 0, 0, this.contentsWidth(), 'center')

    this.makeFontBigger();
    const addH = this.lineHeight() + 24;
    let y = this.lineHeight()  + 4;
    this.drawIcon(hpIcon, 0, y);
    this.drawText(`${TextManager.param(0)}: ${maxHp}`, iconSize, y);
    y += addH;
    this.drawIcon(mpIcon, 0, y);
    this.drawText(`${TextManager.param(1)}: ${maxMp}`, iconSize, y);
    y += addH;
    this.drawIcon(atkIcon, 0, y);
    this.drawText(`${TextManager.param(2)}: ${maxAtk}`, iconSize, y);
    y += addH;
    this.drawIcon(defIcon, 0, y);
    this.drawText(`${TextManager.param(3)}: ${maxDef}`, iconSize, y);
    y += addH;
    this.drawIcon(matIcon, 0, y);
    this.drawText(`${TextManager.param(4)}: ${maxMat}`, iconSize, y);
    y += addH;
    this.drawIcon(mdfIcon, 0, y);
    this.drawText(`${TextManager.param(5)}: ${maxMdf}`, iconSize, y);
    y += addH;
    this.drawIcon(agiIcon, 0, y);
    this.drawText(`${TextManager.param(6)}: ${maxAgi}`, iconSize, y);
    y += addH;
    this.drawIcon(lukIcon, 0, y);
    this.drawText(`${TextManager.param(7)}: ${maxLuk}`, iconSize, y);
    this.makeFontSmaller();
}

Window_BeastData.prototype.drawExParamData = function(){
    const iconSize = 32;
    const hitRate = (this._data.xparam(0) * 100).toString();
    const evaRate = (this._data.xparam(1) * 100).toString();
    const crtRate = (this._data.xparam(2) * 100).toString();
    const crtEva = (this._data.xparam(3) * 100).toString();
    const magEva = (this._data.xparam(4) * 100).toString();
    const magRef = (this._data.xparam(5) * 100).toString();
    const cntAtk = (this._data.xparam(6) * 100).toString();
    const hpRegen = (this._data.xparam(7) * 100).toString();
    const mpRegen = (this._data.xparam(8) * 100).toString();
    const tpRegen = (this._data.xparam(9) * 100).toString();

    const hitRateIcon = SynrecMC.hitRateIcon;
    const evaRateIcon = SynrecMC.evaRateIcon;
    const crtRateIcon = SynrecMC.crtRateIcon;
    const crtEvaIcon = SynrecMC.crtEvaIcon;
    const magEvaIcon = SynrecMC.magEvaIcon;
    const magRefIcon = SynrecMC.magRefIcon;
    const cntAtkIcon = SynrecMC.cntAtkIcon;
    const hpRegenIcon = SynrecMC.hpRegIcon;
    const mpRegenIcon = SynrecMC.mpRegIcon;
    const tpRegenIcon = SynrecMC.tpRegIcon;

    const faceName = this._data._faceName;
    const faceIndex = this._data._faceIndex;
    this.drawFace(faceName, faceIndex, 0, 0, 144, 36);

    const name = this._data._name;
    this.drawText(name, 0, 0, this.contentsWidth(), 'center')

    let y = this.lineHeight()  + 4;
    this.drawIcon(hitRateIcon, 0, y);
    this.drawText(`Hit Rate: ${hitRate}%`, iconSize, y);
    y += this.lineHeight();
    this.drawIcon(evaRateIcon, 0, y);
    this.drawText(`Evasion Rate: ${evaRate}%`, iconSize, y);
    y += this.lineHeight();
    this.drawIcon(crtRateIcon, 0, y);
    this.drawText(`Critical Rate: ${crtRate}%`, iconSize, y);
    y += this.lineHeight();
    this.drawIcon(crtEvaIcon, 0, y);
    this.drawText(`Critical Evasion: ${crtEva}%`, iconSize, y);
    y += this.lineHeight();
    this.drawIcon(magEvaIcon, 0, y);
    this.drawText(`Magical Evasion: ${magEva}%`, iconSize, y);
    y += this.lineHeight();
    this.drawIcon(magRefIcon, 0, y);
    this.drawText(`Magical Reflection: ${magRef}%`, iconSize, y);
    y += this.lineHeight();
    this.drawIcon(cntAtkIcon, 0, y);
    this.drawText(`Counter Rate: ${cntAtk}&`, iconSize, y);
    y += this.lineHeight();
    this.drawIcon(hpRegenIcon, 0, y);
    this.drawText(`HP Regen: ${hpRegen}%`, iconSize, y);
    y += this.lineHeight();
    this.drawIcon(mpRegenIcon, 0, y);
    this.drawText(`MP Regen: ${mpRegen}%`, iconSize, y);
    y += this.lineHeight();
    this.drawIcon(tpRegenIcon, 0, y);
    this.drawText(`TP Regen: ${tpRegen}%`, iconSize, y);
}

Window_BeastData.prototype.drawSpParamData = function(){
    const iconSize = 32;
    const tgr = (this._data.sparam(0) * 100).toString();
    const grd = (this._data.sparam(1) * 100).toString();
    const rec = (this._data.sparam(2) * 100).toString();
    const pha = (this._data.sparam(3) * 100).toString();
    const mcr = (this._data.sparam(4) * 100).toString();
    const tcr = (this._data.sparam(5) * 100).toString();
    const pdr = (this._data.sparam(6) * 100).toString();
    const mdr = (this._data.sparam(7) * 100).toString();
    const fdr = (this._data.sparam(8) * 100).toString();
    const exr = (this._data.sparam(9) * 100).toString();

    const tgrIcon = SynrecMC.tgrIcon;
    const grdIcon = SynrecMC.grdIcon;
    const recIcon = SynrecMC.recIcon;
    const phaIcon = SynrecMC.phaIcon;
    const mcrIcon = SynrecMC.mcrIcon;
    const tcrIcon = SynrecMC.tcrIcon;
    const pdrIcon = SynrecMC.pdrIcon;
    const mdrIcon = SynrecMC.mdrIcon;
    const fdrIcon = SynrecMC.fdrIcon;
    const exrIcon = SynrecMC.exrIcon;

    const faceName = this._data._faceName;
    const faceIndex = this._data._faceIndex;
    this.drawFace(faceName, faceIndex, 0, 0, 144, 36);

    const name = this._data._name;
    this.drawText(name, 0, 0, this.contentsWidth(), 'center')

    let y = this.lineHeight()  + 4;
    this.drawIcon(tgrIcon, 0, y);
    this.drawText(`Target Rate: ${tgr}%`, iconSize, y);
    y += this.lineHeight();
    this.drawIcon(grdIcon, 0, y);
    this.drawText(`Guard Rate: ${grd}%`, iconSize, y);
    y += this.lineHeight();
    this.drawIcon(recIcon, 0, y);
    this.drawText(`Recovery Rate: ${rec}%`, iconSize, y);
    y += this.lineHeight();
    this.drawIcon(phaIcon, 0, y);
    this.drawText(`Pharmacology: ${pha}%`, iconSize, y);
    y += this.lineHeight();
    this.drawIcon(mcrIcon, 0, y);
    this.drawText(`${TextManager.mp} Cost Rate: ${mcr}%`, iconSize, y);
    y += this.lineHeight();
    this.drawIcon(tcrIcon, 0, y);
    this.drawText(`${TextManager.tp} Cost Rate: ${tcr}%`, iconSize, y);
    y += this.lineHeight();
    this.drawIcon(pdrIcon, 0, y);
    this.drawText(`Physical Damage: ${pdr}&`, iconSize, y);
    y += this.lineHeight();
    this.drawIcon(mdrIcon, 0, y);
    this.drawText(`Magic Damage Rate: ${mdr}%`, iconSize, y);
    y += this.lineHeight();
    this.drawIcon(fdrIcon, 0, y);
    this.drawText(`Floor Damage Rate: ${fdr}%`, iconSize, y);
    y += this.lineHeight();
    this.drawIcon(exrIcon, 0, y);
    this.drawText(`Experience Rate: ${exr}%`, iconSize, y);
}

Window_BeastData.prototype.drawTraitData = function(){
    const faceName = this._data._faceName;
    const faceIndex = this._data._faceIndex;
    this.drawFace(faceName, faceIndex, 0, 0, 144, 36);

    const name = this._data._name;
    this.drawText(name, 0, 0, this.contentsWidth(), 'center')
    const actorId = this._data._actorId;
    for(i = 0; i < SynrecMC.Beastiary.TraitData.length; i++){
        if(SynrecMC.Beastiary.TraitData[i]['Actor ID'] == actorId){
            eval(eval(SynrecMC.Beastiary.TraitData[i]['Actor Trait Script']));
            return;
        }
    }
}

Window_BeastData.prototype.refresh = function(){
    if(this.contents){
        this.contents.clear();
        this.drawData();
    }
}

function Window_BeastSelc(){
    this.initialize(...arguments);
}

Window_BeastSelc.prototype = Object.create(Window_Selectable.prototype);
Window_BeastSelc.prototype.constructor = Window_BeastSelc;

Window_BeastSelc.prototype.initialize = function(rect){
    if(MONSTER_CAPTURE_MV){
        const x = rect.x;
        const y = rect.y;
        const w = rect.width;
        const h = rect.height;
        Window_Selectable.prototype.initialize.call(this,x,y,w,h);
    }else{
        Window_Selectable.prototype.initialize.call(this, rect);
    }
}

Window_BeastSelc.prototype.standardPadding = function(){
    return 12;
}

Window_BeastSelc.prototype.update = function(){
    Window_Selectable.prototype.update.call(this);
    this.updateData();
}

Window_BeastSelc.prototype.maxItems = function() {
    if(!$gameParty._capturedIds)$gameParty._capturedIds = [];
    this._mode = SynrecMC.Beastiary.ListMode;
    switch(this._mode){
        case 0:
            return $gameParty._capturedIds.length;
        case 1:
            return $dataActors.length - 1;
        case 2:
            return $dataActors.length - 1;
    }
}

Window_BeastSelc.prototype.updateData = function(){
    switch(this._mode){
        case 0:
            if(this._dataIndices == $gameParty._capturedIds)return;
            this._dataIndices = $gameParty._capturedIds;
            this._data = [];
            for(i = 0; i < this._dataIndices.length; i++){
                let dataId = this._dataIndices[i];
                let data = $dataActors[dataId];
                this._data.push(data);
            }
            this.refresh();
            break;
        default:
            if(this._dataIndices == $gameParty._capturedIds)return;
            this._dataIndices = $gameParty._capturedIds;
            this._data = [];
            for(ir = 0; ir < $dataActors.length; ir++){
                let idx = ir + 1;
                if(this._mode == 1){
                    if(!this.filteredName(idx)){
                        let data = $dataActors[idx];
                        if(data)this._data.push(data);
                    }
                }else if(this._mode == 2){
                    if(!this.filteredName(idx)){
                        if(this._dataIndices.includes(idx)){
                            let data = $dataActors[idx];
                            this._data.push(data);
                        }else this._data.push(undefined);
                    }
                }
            }
            this.refresh();
            break;
    }
    
}

Window_BeastSelc.prototype.filteredName = function(dataIdx){
    console.log(SynrecMC.Beastiary.ListFilterName)
    if($dataActors[dataIdx]){
        if($dataActors[dataIdx].name == SynrecMC.Beastiary.ListFilterName)return true;
    }
    return false;
}

Window_BeastSelc.prototype.drawItem = function(index){
    const item = this._data[index];
    const rect = this.itemRect(index);
    if(item){
        const name = item.name
        this.drawText(name, rect.x, rect.y, rect.width, 'center');
    }else{
        this.drawText("----------", rect.x, rect.y, rect.width, 'center');
    }
}

Window_BeastSelc.prototype.item = function(){
    const index = this.index();
    if(!this._data)return undefined;
    if(!this._data[index])return undefined;
    const dataId = this._data[index].id;
    if(isNaN(dataId) || dataId <= 0)return undefined;
    const data = new Game_Actor(dataId);
    return data;
}

function Window_BeastiaryCommand(){
    this.initialize(...arguments);
}

Window_BeastiaryCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_BeastiaryCommand.prototype.constructor = Window_BeastiaryCommand;

Window_BeastiaryCommand.prototype.initialize = function(rect){
    if(MONSTER_CAPTURE_MV){
        const x = rect.x;
        const y = rect.y;
        const w = rect.width;
        const h = rect.height;
        this._width = w;
        this._height = h;
        Window_HorzCommand.prototype.initialize.call(this,x,y);
    }else{
        Window_HorzCommand.prototype.initialize.call(this, rect);
    }
}

Window_BeastiaryCommand.prototype.standardPadding = function(){
    return 12;
}

Window_BeastiaryCommand.prototype.windowWidth = function(){
    return this._width;
}

Window_BeastiaryCommand.prototype.windowHeight = function(){
    return this._height;
}

Window_BeastiaryCommand.prototype.maxCols = function() {
    return this._list ? this._list.length : 5;
}

Window_BeastiaryCommand.prototype.makeCommandList = function() {
    Window_HorzCommand.prototype.makeCommandList.call(this);
    if(SynrecMC.Beastiary.PageZeroEnable)this.addCommand(`${SynrecMC.Beastiary.PageZeroName}`, 'page0');
    if(SynrecMC.Beastiary.PageOneEnable)this.addCommand(`${SynrecMC.Beastiary.PageOneName}`, 'page1');
    if(SynrecMC.Beastiary.PageTwoEnable)this.addCommand(`${SynrecMC.Beastiary.PageTwoName}`, 'page2');
    if(SynrecMC.Beastiary.PageThreeEnable)this.addCommand(`${SynrecMC.Beastiary.PageThreeName}`, 'page3');
    if(SynrecMC.Beastiary.PageFourEnable)this.addCommand(`${SynrecMC.Beastiary.PageFourName}`, 'page4');
}

synrecBeastGmPartyAddActor = Game_Party.prototype.addActor;
Game_Party.prototype.addActor = function(actorId, level, hp, mp, gender) {
    synrecBeastGmPartyAddActor.call(this, actorId, level, hp, mp, gender);
    if(!this._capturedIds)this._capturedIds = [];
    if(!isObject(actorId) && !this._capturedIds.includes(actorId)){
        this._capturedIds.push(actorId);
        this._capturedIds.sort();
    }
}

Game_Party.prototype.checkCaptured = function(){
    if(!this._capturedIds)this._capturedIds = [];
    for(i = 0; i < $gameParty._actors.length; i++){
        let actorId = eval($gameParty._actors[i]._actorId);
        if(!this._capturedIds.includes(actorId)){
            this._capturedIds.push(actorId);
        }
    }
    for(j = 0; j < $gameParty._reserveBoxes.length; j++){
        let box = $gameParty._reserveBoxes[j]['box'];
        for(k = 0; k < box.length; k++){
            let boxData = box[k];
            if(boxData){
                let actorId = eval(boxData._actorId);
                if(!this._capturedIds.includes(actorId)){
                    this._capturedIds.push(actorId);
                }
            }
        }
    }
    for(z = 0; z < this._capturedIds.length; z++){
        if(typeof(this._capturedIds[z]) != "number"){
            this._capturedIds.splice(z, 1);
            z--;
        }
    }
    this._capturedIds.sort();
}