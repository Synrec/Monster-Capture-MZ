/*:@author Synrec 
 * @target MZ
 *
 * @plugindesc v1.5 Enables advanced non-battler player setup
 *
 * @help
 * This plugin follows the permissions outlined in Synrec_MC_Core.js
 * 
 * Allows for player determined scene in which certain parameters can
 * be modified in game based on certain conditions.
 * 
 * Change player dash image file with $gamePlayer._dashImg = x
 * where x = file name.
 * 
 * Change player norm image file with $gamePlayer._normImg = x
 * where x = file name.
 * 
 * Change player front image file with $gamePlayer._frontSprite = x
 * where x = file name.
 * 
 * Change player back image file with $gamePlayer._backSprite = x
 * where x = file name.
 * 
 * Change player dash index file with $gamePlayer._dashIdx = x
 * where x = character index.
 * 
 * Change player norm index file with $gamePlayer._normIdx = x
 * where x = character index.
 * 
 * @param Gameplay
 * 
 * @param No Gameover
 * @desc Prevents gameover to title screen.
 * @type boolean
 * @default false
 * @parent Gameplay
 * 
 * @param Gameover Map
 * @parent No Gameover
 * 
 * @param Gameover Map ID
 * @desc Map ID of Map Transported to on gameover
 * @type number
 * @default 1
 * @parent Gameover Map
 * 
 * @param Gameover Map X
 * @desc Map X of Map Transported to on gameover
 * @tye number
 * @default 1
 * @parent Gameover Map
 * 
 * @param Gameover Map Y
 * @desc Map Y of Map Transported to on gameover
 * @tye number
 * @default 1
 * @parent Gameover Map
 * 
 * @param Gameover Penalty
 * @desc Penalty that happens with no gameover setting
 * @type select[]
 * @option goldPercent
 * @option expPercent
 * @option goldFlat
 * @option expFlat
 * 
 * @param Gameover Gold Penalty Percentage
 * @desc Gold penalty percentage
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @parent Gameover Penalty
 * 
 * @param Gameover Gold Penalty Flat
 * @desc Gold penalty flat number
 * @type number
 * @min 0
 * @parent Gameover Penalty
 * 
 * @param Gameover Exp Penalty Percentage
 * @desc Exp penalty percentage
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * @parent Gameover Penalty
 * 
 * @param Gameover Exp Penalty Flat
 * @desc Exp penalty flat number
 * @type number
 * @min 0
 * @parent Gameover Penalty
 * 
 * @param Global Level Cap
 * @desc Use a global level cap
 * @type boolean
 * @default false
 * @parent Gameplay
 * 
 * @param Level Cap Variable
 * @desc Variable which determines the level cap globally.
 * @type variable
 * @default 1
 * @parent Global Level Cap
 * 
 * @param Effect Level Mode
 * @desc Uses global level cap to limit stat growth instead.
 * @type boolean
 * @default false
 * @parent Global Level Cap
 * 
 * @param Player Equipment
 * 
 * @param Player Inventory
 * @desc Setup Player Equipment
 * @type text[]
 * @default []
 * @parent Player Equipment
 * 
 * @param Graphics
 * 
 * @param Max Followers
 * @desc Maximum Number of followers for player
 * @type number
 * @default 1
 * @parent Graphics
 * 
 * @param Player Dash Sprite
 * @desc Changes player graphic when dashing
 * @type boolean
 * @default false
 * @parent Graphics
 * 
 * @param Player Front Facing Bitmap
 * @desc Bitmap of player when facing the screen. Recommended Full Body Image.
 * @type file
 * @dir img/player
 * @parent Graphics
 * 
 * @param Player Back Facing Bitmap
 * @desc Bitmap of player when not facing the screen. Recommended Full Body Image.
 * @type file
 * @dir img/player
 * @parent Graphics
 * 
 * @param Player Menu
 * @desc Enable Option In Menu
 * @type boolean
 * @default true
 * @parent Graphics
 * 
 * @param Player Menu Background
 * @desc Background for player data
 * @type file
 * @dir img/backgrounds
 * @parent Player Menu
 * 
 * @param Player Menu Background Scroll X
 * @desc Scroll of background in X-dir
 * @type number
 * @default 0
 * @min -9
 * @max 9
 * @parent Player Menu Background
 * 
 * @param Player Menu Background Scroll Y
 * @desc Scroll of background in Y-dir
 * @type number
 * @default 0
 * @min -9
 * @max 9
 * @parent Player Menu Background
 * 
 * @param Player Pos X
 * @desc Position X of player front facing bitmap.
 * @type number
 * @default 0
 * @parent Player Menu
 * 
 * @param Player Pos Y
 * @desc Position Y of player front facing bitmap.
 * @type number
 * @default 0
 * @parent Player Menu
 * 
 * @param Player Switch Image 1
 * @parent Player Menu
 * 
 * @param Switch 1 For Enable
 * @desc Switch Which Enables Image. 0 = Always On
 * @type switch
 * @default 0
 * @parent Player Switch Image 1
 * 
 * @param Switch 1 Position X
 * @desc X Position of image
 * @type number
 * @default 0
 * @parent Player Switch Image 1
 * 
 * @param Switch 1 Position Y
 * @desc Y Position of image
 * @type number
 * @default 0
 * @parent Player Switch Image 1
 * 
 * @param Switch On Image Bitmap 1
 * @desc Image for when switch is enabled.
 * @type image
 * @dir img/player
 * @parent Player Switch Image 1
 * 
 * @param Switch Off Image Bitmap 1
 * @desc Image for when switch is disabled.
 * @type image
 * @dir img/player
 * @parent Player Switch Image 1
 * 
 * @param Player Switch Image 2
 * @parent Player Menu
 * 
 * @param Switch 2 For Enable
 * @desc Switch Which Enables Image. 0 = Always On
 * @type switch
 * @default 0
 * @parent Player Switch Image 2
 * 
 * @param Switch 2 Position X
 * @desc X Position of image
 * @type number
 * @default 0
 * @parent Player Switch Image 2
 * 
 * @param Switch 2 Position Y
 * @desc Y Position of image
 * @type number
 * @default 0
 * @parent Player Switch Image 2
 * 
 * @param Switch On Image Bitmap 2
 * @desc Image for when switch is enabled.
 * @type image
 * @dir img/player
 * @parent Player Switch Image 2
 * 
 * @param Switch Off Image Bitmap 2
 * @desc Image for when switch is disabled.
 * @type image
 * @dir img/player
 * @parent Player Switch Image 2
 * 
 * @param Player Switch Image 3
 * @parent Player Menu
 * 
 * @param Switch 3 For Enable
 * @desc Switch Which Enables Image. 0 = Always On
 * @type switch
 * @default 0
 * @parent Player Switch Image 3
 * 
 * @param Switch 3 Position X
 * @desc X Position of image
 * @type number
 * @default 0
 * @parent Player Switch Image 3
 * 
 * @param Switch 3 Position Y
 * @desc Y Position of image
 * @type number
 * @default 0
 * @parent Player Switch Image 3
 * 
 * @param Switch On Image Bitmap 3
 * @desc Image for when switch is enabled.
 * @type image
 * @dir img/player
 * @parent Player Switch Image 3
 * 
 * @param Switch Off Image Bitmap 3
 * @desc Image for when switch is disabled.
 * @type image
 * @dir img/player
 * @parent Player Switch Image 3
 * 
 * @param Player Switch Image 4
 * @parent Player Menu
 * 
 * @param Switch 4 For Enable
 * @desc Switch Which Enables Image. 0 = Always On
 * @type switch
 * @default 0
 * @parent Player Switch Image 4
 * 
 * @param Switch 4 Position X
 * @desc X Position of image
 * @type number
 * @default 0
 * @parent Player Switch Image 4
 * 
 * @param Switch 4 Position Y
 * @desc Y Position of image
 * @type number
 * @default 0
 * @parent Player Switch Image 4
 * 
 * @param Switch On Image Bitmap 4
 * @desc Image for when switch is enabled.
 * @type image
 * @dir img/player
 * @parent Player Switch Image 4
 * 
 * @param Switch Off Image Bitmap 4
 * @desc Image for when switch is disabled.
 * @type image
 * @dir img/player
 * @parent Player Switch Image 4
 * 
 * @param Player Switch Image 5
 * @parent Player Menu
 * 
 * @param Switch 5 For Enable
 * @desc Switch Which Enables Image. 0 = Always On
 * @type switch
 * @default 0
 * @parent Player Switch Image 5
 * 
 * @param Switch 5 Position X
 * @desc X Position of image
 * @type number
 * @default 0
 * @parent Player Switch Image 5
 * 
 * @param Switch 5 Position Y
 * @desc Y Position of image
 * @type number
 * @default 0
 * @parent Player Switch Image 5
 * 
 * @param Switch On Image Bitmap 5
 * @desc Image for when switch is enabled.
 * @type image
 * @dir img/player
 * @parent Player Switch Image 5
 * 
 * @param Switch Off Image Bitmap 5
 * @desc Image for when switch is disabled.
 * @type image
 * @dir img/player
 * @parent Player Switch Image 5
 * 
 * @param Player Switch Image 6
 * @parent Player Menu
 * 
 * @param Switch 6 For Enable
 * @desc Switch Which Enables Image. 0 = Always On
 * @type switch
 * @default 0
 * @parent Player Switch Image 6
 * 
 * @param Switch 6 Position X
 * @desc X Position of image
 * @type number
 * @default 0
 * @parent Player Switch Image 6
 * 
 * @param Switch 6 Position Y
 * @desc Y Position of image
 * @type number
 * @default 0
 * @parent Player Switch Image 6
 * 
 * @param Switch On Image Bitmap 6
 * @desc Image for when switch is enabled.
 * @type image
 * @dir img/player
 * @parent Player Switch Image 6
 * 
 * @param Switch Off Image Bitmap 6
 * @desc Image for when switch is disabled.
 * @type image
 * @dir img/player
 * @parent Player Switch Image 6
 * 
 * @param Player Switch Image 7
 * @parent Player Menu
 * 
 * @param Switch 7 For Enable
 * @desc Switch Which Enables Image. 0 = Always On
 * @type switch
 * @default 0
 * @parent Player Switch Image 7
 * 
 * @param Switch 7 Position X
 * @desc X Position of image
 * @type number
 * @default 0
 * @parent Player Switch Image 7
 * 
 * @param Switch 7 Position Y
 * @desc Y Position of image
 * @type number
 * @default 0
 * @parent Player Switch Image 7
 * 
 * @param Switch On Image Bitmap 7
 * @desc Image for when switch is enabled.
 * @type image
 * @dir img/player
 * @parent Player Switch Image 7
 * 
 * @param Switch Off Image Bitmap 7
 * @desc Image for when switch is disabled.
 * @type image
 * @dir img/player
 * @parent Player Switch Image 7
 * 
 * @param Player Switch Image 8
 * @parent Player Menu
 * 
 * @param Switch 8 For Enable
 * @desc Switch Which Enables Image. 0 = Always On
 * @type switch
 * @default 0
 * @parent Player Switch Image 8
 * 
 * @param Switch 8 Position X
 * @desc X Position of image
 * @type number
 * @default 0
 * @parent Player Switch Image 8
 * 
 * @param Switch 8 Position Y
 * @desc Y Position of image
 * @type number
 * @default 0
 * @parent Player Switch Image 8
 * 
 * @param Switch On Image Bitmap 8
 * @desc Image for when switch is enabled.
 * @type image
 * @dir img/player
 * @parent Player Switch Image 8
 * 
 * @param Switch Off Image Bitmap 8
 * @desc Image for when switch is disabled.
 * @type image
 * @dir img/player
 * @parent Player Switch Image 8
 * 
 * @param Player Switch Image 9
 * @parent Player Menu
 * 
 * @param Switch 9 For Enable
 * @desc Switch Which Enables Image. 0 = Always On
 * @type switch
 * @default 0
 * @parent Player Switch Image 9
 * 
 * @param Switch 9 Position X
 * @desc X Position of image
 * @type number
 * @default 0
 * @parent Player Switch Image 9
 * 
 * @param Switch 9 Position Y
 * @desc Y Position of image
 * @type number
 * @default 0
 * @parent Player Switch Image 9
 * 
 * @param Switch On Image Bitmap 9
 * @desc Image for when switch is enabled.
 * @type image
 * @dir img/player
 * @parent Player Switch Image 9
 * 
 * @param Switch Off Image Bitmap 9
 * @desc Image for when switch is disabled.
 * @type image
 * @dir img/player
 * @parent Player Switch Image 9
 * 
 * @param Player Switch Image 10
 * @parent Player Menu
 * 
 * @param Switch 10 For Enable
 * @desc Switch Which Enables Image. 0 = Always On
 * @type switch
 * @default 0
 * @parent Player Switch Image 10
 * 
 * @param Switch 10 Position X
 * @desc X Position of image
 * @type number
 * @default 0
 * @parent Player Switch Image 10
 * 
 * @param Switch 10 Position Y
 * @desc Y Position of image
 * @type number
 * @default 0
 * @parent Player Switch Image 10
 * 
 * @param Switch On Image Bitmap 10
 * @desc Image for when switch is enabled.
 * @type image
 * @dir img/player
 * @parent Player Switch Image 10
 * 
 * @param Switch Off Image Bitmap 10
 * @desc Image for when switch is disabled.
 * @type image
 * @dir img/player
 * @parent Player Switch Image 10
 * 
 * @param Player Dash Sprite File
 * @desc File for player dash sprite
 * @type file
 * @dir img/characters
 * @default Actor1
 * @parent Player Dash Sprite
 * 
 * @param Player Dash Sprite Index
 * @desc Index for player dash sprite
 * @type number
 * @min 0
 * @max 7
 * @default 2
 * @parent Player Dash Sprite
 * 
 * @param Player Damage Floor Animation
 * @desc Allows certain regions to produce floor damage with animation
 * @type struct<FloorDmg>[]
 * @default[]
 * @parent Gameplay
 * 
 * @param Party Switches
 * @desc Set switches which enable certain party abilities
 * 
 * @param Double Gold
 * @desc Double gold reward from battles
 * @type switch
 * @default 1
 * @parent Party Switches
 * 
 * @param Double EXP
 * @desc Double exp reward from battles
 * @type switch
 * @default 2
 * @parent Party Switches
 * 
 * @param Double Item
 * @desc Double item reward from battles
 * @type switch
 * @default 3
 * @parent Party Switches
 * 
 * @param No Surprise
 * @desc Remove surprise battles. Does not disable encounters.
 * @type switch
 * @default 4
 * @parent Party Switches
 * 
 * @param Raise Preemptive
 * @desc Increase rate of Preemptive battles.
 * @type switch
 * @default 5
 * @parent Party Switches
 * 
 * @param Encounter Half
 * @desc Encounter rate reduced by half. Half has much battles occur.
 * @type switch
 * @default 6
 * @parent Party Switches
 * 
 */
/*~struct~FloorDmg:
 *
 * @param Region ID
 * @desc Region ID used for this damage type
 * @type number
 * @min 1
 * @max 255
 * @default 1
 * 
 * @param Region Animation
 * @desc Animation used for this damage type
 * @type animation
 * @default 1
 * 
 * @param Region State
 * @desc State granted for this damage type. No state if value = 0
 * @type state
 * @default 0
 * 
 * @param Region State Chance
 * @desc State granted for this damage type
 * @type number
 * @default 1
 * @decimals 2
 * @min 0.01
 * @max 1
 *
 * @param Region Damage Formulae
 * @desc Damage inflicted to team. Evaluated as a script. Can use flat value
 * @default 100
 */



if(!SynrecMC)throw new Error("Core Plugin Missing.");
if(!isObject(SynrecMC))throw new Error("Bad Core Files.");
SynrecMC.PlayerSetup = {};
SynrecMC.PlayerSetup.Version = "1.5";

SynrecMC.PlayerSetup.Plugins = PluginManager.parameters('Synrec_MC_PlayerSetup');
SynrecMC.PlayerSetup.noGameover = SynrecMC.permaDeath ? false : eval(SynrecMC.PlayerSetup.Plugins['No Gameover']);
SynrecMC.PlayerSetup.noGameoverMapID = eval(SynrecMC.PlayerSetup.Plugins['Gameover Map ID']);
SynrecMC.PlayerSetup.noGameoverMapX = eval(SynrecMC.PlayerSetup.Plugins['Gameover Map X']);
SynrecMC.PlayerSetup.noGameoverMapY = eval(SynrecMC.PlayerSetup.Plugins['Gameover Map Y']);


SynrecMC.PlayerSetup.gameOverPenaltyArray = SynrecMC.PlayerSetup.Plugins['Gameover Penalty'];
SynrecMC.PlayerSetup.gameOverGoldPerc = eval(SynrecMC.PlayerSetup.Plugins['Gameover Gold Penalty Percentage']);
SynrecMC.PlayerSetup.gameOverGoldFlat = eval(SynrecMC.PlayerSetup.Plugins['Gameover Gold Penalty Flat']);
SynrecMC.PlayerSetup.gameOverExpPerc = eval(SynrecMC.PlayerSetup.Plugins['Gameover Exp Penalty Percentage']);
SynrecMC.PlayerSetup.gameOverExpFlat = eval(SynrecMC.PlayerSetup.Plugins['Gameover Exp Penalty Flat']);


SynrecMC.PlayerSetup.globalLevel = eval(SynrecMC.PlayerSetup.Plugins['Global Level Cap']);
SynrecMC.PlayerSetup.globalLevelVar = eval(SynrecMC.PlayerSetup.Plugins['Level Cap Variable']);
SynrecMC.PlayerSetup.globalLevelEfct = eval(SynrecMC.PlayerSetup.Plugins['Effect Level Mode']);


SynrecMC.PlayerSetup.usePlayerDashie = eval(SynrecMC.PlayerSetup.Plugins['Player Dash Sprite']);
SynrecMC.PlayerSetup.usePlayerDashieFile = SynrecMC.PlayerSetup.Plugins['Player Dash Sprite File'];
SynrecMC.PlayerSetup.usePlayerDashieIndex = eval(SynrecMC.PlayerSetup.Plugins['Player Dash Sprite Index']);
SynrecMC.PlayerSetup.maxFollowers = eval(SynrecMC.PlayerSetup.Plugins['Max Followers']);

SynrecMC.PlayerSetup.playerFront = SynrecMC.PlayerSetup.Plugins['Player Front Facing Bitmap'];
SynrecMC.PlayerSetup.playerBack = SynrecMC.PlayerSetup.Plugins['Player Back Facing Bitmap'];
SynrecMC.PlayerSetup.playerMenuX = eval(SynrecMC.PlayerSetup.Plugins['Player Pos X']);
SynrecMC.PlayerSetup.playerMenuY = eval(SynrecMC.PlayerSetup.Plugins['Player Pos Y']);
SynrecMC.PlayerSetup.dataBackground = SynrecMC.PlayerSetup.Plugins['Player Menu Background'];
SynrecMC.PlayerSetup.dataBackgroundScrollX = eval(SynrecMC.PlayerSetup.Plugins['Player Menu Background Scroll X']);
SynrecMC.PlayerSetup.dataBackgroundScrollY = eval(SynrecMC.PlayerSetup.Plugins['Player Menu Background Scroll Y']);

SynrecMC.PlayerSetup.damageRegions = JSON.parse(SynrecMC.PlayerSetup.Plugins['Player Damage Floor Animation']);
for(dR = 0; dR < SynrecMC.PlayerSetup.damageRegions.length; dR++){
    SynrecMC.PlayerSetup.damageRegions[dR] = JSON.parse(SynrecMC.PlayerSetup.damageRegions[dR]);
    SynrecMC.PlayerSetup.damageRegions[dR]['Region ID'] = eval(SynrecMC.PlayerSetup.damageRegions[dR]['Region ID']);
    SynrecMC.PlayerSetup.damageRegions[dR]['Region Animation'] = eval(SynrecMC.PlayerSetup.damageRegions[dR]['Region Animation']);
    SynrecMC.PlayerSetup.damageRegions[dR]['Region State'] = eval(SynrecMC.PlayerSetup.damageRegions[dR]['Region State']);
    SynrecMC.PlayerSetup.damageRegions[dR]['Region State Chance'] = eval(SynrecMC.PlayerSetup.damageRegions[dR]['Region State Chance']);
}

SynrecMC.PlayerSetup.switchDoubleGold = eval(SynrecMC.PlayerSetup.Plugins['Double Gold']);
SynrecMC.PlayerSetup.switchDoubleExp = eval(SynrecMC.PlayerSetup.Plugins['Double EXP']);
SynrecMC.PlayerSetup.switchDoubleItem = eval(SynrecMC.PlayerSetup.Plugins['Double Item']);
SynrecMC.PlayerSetup.switchNoSurprise = eval(SynrecMC.PlayerSetup.Plugins['No Surprise']);
SynrecMC.PlayerSetup.switchRaisePreemptive = eval(SynrecMC.PlayerSetup.Plugins['Raise Preemptive']);
SynrecMC.PlayerSetup.switchEncounterHalf = eval(SynrecMC.PlayerSetup.Plugins['Encounter Half']);

SynrecMC.PlayerSetup.PlayerMenu = eval(SynrecMC.PlayerSetup.Plugins['Player Menu']);
SynrecMC.PlayerSetup.switchId1 = eval(SynrecMC.PlayerSetup.Plugins['Switch 1 For Enable']);
SynrecMC.PlayerSetup.switchId2 = eval(SynrecMC.PlayerSetup.Plugins['Switch 2 For Enable']);
SynrecMC.PlayerSetup.switchId3 = eval(SynrecMC.PlayerSetup.Plugins['Switch 3 For Enable']);
SynrecMC.PlayerSetup.switchId4 = eval(SynrecMC.PlayerSetup.Plugins['Switch 4 For Enable']);
SynrecMC.PlayerSetup.switchId5 = eval(SynrecMC.PlayerSetup.Plugins['Switch 5 For Enable']);
SynrecMC.PlayerSetup.switchId6 = eval(SynrecMC.PlayerSetup.Plugins['Switch 6 For Enable']);
SynrecMC.PlayerSetup.switchId7 = eval(SynrecMC.PlayerSetup.Plugins['Switch 7 For Enable']);
SynrecMC.PlayerSetup.switchId8 = eval(SynrecMC.PlayerSetup.Plugins['Switch 8 For Enable']);
SynrecMC.PlayerSetup.switchId9 = eval(SynrecMC.PlayerSetup.Plugins['Switch 9 For Enable']);
SynrecMC.PlayerSetup.switchId10 = eval(SynrecMC.PlayerSetup.Plugins['Switch 10 For Enable']);

SynrecMC.PlayerSetup.switchImageX1 = eval(SynrecMC.PlayerSetup.Plugins['Switch 1 Position X']);
SynrecMC.PlayerSetup.switchImageX2 = eval(SynrecMC.PlayerSetup.Plugins['Switch 2 Position X']);
SynrecMC.PlayerSetup.switchImageX3 = eval(SynrecMC.PlayerSetup.Plugins['Switch 3 Position X']);
SynrecMC.PlayerSetup.switchImageX4 = eval(SynrecMC.PlayerSetup.Plugins['Switch 4 Position X']);
SynrecMC.PlayerSetup.switchImageX5 = eval(SynrecMC.PlayerSetup.Plugins['Switch 5 Position X']);
SynrecMC.PlayerSetup.switchImageX6 = eval(SynrecMC.PlayerSetup.Plugins['Switch 6 Position X']);
SynrecMC.PlayerSetup.switchImageX7 = eval(SynrecMC.PlayerSetup.Plugins['Switch 7 Position X']);
SynrecMC.PlayerSetup.switchImageX8 = eval(SynrecMC.PlayerSetup.Plugins['Switch 8 Position X']);
SynrecMC.PlayerSetup.switchImageX9 = eval(SynrecMC.PlayerSetup.Plugins['Switch 9 Position X']);
SynrecMC.PlayerSetup.switchImageX10 = eval(SynrecMC.PlayerSetup.Plugins['Switch 10 Position X']);

SynrecMC.PlayerSetup.switchImageY1 = eval(SynrecMC.PlayerSetup.Plugins['Switch 1 Position Y']);
SynrecMC.PlayerSetup.switchImageY2 = eval(SynrecMC.PlayerSetup.Plugins['Switch 2 Position Y']);
SynrecMC.PlayerSetup.switchImageY3 = eval(SynrecMC.PlayerSetup.Plugins['Switch 3 Position Y']);
SynrecMC.PlayerSetup.switchImageY4 = eval(SynrecMC.PlayerSetup.Plugins['Switch 4 Position Y']);
SynrecMC.PlayerSetup.switchImageY5 = eval(SynrecMC.PlayerSetup.Plugins['Switch 5 Position Y']);
SynrecMC.PlayerSetup.switchImageY6 = eval(SynrecMC.PlayerSetup.Plugins['Switch 6 Position Y']);
SynrecMC.PlayerSetup.switchImageY7 = eval(SynrecMC.PlayerSetup.Plugins['Switch 7 Position Y']);
SynrecMC.PlayerSetup.switchImageY8 = eval(SynrecMC.PlayerSetup.Plugins['Switch 8 Position Y']);
SynrecMC.PlayerSetup.switchImageY9 = eval(SynrecMC.PlayerSetup.Plugins['Switch 9 Position Y']);
SynrecMC.PlayerSetup.switchImageY10 = eval(SynrecMC.PlayerSetup.Plugins['Switch 10 Position Y']);

SynrecMC.PlayerSetup.switchImageOn1 = SynrecMC.PlayerSetup.Plugins['Switch On Image Bitmap 1'];
SynrecMC.PlayerSetup.switchImageOn2 = SynrecMC.PlayerSetup.Plugins['Switch On Image Bitmap 2'];
SynrecMC.PlayerSetup.switchImageOn3 = SynrecMC.PlayerSetup.Plugins['Switch On Image Bitmap 3'];
SynrecMC.PlayerSetup.switchImageOn4 = SynrecMC.PlayerSetup.Plugins['Switch On Image Bitmap 4'];
SynrecMC.PlayerSetup.switchImageOn5 = SynrecMC.PlayerSetup.Plugins['Switch On Image Bitmap 5'];
SynrecMC.PlayerSetup.switchImageOn6 = SynrecMC.PlayerSetup.Plugins['Switch On Image Bitmap 6'];
SynrecMC.PlayerSetup.switchImageOn7 = SynrecMC.PlayerSetup.Plugins['Switch On Image Bitmap 7'];
SynrecMC.PlayerSetup.switchImageOn8 = SynrecMC.PlayerSetup.Plugins['Switch On Image Bitmap 8'];
SynrecMC.PlayerSetup.switchImageOn9 = SynrecMC.PlayerSetup.Plugins['Switch On Image Bitmap 9'];
SynrecMC.PlayerSetup.switchImageOn10 = SynrecMC.PlayerSetup.Plugins['Switch On Image Bitmap 10'];

SynrecMC.PlayerSetup.switchImageOff1 = SynrecMC.PlayerSetup.Plugins['Switch Off Image Bitmap 1'];
SynrecMC.PlayerSetup.switchImageOff2 = SynrecMC.PlayerSetup.Plugins['Switch Off Image Bitmap 2'];
SynrecMC.PlayerSetup.switchImageOff3 = SynrecMC.PlayerSetup.Plugins['Switch Off Image Bitmap 3'];
SynrecMC.PlayerSetup.switchImageOff4 = SynrecMC.PlayerSetup.Plugins['Switch Off Image Bitmap 4'];
SynrecMC.PlayerSetup.switchImageOff5 = SynrecMC.PlayerSetup.Plugins['Switch Off Image Bitmap 5'];
SynrecMC.PlayerSetup.switchImageOff6 = SynrecMC.PlayerSetup.Plugins['Switch Off Image Bitmap 6'];
SynrecMC.PlayerSetup.switchImageOff7 = SynrecMC.PlayerSetup.Plugins['Switch Off Image Bitmap 7'];
SynrecMC.PlayerSetup.switchImageOff8 = SynrecMC.PlayerSetup.Plugins['Switch Off Image Bitmap 8'];
SynrecMC.PlayerSetup.switchImageOff9 = SynrecMC.PlayerSetup.Plugins['Switch Off Image Bitmap 9'];
SynrecMC.PlayerSetup.switchImageOff10 = SynrecMC.PlayerSetup.Plugins['Switch Off Image Bitmap 10'];

SynrecMC.PlayerSetup.PlayerInvTypes = JSON.parse(SynrecMC.PlayerSetup.Plugins['Player Inventory']);

ImageManager.loadPlayer = function(filename){
    return this.loadBitmap("img/player/", filename);
}

synrecPSWinMnCmdAddOriCmds = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    synrecPSWinMnCmdAddOriCmds.call(this);
    if(SynrecMC.PlayerSetup.PlayerMenu)this.addPlayerCommand();
}

Window_MenuCommand.prototype.addPlayerCommand = function(){
    if(!this._handlers)this._handlers = {};
    this.addCommand('Player', 'player');
    let scene = SceneManager._scene;
    this.setHandler("player", scene.openPlayer.bind(scene));
}

function Window_PlayerSceneTitle(){
    this.initialize(...arguments);
}

Window_PlayerSceneTitle.prototype = Object.create(Window_Base.prototype);
Window_PlayerSceneTitle.prototype.constructor = Window_PlayerSceneTitle;

Window_PlayerSceneTitle.prototype.initialize = function(rect){
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

Window_PlayerSceneTitle.prototype.standardPadding = function(){
    return 12;
}

Window_PlayerSceneTitle.prototype.drawData = function(){
    this.drawText(`Player Information`, 0, 0, this.contentsWidth(), 'center');
}

Window_PlayerSceneTitle.prototype.refresh = function(){
    if(this.contents){
        this.contents.clear();
        this.drawData();
    }
}

function Window_PlayerData(){
    this.initialize(...arguments);
}

Window_PlayerData.prototype = Object.create(Window_Base.prototype);
Window_PlayerData.prototype.constructor = Window_PlayerData;

Window_PlayerData.prototype.initialize = function(rect){
    if(MONSTER_CAPTURE_MV){
        const x = rect.x;
        const y = rect.y;
        const w = rect.width;
        const h = rect.height;
        Window_Base.prototype.initialize.call(this,x,y,w,h);
    }else{
        Window_Base.prototype.initialize.call(this, rect);
    }
    this.loadImages();
}

Window_PlayerData.prototype.standardPadding = function(){
    return 12;
}

Window_PlayerData.prototype.loadImages = function(){
    if(SynrecMC.PlayerSetup.playerFront)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.playerFront);

    if(SynrecMC.PlayerSetup.switchImageOn1)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.switchImageOn1);
    if(SynrecMC.PlayerSetup.switchImageOn2)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.switchImageOn2);
    if(SynrecMC.PlayerSetup.switchImageOn3)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.switchImageOn3);
    if(SynrecMC.PlayerSetup.switchImageOn4)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.switchImageOn4);
    if(SynrecMC.PlayerSetup.switchImageOn5)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.switchImageOn5);
    if(SynrecMC.PlayerSetup.switchImageOn6)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.switchImageOn6);
    if(SynrecMC.PlayerSetup.switchImageOn7)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.switchImageOn7);
    if(SynrecMC.PlayerSetup.switchImageOn8)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.switchImageOn8);
    if(SynrecMC.PlayerSetup.switchImageOn9)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.switchImageOn9);
    if(SynrecMC.PlayerSetup.switchImageOn10)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.switchImageOn10);
    
    if(SynrecMC.PlayerSetup.switchImageOff1)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.switchImageOff1);
    if(SynrecMC.PlayerSetup.switchImageOff2)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.switchImageOff2);
    if(SynrecMC.PlayerSetup.switchImageOff3)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.switchImageOff3);
    if(SynrecMC.PlayerSetup.switchImageOff4)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.switchImageOff4);
    if(SynrecMC.PlayerSetup.switchImageOff5)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.switchImageOff5);
    if(SynrecMC.PlayerSetup.switchImageOff6)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.switchImageOff6);
    if(SynrecMC.PlayerSetup.switchImageOff7)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.switchImageOff7);
    if(SynrecMC.PlayerSetup.switchImageOff8)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.switchImageOff8);
    if(SynrecMC.PlayerSetup.switchImageOff9)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.switchImageOff9);
    if(SynrecMC.PlayerSetup.switchImageOff10)ImageManager.loadBitmap("img/player/", SynrecMC.PlayerSetup.switchImageOff10);
}

Window_PlayerData.prototype.drawData = function(){
    this.drawPlayer();
    this.drawSwitchImages();
}

Window_PlayerData.prototype.drawPlayer = function(){
    const name = $gamePlayer._frontSprite ? $gamePlayer._frontSprite : SynrecMC.PlayerSetup.playerFront;
    if(name){
        const bitmap = ImageManager.loadPlayer(name);
        const fw = bitmap.width;
        const fh = bitmap.height;
        const x = SynrecMC.PlayerSetup.playerMenuX;
        const y = SynrecMC.PlayerSetup.playerMenuY;
        const padding = 1;
        this.contents.blt(bitmap, padding, padding, fw, fh, x + 300, y);
    }
}

Window_PlayerData.prototype.drawSwitchImages = function(){
    this.drawImage_1();
    this.drawImage_2();
    this.drawImage_3();
    this.drawImage_4();
    this.drawImage_5();
    this.drawImage_6();
    this.drawImage_7();
    this.drawImage_8();
    this.drawImage_9();
    this.drawImage_10();
}

Window_PlayerData.prototype.drawImage_1 = function(){
    const onImage = SynrecMC.PlayerSetup.switchImageOn1;
    const offImage = SynrecMC.PlayerSetup.switchImageOff1;
    const x = SynrecMC.PlayerSetup.switchImageX1;
    const y = SynrecMC.PlayerSetup.switchImageY1;
    const switchId = SynrecMC.PlayerSetup.switchId1;
    const padding = 1;
    let switchState = true;
    if(switchId > 0 && !isNaN(switchId)){
        switchState = $gameSwitches.value(switchId);
    }
    let bitmap = null;
    if(switchState && onImage){
        bitmap = ImageManager.loadPlayer(onImage);
        var fw = bitmap.width;
        var fh = bitmap.height;
    }else if(offImage){
        bitmap = ImageManager.loadPlayer(offImage);
        var fw = bitmap.width;
        var fh = bitmap.height;
    }
    if(bitmap)this.contents.blt(bitmap, padding, padding, fw, fh, x, y);
}

Window_PlayerData.prototype.drawImage_2 = function(){
    const onImage = SynrecMC.PlayerSetup.switchImageOn2;
    const offImage = SynrecMC.PlayerSetup.switchImageOff2;
    const x = SynrecMC.PlayerSetup.switchImageX2;
    const y = SynrecMC.PlayerSetup.switchImageY2;
    const switchId = SynrecMC.PlayerSetup.switchId2;
    const padding = 1;
    let switchState = true;
    if(switchId > 0 && !isNaN(switchId)){
        switchState = $gameSwitches.value(switchId);
    }
    let bitmap = null;
    if(switchState && onImage){
        bitmap = ImageManager.loadPlayer(onImage);
        var fw = bitmap.width;
        var fh = bitmap.height;
    }else if(offImage){
        bitmap = ImageManager.loadPlayer(offImage);
        var fw = bitmap.width;
        var fh = bitmap.height;
    }
    if(bitmap)this.contents.blt(bitmap, padding, padding, fw, fh, x, y);
}

Window_PlayerData.prototype.drawImage_3 = function(){
    const onImage = SynrecMC.PlayerSetup.switchImageOn3;
    const offImage = SynrecMC.PlayerSetup.switchImageOff3;
    const x = SynrecMC.PlayerSetup.switchImageX3;
    const y = SynrecMC.PlayerSetup.switchImageY3;
    const switchId = SynrecMC.PlayerSetup.switchId3;
    const padding = 1;
    let switchState = true;
    if(switchId > 0 && !isNaN(switchId)){
        switchState = $gameSwitches.value(switchId);
    }
    let bitmap = null;
    if(switchState && onImage){
        bitmap = ImageManager.loadPlayer(onImage);
        var fw = bitmap.width;
        var fh = bitmap.height;
    }else if(offImage){
        bitmap = ImageManager.loadPlayer(offImage);
        var fw = bitmap.width;
        var fh = bitmap.height;
    }
    if(bitmap)this.contents.blt(bitmap, padding, padding, fw, fh, x, y);
}

Window_PlayerData.prototype.drawImage_4 = function(){
    const onImage = SynrecMC.PlayerSetup.switchImageOn4;
    const offImage = SynrecMC.PlayerSetup.switchImageOff4;
    const x = SynrecMC.PlayerSetup.switchImageX4;
    const y = SynrecMC.PlayerSetup.switchImageY4;
    const switchId = SynrecMC.PlayerSetup.switchId4;
    const padding = 1;
    let switchState = true;
    if(switchId > 0 && !isNaN(switchId)){
        switchState = $gameSwitches.value(switchId);
    }
    let bitmap = null;
    if(switchState && onImage){
        bitmap = ImageManager.loadPlayer(onImage);
        var fw = bitmap.width;
        var fh = bitmap.height;
    }else if(offImage){
        bitmap = ImageManager.loadPlayer(offImage);
        var fw = bitmap.width;
        var fh = bitmap.height;
    }
    if(bitmap)this.contents.blt(bitmap, padding, padding, fw, fh, x, y);
}

Window_PlayerData.prototype.drawImage_5 = function(){
    const onImage = SynrecMC.PlayerSetup.switchImageOn5;
    const offImage = SynrecMC.PlayerSetup.switchImageOff5;
    const x = SynrecMC.PlayerSetup.switchImageX5;
    const y = SynrecMC.PlayerSetup.switchImageY5;
    const switchId = SynrecMC.PlayerSetup.switchId5;
    const padding = 1;
    let switchState = true;
    if(switchId > 0 && !isNaN(switchId)){
        switchState = $gameSwitches.value(switchId);
    }
    let bitmap = null;
    if(switchState && onImage){
        bitmap = ImageManager.loadPlayer(onImage);
        var fw = bitmap.width;
        var fh = bitmap.height;
    }else if(offImage){
        bitmap = ImageManager.loadPlayer(offImage);
        var fw = bitmap.width;
        var fh = bitmap.height;
    }
    if(bitmap)this.contents.blt(bitmap, padding, padding, fw, fh, x, y);
}

Window_PlayerData.prototype.drawImage_6 = function(){
    const onImage = SynrecMC.PlayerSetup.switchImageOn6;
    const offImage = SynrecMC.PlayerSetup.switchImageOff6;
    const x = SynrecMC.PlayerSetup.switchImageX6;
    const y = SynrecMC.PlayerSetup.switchImageY6;
    const switchId = SynrecMC.PlayerSetup.switchId6;
    const padding = 1;
    let switchState = true;
    if(switchId > 0 && !isNaN(switchId)){
        switchState = $gameSwitches.value(switchId);
    }
    let bitmap = null;
    if(switchState && onImage){
        bitmap = ImageManager.loadPlayer(onImage);
        var fw = bitmap.width;
        var fh = bitmap.height;
    }else if(offImage){
        bitmap = ImageManager.loadPlayer(offImage);
        var fw = bitmap.width;
        var fh = bitmap.height;
    }
    if(bitmap)this.contents.blt(bitmap, padding, padding, fw, fh, x, y);
}

Window_PlayerData.prototype.drawImage_7 = function(){
    const onImage = SynrecMC.PlayerSetup.switchImageOn7;
    const offImage = SynrecMC.PlayerSetup.switchImageOff7;
    const x = SynrecMC.PlayerSetup.switchImageX7;
    const y = SynrecMC.PlayerSetup.switchImageY7;
    const switchId = SynrecMC.PlayerSetup.switchId7;
    const padding = 1;
    let switchState = true;
    if(switchId > 0 && !isNaN(switchId)){
        switchState = $gameSwitches.value(switchId);
    }
    let bitmap = null;
    if(switchState && onImage){
        bitmap = ImageManager.loadPlayer(onImage);
        var fw = bitmap.width;
        var fh = bitmap.height;
    }else if(offImage){
        bitmap = ImageManager.loadPlayer(offImage);
        var fw = bitmap.width;
        var fh = bitmap.height;
    }
    if(bitmap)this.contents.blt(bitmap, padding, padding, fw, fh, x, y);
}

Window_PlayerData.prototype.drawImage_8 = function(){
    const onImage = SynrecMC.PlayerSetup.switchImageOn8;
    const offImage = SynrecMC.PlayerSetup.switchImageOff8;
    const x = SynrecMC.PlayerSetup.switchImageX8;
    const y = SynrecMC.PlayerSetup.switchImageY8;
    const switchId = SynrecMC.PlayerSetup.switchId8;
    const padding = 1;
    let switchState = true;
    if(switchId > 0 && !isNaN(switchId)){
        switchState = $gameSwitches.value(switchId);
    }
    let bitmap = null;
    if(switchState && onImage){
        bitmap = ImageManager.loadPlayer(onImage);
        var fw = bitmap.width;
        var fh = bitmap.height;
    }else if(offImage){
        bitmap = ImageManager.loadPlayer(offImage);
        var fw = bitmap.width;
        var fh = bitmap.height;
    }
    if(bitmap)this.contents.blt(bitmap, padding, padding, fw, fh, x, y);
}

Window_PlayerData.prototype.drawImage_9 = function(){
    const onImage = SynrecMC.PlayerSetup.switchImageOn9;
    const offImage = SynrecMC.PlayerSetup.switchImageOff9;
    const x = SynrecMC.PlayerSetup.switchImageX9;
    const y = SynrecMC.PlayerSetup.switchImageY9;
    const switchId = SynrecMC.PlayerSetup.switchId9;
    const padding = 1;
    let switchState = true;
    if(switchId > 0 && !isNaN(switchId)){
        switchState = $gameSwitches.value(switchId);
    }
    let bitmap = null;
    if(switchState && onImage){
        bitmap = ImageManager.loadPlayer(onImage);
        var fw = bitmap.width;
        var fh = bitmap.height;
    }else if(offImage){
        bitmap = ImageManager.loadPlayer(offImage);
        var fw = bitmap.width;
        var fh = bitmap.height;
    }
    if(bitmap)this.contents.blt(bitmap, padding, padding, fw, fh, x, y);
}

Window_PlayerData.prototype.drawImage_10 = function(){
    const onImage = SynrecMC.PlayerSetup.switchImageOn10;
    const offImage = SynrecMC.PlayerSetup.switchImageOff10;
    const x = SynrecMC.PlayerSetup.switchImageX10;
    const y = SynrecMC.PlayerSetup.switchImageY10;
    const switchId = SynrecMC.PlayerSetup.switchId10;
    const padding = 1;
    let switchState = true;
    if(switchId > 0 && !isNaN(switchId)){
        switchState = $gameSwitches.value(switchId);
    }
    let bitmap = null;
    if(switchState && onImage){
        bitmap = ImageManager.loadPlayer(onImage);
        var fw = bitmap.width;
        var fh = bitmap.height;
    }else if(offImage){
        bitmap = ImageManager.loadPlayer(offImage);
        var fw = bitmap.width;
        var fh = bitmap.height;
    }
    if(bitmap)this.contents.blt(bitmap, padding, padding, fw, fh, x, y);
}

Window_PlayerData.prototype.refresh = function(){
    if(this.contents){
        this.contents.clear();
        this.drawData();
    }
}

function Window_PlayerEquip(){
    this.initialize(...arguments);
}

Window_PlayerEquip.prototype = Object.create(Window_Selectable.prototype);
Window_PlayerEquip.prototype.constructor = Window_PlayerEquip;

Window_PlayerEquip.prototype.initialize = function(rect){
    if(MONSTER_CAPTURE_MV){
        const x = rect.x;
        const y = rect.y;
        const w = rect.width;
        const h = rect.height;
        Window_Selectable.prototype.initialize.call(this,x,y,w,h);
    }else{
        Window_Selectable.prototype.initialize.call(this, rect);
    }
    this._actor = $gamePlayer;
    this.refresh();
}

Window_PlayerEquip.prototype.standardPadding = function(){
    return 12;
}

Window_PlayerEquip.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
}

Window_PlayerEquip.prototype.maxItems = function() {
    return this._actor ? this._actor._equipData.length : 0;
}

Window_PlayerEquip.prototype.isEnabled = function(index) {
    return true;
}

Window_PlayerEquip.prototype.itemAt = function(index) {
    return this._actor ? this._actor._equipData[index] : null;
}

Window_PlayerEquip.prototype.drawItem = function(index){
    const rect = this.itemRect(index);
    const data = this.itemAt(index);
    if(data){
        if(data["equip"]){
            const armData = $dataArmors[data["equip"]];
            const name = armData.name;
            this.drawIcon(armData.iconIndex, rect.x, rect.y);
            this.drawText(`${name}`, rect.x, rect.y, rect.width - 32, "right")
        }else{
            this.drawText(this.actorSlotName(index), rect.x, rect.y);
        }
    }else{
        this.drawText(this.actorSlotName(index), rect.x, rect.y);
    }
}

Window_PlayerEquip.prototype.actorSlotName = function(index) {
    const name = SynrecMC.PlayerSetup.PlayerInvTypes[index] ? SynrecMC.PlayerSetup.PlayerInvTypes[index] : "Extra";
    return SynrecMC.PlayerSetup.PlayerInvTypes[index];
}

function Window_PlayerEqItem(){
    this.initialize(...arguments);
}

Window_PlayerEqItem.prototype = Object.create(Window_Selectable.prototype);
Window_PlayerEqItem.prototype.constructor = Window_PlayerEqItem;

Window_PlayerEqItem.prototype.initialize = function(rect){
    if(MONSTER_CAPTURE_MV){
        const x = rect.x;
        const y = rect.y;
        const w = rect.width;
        const h = rect.height;
        Window_Selectable.prototype.initialize.call(this,x,y,w,h);
    }else{
        Window_Selectable.prototype.initialize.call(this, rect);
    }
    this._actor = $gamePlayer;
}

Window_PlayerEqItem.prototype.standardPadding = function(){
    return 12;
}

Window_PlayerEqItem.prototype.maxItems = function(){
    return this._data ? this._data.length + 1 : 1;
}

Window_PlayerEqItem.prototype.update = function(){
    Window_Selectable.prototype.update.call(this);
    this.updateCategory();
}

Window_PlayerEqItem.prototype.updateCategory = function(){
    if(!this._slotWindow)return;
    const slotIdx = this._slotWindow.index();
    if(slotIdx >= 0){
        this._category = this._slotWindow.itemAt(slotIdx)["name"];
        this.getData();
        this.contents.clear();
        this.drawAllItems();
    }
}

Window_PlayerEqItem.prototype.getData = function(){
    const eqInv = $gamePlayer._equipInventory;
    if(!eqInv)return;
    for(let i = 0; i < eqInv.length; i++){
        if(eqInv[i]["name"] == this._category){
            this._data = eqInv[i]["inventory"];
        }
    }
}

Window_PlayerEqItem.prototype.drawItem = function(index){
    const rect = this.itemRect(index);
    if(!this._data){
        this.drawText("Remove", rect.x, rect.y, rect.width, "center");
        return;
    }
    const data = this._data[index];
    if(data){
        const armData = $dataArmors[data];
        const icon = armData.iconIndex;
        const name = armData.name;
        this.drawIcon(icon, rect.x, rect.y);
        this.drawText(`${name}`, rect.x, rect.y, rect.width - 34, "right");
    }else{
        this.drawText("Remove", rect.x, rect.y, rect.width, "center");
    }
}

Scene_Menu.prototype.openPlayer = function(){
    SoundManager.playOk();
    SceneManager.push(Scene_PlayerData);
}

function Scene_PlayerData(){
    this.initialize(...arguments);
}

Scene_PlayerData.prototype = Object.create(Scene_Base.prototype);
Scene_PlayerData.prototype.constructor = Scene_PlayerData;

Scene_PlayerData.prototype.update = function(){
    Scene_Base.prototype.update.call(this);
    this.updateBackground();
    this.updateButtonPush();
    this._playerDataWindow.refresh();
}

Scene_PlayerData.prototype.updateButtonPush = function(){
    if(this._exButton && this._exButton.isPressed() || Input.isTriggered('cancel')){
        SoundManager.playCancel();
        this.popScene();
    }
}

Scene_PlayerData.prototype.updateBackground = function(){
    this._background.origin.x += SynrecMC.PlayerSetup.dataBackgroundScrollX;
    this._background.origin.y += SynrecMC.PlayerSetup.dataBackgroundScrollY;
}

Scene_PlayerData.prototype.create = function(){
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createWindowLayer();
    this.createWindows();
    this.createButtons();
}

Scene_PlayerData.prototype.createBackground = function(){
    const bitmapName = SynrecMC.PlayerSetup.dataBackground;
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

Scene_PlayerData.prototype.createWindows = function(){
    this.createSceneTitle()
    this.createPlayerWindow();
    this.createPlayerEquip();
    this.createPlayerItem();
}

Scene_PlayerData.prototype.createButtons = function(){
    if(ConfigManager.touchUI){
        this.createExBox();
    }
}

Scene_PlayerData.prototype.createSceneTitle = function(){
    const x = 0;
    const y = 0;
    const w = Graphics.boxWidth;
    const h = Graphics.boxHeight / 10;
    const rect = new Rectangle(x, y, w, h);
    this._titleWindow = new Window_PlayerSceneTitle(rect);
    this._titleWindow.refresh();
    this.addWindow(this._titleWindow);
}

Scene_PlayerData.prototype.createPlayerWindow = function(){
    const x = 0;
    const y = Graphics.boxHeight / 10;
    const w = Graphics.boxWidth * 0.66;
    const h = Graphics.boxHeight - (Graphics.boxHeight / 10);
    const rect = new Rectangle(x, y, w, h);
    this._playerDataWindow = new Window_PlayerData(rect);
    this._playerDataWindow.refresh();
    this.addWindow(this._playerDataWindow);
}

Scene_PlayerData.prototype.createPlayerEquip = function(){
    const x = Graphics.boxWidth * 0.66;
    const y = Graphics.boxHeight / 10;
    const w = Graphics.boxWidth - x
    const h = Graphics.boxHeight - y;
    const rect = new Rectangle(x, y, w, h);
    this._playerEqWindow = new Window_PlayerEquip(rect);
    this._playerEqWindow.setHandler('ok', this.onEqOk.bind(this));
    this._playerEqWindow.setHandler('cancel', this.popScene.bind(this));
    this._playerEqWindow.show();
    this._playerEqWindow.activate();
    this._playerEqWindow.refresh();
    this.addWindow(this._playerEqWindow);
}

Scene_PlayerData.prototype.createPlayerItem = function(){
    const x = Graphics.boxWidth * 0.66;
    const y = Graphics.boxHeight / 10;
    const w = Graphics.boxWidth - x;
    const h = Graphics.boxHeight - y;
    const rect = new Rectangle(x, y, w, h);
    this._playerItemWindow = new Window_PlayerEqItem(rect);
    this._playerItemWindow.setHandler('ok', this.onItmOk.bind(this));
    this._playerItemWindow.setHandler('cancel', this.onItemCnl.bind(this));
    this._playerItemWindow.refresh();
    this._playerItemWindow.hide();
    this._playerItemWindow._slotWindow = this._playerEqWindow;
    this.addWindow(this._playerItemWindow);
    this._playerEqWindow._itemWindow = this._playerItemWindow;
}

Scene_PlayerData.prototype.createExBox = function(){
    this._exButton = new Sprite_Button('cancel');
    this._exButton.x = 8;
    this._exButton.y = 8;
    this.addWindow(this._exButton);
}

Scene_PlayerData.prototype.onEqOk = function() {
    this._playerEqWindow.hide();
    this._playerEqWindow.deactivate();
    this._playerItemWindow.show();
    this._playerItemWindow.activate();
    this._playerItemWindow.select(0);
}

Scene_PlayerData.prototype.onItmOk = function() {
    SoundManager.playEquip();
    this.executeEquipChange();
    this._playerEqWindow.show();
    this._playerEqWindow.activate();
    this._playerEqWindow.refresh();
    this._playerItemWindow.hide();
    this._playerItemWindow.deactivate();
    this._playerItemWindow.refresh();
}

Scene_PlayerData.prototype.onItemCnl = function() {
    this._playerEqWindow.show();
    this._playerEqWindow.activate();
    this._playerItemWindow.hide();
    this._playerItemWindow.deactivate();
}

Scene_PlayerData.prototype.executeEquipChange = function() {
    const actor = $gamePlayer;
    const index = this._playerItemWindow.index();
    const id = this._playerItemWindow._data ? this._playerItemWindow._data[index] : undefined;
    actor.equipChange(id);
}

synrecMCScnGameOverUpdate = Scene_Gameover.prototype.update;
Scene_Gameover.prototype.update = function() {
    if (this.isActive() && !this.isBusy() && this.isTriggered()) {
        if(SynrecMC.PlayerSetup.noGameover){
            this.processPenalty();
            const mapId = SynrecMC.PlayerSetup.noGameoverMapID;
            const mapX = SynrecMC.PlayerSetup.noGameoverMapX;
            const mapY = SynrecMC.PlayerSetup.noGameoverMapY;
            const dir = $gamePlayer.direction();
            $gameParty._actors.forEach(actor => actor.recoverAll());
            $gamePlayer.reserveTransfer(mapId, mapX, mapY, dir, 0);
        }else synrecMCScnGameOverUpdate.call(this);
    }
    synrecMCScnGameOverUpdate.call(this);
}

Scene_Gameover.prototype.processPenalty = function(){
    const gold = $gameParty.gold();
    const goldPercReduc = SynrecMC.PlayerSetup.gameOverGoldPerc * gold;
    const goldFlatReduc = SynrecMC.PlayerSetup.gameOverGoldFlat;
    let totalGoldReduc = goldFlatReduc + goldPercReduc;
    if(isNaN(totalGoldReduc))totalGoldReduc = 1;
    $gameParty._gold -= totalGoldReduc;
    $gameParty._actors.forEach((actor)=>{
        let currentExp = actor.currentExp();
        let expPercReduc = currentExp * SynrecMC.PlayerSetup.gameOverExpPerc;
        let expFlatReduc = SynrecMC.PlayerSetup.gameOverExpFlat;
        let totalReducExp = expPercReduc + expFlatReduc;
        if(isNaN(totalReducExp))totalReducExp = 1;
        actor.changeExp(-totalReducExp, true);
    });
}

synrecGmActorParamBase = Game_Actor.prototype.paramBase;
Game_Actor.prototype.paramBase = function(paramId) {
    $gameParty.setGlobalLevel();
    const globLvl = SynrecMC.PlayerSetup.globalLevel;
    if(globLvl){
        const global = $gameParty._globalLevel;
        const local = this._level;
        const level = isNaN(global) || isNaN(local) ? local : Math.min(local, global);
        return this.currentClass().params[paramId][level];
    }
    return synrecGmActorParamBase.call(this, paramId);
}

synrecGmActorMaxLvl = Game_Actor.prototype.maxLevel;
Game_Actor.prototype.maxLevel = function() {
    const globLvl = SynrecMC.PlayerSetup.globalLevel;
    const effLevel = SynrecMC.PlayerSetup.globalLevelEfct;
    if(globLvl && !effLevel)return $gameParty._globalLevel ? $gameParty._globalLevel : this.actor().maxLevel;
    synrecGmActorMaxLvl.call(this);
}

synrecGmActorLevelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
    const globLvl = SynrecMC.PlayerSetup.globalLevel;
    const effLevel = SynrecMC.PlayerSetup.globalLevelEfct;
    if(globLvl && !effLevel && this._level + 1 > $gameParty._globalLevel)return;
    synrecGmActorLevelUp.call(this);
    if(globLvl && effLevel){
        for (const learning of this.currentClass().learnings) {
            if (learning.level <= $gameParty._globalLevel && this._level >= $gameParty._globalLevel) {
                this.learnSkill(learning.skillId);
            }
        }
    }
}

synrecGmActorChkFlrEfct = Game_Actor.prototype.checkFloorEffect;
Game_Actor.prototype.checkFloorEffect = function() {
    synrecGmActorChkFlrEfct.call(this);
    if($gamePlayer.isOnRegionDamage()){
        this.executeRegionDamage();
    }
}

Game_Actor.prototype.executeRegionDamage = function(){
    const regionDamage = (id) =>{
        for(ib = 0; ib < SynrecMC.PlayerSetup.damageRegions.length; ib++){
            if(SynrecMC.PlayerSetup.damageRegions[ib]['Region ID'] == id){
                this._regionState = SynrecMC.PlayerSetup.damageRegions[ib]['Region State'];
                this._regionStateChnce = SynrecMC.PlayerSetup.damageRegions[ib]['Region State Chance'];
                this._regionAnim = SynrecMC.PlayerSetup.damageRegions[ib]['Region Animation'];
                return SynrecMC.PlayerSetup.damageRegions[ib]['Region Damage Formulae'];
            }
        }
    }
    const regionId = $gameMap.regionId($gamePlayer._x, $gamePlayer._y);
    const damage = eval(regionDamage(regionId));
    this.gainHp(-damage);
    $gameTemp.requestAnimation([$gamePlayer], this._regionAnim);
    if(this._regionState > 0){
        if(Math.random() < this._regionStateChnce){
            this.addState(this._regionState);
        }
    }
    $gameParty.refresh();
}

Game_Party.prototype.setGlobalLevel = function(){
    this._globalLevel = Math.max(1, $gameVariables.value(SynrecMC.PlayerSetup.globalLevelVar));
}

synrecGmPartyEncHalf = Game_Party.prototype.hasEncounterHalf;
Game_Party.prototype.hasEncounterHalf = function() {
    const switchId = SynrecMC.PlayerSetup.switchEncounterHalf;
    const switchState = $gameSwitches.value(switchId);
    if(switchState)return true;
    return synrecGmPartyEncHalf.call(this);
}

synrecGmPartyCnlSuprise = Game_Party.prototype.hasCancelSurprise;
Game_Party.prototype.hasCancelSurprise = function() {
    const switchId = SynrecMC.PlayerSetup.switchNoSurprise;
    const switchState = $gameSwitches.value(switchId);
    if(switchState)return true;
    return synrecGmPartyCnlSuprise.call(this);
}

synrecGmPartyRsPreemptive = Game_Party.prototype.hasRaisePreemptive;
Game_Party.prototype.hasRaisePreemptive = function() {
    const switchId = SynrecMC.PlayerSetup.switchRaisePreemptive;
    const switchState = $gameSwitches.value(switchId);
    if(switchState)return true;
    return synrecGmPartyRsPreemptive.call(this);
}

synrecGmPartyDoubleGld = Game_Party.prototype.hasGoldDouble;
Game_Party.prototype.hasGoldDouble = function() {
    const switchId = SynrecMC.PlayerSetup.switchDoubleGold;
    const switchState = $gameSwitches.value(switchId);
    if(switchState)return true;
    return synrecGmPartyDoubleGld.call(this);
}

synrecGmPartyDoubleItm = Game_Party.prototype.hasDropItemDouble;
Game_Party.prototype.hasDropItemDouble = function() {
    const switchId = SynrecMC.PlayerSetup.switchDoubleItem;
    const switchState = $gameSwitches.value(switchId);
    if(switchState)return true;
    return synrecGmPartyDoubleItm.call(this);
}

Game_Party.prototype.hasExpDouble = function() {
    const switchId = SynrecMC.PlayerSetup.switchDoubleExp;
    const switchState = $gameSwitches.value(switchId);
    if(switchState)return true;
    return false;
}

synrecGmTroopXpTotal = Game_Troop.prototype.expTotal;
Game_Troop.prototype.expTotal = function() {
    return synrecGmTroopXpTotal.call(this) * this.expRate();
}

Game_Troop.prototype.expRate = function(){
    return $gameParty.hasExpDouble() ? 2 : 1;
}

SynrecMCGmPlyInitMem = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
    SynrecMCGmPlyInitMem.call(this);
    this._dashImg = SynrecMC.PlayerSetup.usePlayerDashieFile;
    this._dashIdx = SynrecMC.PlayerSetup.usePlayerDashieIndex;
    this._normImg = SynrecMC.PlayerSetup.nonBattlePlayerFile;
    this._normIdx = SynrecMC.PlayerSetup.nonBattlePlayerIndex;
    this._frontSprite = SynrecMC.PlayerSetup.playerFront;
    this._backSprite = SynrecMC.PlayerSetup.playerBack;
    this._equipData = [];
    this._equipInventory = [];
    this.createEquipSlots();
}

Game_Player.prototype.createEquipSlots = function(){
    for (let i = 0; i < SynrecMC.PlayerSetup.PlayerInvTypes.length; i++) {
        let index = i;
        let name = SynrecMC.PlayerSetup.PlayerInvTypes[i];
        this._equipInventory.push({index:index, name:name, inventory:[]});
        this._equipData.push({index:index, name:name, equip:undefined})
    }
    this._equipInventory.push({index:this._equipInventory.length, name:"UNDEFINED", inventory:[]});
    this._equipData.push({index:this._equipData.length, name:"UNDEFINED", equip:undefined})
}

Game_Player.prototype.equipChange = function(armorId){
    const armor = $dataArmors[armorId];
    let category = undefined;
    if(armor){
        const catName = armor.meta['Player Equip'];
        category = catName ? catName.replace(/\s+/g, '') : "UNDEFINED";
        if(!category)category = "UNDEFINED";
        if(armorId){
            for(let i = 0; i < this._equipInventory.length; i++){
                let invType = this._equipInventory[i];
                if(invType["name"] == category){
                    if(!invType["inventory"].includes(armorId)){
                        SoundManager.playBuzzer();
                        return;
                    }
                    break;
                }
            }
        }
    }
    for(let j = 0; j < this._equipData.length; j++){
        let eqType = this._equipData[j];
        if(eqType['name'] == category){
            eqType["equip"] = armorId ? armorId : undefined;
            return;
        }
    }
}

Game_Player.prototype.gainEquip = function(armorId){
    const armor = $dataArmors[armorId];
    const catName = armor.meta['Player Equip'];
    let category = catName ? catName.replace(/\s+/g, '') : "UNDEFINED";
    for(let i = 0; i < this._equipInventory.length; i++){
        let invType = this._equipInventory[i];
        if(invType["name"] == category){
            if(invType["inventory"].includes(armorId)){
                SoundManager.playBuzzer();
                return;
            }
            invType["inventory"].push(armorId);
        }
    }
}

Game_Player.prototype.loseEquip = function(armorId){
    const armor = $dataArmors[armorId];
    let category = armor.meta['Player Equip'].replace(/\s+/g, '');
    if(!category)category = "UNDEFINED";
    for(let i = 0; i < this._equipInventory.length; i++){
        let invType = this._equipInventory[i];
        if(invType["name"] == category){
            if(invType["inventory"].includes(armorId)){
                const index = invType["inventory"].indexOf(armorId);
                invType["inventory"].splice(index, 1);
                return;
            }
        }
    }
}

synrecMCGmPlayerUpDash = Game_Player.prototype.updateDashing;
Game_Player.prototype.updateDashing = function() {
    synrecMCGmPlayerUpDash.call(this);
    if(SynrecMC.PlayerSetup.usePlayerDashie){
        if(this._dashing && !this._dashie){
            const dashFile = this._dashImg ? this._dashImg : SynrecMC.PlayerSetup.usePlayerDashieFile;
            const dashIndex = !isNaN(this._dashIdx) ? this._dashIdx : SynrecMC.PlayerSetup.usePlayerDashieIndex;
            this.setImage(dashFile, dashIndex);
            this._dashie = true;
        }else if(!this._dashing && this._dashie){
            const normFile = this._normImg ? this._normImg : SynrecMC.nonBattlePlayerFile;
            const normIndex = !isNaN(this._normIdx) ? this._normIdx : SynrecMC.nonBattlePlayerIndex;
            this.setImage(normFile, normIndex);
            this._dashie = false;
        }
    }
}

Game_Player.prototype.isOnRegionDamage = function(){
    return this.onDamageRegion();
}

Game_Player.prototype.onDamageRegion = function(){
    const damageRegionId = (id) =>{
        for(ib = 0; ib < SynrecMC.PlayerSetup.damageRegions.length; ib++){
            if(SynrecMC.PlayerSetup.damageRegions[ib]['Region ID'] == id){
                return true;
            }
        }
    }
    const regionId = $gameMap.regionId(this._x, this._y);
    if(damageRegionId(regionId))return true;
    return false;
}

synrecGameFollowersSetupPS = Game_Followers.prototype.setup;
Game_Followers.prototype.setup = function() {
	if(SynrecMC.nonBattlePlayer){
        const follNum = isNaN(SynrecMC.PlayerSetup.maxFollowers) ? $gameParty.maxBattleMembers() : SynrecMC.PlayerSetup.maxFollowers;
		this._data = [];
		for (var i = 0; i < follNum; i++) {
			this._data.push(new Game_Follower(i));
		}
	}else{
		synrecGameFollowersSetupPS.call(this);
	}
}