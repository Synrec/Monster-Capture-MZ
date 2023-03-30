/*:
 * @author Synrec/kylestclr
 * @plugindesc v1.0 Allows infusing actors.
 * 
 * @help
 * Merge Subject = Actor receiving the merge benefits
 * Merge Target = Actor granting the merge benefits
 * 
 * @param Delete Merge Target
 * @desc When merge is complete, the target is deleted.
 * @type boolean
 * @default true
 * 
 * @param Merge Rate
 * @desc Rate of merger for actors
 * @type number
 * @max 100
 */
if(!SynrecMC)throw new Error("Core Plugin Missing.");
if(!isObject(SynrecMC))throw new Error("Bad Core Files.");
SynrecMC.MergeActor = PluginManager.parameters('Synrec_MC_MergeActors');
SynrecMC.MergeActor.DeleteTarget = eval(SynrecMC.MergeActor['Delete Merge Target']) || false;
SynrecMC.MergeActor.MergeRate = eval(SynrecMC.MergeActor['Merge Rate']) || 1;

SynrecMrgrGmPrtyInit = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function(){
    SynrecMrgrGmPrtyInit.call(this);
    this.initMerger();
}

Game_Party.prototype.initMerger = function(){
    this._mergeSubject = null;
    this._mergeTarget = null;
}

function Window_ParentMerge(){
    this.initialize(...arguments);
}

Window_ParentMerge.prototype = Object.create(Window_Base.prototype);
Window_ParentMerge.prototype.constructor = Window_ParentMerge;

Window_ParentMerge.prototype.initialize = function(rect, type){
    if(MONSTER_CAPTURE_MV){
        const x = rect.x;
        const y = rect.y;
        const w = rect.width;
        const h = rect.height;
        Window_Base.prototype.initialize.call(this,x,y,w,h);
    }else{
        Window_Base.prototype.initialize.call(this, rect);
    }
    this._type = type;
}

Window_ParentMerge.prototype.standardPadding = function(){
    return 12;
}

Window_ParentMerge.prototype.drawCharacter = function(
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

Window_ParentMerge.prototype.drawActorCharacter = function(actor) {
    this.drawCharacter(actor.characterName(), actor.characterIndex());
}

Window_ParentMerge.prototype.drawData = function(){
    this.contents.clear();
    const object = this._type == 1 ? $gameParty._mergeSubject : $gameParty._mergeTarget;
    if(object){
        this.drawText(object.name(), 0, 0, this.contentsWidth(), 'center');
        this.drawActorCharacter(object);
        this.makeFontSmaller();
        const y = this.contentsHeight() / 2 + this.lineHeight();
        this.drawText(`${TextManager.levelA}: ${object._level}`, 0, y);
        this.drawText(`${TextManager.expA}: ${object.currentExp()} / ${object.nextLevelExp()}`, 0, y + this.lineHeight() / 2);
        this.drawText(`${object._gender}`, 0, y + this.lineHeight());
        this.makeFontBigger();
    }else{
        const y = (this.contentsHeight() / 2) - (this.lineHeight() / 2);
        this.drawText(`Add an actor`, 0, y, this.contentsWidth(), 'center');
    }
}

Window_ParentMerge.prototype.refresh = function(){
    this.drawData();
}

function Window_PartyMerge(){
    this.initialize(...arguments);
}

Window_PartyMerge.prototype = Object.create(Window_Selectable.prototype);
Window_PartyMerge.prototype.constructor = Window_PartyMerge;

Window_PartyMerge.prototype.initialize = function(rect, type){
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

Window_PartyMerge.prototype.standardPadding = function(){
    return 12;
}

Window_PartyMerge.prototype.maxItems = function(){
    return $gameParty.maxBattleMembers();
}

Window_PartyMerge.prototype.maxCols = function(){
    return 4;
}

Window_PartyMerge.prototype.itemHeight = function(){
    return 128;
}

Window_PartyMerge.prototype.update = function(){
    Window_Selectable.prototype.update.call(this);
    this.refresh();
}

Window_PartyMerge.prototype.drawItem = function(index){
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

Window_PartyMerge.prototype.partyMem = function(){
    const index = this.index();
    return $gameParty._actors[index];
}

function Window_MergeCommand(){
    this.initialize(...arguments);
}

Window_MergeCommand.prototype = Object.create(Window_Command.prototype);
Window_MergeCommand.prototype.constructor = Window_MergeCommand;

Window_MergeCommand.prototype.initialize = function(rect, type){
    if(MONSTER_CAPTURE_MV){
        const x = rect.x;
        const y = rect.y;
        const w = rect.width;
        const h = rect.height;
        this._width = w;
        this._height = h;
        Window_Command.prototype.initialize.call(this,x,y);
    }else{
        Window_Command.prototype.initialize.call(this, rect);
    }
    this._type = type;
}

Window_MergeCommand.prototype.standardPadding = function(){
    return 12;
}

Window_MergeCommand.prototype.windowWidth = function(){
    return this._width;
}

Window_MergeCommand.prototype.windowHeight = function(){
    return this._height;
}

Window_MergeCommand.prototype.makeCommandList = function(){
    Window_Command.prototype.makeCommandList.call(this);
    this.addSwapCommand1();
    this.addSwapCommand2();
    this.addGetCommand();
    this.addCancelCommand();
}

Window_MergeCommand.prototype.addSwapCommand1 = function(){
    this.addCommand(`Set Subject`, 'swap1');
}

Window_MergeCommand.prototype.addSwapCommand2 = function(){
    this.addCommand(`Set Target`, 'swap2');
}

Window_MergeCommand.prototype.addGetCommand = function(){
    this.addCommand(`Merge`, 'get');
}

Window_MergeCommand.prototype.addCancelCommand = function(){
    this.addCommand(`Cancel`, 'cancel');
}

function Scene_MergeActor(){
    this.initialize(...arguments);
}

Scene_MergeActor.prototype = Object.create(Scene_Base.prototype);
Scene_MergeActor.prototype.constructor = Scene_MergeActor;

Scene_MergeActor.prototype.create = function(){
    this.createWindowLayer();
    this.createAllWindows();
}

Scene_MergeActor.prototype.createAllWindows = function(){
    this.createTeamWindow();
    this.createParentWindow1();
    this.createParentWindow2();
    this.createCommandWindow();
}

Scene_MergeActor.prototype.createParentWindow1 = function(){
    const x = 0;
    const y = 0;
    const w = Graphics.width / 3;
    const h = (Graphics.height / 2) - 72;
    const rect = new Rectangle(x, y, w, h);
    this._subjectWindow = new Window_ParentMerge(rect, 1);
    this.addWindow(this._subjectWindow);
}

Scene_MergeActor.prototype.createParentWindow2 = function(){
    const w = Graphics.width / 3;
    const h = (Graphics.height / 2) - 72;
    const x = Graphics.width - w - 8;
    const y = 0;
    const rect = new Rectangle(x, y, w, h);
    this._targetWindow = new Window_ParentMerge(rect, 2);
    this.addWindow(this._targetWindow);
}

Scene_MergeActor.prototype.createTeamWindow = function(){
    const w = Graphics.width;
    const h = Graphics.height / 4;
    const x = 0;
    const y = Graphics.height - h;
    const rect = new Rectangle(x, y, w, h);
    this._partyWindow = new Window_PartyMerge(rect);
    this._partyWindow.setHandler('ok', this.selectPartySlot.bind(this));
    this._partyWindow.setHandler('cancel', this.popScene.bind(this));
    this._partyWindow.activate();
    this._partyWindow.select(0);
    this.addChild(this._partyWindow);
}

Scene_MergeActor.prototype.createCommandWindow = function(){
    const w = Graphics.width / 3;
    const h = Graphics.height / 3
    const x = (Graphics.width / 2) - (w / 2);
    const y = (Graphics.height / 2) - (h / 2);
    const rect = new Rectangle(x, y, w, h);
    this._mergeCommand = new Window_MergeCommand(rect);
    this._mergeCommand.setHandler('swap1', this.setSubject.bind(this));
    this._mergeCommand.setHandler('swap2', this.setTarget.bind(this));
    this._mergeCommand.setHandler('get', this.merge.bind(this));
    this._mergeCommand.setHandler('cancel', this.cancelCommand.bind(this));
    this._mergeCommand.close();
    this._mergeCommand.deactivate();
    this.addChild(this._mergeCommand);
}

Scene_MergeActor.prototype.selectPartySlot = function(){
    this._mergeCommand.select(0);
    this._mergeCommand.open();
    this._mergeCommand.show();
    this._mergeCommand.activate();
    this._partyWindow.deactivate();
}

Scene_MergeActor.prototype.setSubject = function(){
    const actor = this._partyWindow.partyMem() ? JsonEx.makeDeepCopy(this._partyWindow.partyMem()) : this._partyWindow.partyMem();
    const temp = $gameParty._mergeSubject ? JsonEx.makeDeepCopy($gameParty._mergeSubject) : $gameParty._mergeSubject;
    const index = this._partyWindow.index();
    $gameParty._actors[index] = temp;
    $gameParty._mergeSubject = actor;
    $gameParty._actors = $gameParty._actors.filter((actor)=>{
        return actor;
    })
    if($gameParty._actors.length <= 0){
        $gameParty._actors.push(actor);
        $gameParty._mergeSubject = temp;
        SoundManager.playBuzzer();
        this._mergeCommand.activate();
        return;
    }
    this.cancelCommand();
}

Scene_MergeActor.prototype.setTarget = function(){
    const actor = this._partyWindow.partyMem() ? JsonEx.makeDeepCopy(this._partyWindow.partyMem()) : this._partyWindow.partyMem();
    const temp = $gameParty._mergeTarget ? JsonEx.makeDeepCopy($gameParty._mergeTarget) : $gameParty._mergeTarget;
    const index = this._partyWindow.index();
    $gameParty._actors[index] = temp;
    $gameParty._mergeTarget = actor;
    $gameParty._actors = $gameParty._actors.filter((actor)=>{
        return actor;
    })
    if($gameParty._actors.length <= 0){
        $gameParty._actors.push(actor);
        $gameParty._mergeTarget = temp;
        SoundManager.playBuzzer();
        this._mergeCommand.activate();
        return;
    }
    this.cancelCommand();
}

Scene_MergeActor.prototype.merge = function(){
    if($gameParty._mergeSubject && $gameParty._mergeTarget){
        const rate = SynrecMC.MergeActor.MergeRate / 100;
        const hp = Math.round($gameParty._mergeTarget.param(0) * rate);
        const mp = Math.round($gameParty._mergeTarget.param(1) * rate);
        const atk = Math.round($gameParty._mergeTarget.param(2) * rate);
        const def = Math.round($gameParty._mergeTarget.param(3) * rate);
        const mat = Math.round($gameParty._mergeTarget.param(4) * rate);
        const mdf = Math.round($gameParty._mergeTarget.param(5) * rate);
        const agi = Math.round($gameParty._mergeTarget.param(6) * rate);
        const luk = Math.round($gameParty._mergeTarget.param(7) * rate);
        $gameParty._mergeSubject._paramPlus[0] += hp;
        $gameParty._mergeSubject._paramPlus[1] += mp;
        $gameParty._mergeSubject._paramPlus[2] += atk;
        $gameParty._mergeSubject._paramPlus[3] += def;
        $gameParty._mergeSubject._paramPlus[4] += mat;
        $gameParty._mergeSubject._paramPlus[5] += mdf;
        $gameParty._mergeSubject._paramPlus[6] += agi;
        $gameParty._mergeSubject._paramPlus[7] += luk;
        $gameMessage.add(
            `${$gameParty._mergeSubject.name()}'s base stats have been increased by ${SynrecMC.MergeActor.MergeRate}% \nof ${$gameParty._mergeTarget.name()}'s base stats. 
            ${$gameParty._mergeSubject.name()} has gained:\n+${hp} MaxHP,\n+${mp} MaxMP,\n+${atk} Attack Power,\n+${def} Defense,
            \n+${mat} Magic Attack,
            \n+${mdf} Magic Defense,
            \n+${agi} Agility,
            \n+${luk} Luck.`
        );
        $gameParty._actors.push(JsonEx.makeDeepCopy($gameParty._mergeSubject));
        if(SynrecMC.MergeActor.DeleteTarget){
            $gameParty._mergeSubject = null;
            $gameParty._mergeTarget = null;
        }else{
            $gameParty._actors.push(JsonEx.makeDeepCopy($gameParty._mergeTarget));
            $gameParty._mergeSubject = null;
            $gameParty._mergeTarget = null;
        }
        this.cancelCommand();
        SceneManager.pop();
    }else{
        SoundManager.playBuzzer();
        this._breedCommand.activate();
    }
}

Scene_MergeActor.prototype.cancelCommand = function(){
    this._mergeCommand.deselect();
    this._mergeCommand.close();
    this._mergeCommand.deactivate();
    this._partyWindow.activate();
    this.refreshAll();
}

Scene_MergeActor.prototype.refreshAll = function(){
    this._partyWindow.refresh();
    this._subjectWindow.refresh();
    this._targetWindow.refresh();
}