/*:@author Synrec 
 * @target MZ
 *
 * @plugindesc v1.8 Battle Core for the Monster Capture System.[EXPERIMENTAL RELEASE!!!]
 *
 *@help
 * This plugin inherits the permissions outlined in Synrec_MC_Core.js
 * 
 * Modifies the battle system to allow for 1v1, 2v2, 3v1, etc style battles.
 * 
 * You can set actor battler limit in battle with script call:
 * $gameTemp._numBattleActors = x [x = number]
 * $gameTemp._numBattleEnemies = x [x = number]
 * 
 * Set map Enemy Level Minimum by using map notetag: <minEnemyLevel:x> {x = level}
 * Set map Enemy Level Maximum by using map notetag: <maxEnemyLevel:x> {x = level}
 * 
 * Block Enemy base parameters by using the enemy notetag: <blockBaseParam>
 * 
 * Set critical enemy HP ratio with: <critHp:x.xx> where 1.00 = 100%.
 * - This influences use of HP recovery skills
 * Set critical enemy MP ratio with: <critMp:x.xx> where 1.00 = 100%.
 * - This influences use of MP recovery skills
 * Set critical enemy TP ratio with: <critTp:x.xx> where 1.00 = 100%.
 * - This influences use of support skills (Damage Type 0)
 * 
 * Tags => (<critHp>, <critMp>, <critTp> require a capture actor to be set.)
 * 
 * Instructions for use may be found on my webpage https://synrec.dev
 * 
 * @param Gameplay
 * 
 * @param Default Number of Actor Battlers
 * @desc Maximum number of actor battlers. Changeable in game.
 * @type number
 * @default 4
 * @parent Gameplay
 * 
 * @param Default Number of Enemy Battlers
 * @desc Maximum number of enemy battlers. Changeable in game.
 * @type number
 * @default 8
 * @parent Gameplay
 * 
 * @param Max Battle Members
 * @desc Maximum number of party members
 * @type number
 * @default 4
 * @parent Gameplay
 * 
 * @param Enable Team Command
 * @desc Can change active battler
 * @type boolean
 * @default true
 * @parent Gameplay
 * 
 * @param Skip Turn on Swap
 * @desc Can change active battler
 * @type boolean
 * @default true
 * @parent Gameplay
 * 
 * @param Global Min Enemy Level
 * @desc Lowest Level for capturable enemy
 * @type number
 * @default 1
 * @min 1
 * @max 98
 * @parent Gameplay
 * 
 * @param Global Max Enemy Level
 * @desc Highest Level for capturable enemy
 * @type number
 * @default 1
 * @min 1
 * @max 99
 * @parent Gameplay
 * 
 * @param Use Front Facing Actor Sprites
 * @desc Uses the SV Battler in front facing battle.
 * @type boolean
 * @default false
 * @parent Gameplay
 * 
 * @param Swap Animation
 * @desc Animation for swapped in Actor
 * @type animation
 * @default 4
 * @parent Gameplay
 * 
 * @param UI
 * 
 * @param Team Command Name
 * @desc Name of Team Command that shows on party command
 * @type text
 * @default Party
 * @parent UI
 * 
 * @param Battling Text
 * @desc Text that shows if actor is battling
 * @type text
 * @default Battling
 * @parent UI
 * 
 * @param Stand-By Text
 * @desc Text that shows if actor is stand by
 * @type text
 * @default Stand-By
 * @parent UI
 * 
 * @param Use Enemy Status
 * @desc Show additional info for enemies
 * @type boolean
 * @default true
 * @parent UI
 * 
 * @param Show Enemy HP Bar
 * @desc Shows enemy HP bar
 * @type boolean
 * @default true
 * @parent Use Enemy Status
 * 
 * @param Show Enemy MP Bar
 * @desc Shows enemy MP bar
 * @type boolean
 * @default true
 * @parent Use Enemy Status
 * 
 * @param Show Enemy TP Bar
 * @desc Shows enemy TP bar
 * @type boolean
 * @default true
 * @parent Use Enemy Status
 * 
 * @param Battle Positioning
 * @desc Modify sprite positions
 * 
 * @param Enemy Reposition
 * @desc Enable enemy calculated positions. Front facing sprites must be enabled.
 * @type boolean
 * @default true
 * @parent Battle Positioning
 * 
 * @param Actor Sprite Start X
 * @desc Initial X position of the actor sprites.
 * @default 64
 * @type number
 * @parent Battle Positioning
 * 
 * @param Actor Sprite Start Y
 * @desc Initial Y position of the actor sprites.
 * @default 312
 * @type number
 * @parent Battle Positioning
 * 
 * @param Actor Sprite Offset X
 * @desc X position offset between actors.
 * @default 12
 * @type number
 * @parent Battle Positioning
 * 
 * @param Enemy Sprite Start X
 * @desc Initial X position of the enemy sprites.
 * @default 408
 * @type number
 * @parent Battle Positioning
 * 
 * @param Enemy Sprite Start Y
 * @desc Initial Y position of the enemy sprites.
 * @default 64
 * @type number
 * @parent Battle Positioning
 * 
 * @param Enemy Sprite Offset X
 * @desc X position offset between enemies.
 * @default 12
 * @type number
 * @parent Battle Positioning
 * 
 * @param Actor Step Forward X
 * @desc X - offset for actor stepping forward.
 * @type number
 * @default -48
 * @parent Battle Positioning
 * 
 * @param Actor Step Forward Y
 * @desc Y - offset for actor stepping forward.
 * @type number
 * @default 0
 * @parent Battle Positioning
 * 
 * @param Actor Step Forward Duration
 * @desc Time in frames for actor stepping forward.
 * @type number
 * @default 12
 * @parent Battle Positioning
 * 
 * @param Actor Retreat X
 * @desc X - offset for actor stepping forward.
 * @type number
 * @default 300
 * @parent Battle Positioning
 * 
 * @param Actor Retreat Y
 * @desc Y - offset for actor stepping forward.
 * @type number
 * @default 0
 * @parent Battle Positioning
 * 
 * @param Actor Retreat Duration
 * @desc Time in frames for actor stepping forward.
 * @type number
 * @default 30
 * @parent Battle Positioning
 * 
 */

if(!SynrecMC)throw new Error("Core Plugin Missing.");
if(!isObject(SynrecMC))throw new Error("Bad Core Files.");
SynrecMC.Battle = {};
SynrecMC.Battle.Version = "1.8";

SynrecMC.Battle.Plugins = PluginManager.parameters('Synrec_MC_BattleCore');
SynrecMC.Battle.MaxActorBattler = eval(SynrecMC.Battle.Plugins['Default Number of Actor Battlers']);
SynrecMC.Battle.MaxEnemyBattler = eval(SynrecMC.Battle.Plugins['Default Number of Enemy Battlers']);
SynrecMC.Battle.maxBattlers = eval(SynrecMC.Battle.Plugins['Max Battle Members']);
SynrecMC.Battle.partyCmd = eval(SynrecMC.Battle.Plugins['Enable Team Command']);
SynrecMC.Battle.swapSkip = eval(SynrecMC.Battle.Plugins['Skip Turn on Swap']);
SynrecMC.Battle.frontActors = eval(SynrecMC.Battle.Plugins['Use Front Facing Actor Sprites']);

SynrecMC.Battle.minLevel = eval(SynrecMC.Battle.Plugins['Global Min Enemy Level']);
SynrecMC.Battle.maxLevel = eval(SynrecMC.Battle.Plugins['Global Max Enemy Level']);

SynrecMC.Battle.teamName = SynrecMC.Battle.Plugins['Team Command Name'];
SynrecMC.Battle.battlingText = SynrecMC.Battle.Plugins['Battling Text'];
SynrecMC.Battle.standbyText = SynrecMC.Battle.Plugins['Stand-By Text'];

SynrecMC.Battle.EnemyReposition = eval(SynrecMC.Battle.Plugins['Enemy Reposition']);
SynrecMC.Battle.ActorStartX = eval(SynrecMC.Battle.Plugins['Actor Sprite Start X']);
SynrecMC.Battle.ActorStartY = eval(SynrecMC.Battle.Plugins['Actor Sprite Start Y']);
SynrecMC.Battle.EnemyStartX = eval(SynrecMC.Battle.Plugins['Enemy Sprite Start X']);
SynrecMC.Battle.EnemyStartY = eval(SynrecMC.Battle.Plugins['Enemy Sprite Start Y']);
SynrecMC.Battle.ActorOffsetX = eval(SynrecMC.Battle.Plugins['Actor Sprite Offset X']);
SynrecMC.Battle.EnemyOffsetX = eval(SynrecMC.Battle.Plugins['Enemy Sprite Offset X']);

SynrecMC.Battle.ActorFwrdX = eval(SynrecMC.Battle.Plugins['Actor Step Forward X']);
SynrecMC.Battle.ActorFwrdY = eval(SynrecMC.Battle.Plugins['Actor Step Forward Y']);
SynrecMC.Battle.ActorFwrdDur = eval(SynrecMC.Battle.Plugins['Actor Step Forward Duration']);

SynrecMC.Battle.SwapAnim = eval(SynrecMC.Battle.Plugins['Swap Animation']);

SynrecMC.Battle.ActorRtrtX = eval(SynrecMC.Battle.Plugins['Actor Retreat X']);
SynrecMC.Battle.ActorRtrtY = eval(SynrecMC.Battle.Plugins['Actor Retreat Y']);
SynrecMC.Battle.ActorRtrtDur = eval(SynrecMC.Battle.Plugins['Actor Retreat Duration']);

BattleManager.setTeamMenu = function(teamMenu){
    this._teamMenu = teamMenu;
}

synrecBMstartBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
    synrecBMstartBattle.call(this);
    this.processActiveMembers();
}

BattleManager.processActiveMembers = function(){
    this._hasActor = true;
    this._hasEnemy = true;
    const setActors = $gameTemp._numBattleActors;
    const setEnemies = $gameTemp._numBattleEnemies;
    this._numActors = setActors ? setActors : SynrecMC.Battle.MaxActorBattler;
    this._numEnemies = setEnemies ? setEnemies : SynrecMC.Battle.MaxEnemyBattler;
    let partyLength = $gameParty._actors.length;
    let enemyLength = $gameTroop._enemies.length;
    $gameParty._actors.forEach(actor => actor.appear());
    if(this._numActors <= partyLength){
        for(i = partyLength - 1; i >= 0; i--){
            if(i >= this._numActors){
                $gameParty._actors[i].hide();
            }else{
                i = 0;
            }
        }
    }
    if(this._numEnemies <= enemyLength){
        for(i = enemyLength - 1; i >= 0; i--){
            if(i >= this._numEnemies){
                $gameTroop._enemies[i].hide();
            }else{
                i = 0;
            }
        }
    }
    $gameTemp._numBattleActors = undefined;
    $gameTemp._numBattleEnemies = undefined;
}

Game_Actor.prototype.performSwap = function(){
    this.hide();
    $gameParty.allMembers()[this._swapId].appear();
    const animTarget = $gameParty.allMembers()[this._swapId];
    const anim = !isNaN(SynrecMC.Battle.SwapAnim) ? SynrecMC.Battle.SwapAnim : 4;
    $gameTemp.requestAnimation([animTarget], anim)
}

SynrecMCGmActIsSprtVis = Game_Actor.prototype.isSpriteVisible;
Game_Actor.prototype.isSpriteVisible = function() {
    if($gameSystem.isSideView()){
        return SynrecMCGmActIsSprtVis.call(this);
    }
    return SynrecMC.Battle.frontActors;
}

synrecGmEnemInit = Game_Enemy.prototype.initialize
Game_Enemy.prototype.initialize = function(enemyId, x, y) {
    synrecGmEnemInit.call(this, enemyId, x, y);
    this.setupActorEnemy();
    this.refresh();
}

Game_Enemy.prototype.setupActorEnemy = function(){
    const enemData = this.enemy();
    const actorId = eval(enemData.meta.captureActor);
    if(actorId > 0 && !isNaN(actorId)){
        this._actor = new Game_Actor(actorId);
        this.setLevel();
        this.recoverAll();
    }else return false;
    this.recoverAll();
}

Game_Enemy.prototype.setLevel = function(){
    const minLevel = $dataMap.meta.minEnemyLevel ? eval($dataMap.meta.minEnemyLevel) : SynrecMC.Battle.minLevel;
    const maxLevel = $dataMap.meta.maxEnemyLevel ? eval($dataMap.meta.maxEnemyLevel) : SynrecMC.Battle.maxLevel;
    if(maxLevel < minLevel)throw new Error("Max level is set less than min level. Please check plugin / map settings.");
    const actorMaxLevel = SynrecMC.Battle.maxLevel;
    const bandWidth = Math.abs(Math.floor(maxLevel - minLevel));
    if(minLevel + bandWidth > actorMaxLevel)throw new Error("Actor maximum level set too low with current settings.");
    this._actor._level = minLevel + Math.floor(Math.random() * bandWidth);
    this._actor.initExp();
    this._actor.initSkills();
    this._level = this._actor._level;
    this._skills = this._actor._skills;
    this._classId = this._actor._classId;
    this._equips = this._actor._equips;
}

Game_Enemy.prototype.equipSlots = function() {
    const slots = [];
    for (let i = 1; i < $dataSystem.equipTypes.length; i++) {
        slots.push(i);
    }
    if (slots.length >= 2 && this.isDualWield()) {
        slots[1] = 1;
    }
    return slots;
}

Game_Enemy.prototype.equips = function() {
    return this._actor._equips.map(item => item.object());
}

Game_Enemy.prototype.currentClass = function() {
    return $dataClasses[this._classId];
}

synrecGmEnemBaseP = Game_Enemy.prototype.paramBase;
Game_Enemy.prototype.paramBase = function(paramId) {
    const blockBaseParam = this.enemy().meta.blockBaseParam;
    const defParamBase = blockBaseParam ? 0 : synrecGmEnemBaseP.call(this, paramId);
    const actorParamBase = this._actor ? this.currentClass().params[paramId][this._level] : 0;
    return defParamBase + actorParamBase;
}

Game_Enemy.prototype.paramPlus = function(paramId) {
    let value = Game_Battler.prototype.paramPlus.call(this, paramId);
    if(this._actor){
        for (const item of this.equips()) {
            if (item) {
                value += item.params[paramId];
            }
        }
    }
    return value;
}

synrecGmEnemTransform = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function(enemyId) {
    synrecGmEnemTransform.call(this, enemyId);
    this.setupActorEnemy();
}

Game_Enemy.prototype.performSwap = function(){
    this.hide();
    $gameTroop.members()[this._swapId].appear();
    const animTarget = $gameTroop.members()[this._swapId];
    const anim = !isNaN(SynrecMC.Battle.SwapAnim) ? SynrecMC.Battle.SwapAnim : 4;
    $gameTemp.requestAnimation([animTarget], anim)
}

synrecGmEnemMkActions = Game_Enemy.prototype.makeActions;
Game_Enemy.prototype.makeActions = function() {
    if(this._actor){
        Game_Battler.prototype.makeActions.call(this);
        if(this.numActions() > 0){
            const skillList = this._skills;
            this.selectSkill(skillList);
        }
        this.setActionState("waiting");
    }else{
        synrecGmEnemMkActions.call(this);
    }
}

Game_Enemy.prototype.selectSkill = function(list){
    let skillActArr = [];
    const tpMaxSkill = eval(this.enemy().meta.tpMaxSkill);
    if(this._tp >= 100 && tpMaxSkill){
        let skillId = tpMaxSkill;
        let skillData = $dataSkills[skillId];
        let skillType = skillData.damage.type;
        let skillObj = {skillId:skillId, skillType:skillType, conditionParam1:0, conditionParam2:0};
        skillActArr = [skillObj];
    }else{
        for(sk = 0; sk < list.length; sk++){
            if(!isNaN(list[sk])){
                let skillId = list[sk];
                let skillData = $dataSkills[skillId];
                let skillType = skillData.damage.type;
                let skillObj = {skillId:skillId, skillType:skillType, conditionParam1:0, conditionParam2:0};
                skillActArr.push(skillObj);
            }
        }
    }
    this.setupSkillAction(skillActArr);
}

Game_Enemy.prototype.setupSkillAction = function(list){
    const enemyCritHpPerc = this.enemy().meta.critHp ? eval(this.enemy().meta.critHp) : 0.3;
    const enemyCritMpPerc = this.enemy().meta.critMp ? eval(this.enemy().meta.critMp) : 0.3;
    const enemyCritTpPerc = this.enemy().meta.critTp ? eval(this.enemy().meta.critTp) : 0.7;
    const hpRatio = this._hp / this.param(0);
    const mpRatio = this._mp / this.param(1);
    const tpRatio = this._tp / this.maxTp();
    if(list.length > 1){
        let healHpList = [];
        let healMpList = [];
        let dmgHpList = [];
        let dmgMpList = [];
        let supportList = [];
        for(h = 0; h < list.length; h++){
            const healHpType = [3, 5];
            const healMpType = [4, 6];
            const dmgHpType = [1, 5];
            const dmgMpType = [2, 6];
            const supportType = [0];
            let skillId = list[h]['skillId'];
            let canUseSkill = this.canUse($dataSkills[skillId]);
            if(canUseSkill){
                if(healHpType.includes(list[h]['skillType'])){
                    healHpList.push(list[h]);
                }
                if(healMpType.includes(list[h]['skillType'])){
                    healMpList.push(list[h]);
                }
                if(dmgHpType.includes(list[h]['skillType'])){
                    dmgHpList.push(list[h]);
                }
                if(dmgMpType.includes(list[h]['skillType'])){
                    dmgMpList.push(list[h]);
                }
                if(supportType.includes(list[h]['skillType'])){
                    supportList.push(list[h]);
                }
            }else{
                list.splice(h, 1);
                h--;
            }
        }
        if(tpRatio > enemyCritTpPerc){
            list = supportList.length > 0 ? supportList : list;
        }
        if(mpRatio < enemyCritMpPerc){
            list = healMpList.length > 0 ? healMpList : list;
        }
        if(hpRatio < enemyCritHpPerc){
            list = healHpList.length > 0 ? healHpList : list;
        }
        const dmgArr = dmgHpList.concat(dmgMpList);
        if(hpRatio > enemyCritHpPerc && mpRatio > enemyCritMpPerc){
            list = dmgArr;
        }
    }
    for(i = 0; i < this.numActions(); i++){
        let listIndex = Math.floor(Math.random() * list.length);
        let listItem = list[listIndex];
        this.action(i).setEnemyAction(listItem);
    }
}

synrecGmPtyMaxBattleMembers = Game_Party.prototype.maxBattleMembers
Game_Party.prototype.maxBattleMembers = function() {
    return SynrecMC.Battle.maxBattlers ? SynrecMC.Battle.maxBattlers : synrecGmPtyMaxBattleMembers.call(this);
}

synrecGmPartyAddActor = Game_Party.prototype.addActor
Game_Party.prototype.addActor = function(actorId, level, hp, mp, gender){
    synrecGmPartyAddActor.call(this, actorId, level, hp, mp, gender);
    if($gameParty.inBattle()){
        const numActorBattlers = BattleManager._numActors;
        if($gameParty.aliveMembers().length >= numActorBattlers){
            const kaca = $gameParty.aliveMembers().length - numActorBattlers;
            for(qi = 0; qi < kaca; qi++){
                let lastAddedIndex = $gameParty._actors.length - 1;
                let actorAdded = $gameParty._actors[lastAddedIndex];
                actorAdded.hide();
            }
        }
    }
    $gameParty.refresh();
}

SynrecMCBCSprtActUdtBitmap = Sprite_Actor.prototype.updateBitmap;
Sprite_Actor.prototype.updateBitmap = function() {
    if(this._battler){
        const actorData = this._battler.actor();
        const frontBitmap = actorData.meta.battlerBitmap;
        if(frontBitmap && this._frontName != frontBitmap){
            this._frontName = frontBitmap;
            this._frontBitmap = ImageManager.loadfrontActor(frontBitmap);
            this._mainSprite.bitmap = this._frontBitmap;
        }else if(!frontBitmap){
            this._frontBitmap = undefined;
            SynrecMCBCSprtActUdtBitmap.call(this);
        }
    }else if(!this._battler){
        SynrecMCBCSprtActUdtBitmap.call(this);
    }
}

SynrecMCBCSprtActUdtFrame = Sprite_Actor.prototype.updateFrame;
Sprite_Actor.prototype.updateFrame = function() {
    if(this._frontBitmap)return;
    SynrecMCBCSprtActUdtFrame.call(this);
}

SynrecMCBCSprtActMovToStrtPos = Sprite_Actor.prototype.moveToStartPosition;
Sprite_Actor.prototype.moveToStartPosition = function() {
    if(!SynrecMC.Battle.frontActors || $dataSystem.optSideView){
        SynrecMCBCSprtActMovToStrtPos.call(this);
    }
}

SynrecMCBCSprtActSetActHm = Sprite_Actor.prototype.setActorHome;
Sprite_Actor.prototype.setActorHome = function(index) {
    if(!SynrecMC.Battle.frontActors || $dataSystem.optSideView){
        SynrecMCBCSprtActSetActHm.call(this, index);
    }else{
        const startX = !isNaN(SynrecMC.Battle.ActorStartX) ? SynrecMC.Battle.ActorStartX : 64;
        const startY = !isNaN(SynrecMC.Battle.ActorStartY) ? SynrecMC.Battle.ActorStartY : Graphics.height / 2;
        const separation = !isNaN(SynrecMC.Battle.ActorOffsetX) ? SynrecMC.Battle.ActorOffsetX : 12;
        let trueX = startX + ((startX + separation) * index);
        let trueY = startY
        this.setHome(trueX, trueY);
    }
}

SynrecMCBCSprtActStpFrwd = Sprite_Actor.prototype.stepForward;
Sprite_Actor.prototype.stepForward = function() {
    if(!SynrecMC.Battle.frontActors || $dataSystem.optSideView){
        SynrecMCBCSprtActStpFrwd.call(this);
    }else if(!$dataSystem.optSideView){
        const x = !isNaN(SynrecMC.Battle.ActorFwrdX) ? SynrecMC.Battle.ActorFwrdX : -48;
        const y = !isNaN(SynrecMC.Battle.ActorFwrdY) ? SynrecMC.Battle.ActorFwrdY : 0;
        const dur = !isNaN(SynrecMC.Battle.ActorFwrdDur) ? SynrecMC.Battle.ActorFwrdDur : 12;
        this.startMove(x, y, dur);
    }
}

SynrecMCBCSprtActStpBck = Sprite_Actor.prototype.stepBack;
Sprite_Actor.prototype.stepBack = function() {
    if(!SynrecMC.Battle.frontActors || $dataSystem.optSideView){
        SynrecMCBCSprtActStpBck.call(this);
    }else if(!$dataSystem.optSideView){
        this.startMove(0, 0, SynrecMC.Battle.ActorFwrdDur);
    }
}

SynrecMCBCSprtActRetreat = Sprite_Actor.prototype.retreat;
Sprite_Actor.prototype.retreat = function() {
    if(!SynrecMC.Battle.frontActors || $dataSystem.optSideView){
        SynrecMCBCSprtActRetreat.call(this);
    }else if(!$dataSystem.optSideView){
        const x = !isNaN(SynrecMC.Battle.ActorRtrtX) ? SynrecMC.Battle.ActorRtrtX : 300;
        const y = !isNaN(SynrecMC.Battle.ActorRtrtY) ? SynrecMC.Battle.ActorRtrtY : 0;
        const dur = !isNaN(SynrecMC.Battle.ActorRtrtDur) ? SynrecMC.Battle.ActorRtrtDur : 30;
        this.startMove(x, y, dur);
    }
}

SynrecMCBCSprtSetBattUpdt = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    SynrecMCBCSprtSetBattUpdt.call(this);
    this.updateEnemySort();
    this.updateActorSort();
}

Spriteset_Battle.prototype.updateEnemySort = function(){
    this._enemySprites.sort(this.compareSprites.bind(this, true))
}

Spriteset_Battle.prototype.updateActorSort = function(){
    this._actorSprites.sort(this.compareSprites.bind(this, false))
}

Spriteset_Battle.prototype.compareSprites = function(a, b, reverse){
    var ySizeA = a.y + a.height;
    var ySizeB = b.y + b.height;
    if(ySizeA != ySizeB){
        return reverse ? ySizeA - ySizeB : ySizeB - ySizeA;
    }else{
        return b.spriteId - a.spriteId
    }
}

SynrecMCBCSprtSetBattCrtEnem = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function() {
    SynrecMCBCSprtSetBattCrtEnem.call(this);
    if(SynrecMC.Battle.EnemyReposition && (SynrecMC.Battle.frontActors && !$dataSystem.optSideView)){
        this.performEnemyReposition();
    }
}

SynrecMCBCSprtSetBattCrtAct = Spriteset_Battle.prototype.createActors;
Spriteset_Battle.prototype.createActors = function() {
    SynrecMCBCSprtSetBattCrtAct.call(this);
    if(!$gameSystem.isSideView()){
        this._actorSprites = [];
        if(SynrecMC.Battle.frontActors && !$dataSystem.optSideView){
            for(i = 0; i < $gameParty.maxBattleMembers(); i++){
                const sprite = new Sprite_Actor();
                this._actorSprites.push(sprite);
                this._battleField.addChild(sprite);
            }
        }
    }else{
        SynrecMCBCSprtSetBattCrtAct.call(this);
    }
}

Spriteset_Battle.prototype.performEnemyReposition = function(){
    const startX = !isNaN(SynrecMC.Battle.EnemyStartX) ? SynrecMC.Battle.EnemyStartX : 64;
    const startY = !isNaN(SynrecMC.Battle.EnemyStartY) ? SynrecMC.Battle.EnemyStartY : Graphics.height / 2;
    const separation = !isNaN(SynrecMC.Battle.EnemyOffsetX) ? SynrecMC.Battle.EnemyOffsetX : 12;
    for(pos = 0; pos < this._enemySprites.length; pos++){
        let posRight = pos % 2 ? false : true;
        let mult = Math.floor(pos / 2);
        let trueX = posRight ? startX + (separation * mult) : startX - (separation * mult);
        if(trueX < 0)trueX = 0;
        if(trueX > Graphics.width)trueX = Graphics.width;
        let trueY = startY
        this._enemySprites[pos].setHome(trueX, trueY);
    }
}

Scene_Battle.prototype.updateAutoAction = function(){
    if(!this._actorCommandWindow.active)return;
    if(this._autoAction == 'guard'){
        if(BattleManager.actor()){
            this.commandGuard();
        }
    }
}

synrecScnBatCreateAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    synrecScnBatCreateAllWindows.call(this);
    this.createSwapWindow();
}

Scene_Battle.prototype.createSwapWindow = function(){
    const w = this._statusWindow.width;
    const h = this._statusWindow.height;
    const x = this._statusWindow.x;
    const y = this._statusWindow.y;
    const rect = new Rectangle(x, y, w, h);
    this._swapWindow = new Window_BattleSwap(rect);
    this._swapWindow.setHandler('ok', this.triggerSwap.bind(this));
    this._swapWindow.setHandler('cancel', this.cancelSwap.bind(this));
    this._swapWindow.hide();
    this._swapWindow.refresh();
    this.addWindow(this._swapWindow);
}

synrecScnBatIsAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
Scene_Battle.prototype.isAnyInputWindowActive = function() {
    return (
        synrecScnBatIsAnyInputWindowActive.call(this) ||
        this._swapWindow.active
    );
}

Scene_Battle.prototype.swapBattler = function(){
    this._swapWindow.refresh();
    this._swapWindow.show();
    this._swapWindow.activate();
}

Scene_Battle.prototype.triggerSwap = function(){
    const index = this._swapWindow.index();
    if(isNaN(index) || index < 0 || !$gameParty._actors[index]){
        SoundManager.playBuzzer();
        this._swapWindow.show();
        this._swapWindow.activate();
        this._swapWindow.refresh();
        this.refreshAllSprites();
        return;
    }
    if($gameParty._actors[index] == BattleManager.actor() || $gameParty._actors[index].isAppeared() || $gameParty._actors[index]._hp <= 0){
        SoundManager.playBuzzer();
        this._swapWindow.show();
        this._swapWindow.activate();
        this._swapWindow.refresh();
        this.refreshAllSprites();
        return;
    }else{
        SoundManager.playOk();
        BattleManager.actor()._swapId = index;
        BattleManager.actor().action(0).setGuard();
        this._swapWindow.hide();
        this._swapWindow.deactivate();
        this._swapWindow.refresh();
        this.selectNextCommand();
        return;
    }
}

Scene_Battle.prototype.refreshAllSprites = function(){
    let actors = this._spriteset._actorSprites;
    for(act = 0; act < actors.length; act++){
        let actor = actors[act];
        let battler = actor._battler;
        if(battler && SynrecMC.GenderTraits){
            actor.setGendHex(battler);
            actor.setGendFilter(battler);
        }
        actor._updateColorFilter();
    }
}

Scene_Battle.prototype.cancelSwap = function(){
    this._swapWindow.hide();
    this._swapWindow.deactivate();
    this.changeInputWindow();
}

synrecScnBattHdSubInptWin = Scene_Battle.prototype.hideSubInputWindows;
Scene_Battle.prototype.hideSubInputWindows = function() {
    synrecScnBattHdSubInptWin.call(this);
    this._swapWindow.hide();
    this._swapWindow.deactivate();
}

synrecScnBattSelcPrvCmd = Scene_Battle.prototype.selectPreviousCommand;
Scene_Battle.prototype.selectPreviousCommand = function() {
    synrecScnBattSelcPrvCmd.call(this);
    if(BattleManager.actor())BattleManager.actor()._swapId = undefined;
}

Window_BattleLog.prototype.performSwap = function(subject) {
    subject.performSwap();
    subject._swapId = undefined;
}

synrecWinBattLogStrtAction = Window_BattleLog.prototype.startAction;
Window_BattleLog.prototype.startAction = function(subject, action, targets) {
    if(!isNaN(subject._swapId)){
        if(subject.isActor()){
            const anim = !isNaN(SynrecMC.Battle.SwapAnim) ? SynrecMC.Battle.SwapAnim : 4;
            const targetSwap = $gameParty.allMembers()[subject._swapId];
            this.push("performActorSwap", subject);
            this.push("showAnimation", subject, [targetSwap], anim);
            this.push("clear");
            this.push("performActionEnd", subject);
            this.push("clear");
            this.push("performActionEnd", targetSwap);
        }
        return;
    }
    synrecWinBattLogStrtAction.call(this, subject, action, targets);
}

Window_BattleLog.prototype.performActorSwap = function(subject){
    subject.performSwap();
    subject._swapId = undefined;
}

synrecWinBattLogEndAction = Window_BattleLog.prototype.endAction;
Window_BattleLog.prototype.endAction = function(subject) {
    synrecWinBattLogEndAction.call(this, subject);
    this.push("checkForDeathSwap");
}

Window_BattleLog.prototype.checkForDeathSwap = function(){
    const anim = !isNaN(SynrecMC.Battle.SwapAnim) ? SynrecMC.Battle.SwapAnim : 4;
    $gameParty.allMembers().forEach((member)=>{
        if(!member._hidden && member._hp <= 0){
            for(let i = 0; i < $gameParty.allMembers().length; i++){
                let mem = $gameParty.allMembers()[i];
                if(member != mem){
                    if(mem._hp > 0){
                        member._swapId = i;
                        member.performSwap();
                        this.push("showAnimation", member, [mem], anim);
                        member._swapId = undefined;
                        break;
                    }
                }
            }
        }
    })
    $gameTroop.members().forEach((member)=>{
        if(member._hp <= 0 && !member._hidden){
            for(let i = 0; i < $gameTroop.members().length; i++){
                let mem = $gameTroop.members()[i];
                if(member != mem){
                    if(mem._hp > 0){
                        member._swapId = i;
                        member.performSwap();
                        member._swapId = undefined;
                        break;
                    }
                }
            }
        }
    })
}

synrecWinActCmdMakeCommandList = Window_ActorCommand.prototype.makeCommandList;
Window_ActorCommand.prototype.makeCommandList = function() {
    if (this._actor) {
        synrecWinActCmdMakeCommandList.call(this);
        if(SynrecMC.Battle.partyCmd)this.addSwapCommand();
    }
}

Window_ActorCommand.prototype.addSwapCommand = function(){
    this.addCommand(SynrecMC.Battle.teamName, 'party');
    let scene = SceneManager._scene;
    this.setHandler('party', scene.swapBattler.bind(scene));
}

function Window_BattleSwap(){
    this.initialize(...arguments);
}

Window_BattleSwap.prototype = Object.create(Window_Selectable.prototype);
Window_BattleSwap.prototype.constructor = Window_BattleSwap;

Window_BattleSwap.prototype.maxCols = function() {
    return $gameParty.maxBattleMembers() ? $gameParty.maxBattleMembers() : 4;
}

Window_BattleSwap.prototype.maxItems = function() {
    return $gameParty.maxBattleMembers() ? $gameParty.maxBattleMembers() : 4;
}

Window_BattleSwap.prototype.update = function(){
    Window_Selectable.prototype.update.call(this);
    this.updateData();
}

Window_BattleSwap.prototype.updateData = function(){
    this._data = $gameParty._actors;
    this.refresh();
}

Window_BattleSwap.prototype.drawItem = function(index){
    if(!this._data)return;
    const iconSize = Math.max(ImageManager.iconWidth, ImageManager.iconHeight);
    const faceSize = Math.max(ImageManager.faceWidth, ImageManager.faceHeight);
    const actor = this._data[index];
    const rect = this.itemRect(index);
    if(actor){
        if(actor.isDead()){
            this.changeTextColor(ColorManager.customColor('#ffbbbb'));
        }else if(actor.isDying()){
            this.changeTextColor(ColorManager.customColor('#ffffbb'));
        }else{
            this.resetTextColor();
        }
        const faceName = actor._faceName;
        const faceIndex = actor._faceIndex;
        this.drawFace(faceName, faceIndex, rect.x + 3, rect.y + 3, 144, 36);
        const name = actor._name;
        this.drawText(name, rect.x + iconSize, rect.y + 40, rect.width - iconSize + 4);
        const level = actor._level;
        const levelText = TextManager.levelA;
        this.drawText(`${levelText} ${level}`, rect.x, rect.y, rect.width, 'right');
        const gender = actor._gender;
        const genderIcon = () =>{
            let genders = SynrecMC.genders;
            for(genIdx = 0; genIdx < genders.length; genIdx++){
                if(genders[genIdx]['Gender Name'] == gender){
                    return genders[genIdx]['Gender Icon'];
                }
            }
            return 0;
        }
        this.drawIcon(genderIcon(), rect.x + 2, rect.y + 40);
        this.drawResourceGauges(actor, rect);
        if(actor.isAppeared()){
            this.drawText(SynrecMC.Battle.battlingText, rect.x, rect.y + 140, rect.width, 'center');
        }else{
            this.drawText(SynrecMC.Battle.standbyText, rect.x, rect.y + 140, rect.width, 'center');
        }
    }
}

Window_BattleSwap.prototype.drawResourceGauges = function(actor, rect){
    const currentHp = actor._hp;
    const currentMp = actor._mp;
    const currentTp = actor._tp;
    const maxHp = actor.param(0);
    const maxMp = actor.param(1);
    const maxTp = actor.maxTp();
    this.drawHpGuage(currentHp, maxHp, rect);
    this.drawMpGuage(currentMp, maxMp, rect);
    this.drawTpGuage(currentTp, maxTp, rect);
}

Window_BattleSwap.prototype.drawHpGuage = function(current, max, rect){
    const ratio = current / max;
    const width = rect.width - 6;
    const fillW = width * ratio;
    const x = rect.x + 3;
    const y = rect.y + 76;
    this.contents.fillRect(x, y, width, 12, '#000000');
    this.contents.gradientFillRect(x + 2, y + 2, fillW, 10, ColorManager.hpGaugeColor1(), ColorManager.hpGaugeColor2());
}

Window_BattleSwap.prototype.drawMpGuage = function(current, max, rect){
    const ratio = current / max;
    const width = rect.width - 6;
    const fillW = width * ratio;
    const x = rect.x + 3;
    const y = rect.y + 90;
    this.contents.fillRect(x, y, width, 12, '#000000');
    this.contents.gradientFillRect(x + 2, y + 2, fillW, 10, ColorManager.mpGaugeColor1(), ColorManager.mpGaugeColor2());
}

Window_BattleSwap.prototype.drawTpGuage = function(current, max, rect){
    const ratio = current / max;
    const width = rect.width - 6;
    const fillW = width * ratio;
    const x = rect.x + 3;
    const y = rect.y + 104;
    this.contents.fillRect(x, y, width, 12, '#000000');
    this.contents.gradientFillRect(x + 2, y + 2, fillW, 10, ColorManager.tpGaugeColor1(), ColorManager.tpGaugeColor2());
}