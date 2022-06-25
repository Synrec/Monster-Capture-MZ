/*:
 * @author Synrec/kylestclr
 * @target MZ
 * @plugindesc v1.0 Breeding System for Monster Capture Plugins
 * 
 * @help
 * 
 * ...
 * 
 * 
 * @param Combination Array
 * @desc Create valid combinations here
 * @type struct<ActorCombine>[]
 * @default []
 * 
 * @param Show Breed Menu Command
 * @desc Enable menu Command?
 * @type boolean
 * @default true
 * 
 * @param Breed Command Name
 * @desc Command Name
 * @type text
 * @default Eggs
 * 
 * @param Breeder Scene Setup
 * @desc Setup breeding scene
 * 
 * @param Scene Background
 * @parent Breeder Scene Setup
 * @desc Choose a background image
 * @type file
 * @dir img/pictures/
 * 
 * @param Breed Character Image
 * @parent Breeder Scene Setup
 * @desc Choose a character image
 * @type file
 * @dir img/characters/
 * 
 * @param Breed Character Index
 * @parent Breeder Scene Setup
 * @desc Choose a character index
 * @type number
 * @default 0
 * 
 * @param Breed Character Anim Hatch
 * @parent Breeder Scene Setup
 * @desc Choose an animation
 * @type animation
 * @default 1
 * 
 * @param Item Name
 * @desc Name of the pre-released actor
 * @type text
 * @default Core
 * 
 * @param Max Steps for Pre-Breed Generate
 * @desc Number of steps required
 * @type number
 * @default 10
 * 
 * @param Parent Step EXP
 * @desc Every step gives parent 1 EXP.
 * @type boolean
 * @default true
 * 
 */
/*~struct~ActorCombine:
 * @param Result Actor
 * @desc Actor gained from combination
 * @type actor
 * @default 1
 * 
 * @param Required Actors
 * @desc Actors required to process the combination. Only first two used.
 * @type struct<ActorGender>[]
 * @default []
 * 
 * @param Required Steps
 * @desc Number of steps to get actor from pre-breed
 * @type number
 * @default 10
 * 
 * @param Random Steps
 * @desc Random number between 0 and this removed from required.
 * @type number
 * @default 5
 * 
 * @param Delete Parents
 * @desc Delete parents
 * @type boolean
 * @default false
 */
/*~struct~ActorGender:
 * @param Actor
 * @desc Select the actor
 * @type actor
 * @default 1
 *
 * @param Gender
 * @desc Type name of gender
 * @type text
 * @default None
 */

if(!SynrecMC)throw new Error("Core Plugin Missing.");
if(!isObject(SynrecMC))throw new Error("Bad Core Files.");
SynrecMC.Breeder = PluginManager.parameters('Synrec_MC_Breeder');
SynrecMC.Breeder.CombinationArray = [];

try{
    SynrecMC.Breeder.CombinationArray = JSON.parse(SynrecMC.Breeder['Combination Array']);
    for(let i = 0; i < SynrecMC.Breeder.CombinationArray.length; i++){
        SynrecMC.Breeder.CombinationArray[i] = JSON.parse(SynrecMC.Breeder.CombinationArray[i]);
        SynrecMC.Breeder.CombinationArray[i]['Result Actor'] = eval(SynrecMC.Breeder.CombinationArray[i]['Result Actor']);
        SynrecMC.Breeder.CombinationArray[i]['Required Steps'] = eval(SynrecMC.Breeder.CombinationArray[i]['Required Steps']);
        SynrecMC.Breeder.CombinationArray[i]['Random Steps'] = eval(SynrecMC.Breeder.CombinationArray[i]['Random Steps']);
        SynrecMC.Breeder.CombinationArray[i]['Delete Parents'] = eval(SynrecMC.Breeder.CombinationArray[i]['Delete Parents']);
        SynrecMC.Breeder.CombinationArray[i]['Required Actors'] = JSON.parse(SynrecMC.Breeder.CombinationArray[i]['Required Actors']);
        for(let j = 0; j < SynrecMC.Breeder.CombinationArray[i]['Required Actors'].length; j++){
            SynrecMC.Breeder.CombinationArray[i]['Required Actors'][j] = JSON.parse(SynrecMC.Breeder.CombinationArray[i]['Required Actors'][j]);
            SynrecMC.Breeder.CombinationArray[i]['Required Actors'][j]['Actor'] = eval(SynrecMC.Breeder.CombinationArray[i]['Required Actors'][j]['Actor']);
        }
    }
}catch(e){
    console.error(e);
}

SynrecMC.Breeder.ScnBack = SynrecMC.Breeder['Scene Background'];
SynrecMC.Breeder.CoreName = SynrecMC.Breeder['Item Name'];
SynrecMC.Breeder.CharImg = SynrecMC.Breeder['Breed Character Image'];
SynrecMC.Breeder.CharIdx = SynrecMC.Breeder['Breed Character Index'];
SynrecMC.Breeder.MaxSteps = eval(SynrecMC.Breeder['Max Steps for Pre-Breed Generate']);
SynrecMC.Breeder.ParentEXP = eval(SynrecMC.Breeder['Parent Step EXP']);
SynrecMC.Breeder.AnimHatch = eval(SynrecMC.Breeder['Breed Character Anim Hatch']);

SynrecMC.Breeder.MenuCmd = eval(SynrecMC.Breeder['Show Breed Menu Command']);
SynrecMC.Breeder.MenuCmdName = SynrecMC.Breeder['Breed Command Name'];

console.log(SynrecMC.Breeder.CombinationArray);

Game_Actor.prototype.gainExpBreed = function(exp) {
    const newExp = this.currentExp() + Math.round(exp);
    if(newExp >= this.nextLevelExp() && this.isMaxLevel())return;
    this.changeExp(newExp, false);
}

SynrecBrdrGmPrtyInit = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function(){
    SynrecBrdrGmPrtyInit.call(this);
    this.initBreeder();
}

Game_Party.prototype.initBreeder = function(){
    this._breederArray = [];
    this._breederParent1 = undefined;
    this._breederParent2 = undefined;
    this._breederChild = undefined;
    this._preBreedSteps = 0;
    this._preBreedMaxSteps = SynrecMC.Breeder.MaxSteps;
}

Game_Party.prototype.addBreed = function(data){
    const obj = {};
    obj['Result Actor'] = data['Result Actor'];
    obj['Step Progress'] = 0;
    obj['Step Complete'] = data['Max Steps'];
    this._breederArray.push(obj);
}

Game_Party.prototype.progressBreed = function(){
    if(!this._breederArray)this.initBreeder();
    this._breederArray.forEach((breed)=>{
        breed['Step Progress']++;
        if(breed['Step Progress'] > breed['Step Complete']){
            breed['Step Progress'] = breed['Step Complete']
        }
    })
}

Game_Party.prototype.progressPreBreed = function(){
    if(this._breederParent1 && this._breederParent2 && !this._breederChild){
        if(this._preBreedSteps >= this._preBreedMaxSteps){
            const data = this.grabValidData();
            if(data){
                const rngSteps = Math.floor(Math.random() * data['Random Steps']);
                const reqSteps = data['Required Steps'];
                const steps = Math.max(1, reqSteps - rngSteps);
                const actorId = data['Result Actor'];
                const obj = {};
                obj['Result Actor'] = actorId;
                obj['Max Steps'] = steps;
                this._breederChild = obj;
                if(data['Delete Parents']){
                    this._breederParent1 = undefined;
                    this._breederParent2 = undefined;
                }
            }
        }else this._preBreedSteps++;
    }
}

Game_Party.prototype.grantParentBreedEXP = function(){
    if(this._breederParent1)this._breederParent1.gainExpBreed(1);
    if(this._breederParent2)this._breederParent2.gainExpBreed(1);
}

Game_Party.prototype.grabValidData = function(){
    const p1 = this._breederParent1;
    const p2 = this._breederParent2;
    const combArr = SynrecMC.Breeder.CombinationArray;
    for(let i = 0; i < combArr.length; i++){
        const data = combArr[i];
        const reqActors = data['Required Actors'];
        const req1 = reqActors[0];
        const req2 = reqActors[1];
        let r1, r2 = false;
        if(
            p1._actorId == req1['Actor'] && 
            p1._gender == req1['Gender'].toLowerCase()
        ){
            r1 = true;
        }
        if(
            p1._actorId == req2['Actor'] && 
            p1._gender == req2['Gender'].toLowerCase()
        ){
            r2 = true;
        }
        if(r1){
            if(
                p2._actorId == req2['Actor'] && 
                p2._gender == req2['Gender'].toLowerCase()
            ){
                return data;
            }
        }else if(r2){
            if(
                p2._actorId == req1['Actor'] && 
                p2._gender == req1['Gender'].toLowerCase()
            ){
                return data;
            }
        }
    }
}

SynrecBrdrGmMapUpdt = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
    SynrecBrdrGmMapUpdt.call(this, sceneActive);
    if(sceneActive){
        this.updateHatch();
    }
}

Game_Map.prototype.updateHatch = function(){
    if(!$gameParty._breederArray)$gameParty.initBreeder();
    const validHatches = $gameParty._breederArray.filter((item)=>{
        return item['Step Progress'] >= item['Step Complete']
    })
    if(validHatches.length <= 0)return;
    if(SynrecMC.Breeder.CharImg && !isNaN(SynrecMC.Breeder.CharIdx) && !isNaN(SynrecMC.Breeder.AnimHatch)){
        SceneManager.push(Scene_Hatch);
    }else{
        for(let i = 0; i < $gameParty._breederArray.length; i++){
            const item = $gameParty._breederArray[i];
            const progress = item['Step Progress'];
            const complete = item['Step Complete'];
            if(progress >= complete){
                const actorId = item['Result Actor'];
                $gameParty.addActor(actorId);
                $gameParty._breederArray.splice(i, 1);
                i--
            }
        }
    }
}

SynrecBrdrGmPlyrMvStrt = Game_Player.prototype.moveStraight;
Game_Player.prototype.moveStraight = function(d) {
    if (this.canPass(this.x, this.y, d)){
        $gameParty.progressBreed();
        $gameParty.progressPreBreed();
        if(SynrecMC.Breeder.ParentEXP){
            $gameParty.grantParentBreedEXP();
        }
    }
    SynrecBrdrGmPlyrMvStrt.call(this, d);
}

SynrecBrdrWinMenuCmdAddOrigCmds = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    SynrecBrdrWinMenuCmdAddOrigCmds.call(this);
    if(SynrecMC.Breeder.MenuCmd)this.addBreederCmd();
}

Window_MenuCommand.prototype.addBreederCmd = function(){
    this.addCommand(SynrecMC.Breeder.MenuCmdName, 'breed', true);
    let scene = SceneManager._scene;
    this.setHandler("breed", scene.openBreeder.bind(scene));
}

function Window_ViewBreed(){
    this.initialize(...arguments);
}

Window_ViewBreed.prototype = Object.create(Window_Selectable.prototype);
Window_ViewBreed.prototype.constructor = Window_ViewBreed;

Window_ViewBreed.prototype.maxItems = function(){
    return $gameParty._breederArray.length;
}

Window_ViewBreed.prototype.maxCols = function(){
    return 4;
}

Window_ViewBreed.prototype.itemHeight = function(){
    return 64;
}

Window_ViewBreed.prototype.update = function(){
    Window_Selectable.prototype.update.call(this);
    this.refresh();
}

Window_ViewBreed.prototype.drawItem = function(index){
    const rect = this.itemRect(index);
    const data = $gameParty._breederArray[index];
    if(data){
        const actorId = data['Result Actor'];
        const actorData = $dataActors[actorId];
        const progress = data['Step Progress'];
        const complete = data['Step Complete'];
        const charName = actorData.characterName;
        const charIndx = actorData.characterIndex;
        this.drawCharacter(charName, charIndx, rect.x + 48, rect.y + 55);
        this.drawText(`${progress}/${complete}`, rect.x - 48, rect.y, rect.width, 'right');
    }
}

function Window_ParentBreed(){
    this.initialize(...arguments);
}

Window_ParentBreed.prototype = Object.create(Window_Base.prototype);
Window_ParentBreed.prototype.constructor = Window_ParentBreed;

Window_ParentBreed.prototype.initialize = function(rect, type){
    Window_Base.prototype.initialize.call(this, rect);
    this._type = type;
}
Window_ParentBreed.prototype.drawCharacter = function(
    characterName, characterIndex
) {
    const bitmap = ImageManager.loadCharacter(characterName);
    const big = ImageManager.isBigCharacter(characterName);
    const pw = bitmap.width / (big ? 3 : 12);
    const ph = bitmap.height / (big ? 4 : 8);
    const n = big ? 0: characterIndex;
    const sx = ((n % 4) * 3 + 1) * pw;
    const sy = Math.floor(n / 4) * 4 * ph;
    const x = (this.contentsWidth() / 2) - pw / 2;
    const y = (this.contentsHeight() / 2) - ph / 2;
    this.contents.blt(bitmap, sx, sy, pw, ph, (x - pw / 2), (y - ph), pw * 2, ph * 2);
};

Window_ParentBreed.prototype.drawActorCharacter = function(actor) {
    this.drawCharacter(actor.characterName(), actor.characterIndex());
}

Window_ParentBreed.prototype.drawData = function(){
    this.contents.clear();
    const object = this._type == 1 ? $gameParty._breederParent1 : $gameParty._breederParent2;
    if(object){
        this.drawText(object.name(), 0, 0, this.contentsWidth(), 'center');
        this.drawActorCharacter(object);
        this.makeFontSmaller();
        const y = this.contentsHeight() / 2 + this.lineHeight();
        this.drawText(`${TextManager.levelA}: ${object._level}`, 0, y);
        this.drawText(`${TextManager.expA}: ${object.currentExp()} / ${object.nextLevelExp()}`, 0, y + this.lineHeight() / 2);
        this.drawText(`Gender: ${object._gender}`, 0, y + this.lineHeight());
        this.makeFontBigger();
    }else{
        const y = (this.contentsHeight() / 2) - (this.lineHeight() / 2);
        this.drawText(`Add an actor`, 0, y, this.contentsWidth(), 'center');
    }
}

Window_ParentBreed.prototype.refresh = function(){
    this.drawData();
}

function Window_PartyBreed(){
    this.initialize(...arguments);
}

Window_PartyBreed.prototype = Object.create(Window_Selectable.prototype);
Window_PartyBreed.prototype.constructor = Window_PartyBreed;

Window_PartyBreed.prototype.maxItems = function(){
    return $gameParty.maxBattleMembers();
}

Window_PartyBreed.prototype.maxCols = function(){
    return 4;
}

Window_PartyBreed.prototype.itemHeight = function(){
    return 128;
}

Window_PartyBreed.prototype.update = function(){
    Window_Selectable.prototype.update.call(this);
    this.refresh();
}

Window_PartyBreed.prototype.drawItem = function(index){
    const actor = $gameParty._actors[index];
    const rect = this.itemRect(index);
    if(actor){
        const charName = actor._characterName;
        const charIdx = actor._characterIndex;
        this.drawCharacter(charName, charIdx, rect.x + rect.width / 2 , rect.y + 64);
        this.drawText(actor.name(), rect.x, rect.height - this.lineHeight() * 1.5, rect.width, 'center');
        this.makeFontSmaller()
        this.drawText(actor._gender, rect.x, rect.height - this.lineHeight(), rect.width, 'center');
        this.makeFontBigger();
    }
}

Window_PartyBreed.prototype.partyMem = function(){
    const index = this.index();
    return $gameParty._actors[index];
}

function Window_BreedCommand(){
    this.initialize(...arguments);
}

Window_BreedCommand.prototype = Object.create(Window_Command.prototype);
Window_BreedCommand.prototype.constructor = Window_BreedCommand;

Window_BreedCommand.prototype.makeCommandList = function(){
    Window_Command.prototype.makeCommandList.call(this);
    this.addSwapCommand1();
    this.addSwapCommand2();
    this.addGetCommand();
    this.addCancelCommand();
}

Window_BreedCommand.prototype.addSwapCommand1 = function(){
    this.addCommand(`Swap Slot 1`, 'swap1');
}

Window_BreedCommand.prototype.addSwapCommand2 = function(){
    this.addCommand(`Swap Slot 2`, 'swap2');
}

Window_BreedCommand.prototype.addGetCommand = function(){
    this.addCommand(`Get ${SynrecMC.Breeder.CoreName}`, 'get');
}

Window_BreedCommand.prototype.addCancelCommand = function(){
    this.addCommand(`Cancel`, 'cancel');
}

function Scene_Breeding(){
    this.initialize(...arguments);
}

Scene_Breeding.prototype = Object.create(Scene_Base.prototype);
Scene_Breeding.prototype.constructor = Scene_Breeding;

Scene_Breeding.prototype.update = function(){
    Scene_Base.prototype.update.call(this);
    this.updateBreedChar();
}

Scene_Breeding.prototype.updateBreedChar = function(){
    if(!this._breedSprite)return;
    if(!this._breedSprite._character)return;
    const chara = this._breedSprite._character;
    if($gameParty._breederChild)chara.setOpacity(255);
    if(!$gameParty._breederChild)chara.setOpacity(0);
    chara.update();
}

Scene_Breeding.prototype.create = function(){
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createSpriteset();
    this.createWindowLayer();
    this.createAllWindows();
    this.createBreedChild();
}

Scene_Breeding.prototype.createBackground = function(){
    if(!SynrecMC.Breeder.ScnBack)return this._backgroundSprite = null;
    const bitmap = ImageManager.loadPicture(SynrecMC.Breeder.ScnBack);
    this._backgroundSprite = new Sprite(bitmap);
    this.addChild(this._backgroundSprite)
}

Scene_Breeding.prototype.createAllWindows = function(){
    this.createBreedWinLeft();
    this.createBreedWinRight();
    this.createBreedWinParty();
    this.createBreedWinCmd();
}

Scene_Breeding.prototype.createBreedWinLeft = function(){
    const x = 0;
    const y = 0;
    const w = Graphics.width / 3;
    const h = (Graphics.height / 2) - 72;
    const rect = new Rectangle(x, y, w, h);
    this._parentWinLeft = new Window_ParentBreed(rect, 1);
    this._parentWinLeft.refresh();
    this.addWindow(this._parentWinLeft);
}

Scene_Breeding.prototype.createBreedWinRight = function(){
    const w = Graphics.width / 3;
    const h = (Graphics.height / 2) - 72;
    const x = Graphics.width - w - 8;
    const y = 0;
    const rect = new Rectangle(x, y, w, h);
    this._parentWinRight = new Window_ParentBreed(rect, 2);
    this._parentWinRight.refresh();
    this.addWindow(this._parentWinRight);
}

Scene_Breeding.prototype.createBreedWinParty = function(){
    const w = Graphics.width;
    const h = Graphics.height / 4;
    const x = 0;
    const y = Graphics.height - h;
    const rect = new Rectangle(x, y, w, h);
    this._partyWindow = new Window_PartyBreed(rect);
    this._partyWindow.setHandler('ok', this.selectPartySlot.bind(this));
    this._partyWindow.setHandler('cancel', this.popScene.bind(this));
    this._partyWindow.activate();
    this._partyWindow.select(0);
    this.addChild(this._partyWindow);
}

Scene_Breeding.prototype.createBreedWinCmd = function(){
    const w = Graphics.width / 3;
    const h = Graphics.height / 3
    const x = (Graphics.width / 2) - (w / 2);
    const y = (Graphics.height / 2) - (h / 2);
    const rect = new Rectangle(x, y, w, h);
    this._breedCommand = new Window_BreedCommand(rect);
    this._breedCommand.setHandler('swap1', this.swapWith1.bind(this));
    this._breedCommand.setHandler('swap2', this.swapWith2.bind(this));
    this._breedCommand.setHandler('get', this.getBreedResult.bind(this));
    this._breedCommand.setHandler('cancel', this.cancelCommand.bind(this));
    this._breedCommand.close();
    this._breedCommand.deactivate();
    this.addChild(this._breedCommand);
}

Scene_Breeding.prototype.createSpriteset = function(){
    this._spriteset = new Spriteset_Base();
    this.addChild(this._spriteset);
}

Scene_Breeding.prototype.createBreedChild = function(){
    if(!SynrecMC.Breeder.CharImg || isNaN(SynrecMC.Breeder.CharIdx))return;
    const breedChar = new Game_Character();
    breedChar.screenX = function(){return this._screenX};
    breedChar.screenY = function(){return this._screenY};
    breedChar._screenX = Graphics.width / 2;
    breedChar._screenY = Graphics.height / 2;
    breedChar.setOpacity(0);
    breedChar.setDirection(2);
    breedChar.setStepAnime(true);
    breedChar.setImage(SynrecMC.Breeder.CharImg, SynrecMC.Breeder.CharIdx);
    this._breedSprite = new Sprite_Character(breedChar);
    this._spriteset.addChild(this._breedSprite);
}

Scene_Breeding.prototype.selectPartySlot = function(){
    this._breedCommand.select(0);
    this._breedCommand.open();
    this._breedCommand.show();
    this._breedCommand.activate();
    this._partyWindow.deactivate();
}

Scene_Breeding.prototype.swapWith1 = function(){
    const actor = this._partyWindow.partyMem() ? JsonEx.makeDeepCopy(this._partyWindow.partyMem()) : this._partyWindow.partyMem();
    const temp = $gameParty._breederParent1 ? JsonEx.makeDeepCopy($gameParty._breederParent1) : $gameParty._breederParent1;
    const index = this._partyWindow.index();
    $gameParty._actors[index] = temp;
    $gameParty._breederParent1 = actor;
    $gameParty._actors = $gameParty._actors.filter((actor)=>{
        return actor;
    })
    if($gameParty._actors.length <= 0){
        $gameParty._actors.push(actor);
        $gameParty._breederParent1 = temp;
        SoundManager.playBuzzer();
        this._breedCommand.activate();
        return;
    }
    this.cancelCommand();
}

Scene_Breeding.prototype.swapWith2 = function(){
    const actor = this._partyWindow.partyMem() ? JsonEx.makeDeepCopy(this._partyWindow.partyMem()) : this._partyWindow.partyMem();
    const temp = $gameParty._breederParent2 ? JsonEx.makeDeepCopy($gameParty._breederParent2) : $gameParty._breederParent2;
    const index = this._partyWindow.index();
    $gameParty._actors[index] = temp;
    $gameParty._breederParent2 = actor;
    $gameParty._actors = $gameParty._actors.filter((actor)=>{
        return actor;
    })
    if($gameParty._actors.length <= 0){
        $gameParty._actors.push(actor);
        $gameParty._breederParent2 = temp;
        SoundManager.playBuzzer();
        this._breedCommand.activate();
        return;
    }
    this.cancelCommand();
}

Scene_Breeding.prototype.getBreedResult = function(){
    if($gameParty._breederChild){
        $gameParty.addBreed($gameParty._breederChild);
        $gameParty._breederChild = undefined;
        this.cancelCommand();
    }else{
        SoundManager.playBuzzer();
        this._breedCommand.activate();
    }
}

Scene_Breeding.prototype.cancelCommand = function(){
    this._breedCommand.deselect();
    this._breedCommand.close();
    this._breedCommand.deactivate();
    this._partyWindow.activate();
    this.refreshAll();
}

Scene_Breeding.prototype.refreshAll = function(){
    this._partyWindow.refresh();
    this._parentWinRight.refresh();
    this._parentWinLeft.refresh();
}

function Scene_Hatch(){
    this.initialize(...arguments);
}

Scene_Hatch.prototype = Object.create(Scene_Base.prototype);
Scene_Hatch.prototype.constructor = Scene_Hatch;

Scene_Hatch.prototype.create = function(){
    this.createSprite();
    this._canHatch = true;
}

Scene_Hatch.prototype.createSprite = function(){
    this._hatchSpriteset = new Spriteset_Base();
    this.addChild(this._hatchSpriteset);
    this._hatchChar = new Game_Character();
    this._hatchChar.screenX = function(){return this._screenX};
    this._hatchChar.screenY = function(){return this._screenY};
    this._hatchChar._screenX = (Graphics.width / 2);
    this._hatchChar._screenY = (Graphics.height / 2);
    this._hatchChar.setDirection(2);
    this._hatchChar.setStepAnime(true);
    this._hatchChar.setImage(SynrecMC.Breeder.CharImg, SynrecMC.Breeder.CharIdx);
    this._hatchSprite = new Sprite_Character(this._hatchChar);
    this._hatchSpriteset.addChild(this._hatchSprite);
    this._animSprite = new Sprite_Animation();
    this._animSprite.anchor.x = 0.5;
    this._animSprite.anchor.y = 0.5;
    this._hatchSpriteset.addChild(this._animSprite);
}

Scene_Hatch.prototype.startHatch = function(){
    let data;
    for(let i = 0; i < $gameParty._breederArray.length; i++){
        const item = $gameParty._breederArray[i];
        const progress = item['Step Progress'];
        const complete = item['Step Complete'];
        if(progress >= complete){
            data = JsonEx.makeDeepCopy(item);
            $gameParty._breederArray.splice(i, 1);
            break;
        }
    }
    const actorId = data['Result Actor'];
    $gameParty.addActor(actorId);
    const actorData = $dataActors[actorId];
    const img = actorData.characterName;
    const idx = actorData.characterIndex;
    this._hatchChar.setImage(img, idx);
    const animId = SynrecMC.Breeder.AnimHatch;
    const animData = $dataAnimations[animId];
    const targets = [this._hatchSprite];
    this._animSprite.setup(targets, animData);
    this._isHatching = true;
    this._canHatch = false;
    this._exitDelay = 60;
}

Scene_Hatch.prototype.update = function(){
    Scene_Base.prototype.update.call(this);
    this._hatchChar.update();
    if(this._animSprite.isPlaying())return;
    if(this._isHatching){
        this._hatchSprite.alpha -= 0.01;
        if(this._hatchSprite.alpha <= 0){
            this._hatchSprite.alpha = 0;
            this._isHatching = false;
            const img = SynrecMC.Breeder.CharImg;
            const idx = SynrecMC.Breeder.CharIdx;
            this._hatchChar.setImage(img, idx);
        }
    }
    const validHatches = $gameParty._breederArray.filter((item)=>{
        return item['Step Progress'] >= item['Step Complete']
    })
    if(Input.isTriggered('ok') && validHatches.length > 0 && this._canHatch){
        this.startHatch();
    }else if(this._hatchSprite.alpha < 1){
        this._hatchSprite.alpha += 0.01;
        if(this._hatchSprite.alpha >= 1){
            this._hatchSprite.alpha = 1;
            this._canHatch = true;
        }
    }
    if(validHatches.length <= 0 && this._exitDelay <= 0){
        this.startExit();
    }else if(validHatches.length <= 0)this._exitDelay--;
}

Scene_Hatch.prototype.startExit = function(){
    $gameScreen.startFlash([255, 255, 255, 255], 60);
    SoundManager.playUseItem();
    SceneManager.pop();
}

function Scene_BreederSteps(){
    this.initialize(...arguments);
}

Scene_BreederSteps.prototype = Object.create(Scene_Base.prototype);
Scene_BreederSteps.prototype.constructor = Scene_BreederSteps;

Scene_BreederSteps.prototype.create = function(){
    this.createBackground();
    this.createWindowLayer();
    this.createBreedingWindow();
}

Scene_BreederSteps.prototype.createBackground = function(){
    this._backgroundFilter = new PIXI.filters.BlurFilter();
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    this._backgroundSprite.filters = [this._backgroundFilter];
    this.addChild(this._backgroundSprite);
    this.setBackgroundOpacity(192);
}

Scene_BreederSteps.prototype.setBackgroundOpacity = function(opacity) {
    this._backgroundSprite.opacity = opacity;
};

Scene_BreederSteps.prototype.createBreedingWindow = function(){
    const x = 0;
    const y = 0;
    const w = Graphics.width - 8;
    const h = Graphics.height - 8;
    const rect = new Rectangle(x, y, w, h);
    this._viewBreeds = new Window_ViewBreed(rect);
    this._viewBreeds.setHandler('cancel', this.popScene.bind(this));
    this._viewBreeds.activate();
    this._viewBreeds.select(0);
    this.addWindow(this._viewBreeds);
}

Scene_Menu.prototype.openBreeder = function(){
    SceneManager.push(Scene_BreederSteps);
}