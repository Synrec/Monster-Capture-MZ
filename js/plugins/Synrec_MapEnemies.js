/*:@author Synrec 
 * @target MZ
 *
 * @plugindesc v1.7 Enemies spawn on the map based on notetags
 *
 * @help
 * You are not permitted to:
 * - Use this plugin in projects not mentioned above without authorization
 * from the author.
 * - Use this plugin as part of a method to steal assets from other projects.
 * - Use this plugin to create fan projects which you gain monetary or any otherwise
 * financial benefit
 * - Use this plugin as a form of harassment
 * - Claim this plugin as your own
 *
 * You are required to:
 * - Give credit to the author.
 * - Notify the author of your use of the plugin.
 * This plugin uses enemy notetags to setup enemies on the map itself.
 * 
 * Use enemy notetag <characterName:x> to set the character file used for enemy
 * graphic. x = file name from /img/characters/
 * 
 * Use enemy notetag <characterIndex:x> to set the character index from the enemy
 * chracter file. x = number (0 ~ 7)
 * 
 * Use enemy notetag <detectRange:x> to set the detection range of the enemy. x = number.
 * 
 * Use enemy notetag <moveType:x> to set the move type when enemy detects player.
 * x = flee, observe, random or approach.
 * 
 * Use map notetag <enemies:[x,y,z]> to setup map enemies.
 * x, y, z are enemy IDs from the database.
 * 
 * Use map notetag <enemyCount:x> to set the number of enemies for the map.
 * x is a number or script which can be evaluated as such.
 * 
 * Use script call $gameSystem._escapeMapEnemy = true to allow
 * actor to escape map enemy. Default value is true.
 * 
 * Use script call $gameSystem._loseMapEnemy = true to allow
 * actor to lose to map enemy. Default value is false.
 * 
 * @param Enemy Placement Positions
 * @desc Setup enemy positioning.
 * @type struct<PlacementPos>[]
 * @default []
 * 
 * @param Max Enemy Count
 * @desc Maximum number of enemies in troop
 * @type number
 * @default 8
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
 * @param Enemy Detection Range
 * @desc Number of tile distance before player is detected
 * @type number
 * @default 5
 * @min 1
 * @max 20
 * 
 * @param Enemy Move Type
 * @desc How enemy moves after detecting player
 * @type select
 * @default observe
 * @option observe
 * @option approach
 * @option random
 * @option flee
 * 
 * @param Spawn Regions
 * @desc Region IDs where the enemy will spawn.
 * @type number[]
 * @default []
 * 
 * @param No Spawn Regions
 * @desc Region IDs where the enemy won't spawn
 * @type number[]
 * @default []
 * 
 * @param Default Enemy Count
 * @desc Default number of enemies per map
 * @type number
 * @default 10
 * 
 * @param Encounter Troop ID
 * @desc Troop ID used for encounter. Best if blank.
 * @type number
 * @default 1
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


SynrecME = {};
SynrecME.Version = "1.6";

SynrecME.Plugins = PluginManager.parameters('Synrec_MapEnemies');
SynrecME.DefaultEnemyImage = SynrecME.Plugins['Default Character Image'];
SynrecME.DefaultEnemyIndex = eval(SynrecME.Plugins['Default Character Index']) || 0;
SynrecME.DefaultEnemyRange = eval(SynrecME.Plugins['Enemy Detection Range']) || 5;
SynrecME.DefaultEnemyMove = SynrecME.Plugins['Enemy Move Type'].toLowerCase();

if(SynrecME.Plugins['Spawn Regions']){
    SynrecME.SpwnRgn = JSON.parse(SynrecME.Plugins['Spawn Regions']);
    for(let ns = 0; ns < SynrecME.SpwnRgn.length; ns++){
        SynrecME.SpwnRgn[ns] = eval(SynrecME.SpwnRgn[ns]);
    }
}else SynrecME.SpwnRgn = [];

if(SynrecME.Plugins['No Spawn Regions']){
    SynrecME.NoSpwnRgn = JSON.parse(SynrecME.Plugins['No Spawn Regions']);
    for(let ns = 0; ns < SynrecME.NoSpwnRgn.length; ns++){
        SynrecME.NoSpwnRgn[ns] = eval(SynrecME.NoSpwnRgn[ns]);
    }
}else SynrecME.NoSpwnRgn = [];

SynrecME.DefaultCount = eval(SynrecME.Plugins['Default Enemy Count']) || 10;
SynrecME.DefaultTroop = eval(SynrecME.Plugins['Encounter Troop ID']) || 1;
SynrecME.TroopMax = eval(SynrecME.Plugins['Max Enemy Count']) || 8;

SynrecME.RetainEnemy = eval(SynrecME.Plugins['Retain Enemies']);
SynrecME.EnemyPositions = [];
try{
    SynrecME.EnemyPositions = JSON.parse(SynrecME.Plugins['Enemy Placement Positions']);
    for(let i = 0; i < SynrecME.TroopMax; i++){
        if(SynrecME.EnemyPositions[i]){
            SynrecME.EnemyPositions[i] = JSON.parse(SynrecME.EnemyPositions[i]);
            SynrecME.EnemyPositions[i]['Position X'] = eval(SynrecME.EnemyPositions[i]['Position X']);
            SynrecME.EnemyPositions[i]['Position Y'] = eval(SynrecME.EnemyPositions[i]['Position Y']);
        }
    }
}catch(e){
    console.error(e);
}

function chckArr(arr){
    const arrChk = JSON.stringify(arr);
    const arrNull = arrChk[0];
    const arrMax = arrChk[arrChk.length - 1];
    if(arrNull == "[" && arrMax == "]")return true;
    return false;
}

function Game_MapEnemy(){
    this.initialize(...arguments);
}

Game_MapEnemy.prototype = Object.create(Game_Character.prototype);
Game_MapEnemy.prototype.constructor = Game_MapEnemy;

Game_MapEnemy.prototype.initialize = function(enemyId){
    Game_Character.prototype.initialize.call(this);
    this.createEnemy(enemyId);
    this._spawnDur = 300;
    this.setMoveSpeed(3);
    this.setMoveFrequency(5);
}

Game_MapEnemy.prototype.createEnemy = function(id){
    this._gameEnemy = new Game_Enemy(id);
    const enemyData = $dataEnemies[id];
    const characterName = enemyData.meta.characterName ? enemyData.meta.characterName : SynrecME.DefaultEnemyImage;
    const characterIndex= enemyData.meta.characterIndex ? eval(enemyData.meta.characterIndex) : SynrecME.DefaultEnemyIndex;
    if(characterName && characterIndex){
        this.setImage(characterName, characterIndex);
        this._moveType = enemyData.meta.moveType ? (enemyData.meta.moveType).toLowerCase() : SynrecME.DefaultEnemyMove;
        this._detectRange = enemyData.meta.detectRange ? eval(enemyData.meta.detectRange) : SynrecME.DefaultEnemyRange;
    }else{
        this._noEnemy = true;
    }
}

Game_MapEnemy.prototype.isCollidedWithPlayer = function() {
    if(this._noEnemy)return false;
    return $gamePlayer._x == this._x 
    && $gamePlayer._y == this._y 
    && $gamePlayer._priorityType == this._priorityType;
}

Game_MapEnemy.prototype.checkStop = function(threshold) {
    return this._stopCount > threshold;
}

Game_MapEnemy.prototype.stopCountThreshold = function() {
    return 30 * (5 - this.moveFrequency());
}

Game_MapEnemy.prototype.isNearPlayer = function() {
    const sx = Math.abs(this.deltaXFrom($gamePlayer.x));
    const sy = Math.abs(this.deltaYFrom($gamePlayer.y));
    return sx + sy <= this._detectRange;
}

Game_MapEnemy.prototype.moveObservePlayer = function(){
    this.turnTowardPlayer();
}

Game_MapEnemy.prototype.update = function() {
    Game_Character.prototype.update.call(this);
    this.updateSelfMovement();
    if(this._spawnDur > 0)this.updateSpawning();
    this.updateDead();
}

Game_MapEnemy.prototype.updateSpawning = function(){
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

Game_MapEnemy.prototype.updateSelfMovement = function() {
    if($gameMap.isEventRunning())return false;
    if(this._spawnDur > 0)return false;
    if (this.stopCountThreshold() < this._stopCount) {
        this.resetStopCount();
        if(this.isNearPlayer()){
            if(!this.isBalloonPlaying())$gameTemp.requestBalloon(this, 1);
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
            }
        }else{
            this.resetStopCount();
            this.moveRandom();
        }
    }
    this.updateOnPlayer();
}

Game_MapEnemy.prototype.updateOnPlayer = function(){
    if($gameMap.isEventRunning())return;
    if($gameTemp.isCommonEventReserved())return;
    if(this._spawnDur > 0)return;
    if(this.menuCalling)return;
    if(this._gameEnemy.isDead()){
        this._noEnemy = true;
        return;
    }
    if(this.isCollidedWithPlayer() && $gameTroop._enemies.length <= 0 && !this._engaged && this._gameEnemy.isAlive()){
        $gameTroop.clear();
        $gameTroop._troopId = SynrecME.DefaultTroop;
        const data = this._gameEnemy.enemy();
        const mapEvnt = data.meta['Map Enemy Event'] ? eval(data.meta['Map Enemy Event']) : 0;
        if(mapEvnt){
            if(isNaN(mapEvnt))throw new Error('Map Event must be evaluated as a number.');
            $gameTemp.reserveCommonEvent(mapEvnt);
        }else{
            this.grabEnemies();
            this.fixEnemyPositions();
            this._engaged = true;
            $gameTroop.makeUniqueNames();
            BattleManager.initMembers();
            BattleManager.makeEscapeRatio();
            BattleManager._canEscape = $gameSystem._escapeMapEnemy || true;
            BattleManager._canLose = $gameSystem._loseMapEnemy || false;
            BattleManager.onEncounter();
            SceneManager.push(Scene_Battle);
        }
    }
}

Game_MapEnemy.prototype.updateDead = function(){
    if(this._gameEnemy.isDead()){
        this._noEnemy = true;
    }
}

Game_MapEnemy.prototype.grabEnemies = function(){
    const scene = SceneManager._scene
    for (let emem = 0; emem < scene._mapEnemies.length; emem++){
        const targetEnem = scene._mapEnemies[emem];
        const pluX = this._x + this._detectRange;
        const negX = this._x - this._detectRange;
        const pluY = this._y + this._detectRange;
        const negY = this._y - this._detectRange;
        if($gameTroop._enemies.length + 1 >= SynrecME.TroopMax)return;
        if(!$gameTroop._enemies.includes(targetEnem) && targetEnem._gameEnemy.isAlive()){
            if(targetEnem._x >= negX && targetEnem._x <= pluX && targetEnem._y >= negY && targetEnem._y <= pluY){
                $gameTroop._enemies.push(targetEnem._gameEnemy);
            }
        }
        if($gameTroop._enemies.length >= SynrecME.TroopMax)return;
    }
}

Game_MapEnemy.prototype.fixEnemyPositions = function(){
    const numEnemies = $gameTroop._enemies.length;
    const paramPosArr = SynrecME.EnemyPositions;
    const offsetX = 0;
    const offsetY = 300;
    for(let pos = 0; pos < numEnemies; pos++){
        let posX = (((Graphics.width / numEnemies) / 2) + (((Graphics.width / numEnemies) / 2) * pos)) + offsetX;
        let posY = offsetY;
        if(SynrecME.EnemyPositions[pos]){
            posX = SynrecME.EnemyPositions[pos]['Position X'];
            posY = SynrecME.EnemyPositions[pos]['Position Y'];
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
            if(enem._gameEnemy.isDead()){
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
    const allowedRegions = SynrecME.SpwnRgn;
    const bannedRegions = SynrecME.NoSpwnRgn;
    const retainEnemy = SynrecME.RetainEnemy;
    if(!$dataMap.meta.enemies)return;
    const enemyArr = JSON.parse($dataMap.meta.enemies);
    const enemyCnt = $dataMap.meta.enemyCount ? eval($dataMap.meta.enemyCount) : SynrecME.DefaultCount;
    this._mapEnemies = [];
    if(retainEnemy){
        if(SceneManager._mapEnemies && SceneManager._mapId == $gameMap._mapId){
            this._mapEnemies = SceneManager._mapEnemies;
            for(let chkr = 0; chkr < this._mapEnemies.length; chkr++){
                const chkE = this._mapEnemies[chkr];
                chkE.update();
                if(chkE._gameEnemy.isDead()){
                    this._mapEnemies.splice(chkr, 1);
                    chkr--;
                }
            }
            this._mapEnemies.forEach(function(enemy){
                const scene = SceneManager._scene;
                const gameEnem = enemy._gameEnemy;
                if(gameEnem.isAlive()){
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
        if(!chckArr(enemyArr))throw new Error("Incorrect form of enemies note tag. Please visit https://synrec.dev and check documentation.")
        let coords = [];
        for(let y = 0; y < $gameMap.height(); y++){
            for(let x = 0; x < $gameMap.width(); x++){
                const region = $gameMap.regionId(x, y);
                if(
                    !bannedRegions.includes(region) &&
                    (
                        allowedRegions.includes(region) ||
                        allowedRegions.length <= 0
                    )
                ){
                    coords.push([x,y]);
                }
            }
        }
        console.log(allowedRegions)
        while(this._mapEnemies.length < enemyCnt && coords.length > 0){
            const rndmEnemyIdx = Math.floor(Math.random() * enemyArr.length);
            const rndmEnemy = enemyArr[rndmEnemyIdx];
            const enemData = new Game_MapEnemy(rndmEnemy);
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
    if(!isNaN($dataMap.meta.eliteEnemy)){
        const enemyId = eval($dataMap.meta.eliteEnemy);
        let enemData = new Game_MapEnemy(enemyId);
        while(!this._eliteSpawned){
            var rndmX = Math.floor(Math.random() * $gameMap.width());
            var rndmY = Math.floor(Math.random() * $gameMap.height());
            var regionId = $gameMap.regionId(rndmX, rndmY);
            if(!bannedRegions.includes(regionId)){
                enemData.locate(rndmX, rndmY);
                var sprite = new Sprite_Character(enemData);
                this._spriteset._characterSprites.push(sprite);
                this._spriteset._tilemap.addChild(sprite);
                this._mapEnemies.push(enemData);
                SceneManager._mapEnemies = this._mapEnemies;
                SceneManager._mapId = $gameMap._mapId;
            }
        }
    }
}