/*:@author Synrec 
 * @target MZ
 *
 * @plugindesc v1.7 Creates a simple scene which allows actor evolution
 * 
 * @help
 * This plugin follows the permissions outlined in Synrec_MC_Core.js
 * 
 * Call evolution scene with script call:
 * SceneManager.push(Scene_Evolution)
 * 
 * This plugin acts as the core for evolution for monster capture.
 * 
 * Set evolution level with actor notetag <evolveLevel:x> where x is an integer.
 * 
 * Set evolution items with actor notetag <evolveItems:[x,y,z]>
 * where x, y and z are database item IDs
 * 
 * Set evolution switch with actor notetag <evolveSwitch:x>
 * where x is the switch ID
 * 
 * Set evolution weapon requirement with actor notetag <evolveWeapon:x>
 * where x is the weapon ID
 * 
 * Set evolution armor requirement with actor notetag <evolveArmor:x>
 * where x is the armor ID
 * 
 * @param Gameplay
 * 
 * @param Evolve Healing
 * @desc Recover All On Evolve.
 * @type boolean
 * @default false
 * @parent Gameplay
 * 
 * @param Evolve Level Reset
 * @desc Reset level on evolution
 * @type boolean
 * @default false
 * @parent Gameplay
 * 
 * @param Evolve Post Battle
 * @desc Trigger automatic evolution after battle.
 * @type boolean
 * @default true
 * @parent Gameplay
 * 
 * @param Reset Evolve Switch
 * @desc Will set evolve switch to false after successful evolution.
 * @type boolean
 * @default false
 * @parent Gameplay
 * 
 * @param Graphics
 * 
 * @param Evolve Animation
 * @desc Animation used for evolution. If none used, will not animate.
 * @type animation
 * @default 0
 * @parent Graphics
 * 
 * @param Evolve Animation Cancel
 * @desc Animation used for cancel evolution. If none used, will not animate.
 * @type animation
 * @default 0
 * @parent Graphics
 * 
 * @param Evolve Scene Background
 * @desc Background used for evolution scene
 * @type file
 * @dir img/backgrounds
 * @parent Graphics
 * 
 * @param Can Evolve
 * @desc Text that shows when you can evolve actor.
 * @type text
 * @default Requirements Met
 * 
 * @param Can Not Evolve
 * @desc Text that shows when you can't evolve actor.
 * @type text
 * @default Requirements Not Met
 * 
 * @param Will Evolve To
 * @desc Evolution target text.
 * @type text
 * @default Will Evolve To
 * 
 * @param Required Items Text
 * @desc Text for required items
 * @type text
 * @default Items Required
 * 
 * @param Hide if No Item
 * @desc Hide item text if no required items
 * @type boolean
 * @default false
 */


if(!SynrecMC)throw new Error("Core Plugin Missing.");
if(!isObject(SynrecMC))throw new Error("Bad Core Files.");
SynrecMC.EvolutionCore = {};
SynrecMC.EvolutionCore.Version = "1.7";

SynrecMC.EvolutionCore.Plugins = PluginManager.parameters('Synrec_MC_Evolution');
SynrecMC.EvolutionCore.EvolveHeal = eval(SynrecMC.EvolutionCore.Plugins['Evolve Healing']);
SynrecMC.EvolutionCore.EvolveReset = eval(SynrecMC.EvolutionCore.Plugins['Evolve Level Reset']);
SynrecMC.EvolutionCore.AutoEvolve = eval(SynrecMC.EvolutionCore.Plugins['Evolve Post Battle']);
SynrecMC.EvolutionCore.EvolveAnim = eval(SynrecMC.EvolutionCore.Plugins['Evolve Animation']);
SynrecMC.EvolutionCore.EvolveAnimCancel = eval(SynrecMC.EvolutionCore.Plugins['Evolve Animation Cancel']);

SynrecMC.EvolutionCore.EvolSwtchReset = eval(SynrecMC.EvolutionCore.Plugins['Reset Evolve Switch']);

SynrecMC.EvolutionCore.EvolveBackground = SynrecMC.EvolutionCore.Plugins['Evolve Scene Background'];
SynrecMC.EvolutionCore.evolveYes = SynrecMC.EvolutionCore.Plugins['Can Evolve'];
SynrecMC.EvolutionCore.evolveNo = SynrecMC.EvolutionCore.Plugins['Can Not Evolve'];
SynrecMC.EvolutionCore.evolveTarget = SynrecMC.EvolutionCore.Plugins['Will Evolve To'];
SynrecMC.EvolutionCore.itemReqTxt = SynrecMC.EvolutionCore.Plugins['Required Items Text'];
SynrecMC.EvolutionCore.itemReqHide = eval(SynrecMC.EvolutionCore.Plugins['Hide if No Item']);

function Spriteset_Evolution(){
    this.initialize(...arguments);
}

Spriteset_Evolution.prototype = Object.create(Spriteset_Base.prototype);
Spriteset_Evolution.prototype.constructor = Spriteset_Evolution;

Spriteset_Evolution.prototype.createLowerLayer = function() {
    Spriteset_Base.prototype.createLowerLayer.call(this);
    this.createEvolveField();
}

Spriteset_Evolution.prototype.createEvolveField = function() {
    const width = Graphics.boxWidth;
    const height = Graphics.boxHeight;
    const x = (Graphics.width - width) / 2;
    const y = (Graphics.height - height) / 2;
    this.createBackground();
    this._evolveField = new Sprite();
    this._evolveField.setFrame(0, 0, width, height);
    this._baseSprite.addChild(this._evolveField);
    this._effectsContainer = this._evolveField;
};

Spriteset_Evolution.prototype.createBackground = function(){
    const bitmapName = SynrecMC.EvolutionCore.EvolveBackground;
    this._background = new Sprite();
    console.log(bitmapName);
    if(bitmapName){
        this._background.bitmap = ImageManager.loadBackground(bitmapName);
    }else{
        this._backgroundFilter = new PIXI.filters.BlurFilter();
        this._background.filters = [this._backgroundFilter];
        this._background.opacity = 192;
    }
    this._baseSprite.addChild(this._background);
}

Spriteset_Evolution.prototype.findTargetSprite = function() {
    return this._evolveSprite;
}

Spriteset_Evolution.prototype.updateAnimations = function() {
    for (const sprite of this._animationSprites) {
        if (!sprite.isPlaying()) {
            this.removeAnimation(sprite);
        }
    }
    this.processAnimationRequests();
}

function Game_Evolver(){
    this.initialize(...arguments);
}

Game_Evolver.prototype = Object.create(Game_Character.prototype);
Game_Evolver.prototype.constructor = Game_Evolver;

Game_Evolver.prototype.initialize = function(actorIdx){
    Game_Character.prototype.initialize.call(this);
    this.setupInit(actorIdx);
    this.setStepAnime(true);
    this._moveFrequency = 5;
}

Game_Evolver.prototype.setupInit = function(actorIdx){
    this._index = actorIdx;
    this.refreshChar();
    this.setDirection(2);
}

Game_Evolver.prototype.refreshChar = function(){
    this._actor = $gameParty._actors[this._index];
    const charName = this._actor._characterName;
    const charIndx = this._actor._characterIndex;
    if(charName && !isNaN(charIndx)){
        this.setImage(charName, charIndx);
    }
}

Game_Evolver.prototype.screenX = function(){
    return this._screenX;
}

Game_Evolver.prototype.screenY = function(){
    return this._screenY;
}

Game_Actor.prototype.meetEvolutionRequirement = function(){
    const evolveLevel = eval(this.actor().meta.evolveLevel);
    const evolveItems = eval(this.actor().meta.evolveItems);
    const evolveWeapon = eval(this.actor().meta.evolveWeapon);
    const evolveArmor = eval(this.actor().meta.evolveArmor);
    const evolveSwitchId = eval(this.actor().meta.evolveSwitch);
    if(evolveSwitchId){
        if(!$gameSwitches.value(evolveSwitchId))return false
    }
    if(!evolveLevel)return false;
    if(this._level < evolveLevel)return false;
    if(!this.hasEvolveItems(evolveItems))return false;
    if(!isNaN(evolveArmor) && evolveArmor > 0){
        if(!this.hasArmor(evolveArmor))return false;
    }
    if(!isNaN(evolveWeapon) && evolveWeapon > 0){
        if(!this.hasWeapon(evolveWeapon))return false;
    }
    return true;
}

Game_Actor.prototype.hasEvolveItems = function(arr){
    if(!arr)return true;
    for(itm = 0; itm < arr.length; itm++){
        let itemId = arr[itm];
        let itemData = $dataItems[itemId];
        if(!$gameParty.hasItem(itemData))return false;
    }
    return true;
}

Game_Actor.prototype.evolve = function(){
    const targetActor = eval(this.actor().meta.evolveTarget);
    const evolveSwitchId = eval(this.actor().meta.evolveSwitch);
    if(!targetActor)return false;
    const actor = $dataActors[targetActor];
    this._actorId = targetActor;
    this._name = actor.name;
    this._nickname = actor.nickname;
    this._profile = actor.profile;
    this._classId = actor.classId;
    if(SynrecMC.EvolutionCore.EvolveReset){
        this._level = actor.initialLevel;
        this.initExp();
    }
    if(SynrecMC.EvolutionCore.EvolveHeal)this.recoverAll();
    this.initImages();
    if(evolveSwitchId && SynrecMC.EvolutionCore.EvolSwtchReset){
        $gameSwitches.setValue(evolveSwitchId, false);
    }
    this.refresh();
    $gameParty.refresh();
}

function Scene_Evolution(){
    this.initialize(...arguments);
}

Scene_Evolution.prototype = Object.create(Scene_Base.prototype);
Scene_Evolution.prototype.constructor = Scene_Evolution;

Scene_Evolution.prototype.update = function(){
    Scene_Base.prototype.update.call(this);
    this.updateButtonPush();
}

Scene_Evolution.prototype.updateButtonPush = function(){
    if(this._exButton && this._exButton.isPressed()){
        SoundManager.playBuzzer();
        this.popScene();
    }
}

Scene_Evolution.prototype.create = function(){
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createWindowLayer();
    this.createWindows();
    this.createButtons();
}

Scene_Evolution.prototype.createBackground = function(){
    const bitmapName = SynrecMC.EvolutionCore.EvolveBackground;
    this._background = new Sprite();
    if(bitmapName){
        this._background.bitmap = ImageManager.loadBackground(bitmapName);
    }else{
        this._backgroundFilter = new PIXI.filters.BlurFilter();
        this._background.filters = [this._backgroundFilter];
        this._background.opacity = 192;
    }
    this.addChild(this._background);
}

Scene_Evolution.prototype.createWindows = function(){
    this.createSceneTitle()
    this.createActorDataWindow();
    this.createRequirementsWindow();
    this.createTeamWindow();
}

Scene_Evolution.prototype.createSceneTitle = function(){
    const x = 0;
    const y = 0;
    const width = Graphics.width;
    const height = Graphics.height / 10;
    const rect = {x:x, y:y, width:width, height:height};
}

Scene_Evolution.prototype.createTeamWindow = function(){
    const w = Graphics.width;
    const h = Graphics.height / 3;
    const x = 0;
    const y = Graphics.height / 10;
    const rect = new Rectangle(x, y, w, h);
    this._teamWindow = new Window_TeamBoxEvolve(rect);
    this._teamWindow._evolveWindow = this._evolveWindow;
    this._teamWindow._dataWindow = this._actorDataWindow;
    this._teamWindow.activate();
    this._teamWindow.select(0);
    this._teamWindow.setHandler('ok', this.evolve.bind(this));
    this._teamWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._teamWindow);
}

Scene_Evolution.prototype.createActorDataWindow = function(){
    const y = Graphics.height / 10 + Graphics.height / 3;
    const w = (Graphics.width / 3) * 2;
    const h = Graphics.height - y;
    const x = Graphics.width - w;
    const rect = new Rectangle(x, y, w, h);
    this._actorDataWindow = new Window_ActorData(rect);
    this.addWindow(this._actorDataWindow);
}

Scene_Evolution.prototype.createRequirementsWindow = function(){
    const y = Graphics.height / 10 + Graphics.height / 3;
    const w = Graphics.width / 3;
    const h = Graphics.height - y;
    const x = 0;
    const rect = new Rectangle(x, y, w, h);
    this._evolveWindow = new Window_EvolveData(rect);
    this.addWindow(this._evolveWindow);
}

Scene_Evolution.prototype.createButtons = function(){
    if(ConfigManager.touchUI)this.createExBox();
}

Scene_Evolution.prototype.createExBox = function(){
    this._exButton = new Sprite_Button('cancel');
    this._exButton.x = 8;
    this._exButton.y = 8;
    this.addWindow(this._exButton);
}

Scene_Evolution.prototype.evolve = function(){
    const index = this._teamWindow.index();
    const actor = $gameParty._actors[index];
    if(!actor){
        SoundManager.playBuzzer();
        return;
    }
    if(actor.meetEvolutionRequirement()){
        $gameTemp._evolveActorIdx = index;
        SceneManager.push(Scene_AutoEvolve);
        return;
    }else{
        SoundManager.playBuzzer();
    }
    this._teamWindow.activate();
    this._teamWindow.refresh();
}

function Scene_AutoEvolve(){
    this.initialize(...arguments);
}

Scene_AutoEvolve.prototype = Object.create(Scene_Base.prototype);
Scene_AutoEvolve.prototype.constructor = Scene_AutoEvolve;

Scene_AutoEvolve.prototype.create = function(){
    //this.createBackground();
    this.createSprite();
    this.createWindowLayer();
    this.createInfoWindow();
    this.createConfirmWindow();
}

Scene_AutoEvolve.prototype.createBackground = function(){
    const bitmapName = SynrecMC.EvolutionCore.EvolveBackground;
    this._background = new Sprite();
    console.log(bitmapName);
    if(bitmapName){
        this._background.bitmap = ImageManager.loadBackground(bitmapName);
    }else{
        this._backgroundFilter = new PIXI.filters.BlurFilter();
        this._background.filters = [this._backgroundFilter];
        this._background.opacity = 192;
    }
    this.addChild(this._background);
}

Scene_AutoEvolve.prototype.createSprite = function(){
    this._evolveSpriteset = new Spriteset_Evolution();
    this.addChild(this._evolveSpriteset);
    this._evolutionChar = new Game_Evolver($gameTemp._evolveActorIdx);
    this._evolutionChar._screenX = (Graphics.width / 2);
    this._evolutionChar._screenY = (Graphics.height / 2);
    this._evolutionChar.setStepAnime(true);
    this._evolutionSprite = new Sprite_Character(this._evolutionChar);
    this._evolveSpriteset._evolveField.addChild(this._evolutionSprite);
    this._evolveSpriteset._evolveSprite = this._evolutionSprite;
}

Scene_AutoEvolve.prototype.createInfoWindow = function(){
    const x = 0;
    const y = Graphics.height / 2;
    const w = Graphics.width;
    const h = 72;
    const rect = new Rectangle(x, y, w, h);
    this._noticeWindow = new Window_AutoEvolveInfo(rect);
    this._noticeWindow._aIndx = $gameTemp._evolveActorIdx;
    this._noticeWindow.setHandler('ok', this.startEvolution.bind(this));
    this._noticeWindow.select(0);
    this._noticeWindow.activate();
    this._noticeWindow.refresh();
    this.addWindow(this._noticeWindow);
}

Scene_AutoEvolve.prototype.createConfirmWindow = function(){
    const x = 0;
    const y = Graphics.height / 2;
    const w = Graphics.width;
    const h = 72;
    const rect = new Rectangle(x, y, w, h);
    this._confirmWindow = new Window_AutoEvolveConfirm(rect);
    this._confirmWindow._aIndx = $gameTemp._evolveActorIdx;
    this._confirmWindow.setHandler('ok', this.startExit.bind(this));
    this._confirmWindow.select(0);
    this._confirmWindow.hide();
    this.addWindow(this._confirmWindow);
}

Scene_AutoEvolve.prototype.startEvolution = function(){
    if(this._evolutionChar._actor.meetEvolutionRequirement()){
        const evolveAnim = SynrecMC.EvolutionCore.EvolveAnim;
        if(evolveAnim > 0 && !isNaN(evolveAnim)){
            $gameTemp.requestAnimation([this._evolutionChar], evolveAnim);
        }
        this._isEvolving = true;
    }else{
        const evolveAnim = SynrecMC.EvolutionCore.EvolveAnimCancel;
        if(evolveAnim > 0 && !isNaN(evolveAnim)){
            $gameTemp.requestAnimation([this._evolutionChar], evolveAnim);
        }
        this._cancelledEvolve = true;
    }
    this._startedEvolution = true;
    this._noticeWindow.hide();
    this._noticeWindow.deactivate();
}

Scene_AutoEvolve.prototype.update = function(){
    Scene_Base.prototype.update.call(this);
    if(this._evolveSpriteset)this._evolveSpriteset.update();
    if(this._evolutionChar)this._evolutionChar.update();
    this.updateCancelEvolve();
}

Scene_AutoEvolve.prototype.updateCancelEvolve = function(){
    if(this._startedEvolution){
        if(Input.isTriggered('cancel') && this._isEvolving){
            this.cancelEvolution();
        }else{
            this.processEvolution();
        }
    }
}

Scene_AutoEvolve.prototype.cancelEvolution = function(){
    this._isEvolving = false;
    this._cancelledEvolve = true;
}

Scene_AutoEvolve.prototype.processEvolution = function(){
    if(!this._evolutionChar.isAnimationPlaying()){
        let confirmWindow = this._confirmWindow;
        if(this._isEvolving){
            this._evolutionChar._actor.evolve();
            confirmWindow._evolveStatus = "success";
        }else if(this._cancelledEvolve){
            const animCancel = SynrecMC.EvolutionCore.EvolveAnimCancel;
            if(!isNaN(animCancel) && animCancel > 0){
                $gameTemp.requestAnimation([this._evolutionChar], animCancel);
            }
            confirmWindow._evolveStatus = "failed";
        }
        this._evolutionChar.refreshChar();
        this.callConfirm();
    }
}

Scene_AutoEvolve.prototype.callConfirm = function(){
    this._confirmWindow.refresh();
    this._confirmWindow.show();
    this._confirmWindow.activate();
}

Scene_AutoEvolve.prototype.startExit = function(){
    this._confirmWindow.close();
    this._confirmWindow.deactivate();
    SceneManager.pop();
}

SynrecMCEScnMapStart = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    SynrecMCEScnMapStart.call(this);
    if(SceneManager._calledEvolution)return;
    if(!SynrecMC.EvolutionCore.AutoEvolve)return;
    SceneManager._calledEvolution = true;
    this.checkForEvolution();
}

SynrecMCEScnMapUpdtEnc = Scene_Map.prototype.updateEncounter;
Scene_Map.prototype.updateEncounter = function() {
    SceneManager._calledEvolution = false;
    SynrecMCEScnMapUpdtEnc.call(this);
}

Scene_Map.prototype.checkForEvolution = function(){
    for(chk = 0; chk < $gameParty._actors.length; chk++){
        var actor = $gameParty._actors[chk];
        if(actor){
            var canEvolve = actor.meetEvolutionRequirement();
            if(canEvolve){
                $gameTemp._evolveActorIdx = chk;
                SceneManager.push(Scene_AutoEvolve);
                return;
            }
        }
    }
}

function Window_AutoEvolveInfo(){
    this.initialize(...arguments);
}

Window_AutoEvolveInfo.prototype = Object.create(Window_Selectable.prototype);
Window_AutoEvolveInfo.prototype.constructor = Window_AutoEvolveInfo;

Window_AutoEvolveInfo.prototype.maxItems = function() {
    return 1;
}

Window_AutoEvolveInfo.prototype.drawItem = function(){
    const rect = this.itemRect(0);
    const actor = $gameParty._actors[this._aIndx];
    if(actor){
        const name = actor._name;
        this.drawText(`${name} is evolving!`, rect.x, rect.y, rect.width, 'center');
    }
}

function Window_AutoEvolveConfirm(){
    this.initialize(...arguments);
}

Window_AutoEvolveConfirm.prototype = Object.create(Window_Selectable.prototype);
Window_AutoEvolveConfirm.prototype.constructor = Window_AutoEvolveConfirm;

Window_AutoEvolveConfirm.prototype.maxItems = function() {
    return 1;
}

Window_AutoEvolveConfirm.prototype.update = function(){
    Window_Selectable.prototype.update.call(this);
    this.refresh();
}

Window_AutoEvolveConfirm.prototype.drawItem = function(){
    const rect = this.itemRect(0);
    const actor = $gameParty._actors[this._aIndx];
    const condition = this._evolveStatus;
    if(actor){
        if(condition == "success"){
            const name = actor._name;
            this.drawText(`${name} has evolved!`, rect.x, rect.y, rect.width, 'center');
        }else if(condition == "failed"){
            const name = actor._name;
            this.drawText(`${name} failed to evolve!`, rect.x, rect.y, rect.width, 'center');
        }
    }
}

function Window_TeamBoxEvolve(){
    this.initialize(...arguments);
}

Window_TeamBoxEvolve.prototype = Object.create(Window_TeamBox.prototype);
Window_TeamBoxEvolve.prototype.constructor = Window_TeamBoxEvolve;

Window_TeamBoxEvolve.prototype.cursorPagedown = function() {}

Window_TeamBoxEvolve.prototype.cursorPageup = function() {}

synrecWinTmBoxUpdate = Window_TeamBox.prototype.update;
Window_TeamBoxEvolve.prototype.update = function(){
    synrecWinTmBoxUpdate.call(this);
    this.updateEvolveWindow();
}

Window_TeamBoxEvolve.prototype.updateEvolveWindow = function(){
    const index = this.index();
    this._evolveWindow._data = $gameParty._actors[index];
}

function Window_EvolveData (){
    this.initialize(...arguments);
}

Window_EvolveData.prototype = Object.create(Window_Base.prototype);
Window_EvolveData.prototype.constructor = Window_EvolveData;

Window_EvolveData.prototype.update = function(){
    Window_Base.prototype.update.call(this);
    this.updateEvolveData();
}

Window_EvolveData.prototype.updateEvolveData = function(){
    this.refresh();
}

Window_EvolveData.prototype.drawData = function(){
    const halfHeight = this.contentsHeight() / 2 - this.lineHeight() /2;
    if(this._data){
        const currentData = eval(this._data.actor());
        const targetId = eval(currentData.meta.evolveTarget);
        const targetData = $dataActors[targetId];
        const currentLevel = this._data._level;
        const requiredLevel = eval(currentData.meta.evolveLevel);
        const requiredItemIds = eval(currentData.meta.evolveItems);
        const requiredItems = this.getItemArr(requiredItemIds);
        this.drawText(`Current ${TextManager.level} is ${currentLevel}`, 0, 0, this.contentsWidth(), 'center');
        if((requiredItems.length <= 0 && !SynrecMC.EvolutionCore.itemReqHide) ||
            (requiredItems.length > 0 && SynrecMC.EvolutionCore.itemReqHide) ||
            (requiredItems.length > 0 && !SynrecMC.EvolutionCore.itemReqHide))this.drawText(`${SynrecMC.EvolutionCore.itemReqTxt}: ${JSON.stringify(requiredItems)}`, 0, this.lineHeight(), this.contentsWidth())
        this.drawText(`Target ${TextManager.level} is ${requiredLevel}`, 0, this.contentsHeight() - this.lineHeight(), this.contentsWidth(), 'center');
        if(currentLevel >= requiredLevel && this.hasEvolveItems(requiredItemIds)){
            const targetName = targetData.name;
            this.changeTextColor(ColorManager.customColor('#aaaaff'));
            this.drawText(`${SynrecMC.EvolutionCore.evolveYes}`, 0, halfHeight, this.contentsWidth(), 'center');
            this.drawText(`${SynrecMC.EvolutionCore.evolveTarget} ${targetName}`, 0, halfHeight + this.lineHeight(), this.contentsWidth(), 'center');
        }else{
            this.changeTextColor(ColorManager.customColor('#ffaaaa'));
            this.drawText(`${SynrecMC.EvolutionCore.evolveNo}`, 0, halfHeight, this.contentsWidth(), 'center');
        }
    }else{
        this.drawText("No Information", 0, halfHeight, this.contentsWidth(), 'center');
    }
    this.resetTextColor();
}

Window_EvolveData.prototype.hasEvolveItems = function(arr){
    if(!arr)return true;
    for(itm = 0; itm < arr.length; itm++){
        let itemId = arr[itm];
        let itemData = $dataItems[itemId];
        if(!$gameParty.hasItem(itemData))return false;
    }
    return true;
}

Window_EvolveData.prototype.getItemArr = function(arr){
    let newArr = [];
    if(isArray(arr)){
        for(tm = 0; tm < arr.length; tm++){
            let itemIdx = arr[tm];
            if($dataItems[itemIdx]){
                newArr.push($dataItems[itemIdx].name);
            }
        }
    }
    return newArr;
}

Window_EvolveData.prototype.refresh = function(){
    if(this.contents){
        this.contents.clear();
        this.drawData();
    }
}