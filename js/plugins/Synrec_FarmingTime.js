/*:
 * @target MZ
 * @author Synrec/Kylestclr
 * @url https://synrec.itch.io
 * @plugindesc v1.2 Farming / Day Period System
 * 
 * @command Open Calender
 * @desc Opens the calender scene
 * 
 * @command Add Farming Map
 * @desc Enables current map to be farming type
 * 
 * @command Remove Farming Map
 * @desc Disables current map from being farming type if not via note tag.
 * 
 * @command Change Time
 * @desc Modify the time in the game
 * 
 * @arg Seconds
 * @type number
 * @default 0
 * 
 * @arg Minutes
 * @type number
 * @default 0
 * 
 * @arg Hours
 * @type number
 * @default 0
 * 
 * @arg Days
 * @type number
 * @default 0
 * 
 * @help
 * 
 * Map Note Tags
 * - <Farming Map>
 * -- Map will always operate as a farming map.
 * -- Cannot use plugin commands to disable.
 * 
 * - <Outside Map>
 * -- Activates day period tint transition.
 * -- Must customize the tint setup in the plugin parameters
 * 
 * Skill Note Tags
 *  - <Fertilizer>
 *  -- This skill is useable as fertilizer
 *  --- Skill costs will be respected.
 * 
 * - <Hydrater: number>
 * -- This skill is useable as hydrater
 * -- Number refers to the water added to the cultivating object
 * 
 * Item Note Tags
 * 
 * - <Cultivate>
 * -- Item is usable as a cultivation item.
 * -- Configure item in plugin parameters
 * 
 * - <Fertilizer: number>
 * -- This item is useable as fertilizer
 * -- Number refers to the health added to the cultivating object
 * 
 * - <Hydrater: number>
 * -- This item is useable as hydrater
 * -- Number refers to the water added to the cultivating object
 * 
 * - <Month {monthIndex} Bonus: number>
 * -- Replace {monthIndex} with the index of the month in your calender.
 * --- For a calender of "Spring", "Summer", "Fall", "Winter"; <Month 0 Bonus: 5>
 * ---- This sets the bonus in Summer to be a value of 5.
 * ---- <Month 0 Bonus: Infinity> sets an infinite bonus condition.
 * ----- Do not set an infinite condition for month bonus.
 * 
 * - <Month {monthIndex} Decay: number>
 * -- Replace {monthIndex} with the index of the month in your calender.
 * --- For a calender of "Spring", "Summer", "Fall", "Winter"; <Month 1 Decay: 5>
 * ---- This sets the decay in Summer to be a value of 5.
 * ---- <Month 1 Decay: Infinity> sets an infinite decay condition.
 * 
 * - <Farm Harvest:number>
 * -- Designates the ID for harvest
 * -- If not used, uses same item ID
 * 
 * - <Farm Harvest Type: name>
 * -- Replace name with appropriate type
 * --- Types: actor (Monster Capture Only), item, weapon, armor
 * -- If not used, defaults to 'item'
 * 
 * - <Cultivate Fail Anim: number>
 * -- Replace number with the animation to be used
 * -- If not used, the plugin default is used.
 * 
 * - <Cultivate Success Anim: number>
 * -- Replace number with the animation to be used
 * -- If not used, the plugin default is used.
 * 
 * - <Cultivate Gfx File: name>
 * -- File in img/characters/
 * --- Please ensure file name has no spaces
 * 
 * - <Harvest Gfx File: name>
 * -- File in img/characters/
 * --- Please ensure file name has no spaces
 * 
 * - <Cultivate Gfx Index: number>
 * -- If using multi character sheet, please use numbers (0 ~ 7)
 * 
 * - <Harvest Gfx Index: number>
 * -- If using multi character sheet, please use numbers (0 ~ 7)
 * 
 * - <Cultivate Gfx Dir: number>
 * -- Valid numbers are 2(down), 4(left), 6(right), 8(up)
 * 
 * - <Harvest Gfx Dir: number>
 * -- Valid numbers are 2(down), 4(left), 6(right), 8(up)
 * 
 * @param General Settings
 * 
 * @param Farmable Region Tile
 * @type number
 * @default 100
 * @desc Region used for farmable tile
 * @parent General Settings
 * 
 * @param Player Only Harvest Collide
 * @type boolean
 * @default false
 * @desc Only player collides with harvestable object
 * @parent General Settings
 * 
 * @param Cultivation Setup
 * @type struct<Cultivate>[]
 * @default []
 * @desc Configure the stages of cultivation
 * @parent General Settings
 * 
 * @param Calender Setup
 * @type struct<Month>[]
 * @default []
 * @desc Configure calender data
 * @parent General Settings
 * 
 * @param Day Setup
 * @type text[]
 * @default []
 * @desc Configure days of the week
 * @parent General Settings
 * 
 * @param Day Hours
 * @type number
 * @default 24
 * @desc Number of hours in a day.
 * @parent General Settings
 * 
 * @param Initial Hour
 * @type number
 * @default 0
 * @desc Initial time when new game called
 * @parent Day Hours
 * 
 * @param Day Minutes
 * @type number
 * @default 60
 * @desc Number of minutes in an hour.
 * @parent Day Hours
 * 
 * @param Initial Minute
 * @type number
 * @default 0
 * @desc Initial time when new game called
 * @parent Day Minutes
 * 
 * @param Day Seconds
 * @type number
 * @default 60
 * @desc Number of seconds in a minute.
 * @parent Day Minutes
 * 
 * @param Initial Second
 * @type number
 * @default 0
 * @desc Initial time when new game called
 * @parent Day Seconds
 * 
 * @param Day Frames
 * @type number
 * @default 100
 * @desc Number of frames in a second.
 * @parent Day Seconds
 * 
 * @param Calender Scene Setup
 * 
 * @param Update Time On Scene
 * @type boolean
 * @default true
 * @desc Updates time on the scene
 * @parent Calender Scene Setup
 * 
 * @param Background Image
 * @type file
 * @dir img/pictures
 * @desc Image used for background, automatic centering
 * @parent Calender Scene Setup
 * 
 * @param Graphical Settings
 * 
 * @param Target Graphic File
 * @type file
 * @dir img/characters
 * @desc File used for farmable target graphic
 * @parent Graphical Settings
 * 
 * @param Target Graphic Index
 * @type number
 * @min 0
 * @max 7
 * @default 0
 * @desc Character index used
 * @parent Target Graphic File
 * 
 * @param Target Graphic Direction
 * @type select
 * @option up
 * @value 8
 * @option down
 * @value 2
 * @option left
 * @value 4
 * @option right
 * @value 6
 * @default 2
 * @desc Character direction used
 * @parent Target Graphic File
 * 
 * @param Default Cultivate Graphic File
 * @type file
 * @dir img/characters
 * @desc Select the character file for default graphic
 * @parent Graphical Settings
 * 
 * @param Default Cultivate Graphic Index
 * @type number
 * @min 0
 * @max 7
 * @default 0
 * @desc Character index used
 * @parent Default Cultivate Graphic File
 * 
 * @param Default Cultivate Graphic Direction
 * @type select
 * @option up
 * @value 8
 * @option down
 * @value 2
 * @option left
 * @value 4
 * @option right
 * @value 6
 * @default 2
 * @desc Character direction used
 * @parent Default Cultivate Graphic File
 * 
 * @param Default Harvest Graphic File
 * @type file
 * @dir img/characters
 * @desc Select the character file for default graphic
 * @parent Graphical Settings
 * 
 * @param Default Harvest Graphic Index
 * @type number
 * @min 0
 * @max 7
 * @default 0
 * @desc Character index used
 * @parent Default Harvest Graphic File
 * 
 * @param Default Harvest Graphic Direction
 * @type select
 * @option up
 * @value 8
 * @option down
 * @value 2
 * @option left
 * @value 4
 * @option right
 * @value 6
 * @default 2
 * @desc Character direction used
 * @parent Default Harvest Graphic File
 * 
 * @param Till Graphic File
 * @type file
 * @dir img/characters
 * @desc Graphic used for till area
 * @parent Graphical Settings
 * 
 * @param Till Graphic Index
 * @type number
 * @min 0
 * @max 7
 * @default 0
 * @desc Character index used
 * @parent Till Graphic File
 * 
 * @param Till Graphic Direction
 * @type select
 * @option up
 * @value 8
 * @option down
 * @value 2
 * @option left
 * @value 4
 * @option right
 * @value 6
 * @default 2
 * @desc Character direction used
 * @parent Till Graphic File
 * 
 * @param Animation Settings
 * @parent Graphical Settings
 * 
 * @param Failed Harvest Animation
 * @type animation
 * @default 3
 * @desc Animation to play on cultivate object
 * @parent Animation Settings
 * 
 * @param Success Harvest Animation
 * @type animation
 * @default 4
 * @desc Animation to play on cultivate object
 * @parent Animation Settings
 * 
 * @param Till Animation
 * @type animation
 * @default 1
 * @desc Animation to play on till creation
 * @parent Animation Settings
 * 
 * @param Till Despawn Animation
 * @type animation
 * @default 3
 * @desc Animation to play on till deletion
 * @parent Till Animation
 * 
 * @param Default Fertilize Animation
 * @type animation
 * @default 1
 * @desc Animation for fertilization
 * @parent Animation Settings
 * 
 * @param Default Hydrate Animation
 * @type animation
 * @default 1
 * @desc Animation for hydration
 * @parent Animation Settings
 * 
 * @param Balloon Settings
 * @parent Graphical Settings
 * 
 * @param Low Health Balloon
 * @parent Balloon Settings
 * @type number
 * @default 7
 * 
 * @param Harvest Ready Balloon
 * @parent Balloon Settings
 * @type number
 * @default 1
 * 
 * @param Map Tints
 * @type struct<maptint>[]
 * @default []
 * @desc Configure the time of day tints here.\nThey are distributed equally through the day.
 * @parent Graphical Settings
 * 
 */
/*~struct~maptint:
 * 
 * @param Red Value
 * @desc Amount of red applied
 * @type number
 * @default 0
 * 
 * @param Green Value
 * @desc Amount of green applied
 * @type number
 * @default 0
 * 
 * @param Blue Value
 * @desc Amount of blue applied
 * @type number
 * @default 0
 * 
 * @param Intensity Value
 * @desc Amount of intensity applied
 * @type number
 * @default 0
 */
/*~struct~Cultivate:
 * 
 * @param Name
 * @desc Does nothing.
 * @type text
 * @default CULTIVATION ITEM
 * 
 * @param Item
 * @desc Item used for cultivation.
 * @type item
 * @default 1
 * 
 * @param Growth Rate
 * @desc Speed at which cultivate is prepared
 * @type number
 * @min 1
 * @default 2
 * 
 * @param Hydration Bonus
 * @desc Bonus to growth rate hydration provides
 * @type number
 * @min 1
 * @default 1
 * 
 * @param Base Harvest
 * @desc Number obtained on harvest
 * @type number
 * @default 1
 * 
 * @param Random Harvest
 * @desc Additive random number obtained on harvest
 * @type number
 * @default 0
 * 
 * @param Initial Health
 * @desc Health cultivate starts with.
 * @type number
 * @default 40
 * 
 * @param Random Health
 * @desc Additively applies random health between 0 and this value.
 * @type number
 * @default 10
 * 
 * @param Max Health
 * @desc Max health of cultivate. \nCannot exceed.
 * @type number
 * @default 100
 * 
 * @param Initial Hydrate
 * @desc Hydration cultivate starts with.
 * @type number
 * @default 40
 * 
 * @param Random Hydrate
 * @desc Additively applies random health between 0 and this value.
 * @type number
 * @default 10
 * 
 * @param Max Hydrate
 * @desc Max hydration of cultivate. \nCannot exceed.
 * @type number
 * @default 100
 * 
 * @param Required Seconds
 * @desc Time required for cultivation
 * @type number
 * @default 0
 * 
 * @param Flux Seconds
 * @desc Time randomly added for cultivation
 * @type number
 * @default 0
 * 
 * @param Required Minutes
 * @desc Time required for cultivation
 * @type number
 * @default 0
 * 
 * @param Flux Minutes
 * @desc Time randomly added for cultivation
 * @type number
 * @default 0
 * 
 * @param Required Hours
 * @desc Time required for cultivation
 * @type number
 * @default 0
 * 
 * @param Flux Hours
 * @desc Time randomly added for cultivation
 * @type number
 * @default 0
 * 
 * @param Required Days
 * @desc Time required for cultivation
 * @type number
 * @default 0
 * 
 * @param Flux Days
 * @desc Time randomly added for cultivation
 * @type number
 * @default 0
 */
/*~struct~Month:
 *
 * @param Name
 * @desc What the month is called.
 * @type text
 * @default Random
 * 
 * @param Day Count
 * @desc Number of days in the month
 * @type number
 * @default 30
 * 
 */
function SYNREC_FARMING_DATA_PARSER(){
    if(typeof parameters == 'object'){
        const keys = Object.keys(parameters);
        keys.forEach((key)=>{
            if(isNaN(parameters[key])){
                try{
                    parameters[key] = JSON.parse(parameters[key]);
                }catch(e){
                    parameters[key] = parameters[key];
                }
            }
            if(typeof parameters[key] == 'object'){
                parameters[key] = SYNREC_FARMING_DATA_PARSER(parameters[key]);
            }else if(Array.isArray(parameters[key])){
                parameters[key] = parameters[key].map((data)=>{
                    if(isNaN(data)){
                        try{
                            data = JSON.parse(data);
                        }catch(e){
                            data = data;
                        }
                    }
                    if(typeof data == 'object'){
                        data = SYNREC_FARMING_DATA_PARSER(data);
                    }
                    return data;
                })
            }
        })
    }
    return parameters;
}

let e_indx = 0;
const SynrecFarm = {};
function LOAD_SYNREC_FARMING_DATA(){
    SynrecFarm.Plugin = PluginManager.parameters('Synrec_FarmingTime');
    SynrecFarm.DATA = SYNREC_FARMING_DATA_PARSER(SynrecFarm.Plugin);
    SynrecFarm.FarmRegionId = SynrecFarm.Plugin['Farmable Region Tile'];
    SynrecFarm.PlyrOnlyColl = SynrecFarm.Plugin['Player Only Harvest Collide'];
    SynrecFarm.DayHrs = SynrecFarm.Plugin['Day Hours'];
    SynrecFarm.DayMin = SynrecFarm.Plugin['Day Minutes'];
    SynrecFarm.DaySec = SynrecFarm.Plugin['Day Seconds'];
    SynrecFarm.DayFrm = SynrecFarm.Plugin['Day Frames'];

    SynrecFarm.InitHr = SynrecFarm.Plugin['Initial Hour'];
    SynrecFarm.InitMn = SynrecFarm.Plugin['Initial Minute'];
    SynrecFarm.InitSc = SynrecFarm.Plugin['Initial Second'];

    SynrecFarm.TargetFile = SynrecFarm.Plugin['Target Graphic File'];
    SynrecFarm.TargetIndx = SynrecFarm.Plugin['Target Graphic Index'];
    SynrecFarm.TargetDirc = SynrecFarm.Plugin['Target Graphic Direction'];

    SynrecFarm.CultiFile = SynrecFarm.Plugin['Default Cultivate Graphic File'];
    SynrecFarm.CultiIndx = SynrecFarm.Plugin['Default Cultivate Graphic Index'];
    SynrecFarm.CultiDirc = SynrecFarm.Plugin['Default Cultivate Graphic Direction'];

    SynrecFarm.HarvFile = SynrecFarm.Plugin['Default Harvest Graphic File'];
    SynrecFarm.HarvIndx = SynrecFarm.Plugin['Default Harvest Graphic Index'];
    SynrecFarm.HarvDirc = SynrecFarm.Plugin['Default Harvest Graphic Direction'];

    SynrecFarm.TillFile = SynrecFarm.Plugin['Till Graphic File'];
    SynrecFarm.TillIndx = SynrecFarm.Plugin['Till Graphic Index'];
    SynrecFarm.TillDirc = SynrecFarm.Plugin['Till Graphic Direction'];

    SynrecFarm.FailedAnim = SynrecFarm.Plugin['Failed Harvest Animation'] || 3;
    SynrecFarm.SuccessAnim = SynrecFarm.Plugin['Success Harvest Animation'] || 4;
    SynrecFarm.TillAnim = SynrecFarm.Plugin['Till Animation'] || 2;
    SynrecFarm.TillRemAnim = SynrecFarm.Plugin['Till Despawn Animation'] || 1;
    SynrecFarm.DefFertAnim = SynrecFarm.Plugin['Default Fertilize Animation'] || 76;
    SynrecFarm.DefWatrAnim = SynrecFarm.Plugin['Default Hydrate Animation'] || 82;

    SynrecFarm.LowHpBln = SynrecFarm.Plugin['Low Health Balloon'] || 7;
    SynrecFarm.HrvstBln = SynrecFarm.Plugin['Harvest Ready Balloon'] || 1;

    SynrecFarm.CalenderUpdateTime = SynrecFarm.Plugin['Update Time On Scene'];
    SynrecFarm.CalenderBack = SynrecFarm.Plugin['Background Image'];

    SynrecFarm.Cultivation = SynrecFarm.Plugin['Cultivation Setup'] || [];
    SynrecFarm.Calender = SynrecFarm.Plugin['Calender Setup'] || [];
    SynrecFarm.WeekDays = SynrecFarm.Plugin['Day Setup'] || ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    SynrecFarm.DayTints = SynrecFarm.Plugin['Map Tints'];

    if(SynrecFarm.DayTints.length > 0){
        const tints = SynrecFarm.DayTints;
        const hours = eval(SynrecFarm.DayHrs);
        const hrDiv = hours / tints.length;
        if(Math.floor(hrDiv) !== hrDiv){
            throw new Error(
                `Bad configuration of number of available hours and number of day tints.\n
                Please ensure an equal distribution of number of tints and number of hours.\n
                An example of this would be six (6) tints in a 24 hour period or\n
                five(5) tints in a ten(10) hour period.\n
                The resulting division must be a whole number.\n
                \n
                \n
                Please review plugin parameters.`
            )
        }
        SynrecFarm.DayConfig = [];
        for(let i = 0; i < tints.length; i++){
            const tint = tints[i];
            const initHr = i * hrDiv;
            const finnHr = initHr + (hrDiv - 1);
            const obj = {start:initHr, end:finnHr, tint:tint};
            SynrecFarm.DayConfig.push(obj);
        }
    }
}

function RELOAD_SYNREC_FARMING_DATA(){
    LOAD_SYNREC_FARMING_DATA();
}

LOAD_SYNREC_FARMING_DATA();

$gameCultivation = null;

SynrecFarm_DataMngrCrtGmObjs = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    SynrecFarm_DataMngrCrtGmObjs.call(this);
    $gameCultivation = new Game_Cultivation();
};

SynrecFarm_DataMngrMkSavConts = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    const contents = SynrecFarm_DataMngrMkSavConts.call(this);
    contents.cultivation = $gameCultivation;
    return contents;
};

SynrecFarm_DataMngrExSavConts = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    SynrecFarm_DataMngrExSavConts.call(this, contents);
    $gameCultivation = contents.cultivation;
};

PluginManager.registerCommand("Synrec_Farming", "Open Calender", ()=>{
    SceneManager.snapForBackground();
    SceneManager.push(Scene_Calender);
})

PluginManager.registerCommand("Synrec_Farming", "Add Farming Map", ()=>{
    const mapId = $gameMap._mapId;
    $gameSystem.addFarmingMap(mapId);
})

PluginManager.registerCommand("Synrec_Farming", "Remove Farming Map", ()=>{
    const mapId = $gameMap._mapId;
    $gameSystem.remFarmingMap(mapId);
})

PluginManager.registerCommand("Synrec_Farming", "Change Time", (obj)=>{
    obj['Seconds'] = eval(obj['Seconds']);
    obj['Minutes'] = eval(obj['Minutes']);
    obj['Hours'] = eval(obj['Hours']);
    obj['Days'] = eval(obj['Days']);
    $gameSystem.changeTime(obj);
    $gameCultivation.changeTime(obj);
})

SynrecFarm_GmSysInit = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    SynrecFarm_GmSysInit.call(this);
    this._farmingMaps = [];
    this.initTime();
}

Game_System.prototype.initTime = function(){
    this._currentHour = eval(SynrecFarm.InitHr) || 0;
    this._currentMinute = eval(SynrecFarm.InitMn) || 0;
    this._currentSecond = eval(SynrecFarm.InitSc) || 0;
    this._currentFrame = 0;
    this._currentDay = 0;
    this._currentDate = 1;
    this._currentMonth = 0;
    this._currentYear = 0;
}

Game_System.prototype.farmingMap = function(){
    if(!Array.isArray(this._farmingMaps))this._farmingMaps = [];
    const mapId = $gameMap._mapId;
    return (
        $dataMap.meta['Farming Map'] ||
        this._farmingMaps.includes(mapId)
    )
}

Game_System.prototype.addFarmingMap = function(id){
    if(!Array.isArray(this._farmingMaps))this._farmingMaps = [];
    if(this._farmingMaps.includes(id))return;
    if(isNaN(id))return;
    this._farmingMaps.push(id);
    this._farmingMaps.sort();
}

Game_System.prototype.remFarmingMap = function(id){
    if(!this._farmingMaps.includes(id))return;
    if(isNaN(id))return;
    const index = this._farmingMaps.indexOf(id);
    this._farmingMaps.splice(index, 1);
}

Game_System.prototype.changeTime = function(obj){
    this.modifySeconds(obj['Seconds']);
    this.modifyMinutes(obj['Minutes']);
    this.modifyHours(obj['Hours']);
    this.modifyDays(obj['Days']);
}

Game_System.prototype.modifySeconds = function(val){
    if(isNaN(val))val = 0;
    this._currentSecond += val;
}

Game_System.prototype.modifyMinutes = function(val){
    if(isNaN(val))val = 0;
    this._currentMinute += val;
}

Game_System.prototype.modifyHours = function(val){
    if(isNaN(val))val = 0;
    this._currentHour += val;
}

Game_System.prototype.modifyDays = function(val){
    if(isNaN(val))val = 0;
    const oldDate = JsonEx.makeDeepCopy(this._currentDate);
    this._currentDate += val;
    const newDate = JsonEx.makeDeepCopy(this._currentDate);
    const dateDiff = newDate - oldDate;
    this._currentDay += (dateDiff % SynrecFarm.WeekDays.length);
}

Game_System.prototype.updateTime = function(){
    this.updateFrame();
    this.updateSecond();
    this.updateMinute();
    this.updateHour();
    this.updateDay();
    this.updateMonth();
    this.updateYear();
    this.updateMapTint();
}

Game_System.prototype.updateFrame = function(){
    this._currentFrame++;
    if($gameCultivation){
        $gameCultivation.update();
    }
}

Game_System.prototype.updateSecond = function(){
    if(this._currentFrame < 0){
        this._currentSecond += Math.floor(this._currentFrame / eval(SynrecFarm.DayFrm));
        this._currentFrame = Math.floor(this._currentFrame % eval(SynrecFarm.DayFrm));
    }
    if(this._currentFrame < eval(SynrecFarm.DayFrm))return;
    this._currentSecond += Math.floor(this._currentFrame / eval(SynrecFarm.DayFrm));
    this._currentFrame = Math.floor(this._currentFrame % eval(SynrecFarm.DayFrm));
}

Game_System.prototype.updateMinute = function(){
    if(this._currentSecond < 0){
        this._currentMinute += Math.floor(this._currentSecond / eval(SynrecFarm.DaySec));
        this._currentSecond = Math.floor(this._currentSecond % eval(SynrecFarm.DaySec));
    }
    if(this._currentSecond < eval(SynrecFarm.DaySec))return;
    this._currentMinute += Math.floor(this._currentSecond / eval(SynrecFarm.DaySec));
    this._currentSecond = Math.floor(this._currentSecond % eval(SynrecFarm.DaySec));
}

Game_System.prototype.updateHour = function(){
    if(this._currentMinute < 0){
        this._currentHour += Math.floor(this._currentMinute / eval(SynrecFarm.DayMin));
        this._currentMinute = Math.floor(this._currentMinute % eval(SynrecFarm.DayMin));
    }
    if(this._currentMinute < eval(SynrecFarm.DayMin))return;
    this._currentHour += Math.floor(this._currentMinute / eval(SynrecFarm.DayMin));
    this._currentMinute = Math.floor(this._currentMinute % eval(SynrecFarm.DayMin));
}

Game_System.prototype.updateDay = function(){
    if(this._currentHour < 0){
        const oldDate = JsonEx.makeDeepCopy(this._currentDate);
        this._currentDate += Math.floor(this._currentHour / eval(SynrecFarm.DayHrs));
        this._currentHour = Math.floor(this._currentHour % eval(SynrecFarm.DayHrs));
        const newDate = JsonEx.makeDeepCopy(this._currentDate);
        const dateDiff = newDate - oldDate;
        this._currentDay += (dateDiff % SynrecFarm.WeekDays.length);
        if(this._currentDay >= SynrecFarm.WeekDays.length){
            this._currentDay = this._currentDay % SynrecFarm.WeekDays.length;
        }
    }
    if(this._currentHour < eval(SynrecFarm.DayHrs))return;
    const oldDate = JsonEx.makeDeepCopy(this._currentDate);
    this._currentDate += Math.floor(this._currentHour / eval(SynrecFarm.DayHrs));
    this._currentHour = Math.floor(this._currentHour % eval(SynrecFarm.DayHrs));
    const newDate = JsonEx.makeDeepCopy(this._currentDate);
    const dateDiff = newDate - oldDate;
    this._currentDay += (dateDiff % SynrecFarm.WeekDays.length);
    if(this._currentDay >= SynrecFarm.WeekDays.length){
        this._currentDay = this._currentDay % SynrecFarm.WeekDays.length;
    }
}

Game_System.prototype.updateMonth = function(){
    if(this._currentDate < 0){
        let monthObj = SynrecFarm.Calender[this._currentMonth];
        if(!monthObj)return;
        let maxDays = monthObj['Day Count'];
        while(this._currentDate < 0){
            this._currentMonth--;
            this._currentDate += eval(maxDays);
            monthObj = SynrecFarm.Calender[this._currentMonth];
            if(!monthObj)break;
            maxDays = monthObj['Day Count'];
        }
    }
    let monthObj = SynrecFarm.Calender[this._currentMonth];
    if(!monthObj)return;
    let maxDays = monthObj['Day Count'];
    while(this._currentDate > maxDays){
        this._currentMonth++;
        this._currentDate -= eval(maxDays);
        monthObj = SynrecFarm.Calender[this._currentMonth];
        maxDays = monthObj['Day Count'];
    }
}

Game_System.prototype.updateYear = function(){
    if(this._currentMonth < 0){
        this._currentYear += Math.floor(this._currentMonth / SynrecFarm.Calender.length);
        this._currentMonth = Math.floor(this._currentMonth % SynrecFarm.Calender.length);
    }
    if(this._currentMonth >= SynrecFarm.Calender.length){
        this._currentYear += Math.floor(this._currentMonth / SynrecFarm.Calender.length);
        this._currentMonth = Math.floor(this._currentMonth % SynrecFarm.Calender.length);
        if(this._currentYear >= Number.MAX_VALUE){
            this._currentYear = 0;
        }
    }
}

Game_System.prototype.updateMapTint = function(){
    if(!$dataMap.meta['Outside Map']){
        $gameScreen.startTint([0, 0, 0, 0], 60);
        return;
    }
    if($gameMap.isEventRunning())return;
    $gameScreen._toneDuration = 0;
    const objects = this.getTintObjects();
    const curObj = objects[0];
    const curTint = curObj.tint;
    const nxtObj = objects[1];
    const nxtTint = nxtObj.tint;
    const hr = this._currentHour;
    if(hr != curObj.end){
        const red = curTint['Red Value'];
        const grn = curTint['Green Value'];
        const blu = curTint['Blue Value'];
        const alp = curTint['Intensity Value'];
        $gameScreen._tone = [red, grn, blu, alp];
    }else if(hr == curObj.end){
        const minRat = this._currentMinute / eval(SynrecFarm.DayMin);
        const redDiff = Math.abs(curTint['Red Value'] - nxtTint['Red Value']) * minRat;
        const grnDiff = Math.abs(curTint['Green Value'] - nxtTint['Green Value']) * minRat;
        const bluDiff = Math.abs(curTint['Blue Value'] - nxtTint['Blue Value']) * minRat;
        const alpDiff = Math.abs(curTint['Intensity Value'] - nxtTint['Intensity Value']) * minRat;
        const red = nxtTint['Red Value'] > curTint['Red Value'] ? curTint['Red Value'] + redDiff : curTint['Red Value'] - redDiff;
        const grn = nxtTint['Green Value'] > curTint['Green Value'] ? curTint['Green Value'] + grnDiff : curTint['Green Value'] - grnDiff;
        const blu = nxtTint['Blue Value'] > curTint['Blue Value'] ? curTint['Blue Value'] + bluDiff : curTint['Blue Value'] - bluDiff;
        const alp = nxtTint['Intensity Value'] > curTint['Intensity Value'] ? curTint['Intensity Value'] + alpDiff : curTint['Intensity Value'] - alpDiff;
        $gameScreen._tone = [red, grn, blu, alp];
    }
}

Game_System.prototype.getTintObjects = function(){
    const configTints = SynrecFarm.DayConfig;
    if(configTints.length <= 0)return [];
    const hr = this._currentHour;
    let index = 0;
    let current, next;
    for(let i = 0; i < configTints.length; i++){
        const config = configTints[i];
        const strt = config.start;
        const finn = config.end;
        if(strt <= hr && hr <= finn){
            index = (i + 1) % configTints.length;
            current = config;
            next = configTints[index];
            break;
        }
    }
    return [current, next];
}

function Game_FarmTarget(){
    this.initialize(...arguments);
}

Game_FarmTarget.prototype = Object.create(Game_Character.prototype);
Game_FarmTarget.prototype.constructor = Game_FarmTarget;

Game_FarmTarget.prototype.initialize = function(){
    Game_Character.prototype.initialize.call(this);
    this.setTransparent(true);
    this.setThrough(true);
    this.setImage(SynrecFarm.TargetFile, eval(SynrecFarm.TargetIndx));
    this.setDirection(eval(SynrecFarm.TargetDirc));
    this.setStepAnime(true);
}

Game_FarmTarget.prototype.update = function(){
    Game_Character.prototype.update.call(this);
    this.updateTarget();
}

Game_FarmTarget.prototype.updateTarget = function(){
    if($gameSystem.farmingMap()){
        const x = $gamePlayer.x;
        const y = $gamePlayer.y;
        const d = $gamePlayer.direction();
        const x2 = $gameMap.roundXWithDirection(x, d);
        const y2 = $gameMap.roundYWithDirection(y, d);
        if(this.x == x2 && this.y == y2)return;
        this.locate(x2, y2);
        if($gameMap.regionId(x2, y2) == eval(SynrecFarm.FarmRegionId)){
            this.setTransparent(false);
        }else{
            this.setTransparent(true);
        }
    }else{
        this.setTransparent(true);
    }
}

function Game_TillObject(){
    this.initialize(...arguments);
}

Game_TillObject.prototype = Object.create(Game_Character.prototype);
Game_TillObject.prototype.constructor = Game_TillObject;

Game_TillObject.prototype.initialize = function(){
    Game_Character.prototype.initialize.call(this);
    this._mapId = $gameMap._mapId;
    this.setStepAnime(true);
    this.setImage(SynrecFarm.TillFile, eval(SynrecFarm.TillIndx));
    this.setDirection(eval(SynrecFarm.TillDirc));
    this.setPriorityType(0);
    if(eval(SynrecFarm.TillAnim)){
        $gameTemp.requestAnimation([this], eval(SynrecFarm.TillAnim));
    }
}

Game_TillObject.prototype.update = function(){
    Game_Character.prototype.update.call(this);
    this.updateOnMap();
    this.updateDelete();
}

Game_TillObject.prototype.updateOnMap = function(){
    const scene = SceneManager._scene;
    const spriteset = scene._spriteset;
    if(!spriteset)return;
    const charSprites = spriteset._characterSprites;
    const mapId = this._mapId;
    const obj = this;
    if(mapId == $gameMap._mapId){
        const sprite = charSprites.find((sprte)=>{
            return sprte._character == obj;
        })
        if(sprite){
            if(
                obj._opacity <= 0 &&
                (
                    this._doDelete
                ) &&
                !obj.isAnimationPlaying()
            ){
                for(let i = 0; i < charSprites.length; i++){
                    const sprite = charSprites[i];
                    if(sprite._character == obj){
                        spriteset._characterSprites.splice(i, 1);
                        break;
                    }
                }
                return;
            }
        }else if(!sprite){
            const sprite = new Sprite_Character(obj);
            spriteset._tilemap.addChild(sprite);
            spriteset._characterSprites.push(sprite);
        }
    }else{
        for(let i = 0; i < charSprites.length; i++){
            const sprite = charSprites[i];
            if(sprite._character == obj){
                spriteset._tilemap.removeChild(obj);
                spriteset._characterSprites.splice(i, 1);
                break;
            }
        }
    }
}

Game_TillObject.prototype.updateDelete = function(){
    if(!$gameSystem.farmingMap())this._rsvpDelete = true;
    const mapId = this._mapId;
    const x = this.x;
    const y = this.y;
    if(!this._rsvpDelete){
        const harvestable = $gameCultivation._data.some((data)=>{
            if(data._mapId == mapId){
                return (
                    data._harvestable &&
                    data.x == x &&
                    data.y == y
                )
            }
        })
        this._rsvpDelete = harvestable;
        return;
    }
    if(this._rsvpDelete && !this._doDelete){
        if(this._opacity > 0)this._opacity -= 25;
        if(this._opacity <= 0){
            this._doDelete = true;
            if(eval(SynrecFarm.TillRemAnim)){
                $gameTemp.requestAnimation([this], eval(SynrecFarm.TillRemAnim));
            }
        }
        return;
    }
    if(!this.isAnimationPlaying() && this._doDelete){
        $gameCultivation.remTilled(this);
    }
}

function Game_FarmObject(){
    this.initialize(...arguments);
}

Game_FarmObject.prototype = Object.create(Game_Character.prototype);
Game_FarmObject.prototype.constructor = Game_FarmObject;

Game_FarmObject.prototype.initialize = function(itemId){
    Game_Character.prototype.initialize.call(this);
    this._itemId = itemId;
    this._mapId = $gameMap._mapId;
    this._health = 100;
    this._hydration = 100;
    this._maxHealth = 100;
    this._maxHydration = 100;
    this.setupCultivation();
    this.setStepAnime(true);
}

Game_FarmObject.prototype.setupCultivation = function(){
    const itemID = this._itemId;
    const item = $dataItems[this._itemId];
    const harvest = eval(item.meta['Farm Harvest']) || this._itemId;
    const harvestType = item.meta['Farm Harvest Type'] || `item`;
    const cultivation = SynrecFarm.Cultivation.find((data)=>{
        return data['Item'] == itemID;
    });
    if(
        !cultivation ||
        !$gameSystem.farmingMap()
    ){
        SoundManager.playBuzzer();
        this._failedCultivation = true;
        return;
    }
    const amount = cultivation['Base Harvest'] + (Math.randomInt(cultivation['Random Harvest']));
    this._frames = eval(SynrecFarm.DayFrm);
    this._seconds = this.generateSeconds(cultivation);
    this._minutes = this.generateMinutes(cultivation);
    this._hours = this.generateHours(cultivation);
    this._days = this.generateDays(cultivation);
    this._growRate = eval(cultivation['Growth Rate']) || 1;
    this._hydrateGrowth = eval(cultivation['Hydration Bonus']) || 1;
    this._maxHealth = eval(cultivation['Max Health']);
    this._health = Math.min(this._maxHealth, eval(cultivation['Initial Health']) + (Math.randomInt(eval(cultivation['Random Health']))));
    this._maxHydration = eval(cultivation['Max Hydrate']);
    this._hydration = Math.min(this._maxHydration, eval(cultivation['Initial Hydrate']) + (Math.randomInt(eval(cultivation['Random Hydrate']))));
    this._harvest = {id:harvest, type:harvestType.replace(/\s/g, ''), amt:amount};
    const charFile = item.meta['Cultivate Gfx File'] || SynrecFarm.CultiFile;
    const charIndx = eval(item.meta['Cultivate Gfx Index']) || eval(SynrecFarm.CultiIndx);
    this.setImage(charFile.replace(/\s/g, ''), charIndx);
    const charDir = eval(item.meta['Cultivate Gfx Dir']) || eval(SynrecFarm.CultiDirc);
    this.setDirection(charDir);
    this._doCultivation = true;
    $gameCultivation.addCultivate(this);
}

Game_FarmObject.prototype.fertilize = function(value){
    if(isNaN(value))value = 0;
    this._health += value;
    if(this._health > this._maxHealth)this._health = this._maxHealth;
    if(this._health < 0)this._health = 0;
}

Game_FarmObject.prototype.water = function(value){
    if(isNaN(value))value = 0;
    this._hydration += value;
    if(this._hydration > this._maxHydration)this._hydration = this._maxHydration;
    if(this._hydration < 0)this._hydration = 0;
}

Game_FarmObject.prototype.harvest = function(){
    if(!this._harvest){
        SoundManager.playBuzzer();
        return;
    }
    const id = this._harvest.id;
    const type = this._harvest.type;
    const amt = this._harvest.amt;
    if(id && type){
        this._successCultivation = true;
        switch(type){
            case 'actor':return this.harvestActor(id, amt);
            case 'item':return this.harvestItem(id, amt);
            case 'weapon':return this.harvestWeapon(id, amt);
            case 'armor':return this.harvestArmor(id, amt);
            default: return this.harvestItem(id, amt);
        }
    }
}

Game_FarmObject.prototype.harvestActor = function(id, amt){
    if(isNaN(amt))amt = 0;
    for(let i = 0; i < amt; i++)$gameParty.addActor(id);
}

Game_FarmObject.prototype.harvestItem = function(id, amt){
    if(isNaN(amt))amt = 0;
    const item = $dataItems[id];
    $gameParty.gainItem(item, amt);
}

Game_FarmObject.prototype.harvestWeapon = function(id, amt){
    if(isNaN(amt))amt = 0;
    const item = $dataWeapons[id];
    $gameParty.gainItem(item, amt);
}

Game_FarmObject.prototype.harvestArmor = function(id, amt){
    if(isNaN(amt))amt = 0;
    const item = $dataArmors[id];
    $gameParty.gainItem(item, amt);
}

Game_FarmObject.prototype.generateSeconds = function(cultivation){
    const base = eval(cultivation['Required Seconds']);
    const flux = Math.randomInt(eval(cultivation['Flux Seconds']));
    return base + flux;
}

Game_FarmObject.prototype.generateMinutes = function(cultivation){
    const base = eval(cultivation['Required Minutes']);
    const flux = Math.randomInt(eval(cultivation['Flux Minutes']));
    return base + flux;
}

Game_FarmObject.prototype.generateHours = function(cultivation){
    const base = eval(cultivation['Required Hours']);
    const flux = Math.randomInt(eval(cultivation['Flux Hours']));
    return base + flux;
}

Game_FarmObject.prototype.generateDays = function(cultivation){
    const base = eval(cultivation['Required Days']);
    const flux = Math.randomInt(eval(cultivation['Flux Days']));
    return base + flux;
}

Game_FarmObject.prototype.changeTime = function(obj){
    this.modifySeconds(eval(obj['Seconds']));
    this.modifyMinutes(eval(obj['Minutes']));
    this.modifyHours(eval(obj['Hours']));
    this.modifyDays(eval(obj['Days']));
}

Game_FarmObject.prototype.modifySeconds = function(val){
    if(isNaN(val))val = 0;
    this._seconds += val;
}

Game_FarmObject.prototype.modifyMinutes = function(val){
    if(isNaN(val))val = 0;
    this._minutes += val;
}

Game_FarmObject.prototype.modifyHours = function(val){
    if(isNaN(val))val = 0;
    this._hours += val;
}

Game_FarmObject.prototype.modifyDays = function(val){
    if(isNaN(val))val = 0;
    this._days += val;
}

Game_FarmObject.prototype.update = function(){
    Game_Character.prototype.update.call(this);
    if(this.updateDelete())return;
    this.updateHarvest();
    this.updateOnMap();
}

Game_FarmObject.prototype.updateDelete = function(){
    const doDelete = this._failedCultivation || this._successCultivation;
    if(!this._animPlayed){
        if(this._failedCultivation){
            const item = $dataItems[this._itemId];
            const failAnim = eval(item.meta['Cultivate Fail Anim']) || eval(SynrecFarm.FailedAnim);
            if(failAnim){
                $gameTemp.requestAnimation([this], failAnim);
            }
            this._animPlayed = true;
        }
        if(this._successCultivation){
            const item = $dataItems[this._itemId];
            const successAnim = eval(item.meta['Cultivate Success Anim']) || eval(SynrecFarm.SuccessAnim);
            if(successAnim){
                $gameTemp.requestAnimation([this], successAnim);
            }
            this._animPlayed = true;
        }
        return doDelete;
    }
    if(this.isAnimationPlaying())return doDelete;
    if(doDelete){
        this._removeFromGame = true;
        this._opacity -= 5;
        this.updateOnMap();
    }
    return doDelete
}

Game_FarmObject.prototype.updateHarvest = function(){
    if(this.updateHarvestable()){
        this.setHarvestState();
        return;
    }
    if(!$gameSystem.farmingMap())this._failedCultivation = true;
    if(this._failedCultivation || this._successCultivation)return;
    this.updateFrames();
    this.updateSeconds();
    this.updateMinutes();
    this.updateHours();
    this.updateDays();
}

Game_FarmObject.prototype.updateHarvestable = function(){
    if(
        this._seconds <= 0 &&
        this._minutes <= 0 &&
        this._hours <= 0 &&
        this._days <= 0
    ){
        if(!this.isBalloonPlaying()){
            $gameTemp.requestBalloon(this, eval(SynrecFarm.HrvstBln))
        }
        return true;
    }
    return false;
}

Game_FarmObject.prototype.updateFrames = function(){
    const healthRatio = this._health / this._maxHealth;
    const hydroRatio = this._hydration / this._maxHydration;
    if(!this.isBalloonPlaying() && healthRatio < 0.33){
        $gameTemp.requestBalloon(this, eval(SynrecFarm.LowHpBln))
    }
    const bonus = Math.round(this._hydrateGrowth * hydroRatio);
    const rate = Math.min(100, Math.max(1, Math.floor(this._growRate * healthRatio) + bonus + this.applyMonthBonus()));
    const decay = (this._growRate - rate) + this.applyMonthDecay();
    for(let i = 0; i < rate; i++){
        this._frames--;
        if(this._frames < 0)this._frames = 0;
    }
    if(this._frames <= 0){
        this._health -= decay;
        this._hydration--;
    }
    if(this._health <= 0){
        this._health = 0;
        this._failedCultivation = true;
    }
}

Game_FarmObject.prototype.updateSeconds = function(){
    if(this._frames <= 0 && this._seconds > 0){
        this._frames = eval(SynrecFarm.DayFrm);
        this._seconds--;
        if(this._seconds < 0)this._seconds = 0;
    }
}

Game_FarmObject.prototype.updateMinutes = function(){
    if(this._seconds <= 0 && this._minutes > 0){
        this._seconds = eval(SynrecFarm.DaySec);
        this._minutes--;
        if(this._minutes < 0)this._minutes = 0;
    }
}

Game_FarmObject.prototype.updateHours = function(){
    if(this._minutes <= 0 && this._hours > 0){
        this._minutes = eval(SynrecFarm.DayMin);
        this._hours--;
        if(this._hours < 0)this._hours = 0;
    }
}

Game_FarmObject.prototype.updateDays = function(){
    if(this._hours <= 0 && this._days > 0){
        this._hours = eval(SynrecFarm.DayHrs);
        this._days--;
        if(this._days < 0)this._days = 0;
    }
}

Game_FarmObject.prototype.updateOnMap = function(){
    const scene = SceneManager._scene;
    const spriteset = scene._spriteset;
    if(!spriteset)return;
    const charSprites = spriteset._characterSprites;
    const mapId = this._mapId;
    const obj = this;
    if(mapId == $gameMap._mapId){
        const sprite = charSprites.find((sprte)=>{
            return sprte._character == obj;
        })
        if(sprite){
            if(
                obj._opacity <= 0 &&
                (
                    this._removeFromGame
                ) &&
                !obj.isAnimationPlaying()
            ){
                for(let i = 0; i < charSprites.length; i++){
                    const sprite = charSprites[i];
                    if(sprite._character == obj){
                        spriteset._tilemap.removeChild(obj);
                        spriteset._characterSprites.splice(i, 1);
                        break;
                    }
                }
                $gameCultivation.remCultivate(this);
                return;
            }
        }else if(!sprite){
            const sprite = new Sprite_Character(obj);
            spriteset._tilemap.addChild(sprite);
            spriteset._characterSprites.push(sprite);
        }
    }else{
        for(let i = 0; i < charSprites.length; i++){
            const sprite = charSprites[i];
            if(sprite._character == obj){
                spriteset._tilemap.removeChild(obj);
                spriteset._characterSprites.splice(i, 1);
                break;
            }
        }
    }
}

Game_FarmObject.prototype.setHarvestState = function(){
    this._harvestable = true;
    if(!this._setHarvestGfx){
        const item = $dataItems[this._itemId];
        const charFile = item.meta['Harvest Gfx File'] || SynrecFarm.HarvFile;
        const charIndx = eval(item.meta['Harvest Gfx Index']) || eval(SynrecFarm.HarvIndx);
        this.setImage(charFile.replace(/\s/g, ''), charIndx);
        const charDir = eval(item.meta['Harvest Gfx Dir']) || eval(SynrecFarm.HarvDirc);
        this.setDirection(charDir);
        this._setHarvestGfx = true;
    }
}

Game_FarmObject.prototype.applyMonthBonus = function(){
    const monthIndex = $gameSystem._currentMonth;
    const data = $dataItems[this._itemId];
    return eval(data.meta[`Month ${monthIndex} Bonus`]) || 0;
}

Game_FarmObject.prototype.applyMonthDecay = function(){
    const monthIndex = $gameSystem._currentMonth;
    const data = $dataItems[this._itemId];
    return eval(data.meta[`Month ${monthIndex} Decay`]) || 0;
}

function Game_Cultivation(){
    this.initialize(...arguments);
}

Game_Cultivation.prototype.initialize = function(){
    this._data = [];
    this._tilled = [];
}

Game_Cultivation.prototype.update = function(){
    this._data.concat(this._tilled).forEach((cultivate)=>{
        cultivate.update();
    })
}

Game_Cultivation.prototype.changeTime = function(obj){
    this._data.forEach((cultivate)=>{
        cultivate.changeTime(obj);
    })
}

Game_Cultivation.prototype.cultivate = function(){
    const d = $gamePlayer.direction();
    const x = $gamePlayer.x;
    const y = $gamePlayer.y;
    const x2 = $gameMap.roundXWithDirection(x, d);
    const y2 = $gameMap.roundYWithDirection(y, d);
    return this._data.find((cultivate)=>{
        return cultivate.x == x2 && cultivate.y == y2 && !(cultivate._failedCultivation || cultivate._successCultivation);
    })
}

Game_Cultivation.prototype.tilledSoil = function(){
    const d = $gamePlayer.direction();
    const x = $gamePlayer.x;
    const y = $gamePlayer.y;
    const x2 = $gameMap.roundXWithDirection(x, d);
    const y2 = $gameMap.roundYWithDirection(y, d);
    return this._tilled.find((soil)=>{
        return soil.x == x2 && soil.y == y2 && !soil._rsvpDelete;
    })
}

Game_Cultivation.prototype.addCultivate = function(obj){
    if(this._data.includes(obj))return;
    this._data.push(obj);
}

Game_Cultivation.prototype.remCultivate = function(obj){
    if(!this._data.includes(obj))return;
    const index = this._data.indexOf(obj);
    if(index >= 0){
        this._data.splice(index, 1);
    }
}

Game_Cultivation.prototype.addTilled = function(obj){
    if(this._tilled.includes(obj))return;
    this._tilled.push(obj);
}

Game_Cultivation.prototype.remTilled = function(obj){
    if(!this._tilled.includes(obj))return;
    const index = this._tilled.indexOf(obj);
    if(index >= 0){
        this._tilled.splice(index, 1);
    }
}

SynrecFarm_GmCharBseCnPass = Game_CharacterBase.prototype.canPass;
Game_CharacterBase.prototype.canPass = function(x, y, d) {
    if(eval(SynrecFarm.PlyrOnlyColl) && !this instanceof Game_Player){
        return SynrecFarm_GmCharBseCnPass.call(this, x, y, d);
    }
    const x2 = $gameMap.roundXWithDirection(x, d);
    const y2 = $gameMap.roundYWithDirection(y, d);
    if (this.collideWithFarmObject(x2, y2)) {
        return false;
    }
    return SynrecFarm_GmCharBseCnPass.call(this, x, y, d);
}

Game_CharacterBase.prototype.collideWithFarmObject = function(x, y){
    const farmObjs = $gameCultivation._data.filter((cultivate)=>{
        if(
            cultivate._mapId == $gameMap._mapId &&
            cultivate._harvestable
        ){
            return true;
        }
    })
    return farmObjs.some((cultivate)=>{
        return cultivate.x == x && cultivate.y == y;
    });
}

SynrecFarm_GmPlyrMvInpt = Game_Player.prototype.moveByInput;
Game_Player.prototype.moveByInput = function() {
    if (!this.isMoving() && this.canMove()) {
        if(Input._pressedTime > 3){
            SynrecFarm_GmPlyrMvInpt.call(this);
        }else{
            if(Input.dir4 && !this.isOnLadder()){
                this.setDirection(Input.dir4);
            }
        }
    }
};

SynrecFarm_GmPlyrTrigBtnAct = Game_Player.prototype.triggerButtonAction;
Game_Player.prototype.triggerButtonAction = function() {
    if (Input.isTriggered("ok")) {
        if(this.farmableRegion())return true;
    }
    return SynrecFarm_GmPlyrTrigBtnAct.call(this);
}

Game_Player.prototype.farmableRegion = function(){
    const d = this.direction();
    const x = this.x;
    const y = this.y;
    const x2 = $gameMap.roundXWithDirection(x, d);
    const y2 = $gameMap.roundYWithDirection(y, d);
    const region = $gameMap.regionId(x2, y2);
    if(region == eval(SynrecFarm.FarmRegionId)){
        this.openFarmMenu();
        return true;
    }
    return false;
}

Game_Player.prototype.openFarmMenu = function(){
    const scene = SceneManager._scene;
    scene.openFarmMenu();
}

SynrecFarm_GmPlyrUpdt = Game_Player.prototype.update;
Game_Player.prototype.update = function(sceneActive) {
    if(!this.farmMenu()){
        SynrecFarm_GmPlyrUpdt.call(this, sceneActive);
    }
}

Game_Player.prototype.farmMenu = function(){
    const scene = SceneManager._scene;
    const farmCommand = scene._farmCommand;
    const farmSow = scene._farmSow;
    const farmFertilizer = scene._fertilizeCommand;
    const farmSkillFertile = scene._fertilizeSkill;
    const farmItemFertile = scene._fertilizeItem;
    if(
        farmCommand.visible ||
        farmSow.visible ||
        farmFertilizer.visible ||
        farmSkillFertile.visible ||
        farmItemFertile.visible
    )return true;
    return false;
}

function Window_FarmCommand(){
    this.initialize(...arguments);
}

Window_FarmCommand.prototype = Object.create(Window_Command.prototype);
Window_FarmCommand.prototype.constructor = Window_FarmCommand;

Window_FarmCommand.prototype.maxCols = function(){
    return 5;
}

Window_FarmCommand.prototype.makeCommandList = function(){
    this.addNormalCommands();
    this.addExtraCommands();
    this.addExitCommand();
}

Window_FarmCommand.prototype.addNormalCommands = function(){
    this.addCommand('Harvest', 'harvest');
    this.addCommand('Sow', 'sow');
    this.addCommand('Fertilize', 'fertilize');
    this.addCommand('Water', 'water');
    this.addCommand('Till', 'till');
}

Window_FarmCommand.prototype.addExtraCommands = function(){}

Window_FarmCommand.prototype.addExitCommand = function(){
    // this.addCommand('Exit', 'exit');
}

function Window_FarmSow(){
    this.initialize(...arguments);
}

Window_FarmSow.prototype = Object.create(Window_Selectable.prototype);
Window_FarmSow.prototype.constructor = Window_FarmSow;

Window_FarmSow.prototype.maxItems = function(){
    return $gameParty.items().filter((item)=>{
        return item.meta['Cultivate'];
    }).length;
}

Window_FarmSow.prototype.maxCols = function(){
    return 3;
}

Window_FarmSow.prototype.update = function(){
    Window_Selectable.prototype.update.call(this);
    this.updateData();
}

Window_FarmSow.prototype.updateData = function(){
    const items = $gameParty.items().filter((item)=>{
        if(item){
            return item.meta['Cultivate'];
        }
    })
    if(this._data != items){
        this._data = items;
        this.refresh();
    }
}

Window_FarmSow.prototype.drawItem = function(i){
    const item = this._data[i];
    if(!item)return;
    const rect = this.itemRect(i);
    const name = item.name;
    const icon = item.iconIndex;
    const num = $gameParty.numItems(item);
    this.drawIcon(icon, rect.x + 2, rect.y + 2);
    this.drawText(`${name}[${num}]`, rect.x + 2, rect.y + 2, rect.width - 34, 'center');
}

Window_FarmSow.prototype.itemSow = function(){
    const index = this.index();
    const item = this._data[index];
    return item;
}

function Window_FarmFertile(){
    this.initialize(...arguments);
}

Window_FarmFertile.prototype = Object.create(Window_Command.prototype);
Window_FarmFertile.prototype.constructor = Window_FarmFertile;

Window_FarmFertile.prototype.makeCommandList = function(){
    this.addCommand(`${TextManager.skill}`, 'skill', this.hasValidFertileSkill());
    this.addCommand(`${TextManager.item}`, 'item', this.hasValidFertileItem());
}

Window_FarmFertile.prototype.hasValidFertileSkill = function(){
    const skills = $gameParty.members().map((member)=>{
        const skills = member.skills().filter((skill)=>{
            return(
                member.canPaySkillCost(skill) &&
                skill.meta['Fertilizer']
            );
        });
        return skills
    });
    return skills.length > 0;
}

Window_FarmFertile.prototype.hasValidFertileItem = function(){
    const items = $gameParty.items();
    return items.some((item)=>{
        return item.meta['Fertilizer'];
    })
}

function Window_FertileSkill(){
    this.initialize(...arguments);
}

Window_FertileSkill.prototype = Object.create(Window_Selectable.prototype);
Window_FertileSkill.prototype.constructor = Window_FertileSkill;

Window_FertileSkill.prototype.maxItems = function(){
    let skillNum = 0;
    $gameParty.members().forEach((member)=>{
        const skills = member.skills().filter((skill)=>{
            return(
                member.canPaySkillCost(skill) &&
                skill.meta['Fertilizer']
            );
        });
        skillNum += skills.length;
    });
    return skillNum || 1;
}

Window_FertileSkill.prototype.maxCols = function(){
    return 3;
}

Window_FertileSkill.prototype.update = function(){
    Window_Selectable.prototype.update.call(this);
    this.updateData();
}

Window_FertileSkill.prototype.updateData = function(){
    const info = $gameParty.members().map((member)=>{
        const skills = member.skills().filter((skill)=>{
            return(
                member.canPaySkillCost(skill) &&
                skill.meta['Fertilizer']
            );
        });
        const obj = {};
        obj.actor = member;
        obj.skills = skills;
        return obj;
    });
    const data = [];
    for(let i = 0; i < info.length; i++){
        const actor = info[i].actor;
        const skills = info[i].skills;
        for(let q = 0; q < skills.length; q++){
            const obj = {};
            obj.actor = actor;
            obj.skill = skills[q];
            data.push(obj);
        }
    }
    if(this._data != data){
        this._data = data;
        this.refresh();
    }
}

Window_FertileSkill.prototype.drawItem = function(i){
    const obj = this._data[i];
    if(!obj)return;
    const rect = this.itemRect(i);
    const actor = obj.actor;
    const skill = obj.skill;
    this.drawActorFace(actor, rect.x, rect.y, Math.min(144, rect.width / 2), Math.min(144, rect.height));
    const name = skill.name;
    const icon = skill.iconIndex;
    const mpCost = `${actor.skillMpCost(skill)}${TextManager.mpA}`;
    const tpCost = `${actor.skillTpCost(skill)}${TextManager.tpA}`;
    const tw = actor.skillTpCost(skill) > 0 ? this.textWidth(tpCost) : this.textWidth(mpCost);
    this.drawIcon(icon, rect.x + 2, rect.y + 2);
    this.drawText(`${name}`, rect.x + 38, rect.y + 2, rect.width - (tw + 4));
    actor.skillTpCost(skill) > 0 ? this.changeTextColor(ColorManager.tpCostColor()) : this.changeTextColor(ColorManager.mpCostColor());
    if(actor.skillTpCost(skill) > 0){
        this.drawText(`${tpCost}`, rect.x, rect.y, rect.width, 'right');
    }else{
        this.drawText(`${mpCost}`, rect.x, rect.y, rect.width, 'right');
    }
}

Window_FertileSkill.prototype.fertileSkill = function(){
    const index = this.index();
    const skill = this._data[index];
    return skill;
}

Window_FertileSkill.prototype.drawActorFace = function(
    actor, x, y, width, height
) {
    this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
};

function Window_FertileItem(){
    this.initialize(...arguments);
}

Window_FertileItem.prototype = Object.create(Window_Selectable.prototype);
Window_FertileItem.prototype.constructor = Window_FertileItem;

Window_FertileItem.prototype.maxItems = function(){
    return $gameParty.items().length;
}

Window_FertileItem.prototype.maxCols = function(){
    return 3;
}

Window_FertileItem.prototype.update = function(){
    Window_Selectable.prototype.update.call(this);
    this.updateData();
}

Window_FertileItem.prototype.updateData = function(){
    const items = $gameParty.items().filter((item)=>{
        if(item){
            return item.meta['Fertilizer'];
        }
    })
    if(this._data != items){
        this._data = items;
        this.refresh();
    }
}

Window_FertileItem.prototype.drawItem = function(i){
    const item = this._data[i];
    if(!item)return;
    const rect = this.itemRect(i);
    const name = item.name;
    const icon = item.iconIndex;
    const num = $gameParty.numItems(item);
    this.drawIcon(icon, rect.x + 2, rect.y + 2);
    this.drawText(`${name}[${num}]`, rect.x + 2, rect.y + 2, rect.width - 34, 'center');
}

Window_FertileItem.prototype.fertileItem = function(){
    const index = this.index();
    const item = this._data[index];
    return item;
}

function Window_FarmWater(){
    this.initialize(...arguments);
}

Window_FarmWater.prototype = Object.create(Window_Command.prototype);
Window_FarmWater.prototype.constructor = Window_FarmWater;

Window_FarmWater.prototype.makeCommandList = function(){
    this.addCommand(`${TextManager.skill}`, 'skill', this.hasValidWaterSkill());
    this.addCommand(`${TextManager.item}`, 'item', this.hasValidWaterItem());
}

Window_FarmWater.prototype.hasValidWaterSkill = function(){
    const skills = $gameParty.members().map((member)=>{
        const skills = member.skills().filter((skill)=>{
            return(
                member.canPaySkillCost(skill) &&
                skill.meta['Hydrater']
            );
        });
        return skills
    });
    return skills.length > 0;
}

Window_FarmWater.prototype.hasValidWaterItem = function(){
    const items = $gameParty.items();
    return items.some((item)=>{
        return item.meta['Hydrater'];
    })
}

function Window_WaterSkill(){
    this.initialize(...arguments);
}

Window_WaterSkill.prototype = Object.create(Window_Selectable.prototype);
Window_WaterSkill.prototype.constructor = Window_WaterSkill;

Window_WaterSkill.prototype.maxItems = function(){
    let skillNum = 0;
    $gameParty.members().forEach((member)=>{
        const skills = member.skills().filter((skill)=>{
            return(
                member.canPaySkillCost(skill) &&
                skill.meta['Hydrater']
            );
        });
        skillNum += skills.length;
    });
    return skillNum || 1;
}

Window_WaterSkill.prototype.maxCols = function(){
    return 3;
}

Window_WaterSkill.prototype.update = function(){
    Window_Selectable.prototype.update.call(this);
    this.updateData();
}

Window_WaterSkill.prototype.updateData = function(){
    const info = $gameParty.members().map((member)=>{
        const skills = member.skills().filter((skill)=>{
            return(
                member.canPaySkillCost(skill) &&
                skill.meta['Hydrater']
            );
        });
        const obj = {};
        obj.actor = member;
        obj.skills = skills;
        return obj;
    });
    const data = [];
    for(let i = 0; i < info.length; i++){
        const actor = info[i].actor;
        const skills = info[i].skills;
        for(let q = 0; q < skills.length; q++){
            const obj = {};
            obj.actor = actor;
            obj.skill = skills[q];
            data.push(obj);
        }
    }
    if(this._data != data){
        this._data = data;
        this.refresh();
    }
}

Window_WaterSkill.prototype.drawItem = function(i){
    const obj = this._data[i];
    if(!obj)return;
    const rect = this.itemRect(i);
    const actor = obj.actor;
    const skill = obj.skill;
    this.drawActorFace(actor, rect.x, rect.y, Math.min(144, rect.width / 2), Math.min(144, rect.height));
    const name = skill.name;
    const icon = skill.iconIndex;
    const mpCost = `${actor.skillMpCost(skill)}${TextManager.mpA}`;
    const tpCost = `${actor.skillTpCost(skill)}${TextManager.tpA}`;
    const tw = actor.skillTpCost(skill) > 0 ? this.textWidth(tpCost) : this.textWidth(mpCost);
    this.drawIcon(icon, rect.x + 2, rect.y + 2);
    this.drawText(`${name}`, rect.x + 38, rect.y + 2, rect.width - (tw + 4));
    actor.skillTpCost(skill) > 0 ? this.changeTextColor(ColorManager.tpCostColor()) : this.changeTextColor(ColorManager.mpCostColor());
    if(actor.skillTpCost(skill) > 0){
        this.drawText(`${tpCost}`, rect.x, rect.y, rect.width, 'right');
    }else{
        this.drawText(`${mpCost}`, rect.x, rect.y, rect.width, 'right');
    }
}

Window_WaterSkill.prototype.waterSkill = function(){
    const index = this.index();
    const skill = this._data[index];
    return skill;
}

Window_WaterSkill.prototype.drawActorFace = function(
    actor, x, y, width, height
) {
    this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
};

function Window_WaterItem(){
    this.initialize(...arguments);
}

Window_WaterItem.prototype = Object.create(Window_Selectable.prototype);
Window_WaterItem.prototype.constructor = Window_WaterItem;

Window_WaterItem.prototype.maxItems = function(){
    return $gameParty.items().length;
}

Window_WaterItem.prototype.maxCols = function(){
    return 3;
}

Window_WaterItem.prototype.update = function(){
    Window_Selectable.prototype.update.call(this);
    this.updateData();
}

Window_WaterItem.prototype.updateData = function(){
    const items = $gameParty.items().filter((item)=>{
        if(item){
            return item.meta['Hydrater'];
        }
    })
    if(this._data != items){
        this._data = items;
        this.refresh();
    }
}

Window_WaterItem.prototype.drawItem = function(i){
    const item = this._data[i];
    if(!item)return;
    const rect = this.itemRect(i);
    const name = item.name;
    const icon = item.iconIndex;
    const num = $gameParty.numItems(item);
    this.drawIcon(icon, rect.x + 2, rect.y + 2);
    this.drawText(`${name}[${num}]`, rect.x + 2, rect.y + 2, rect.width - 34, 'center');
}

Window_WaterItem.prototype.waterItem = function(){
    const index = this.index();
    const item = this._data[index];
    return item;
}

function Window_TimeDisplay(){
    this.initialize(...arguments);
}

Window_TimeDisplay.prototype = Object.create(Window_Base.prototype);
Window_TimeDisplay.prototype.constructor = Window_TimeDisplay;

Window_TimeDisplay.prototype.update = function(){
    Window_Base.prototype.update.call(this);
    this.updateTime();
}

Window_TimeDisplay.prototype.updateTime = function(){
    this.contents.clear();
    this.drawTime();
}

Window_TimeDisplay.prototype.drawTime = function(){
    this.makeFontBigger();
    this.makeFontBigger();
    this.makeFontBigger();
    const dayIndex = $gameSystem._currentDay;
    const day = SynrecFarm.WeekDays[dayIndex];
    this.drawText(`${day}`, 0, this.lineHeight(), this.contentsWidth(), 'center');
    const minutes = $gameSystem._currentMinute < 10 ? `0${$gameSystem._currentMinute}` : $gameSystem._currentMinute;
    const hours = $gameSystem._currentHour;
    this.drawText(`${hours}:${minutes}`, 0, this.lineHeight() * 3, this.contentsWidth(), 'center');
    this.resetFontSettings();
    this.contents.fillRect(0, this.lineHeight() * 5, this.contentsWidth(), 4, "#000000");

}

SynrecFarm_ScnBse_SynPlugReload = Scene_Base.prototype.synrecPluginReload
Scene_Base.prototype.synrecPluginReload = function(){
    RELOAD_SYNREC_FARMING_DATA();
    SynrecFarm_ScnBse_SynPlugReload.call(this, ...arguments);
}

SynrecFarm_ScnMapIsMnuEnbld = Scene_Map.prototype.isMenuEnabled;
Scene_Map.prototype.isMenuEnabled = function() {
    if($gamePlayer.farmMenu())return false;
    return SynrecFarm_ScnMapIsMnuEnbld.call(this);
}

SynrecFarm_ScnMapUpdtWaitCnt = Scene_Map.prototype.updateWaitCount;
Scene_Map.prototype.updateWaitCount = function() {
    if($gameSystem && $gameMap){
        this.updateSystemTime();
    }
    this.updateDisplayTarget();
    return SynrecFarm_ScnMapUpdtWaitCnt.call(this);
}

Scene_Map.prototype.updateSystemTime = function(){
    if(!$gameMap.isEventRunning()){
        $gameSystem.updateTime();
    }
}

Scene_Map.prototype.updateDisplayTarget = function(){
    if(this._displayFarmTarget)this._displayFarmTarget.update();
}

Scene_Map.prototype.openFarmMenu = function(){
    const isFarmMap = $gameSystem.farmingMap();
    if(!isFarmMap)return;
    this._farmCommand.show();
    this._farmCommand.activate();
    this._farmCommand.refresh();
}

SynrecFarm_ScnMapCrtAllWins = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    SynrecFarm_ScnMapCrtAllWins.call(this);
    this.createFarmWindows();
    this.createDisplayTarget();
}

Scene_Map.prototype.createFarmWindows = function(){
    this.createFarmCommand();
    this.createFarmSow();
    this.createFertilize()
    this.createWater();
}

Scene_Map.prototype.createDisplayTarget = function(){
    this._displayFarmTarget = new Game_FarmTarget();
    const sprite = new Sprite_Character(this._displayFarmTarget);
    const spriteset = this._spriteset;
    spriteset._tilemap.addChild(sprite);
    spriteset._characterSprites.push(sprite);
}

Scene_Map.prototype.createFarmCommand = function(){
    const x = 0;
    const w = Graphics.width - 8;
    const h = 72;
    const y = (Graphics.height - 8) - h;
    const rect = new Rectangle(x, y, w, h);
    this._farmCommand = new Window_FarmCommand(rect);
    this._farmCommand.hide();
    this._farmCommand.deactivate();
    this._farmCommand.setHandler('harvest', this.doHarvest.bind(this));
    this._farmCommand.setHandler('sow', this.openSow.bind(this));
    this._farmCommand.setHandler('fertilize', this.openFertilize.bind(this));
    this._farmCommand.setHandler('water', this.openWater.bind(this));
    this._farmCommand.setHandler('till', this.doTill.bind(this));
    this._farmCommand.setHandler('exit', this.exitFarmUI.bind(this));
    this._farmCommand.setHandler('cancel', this.exitFarmUI.bind(this));
    this.addWindow(this._farmCommand);
}

Scene_Map.prototype.createFarmSow = function(){
    const x = 0;
    const w = Graphics.width - 8;
    const h = 144;
    const y = (Graphics.height - 80) - h;
    const rect = new Rectangle(x, y, w, h);
    this._farmSow = new Window_FarmSow(rect);
    this._farmSow.hide();
    this._farmSow.deactivate();
    this._farmSow.setHandler('ok', this.doSow.bind(this));
    this._farmSow.setHandler('cancel', this.hideSow.bind(this));
    this.addWindow(this._farmSow);
}

Scene_Map.prototype.createFertilize = function(){
    const w = Graphics.width / 3;
    const h = 144;
    const x = (Graphics.width / 2) - (w / 2);
    const y = (Graphics.height / 2) - (h / 2);
    const rect = new Rectangle(x, y, w, h);
    this._fertilizeCommand = new Window_FarmFertile(rect);
    this._fertilizeCommand.hide();
    this._fertilizeCommand.deactivate();
    this._fertilizeCommand.setHandler('skill', this.openSkillFertilize.bind(this));
    this._fertilizeCommand.setHandler('item', this.openItemFertilize.bind(this));
    this._fertilizeCommand.setHandler('cancel', this.hideFertilize.bind(this));
    this.addWindow(this._fertilizeCommand);
    this.createSkillFertilize();
    this.createItemFertilize();
}

Scene_Map.prototype.createSkillFertilize = function(){
    const x = 0;
    const w = Graphics.width - 8;
    const h = 144;
    const y = (Graphics.height - 80) - h;
    const rect = new Rectangle(x, y, w, h);
    this._fertilizeSkill = new Window_FertileSkill(rect);
    this._fertilizeSkill.hide();
    this._fertilizeSkill.deactivate();
    this._fertilizeSkill.setHandler('ok', this.doSkillFertilize.bind(this));
    this._fertilizeSkill.setHandler('cancel', this.hideSkillFertilize.bind(this));
    this.addWindow(this._fertilizeSkill);
}

Scene_Map.prototype.createItemFertilize = function(){
    const x = 0;
    const w = Graphics.width - 8;
    const h = 144;
    const y = (Graphics.height - 80) - h;
    const rect = new Rectangle(x, y, w, h);
    this._fertilizeItem = new Window_FertileItem(rect);
    this._fertilizeItem.hide();
    this._fertilizeItem.deactivate();
    this._fertilizeItem.setHandler('ok', this.doItemFertilize.bind(this));
    this._fertilizeItem.setHandler('cancel', this.hideItemFertilize.bind(this));
    this.addWindow(this._fertilizeItem);
}

Scene_Map.prototype.createWater = function(){
    const w = Graphics.width / 3;
    const h = 144;
    const x = (Graphics.width / 2) - (w / 2);
    const y = (Graphics.height / 2) - (h / 2);
    const rect = new Rectangle(x, y, w, h);
    this._waterCommand = new Window_FarmWater(rect);
    this._waterCommand.hide();
    this._waterCommand.deactivate();
    this._waterCommand.setHandler('skill', this.openSkillWater.bind(this));
    this._waterCommand.setHandler('item', this.openItemWater.bind(this));
    this._waterCommand.setHandler('cancel', this.hideWater.bind(this));
    this.addWindow(this._waterCommand);
    this.createSkillWater();
    this.createItemWater();
}

Scene_Map.prototype.createSkillWater = function(){
    const x = 0;
    const w = Graphics.width - 8;
    const h = 144;
    const y = (Graphics.height - 80) - h;
    const rect = new Rectangle(x, y, w, h);
    this._waterSkill = new Window_WaterSkill(rect);
    this._waterSkill.hide();
    this._waterSkill.deactivate();
    this._waterSkill.setHandler('ok', this.doSkillWater.bind(this));
    this._waterSkill.setHandler('cancel', this.hideSkillWater.bind(this));
    this.addWindow(this._waterSkill);
}

Scene_Map.prototype.createItemWater = function(){
    const x = 0;
    const w = Graphics.width - 8;
    const h = 144;
    const y = (Graphics.height - 80) - h;
    const rect = new Rectangle(x, y, w, h);
    this._waterItem = new Window_WaterItem(rect);
    this._waterItem.hide();
    this._waterItem.deactivate();
    this._waterItem.setHandler('ok', this.doItemWater.bind(this));
    this._waterItem.setHandler('cancel', this.hideItemWater.bind(this));
    this.addWindow(this._waterItem);
}

Scene_Map.prototype.doHarvest = function(){
    const harvestTarget = $gameCultivation.cultivate();
    if(!harvestTarget){
        $gameTemp.requestBalloon($gamePlayer, 2);
        SoundManager.playBuzzer();
        this._farmCommand.activate();
        return;
    }else if(!harvestTarget._harvestable){
        $gameTemp.requestBalloon($gamePlayer, 6);
        SoundManager.playBuzzer();
        this._farmCommand.activate();
        return;
    }
    harvestTarget.harvest();
    this._farmCommand.deactivate();
    this._farmCommand.hide();
}

Scene_Map.prototype.doSow = function(){
    const sowItem = this._farmSow.itemSow();
    if(!sowItem || !$gameCultivation.tilledSoil()){
        $gameTemp.requestBalloon($gamePlayer, 2);
        SoundManager.playBuzzer();
        this._farmSow.activate();
        return;
    }
    $gameParty.loseItem(sowItem, 1);
    const anim = sowItem.animationId;
    const d = $gamePlayer.direction();
    const x = $gamePlayer.x;
    const y = $gamePlayer.y;
    const x2 = $gameMap.roundXWithDirection(x, d);
    const y2 = $gameMap.roundYWithDirection(y, d);
    const id = sowItem.id;
    const cultivate = new Game_FarmObject(id);
    cultivate.locate(x2, y2);
    if(anim > 0){
        $gameTemp.requestAnimation([cultivate], anim);
    }
    this._farmSow.hide();
    this._farmSow.deactivate();
    this._farmCommand.activate();
}

Scene_Map.prototype.doSkillFertilize = function(){
    const harvestTarget = $gameCultivation.cultivate();
    const obj = this._fertilizeSkill.fertileSkill();
    if(obj && harvestTarget){
        const actor = obj.actor;
        const skill = obj.skill;
        const anim = skill.animationId;
        const fertilizeValue = eval(skill.meta['Fertilizer']) || 1;
        actor.paySkillCost(skill);
        harvestTarget.fertilize(fertilizeValue);
        if(anim > 0){
            $gameTemp.requestAnimation([harvestTarget], anim);
        }else if(eval(SynrecFarm.DefFertAnim)){
            $gameTemp.requestAnimation([harvestTarget], eval(SynrecFarm.DefFertAnim));
        }
    }else{
        $gameTemp.requestBalloon($gamePlayer, 2);
        SoundManager.playBuzzer();
    }
    this._fertilizeSkill.activate();
}

Scene_Map.prototype.doItemFertilize = function(){
    const harvestTarget = $gameCultivation.cultivate();
    const item = this._fertilizeItem.fertileItem();
    if(item && harvestTarget){
        const anim = item.animationId;
        const fertilizeValue = eval(item.meta['Fertilizer']) || 1;
        harvestTarget.fertilize(fertilizeValue);
        if(anim > 0){
            $gameTemp.requestAnimation([harvestTarget], anim);
        }else if(eval(SynrecFarm.DefFertAnim)){
            $gameTemp.requestAnimation([harvestTarget], eval(SynrecFarm.DefFertAnim));
        }
        $gameParty.loseItem(item, 1);
    }else{
        $gameTemp.requestBalloon($gamePlayer, 2);
        SoundManager.playBuzzer();
    }
    this._fertilizeItem.activate();
}

Scene_Map.prototype.doSkillWater = function(){
    const harvestTarget = $gameCultivation.cultivate();
    const obj = this._waterSkill.waterSkill();
    if(obj && harvestTarget){
        const actor = obj.actor;
        const skill = obj.skill;
        const anim = skill.animationId;
        const fertilizeValue = eval(skill.meta['Hydrater']) || 1;
        actor.paySkillCost(skill);
        harvestTarget.water(fertilizeValue);
        if(anim > 0){
            $gameTemp.requestAnimation([harvestTarget], anim);
        }else if(eval(SynrecFarm.DefWatrAnim)){
            $gameTemp.requestAnimation([harvestTarget], eval(SynrecFarm.DefWatrAnim));
        }
    }else{
        $gameTemp.requestBalloon($gamePlayer, 2);
        SoundManager.playBuzzer();
    }
    this._waterSkill.activate();
}

Scene_Map.prototype.doItemWater = function(){
    const harvestTarget = $gameCultivation.cultivate();
    const item = this._waterItem.waterItem();
    if(item && harvestTarget){
        const anim = item.animationId;
        const fertilizeValue = eval(item.meta['Hydrater']) || 1;
        harvestTarget.water(fertilizeValue);
        if(anim > 0){
            $gameTemp.requestAnimation([harvestTarget], anim);
        }else if(eval(SynrecFarm.DefWatrAnim)){
            $gameTemp.requestAnimation([harvestTarget], eval(SynrecFarm.DefWatrAnim));
        }
        $gameParty.loseItem(item, 1);
    }else{
        $gameTemp.requestBalloon($gamePlayer, 2);
        SoundManager.playBuzzer();
    }
    this._waterItem.activate();
}

Scene_Map.prototype.doTill = function(){
    if($gameCultivation.tilledSoil()){
        $gameTemp.requestBalloon($gamePlayer, 2);
        SoundManager.playBuzzer();
        this._farmCommand.activate();
        return;
    }
    const d = $gamePlayer.direction();
    const x = $gamePlayer.x;
    const y = $gamePlayer.y;
    const x2 = $gameMap.roundXWithDirection(x, d);
    const y2 = $gameMap.roundYWithDirection(y, d);
    const till = new Game_TillObject();
    till.locate(x2, y2);
    $gameCultivation.addTilled(till);
    this._farmCommand.activate();
}

Scene_Map.prototype.openSow = function(){
    this._farmCommand.deactivate();
    this._farmSow.show();
    this._farmSow.activate();
}

Scene_Map.prototype.openFertilize = function(){
    this._farmCommand.deactivate();
    this._fertilizeCommand.show();
    this._fertilizeCommand.activate();
    this._fertilizeCommand.select(0);
    this._fertilizeCommand.refresh();
    this._fertilizeSkill.refresh();
    this._fertilizeItem.refresh();
}

Scene_Map.prototype.openSkillFertilize = function(){
    this._fertilizeCommand.hide();
    this._fertilizeCommand.deactivate();
    this._fertilizeSkill.show();
    this._fertilizeSkill.activate();
    this._fertilizeSkill.select(0);
}

Scene_Map.prototype.openItemFertilize = function(){
    this._fertilizeCommand.hide();
    this._fertilizeCommand.deactivate();
    this._fertilizeItem.show();
    this._fertilizeItem.activate();
    this._fertilizeItem.select(0);
}

Scene_Map.prototype.openWater = function(){
    this._farmCommand.deactivate();
    this._waterCommand.show();
    this._waterCommand.activate();
    this._waterCommand.select(0);
    this._waterCommand.refresh();
    this._waterSkill.refresh();
    this._waterItem.refresh();
}

Scene_Map.prototype.openSkillWater = function(){
    this._waterCommand.hide();
    this._waterCommand.deactivate();
    this._waterSkill.show();
    this._waterSkill.activate();
    this._waterSkill.select(0);
}

Scene_Map.prototype.openItemWater = function(){
    this._waterCommand.hide();
    this._waterCommand.deactivate();
    this._waterItem.show();
    this._waterItem.activate();
    this._waterItem.select(0);
}

Scene_Map.prototype.hideSow = function(){
    this._farmSow.hide();
    this._farmSow.deactivate();
    this._farmCommand.activate();
}

Scene_Map.prototype.hideFertilize = function(){
    this._fertilizeCommand.hide();
    this._fertilizeCommand.deactivate();
    this._farmCommand.activate();
}

Scene_Map.prototype.hideSkillFertilize = function(){
    this._fertilizeCommand.show();
    this._fertilizeCommand.activate();
    this._fertilizeSkill.hide();
    this._fertilizeSkill.deactivate();
}

Scene_Map.prototype.hideItemFertilize = function(){
    this._fertilizeCommand.show();
    this._fertilizeCommand.activate();
    this._fertilizeItem.hide();
    this._fertilizeItem.deactivate();
}

Scene_Map.prototype.hideWater = function(){
    this._waterCommand.hide();
    this._waterCommand.deactivate();
    this._farmCommand.activate();
}

Scene_Map.prototype.hideSkillWater = function(){
    this._waterCommand.show();
    this._waterCommand.activate();
    this._waterSkill.hide();
    this._waterSkill.deactivate();
}

Scene_Map.prototype.hideItemWater = function(){
    this._waterCommand.show();
    this._waterCommand.activate();
    this._waterItem.hide();
    this._waterItem.deactivate();
}

Scene_Map.prototype.exitFarmUI = function(){
    this._farmCommand.select(0);
    this._farmCommand.hide();
    this._farmCommand.deactivate();
}

function Scene_Calender(){
    this.initialize(...arguments);
}

Scene_Calender.prototype = Object.create(Scene_Base.prototype);
Scene_Calender.prototype.constructor = Scene_Calender;

Scene_Calender.prototype.create = function(){
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createWindowLayer();
    this.createAllWindows();
}

Scene_Calender.prototype.createBackground = function(){
    this._background = new Sprite();
    this.addChild(this._background);
    if(SynrecFarm.CalenderBack){
        this._background.bitmap = ImageManager.loadPicture(SynrecFarm.CalenderBack);
    }else{
        this._background.bitmap = SceneManager._backgroundBitmap;
    }
}

Scene_Calender.prototype.createAllWindows = function(){
    this.createTimeWindow();
    this.createTitleWindow();
}

Scene_Calender.prototype.createTimeWindow = function(){
    const w = Graphics.width * 0.5;
    const h = Graphics.height * 0.5;
    const x = (Graphics.width / 2) - (w / 2);
    const y = (Graphics.height / 2) - (h / 2);
    const rect = new Rectangle(x, y, w, h);
    this._timeWindow = new Window_TimeDisplay(rect);
    this.addWindow(this._timeWindow);
}

Scene_Calender.prototype.createTitleWindow = function(){}

Scene_Calender.prototype.update = function(){
    Scene_Base.prototype.update.call(this);
    this.updateBackground();
    this.updateTime();
    this.updateExit();
}

Scene_Calender.prototype.updateBackground = function(){
    const w = this._background.width;
    const h = this._background.height;
    const gw = Graphics.width;
    const gh = Graphics.height;
    const loc_x = (gw / 2) - (w / 2);
    const loc_y = (gh / 2) - (h / 2);
    if(this._background.x == loc_x && this._background.y == loc_y)return;
    this._background.move(loc_x, loc_y);
}

Scene_Calender.prototype.updateTime = function(){
    if(eval(SynrecFarm.CalenderUpdateTime)){
        $gameSystem.updateTime();
        $gameCultivation.update();
    }
}

Scene_Calender.prototype.updateExit = function(){
    if(Input.isTriggered('cancel')){
        SoundManager.playCancel();
        this.popScene();
    }
}