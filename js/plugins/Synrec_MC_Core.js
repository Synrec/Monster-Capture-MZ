/*:@author Synrec/Kylestclr
 * @target MZ
 * @url https://synrec.itch.io
 * @plugindesc v4.0 An enemy capture system
 *
 * @help
 * This plugin allows you to set capturable enemies by designating an actor
 * ID result.
 * 
 * What the above means is that when an enemy is captured, you gain the related
 * actor.
 * 
 * TERMS OF USE:
 * - You may not use this plugin as a means to steal assets or resources.
 * This includes making fan games with the intent of monetary profit.
 * - You may use this plugin in games intended for release (free or commercial)
 * provided credit is given to Synrec/Kylestclr
 * - You may NOT use this plugin for educational purposes nor as a means to
 * provide public tutoring or any other use case which is not solely for
 * releasing a game.
 * - Do not use this plugin as a means of harassment in any way.
 *
 * Use $gameParty._actors[x]._teamLock = true to lock an actor at index x
 * in the party.
 * 
 * The first actor in the party begins at 0.
 * 
 * 
 * 
 * [Actor Note Tags]
 * -- <genderArray:[gender, gender, gender...]>
 * >> A list of genders the actor is capable of having.
 * >>> Please use the name of the gender set in the plugin parameters
 * 
 * [Enemy Note Tags]
 * -- <captureActor: actorId>
 * >> Syncs the enemy data to the actor data (initial level)
 * >>> Syncs equipment data for the actor as well.
 * >> Must be set to capture the enemy.
 * >>> This number must correspond to the actor ID NOT the enemy ID
 * 
 * -- <hpBonus: number>
 * >> Must be a number between 1 and 255
 * >>> Default value is 255
 * >> Grants bonus to capture rate based on HP
 * 
 * -- <mpBonus: number>
 * >> Must be a number between 1 and 255
 * >>> Default value is 255
 * >> Grants bonus to capture rate based on MP
 * 
 * -- <tpBonus: number>
 * >> Must be a number between 1 and 255
 * >>> Default value is 255
 * >> Grants bonus to capture rate based on TP
 * 
 * -- <blockCaptureState: stateId>
 * >> If battler is affected by state, capture blocked.
 * 
 * -- <allowCaptureState: stateId>
 * >> If battler is affected by state, capture allowed.
 * >> If battler is not affected by state, capture blocked.
 * >>> Capture can only be allowed if battler is affected by state.
 * 
 * [Skill/Item Note Tags]
 * -- <captureRate: number>
 * >> Must be a number between 1 and 255
 * >>> 255 = Guaranteed capture
 * >>> Using as <captureRate> uses default rate
 * 
 * You can access the reserve box in game by using the script call:
 * -- SceneManager.push(Scene_RsvpBox)
 * >> Opens reserve box scene
 * 
 * Each actor is its own instance and as such, to access a specific
 * actor, you need to use a specific script call:
 * -- $gameParty._actors[x]
 * >> x refers to the party position of the actor, begins at 0.
 * 
 * To find a particular actor, you need to have a javascript variable
 * be equal to the array find function:
 * -- const partyMember = $gameParty._actors.find((actor)=>{
 *  return actor._actorId == actorId
 * })
 * >> actorId refers to the ID of the actor you are trying to find.
 * >> This will return the first instance of the actor
 * >> Use findAll to return an array of all matching actors.
 * >>> You need javascript knowledge to learn how to handle arrays.
 * 
 * @param Gameplay
 * 
 * @param Lock Initial Actor
 * @desc Locks initial actors to player party. Can't put them in reserve box.
 * @type boolean
 * @default false
 * @parent Gameplay
 * 
 * @param Follower Limit
 * @parent Gameplay
 * @desc Number of followers for player.
 * @type number
 * @default 0
 * 
 * @param Max Rename Characters
 * @parent Gameplay
 * @desc Maximum number of characters for rename
 * @type number
 * @default 8
 * 
 * @param Base Item Capture
 * @parent Gameplay
 * @desc Capture rate (1 ~255) if not defined.
 * @type number
 * @default 100
 * @min 1
 * @max 255
 * 
 * @param Genders
 * @parent Gameplay
 * @desc Array of all genders possible in game, first is default.
 * @type struct<Gender>[]
 * @default []
 * 
 * @param Capture Success Animation
 * @parent Gameplay
 * @desc Animation that plays when enemy capture is successful
 * @type animation
 * @default 3
 * 
 * @param Capture Failure Animation
 * @parent Gameplay
 * @desc Animation that plays when enemy capture is failed
 * @type animation
 * @default 4
 * 
 * @param Perma Death
 * @parent Gameplay
 * @desc If party member dies, they are permanently deleted.
 * @type boolean
 * @default false
 * 
 * @param Number of Reserve Boxes
 * @parent Gameplay
 * @desc Maximum number of reserve boxes for actors
 * @type number
 * @default 10
 * 
 * @param Reserve Box Size
 * @parent Gameplay
 * @desc Max number of actors of each reserve box
 * @type number
 * @default 30
 * 
 * @param UI
 * 
 * @param Capture Success Text
 * @desc Text for capture success, %1 = Target name.
 * @type text
 * @default %1 has been captured!
 * @parent UI
 * 
 * @param Team Box Name
 * @desc Name of Team Box.
 * @type text
 * @default Monsters
 * @parent UI
 * 
 * @param Reserve Scene Background
 * @desc background image for reserve box
 * @dir img/backgrounds
 * @type file
 * @parent UI
 * 
 * @param Icon Index
 * @desc Mondify Parameter Icons
 * @parent UI
 * 
 * @param Param Icons
 * @parent Icon Index
 * 
 * @param HP Icon
 * @desc Icon Index for HP
 * @type number
 * @default 32
 * @parent Param Icons
 * 
 * @param MP Icon
 * @desc Icon Index for HP
 * @type number
 * @default 33
 * @parent UI
 * @parent Param Icons
 * 
 * @param TP Icon
 * @desc Icon Index for HP
 * @type number
 * @default 82
 * @parent UI
 * @parent Param Icons
 * 
 * @param ATK Icon
 * @desc Icon Index for HP
 * @type number
 * @default 34
 * @parent Param Icons
 * 
 * @param DEF Icon
 * @desc Icon Index for HP
 * @type number
 * @default 35
 * @parent Param Icons
 * 
 * @param MAT Icon
 * @desc Icon Index for HP
 * @type number
 * @default 36
 * @parent Param Icons
 * 
 * @param MDF Icon
 * @desc Icon Index for HP
 * @type number
 * @default 37
 * @parent Param Icons
 * 
 * @param AGI Icon
 * @desc Icon Index for HP
 * @type number
 * @default 38
 * @parent Param Icons
 * 
 * @param LUK Icon
 * @desc Icon Index for HP
 * @type number
 * @default 39
 * @parent Param Icons
 * 
 * @param ExParam Icons
 * @parent Icon Index
 * 
 * @param Hit Rate Icon
 * @desc Icon Index for hit rate
 * @type number
 * @default 119
 * @parent ExParam Icons
 * 
 * @param Evasion Rate Icon
 * @desc Icon Index for hit rate
 * @type number
 * @default 82
 * @parent ExParam Icons
 * 
 * @param Critical Rate Icon
 * @desc Icon Index for hit rate
 * @type number
 * @default 87
 * @parent ExParam Icons
 * 
 * @param Critical Evasion Icon
 * @desc Icon Index for hit rate
 * @type number
 * @default 139
 * @parent ExParam Icons
 * 
 * @param Magic Evasion Icon
 * @desc Icon Index for hit rate
 * @type number
 * @default 71
 * @parent ExParam Icons
 * 
 * @param Magic Reflection Icon
 * @desc Icon Index for hit rate
 * @type number
 * @default 129
 * @parent ExParam Icons
 * 
 * @param Counter Rate Icon
 * @desc Icon Index for hit rate
 * @type number
 * @default 77
 * @parent ExParam Icons
 * 
 * @param HP Regen Icon
 * @desc Icon Index for hit rate
 * @type number
 * @default 40
 * @parent ExParam Icons
 * 
 * @param MP Regen Icon
 * @desc Icon Index for hit rate
 * @type number
 * @default 41
 * @parent ExParam Icons
 * 
 * @param TP Regen Icon
 * @desc Icon Index for hit rate
 * @type number
 * @default 80
 * @parent ExParam Icons
 * 
 * @param SpParam Icons
 * @parent Icon Index
 * 
 * @param Target Rate Icon
 * @desc Icon Index for target rate
 * @type number
 * @default 75
 * @parent SpParam Icons
 * 
 * @param Guard Rate Icon
 * @desc Icon Index for guard rate
 * @type number
 * @default 75
 * @parent SpParam Icons
 * 
 * @param Recovery Rate Icon
 * @desc Icon Index for guard rate
 * @type number
 * @default 75
 * @parent SpParam Icons
 * 
 * @param Pharmacoloy Rate Icon
 * @desc Icon Index for guard rate
 * @type number
 * @default 75
 * @parent SpParam Icons
 * 
 * @param MP Cost Rate Icon
 * @desc Icon Index for guard rate
 * @type number
 * @default 75
 * @parent SpParam Icons
 * 
 * @param TP Charge Rate Icon
 * @desc Icon Index for guard rate
 * @type number
 * @default 75
 * @parent SpParam Icons
 * 
 * @param Physical Damage Effectiveness Icon
 * @desc Icon Index for guard rate
 * @type number
 * @default 75
 * @parent SpParam Icons
 * 
 * @param Magical Damage Effectiveness Icon
 * @desc Icon Index for guard rate
 * @type number
 * @default 75
 * @parent SpParam Icons
 * 
 * @param Floor Damage Effectiveness Icon
 * @desc Icon Index for guard rate
 * @type number
 * @default 75
 * @parent SpParam Icons
 * 
 * @param EXP Rate Icon
 * @desc Icon Index for guard rate
 * @type number
 * @default 75
 * @parent SpParam Icons
 * 
 * @param Non-Player Actor
 * @type boolean
 * @default true
 * @desc Parameters for modifying non-battler
 * 
 * @param Character Sheet File
 * @desc Character Sheet to use for non-battler player
 * @type file
 * @default Actor1
 * @dir img/characters
 * @parent Non-Player Actor
 * 
 * @param Character Sheet Index
 * @desc Character Sheet to use for non-battler player
 * @type number
 * @min 0
 * @max 7
 * @default 0
 * @parent Non-Player Actor
 * 
 */

 /*~struct~Gender:
 * @param Gender Name
 * @type text
 * @desc Name of gender
 *
 * @param Gender Icon
 * @type number
 * @desc Icon Index of Gender (0 for no icon)
 * 
 * @param Ex Param Mod
 * @desc Requires add-on script
 * 
 * @param Hit Rate
 * @desc 
 * @type number
 * @decimals 2
 * @min -1
 * @max 1
 * @default 0
 * @parent Ex Param Mod
 * 
 * @param Evasion Rate
 * @type number
 * @decimals 2
 * @min -1
 * @max 1
 * @default 0
 * @parent Ex Param Mod
 * 
 * @param Critical Rate
 * @type number
 * @decimals 2
 * @min -1
 * @max 1
 * @default 0
 * @parent Ex Param Mod
 * 
 * @param Critical Evasion
 * @type number
 * @decimals 2
 * @min -1
 * @max 1
 * @default 0
 * @parent Ex Param Mod
 * 
 * @param Magic Evasion
 * @type number
 * @decimals 2
 * @min -1
 * @max 1
 * @default 0
 * @parent Ex Param Mod
 * 
 * @param Magic Reflection
 * @type number
 * @decimals 2
 * @min -1
 * @max 1
 * @default 0
 * @parent Ex Param Mod
 * 
 * @param Counter Attack
 * @type number
 * @decimals 2
 * @min -1
 * @max 1
 * @default 0
 * @parent Ex Param Mod
 * 
 * @param HP Regen
 * @type number
 * @decimals 2
 * @min -1
 * @max 1
 * @default 0
 * @parent Ex Param Mod
 * 
 * @param MP Regen
 * @type number
 * @decimals 2
 * @min -1
 * @max 1
 * @default 0
 * @parent Ex Param Mod
 * 
 * @param TP Regen
 * @type number
 * @decimals 2
 * @min -1
 * @max 1
 * @default 0
 * @parent Ex Param Mod
 * 
 * @param Sp Param Mod
 * @desc Requires Add-on script
 * 
 * @param Target Rate
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 1
 * @parent Sp Param Mod
 * 
 * @param Guard Effect
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 1
 * @parent Sp Param Mod
 * 
 * @param Recovery Effect
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 1
 * @parent Sp Param Mod
 * 
 * @param Pharmacology
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 1
 * @parent Sp Param Mod
 * 
 * @param MP Cost Rate
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 1
 * @parent Sp Param Mod
 * 
 * @param TP Charge Rate
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 1
 * @parent Sp Param Mod
 * 
 * @param Physical Damage
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 1
 * @parent Sp Param Mod
 * 
 * @param Magical Damage
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 1
 * @parent Sp Param Mod
 * 
 * @param Floor Damage
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 1
 * @parent Sp Param Mod
 * 
 * @param Experience
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @default 1
 * @parent Sp Param Mod
 */


let SynrecMC = {};

SynrecMC.Plugins = PluginManager.parameters('Synrec_MC_Core');

SynrecMC.playerChar = eval(SynrecMC.Plugins['Non-Battler Player']);
SynrecMC.lockActors = eval(SynrecMC.Plugins['Lock Initial Actor']);
SynrecMC.followerLimit = eval(SynrecMC.Plugins['Follower Limit']);
SynrecMC.baseCapture = eval(SynrecMC.Plugins['Base Item Capture']);
SynrecMC.MaxNameChars = eval(SynrecMC.Plugins['Max Rename Characters']);

SynrecMC.successCaptureAnim = eval(SynrecMC.Plugins['Capture Success Animation']);
SynrecMC.failCaptureAnim = eval(SynrecMC.Plugins['Capture Failure Animation']);
SynrecMC.permaDeath = eval(SynrecMC.Plugins['Perma Death']);
SynrecMC.numberReserveBoxes = eval(SynrecMC.Plugins['Number of Reserve Boxes']);
SynrecMC.sizeReserveBoxes = eval(SynrecMC.Plugins['Reserve Box Size']);
SynrecMC.permaDeath = eval(SynrecMC.Plugins['Perma Death']);

try{
    SynrecMC.genders = JSON.parse(SynrecMC.Plugins['Genders']);
    for(gend = 0; gend < SynrecMC.genders.length; gend++){
        if(SynrecMC.genders[gend]){   
            SynrecMC.genders[gend] = JSON.parse(SynrecMC.genders[gend]); 
            SynrecMC.genders[gend]['Gender Name'] = SynrecMC.genders[gend]['Gender Name'].toLowerCase();
            SynrecMC.genders[gend]['Gender Icon'] = eval(SynrecMC.genders[gend]['Gender Icon']);
            SynrecMC.genders[gend]['Hit Rate'] = eval(SynrecMC.genders[gend]['Hit Rate']);
            SynrecMC.genders[gend]['Evasion Rate'] = eval(SynrecMC.genders[gend]['Evasion Rate']);
            SynrecMC.genders[gend]['Critical Rate'] = eval(SynrecMC.genders[gend]['Critical Rate']);
            SynrecMC.genders[gend]['Critical Evasion'] = eval(SynrecMC.genders[gend]['Critical Evasion']);
            SynrecMC.genders[gend]['Magic Evasion'] = eval(SynrecMC.genders[gend]['Magic Evasion']);
            SynrecMC.genders[gend]['Magic Reflection'] = eval(SynrecMC.genders[gend]['Magic Reflection']);
            SynrecMC.genders[gend]['Counter Attack'] = eval(SynrecMC.genders[gend]['Counter Attack']);
            SynrecMC.genders[gend]['HP Regen'] = eval(SynrecMC.genders[gend]['HP Regen']);
            SynrecMC.genders[gend]['MP Regen'] = eval(SynrecMC.genders[gend]['MP Regen']);
            SynrecMC.genders[gend]['TP Regen'] = eval(SynrecMC.genders[gend]['TP Regen']);
            SynrecMC.genders[gend]['Target Rate'] = eval(SynrecMC.genders[gend]['Target Rate']);
            SynrecMC.genders[gend]['Guard Effect'] = eval(SynrecMC.genders[gend]['Guard Effect']);
            SynrecMC.genders[gend]['Recovery Effect'] = eval(SynrecMC.genders[gend]['Recovery Effect']);
            SynrecMC.genders[gend]['Pharmacology'] = eval(SynrecMC.genders[gend]['Pharmacology']);
            SynrecMC.genders[gend]['MP Cost Rate'] = eval(SynrecMC.genders[gend]['MP Cost Rate']);
            SynrecMC.genders[gend]['TP Charge Rate'] = eval(SynrecMC.genders[gend]['TP Charge Rate']);
            SynrecMC.genders[gend]['Physical Damage'] = eval(SynrecMC.genders[gend]['Physical Damage']);
            SynrecMC.genders[gend]['Magical Damage'] = eval(SynrecMC.genders[gend]['Magical Damage']);
            SynrecMC.genders[gend]['Floor Damage'] = eval(SynrecMC.genders[gend]['Floor Damage']);
            SynrecMC.genders[gend]['Experience'] = eval(SynrecMC.genders[gend]['Experience']);
        }
    }
}catch(e){
    console.error(`Failed to parse genders, error: ${e}`);
    SynrecMC.genders = [];
}


SynrecMC.CaptureSuccess = SynrecMC.Plugins['Capture Success Text'];
SynrecMC.teamBoxName = SynrecMC.Plugins['Team Box Name'];
SynrecMC.reserveSceneBackground = SynrecMC.Plugins['Reserve Scene Background'];
SynrecMC.hpIcon = eval(SynrecMC.Plugins['HP Icon']);
SynrecMC.mpIcon = eval(SynrecMC.Plugins['MP Icon']);
SynrecMC.tpIcon = eval(SynrecMC.Plugins['TP Icon']);
SynrecMC.atkIcon = eval(SynrecMC.Plugins['ATK Icon']);
SynrecMC.defIcon = eval(SynrecMC.Plugins['DEF Icon']);
SynrecMC.matIcon = eval(SynrecMC.Plugins['MAT Icon']);
SynrecMC.mdfIcon = eval(SynrecMC.Plugins['MDF Icon']);
SynrecMC.agiIcon = eval(SynrecMC.Plugins['AGI Icon']);
SynrecMC.lukIcon = eval(SynrecMC.Plugins['LUK Icon']);

SynrecMC.hitRateIcon = eval(SynrecMC.Plugins['Hit Rate Icon']);
SynrecMC.evaRateIcon = eval(SynrecMC.Plugins['Evasion Rate Icon']);
SynrecMC.crtRateIcon = eval(SynrecMC.Plugins['Critical Rate Icon']);
SynrecMC.crtEvaIcon = eval(SynrecMC.Plugins['Critical Evasion Icon']);
SynrecMC.magEvaIcon = eval(SynrecMC.Plugins['Magic Evasion Icon']);
SynrecMC.magRefIcon = eval(SynrecMC.Plugins['Magic Reflection Icon']);
SynrecMC.cntAtkIcon = eval(SynrecMC.Plugins['Counter Rate Icon']);
SynrecMC.hpRegIcon = eval(SynrecMC.Plugins['HP Regen Icon']);
SynrecMC.mpRegIcon = eval(SynrecMC.Plugins['MP Regen Icon']);
SynrecMC.tpRegIcon = eval(SynrecMC.Plugins['TP Regen Icon']);

SynrecMC.tgrIcon = eval(SynrecMC.Plugins['Target Rate Icon']);
SynrecMC.grdIcon = eval(SynrecMC.Plugins['Guard Rate Icon']);
SynrecMC.recIcon = eval(SynrecMC.Plugins['Recovery Rate Icon']);
SynrecMC.phaIcon = eval(SynrecMC.Plugins['Pharmacoloy Rate Icon']);
SynrecMC.mcrIcon = eval(SynrecMC.Plugins['MP Cost Rate Icon']);
SynrecMC.tcrIcon = eval(SynrecMC.Plugins['TP Charge Rate Icon']);
SynrecMC.pdrIcon = eval(SynrecMC.Plugins['Physical Damage Effectiveness Icon']);
SynrecMC.mdrIcon = eval(SynrecMC.Plugins['Magical Damage Effectiveness Icon']);
SynrecMC.fdrIcon = eval(SynrecMC.Plugins['Floor Damage Effectiveness Icon']);
SynrecMC.exrIcon = eval(SynrecMC.Plugins['EXP Rate Icon']);

SynrecMC.nonBattlePlayer = eval(SynrecMC.Plugins['Non-Player Actor']);
SynrecMC.nonBattlePlayerFile = SynrecMC.Plugins['Character Sheet File'];
SynrecMC.nonBattlePlayerIndex = eval(SynrecMC.Plugins['Character Sheet Index']);

function isStr (chkStr){
    if(typeof(chkStr) == 'string')return true;
    return false;
}

function isNum (chkNum){
    const chkNumber = (chkNum);
    if(typeof(chkNumber) == 'number' || !isNaN(chkNumber))return true;
    return false;
}

function isObject (object){
    if(!object)return false;
    const objStr = JSON.stringify(object);
    const objLength = objStr.length - 1;
    if(objStr[0] == '{' && objStr[objLength] == '}')return true;
    return false;
}

function isArray (array){
    if(!array)return false;
    const arrStr = JSON.stringify(array);
    const arrLength = arrStr.length - 1;
    if(arrStr[0] == '[' && arrStr[arrLength] == ']')return true;
    return false;
}

function sortByObjectId (idA, idB){
    return idA.id - idB.id;
}

function sortByObjectName (idA, idB){
    return idA.name - idB.name;
}

ImageManager.loadfrontActor = function(filename){
    return this.loadBitmap("img/actors/", filename);
}

ImageManager.loadBackground = function(filename){
    return this.loadBitmap("img/backgrounds/", filename);
}

ColorManager.customColor = function(hexStr){
    if(isStr(hexStr))return hexStr;
}

Game_Temp.prototype.bootRequiredScenes = function(scenes){
    if(!Array.isArray(scenes)){
        scenes = [scenes];
    }
    scenes.forEach((scene)=>{
        const name = scene.scene;
        const prep = scene.prep;
        SceneManager.push(name);
        SceneManager.prepareNextScene(...prep);
    })
}

synrecGamePlayerRefresh = Game_Player.prototype.refresh;
Game_Player.prototype.refresh = function() {
	if(SynrecMC.nonBattlePlayer){
        const charName = SynrecMC.nonBattlePlayerFile;
        const charIndex = SynrecMC.nonBattlePlayerIndex;
		this.setImage(charName, charIndex);
		this._followers.refresh();
	}else{
		synrecGamePlayerRefresh.call(this);
	}
}

synrecGameFollowersSetup = Game_Followers.prototype.setup;
Game_Followers.prototype.setup = function() {
	if(SynrecMC.nonBattlePlayer){
		this._data = [];
		for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
			this._data.push(new Game_Follower(i));
		}
	}else{
		synrecGameFollowersSetup.call(this);
	}
}

SynrecMCGmActSetSub = Game_Action.prototype.setSubject;
Game_Action.prototype.setSubject = function(subject) {
    if(!subject)return;
    if (subject.isActor()) {
        this._subjectActorId = subject.index();
        this._subjectEnemyIndex = -1;
    } else {
        SynrecMCGmActSetSub.call(this, subject);
        this._subjectActorId = undefined;
    }
}


Game_Action.prototype.subject = function() {
    if (!isNaN(this._subjectActorId)) {
        return $gameParty.battleMembers()[this._subjectActorId];
    } else {
        return $gameTroop.members()[this._subjectEnemyIndex];
    }
}

SynrecGameActionAppItmUsrEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    SynrecGameActionAppItmUsrEffect.call(this, target);
    this.checkCapture(target);
}

Game_Action.prototype.checkCapture = function(target){
    const captureDivisor = 255;
    const item = this.item();
    const itemCaptureRate = !isNaN(eval(item.meta.captureRate))? eval(item.meta.captureRate) / captureDivisor : SynrecMC.baseCapture / captureDivisor;
    if(!itemCaptureRate)return;
    if(this.subject().isActor())this.performCapture(target);
}

Game_Action.prototype.performCapture = function(target){
    if(target.isEnemy()){
        const item = this.item();
        const captureDivisor = 255;
        const itemCaptureRate = !isNaN(eval(item.meta.captureRate))? eval(item.meta.captureRate) / captureDivisor : SynrecMC.baseCapture / captureDivisor;
        if(!item.meta.captureRate)return;
        const enemyData = target.enemy();
        const captureActorId = eval(enemyData.meta.captureActor);
        const hpBonus = enemyData.meta.hpBonus ? eval(enemyData.meta.hpBonus) : 255;
        if(isNaN(hpBonus) || hpBonus > captureDivisor)hpBonus = 255;
        const mpBonus = enemyData.meta.mpBonus ? eval(enemyData.meta.mpBonus) : 255;
        if(isNaN(mpBonus) || mpBonus > captureDivisor)mpBonus = 255;
        const tpBonus = enemyData.meta.tpBonus ? eval(enemyData.meta.tpBonus) : 255;
        if(isNaN(tpBonus) || tpBonus > captureDivisor)tpBonus = 255;
        const hpRateBonus = (1 - target.hpRate()) * (hpBonus/captureDivisor);
        const mpRateBonus = (1 - target.mpRate()) * (mpBonus/captureDivisor);
        const tpRateBonus = (1 - target.tpRate()) * (tpBonus/captureDivisor);
        const blockCaptureState = enemyData.meta.blockCaptureState ? eval(enemyData.meta.blockCaptureState) : 1;
        const allowCaptureState = enemyData.meta.allowCaptureState ? eval(enemyData.meta.allowCaptureState) : undefined;
        if(target.isStateAffected(blockCaptureState)){
            this.playCaptureFail(target);
            return;
        }
        if(isNum(allowCaptureState) && !target.isStateAffected(allowCaptureState)){
            this.playCaptureFail(target);
            return;
        }
        let captureRate = ((hpRateBonus + mpRateBonus + tpRateBonus) / 3) + itemCaptureRate;
        captureRate = captureRate <= 1 ? captureRate : 1;
        if(Math.random() <= captureRate && captureActorId){
            this.playCaptureSuccess(target, captureActorId);
            return;
        }else{
            this.playCaptureFail(target);
            return;
        }
    }else{
        return;
    }
}

Game_Action.prototype.playCaptureSuccess = function(target, actor){
    $gameSystem._captureId = !isNaN($gameSystem._captureId) ? $gameSystem._captureId + 1 : 0;
    const captureLevel = isNaN(target._level) ? 1 : target._level;
    const hpSet = target._hp;
    const mpSet = target._mp;
    const gender = target._gender;
    $gameTemp.requestAnimation([target], SynrecMC.successCaptureAnim);
    target._isCaptured = true;
    target.die();
    target.refresh();
    $gameParty.addActor(actor, captureLevel, hpSet, mpSet, gender);
}

Game_Action.prototype.playCaptureFail = function(target){
    $gameTemp.requestAnimation([target], SynrecMC.failCaptureAnim);
}

SynrecMCGmBattBseDie = Game_BattlerBase.prototype.die;
Game_BattlerBase.prototype.die = function() {
    if(this._isCaptured){
        this.clearStates();
        this.clearBuffs();
    }
    SynrecMCGmBattBseDie.call(this);
}

SynrecMCGmBattBseRevive = Game_BattlerBase.prototype.revive;
Game_BattlerBase.prototype.revive = function() {
    if(this._isCaptured)return;
    SynrecMCGmBattBseRevive.call(this);
}

Game_BattlerBase.prototype.setGender = function(gender){
    if(SynrecMC.genders.length <= 0)return this._gender = undefined;
    if(this._gender)return true;
	if(gender){
        gender = gender.toLowerCase().replace(/\s/g, '');
		this._gender = gender;
	}else{
		if(this.isEnemy()){
            const actorId = this.enemy().meta.captureActor;
            const actorData = $dataActors[actorId];
            let genderArr = actorData.meta.genderArray;
            if(!genderArr){
                genderArr = [];
                for(ga = 0; ga < SynrecMC.genders.length; ga++){
                    genderArr.push(SynrecMC.genders[ga]['Gender Name']);
                }
            }else{
                for(ga = 0; ga < genderArr.length; ga++){
                    genderArr[ga] = genderArr[ga].toLowerCase().replace(/\s/g, '');
                }
            }
            const genderIdx = Math.floor(Math.random() * genderArr.length);
            this._gender = genderArr[genderIdx];
        }else if(this.isActor()){
            let genderArr = this.actor().meta.genderArray;
            if(!genderArr){
                genderArr = [];
                for(ga = 0; ga < SynrecMC.genders.length; ga++){
                    genderArr.push(SynrecMC.genders[ga]['Gender Name']);
                }
            }else{
                for(ga = 0; ga < genderArr.length; ga++){
                    genderArr[ga] = genderArr[ga].toLowerCase();
                }
            }
            const genderIdx = Math.floor(Math.random() * genderArr.length);
            this._gender = genderArr[genderIdx];
        }
	}
    return false;
}

SynrecMCGmActrSetup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    const length = $dataActors.length;
    if(actorId <= 0 || actorId >= length || isNaN(actorId)){
        throw new Error(`Actor Id ${actorId} is invalid. It is either greater than the number of actors or less than or completely invalid. Please check database setup.`)
    }
    SynrecMCGmActrSetup.call(this, actorId);
}

SynrecGmPartyInitialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    SynrecGmPartyInitialize.call(this);
    this.createReserveBoxes();
}

Game_Party.prototype.createReserveBoxes = function(){
    this._reserveBoxes = [];
    for(ib = 0; ib < SynrecMC.numberReserveBoxes; ib++){
        this._reserveBoxes[ib] = {name:'Box ' + ib, box:[]};
        for(jb = 0; jb < SynrecMC.sizeReserveBoxes; jb++){
            this._reserveBoxes[ib]['box'][jb] = undefined;
        }
    }
}

Game_Party.prototype.allMembers = function() {
    return this._actors;
}

Game_Party.prototype.removeInvalidMembers = function() {
    for(let i = 0; i < this._actors.length; i++){
        if(!this._actors[i] && i >= 0){
            this._actors.splice(i, 1);
            i--;
        }
        if(this._actors[i]){
            if(!this._actors[i].isActor()){
                this._actors.remove(this._actors[i]);
                i--;
            }
        }
    }
}

Game_Party.prototype.setupStartingMembers = function() {
    this._actors = [];
    for (let i = 0; i < $dataSystem.partyMembers.length; i++) {
        let actor = new Game_Actor($dataSystem.partyMembers[i]);
        actor.setGender();
        if(SynrecMC.lockActors){
            actor._teamLock = true;
        }
        this._actors.push(actor);
    }
}

Game_Party.prototype.addActor = function(actorId, level, hp, mp, gender) {
    let actor;
    if(!isNaN(actorId)){
        actor = new Game_Actor(actorId);
        if(level)actor.changeLevel(level, false);
        if(hp)actor.setHp(hp);
        if(mp)actor.setMp(mp);
        actor.setTp(0);
        actor.setGender(gender);
        if(this._actors.length < this.maxBattleMembers())actor.onBattleStart();
        if(this._actors.length >= this.maxBattleMembers()){
            actor.onBattleEnd();
            this.addToReserve(actor);
        }else{
            actor.onBattleStart();
            this._actors.push(actor);
        }
    }else{
        return false;
    }
    $gamePlayer.refresh();
    $gameMap.requestRefresh();
    $gameTemp.requestBattleRefresh();
    if(actor)this.doAddActorExtra(actor);
}

Game_Party.prototype.doAddActorExtra = function(actor){
    this.callRenameScene(actor);
}

Game_Party.prototype.callRenameScene = function(actor){
    const scene = Scene_Rename;
    const max_name_chars = SynrecMC.MaxNameChars;
    const scenesToBoot = [{scene,prep:[actor, max_name_chars]}];
    $gameTemp.bootRequiredScenes(scenesToBoot);
}

Game_Party.prototype.addToReserve = function(actor){
    for(let i = 0; i < this._reserveBoxes.length; i++){
        let box = this._reserveBoxes[i]['box'];
        for(j = 0; j < box.length; j++){
            if(!box[j]){
                box[j] = actor;
                return true;
            }
        }
    }
    return false;
}

Game_Party.prototype.removeActor = function(actorId) {
    for(let i = 0; i < this._actors.length; i++){
        if(this._actors[i].actorId() == actorId){
            let actor = this._actors.splice(i, 1);
            if(this.inBattle())actor.onBattleEnd();
        }
        $gamePlayer.refresh();
        $gameMap.requestRefresh();
        $gameTemp.requestBattleRefresh();
    }
}

Game_Party.prototype.removeDeadMembers = function(){
    for(let i = 0; i < this._actors.length; i++){
        if(i < 0) i = 0;
        this._actors[i].refresh();
        if(this._actors[i].isDead() && this._actors.length > 0){
            this._actors.splice(i, 1);
            i--;
            if (this._actors.length <= 0 && this.inBattle()){
                SceneManager.goto(Scene_Gameover);
            }
        }else if (this._actors.length <= 0 && this.inBattle()){
            SceneManager.goto(Scene_Gameover);
        }
    }
}

Game_Party.prototype.menuActor = function() {
    let actor = this._menuActorId;
    return actor;
}

Game_Party.prototype.setMenuActor = function(actor) {
    this._menuActorId = actor;
}

Game_Party.prototype.charactersForSavefile = function() {
    return this.battleMembers().forEach(actor => [
        actor.characterName(),
        actor.characterIndex()
    ]);
}


Game_Party.prototype.facesForSavefile = function() {
    return this.battleMembers().forEach(actor => [
        actor.faceName(),
        actor.faceIndex()
    ]);
}

Game_Party.prototype.refresh = function(){
    this.removeInvalidMembers();
    if(SynrecMC.permaDeath)$gameParty.removeDeadMembers();
    $gamePlayer.refresh();
    $gameMap.refresh();
    $gameTemp.requestBattleRefresh();
}

SynrecWindowCreateClientArea = Window.prototype._createClientArea;
Window.prototype._createClientArea = function() {
    SynrecWindowCreateClientArea.call(this);
    this.createSprites();
}

Window.prototype.createSprites = function(){};

SynrecMCWinStsBseDrwActrName = Window_StatusBase.prototype.drawActorName;
Window_StatusBase.prototype.drawActorName = function(actor, x, y, width) {
    width = width || 168;
    this.changeTextColor(ColorManager.hpColor(actor));
    this.drawGenderIcon(actor, x, y);
    this.drawText(actor.name(), x + ImageManager.iconWidth, y, width - ImageManager.iconWidth);
}

Window_StatusBase.prototype.drawGenderIcon = function(actor, x, y){
    const gender = actor._gender;
    if(!gender)return this.drawIcon(0, x, y);
    const allGenders = SynrecMC.genders;
    let data = undefined;
    for(let i = 0; i < allGenders.length; i++){
        const genderData = allGenders[i];
        if(genderData['Gender Name'].toLowerCase() == gender){
            return this.drawIcon(genderData['Gender Icon'], x, y);
        }
    }
}

Window_StatusBase.prototype.placeActorName = function(actor, x, y) {
    const key = ["actor%1-name".format(actor.actorId()), actor.index()];
    const sprite = this.createInnerSprite(key, Sprite_Name);
    sprite.setup(actor);
    sprite.move(x, y);
    sprite.show();
}

Window_StatusBase.prototype.placeStateIcon = function(actor, x, y) {
    const key = ["actor%1-stateIcon".format(actor.actorId()), actor.index()];
    const sprite = this.createInnerSprite(key, Sprite_StateIcon);
    sprite.setup(actor);
    sprite.move(x, y);
    sprite.show();
}

Window_StatusBase.prototype.placeGauge = function(actor, type, x, y) {
    const key = ["actor%1-gauge-%2".format(actor.actorId(), type), actor.index()];
    const sprite = this.createInnerSprite(key, Sprite_Gauge);
    sprite.setup(actor, type);
    sprite.move(x, y);
    sprite.show();
}

Window_MenuStatus.prototype.selectLast = function() {
    this.smoothSelect(0);
}

SynrecMCWnBattLogDispAddState = Window_BattleLog.prototype.displayAddedStates
Window_BattleLog.prototype.displayAddedStates = function(target) {
    if(!target._isCaptured){
        return SynrecMCWnBattLogDispAddState.call(this, target);
    }
    const result = target.result();
    const states = result.addedStateObjects();
    for (const state of states) {
        if (state.id === target.deathStateId()) {
            this.push("performCollapse", target);
        }
    }
}

SynrecMCWnBattLogDispFail = Window_BattleLog.prototype.displayFailure;
Window_BattleLog.prototype.displayFailure = function(target) {
    if(!target._isCaptured){
        SynrecMCWnBattLogDispFail.call(this, target);
    }else{
        let fmt = `${SynrecMC.CaptureSuccess}`;
        this.push("addText", fmt.format(target.name()));
    }
}

SynrecMCWnBattLogDispMiss = Window_BattleLog.prototype.displayMiss;
Window_BattleLog.prototype.displayMiss = function(target) {
    if(!target._isCaptured){
        SynrecMCWnBattLogDispMiss.call(this, target);
    }else{
        let fmt = `${SynrecMC.CaptureSuccess}`;
        this.push("addText", fmt.format(target.name()));
    }
}

synrecWinBatStatUpdate = Window_BattleStatus.prototype.update;
Window_BattleStatus.prototype.update = function() {
    synrecWinBatStatUpdate.call(this);
    this.updateSprites();
}

Window_BattleStatus.prototype.updateSprites = function(){
    for(let sprite in this._additionalSprites){
        if(this._additionalSprites[sprite]._battler){
            if(this._additionalSprites[sprite]._battler._hidden){
                this._additionalSprites[sprite].alpha = 0;
            }else this._additionalSprites[sprite].alpha = 1;
        }else this._additionalSprites[sprite].alpha = 0;
    }
    if(!this._c){
        this._c = true;
    }
}

function Window_ReserveBox(){
    this.initialize(...arguments);
}

Window_ReserveBox.prototype = Object.create(Window_Selectable.prototype);
Window_ReserveBox.prototype.constructor = Window_ReserveBox;

Window_ReserveBox.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._boxIdx = 0;
    this._swapMode = false;
    this._swapIdx1 = undefined;
    this._swapIdx2 = undefined;
}

Window_ReserveBox.prototype.update = function(){
    Window_Selectable.prototype.update.call(this);
    this.updateDataWindow();
}

Window_ReserveBox.prototype.updateDataWindow = function(){
    if(!this._dataWindow || !this.active)return;
    const index = this.index();
    this._dataWindow._data = $gameParty._reserveBoxes[this._boxIdx]['box'][index];
    this.refresh();
}

Window_ReserveBox.prototype.maxCols = function() {
    return 3;
}

Window_ReserveBox.prototype.maxItems = function() {
    return SynrecMC.sizeReserveBoxes;
}

Window_ReserveBox.prototype.colSpacing = function() {
    return 24;
}

Window_ReserveBox.prototype.rowSpacing = function() {
    return 24;
}

Window_ReserveBox.prototype.cursorPagedown = function() {
    if(this._boxIdx + 1 < SynrecMC.numberReserveBoxes){
        this._boxIdx++
        SoundManager.playCursor();
        this.refresh();
    }else this._boxIdx = 0;
}

Window_ReserveBox.prototype.cursorPageup = function() {
    if(this._boxIdx - 1 >= 0){
        this._boxIdx--
        SoundManager.playCursor();
        this.refresh();
    }else this._boxIdx = SynrecMC.numberReserveBoxes - 1;
}

Window_ReserveBox.prototype.processPageup = function() {
    this.updateInputData();
    this.callHandler("pageup");
}

Window_ReserveBox.prototype.processPagedown = function() {
    this.updateInputData();
    this.callHandler("pagedown");
}

Window_ReserveBox.prototype.itemHeight = function(){
    return 64;
}

Window_ReserveBox.prototype.itemRect = function(index) {
    const maxCols = this.maxCols();
    const itemWidth = this.itemWidth();
    const itemHeight = this.itemHeight();
    const colSpacing = this.colSpacing();
    const rowSpacing = this.rowSpacing();
    const col = index % maxCols;
    const row = Math.floor(index / maxCols);
    const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();
    const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
    const width = itemWidth - 12;
    const height = itemHeight - 12;
    return new Rectangle(x, y, width, height);
}

Window_ReserveBox.prototype.makeItemList = function(){
    this._data = $gameParty._reserveBoxes[this._boxIdx]['box'];
}

Window_ReserveBox.prototype.drawAllItems = function() {
    this.makeItemList();
    Window_Selectable.prototype.drawAllItems.call(this);
}

Window_ReserveBox.prototype.drawItem = function(index) {
    const rect = this.itemRect(index);
    const data = this._data[index];
    if(data){
        const x = rect.x;
        const y = rect.y;
        const charName = data._characterName;
        const charIdx = data._characterIndex;
        this.drawCharacter(charName, charIdx, x + rect.width / 2 , y + 48);
    }
}

function Window_ReserveBoxName (){
    this.initialize(...arguments);
}

Window_ReserveBoxName.prototype = Object.create(Window_Base.prototype);
Window_ReserveBoxName.prototype.constructor = Window_ReserveBoxName;

Window_ReserveBoxName.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateBoxName();
}

Window_ReserveBoxName.prototype.updateBoxName = function(){
    if(!this._reserveBoxWindow)return;
    const boxIdx = this._reserveBoxWindow._boxIdx;
    const box = $gameParty._reserveBoxes[boxIdx];
    if(!box)this._name = 'Unknown';
    const name = box['name'];
    if(this._name != name){
        this._name = name;
        this.refresh();
    }
}

Window_ReserveBoxName.prototype.drawData = function(){
    const x = 0;
    const y = (this.contentsHeight() / 2) - (this.lineHeight() / 2);
    const width = this.contentsWidth();
    this.drawText(this._name, x, y, width, 'center');
}

Window_ReserveBoxName.prototype.refresh = function(){
    if(this.contents){
        this.contents.clear();
        this.drawData();
    }
}

function Window_TeamBox(){
    this.initialize(...arguments);
}

Window_TeamBox.prototype = Object.create(Window_Selectable.prototype);
Window_TeamBox.prototype.constructor = Window_TeamBox;

Window_TeamBox.prototype.initialize = function(rect){
    Window_Selectable.prototype.initialize.call(this, rect);
    this.loadCharImages();
    this.loadFaceImages();
    this.refresh();
}

Window_TeamBox.prototype.maxCols = function() {
    return 4;
}

Window_TeamBox.prototype.cursorPagedown = function() {
    if(this._reserveBox._boxIdx + 1 < SynrecMC.numberReserveBoxes){
        this._reserveBox._boxIdx++
        SoundManager.playCursor();
        this._reserveBox.refresh();
        this.refresh();
    }else this._reserveBox._boxIdx = 0;
}

Window_TeamBox.prototype.cursorPageup = function() {
    if(this._reserveBox._boxIdx - 1 >= 0){
        this._reserveBox._boxIdx--
        SoundManager.playCursor();
        this._reserveBox.refresh();
        this.refresh();
    }else this._reserveBox._boxIdx = SynrecMC.numberReserveBoxes - 1;
}

Window_TeamBox.prototype.update = function(){
    Window_Selectable.prototype.update.call(this);
    this.updateDataWindow();
}

Window_TeamBox.prototype.updateDataWindow = function(){
    if(!this._dataWindow || !this.active)return;
    const index = this.index();
    this._dataWindow._data = $gameParty._actors[index];
    this.refresh();
}

Window_TeamBox.prototype.lineHeight = function() {
    return 144;
}

Window_TeamBox.prototype.maxItems = function(){
    return $gameParty.maxBattleMembers();
}

Window_TeamBox.prototype.loadFaceImages = function() {
    for (const actor of $gameParty.members()) {
        ImageManager.loadFace(actor.faceName());
    }
}

Window_TeamBox.prototype.loadCharImages = function() {
    for (const actor of $gameParty.members()) {
        ImageManager.loadFace(actor.faceName());
    }
}

Window_TeamBox.prototype.drawItem = function(index) {
    const rect = this.itemRect(index);
    const data = $gameParty._actors[index];
    this.resetTextColor();
    if(data){
        const name = data._name;
        const level = data._level;
        const gender = data._gender;
        const x = rect.x;
        const y = rect.y;
        const width = rect.width;
        const height = rect.height;
        this.changeTextColor(ColorManager.customColor('#bbff00'));
        this.drawText(name, x, y - 12, width, 'center');
        this.changeTextColor(ColorManager.customColor('#aaaaff'));
        this.drawText(TextManager.levelA, x + 3, y + 24);
        const levelWidth = this.textWidth(TextManager.levelA) + x + 3;
        this.resetTextColor();
        this.drawText(level, levelWidth, y + 24);
        this.changeTextColor(ColorManager.customColor('#bb77bb'));
        const genderIcon = () =>{
            let genders = SynrecMC.genders;
            for(genIdx = 0; genIdx < genders.length; genIdx++){
                if(genders[genIdx]['Gender Name'] == gender){
                    return genders[genIdx]['Gender Icon'];
                }
            }
            return 0;
        }
        this.drawIcon(genderIcon(), x + 3, y + 110);
        if(gender)this.drawText(gender.toUpperCase(), x + 36, y + 54);
        this.resetTextColor();
        this.drawCharacter(data.characterName(), data.characterIndex(), x + width - 20, y + 120);
        this.drawFace(data.faceName(), data.faceIndex(), x + 24, y + 3, 144, 36);
    }
}

function Window_TeamBoxName (){
    this.initialize(...arguments);
}

Window_TeamBoxName.prototype = Object.create(Window_Base.prototype);
Window_TeamBoxName.prototype.constructor = Window_TeamBoxName;

Window_TeamBoxName.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateBoxName();
}

Window_TeamBoxName.prototype.updateBoxName = function(){
    if(!this._teamBoxWindow)return;
    const name = SynrecMC.teamBoxName;
    if(this._name != name){
        this._name = name;
        this.refresh();
    }
}

Window_TeamBoxName.prototype.drawData = function(){
    const x = 0;
    const y = (this.contentsHeight() / 2) - (this.lineHeight() / 2);
    const width = this.contentsWidth();
    this.drawText(this._name, x, y, width, 'center');
}

Window_TeamBoxName.prototype.refresh = function(){
    if(this.contents){
        this.contents.clear();
        this.drawData();
    }
}

function Window_ActorData (){
    this.initialize(...arguments);
}

Window_ActorData.prototype = Object.create(Window_Base.prototype);
Window_ActorData.prototype.constructor = Window_ActorData;

Window_ActorData.prototype.update = function(){
    Window_Base.prototype.update.call(this);
    this.updateGaugeSprites();
    this.refresh();
    if(this._data != this._reData){
        this._reData = this._data;
        this.refresh();
    }
}

Window_ActorData.prototype.updateGaugeSprites = function(){
    if(this._data){
        for(let sprite in this._additionalSprites){
            this._additionalSprites[sprite].alpha = 1;
            this._additionalSprites[sprite]._battler = this._data;
        }
    }else{
        for(let sprite in this._additionalSprites){
            this._additionalSprites[sprite].alpha = 0;
        }
    }
}

Window_ActorData.prototype.placeGauge = function(actor, type, x, y) {
    const key = "actor%1-gauge-%2".format(actor.actorId(), type);
    const sprite = this.createInnerSprite(key, Sprite_Gauge);
    sprite.setup(actor, type);
    sprite.move(x + 4, y);
    sprite.show();
}

Window_ActorData.prototype.createInnerSprite = function(key, spriteClass) {
    if(!this._additionalSprites)this._additionalSprites = {};
    const dict = this._additionalSprites;
    const sprite = new spriteClass();
    dict[key] = sprite;
    this.addInnerChild(sprite);
    return sprite;
}

Window_ActorData.prototype.drawData = function(){
    const data = this._data;
    this.resetTextColor();
    if(data){
        const iconSize = Math.max(ImageManager.iconWidth, ImageManager.iconHeight);
        const faceSize = Math.max(ImageManager.faceWidth, ImageManager.faceHeight);
        const name = data._name;
        const level = data._level;
        const gender = data._gender;
        const genderIcon = () =>{
            let genders = SynrecMC.genders;
            for(genIdx = 0; genIdx < genders.length; genIdx++){
                if(genders[genIdx]['Gender Name'] == gender){
                    return genders[genIdx]['Gender Icon'];
                }
            }
            return 0;
        };
        const maxHp = data.param(0);
        const maxMp = data.param(1);
        const maxAtk = data.param(2);
        const maxDef = data.param(3);
        const maxMat = data.param(4);
        const maxMdf = data.param(5);
        const maxAgi = data.param(6);
        const maxLuk = data.param(7);

        if(!this._createdGauges){
            const gaugeY = 40;
            this.placeGauge(data, "hp", iconSize, gaugeY);
            this.placeGauge(data, "mp", iconSize, gaugeY + this.lineHeight());
            if ($dataSystem.optDisplayTp) {
                this.placeGauge(data, "tp", iconSize, gaugeY + this.lineHeight() * 2);
            }
            this._createdGauges = true;
        }
        const gaugeY = 40;
        this.drawIcon(SynrecMC.hpIcon, 0, gaugeY);
        this.drawIcon(SynrecMC.mpIcon, 0, gaugeY + this.lineHeight());
        if ($dataSystem.optDisplayTp) {
            this.drawIcon(SynrecMC.tpIcon, 0, gaugeY + this.lineHeight() * 2);
        }

        this.makeFontBigger();
        this.drawIcon(genderIcon(), 144, 0);
        this.drawFace(data.faceName(), data.faceIndex(), 0, 0, 144, 36);
        this.drawText(name, iconSize + faceSize, 0, this.contentsWidth() / 2, 'left');
        const levelWidth = this.textWidth(level);
        this.changeTextColor(ColorManager.customColor('#aaaaff'));
        this.drawText(TextManager.levelA, -levelWidth, 0, this.contentsWidth(), 'right');
        this.resetTextColor();
        this.drawText(level, 0, 0, this.contentsWidth(), 'right');
        this.makeFontSmaller();

        let y = this.contentsHeight() - this.lineHeight() * 4;
        this.drawText(TextManager.hpA + ': ' + maxHp, 0, y, this.contentsWidth() / 2, 'left');
        this.drawText(TextManager.mpA + ': ' + maxMp, 0, y, this.contentsWidth(), 'right');
        y += this.lineHeight();
        this.drawText(TextManager.param(3) + ': ' + maxDef, 0, y, this.contentsWidth() / 2, 'left');
        this.drawText(TextManager.param(2) + ': ' + maxAtk, 0, y, this.contentsWidth(), 'right');
        y += this.lineHeight();
        this.drawText(TextManager.param(5) + ': ' + maxMdf, 0, y, this.contentsWidth() / 2, 'left');
        this.drawText(TextManager.param(4) + ': ' + maxMat, 0, y, this.contentsWidth(), 'right');
        y += this.lineHeight();
        this.drawText(TextManager.param(7) + ': ' + maxLuk, 0, y, this.contentsWidth() / 2, 'left');
        this.drawText(TextManager.param(6) + ': ' + maxAgi, 0, y, this.contentsWidth(), 'right');
        y += this.lineHeight();

    }else{
        const x = 0;
        const y = (this.contentsHeight() / 2) - (this.lineHeight() / 2);
        const width = this.contentsWidth();
        this.drawText('No Information', x, y, width, 'center');
    }
}

Window_ActorData.prototype.showSprites = function(){
    for(let sprite in this._additionalSprites){
        this._additionalSprites[sprite].createBitmap();
    }
}

Window_ActorData.prototype.hideSprites = function(){
    for(let sprite in this._additionalSprites){
        if(this._additionalSprites[sprite]._texture)this._additionalSprites[sprite].destroy();
    }
}

Window_ActorData.prototype.refresh = function(){
    if(this.contents){
        this.contents.clear();
        this.contentsBack.clear();
        this.drawData();
    }
}

function Window_RsvpCmd (){
    this.initialize(...arguments);
}

Window_RsvpCmd.prototype = Object.create(Window_Command.prototype);
Window_RsvpCmd.prototype.constructor = Window_RsvpCmd;

Window_RsvpCmd.prototype.makeCommandList = function() {
    Window_Command.prototype.makeCommandList.call(this);
    this.addCommand('Reserve', 'swap');
    this.addCommand('Destroy', 'delete');
    this.addCommand('Cancel', 'cancel');
};

function Scene_RsvpBox (){
    this.initialize(...arguments);
}

Scene_RsvpBox.prototype = Object.create(Scene_Base.prototype);
Scene_RsvpBox.prototype.constructor = Scene_RsvpBox;

Scene_RsvpBox.prototype.update = function(){
    Scene_Base.prototype.update.call(this);
    this.updateButtonPush();
}

Scene_RsvpBox.prototype.updateButtonPush = function(){
    if(this._delay){
        this._delay--;
        return;
    }
    if(this._incButton && this._incButton.isPressed()){
        this._reserveWindow.cursorPageup();
        this._delay = 12;
    }
    if(this._decButton && this._decButton.isPressed()){
        this._reserveWindow.cursorPagedown();
        this._delay = 12;
    }
    if(this._exButton && this._exButton.isPressed()){
        SoundManager.playBuzzer();
        this.popScene();
    }
}

Scene_RsvpBox.prototype.create = function(){
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createWindowLayer();
    this.createWindows();
    this.createButtons();
}

Scene_RsvpBox.prototype.createBackground = function(){
    const bitmapName = SynrecMC.reserveSceneBackground;
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

Scene_RsvpBox.prototype.createWindows = function(){
    this.createActorDataWindow();
    this.createReserveBoxWindow();
    this.createTeamWindow();
    this.createTeamNameWindow();
    this.createReserveBoxNameWindow();
    this.createCmdOption();
    this.refreshAllWindows();
}

Scene_RsvpBox.prototype.createButtons = function(){
    if(ConfigManager.touchUI){
        this.createIncBox();
        this.createDecBox();
        this.createExBox();
    }
}

Scene_RsvpBox.prototype.createIncBox = function(){
    this._incButton = new Sprite_Button('up');
    this._incButton.x = this._reserveNameWindow.x + 8;
    this._incButton.y = 8;
    this.addWindow(this._incButton);
}

Scene_RsvpBox.prototype.createDecBox = function(){
    this._decButton = new Sprite_Button('down');
    this._decButton.x = this._reserveNameWindow.x + this._reserveNameWindow.width - 64;
    this._decButton.y = 8;
    this.addWindow(this._decButton);
}

Scene_RsvpBox.prototype.createExBox = function(){
    this._exButton = new Sprite_Button('cancel');
    this._exButton.x = 8;
    this._exButton.y = 8;
    this.addWindow(this._exButton);
}

Scene_RsvpBox.prototype.createActorDataWindow = function(){
    const y = Graphics.height / 10 + Graphics.height / 3;
    const w = (Graphics.width / 3) * 2;
    const h = Graphics.height - y;
    const x = Graphics.width - w;
    const rect = new Rectangle(x, y, w, h);
    this._actorDataWindow = new Window_ActorData(rect);
    this.addWindow(this._actorDataWindow);
}

Scene_RsvpBox.prototype.createTeamWindow = function(){
    const w = Graphics.width;
    const h = Graphics.height / 3;
    const x = 0;
    const y = Graphics.height / 10;
    const rect = new Rectangle(x, y, w, h);
    this._teamWindow = new Window_TeamBox(rect);
    this._teamWindow._reserveBox = this._reserveWindow;
    this._teamWindow._dataWindow = this._actorDataWindow;
    this._teamWindow.activate();
    this._teamWindow.select(0);
    this._teamWindow.setHandler('ok', this.openCmdWindowTeam.bind(this));
    this._teamWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._teamWindow);
}

Scene_RsvpBox.prototype.createReserveBoxWindow = function(){
    const x = 0;
    const y = Graphics.height / 10 + Graphics.height / 3;
    const w = Graphics.width / 3;
    const h = Graphics.height - y;
    const rect = new Rectangle(x, y, w, h);
    this._reserveWindow = new Window_ReserveBox(rect);
    this._reserveWindow._dataWindow = this._actorDataWindow;
    this._reserveWindow.setHandler('ok', this.openCmdWindowRsvp.bind(this));
    this._reserveWindow.setHandler('cancel', this.cancelSwap.bind(this));
    this._reserveWindow._dataWindow = this._actorDataWindow;
    this.addWindow(this._reserveWindow);
}

Scene_RsvpBox.prototype.createTeamNameWindow = function(){
    const w = Graphics.width / 3;
    const h = Graphics.height / 10;
    const x = 0;
    const y = 0;
    const rect = new Rectangle(x, y, w, h);
    this._teamNameWindow = new Window_TeamBoxName(rect);
    this._teamNameWindow._teamBoxWindow = this._teamWindow;
    this.addWindow(this._teamNameWindow);
}

Scene_RsvpBox.prototype.createReserveBoxNameWindow = function(){
    const w = (Graphics.width / 3) * 2;
    const h = Graphics.height / 10;
    const x = Graphics.width / 3;
    const y = 0;
    const rect = new Rectangle(x, y, w, h);
    this._reserveNameWindow = new Window_ReserveBoxName(rect);
    this._reserveNameWindow._reserveBoxWindow = this._reserveWindow;
    this.addWindow(this._reserveNameWindow);
}

Scene_RsvpBox.prototype.createCmdOption = function(){
    const w = 300;
    const h = 160;
    const x = (Graphics.width / 2) - (w / 2);
    const y = (Graphics.height / 2) - (h / 2);
    const rect = new Rectangle(x, y, w, h);
    this._rsvpCmd = new Window_RsvpCmd(rect);
    this._rsvpCmd.setHandler('swap', this.doSwap.bind(this));
    this._rsvpCmd.setHandler('delete', this.doDelete.bind(this));
    this._rsvpCmd.setHandler('cancel', this.closeCmdWindow.bind(this));
    this._rsvpCmd.deactivate();
    this._rsvpCmd.hide();
    this.addWindow(this._rsvpCmd);
}

Scene_RsvpBox.prototype.refreshAllWindows = function(){
    this._actorDataWindow.refresh();
    this._teamWindow.refresh();
    this._reserveWindow.refresh();
    this._teamNameWindow.refresh();
    this._reserveNameWindow.refresh();
}

Scene_RsvpBox.prototype.doSwap = function(){
    if(this._winType == 'team'){
        this.swapToReserve();
    }
    if(this._winType == 'rsvp'){
        this.swapComplete();
        this._winType = undefined;
    }
    this._rsvpCmd.deactivate();
    this._rsvpCmd.hide();
}

Scene_RsvpBox.prototype.doDelete = function(){
    if(this._winType == 'team'){
        const index = this._teamWindow.index();
        if(
            $gameParty._actors[index] &&
            $gameParty._actors.length <= 1
        ){
            $gameParty._actors.splice(index, 1);
        }else SoundManager.playBuzzer();
    }
    if(this._winType == 'rsvp'){
        const boxIndex = this._reserveWindow._boxIdx;
        const box = $gameParty._reserveBoxes[boxIndex]['box'];
        const index = this._reserveWindow.index();
        if(box[index]){
            box.splice(index, 1);
        }else SoundManager.playBuzzer();
    }
    this.closeCmdWindow();
}

Scene_RsvpBox.prototype.openCmdWindowTeam = function(){
    this._winType = 'team';
    this._rsvpCmd.activate();
    this._rsvpCmd.show();
}

Scene_RsvpBox.prototype.openCmdWindowRsvp = function(){
    this._winType = 'rsvp';
    this._rsvpCmd.activate();
    this._rsvpCmd.show();
}

Scene_RsvpBox.prototype.closeCmdWindow = function(){
    if(this._winType == 'team')this._teamWindow.activate();;
    if(this._winType == 'rsvp')this._reserveWindow.activate();;
    this._winType = undefined;
    this._rsvpCmd.deactivate();
    this._rsvpCmd.hide();
}

Scene_RsvpBox.prototype.swapToReserve = function(){
    this._teamWindow.deactivate();
    this._indexTeam = this._teamWindow.index();
    this._reserveWindow.activate();
}

Scene_RsvpBox.prototype.swapComplete = function(){
    this._teamWindow.activate();
    this._boxIdx = this._reserveWindow._boxIdx;
    this._indexReserve = this._reserveWindow.index();
    if(this._indexReserve < 0){
        this._teamWindow.deactivate();
        this._reserveWindow.activate();
        SoundManager.playBuzzer();
        return;
    }
    this.facilitateSwap();
    this._reserveWindow.deselect();
    this._reserveWindow.deactivate();
}

Scene_RsvpBox.prototype.facilitateSwap = function(){
    const tmp1 = $gameParty._actors[this._indexTeam];
    let box = $gameParty._reserveBoxes[this._reserveWindow._boxIdx]['box'];
    const tmp2 = box[this._indexReserve];
    if(tmp1 || tmp2){
        if(tmp1){
            if(tmp1._teamLock){
                SoundManager.playBuzzer();
                return;
            }
        }
        if(!tmp2 && ($gameParty._actors.length - 1 <= 0)){
            SoundManager.playBuzzer();
        }else{
            $gameParty._actors[this._indexTeam] = box[this._indexReserve];
            box[this._indexReserve] = tmp1;
        }
    }else SoundManager.playBuzzer();
    $gameParty.refresh();
    this.refreshAllWindows();
}

Scene_RsvpBox.prototype.cancelSwap = function(){
    this._reserveWindow.deactivate();
    this._teamWindow.activate();
}

function Scene_Rename(){
    this.initialize(...arguments);
}

Scene_Rename.prototype = Object.create(Scene_Name.prototype);
Scene_Rename.prototype.constructor = Scene_Rename;

Scene_Rename.prototype.prepare = function(actorId, maxLength) {
    this._actor = actorId;
    this._maxLength = maxLength;
}

Scene_Rename.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createWindowLayer();
    this.createButtons();
    this.createEditWindow();
    this.createInputWindow();
}