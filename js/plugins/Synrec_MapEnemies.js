/*:
 * @author Synrec/Kylestclr
 * @plugindesc v1.0.2 Enemies spawn on the map based plugin parameters
 * @target MZ
 * @url https://synrec.itch.io/
 *
 *
 * @help
 * 
 * Use enemy notetag <detectRange:x> to set the detection range of the enemy. x = number.
 * 
 * Use enemy notetag <moveType:x> to set the move type when enemy detects player.
 * x = flee, observe, random or approach.
 * 
 * Use script call $gameSystem._escapeMapEnemy = true to allow
 * actor to escape map enemy. Default value is 'false'.
 * 
 * Use script call $gameSystem._loseMapEnemy = true to allow
 * actor to lose to map enemy. Default value is 'false'.
 * 
 * @param Map Configurations
 * @desc Setup troop spawn on map
 * @type struct<mapTroop>[]
 * @default []
 * 
 * @param Default Character Image
 * @desc Image used for character when none specified
 * @type file
 * @dir img/characters
 * 
 * @param Default Character Index
 * @desc Image used for character when none specified
 * @type number
 * @default 0
 * @min 0
 * @max 7
 * 
 * @param Enemy Placement Positions
 * @desc Setup enemy positioning.
 * @type struct<PlacementPos>[]
 * @default []
 * 
 * @param Retain Enemies
 * @desc Resets enemies only when the map is changed.
 * @type boolean
 * @default false
 * 
 */
/*~struct~PlacementPos:
 * @param Position X
 * @desc X - position of this index
 * @type number
 * @default 0
 * 
 * @param Position Y
 * @desc Y - position of this index
 * @type number
 * @default 0
 */
/*~struct~troopSetup:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default TROOP
 * 
 * @param Event
 * @desc Call common event instead of normal battle
 * @type common_event
 * @default 0
 * 
 * @param No Kill
 * @parent Event
 * @desc Prevent event from dying by event trigger and set respawn timer.
 * @type boolean
 * @default false
 * 
 * @param Enemies
 * @desc Enemies that can be included in the troop
 * @type enemy[]
 * @default []
 * 
 * @param Victory Event
 * @parent Enemies
 * @desc Common event to play if the battle ends in victory.
 * @type common_event
 * @default 0
 * 
 * @param Defeat Event
 * @parent Enemies
 * @desc Common event to play if the battle ends in defeat.
 * @type common_event
 * @default 0
 * 
 * @param Can Escape
 * @desc Allow player to escape troop
 * @type boolean
 * @default true
 * 
 * @param Can Lose
 * @desc Allow player to lose to troop
 * @type boolean
 * @default false
 * 
 * @param Minimal Number
 * @desc Least amount of enemies in troop
 * @type text
 * @default 1
 * 
 * @param Maximum Number
 * @desc Max amount of enemies in troop
 * @type text
 * @default 4
 * 
 * @param Character File
 * @desc Character file used to represent troop
 * @type file
 * @dir img/characters/
 * 
 * @param Character File Index
 * @desc Image graphic index (For 8 character sheet)
 * @type text
 * @default 0
 * 
 * @param Move Speed
 * @desc Speed of the troop
 * @type text
 * @default 3
 * 
 * @param Move Frequency
 * @desc How frequent event will move
 * @type text
 * @default 5
 * 
 * @param Near Balloon
 * @desc Balloon to play when near
 * @type select
 * @option Exclamation
 * @value 1
 * @option Question
 * @value 2
 * @option Music Note
 * @value 3
 * @option Heart
 * @value 4
 * @option Anger
 * @value 5
 * @option Sweat
 * @value 6
 * @option Fustration
 * @value 7
 * @option Silence
 * @value 8
 * @option Light Bulb
 * @value 9
 * @option ZZZ
 * @value 10
 * @option User Defined 1
 * @value 11
 * @option User Defined 2
 * @value 12
 * @option User Defined 3
 * @value 13
 * @option User Defined 4
 * @value 14
 * @option User Defined 5
 * @value 15
 * @default 1
 * 
 * @param Detect Range
 * @desc Number of tiles for detect range
 * @type text
 * @default 5
 * 
 * @param Detect Action
 * @parent Detect Range
 * @desc Action to take if player is near
 * @type select
 * @option random
 * @option approach
 * @option observe
 * @option flee
 * @default random
 * 
 */
/*~struct~mapTroop:
 *
 * @param Name
 * @desc No function
 * @type text
 * @default MAP
 * 
 * @param Map
 * @desc ID of the map
 * @type text
 * @default 0
 * 
 * @param Troops
 * @desc Setup potential troops
 * @type struct<troopSetup>[]
 * @default []
 * 
 * @param Maximum Number
 * @desc Max amount of troops on map.
 * @type text
 * @default 4
 * 
 * @param Spawn Regions
 * @desc Regions in which enemy can spawn
 * @type text[]
 * @default []
 * 
 */

const Syn_ME = {};
Syn_ME.Plugin = PluginManager.parameters('Synrec_MapEnemies');

Syn_ME.DEFAULT_CHARACTER_FILE = Syn_ME.Plugin['Default Character Image'];
Syn_ME.DEFAULT_CHARACTER_INDEX = Syn_ME.Plugin['Default Character Index'];
Syn_ME.RETAIN_ENEMIES = eval(Syn_ME.Plugin['Retain Enemies']);

function TROOP_DATA_PARSER_MAP_ENEMIES(obj){
    try{
        obj = JSON.parse(obj);
        obj['Enemies'] = JSON.parse(obj['Enemies']);
        return obj;
    }catch(e){
        return;
    }
}

function MAP_ENEMIES_PARSER_MAP_ENEMIES(obj){
    try{
        obj = JSON.parse(obj);
        try{
            obj['Troops'] = JSON.parse(obj['Troops']).map((config)=>{
                return TROOP_DATA_PARSER_MAP_ENEMIES(config);
            }).filter(Boolean)
        }catch(e){
            obj['Troops'] = [];
        }
        try{
            obj['Spawn Regions'] = JSON.parse(obj['Spawn Regions']);
        }catch(e){
            obj['Spawn Regions'] = [];
        }
        return obj;
    }catch(e){
        return;
    }
}

try{
    Syn_ME.MAP_CONFIGURATIONS = JSON.parse(Syn_ME.Plugin['Map Configurations']).map((config)=>{
        return MAP_ENEMIES_PARSER_MAP_ENEMIES(config);
    }).filter(Boolean)
}catch(e){
    Syn_ME.MAP_CONFIGURATIONS = [];
}

function ENEMY_POSITION_PARSER_MAP_ENEMIES(obj){
    try{
        obj = JSON.parse(obj);
        obj['Position X'] = eval(obj['Position X']);
        obj['Position Y'] = eval(obj['Position Y']);
        return obj;
    }catch(e){
        return;
    }
}

try{
    Syn_ME.EnemyPositions = JSON.parse(Syn_ME.Plugins['Enemy Placement Positions']).map((pos)=>{
        return ENEMY_POSITION_PARSER_MAP_ENEMIES(pos);
    }).filter(Boolean);
}catch(e){
    Syn_ME.EnemyPositions = [];
}

SynrecME_BattMngr_EndBatt = BattleManager.endBattle
BattleManager.endBattle = function(result) {
    SynrecME_BattMngr_EndBatt.call(this, ...arguments);
    if(this.engagedMapTroop()){
        switch(result){
            case 0:
                $gameTemp.reserveCommonEvent($gameTemp._victory_map_enemies);
                break;
            case 2:
                $gameTemp.reserveCommonEvent($gameTemp._defeat_map_enemies);
                break;
        }
    }
}

BattleManager.engagedMapTroop = function(){
    const map_enemies = SceneManager._mapEnemies;
    if(!map_enemies)return false;
    return map_enemies.some((map_troop)=>{
        return map_troop._engaged;
    })
}

function Game_MapSpawn(){
    this.initialize(...arguments);
}

Game_MapSpawn.prototype = Object.create(Game_Character.prototype);
Game_MapSpawn.prototype.constructor = Game_MapSpawn;

Game_MapSpawn.prototype.initialize = function(data){
    Game_Character.prototype.initialize.call(this);
    this.setData(data);
    this.createTroop();
    this.setCharaData();
}

Game_MapSpawn.prototype.isAlive = function(){
    if(this._trigger_event){
        return !this._event_activated;
    }else{
        if(this._troop.length > 0){
            return this._troop.some((enemy)=>{
                return enemy.hp > 0;
            })
        }
    }
    return false;
}

Game_MapSpawn.prototype.setData = function(data){
    this._spawnDur = 300;
    this._trigger_event = eval(data['Event']) || 0;
    this._detectRange = eval(data['Detect Range']) || 1;
    this._troop_id = eval(data['Troop ID']) || 1;
    this._can_escape = eval(data['Can Escape']);
    this._can_lose = eval(data['Can Lose']);
    this._victory_event = eval(data['Victory Event']);
    this._defeat_event = eval(data['Defeat Event']);
    this._near_balloon = eval(data['Near Balloon']) || 1;
    this._moveType = data['Detect Action'];
    this._no_event_kill = eval(data['No Kill']);
    this._data = data;
}

Game_MapSpawn.prototype.createTroop = function(){
    if(!isNaN(this._trigger_event) && this._trigger_event > 0){
        return this._troop = [];
    }
    const data = this._data;
    const enemies = (data['Enemies'] || []).map((id)=>{
        return eval(id);
    }).filter(Boolean);
    if(enemies.length <= 0){
        throw new Error(`You need to have enemies setup for your troop.`);
    }
    const min = eval(data['Minimal Number']);
    const max = eval(data['Maximum Number']) || 1;
    const num = min + (Math.randomInt(max - min));
    const game_enemies = [];
    for(let i = 0; i < num; i++){
        const e_indx = Math.randomInt(enemies.length);
        const enemy_id = enemies[e_indx];
        const game_enemy = new Game_Enemy(enemy_id);
        game_enemies.push(game_enemy);
    }
    this._troop = game_enemies;
    this._battler = this._troop[0];
}

Game_MapSpawn.prototype.setCharaData = function(){
    const data = this._data;
    const file = data['Character File'] || Syn_ME.DEFAULT_CHARACTER_FILE || "";
    const data_index = eval(data['Character File Index']);
    const index =  isNaN(data_index) ? Syn_ME.DEFAULT_CHARACTER_INDEX : data_index || 0;
    this.setImage(file, index);
    const spd = eval(data['Move Speed']);
    const frq = eval(data['Move Frequency']);
    this.setMoveSpeed(spd || 1);
    this.setMoveFrequency(frq || 1);
}

Game_MapSpawn.prototype.isCollidedWithPlayer = function() {
    if(this._noEnemy)return false;
    return $gamePlayer._x == this._x 
    && $gamePlayer._y == this._y 
    && $gamePlayer._priorityType == this._priorityType;
}

Game_MapSpawn.prototype.checkStop = function(threshold) {
    return this._stopCount > threshold;
}

Game_MapSpawn.prototype.stopCountThreshold = function() {
    return 30 * (5 - this.moveFrequency());
}

Game_MapSpawn.prototype.isNearPlayer = function() {
    const sx = Math.abs(this.deltaXFrom($gamePlayer.x));
    const sy = Math.abs(this.deltaYFrom($gamePlayer.y));
    return sx + sy <= this._detectRange;
}

Game_MapSpawn.prototype.moveObservePlayer = function(){
    this.turnTowardPlayer();
}

Game_MapSpawn.prototype.update = function() {
    Game_Character.prototype.update.call(this);
    this.updateSelfMovement();
    if(this._spawnDur > 0)this.updateSpawning();
    this.updateDead();
}

Game_MapSpawn.prototype.updateSpawning = function(){
    if(this._spawnDur > 0){
        this._spawnDur--;
        if(this._blinkDur <= 0 || isNaN(this._blinkDur)){
            this._blinkDur = 3;
            this._blendMode = 1;
            if(this._opacity > 0){
                this._opacity = 0;
            }else if(this._opacity <= 0){
                this._opacity = 255;
            }
        }else this._blinkDur --;
        if(this._spawnDur <= 0){
            this._opacity = 255;
            this._blendMode = 0;
        }
    }else{
        this._opacity = 255;
        this._blendMode = 0;
    }
}

Game_MapSpawn.prototype.updateSelfMovement = function() {
    if($gameMap.isEventRunning())return false;
    if(this._spawnDur > 0)return false;
    if (this.stopCountThreshold() < this._stopCount) {
        this.resetStopCount();
        if(this.isNearPlayer()){
            if(!this.isBalloonPlaying())$gameTemp.requestBalloon(this, this._near_balloon);
            this.resetStopCount();
            switch (this._moveType) {
                case 'random':
                    this.moveRandom();
                    break;
                case 'approach':
                    this.moveTowardPlayer();
                    break;
                case 'observe':
                    this.moveObservePlayer();
                    break;
                case 'flee':
                    this.moveAwayFromPlayer();
                    break;
                default: this.moveRandom();
            }
        }else{
            this.resetStopCount();
            this.moveRandom();
        }
    }
    this.updateOnPlayer();
}

Game_MapSpawn.prototype.updateOnPlayer = function(){
    if($gameMap.isEventRunning())return;
    if($gameTemp.isCommonEventReserved())return;
    if(this._spawnDur > 0)return;
    if(!this.isAlive()){
        this._noEnemy = true;
        return;
    }
    if(
        this.isCollidedWithPlayer() && 
        $gameTroop._enemies.length <= 0 && 
        !this._engaged && 
        this.isAlive()
    ){
        const trigger_event = this._trigger_event;
        const troop = this._troop;
        if(trigger_event){
            $gameTemp.reserveCommonEvent(trigger_event);
            if(this._no_event_kill){
                this._spawnDur = 300;
            }else{
                this._event_activated = true;
                this._engaged = true;
            }
        }else{
            $gameTemp._victory_map_enemies = this._victory_event;
            $gameTemp._defeat_map_enemies = this._defeat_event;
            $gameTroop.clear();
            $gameTroop._troopId = 1;
            $gameTroop._enemies = troop;
            this.fixEnemyPositions();
            this._engaged = true;
            $gameTroop.makeUniqueNames();
            BattleManager.initMembers();
            BattleManager.makeEscapeRatio();
            BattleManager._canEscape = $gameSystem._escapeMapEnemy || this._can_escape;
            BattleManager._canLose = $gameSystem._loseMapEnemy || this._can_lose;
            BattleManager.onEncounter();
            SceneManager.push(Scene_Battle);
        }
    }
}

Game_MapSpawn.prototype.updateDead = function(){
    if(!this.isAlive()){
        this._noEnemy = true;
    }
}

Game_MapSpawn.prototype.fixEnemyPositions = function(){
    const numEnemies = $gameTroop._enemies.length;
    const paramPosArr = Syn_ME.EnemyPositions;
    const offsetX = 0;
    const offsetY = 300;
    for(let pos = 0; pos < numEnemies; pos++){
        let posX = (((Graphics.width / numEnemies) / 2) + (((Graphics.width / numEnemies) / 2) * pos)) + offsetX;
        let posY = offsetY;
        if(Syn_ME.EnemyPositions[pos]){
            posX = paramPosArr[pos]['Position X'];
            posY = paramPosArr[pos]['Position Y'];
        }
        $gameTroop._enemies[pos]._screenX = posX;
        $gameTroop._enemies[pos]._screenY = posY;
    }
}

SynrecMEScnMapStart = Scene_Map.prototype.start
Scene_Map.prototype.start = function() {
    SynrecMEScnMapStart.call(this);
    if(this._mapEnemies)this.refreshEnemies();
}

SynrecMEScnMapUpdate= Scene_Map.prototype.update
Scene_Map.prototype.update = function() {
    SynrecMEScnMapUpdate.call(this);
    if(this._mapEnemies)this.updateEnemies();
}

Scene_Map.prototype.updateEnemies = function(){
    if(!this._mapEnemies)this._mapEnemies = [];
    this._mapEnemies.forEach(enemy => enemy.update());
    this.checkForDead();
}

Scene_Map.prototype.refreshEnemies = function(){
    if(!this._mapEnemies)this._mapEnemies = [];
    this._mapEnemies.forEach(function(enemy){
        enemy._spawnDur = 60;
        enemy._engaged = false;
    });
    $gameTroop.clear();
}

Scene_Map.prototype.checkForDead = function(){
    const scene = SceneManager._scene;
    const spriteset = scene._spriteset;
    for(let deid = 0; deid < this._mapEnemies.length; deid++){
        const enem = this._mapEnemies[deid];
        if(enem){
            if(!enem.isAlive()){
                for(let sprtChk = 0; sprtChk < spriteset._characterSprites.length; sprtChk++){
                    const chara = spriteset._characterSprites[sprtChk];
                    if(chara._character == enem){
                        spriteset._characterSprites.splice(spriteset._characterSprites.indexOf(chara), 1);
                        chara.parent.removeChild(chara);
                        this._mapEnemies.splice(this._mapEnemies.indexOf(enem), 1);
                        SceneManager._mapEnemies = this._mapEnemies;
                    }
                }
            }
        }
    }
}

SynrecMEScnMapCrtDispObj = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
    SynrecMEScnMapCrtDispObj.call(this);
    if(!this._mapEnemies)this.createEnemies();
}

Scene_Map.prototype.createEnemies = function(){
    $gameTroop.clear();
    const map_enemy_config = Syn_ME.MAP_CONFIGURATIONS.find((map_config)=>{
        return eval(map_config['Map']) == $gameMap._mapId;
    })
    if(!map_enemy_config)return;
    const allowedRegions = map_enemy_config['Spawn Regions'].map(id=>eval(id));
    const retainEnemy = Syn_ME.RETAIN_ENEMIES;
    const enemyArr = map_enemy_config['Troops'];
    const enemyCnt = eval(map_enemy_config['Maximum Number']);
    this._mapEnemies = [];
    if(retainEnemy){
        if(SceneManager._mapEnemies && SceneManager._mapId == $gameMap._mapId){
            this._mapEnemies = SceneManager._mapEnemies;
            for(let chkr = 0; chkr < this._mapEnemies.length; chkr++){
                const chkE = this._mapEnemies[chkr];
                chkE.update();
                if(!chkE.isAlive()){
                    this._mapEnemies.splice(chkr, 1);
                    chkr--;
                }
            }
            this._mapEnemies.forEach((enemy)=>{
                const scene = SceneManager._scene;
                if(enemy.isAlive()){
                    const sprite = new Sprite_Character(enemy);
                    scene._spriteset._characterSprites.push(sprite);
                    scene._spriteset._tilemap.addChild(sprite);
                    enemy.locate(enemy._x, enemy._y);
                }
            })
            this.refreshEnemies();
            return;
        }
    }
    if(enemyArr){
        if(!Array.isArray(enemyArr))throw new Error("Incorrect form of enemies note tag. Please visit https://synrec.dev and check documentation.")
        let coords = [];
        for(let y = 0; y < $gameMap.height(); y++){
            for(let x = 0; x < $gameMap.width(); x++){
                const region = $gameMap.regionId(x, y);
                if(
                    allowedRegions.includes(region) ||
                    allowedRegions.length <= 0
                ){
                    coords.push([x,y]);
                }
            }
        }
        while(this._mapEnemies.length < enemyCnt && coords.length > 0){
            const rndmEnemyIdx = Math.floor(Math.random() * enemyArr.length);
            const rndmEnemy = enemyArr[rndmEnemyIdx];
            const enemData = new Game_MapSpawn(rndmEnemy);
            const ci = Math.randomInt(coords.length);
            const coord = coords.splice(ci, 1)[0];
            if(coord){
                if(!enemData._noEnemy){
                    const rndmX = coord[0];
                    const rndmY = coord[1];
                    enemData.locate(rndmX, rndmY);
                    var sprite = new Sprite_Character(enemData);
                    this._spriteset._characterSprites.push(sprite);
                    this._spriteset._tilemap.addChild(sprite);
                    this._mapEnemies.push(enemData);
                    SceneManager._mapEnemies = this._mapEnemies;
                    SceneManager._mapId = $gameMap._mapId;
                }
            }else break;
        }
    }
}