/*:
 * @author Synrec/Kylestclr
 * @plugindesc v1.0.0 Allows for creation of a capture system in RPG Maker.
 * @target MZ
 * @help
 * 
 * Plugin has been remade from the base monster capture plugins set.
 * 
 * @param Gameover Configuration
 * @desc Setup what to do on gameover
 * @type struct<gameoverConfig>
 * 
 * @param Player Configuration
 * @desc Setup the player for the game.
 * @type struct<player>
 * 
 * @param Enemy Player Configuration
 * @desc Setup enemy player enemy battlers
 * @type struct<enemyPlayer>[]
 * @default []
 * 
 * @param Actor Configurations
 * @desc Setup actors for the project.
 * @type struct<actorData>[]
 * @default []
 * 
 * @param Reserve Boxes
 * @parent Actor Configuration
 * @desc Number of reserve boxes
 * @type text
 * @default 10
 * 
 * @param Reserve Box Size
 * @parent Reserve Boxes
 * @desc Limit of actors per reserve box
 * @type text
 * @default 10
 * 
 * @param Enemy Configurations
 * @desc Setup enemies for the project.
 * @type struct<enemyData>[]
 * @default []
 * 
 * @param Skill Configurations
 * @desc Setup skill data
 * @type struct<skillSetup>[]
 * @default []
 * 
 * @param Item Configurations
 * @desc Setup item capture rates
 * @type struct<itemSetup>[]
 * @default []
 * 
 * @param Gender Configurations
 * @desc Setup available genders in entire project.
 * @type struct<genderConfig>[]
 * @default []
 * 
 * @param Breeder Combinations
 * @desc Create valid actor combinations here
 * @type struct<actorCombine>[]
 * @default []
 * 
 * @param Breeder Hatcher Graphic
 * @parent Breeder Combinations
 * @desc Character graphic used for breeder graphic
 * @type file
 * @dir img/characters/
 * 
 * @param Breeder Hatcher Graphic Index
 * @parent Breeder Combinations
 * @desc Character graphic index used for breeder graphic
 * @type number
 * @min 0
 * @max 7
 * @default 0
 * 
 * @param Breeder Hatcher Animation
 * @parent Breeder Combinations
 * @desc Animation to play for hatching
 * @type animation
 * @default 0
 * 
 * @param Map Configurations
 * @desc Setup maps and specific regions/terrain
 * @type struct<mapData>[]
 * @default []
 * 
 * @param Player UI Configuration
 * @desc Configure UI settings for player scene
 * @type struct<playerUI>
 * 
 * @param Battle UI Configuration
 * @desc Configure UI settings for battle
 * @type struct<battleUI>
 * 
 * @param Default Actor Battlers
 * @parent Battle UI Configuration
 * @desc The default limit of actor battlers during battle
 * @type text
 * @default 1
 * 
 * @param Default Enemy Battlers
 * @parent Battle UI Configuration
 * @desc The default limit of enemy battlers during battle
 * @type text
 * @default 1
 * 
 * @param Beastiary UI Configuration
 * @desc Configure UI settings for battle
 * @type struct<beastiaryUI>
 * 
 */
/*~struct~gameoverConfig:
 * 
 * @param Required Item
 * @desc Require this item in player inventory
 * @type item
 * @default 0
 * 
 * @param Gameover Map
 * @desc Map to use for gameover
 * If not set or is zero, use default gameover.
 * @type text
 * @default 0
 * 
 * @param Map X
 * @desc Set the player X-position to this
 * @type text
 * @default 0
 * 
 * @param Map Y
 * @desc Set the player Y-position to this
 * @type text
 * @default 0
 * 
 * @param Direction
 * @desc Set player facing direction to this
 * @type select
 * @option down
 * @value 2
 * @option left
 * @value 4
 * @option right
 * @value 6
 * @option up
 * @value 8
 * @default 2
 * 
 * @param Gold Penalty
 * @desc Reduce player gold by value
 * @type text
 * @default 0
 * 
 * @param EXP Penalty
 * @desc Reduce exp by rate.
 * 1 = 100% current level EXP
 * @type text
 * @default 0
 * 
 * @param Event
 * @desc Reserve common event on gameover
 * @type common_event
 * @default 0
 * 
 */
/*~struct~playerConfig:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default Player_Config
 * 
 * @param Default Character File
 * @desc Select the file to use for player character.
 * @type file
 * @dir img/characters/
 * 
 * @param Default Character File Index
 * @desc If using 8 character sheet, index for character.
 * 0 = top left, 7 = bottom right.
 * @type text
 * @default 0
 * 
 * @param Dash Character File
 * @desc Select the file to use for player character dashing.
 * @type file
 * @dir img/characters/
 * 
 * @param Dash Character File Index
 * @desc If using 8 character sheet, index for character dashing.
 * 0 = top left, 7 = bottom right.
 * @type text
 * @default 0
 * 
 * @param Face File
 * @desc File used for player
 * @type file
 * @dir img/faces/
 * 
 * @param Face Index
 * @desc Index of face used from face file.
 * 0 = top left, 7 = bottom right.
 * @type text
 * @default 0
 * 
 * @param Player Front Facing Graphic
 * @desc A graphic used to represent the player front
 * @type file
 * @dir img/pictures/
 * 
 * @param Player Back Facing Graphic
 * @desc A graphic used to represent the player back
 * @type file
 * @dir img/pictures/
 * 
 */
/*~struct~player:
 * 
 * @param Use Custom Player
 * @desc Instead of using party leader, use custom player
 * @type boolean
 * @default false
 * 
 * @param Follower Count
 * @desc Max number of player followers
 * @type text
 * @default 1
 * 
 * @param Player Configuration Variable
 * @desc Variable used to select player configuration in project
 * @type variable
 * @default 0
 * 
 * @param Player Configurations
 * @desc Setup various player data
 * @type struct<playerConfig>[]
 * @default []
 * 
 */
/*~struct~rosterEnemy:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default Roster_Enemy
 * 
 * @param Enemy
 * @desc The enemy to be added.
 * @type enemy
 * @default 0
 * 
 * @param Level
 * @desc Sets enemy level to this value
 * @type text
 * @default 1
 * 
 */
/*~struct~enemyPlayer:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default Enemy_Player
 * 
 * @param Enemy Roster
 * @desc Setup the enemies in the roster
 * @type struct<rosterEnemy>[]
 * @default []
 * 
 * @param Graphic
 * @desc A graphic used to represent the enemy player graphic.
 * @type file
 * @dir img/pictures/
 * 
 */
/*~struct~evolutionData:
 * 
 * @param Evolution Actor
 * @desc What the actor evolves into
 * @type actor
 * @default 0
 * 
 * @param Required Switch
 * @desc Game switch must be ON for actor to evolve
 * @type switch
 * @default 0
 * 
 * @param Reset Switch
 * @parent Required Switch
 * @desc Set switch to false on evolve
 * @type boolean
 * @default false
 * 
 * @param Required Level
 * @desc Level required for the actor to evolve.
 * @type text
 * @default 0
 * 
 * @param Equip Weapons
 * @desc Actor must have weapons equipped
 * @type weapon[]
 * @default []
 * 
 * @param Consume Weapons
 * @parent Equip Weapons
 * @desc Destroy actor's required weapons.
 * @type boolean
 * @default false
 * 
 * @param Equip Armors
 * @desc Actor must have armors equipped
 * @type armor[]
 * @default []
 * 
 * @param Consume Armors
 * @parent Equip Armors
 * @desc Destroy actor's required armors.
 * @type boolean
 * @default false
 * 
 * @param Items
 * @desc Player must have items in inventory
 * @type item[]
 * @default []
 * 
 * @param Consume Items
 * @parent Items
 * @desc Remove items from inventory.
 * @type boolean
 * @default false
 * 
 * @param Gold
 * @desc Player must have equal to or more than this value
 * Consumed if required
 * @type text
 * @default 0
 * 
 * @param Reset Level
 * @desc Reset level on evolve
 * @type boolean
 * @default false
 * 
 * @param Evolve Healing
 * @desc Recoverall on evolve
 * @type boolean
 * @default false
 * 
 */
/*~struct~captureSettings:
 * 
 * @param HP Bonus
 * @desc Applies bonus to capture rate based on HP rate.
 * Ignored if value is 0.
 * @type text
 * @default 0
 * 
 * @param MP Bonus
 * @desc Applies bonus to capture rate based on MP rate.
 * Ignored if value is 0.
 * @type text
 * @default 0
 * 
 * @param TP Bonus
 * @desc Applies bonus to capture rate based on TP rate.
 * Ignored if value is 0.
 * @type text
 * @default 0
 * 
 */
/*~struct~actorData:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default Actor
 * 
 * @param Actor
 * @desc The actor to setup.
 * @type actor
 * @default 0
 * 
 * @param Genders
 * @desc Potential genders available for actor
 * @type text[]
 * @default []
 * 
 * @param Evolution Settings
 * @desc Setup actor evolution
 * @type struct<evolutionData>
 * 
 * @param Capture Settings
 * @desc Setup capture modifier settings
 * @type struct<captureSettings>
 * 
 */
/*~struct~enemyData:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default Enemy
 * 
 * @param Enemy 
 * @desc The enemy to setup
 * @type enemy
 * @default 0
 * 
 * @param Ultimate Skill
 * @desc Force skill use when TP is at max value
 * @type skill
 * @default 0
 * 
 * @param Capture Actor
 * @desc The actor that would be captured.
 * Capture actor MUST be configured.
 * @type actor
 * @default 0
 * 
 * @param Critical HP Rate
 * @desc HP Rate considered critical
 * Value of 1 = 100% or less
 * @type text
 * @default 0.3
 * 
 * @param Critical MP Rate
 * @desc HP Rate considered critical
 * Value of 1 = 100% or less
 * @type text
 * @default 0.3
 * 
 * @param Critical TP Rate
 * @desc HP Rate considered critical
 * Value of 0 = 0% or more
 * @type text
 * @default 0.7
 * 
 * @param Allow Capture States
 * @desc States that allow enemy to be captured
 * @type state[]
 * @default []
 * 
 * @param Block Capture States
 * @desc States that prevent enemy from being captured
 * @type state[]
 * @default []
 * 
 * @param Ignore Enemy Database
 * @desc Ignores enemy stats settings from database
 * @type boolean
 * @default true
 * 
 */
/*~struct~skillSetup:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default Skill
 * 
 * @param Skill
 * @desc The skill to configure
 * @type skill
 * @default 0
 * 
 * @param Use Limit
 * @desc Number of times skill can be used.
 * @type text
 * @default 1
 * 
 * @param Capture Rate
 * @desc Allows this skill to be used for capture.
 * Value of 1 = Max Rate
 * @type text
 * @default 0
 * 
 */
/*~struct~itemSetup:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default Item
 * 
 * @param Item
 * @desc The item to configure
 * @type item
 * @default 0
 * 
 * @param Capture Rate
 * @desc Allows this item to be used for capture.
 * Value of 1 = Max Rate
 * @type text
 * @default 0
 * 
 */
 /*~struct~gendHex:
 *
 * @param Hex Color
 * @desc Hex Color Code for color blend
 * @type text
 * @default #000000
 * 
 * @param Color Alpha
 * @desc Alpha of the color blend
 * @type number
 * @decimals 2
 * @default 0.5
 * @min 0
 * @max 1
 * 
 * @param Apply Filter
 * @desc Apply a PIXI Filter.
 * @type select[]
 * @default []
 * @option blur
 * @option noise
 * @option color
 * 
 * @param Blur Filter Setting
 * 
 * @param Blur Strength
 * @desc Strength of the blur filter
 * @type number
 * @default 8
 * @parent Blur Filter Setting
 * 
 * @param Blur Quality
 * @desc Quality of the blur filter
 * @type number
 * @default 4
 * @parent Blur Filter Setting
 * 
 * @param Noise Filter Setting
 * 
 * @param Noise Intensity
 * @desc Intensity of the noise.
 * @type number
 * @decimals 3
 * @default 0.5
 * @min 0
 * @max 1
 * @parent Noise Filter Setting
 * 
 * @param Noise Seed
 * @desc Seed of the noise.
 * @type text
 * @default Math.random()
 * @min 0
 * @parent Noise Filter Setting
 * 
 * @param Color Filter Setting
 * 
 * @param Color Method
 * @desc Method to apply to the color filter. Applies Color Matrix Settings.
 * @type select
 * @option BlackAndWhite
 * @option Brightness
 * @option Contrast
 * @option Hue
 * @option LSD
 * @option Negative
 * @option Night
 * @option Predator
 * @option Saturate
 * @option Sepia
 * @option Tint
 * @option ToBGR
 * @parent Color Filter Setting
 * 
 * @param Color Brightness
 * @desc Brightness value for Brightness Method. 1 = Default.
 * @type number
 * @default 1
 * @decimals 3
 * @min 0
 * @max 2
 * @parent Color Filter Setting
 * 
 * @param Color Contrast
 * @desc Contrast value for Contrast Method. 1 = Default.
 * @type number
 * @default 1
 * @decimals 3
 * @min 0
 * @max 2
 * @parent Color Filter Setting
 * 
 * @param Color Hue
 * @desc Hue value for Hue Method. 0 = Default.
 * @type number
 * @default 0
 * @min 0
 * @max 359
 * @parent Color Filter Setting
 * 
 * @param Color Night
 * @desc Night value for Night Method. 0 = Default.
 * @type number
 * @decimals 3
 * @default 0
 * @min 0
 * @max 1
 * @parent Color Filter Setting
 * 
 * @param Color Predator
 * @desc Night value for Night Method. 0 = Default.
 * @type number
 * @decimals 3
 * @default 0
 * @min 0
 * @max 1
 * @parent Color Filter Setting
 * 
 * @param Color Saturate
 * @desc Night value for Night Method. 0 = Default.
 * @type number
 * @decimals 3
 * @default 0
 * @min 0
 * @max 1
 * @parent Color Filter Setting
 * 
 * @param Color Tint
 * @desc Night value for Night Method. Uses Hex Value eg: 0x000000.
 * @type text
 * @default 0x000000
 * @parent Color Filter Setting
 * 
 * @param Method Alpha
 * @desc Alpha Value For Filter.
 * @type number
 * @decimals 3
 * @default 1
 * @min 0
 * @max 1
 * @parent Color Filter Setting
 * 
 */
/*~struct~genderConfig:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default Gender
 * 
 * @param Identifier
 * @desc How to identify gender.
 * Converted to lower case.
 * @type text
 * @default gender
 * 
 * @param Gender Hex Blend
 * @desc Changes the color blend of named gender traits
 * @type struct<gendHex>
 *
 * @param Icon
 * @desc Icon Index of Gender (0 for no icon)
 * @type text
 * @default 0
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
 * 
 */
/*~struct~actorGender:
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
/*~struct~actorCombine:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default Combination
 * 
 * @param Result Actor
 * @desc Actor gained from combination
 * @type actor
 * @default 1
 * 
 * @param Actor 1 Required
 * @desc The actor required if set.
 * @type struct<actorGender>
 * 
 * @param Actor 2 Required
 * @desc The actor required if set.
 * @type struct<actorGender>
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
 * 
 * @param Fuse Stats
 * @desc Allow stat fusion from parents
 * @type boolean
 * @default false
 * 
 * @param Fuse Stats Only
 * @parent Fuse Stats
 * @desc Only consider fusion stats and not base stats
 * @type boolean
 * @default false
 * 
 * @param Stat Transfer Value
 * @parent Fuse Stats
 * @desc Default values are 0
 * 
 * @param Stat Transfer Global Value
 * @parent Stat Transfer Value
 * @desc Percentage of stat transfered (globally, additive)
 * @default 0
 * @type number
 * @min -100
 * @max 100
 * 
 * @param HP Transfer
 * @parent Stat Transfer Value
 * @desc Percentage of stat transfered
 * @default 0
 * @type number
 * @min -100
 * @max 100
 * 
 * @param MP Transfer
 * @parent Stat Transfer Value
 * @desc Percentage of stat transfered
 * @default 0
 * @type number
 * @min -100
 * @max 100
 * 
 * @param ATK Transfer
 * @parent Stat Transfer Value
 * @desc Percentage of stat transfered
 * @default 0
 * @type number
 * @min -100
 * @max 100
 * 
 * @param DEF Transfer
 * @parent Stat Transfer Value
 * @desc Percentage of stat transfered
 * @default 0
 * @type number
 * @min -100
 * @max 100
 * 
 * @param MAT Transfer
 * @parent Stat Transfer Value
 * @desc Percentage of stat transfered
 * @default 0
 * @type number
 * @min -100
 * @max 100
 * 
 * @param MDF Transfer
 * @parent Stat Transfer Value
 * @desc Percentage of stat transfered
 * @default 0
 * @type number
 * @min -100
 * @max 100
 * 
 * @param AGI Transfer
 * @parent Stat Transfer Value
 * @desc Percentage of stat transfered
 * @default 0
 * @min -100
 * @max 100
 * 
 * @param LUK Transfer
 * @parent Stat Transfer Value
 * @desc Percentage of stat transfered
 * @default 0
 * @type number
 * @min -100
 * @max 100
 */
/*~struct~regionSettings:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default Region
 * 
 * @param Region ID
 * @desc The region ID setting applies to.
 * @type text
 * @default 0
 * 
 * @param Minimal Enemy Level
 * @desc Lowest enemy level possible
 * @type text
 * @default 1
 * 
 * @param Maximum Enemy Level
 * @desc Highest enemy level possible
 * @type text
 * @default 100
 * 
 */
/*~struct~mapData:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default Map
 * 
 * @param Map
 * @desc The ID of the map to use this data
 * @type text
 * @default 0
 * 
 * @param Minimal Enemy Level
 * @desc Lowest enemy level possible
 * @type text
 * @default 1
 * 
 * @param Maximum Enemy Level
 * @desc Highest enemy level possible
 * @type text
 * @default 100
 * 
 * @param Region Settings
 * @desc Do specific settings per region
 * @type struct<regionSettings>
 * @default []
 * 
 * @param Breeder EXP Growth
 * @desc Set exp gain for actors in breeder for the map.
 * @type 
 * 
 */
/*~struct~animPic:
 * 
 * @param File
 * @desc Picture to be used
 * @type file
 * @dir img/pictures/
 * 
 * @param Frames
 * @desc Number of graphic frames
 * @type number
 * @min 1
 * @default 1
 * 
 * @param Frame Rate
 * @desc Number of graphic frames
 * @type number
 * @min 1
 * @default 1
 * 
 * @param Offset X
 * @desc Offset Value
 * @type number
 * @min -999999
 * @default 0
 * 
 * @param Offset Y
 * @desc Offset Value
 * @type number
 * @min -999999
 * @default 0
 * 
 */
/*~struct~staticPic:
 * 
 * @param File
 * @desc Image to use
 * @type file
 * @dir img/pictures
 * 
 * @param Offset X
 * @desc Position setting
 * @type number
 * @number 0
 * 
 * @param Offset Y
 * @desc Position setting
 * @type number
 * @number 0
 * 
 * @param Scroll X
 * @desc Position setting
 * @type number
 * @number 0
 * 
 * @param Scroll Y
 * @desc Position setting
 * @type number
 * @number 0
 * 
 * @param Anchor X
 * @desc Pivot point setting
 * @type number
 * @default 0
 * @min -999999
 * @decimals 3
 * 
 * @param Anchor Y
 * @desc Pivot point setting
 * @type number
 * @default 0
 * @min -999999
 * @decimals 3
 * 
 * @param Rotation
 * @desc Rotation applied per frame
 * @type number
 * @decimals 3
 * @default 0
 * 
 */
/*~struct~locSize:
 * 
 * @param X
 * @desc Position setting.
 * @type number
 * @default 0
 * 
 * @param Y
 * @desc Position setting.
 * @type number
 * @default 0
 * 
 * @param Width
 * @desc Size setting.
 * @type number
 * @default 1
 * 
 * @param Height
 * @desc Size setting.
 * @type number
 * @default 1
 * 
 */
/*~struct~windowStyle:
 * 
 * @param Font Settings
 * @desc Setup child parameters
 * 
 * @param Font Size
 * @parent Font Settings
 * @desc Size of font.
 * @type number
 * @default 16
 * 
 * @param Font Face
 * @parent Font Settings
 * @desc Font face used for the window.
 * @type text
 * @default sans-serif
 * 
 * @param Base Font Color
 * @parent Font Settings
 * @desc Default font color for window
 * @type text
 * @default #ffffff
 * 
 * @param Font Outline Color
 * @parent Font Settings
 * @desc Default font color for window
 * @type text
 * @default rgba(0, 0, 0, 0.5)
 * 
 * @param Font Outline Thickness
 * @parent Font Settings
 * @desc The thickness of the text outline
 * @type number
 * @default 3
 * 
 * @param Window Skin
 * @desc Image file used for the window skin.
 * @type file
 * @dir img/system/
 * @default Window
 * 
 * @param Window Opacity
 * @desc 0 = Fully transparent, 255 = Fully opaque.
 * @type number
 * @default 255
 * 
 * @param Show Window Dimmer
 * @desc Hides window skin
 * @type boolean
 * @default false
 * 
 */
/*~struct~gaugeDraw:
 * 
 * @param Label
 * @desc Label text for gauge
 * @type text
 * @default gauge
 * 
 * @param Label X
 * @desc Position of the label text in window
 * @type text
 * @default 0
 * 
 * @param Label Y
 * @desc Position of the label text in window
 * @type text
 * @default 0
 * 
 * @param Gauge Current Value
 * @desc How to set gauge current value
 * Evaluated value.
 * @type text
 * @default
 * 
 * @param Gauge Max Value
 * @desc How to set gauge max value
 * Evaluated value.
 * @type text
 * @default
 * 
 * @param Gauge X
 * @desc Position of the gauge in window
 * @type text
 * @default 0
 * 
 * @param Gauge Y
 * @desc Position of the gauge in window
 * @type text
 * @default 0
 * 
 * @param Gauge Width
 * @desc Size of the gauge
 * @type text
 * @default 1
 * 
 * @param Gauge Height
 * @desc Size of the gauge
 * @type text
 * @default 1
 * @default 1
 * 
 * @param Gauge Border
 * @desc Border size indent of the gauge
 * @type text
 * @default 2
 * 
 * @param Gauge Border Color
 * @desc Color for gauge border
 * @type text
 * @default #000000
 * 
 * @param Gauge Background Color
 * @desc Color for gauge background
 * @type text
 * @default #666666
 * 
 * @param Gauge Color
 * @desc Color for gauge background
 * @type text
 * @default #aaffaa
 * 
 */
/*~struct~gameDataWindow:
 * 
 * @param Name
 * @desc No function.
 * @type text
 * @default Window
 * 
 * @param Dimension Configuration
 * @desc Setup position and width of the window
 * @type struct<locSize>
 * @default {"X":"0","Y":"0","Width":"1","Height":"1"}
 * 
 * @param Window Font and Style Configuration
 * @desc Custom style the window
 * @type struct<windowStyle>
 * @default {"Font Settings":"","Font Size":"16","Font Face":"sans-serif","Base Font Color":"#ffffff","Font Outline Color":"rgba(0, 0, 0, 0.5)","Font Outline Thickness":"3","Window Skin":"Window","Window Opacity":"255","Show Window Dimmer":"false"}
 * 
 * @param Display Switch
 * @desc Require this switch enabled to display window
 * If no switch, always show
 * @type switch
 * @default 0
 * 
 * @param Gauges
 * @desc Setup gauges for the window
 * @type struct<gaugeDraw>[]
 * @default []
 * 
 * @param Draw Graphic
 * @desc Set graphic to draw
 * @type file
 * @dir img/pictures/
 * 
 * @param Graphic X
 * @parent Draw Graphic
 * @desc Position of graphic in window
 * @type text
 * @default 0
 * 
 * @param Graphic Y
 * @parent Draw Graphic
 * @desc Position of graphic in window
 * @type text
 * @default 0
 * 
 * @param Graphic Width
 * @parent Draw Graphic
 * @desc Size of graphic in window
 * @type text
 * @default 1
 * 
 * @param Graphic Height
 * @parent Draw Graphic
 * @desc Size of graphic in window
 * @type text
 * @default 1
 * 
 * @param Draw Player Name
 * @desc Draws the player name in window
 * @type boolean
 * @default false
 * 
 * @param Name X
 * @parent Draw Player Name
 * @desc Position of name in window
 * @type text
 * @default 0
 * 
 * @param Name Y
 * @parent Draw Player Name
 * @desc Position of name in window
 * @type text
 * @default 0
 * 
 * @param Draw Player Face
 * @desc Draws the player face graphic in window
 * @type boolean
 * @default false
 * 
 * @param Face X
 * @parent Draw Player Face
 * @desc Position of face in window
 * @type text
 * @default 0
 * 
 * @param Face Y
 * @parent Draw Player Face
 * @desc Position of face in window
 * @type text
 * @default 0
 * 
 * @param Face Width
 * @parent Draw Player Face
 * @desc Size of face in window
 * @type text
 * @default 1
 * 
 * @param Face Height
 * @parent Draw Player Face
 * @desc Size of face in window
 * @type text
 * @default 1
 * 
 * @param Draw Player Front Graphic
 * @desc Draws the player front graphic in window
 * @type boolean
 * @default false
 * 
 * @param Front Graphic X
 * @parent Draw Player Front Graphic
 * @desc Position of graphic in window
 * @type text
 * @default 0
 * 
 * @param Front Graphic Y
 * @parent Draw Player Front Graphic
 * @desc Position of graphic in window
 * @type text
 * @default 0
 * 
 * @param Front Graphic Width
 * @parent Draw Player Front Graphic
 * @desc Size of graphic in window
 * @type text
 * @default 1
 * 
 * @param Front Graphic Height
 * @parent Draw Player Front Graphic
 * @desc Size of graphic in window
 * @type text
 * @default 1
 * 
 * @param Draw Player Back Graphic
 * @desc Draws the player back graphic in window
 * @type boolean
 * @default false
 * 
 * @param Back Graphic X
 * @parent Draw Player Back Graphic
 * @desc Position of graphic in window
 * @type text
 * @default 0
 * 
 * @param Back Graphic Y
 * @parent Draw Player Back Graphic
 * @desc Position of graphic in window
 * @type text
 * @default 0
 * 
 * @param Back Graphic Width
 * @parent Draw Player Back Graphic
 * @desc Size of graphic in window
 * @type text
 * @default 1
 * 
 * @param Back Graphic Height
 * @parent Draw Player Back Graphic
 * @desc Size of graphic in window
 * @type text
 * @default 1
 * 
 * @param Draw Play Time
 * @desc Draw play time
 * @type boolean
 * @default false
 * 
 * @param Play Time X
 * @parent Draw Play Time
 * @desc Position of play time in window
 * @type text
 * @default 0
 * 
 * @param Play Time Y
 * @parent Draw Play Time
 * @desc Position of play time in window
 * @type text
 * @default 0
 * 
 * @param Draw Save Count
 * @desc Draw number of times game saved
 * @type boolean
 * @default false
 * 
 * @param Save Count Text
 * @parent Draw Save Count
 * @desc Text for save count.
 * %1 = value
 * @type text
 * @default Saves: %1
 * 
 * @param Save Count X
 * @parent Draw Save Count
 * @desc Position of save count in window
 * @type text
 * @default 0
 * 
 * @param Save Count Y
 * @parent Draw Save Count
 * @desc Position of save count in window
 * @type text
 * @default 0
 * 
 * @param Draw Capture Count
 * @desc Draw number of captures successful
 * @type boolean
 * @default false
 * 
 * @param Capture Count Text
 * @parent Draw Capture Count
 * @desc Text for capture count.
 * %1 = value
 * @type text
 * @default Captures: %1
 * 
 * @param Capture Count X
 * @parent Draw Capture Count
 * @desc Position of capture count in window
 * @type text
 * @default 0
 * 
 * @param Capture Count Y
 * @parent Draw Capture Count
 * @desc Position of capture count in window
 * @type text
 * @default 0
 * 
 * @param Display Map Character
 * @desc Display actor map character
 * @type boolean
 * @default false
 * 
 * @param Character Direction
 * @parent Display Map Character
 * @desc Facing direction of the character.
 * @type select
 * @option down
 * @value 2
 * @option left
 * @value 4
 * @option right
 * @value 6
 * @option up
 * @value 8
 * @default 2
 * 
 * @param Character X
 * @parent Display Map Character
 * @desc Position relative to window
 * @type text
 * @default 0
 * 
 * @param Character Y
 * @parent Display Map Character
 * @desc Position relative to window
 * @type text
 * @default 0
 * 
 * @param Character Scale X
 * @parent Display Map Character
 * @desc Size of the character
 * @type text
 * @default 1
 * 
 * @param Character Scale Y
 * @parent Display Map Character
 * @desc Size of the character
 * @type text
 * @default 1
 * 
 */
/*~struct~actorBaseParamWindow:
 * 
 * @param Name
 * @desc No function.
 * @type text
 * @default Window
 * 
 * @param Base Param
 * @desc The base param to draw
 * @type select
 * @option mhp
 * @value 0
 * @option mmp
 * @value 1
 * @option atk
 * @value 2
 * @option def
 * @value 3
 * @option mat
 * @value 4
 * @option mdf
 * @value 5
 * @option agi
 * @value 6
 * @option luk
 * @value 7
 * @default 0
 * 
 * @param Param Text
 * @desc How to draw param text
 * %1 = param value
 * @type text
 * @default %1
 * 
 * @param X
 * @desc Position in window
 * @type text
 * @default 0
 * 
 * @param Y
 * @desc Position in window
 * @type text
 * @default 0
 * 
 */
/*~struct~actorExParamWindow:
 * 
 * @param Name
 * @desc No function.
 * @type text
 * @default Window
 * 
 * @param Ex Param
 * @desc The ex param to draw. Converted to percentage.
 * @type select
 * @option Hit Rate
 * @value 0
 * @option Evasion Rate
 * @value 1
 * @option Critical Rate
 * @value 2
 * @option Critical Evasion Rate
 * @value 3
 * @option Magic Evasion Rate
 * @value 4
 * @option Magic Reflection Rate
 * @value 5
 * @option Counter Attack Rate
 * @value 6
 * @option HP Regeneration Rate
 * @value 7
 * @option MP Regeneration Rate
 * @value 8
 * @option TP Regeneration Rate
 * @value 9
 * @default 0
 * 
 * @param Param Text
 * @desc How to draw param text
 * %1 = param value
 * @type text
 * @default %1
 * 
 * @param X
 * @desc Position in window
 * @type text
 * @default 0
 * 
 * @param Y
 * @desc Position in window
 * @type text
 * @default 0
 * 
 */
/*~struct~actorSPParamWindow:
 * 
 * @param Name
 * @desc No function.
 * @type text
 * @default Window
 * 
 * @param Sp Param
 * @desc The sp param to draw. Converted to percentage.
 * @type select
 * @option Target Rate
 * @value 0
 * @option Guard Effect Rate
 * @value 1
 * @option Recovery Effect Rate
 * @value 2
 * @option Pharmacology
 * @value 3
 * @option MP Cost Rate
 * @value 4
 * @option TP Charge Rate
 * @value 5
 * @option Physical Damage Rate
 * @value 6
 * @option Magical Damage Rate
 * @value 7
 * @option Floor Damage Rate
 * @value 8
 * @option Experience Rate
 * @value 9
 * @default 0
 * 
 * @param Param Text
 * @desc How to draw param text
 * %1 = param value
 * @type text
 * @default %1
 * 
 * @param X
 * @desc Position in window
 * @type text
 * @default 0
 * 
 * @param Y
 * @desc Position in window
 * @type text
 * @default 0
 * 
 */
/*~struct~actorDataWindow:
 * 
 * @param Name
 * @desc No function.
 * @type text
 * @default Window
 * 
 * @param Dimension Configuration
 * @desc Setup position and width of the window
 * @type struct<locSize>
 * @default {"X":"0","Y":"0","Width":"1","Height":"1"}
 * 
 * @param Window Font and Style Configuration
 * @desc Custom style the window
 * @type struct<windowStyle>
 * @default {"Font Settings":"","Font Size":"16","Font Face":"sans-serif","Base Font Color":"#ffffff","Font Outline Color":"rgba(0, 0, 0, 0.5)","Font Outline Thickness":"3","Window Skin":"Window","Window Opacity":"255","Show Window Dimmer":"false"}
 * 
 * @param Gauges
 * @desc Setup gauges for the window
 * @type struct<gaugeDraw>[]
 * @default []
 * 
 * @param Draw Actor Name
 * @desc Draw actor name
 * @type boolean
 * @default false
 * 
 * @param Name Text
 * @parent Draw Actor Name
 * @desc Text used for the name
 * %1 = Name, %2 = Nickname
 * @type text
 * @default %1
 * 
 * @param Name X
 * @parent Draw Actor Name
 * @desc Position of name in window
 * @type text
 * @default 0
 * 
 * @param Name Y
 * @parent Draw Actor Name
 * @desc Position of name in window
 * @type text
 * @default 0
 * 
 * @param Draw Actor Profile
 * @desc Draw actor profile
 * @type boolean
 * @default false
 * 
 * @param Profile X
 * @parent Draw Actor Profile
 * @desc Position of profile in window
 * @type text
 * @default 0
 * 
 * @param Profile Y
 * @parent Draw Actor Profile
 * @desc Position of profile in window
 * @type text
 * @default 0
 * 
 * @param Draw Class Level
 * @desc Draw actor class name and level
 * @type boolean
 * @default false
 * 
 * @param Class Level Text
 * @parent Draw Class Level
 * @desc Draw class name and level
 * %1 = class name, %2 = level
 * @type text
 * @default Class: %1 <%2>
 * 
 * @param Class Level X
 * @parent Draw Class Level
 * @desc Position of class level in window.
 * @type text
 * @default 0
 * 
 * @param Class Level Y
 * @parent Draw Class Level
 * @desc Position of class level in window.
 * @type text
 * @default 0
 * 
 * @param Draw HP Resource
 * @desc Draw actor current and max HP
 * @type boolean
 * @default false
 * 
 * @param HP Text
 * @parent Draw HP Resource
 * @desc Text for HP (Escape chars allowed)
 * %1 = Current, %2 = Max
 * @type text
 * @default \I[84]%1 / %2
 * 
 * @param HP X
 * @parent Draw HP Resource
 * @desc Position of text in window
 * @type text
 * @default 0
 * 
 * @param HP Y
 * @parent Draw HP Resource
 * @desc Position of text in window
 * @type text
 * @default 0
 * 
 * @param Draw MP Resource
 * @desc Draw actor current and max MP
 * @type boolean
 * @default false
 * 
 * @param MP Text
 * @parent Draw MP Resource
 * @desc Text for MP (Escape chars allowed)
 * %1 = Current, %2 = Max
 * @type text
 * @default \I[79]%1 / %2
 * 
 * @param MP X
 * @parent Draw MP Resource
 * @desc Position of text in window
 * @type text
 * @default 0
 * 
 * @param MP Y
 * @parent Draw MP Resource
 * @desc Position of text in window
 * @type text
 * @default 0
 * 
 * @param Draw TP Resource
 * @desc Draw actor current and max TP
 * @type boolean
 * @default false
 * 
 * @param TP Text
 * @parent Draw TP Resource
 * @desc Text for TP (Escape chars allowed)
 * %1 = Current, %2 = Max
 * @type text
 * @default \I[79]%1 / %2
 * 
 * @param TP X
 * @parent Draw TP Resource
 * @desc Position of text in window
 * @type text
 * @default 0
 * 
 * @param TP Y
 * @parent Draw TP Resource
 * @desc Position of text in window
 * @type text
 * @default 0
 * 
 * @param Draw Base Params
 * @desc Draw actor base params
 * @type struct<actorBaseParamWindow>[]
 * @default []
 * 
 * @param Draw Ex Params
 * @desc Draw actor extra params
 * @type struct<actorExParamWindow>[]
 * @default []
 * 
 * @param Draw Sp Params
 * @desc Draw actor special params
 * @type struct<actorSpParamWindow>[]
 * @default []
 * 
 * @param Display Map Character
 * @desc Display actor map character
 * @type boolean
 * @default false
 * 
 * @param Character Direction
 * @parent Display Map Character
 * @desc Facing direction of the character.
 * @type select
 * @option down
 * @value 2
 * @option left
 * @value 4
 * @option right
 * @value 6
 * @option up
 * @value 8
 * @default 2
 * 
 * @param Character X
 * @parent Display Map Character
 * @desc Position relative to window
 * @type text
 * @default 0
 * 
 * @param Character Y
 * @parent Display Map Character
 * @desc Position relative to window
 * @type text
 * @default 0
 * 
 * @param Character Scale X
 * @parent Display Map Character
 * @desc Size of the character
 * @type text
 * @default 1
 * 
 * @param Character Scale Y
 * @parent Display Map Character
 * @desc Size of the character
 * @type text
 * @default 1
 * 
 * @param Display Battler
 * @desc Display actor battler
 * @type boolean
 * @default false
 * 
 * @param Battler Motion
 * @parent Display Battler
 * @desc Battler motion to refresh to
 * @type select
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @default wait
 * 
 * @param Battler X
 * @parent Display Battler
 * @desc Position relative to window
 * @type text
 * @default 0
 * 
 * @param Battler Y
 * @parent Display Battler
 * @desc Position relative to window
 * @type text
 * @default 0
 * 
 * @param Battler Scale X
 * @parent Display Battler
 * @desc Size of the battler
 * @type text
 * @default 1
 * 
 * @param Battler Scale Y
 * @parent Display Battler
 * @desc Size of the battler
 * @type text
 * @default 1
 * 
 */
/*~struct~playerUI:
 * 
 * @param Backgrounds
 * @desc Lowest graphic layer for the scene.
 * @type struct<staticPic>[]
 * @default []
 * 
 * @param Back Graphics
 * @desc Graphic layer just above background.
 * @type struct<animPic>[]
 * @default []
 * 
 * @param Game Data Window
 * @desc Windows to display game data.
 * @type struct<gameDataWindow>[]
 * @default []
 * 
 * @param Actor Data Window
 * @desc Windows to display leader actor data.
 * @type struct<actorDataWindow>[]
 * @default []
 * 
 */

const Syn_MC = {};
Syn_MC.Plugin = PluginManager.parameters(`Synrec_MonsterCapture`);

function GAMEOVER_CONFIGURATION_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

Syn_MC.GAMEOVER_CONFIGURATION = GAMEOVER_CONFIGURATION_PARSER_MONSTERCAPTURE(Syn_MC.Plugin['Gameover Configuration']);

function PLAYER_CONFIGURATION_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function PLAYER_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        try{
            obj['Player Configurations'] = JSON.parse(obj['Player Configurations']).map((config)=>{
                return PLAYER_CONFIGURATION_PARSER_MONSTERCAPTURE(config);
            }).filter(Boolean)
        }catch(e){
            obj['Use Custom Player'] = false;
            obj['Player Configurations'] = [];
        }
        return obj;
    }catch(e){
        return;
    }
}

Syn_MC.PLAYER_DATA = PLAYER_PARSER_MONSTERCAPTURE(Syn_MC.Plugin['Player Configuration']);

function ROSTER_ENEMY_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function ENEMY_PLAYER_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        try{
            obj['Enemy Roster'] = JSON.parse(obj['Enemy Roster']).map((config)=>{
                return ROSTER_ENEMY_PARSER_MONSTERCAPTURE(config);
            }).filter(Boolean);
        }catch(e){
            obj['Enemy Roster'] = [];
        }
        return;
    }catch(e){
        return;
    }
}

function EVOLUTION_REQUIREMENTS_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        try{
            obj['Equip Weapons'] = JSON.parse(obj['Equip Weapons']);
        }catch(e){
            obj['Equip Weapons'] = [];
        }
        try{
            obj['Equip Armors'] = JSON.parse(obj['Equip Armors']);
        }catch(e){
            obj['Equip Armors'] = [];
        }
        try{
            obj['Items'] = JSON.parse(obj['Items']);
        }catch(e){
            obj['Items'] = [];
        }
        return obj;
    }catch(e){
        return;
    }
}

function CAPTURE_SETTINGS_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function ACTOR_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        try{
            obj['Genders'] = JSON.parse(obj['Genders']).filter(Boolean).map(gen => gen.toLowerCase());
        }catch(e){
            obj['Genders'] = [];
        }
        obj['Evolution Settings'] = EVOLUTION_REQUIREMENTS_PARSER_MONSTERCAPTURE(obj['Evolution Settings']);
        obj['Capture Settings'] = CAPTURE_SETTINGS_PARSER_MONSTERCAPTURE(obj['Capture Settings']);
        return obj;
    }catch(e){
        return;
    }
}

try{
    Syn_MC.ACTOR_CONFIGURATIONS = JSON.parse(Syn_MC.Plugin['Actor Configurations']).map((config)=>{
        return ACTOR_PARSER_MONSTERCAPTURE(config);
    }).filter(Boolean)
}catch(e){
    Syn_MC.ACTOR_CONFIGURATIONS = [];
}

Syn_MC.RESERVE_BOX_COUNT = eval(Syn_MC.Plugin['Reserve Boxes']) || 1;
Syn_MC.RESERVE_BOX_SIZE = eval(Syn_MC.Plugin['Reserve Box Size']) || 1;

function ENEMY_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        try{
            obj['Allow Capture States'] = JSON.parse(obj['Allow Capture States']);
        }catch(e){
            obj['Allow Capture States'] = [];
        }
        try{
            obj['Block Capture States'] = JSON.parse(obj['Block Capture States']);
        }catch(e){
            obj['Block Capture States'] = [];
        }
        return obj;
    }catch(e){
        return;
    }
}

try{
    Syn_MC.ENEMY_CONFIGURATIONS = JSON.parse(Syn_MC.Plugin['Enemy Configurations']).map((config)=>{
        return ENEMY_PARSER_MONSTERCAPTURE(config);
    }).filter(Boolean)
}catch(e){
    Syn_MC.ENEMY_CONFIGURATIONS = [];
}

function SKILL_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

try{
    Syn_MC.SKILL_CONFIGURATIONS = JSON.parse(Syn_MC.Plugin['Skill Configurations']).map((config)=>{
        return SKILL_PARSER_MONSTERCAPTURE(config);
    }).filter(Boolean);
}catch(e){
    Syn_MC.SKILL_CONFIGURATIONS = [];
}

function ITEM_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

try{
    Syn_MC.ITEM_CONFIGURATIONS = JSON.parse(Syn_MC.Plugin['Item Configurations']).map((config)=>{
        return ITEM_PARSER_MONSTERCAPTURE(config);
    }).filter(Boolean);
}catch(e){
    Syn_MC.ITEM_CONFIGURATIONS = [];
}

function GENDER_HEX_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function GENDER_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        obj['Gender Hex Blend'] = GENDER_HEX_PARSER_MONSTERCAPTURE(obj['Gender Hex Blend']);
        return obj;
    }catch(e){
        return;
    }
}

try{
    Syn_MC.GENDER_CONFIGURATIONS = JSON.parse(Syn_MC.Plugin['Gender Configurations']).map((config)=>{
        return GENDER_PARSER_MONSTERCAPTURE(config);
    }).filter(Boolean)
}catch(e){
    Syn_MC.GENDER_CONFIGURATIONS = [];
}

function BREEDER_ACTOR_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function BREEDER_COMBINATION_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        obj['Actor 1 Required'] = BREEDER_ACTOR_PARSER_MONSTERCAPTURE(obj['Actor 1 Required']);
        obj['Actor 2 Required'] = BREEDER_ACTOR_PARSER_MONSTERCAPTURE(obj['Actor 2 Required']);
        return obj;
    }catch(e){
        return;
    }
}

try{
    Syn_MC.BREEDER_COMBINATIONS = JSON.parse(Syn_MC.Plugin['Breeder Combinations']).map((config)=>{
        return BREEDER_COMBINATION_PARSER_MONSTERCAPTURE(config);
    }).filter(Boolean)
}catch(e){
    Syn_MC.BREEDER_COMBINATIONS = [];
}

Syn_MC.BREEDER_HATCH_GFX = Syn_MC.Plugin['Breeder Hatcher Graphic'];
Syn_MC.BREEDER_HATCH_GFX_INDEX = Syn_MC.Plugin['Breeder Hatcher Graphic Index'];
Syn_MC.BREEDER_HATCH_GFX_ANIM = Syn_MC.Plugin['Breeder Hatcher Animation'];

function REGION_DATA_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function MAP_DATA_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        try{
            obj['Region Settings'] = JSON.parse(obj['Region Settings']).map((config)=>{
                return REGION_DATA_PARSER_MONSTERCAPTURE(config);
            }).filter(Boolean)
        }catch(e){
            obj['Region Settings'] = [];
        }
        return obj;
    }catch(e){
        return;
    }
}

try{
    Syn_MC.MAP_CONFIGURATIONS = JSON.parse(Syn_MC.Plugin['Map Configurations']).map((config)=>{
        return MAP_DATA_PARSER_MONSTERCAPTURE(config);
    }).filter(Boolean)
}catch(e){
    Syn_MC.MAP_CONFIGURATIONS = [];
}

Syn_MC.DEFAULT_MAX_BATTLE_ACTORS = eval(Syn_MC.Plugin['Default Actor Battlers']) || 1;
Syn_MC.DEFAULT_MAX_BATTLE_ENEMIES = eval(Syn_MC.Plugin['Default Enemy Battlers']) || 1;

function ANIM_IMAGE_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function TILING_IMAGE_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function DIMENSION_CONFIGURATION_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        obj['X'] = eval(obj['X']);
        obj['Y'] = eval(obj['Y']);
        obj['Width'] = eval(obj['Width']);
        obj['Height'] = eval(obj['Height']);
    }catch(e){
        console.warn(`Failed to parse dimension configuration. ${e}`);
        const obj = {};
        obj['X'] = 0;
        obj['Y'] = 0;
        obj['Width'] = 1;
        obj['Height'] = 1;
    }
    return obj;
}

function WINDOW_STYLE_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj)
        obj['Font Size'] = eval(obj['Font Size']);
        obj['Font Outline Thickness'] = eval(obj['Font Outline Thickness']);
        obj['Window Opacity'] = eval(obj['Window Opacity']);
        obj['Show Window Dimmer'] = eval(obj['Show Window Dimmer']);
    }catch(e){
        console.warn(`Failed to parse window style. ${e}`);
        const obj = {};
        obj['Font Size'] = 16;
        obj['Font Face'] = 'sans-serif';
        obj['Base Font Color'] = '#ffffff';
        obj['Font Outline Color'] = 'rgba(0, 0, 0, 0.5)';
        obj['Font Outline Thickness'] = 3;
        obj['Window Skin'] = 'Window';
        obj['Window Opacity'] = 255;
        obj['Show Window Dimmer'] = false;
    }
    return obj;
}

function GAUGE_DRAW_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function GAME_DATA_WINDOW_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        obj['Dimension Configuration'] = DIMENSION_CONFIGURATION_PARSER_MONSTERCAPTURE(obj['Dimension Configuration']);
        obj['Window Font and Style Configuration'] = WINDOW_STYLE_PARSER_MONSTERCAPTURE(obj['Window Font and Style Configuration']);
        try{
            obj['Gauges'] = JSON.parse(obj['Gauges']).map((gauge_draw_config)=>{
                return GAUGE_DRAW_PARSER_MONSTERCAPTURE(gauge_draw_config);
            }).filter(Boolean)
        }catch(e){
            obj['Gauges'] = [];
        }
        return obj;
    }catch(e){
        return;
    }
}

function ACTOR_BASE_PARAM_WINDOW_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function ACTOR_EX_PARAM_WINDOW_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function ACTOR_SP_PARAM_WINDOW_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

function ACTOR_DATA_WINDOW_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        obj['Dimension Configuration'] = DIMENSION_CONFIGURATION_PARSER_MONSTERCAPTURE(obj['Dimension Configuration']);
        obj['Window Font and Style Configuration'] = WINDOW_STYLE_PARSER_MONSTERCAPTURE(obj['Window Font and Style Configuration']);
        try{
            obj['Gauges'] = JSON.parse(obj['Gauges']).map((gauge_draw_config)=>{
                return GAUGE_DRAW_PARSER_MONSTERCAPTURE(gauge_draw_config);
            }).filter(Boolean)
        }catch(e){
            obj['Gauges'] = [];
        }
        try{
            obj['Draw Base Params'] = JSON.parse(obj['Draw Base Params']).map((data)=>{
                return ACTOR_BASE_PARAM_WINDOW_PARSER_MONSTERCAPTURE(data);
            }).filter(Boolean);
        }catch(e){
            obj['Draw Base Params'] = [];
        }
        try{
            obj['Draw Ex Params'] = JSON.parse(obj['Draw Ex Params']).map((data)=>{
                return ACTOR_EX_PARAM_WINDOW_PARSER_MONSTERCAPTURE(data);
            }).filter(Boolean);
        }catch(e){
            obj['Draw Ex Params'] = [];
        }
        try{
            obj['Draw Sp Params'] = JSON.parse(obj['Draw Sp Params']).map((data)=>{
                return ACTOR_SP_PARAM_WINDOW_PARSER_MONSTERCAPTURE(data);
            }).filter(Boolean);
        }catch(e){
            obj['Draw Sp Params'] = [];
        }
        return obj;
    }catch(e){
        return;
    }
}
BattleManager.setTeamMenu = function(teamMenu){
    this._teamMenu = teamMenu;
}

Syn_MC_BattMngr_StrtBatt = BattleManager.startBattle;
BattleManager.startBattle = function() {
    Syn_MC_BattMngr_StrtBatt.call(this);
    this.processActiveMembers();
}

BattleManager.processActiveMembers = function(){
    this._hasActor = true;
    this._hasEnemy = true;
    const setActors = $gameTemp._numBattleActors;
    const setEnemies = $gameTemp._numBattleEnemies;
    this._numActors = !isNaN(setActors) ? setActors : Syn_MC.DEFAULT_MAX_BATTLE_ACTORS;
    this._numEnemies = !isNaN(setEnemies) ? setEnemies : Syn_MC.DEFAULT_MAX_BATTLE_ENEMIES;
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

Game_Temp.prototype.setMaxBattlers = function(actors, enemies){
    this._numBattleActors = actors || Syn_MC.DEFAULT_MAX_BATTLE_ACTORS;
    this._numBattleEnemies = enemies || Syn_MC.DEFAULT_MAX_BATTLE_ENEMIES;
}

Game_Temp.prototype.reserveBootScene = function(data){
    if(!Array.isArray(this._rsvpScenesMC))this._rsvpScenesMC = [];
    this._rsvpScenesMC.push(data);
}

Game_Temp.prototype.updateReserveScene = function(){
    if(!Array.isArray(this._rsvpScenesMC))this._rsvpScenesMC = [];
    if(SceneManager.isSceneChanging())return;
    const data = this._rsvpScenesMC.pop();
    if(data){
        this.bootRequiredSceneMC(data)
    }
}

Game_Temp.prototype.bootRequiredSceneMC = function(scene){
    if(scene){
        const name = scene.scene;
        const prep = scene.prep;
        SceneManager.push(name);
        SceneManager.prepareNextScene(...prep);
    }
}

Syn_MC_GmSys_Init = Game_System.prototype.initialize;
Game_System.prototype.initialize = function(){
    Syn_MC_GmSys_Init.call(this, ...arguments);
    this._player_name = "";
}

Syn_MC_GmActn_SetSub = Game_Action.prototype.setSubject;
Game_Action.prototype.setSubject = function(subject) {
    if(!subject)return;
    if (subject.isActor()) {
        this._subjectActorId = subject.index();
        this._subjectEnemyIndex = -1;
    } else {
        Syn_MC_GmActn_SetSub.call(this, subject);
    }
}


Game_Action.prototype.subject = function() { //Overwritten Func
    if (!isNaN(this._subjectActorId)) {
        return $gameParty.battleMembers()[this._subjectActorId];
    } else {
        return $gameTroop.members()[this._subjectEnemyIndex];
    }
}

Syn_MC_GmActn_App = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    Syn_MC_GmActn_App.call(this, ...arguments);
    this.consumePowerPoint();
}

Game_Action.prototype.consumePowerPoint = function(){
    const obj = this.item();
    if (DataManager.isSkill(obj)) {
        const skill_id = obj.id;
        const power_skill = this.subject().powerSkills()[skill_id];
        if(power_skill){
            power_skill['PP']--;
        }
    }
}

Syn_MC_GmActn_AppItmUserEfct = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Syn_MC_GmActn_AppItmUserEfct.call(this, target);
    this.checkCapture(target);
}

Game_Action.prototype.checkCapture = function(target){
    const item = this.item();
    const itemCaptureRate = !isNaN(eval(item.meta.captureRate))? eval(item.meta.captureRate) / captureDivisor : SynrecMC.baseCapture / captureDivisor;
    if(!itemCaptureRate)return;
    if(this.subject().isActor())this.performCapture(target);
}

Game_Action.prototype.performCapture = function(target){
    if(target.isEnemy()){
        const data_obj = this.item();
        const data_config = DataManager.isItem(item_obj) ? Syn_MC.ITEM_CONFIGURATIONS.find(config => eval(config['Item']) == data_obj.id) : DataManager.isSkill(item_obj) ? Syn_MC.SKILL_CONFIGURATIONS.find(config => eval(config['Skill']) == data_obj.id) : null;
        if(!data_config)return;
        const capture_rate = eval(data_config['Capture Rate']);
        if(capture_rate > 0 && !isNaN(capture_rate)){
            const id = target._enemyId;
            const enemy_config = Syn_MC.ENEMY_CONFIGURATIONS.find((config)=>{
                return eval(config['Enemy']) == id;
            })
            if(enemy_config){
                const capture_actor_id = eval(enemy_config['Capture Actor']);
                const actor_config = Syn_MC.ACTOR_CONFIGURATIONS.find((config)=>{
                    return eval(config['Actor']) == capture_actor_id;
                })
                if(actor_config){
                    const capture_settings = actor_config['Capture Settings'] || {};
                    const hp_rate = target.hpRate();
                    const mp_rate = target.mpRate();
                    const tp_rate = target.tpRate();
                    const hp_bonus = (eval(capture_settings['HP Bonus']) || 0) * hp_rate;
                    const mp_bonus = (eval(capture_settings['MP Bonus']) || 0) * mp_rate;
                    const tp_bonus = (eval(capture_settings['TP Bonus']) || 0) * tp_rate;
                    const total_bonus = hp_bonus + mp_bonus + tp_bonus;
                    const capture_chance = capture_rate + total_bonus;
                    if(
                        Math.random() > capture_chance &&
                        !target.hasAntiCaptureState() &&
                        target.hasCaptureState()
                    ){
                        this.playCaptureSuccess(target, capture_actor_id);
                    }else{
                        this.playCaptureFail(target);
                    }
                }
            }
        }
    }else{
        return false;
    }
}

Game_Action.prototype.playCaptureSuccess = function(target, actor){
    $gameSystem._captureId = !isNaN($gameSystem._captureId) ? $gameSystem._captureId + 1 : 0;
    const captureLevel = isNaN(target._level) ? 1 : target._level;
    const hpSet = target._hp;
    const mpSet = target._mp;
    const gender = target._gender;
    const anim = eval(SynrecMC.successCaptureAnim);
    if(anim){
        if(MONSTER_CAPTURE_MV){
            target.startAnimation(anim);
        }else{
            $gameTemp.requestAnimation([target], anim);
        }
    }
    target._isCaptured = true;
    target.die();
    target.refresh();
    $gameParty.addCaptureActor(actor, hpSet, mpSet);
    target._actor = null;
}

Game_Action.prototype.playCaptureFail = function(target){
    const anim = eval(SynrecMC.failCaptureAnim);
    if(anim){
        if(MONSTER_CAPTURE_MV){
            target.startAnimation(anim);
        }else{
            $gameTemp.requestAnimation([target], anim);
        }
    }
}

Syn_MC_GmMap_Updt = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
    Syn_MC_GmMap_Updt.call(this, sceneActive);
    if(sceneActive){
        this.updateHatch();
    }
}

Game_Map.prototype.updateHatch = function(){
    if(!Array.isArray($gameParty._breederArray)){
        $gameParty.initBreeder();
    }
    const validHatches = $gameParty._breederArray.filter((item)=>{
        return item['Step Progress'] >= item['Step Complete']
    })
    if(validHatches.length <= 0)return;
    if(
        Syn_MC.BREEDER_HATCH_GFX && 
        !isNaN(Syn_MC.BREEDER_HATCH_GFX_INDEX) && 
        !isNaN(Syn_MC.BREEDER_HATCH_GFX_ANIM)
    ){
        SceneManager.push(Scene_Hatch);
    }else{
        for(let i = 0; i < $gameParty._breederArray.length; i++){
            const item = $gameParty._breederArray[i];
            const progress = item['Step Progress'];
            const complete = item['Step Complete'];
            const averageStats = item['Fusion Params'];
            const fuse_stats_only = eval(item['Fusion Params Only']);
            if(progress >= complete){
                if(averageStats){
                    const actorId = item['Result Actor'];
                    const actor = new Game_Actor(actorId);
                    const hp = actor.param(0);
                    const mp = actor.param(1);
                    const atk = actor.param(2);
                    const def = actor.param(3);
                    const mat = actor.param(4);
                    const mdf = actor.param(5);
                    const agi = actor.param(6);
                    const luk = actor.param(7);
                    const parAvgs = item['Fusion Params'];
                    if(!actor._breed_bonus){
                        actor.initBreederBonus();
                    }
                    if(fuse_stats_only){
                        actor._breed_bonus[0] += parAvgs[0];          
                        actor._breed_bonus[1] += parAvgs[1];            
                        actor._breed_bonus[2] += parAvgs[2];
                        actor._breed_bonus[3] += parAvgs[3];
                        actor._breed_bonus[4] += parAvgs[4];
                        actor._breed_bonus[5] += parAvgs[5];
                        actor._breed_bonus[6] += parAvgs[6];
                        actor._breed_bonus[7] += parAvgs[7];
                    }else{
                        actor._breed_bonus[0] += parAvgs[0] - hp;
                        actor._breed_bonus[1] += parAvgs[1] - mp;
                        actor._breed_bonus[2] += parAvgs[2] - atk;
                        actor._breed_bonus[3] += parAvgs[3] - def;
                        actor._breed_bonus[4] += parAvgs[4] - mat;
                        actor._breed_bonus[5] += parAvgs[5] - mdf;
                        actor._breed_bonus[6] += parAvgs[6] - agi;
                        actor._breed_bonus[7] += parAvgs[7] - luk;
                    }
                    actor._fuse_only_params = fuse_stats_only;
                    actor.setTp(0);
                    actor.setGender();
                    if($gameParty._actors.length >= $gameParty.maxBattleMembers()){
                        actor.onBattleEnd();
                        $gameParty.addToReserve(actor);
                    }else{
                        actor.onBattleStart();
                        $gameParty._actors.push(actor);
                    }
                }else{
                    const actorId = item['Result Actor'];
                    $gameParty.addActor(actorId);
                    $gameParty._breederArray.splice(i, 1);
                    i--
                }
            }
        }
    }
}

Syn_MC_GmPlyr_Init = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
    Syn_MC_GmPlyr_Init.call(this, ...arguments);
    this._equipData = [];
    this._equipInventory = [];
    this.createEquipSlots();
}

Game_Player.prototype.createEquipSlots = function(){
    const equip_slots = $dataSystem.equipTypes;
    for (let i = 0; i < equip_slots.length; i++) {
        const name = equip_slots[i];
        this._equipInventory.push({index:i, name:name, inventory:[]});
        this._equipData.push({index:i, name:name, equip:undefined})
    }
    this._equipInventory.push({index:this._equipInventory.length, name:"UNDEFINED", inventory:[]});
    this._equipData.push({index:this._equipData.length, name:"UNDEFINED", equip:undefined})
}

Game_Player.prototype.equipChange = function(armorId){
    const equip_slots = $dataSystem.equipTypes;
    const armor = $dataArmors[armorId];
    if(armor){
        const equip_type_id = armor.eTypeId;
        const category = equip_slots[equip_type_id];
        for(let i = 0; i < this._equipInventory.length; i++){
            const invType = this._equipInventory[i];
            if(invType["name"] == category){
                if(!invType["inventory"].includes(armorId)){
                    SoundManager.playBuzzer();
                    return;
                }
                break;
            }
        }
        this._equipData[equip_type_id] = armorId;
    }
}

Game_Player.prototype.gainEquip = function(armorId){
    const equip_slots = $dataSystem.equipTypes;
    const armor = $dataArmors[armorId];
    if(armor){
        const equip_type_id = armor.eTypeId;
        const category = equip_slots[equip_type_id];
        for(let i = 0; i < this._equipInventory.length; i++){
            const invType = this._equipInventory[i];
            if(invType["name"] == category){
                if(invType["inventory"].includes(armorId)){
                    SoundManager.playBuzzer();
                    return;
                }
                invType["inventory"].push(armorId);
                invType["inventory"].sort();
            }
        }
    }
}

Game_Player.prototype.loseEquip = function(armorId){
    const equip_slots = $dataSystem.equipTypes;
    const armor = $dataArmors[armorId];
    if(armor){
        const equip_type_id = armor.eTypeId;
        const category = equip_slots[equip_type_id];
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
}

Syn_MC_GmPlyr_MvStrt = Game_Player.prototype.moveStraight;
Game_Player.prototype.moveStraight = function(d) {
    if (this.canPass(this.x, this.y, d)){
        $gameParty.progressBreed();
        $gameParty.progressPreBreed();
        $gameParty.grantParentBreedEXP();
    }
    Syn_MC_GmPlyr_MvStrt.call(this, d);
}

Game_Player.prototype.customData = function(){
    return this._custom_data;
}

Syn_MC_GmPlyr_Updt = Game_Player.prototype.update;
Game_Player.prototype.update = function(){
    this.updatePlayerConfig();
    this.updatePlayerData();
    Syn_MC_GmPlyr_Updt.call(this, ...arguments);
    this.updateDashGraphic();
}

Game_Player.prototype.updatePlayerConfig = function(){
    const player_data = Syn_MC.PLAYER_DATA;
    const use_custom = eval(player_data['Use Custom Player']);
    if(!use_custom){
        if(this._custom_data){
            this._need_refresh = true;
        }
        this._custom_data = null;
        return;
    }
    const configs = player_data['Player Configurations'];
    const var_id = eval(player_data['Player Configuration Variable']);
    if(!isNaN(var_id) && this._custom_variable != var_id){
        const var_val = $gameVariables.value(var_id);
        this._custom_data = configs[var_val] || null;
        if(this._custom_data){
            this._custom_data = JsonEx.makeDeepCopy(this._custom_data);
        }
        this._custom_variable = var_id;
        this._need_refresh = true;
    }else if(isNaN(var_id)){
        if(this._custom_data){
            this._need_refresh = true;
        }
        this._custom_data = null;
    }
}

Game_Player.prototype.updatePlayerData = function(){
    const custom_data = this._custom_data;
    if(custom_data){
        this._normal_image = custom_data['Default Character File'];
        this._normal_image_index = custom_data['Default Character File Index'];
        this._dash_image = custom_data['Dash Character File'];
        this._dash_image_index = custom_data['Dash Character File Index'];
    }
    if(this._need_refresh){
        this.refresh();
    }
}

Game_Player.prototype.updateDashGraphic = function(){
    const custom_data = this._custom_data;
    if(
        this.isDashing() && 
        custom_data &&
        !this._dash_gfx
    ){
        this.refresh();
    }else if(
        !this.isDashing() &&
        custom_data &&
        this._dash_gfx
    ){
        this.refresh();
    }
}

Syn_MC_GmPlyr_Rfsh = Game_Player.prototype.refresh;
Game_Player.prototype.refresh = function() {
    const custom_data = this._custom_data;
    if(custom_data){
        const nrm_img = this._normal_image;
        const nrm_img_indx = this._normal_image_index;
        const dsh_img = this._dash_image;
        const dsh_img_indx = this._dash_image_index;
        if(this.isDashing()){
            this.setImage(dsh_img, dsh_img_indx);
        }else{
            this.setImage(nrm_img, nrm_img_indx);
        }
        this._followers.refresh();
        return;
    }
    return Syn_MC_GmPlyr_Rfsh.call(this, ...arguments);
}

Syn_MC_GmFolws_Init = Game_Followers.prototype.initialize;
Game_Followers.prototype.initialize = function() {
    Syn_MC_GmFolws_Init.call(this);
    const player_data = Syn_MC.PLAYER_DATA;
    if(
        Utils.RPGMAKER_NAME == "MV" &&
        eval(player_data['Use Custom Player'])
    ){
        const scene = SceneManager._scene;
        const spriteset = scene._spriteset;
        const follNum = Math.min(eval(player_data['Follower Count']) || 0, $gameParty.maxBattleMembers());
        for(let i = 0; i < this._data.length; i++){
            if(i >= follNum){
                const member = this._data[i];
                if(spriteset){
                    const charSprites = spriteset._characterSprites;
                    const tilemap = spriteset._tilemap;
                    const sprite = charSprites.find((char_sprite)=>{
                        const character = char_sprite._character;
                        if(character == member){
                            return true;
                        }
                    })
                    if(sprite){
                        tilemap.removeChild(sprite);
                        const index = charSprites.indexOf(sprite);
                        charSprites.splice(index, 1);
                    }
                }
            }
        }
        while(this._data.length < follNum){
            const index = JsonEx.makeDeepCopy(this._data.length);
			this._data.push(new Game_Follower(index));
        }
    }
}

Syn_MC_GmFolws_Setup = Game_Followers.prototype.setup;
Game_Followers.prototype.setup = function() {
    const player_data = Syn_MC.PLAYER_DATA;
	if( eval(player_data['Use Custom Player'])){
        const follNum = Math.min(eval(player_data['Follower Count']) || 0, $gameParty.maxBattleMembers());
		this._data = [];
		for (let i = 0; i < follNum; i++) {
			this._data.push(new Game_Follower(i));
		}
	}else{
		Syn_MC_GmFolws_Setup.call(this);
	}
}

function Game_MonsterCharacter(){
    this.initialize(...arguments);
}

Game_MonsterCharacter.prototype = Object.create(Game_Character.prototype);
Game_MonsterCharacter.prototype.constructor = Game_MonsterCharacter;

Game_MonsterCharacter.prototype.screenX = function() {
    return this._screenX || 0;
}

Game_MonsterCharacter.prototype.screenY = function() {
    return this._screenY || 0;
}

Game_MonsterCharacter.prototype.screenZ = function() {
    return 1;
}

Game_MonsterCharacter.prototype.setActor = function(actor){
    if(actor instanceof (Game_Actor)){
        const char_name = actor.characterName();
        const char_index = actor.characterIndex();
        this.setImage(char_name, char_index);
        this.setStepAnime(true);
    }else{
        this.setImage("", 0);
    }
}

Game_MonsterCharacter.prototype.setScreenX = function(num){
    isNaN(num) ? num = 0 : num;
    this._screenX = num;
}

Game_MonsterCharacter.prototype.setScreenY = function(num){
    isNaN(num) ? num = 0 : num;
    this._screenY = num;
}

Syn_MC_GmBattBse_InitMems = Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers = function() {
    Syn_MC_GmBattBse_InitMems.call(this);
    this.initBreederBonus();
    this.initPowerPoints();
}

Game_BattlerBase.prototype.initBreederBonus = function(){
    this._breed_bonus = [0,0,0,0,0,0,0,0];
}

Game_BattlerBase.prototype.breederStat = function(id){
    if(!Array.isArray(this._breed_bonus))this._breed_bonus = [];
    return this._breed_bonus[id];
}

Syn_MC_GmBattBse_Param = Game_BattlerBase.prototype.param;
Game_BattlerBase.prototype.param = function(paramId) {
    const base = Syn_MC_GmBattBse_Param.call(this, ...arguments);
    const breeder_bonus = this.breederStat(paramId) || 0;
    const value = base + breeder_bonus;
    const maxValue = this.paramMax(paramId);
    const minValue = this.paramMin(paramId);
    return Math.round(value.clamp(minValue, maxValue));
}

Game_BattlerBase.prototype.initPowerPoints = function(){
    this._power_skills = {};
}

Game_BattlerBase.prototype.gender = function(){
    return this._gender;
}

Game_BattlerBase.prototype.powerSkills = function(){
    if(!this._power_skills)this.initPowerPoints();
    return this._power_skills;
}

Game_BattlerBase.prototype.isPowerSkill = function(id){
    return !!this.powerSkills()[id];
}

Game_BattlerBase.prototype.addPowerSkill = function(id){
    if(this.isPowerSkill(id))return;
    const configs = Syn_MC.SKILL_CONFIGURATIONS;
    const config = configs.find((configuration)=>{
        return configuration['Skill'] == id;
    })
    if(config){
        const power_skills = this.powerSkills();
        const obj = {};
        obj['PP'] = eval(config['Use Limit']);
        obj['Max PP'] = eval(config['Use Limit']);
        power_skills[id] = obj;
        return true;
    }else{
        this.removePowerSkill(id);
    }
    return false;
}

Game_BattlerBase.prototype.removePowerSkill = function(id){
    const power_skills = this.powerSkills();
    delete power_skills[id];
}

Syn_MC_PP_GmBattBse_Rfsh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function() {
    Syn_MC_PP_GmBattBse_Rfsh.call(this);
    this.refreshPowerPoints();
}

Syn_MC_PP_GmBattBse_RecovAll = Game_BattlerBase.prototype.recoverAll;
Game_BattlerBase.prototype.recoverAll = function() {
    Syn_MC_PP_GmBattBse_RecovAll.call(this);
    this.restorePowerPoints();
}

Syn_MC_PP_GmBattBse_MetSklConds = Game_BattlerBase.prototype.meetsSkillConditions;
Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
    const base = Syn_MC_PP_GmBattBse_MetSklConds.call(this, ...arguments);
    const power_valid = this.canUsePowerSkill(skill.id);
    return (
        base && 
        power_valid
    );
}

Game_BattlerBase.prototype.canUsePowerSkill = function(id){
    if(!this.isPowerSkill(id))return true;
    const power_skill = this.powerSkills()[id];
    if(isNaN(power_skill['PP']))console.error(`NaN value for power skill: ${id}.`);
    return power_skill['PP'] > 0 && !isNaN(power_skill['PP']);
}

Game_BattlerBase.prototype.consumePP = function(id){
    if(!this.isPowerSkill(id))return false;
    const power_skill = this.powerSkills()[id];
    power_skill['PP']--;
}

Game_BattlerBase.prototype.refreshPowerPoints = function(){
    const power_skills = this.powerSkills();
    const skill_ids = Object.keys(power_skills);
    const battler = this;
    skill_ids.forEach((id)=>{
        battler.addPowerSkill(id);
    })
}

Game_BattlerBase.prototype.restorePowerPoints = function(){
    this.refreshPowerPoints();
    const power_skills = this.powerSkills();
    const skill_ids = Object.keys(power_skills);
    for(const id of skill_ids){
        const power_skill_data = power_skills[id];
        const pp = power_skill_data['PP'];
        const max_pp = power_skill_data['Max PP'];
        const diff = max_pp - pp;
        power_skill_data['PP'] += diff;
    }
}

Syn_MC_GmBattBse_Die = Game_BattlerBase.prototype.die;
Game_BattlerBase.prototype.die = function() {
    if(this._isCaptured){
        this.clearStates();
        this.clearBuffs();
    }
    Syn_MC_GmBattBse_Die.call(this);
}

Syn_MC_GmBattBse_Rev = Game_BattlerBase.prototype.revive;
Game_BattlerBase.prototype.revive = function() {
    if(this._isCaptured)return;
    Syn_MC_GmBattBse_Rev.call(this);
}

Game_BattlerBase.prototype.setGender = function(gender){
    if(Syn_MC.GENDER_CONFIGURATIONS.length <= 0)return this._gender = undefined;
    if(this._gender)return true;
	if(gender){
        gender = (gender || "").toLowerCase().replace(/\s/g, '');
		this._gender = gender;
	}else{
		if(this.isEnemy()){
            const id = this._enemyId;
            const enemy_config = Syn_MC.ENEMY_CONFIGURATIONS.find((config)=>{
                return eval(config['Enemy']) == id;
            });
            if(enemy_config){
                const actorId = eval(enemy_config['Capture Actor']);
                if(actorId){
                    const actor_config = Syn_MC.ACTOR_CONFIGURATIONS.find((config)=>{
                        return eval(config['Actor']) == actorId;
                    })
                    if(actor_config){
                        const genders = actor_config['Genders'];
                        const gender_index = Math.randomInt(genders.length);
                        this._gender = genders[gender_index];
                    }else{
                        this._gender = "";
                    }
                }else{
                    this._gender = "";
                }
            }
        }else if(this.isActor()){
            const id = this._actorId;
            const actor_config = Syn_MC.ACTOR_CONFIGURATIONS.find((config)=>{
                return eval(config['Actor']) == id;
            })
            if(actor_config){
                const genders = actor_config['Genders'];
                const gender_index = Math.randomInt(genders.length);
                this._gender = genders[gender_index];
            }else{
                this._gender = "";
            }
        }
	}
    return false;
}

Syn_MC_GmActr_Setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    const length = $dataActors.length;
    if(actorId <= 0 || actorId >= length || isNaN(actorId)){
        throw new Error(`Actor Id ${actorId} is invalid. It is either greater than the number of actors or less than or completely invalid. Please check database setup.`)
    }
    Syn_MC_GmActr_Setup.call(this, ...arguments);
}

Game_Actor.prototype.meetEvolutionRequirement = function(){
    const id = this._actorId;
    const config = Syn_MC.ACTOR_CONFIGURATIONS.find((config)=>{
        return eval(config['Actor']) == id;
    })
    if(config){
        try{
            const evolve_configuration = JsonEx.makeDeepCopy(config['Evolution Settings']);
            const evolve_switch = eval(evolve_configuration['Required Switch']);
            if(evolve_switch){
                if(!$gameSwitches(evolve_switch))return false;
            }
            const evolve_level = eval(evolve_configuration['Required Level']);
            if(isNaN(evolve_level))return false;
            if(this._level < evolve_level)return false;
            const equips = this._equips;
            const equip_weapons = evolve_configuration['Equip Weapons'];
            if(Array.isArray(equip_weapons)){
                for(let i = 0; i < equips.length; i++){
                    if(equip_weapons.length <= 0)break;
                    const data = equips[i];
                    const type = data._dataClass;
                    const id = data._itemId;
                    if(type == 'weapon'){
                        const index = equip_weapons.indexOf(id);
                        if(index >= 0){
                            equip_weapons.splice(index, 1);
                        }
                    }
                }
                if(equip_weapons.length > 0)return false;
            }
            const equip_armors = evolve_configuration['Equip Armors'];
            if(Array.isArray(equip_armors)){
                for(let i = 0; i < equips.length; i++){
                    if(equip_armors.length <= 0)break;
                    const data = equips[i];
                    const type = data._dataClass;
                    const id = data._itemId;
                    if(type == 'armor'){
                        const index = equip_armors.indexOf(id);
                        if(index >= 0){
                            equip_armors.splice(index, 1);
                        }
                    }
                }
                if(equip_armors.length > 0)return false;
            }
            const req_items = evolve_configuration['Items'];
            if(Array.isArray(req_items)){
                if(
                    req_items.some((iId)=>{
                        return !$gameParty.hasItem(eval(iId));
                    })
                )return false;
            }
            const gold = $gameParty.gold();
            const req_gold = eval(evolve_configuration['Gold']);
            if(gold < req_gold)return false;
            return !!$dataActors[eval(evolve_configuration['Evolution Actor'])];
        }catch(e){
            return false;
        }
    }
    return false
}

Game_Actor.prototype.evolve = function(force_actor){
    const id = this._actorId;
    const config = Syn_MC.ACTOR_CONFIGURATIONS.find((config)=>{
        return eval(config['Actor']) == id;
    })
    if(config){
        try{
            const evolve_configuration = JsonEx.makeDeepCopy(config['Evolution Settings']);
            const evolve_target = force_actor || eval(evolve_configuration['Evolution Actor']);
            if(!evolve_target || isNaN(evolve_target))return false;
            const equips = this._equips;
            const equip_weapons = evolve_configuration['Equip Weapons'];
            const consume_weapons = eval(evolve_configuration['Consume Weapons'])
            if(Array.isArray(equip_weapons) && consume_weapons){
                for(let i = 0; i < equips.length; i++){
                    if(equip_weapons.length <= 0)break;
                    const data = equips[i];
                    const type = data._dataClass;
                    const id = data._itemId;
                    if(type == 'weapon'){
                        const index = equip_weapons.indexOf(id);
                        if(index >= 0){
                            equip_weapons.splice(index, 1);
                            this._equips[i]._itemId = 0;
                        }
                    }
                }
                if(equip_weapons.length > 0)return false;
            }
            const equip_armors = evolve_configuration['Equip Armors'];
            if(Array.isArray(equip_armors)){
                for(let i = 0; i < equips.length; i++){
                    if(equip_armors.length <= 0)break;
                    const data = equips[i];
                    const type = data._dataClass;
                    const id = data._itemId;
                    if(type == 'armor'){
                        const index = equip_armors.indexOf(id);
                        if(index >= 0){
                            equip_armors.splice(index, 1);
                        }
                    }
                }
                if(equip_armors.length > 0)return false;
            }
            const req_items = evolve_configuration['Items'];
            if(Array.isArray(req_items)){
                if(
                    req_items.some((iId)=>{
                        return !$gameParty.hasItem(eval(iId));
                    })
                )return false;
            }
            const req_gold = eval(evolve_configuration['Gold']);
            if(req_gold > 0 && !isNaN(req_gold)){
                $gameParty.loseGold(req_gold)
            };
            const actor = $dataActors[evolve_target];
            this._actorId = evolve_target;
            this._name = actor.name;
            this._nickname = actor.nickname;
            this._profile = actor.profile;
            this._classId = actor.classId;
            if(eval(evolve_configuration['Reset Level'])){
                this._level = actor.initialLevel;
                this.initExp();
            }
            if(eval(evolve_configuration['Evolve Healing']))this.recoverAll();
            this.initImages();
            const ev_sw_id = eval(evolve_configuration['Required Switch']);
            if(ev_sw_id && eval(evolve_configuration['Reset Switch'])){
                $gameSwitches.setValue(ev_sw_id, false);
            }
            this.refresh();
            $gameParty.refresh();
            return true;
        }catch(e){
            return false;
        }
    }
}

Game_Actor.prototype.gainExpBreed = function(exp) {
    const newExp = this.currentExp() + Math.round(exp);
    if(newExp >= this.nextLevelExp() && this.isMaxLevel())return;
    this.changeExp(newExp, false);
}

Syn_MC_GmActr_BseParam = Game_Actor.prototype.paramBase;
Game_Actor.prototype.paramBase = function(){
    if(this._fuse_only_params)return 0;
    return Syn_MC_GmActr_BseParam.call(this, ...arguments);
}

Syn_MC_GmEnem_Init = Game_Enemy.prototype.initialize
Game_Enemy.prototype.initialize = function(enemyId, x, y) {
    Syn_MC_GmEnem_Init.call(this, ...arguments);
    this.setupActorEnemy();
    this.refresh();
}

Game_Enemy.prototype.setupActorEnemy = function(){
    const id = this._enemyId;
    const config = Syn_MC.ENEMY_CONFIGURATIONS.find((config)=>{
        return eval(config['Enemy']) == id
    })
    if(config){
        const actor_id = eval(config['Capture Actor'])
        if(actor_id > 0 && !isNaN(actor_id)){
            this._actor = new Game_Actor(actorId);
            this.setLevel();
            this.recoverAll();
        }else return false;
        this.recoverAll();
    }
}

Game_Enemy.prototype.setLevel = function(force_level, recover){
    const px = $gamePlayer.x;
    const py = $gamePlayer.y;
    const region = $gameMap.regionId(px,py);
    const map_id = $gameMap._mapId;
    const map_config = Syn_MC.MAP_CONFIGURATIONS.find((config)=>{
        return eval(config['Map']) == map_id;
    })
    if(!map_config){
        this._actor._level = force_level || $dataActors[this._actor._actorId].initialLevel;
        this._actor.initExp();
        this._actor.initSkills();
        this._level = this._actor._level;
        this._skills = this._actor._skills;
        this._classId = this._actor._classId;
        this._equips = this._actor._equips;
        if(recover)this.recoverAll();
        return;
    }
    let minLevel = eval(map_config['Minimal Enemy Level']) || 1;
    let maxLevel = eval(map_config['Maximum Enemy Level']) || 100;
    const region_settings = map_config['Region Settings'];
    const region_config = region_settings.find((config)=>{
        return eval(config['Region ID']) == region;
    })
    if(region_config){
        minLevel = eval(region_data['Minimal Enemy Level']) || 1;
        maxLevel = eval(region_data['Maximum Enemy Level']) || 100;
    }
    if(maxLevel < minLevel)throw new Error("Max level is set less than min level. Please check plugin / map settings.");
    const bandWidth = Math.abs(Math.floor(maxLevel - minLevel));
    if(minLevel + bandWidth > actorMaxLevel)throw new Error("Actor maximum level set too low with current settings.");
    this._actor._level = force_level ? force_level : Math.min($dataActors[this._actor._actorId].maxLevel, (minLevel + Math.randomInt(bandWidth)));
    this._actor.initExp();
    this._actor.initSkills();
    this._level = this._actor._level;
    this._skills = this._actor._skills;
    this._classId = this._actor._classId;
    this._equips = this._actor._equips;
    if(recover)this.recoverAll();
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

Syn_MC_GmEnem_BseParam = Game_Enemy.prototype.paramBase;
Game_Enemy.prototype.paramBase = function(paramId) {
    const id = this._enemyId;
    const config = Syn_MC.ENEMY_CONFIGURATIONS.find((config)=>{
        return eval(config['Enemy']) == id
    })
    if(config){
        const blockBaseParam = eval(config['Ignore Enemy Database']);
        const defParamBase = blockBaseParam ? 0 : Syn_MC_GmEnem_BseParam.call(this, ...arguments);
        const actorParamBase = this._actor ? this.currentClass().params[paramId][this._level] : 0;
        return defParamBase + actorParamBase;
    }else{
        Syn_MC_GmEnem_BseParam.call(this, ...arguments);
    }
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

Syn_MC_GmEnem_Trans = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function(enemyId) {
    Syn_MC_GmEnem_Trans.call(this, ...arguments);
    this.setupActorEnemy();
}

Game_Enemy.prototype.performSwap = function(){
    this.hide();
    $gameTroop.members()[this._swapId].appear();
    const animTarget = $gameTroop.members()[this._swapId];
    const anim = !isNaN(SynrecMC.Battle.SwapAnim) ? SynrecMC.Battle.SwapAnim : 4;
    if(MONSTER_CAPTURE_MV){
        this.startAnimation(anim);
    }else{
        $gameTemp.requestAnimation([animTarget], anim);
    }
}

Syn_MC_GmEnem_MkActns = Game_Enemy.prototype.makeActions;
Game_Enemy.prototype.makeActions = function() {
    if(this._actor){
        Game_Battler.prototype.makeActions.call(this);
        if(this.numActions() > 0){
            const skillList = this._skills;
            this.selectSkill(skillList);
        }
        this.setActionState("waiting");
    }else{
        Syn_MC_GmEnem_MkActns.call(this);
    }
}

Game_Enemy.prototype.selectSkill = function(list){
    const id = this._enemyId;
    const config = Syn_MC.ENEMY_CONFIGURATIONS.find((config)=>{
        return eval(config['Enemy']) == id
    })
    let skillActArr = [];
    const tpMaxSkill = eval(config['Ultimate Skill']);
    if(this.tp >= this.maxTp() && tpMaxSkill){
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
    const id = this._enemyId;
    const config = Syn_MC.ENEMY_CONFIGURATIONS.find((config)=>{
        return eval(config['Enemy']) == id
    })
    const enemyCritHpPerc = eval(config['Critical HP Rate']) || 0.3;
    const enemyCritMpPerc = eval(config['Critical MP Rate']) || 0.3;
    const enemyCritTpPerc = eval(config['Critical TP Rate']) || 0.7;
    const hpRatio = this.hpRate();
    const mpRatio = this.mpRate();
    const tpRatio = this.tpRate();
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

Syn_MC_GmPrty_Init = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    Syn_MC_GmPrty_Init.call(this);
    this.createReserveBoxes();
    this.initBreeder();
}

Game_Party.prototype.createReserveBoxes = function(){
    this._reserveBoxes = [];
    for(ib = 0; ib < Syn_MC.RESERVE_BOX_COUNT; ib++){
        this._reserveBoxes[ib] = {name:'Box ' + ib, box:[]};
        for(jb = 0; jb < Syn_MC.RESERVE_BOX_SIZE; jb++){
            this._reserveBoxes[ib]['box'][jb] = undefined;
        }
    }
}

Game_Party.prototype.initBreeder = function(){
    this._map_breeder = {};
    this._breederArray = [];
    // this._breederParent1 = undefined;
    // this._breederParent2 = undefined;
    // this._breederChild = undefined;
    // this._preBreedSteps = 0;
    // this._preBreedMaxSteps = SynrecMC.Breeder.MaxSteps;
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
        this._actors.push(actor);
    }
}

Game_Party.prototype.addCaptureActor = function(enemy, hp, mp){
    const actor = enemy._actor;
    if(!actor)return;
    hp = isNaN(hp) ? actor.hp : hp;
    mp = isNaN(mp) ? actor.mp : mp;
    actor.setHp(hp);
    actor.setMp(mp);
    actor.setTp(0);
    if(this._actors.length >= this.maxBattleMembers()){
        actor.onBattleEnd();
        this.addToReserve(actor);
    }else{
        actor.onBattleStart();
        this._actors.push(actor);
    }
    $gamePlayer.refresh();
    $gameMap.requestRefresh();
    if(Utils.RPGMAKER_NAME == 'MZ'){
        $gameTemp.requestBattleRefresh();
    }
    this.doAddActorExtra(actor);
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
    if(!MONSTER_CAPTURE_MV)$gameTemp.requestBattleRefresh();
    if(actor)this.doAddActorExtra(actor);
}

Game_Party.prototype.doAddActorExtra = function(actor){
    const id = actor._actorId;
    if(!SynrecMC.NO_RENAMES.includes(id))this.callRenameScene(actor);
}

Game_Party.prototype.callRenameScene = function(actor){
    const scene = Scene_Rename;
    const max_name_chars = SynrecMC.MaxNameChars;
    const sceneToBoot = {scene,prep:[actor, max_name_chars]};
    $gameTemp.reserveBootScene(sceneToBoot);
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
    if(!MONSTER_CAPTURE_MV)$gameTemp.requestBattleRefresh();
}

Game_Party.prototype.addBreed = function(data){
    const obj = {};
    obj['Result Actor'] = data['Result Actor'];
    obj['Step Progress'] = 0;
    obj['Step Complete'] = data['Max Steps'];
    obj['Fusion Params'] = data['Fusion Params'];
    this._breederArray.push(obj);
    this.progressBreed();
    this.progressPreBreed();
    $gameMap.updateHatch();
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
    const map_breeder = this._map_breeder;
    const map_ids = Object.keys(map_breeder);
    if(map_ids.length > 0){
        map_ids.forEach((id_key)=>{
            const map_id = eval(id_key);
            const map_config = Syn_MC.MAP_CONFIGURATIONS.find((config)=>{
                return eval(config['Map']) == map_id;
            })
            const data = this.grabValidData(map_id);
            if(data){
                const result_actor_id = eval(data['Result Actor']);
                const rngSteps = Math.randomInt(eval(data['Random Steps']));
                const reqSteps = eval(data['Required Steps']);
                const steps = Math.max(1, reqSteps - rngSteps);
                const breeder_obj = map_breeder[id_key];
                const steps_taken = breeder_obj['Steps'];
                if(steps_taken >= steps){
                    const obj = {};
                    obj['Result Actor'] = result_actor_id;
                    obj['Max Steps'] = steps;
                    const delete_parents = eval(data['Delete Parents']);
                    const percGlobal = ((data['Stat Transfer Global Value'] / 100) || 0)
                    const percAppHp = ((data['HP Transfer'] / 100) || 0) + percGlobal;
                    const percAppMp = ((data['MP Transfer'] / 100) || 0) + percGlobal;
                    const percAppAtk = ((data['ATK Transfer'] / 100) || 0) + percGlobal;
                    const percAppDef = ((data['DEF Transfer'] / 100) || 0) + percGlobal;
                    const percAppMat = ((data['MAT Transfer'] / 100) || 0) + percGlobal;
                    const percAppMdf = ((data['MDF Transfer'] / 100) || 0) + percGlobal;
                    const percAppAgi = ((data['AGI Transfer'] / 100) || 0) + percGlobal;
                    const percAppLuk = ((data['LUK Transfer'] / 100) || 0) + percGlobal;
                    const actor_1 = breeder_obj['Actor 1'];
                    const actor_2 = breeder_obj['Actor 2'];
                    if(data['Fuse Stats']){
                        const hp = ((actor_1.param(0) + actor_2.param(0)) / 2) * percAppHp;
                        const mp = ((actor_1.param(1) + actor_2.param(1)) / 2) * percAppMp;
                        const atk = ((actor_1.param(2) + actor_2.param(2)) / 2) * percAppAtk;
                        const def = ((actor_1.param(3) + actor_2.param(3)) / 2) * percAppDef;
                        const mat = ((actor_1.param(4) + actor_2.param(4)) / 2) * percAppMat;
                        const mdf = ((actor_1.param(5) + actor_2.param(5)) / 2) * percAppMdf;
                        const agi = ((actor_1.param(6) + actor_2.param(6)) / 2) * percAppAgi;
                        const luk = ((actor_1.param(7) + actor_2.param(7)) / 2) * percAppLuk;
                        obj['Fusion Params'] = [hp, mp, atk, def, mat, mdf, agi, luk];
                    }
                    obj['Fusion Params Only'] = eval(data['Fuse Stats Only']);
                    if(delete_parents){
                        breeder_obj['Actor 1'] = null;
                        breeder_obj['Actor 2'] = null;
                    }
                    breeder_obj['Child'] = obj;
                }else{
                    if(isNaN(breeder_obj['Steps'])){
                        breeder_obj['Steps'] = 0;
                        breeder_obj['Steps']++;
                    }else{
                        breeder_obj['Steps']++;
                    }
                }
            }
        })
    }
}

Game_Party.prototype.grantParentBreedEXP = function(){
    const map_breeder = this._map_breeder;
    const map_ids = Object.keys(map_breeder);
    if(map_ids.length > 0){
        map_ids.forEach((id_key)=>{
            const map_id = eval(id_key);
            const map_config = Syn_MC.MAP_CONFIGURATIONS.find((config)=>{
                return eval(config['Map']) == map_id;
            })
            const exp_growth = eval(map_config['Breeder EXP Growth']) || 0;
            const breeder_obj = map_breeder[id_key];
            if(breeder_obj){
                const actor_1 = breeder_obj['Actor 1'];
                if(actor_1){
                    actor_1.gainExpBreed(exp_growth);
                }
                const actor_2 = breeder_obj['Actor 2'];
                if(actor_2){
                    actor_2.gainExpBreed(exp_growth);
                }
            }
        })
    }
}

Game_Party.prototype.grabValidData = function(map_id){
    const combArr = Syn_MC.BREEDER_COMBINATIONS;
    const free_combines = combArr.filter((combination)=>{
        return (
            !combination['Actor 1 Required'] &&
            !combination['Actor 2 Required']
        )
    });
    const set_combines = combArr.filter((combination)=>{
        return (
            combination['Actor 1 Required'] &&
            combination['Actor 2 Required']
        )
    });
    const map_breeder = this._map_breeder;
    const breeder_obj = map_breeder[map_id];
    if(breeder_obj){
        const p1 = breeder_obj['Actor 1'];
        const p2 = breeder_obj['Actor 2'];
        if(p1 && p2){
            const p1_gender = p1.gender();
            const p2_gender = p2.gender();
            const combination = set_combines.find((combine)=>{
                const a1_data = combine['Actor 1 Required'];
                const p1_a1_match = (
                    p1._actorId == eval(a1_data['Actor']) &&
                    p1_gender == a1_data['Gender']
                )
                const p2_a1_match = (
                    p2._actorId == eval(a1_data['Actor']) &&
                    p2_gender == a1_data['Gender']
                )
                const a2_data = combine['Actor 2 Required'];
                const p1_a2_match = (
                    p1._actorId == eval(a2_data['Actor']) &&
                    p1_gender == a2_data['Gender']
                )
                const p2_a2_match = (
                    p2._actorId == eval(a2_data['Actor']) &&
                    p2_gender == a2_data['Gender']
                )
                return(
                    (
                        p1_a1_match &&
                        p2_a2_match
                    ) ||
                    (
                        p2_a1_match &&
                        p1_a2_match
                    )
                )
            })
            const random_index = Math.randomInt(free_combines.length);
            const free_combine = free_combines[random_index];
            return combination || free_combine
        }
    }
}

function SpriteMenu_CharacterMonster(){
    this.initialize(...arguments);
}

SpriteMenu_CharacterMonster.prototype = Object.create(Sprite_Character.prototype);
SpriteMenu_CharacterMonster.prototype.constructor = SpriteMenu_CharacterMonster;

SpriteMenu_CharacterMonster.prototype.update = function(){
    this.updateChara();
    Sprite_Character.prototype.update.call(this);
}

SpriteMenu_CharacterMonster.prototype.updateChara = function(){
    if(this._character){
        if(this._character.update){
            this._character.update();
        }
    }
}

function SpriteMenu_BattlerMonster(){
    this.initialize(...arguments);
}

SpriteMenu_BattlerMonster.prototype = Object.create(Sprite_Actor.prototype);
SpriteMenu_BattlerMonster.prototype.constructor = SpriteMenu_BattlerMonster;

SpriteMenu_BattlerMonster.prototype.updateMain = function() {
    this.updateBitmap();
    this.updateFrame();
    this.updateMove();
    this.updatePosition();
}

SpriteMenu_BattlerMonster.prototype.updateVisibility = function() {
    const isMV = Utils.RPGMAKER_NAME == 'MV';
    if(isMV){
        Sprite_Base.prototype.updateVisibility.call(this);
    }else{
        Sprite_Clickable.prototype.updateVisibility.call(this);
    }
    if (!this._battler) {
        this.visible = false;
    }
}

SpriteMenu_BattlerMonster.prototype.moveToStartPosition = function() {
    //No do move.
}

SpriteMenu_BattlerMonster.prototype.setActorHome = function(index) {
    //No do this.
}

SpriteMenu_BattlerMonster.prototype.setMotion = function(motion_name){
    this._setMotion = motion_name;
}

SpriteMenu_BattlerMonster.prototype.refreshMotion = function(){
    if(!this._setMotion)this._setMotion = 'walk';
    this.startMotion(this._setMotion);
}

Syn_MC_SprtBatt_SetBatt = Sprite_Battler.prototype.setBattler;
Sprite_Battler.prototype.setBattler = function(battler) {
    Syn_MC_SprtBatt_SetBatt.call(this, battler);
    if(battler)this.setGendHex(battler);
    if(battler)this.setGendFilter(battler);
}

Sprite_Battler.prototype.setGendHex = function(battler){
    if(battler.isActor() && this._mainSprite){
        const gender = battler._gender;
        if(gender){
            const color = this.getGenderConfiguration(gender);
            if(color){
                const value = color['Hex Color'];
                const alpha = color['Color Alpha'];
                const redVal = parseInt(`${value[1]}${value[2]}`, 16);
                const grnVal = parseInt(`${value[3]}${value[4]}`, 16);
                const bluVal = parseInt(`${value[5]}${value[6]}`, 16);
                const alphaVal = 255 * alpha;
                this._mainSprite._blendColorGend = [redVal, grnVal, bluVal, alphaVal];
                this._mainSprite._blendColor = this._blendColorGend;
                this._updateColorFilter();
            }
        }
    }else if(battler.isEnemy()){
        const gender = battler._gender;
        if(gender){
            const color = this.getGenderConfiguration(gender);
            if(color){
                const value = color['Hex Color'];
                const alpha = color['Color Alpha'];
                const redVal = parseInt(`${value[1]}${value[2]}`, 16);
                const grnVal = parseInt(`${value[3]}${value[4]}`, 16);
                const bluVal = parseInt(`${value[5]}${value[6]}`, 16);
                const alphaVal = 255 * alpha;
                this._blendColorGend = [redVal, grnVal, bluVal, alphaVal];
                this._blendColor = this._blendColorGend;
                this._updateColorFilter();
            }
        }
    }
}

Sprite_Battler.prototype.setGendFilter = function(battler){
    if(battler.isActor() && this._mainSprite){
        if(this._mainSprite.filters){
            if(this._mainSprite.filters.length > 1){
                this._mainSprite.filters = [];
            }
        }else this._mainSprite.filters = [];
        const gender = battler._gender;
        if(gender){
            const filters = this.getGenderConfiguration(gender);
            if(!filters)return;
            const applyFilters = filters['Apply Filter'];
            const blurStr = filters['Blur Strength'];
            const blurQty = filters['Blur Quality'];
            const noiseInt = filters['Noise Intensity'];
            const noiseSed = filters['Noise Seed'];
            if(applyFilters){
                for(filt = 0; filt < applyFilters.length; filt++){
                    var filterSelc = applyFilters[filt];
                    switch(filterSelc){
                        case 'blur':
                            this._mainSprite.filters.push(new PIXI.filters.BlurFilter(blurStr, blurQty));
                            break;
                        case 'noise':
                            this._mainSprite.filters.push(new PIXI.filters.NoiseFilter(noiseInt, noiseSed));
                            break;
                        case 'color':
                            this._mainSprite.filters.push(new PIXI.filters.ColorMatrixFilter());
                            var index = this.filters.length - 1;
                            this.applyColorMatrixMethod(index, filters);
                    }
                }
            }else{
                this._mainSprite.filters = [];
            }
        }
    }else if(battler.isEnemy()){
        if(this.filters){
            if(this.filters.length > 1){
                this.filters = [this.filters[0]];
            }
        }
        const gender = battler._gender;
        if(gender){
            const filters = this.getGenderConfiguration(gender);
            const applyFilters = filters['Apply Filter'];
            const blurStr = filters['Blur Strength'];
            const blurQty = filters['Blur Quality'];
            const noiseInt = filters['Noise Intensity'];
            const noiseSed = filters['Noise Seed'];
            if(applyFilters){
                for(filt = 0; filt < applyFilters.length; filt++){
                    var filterSelc = applyFilters[filt];
                    switch(filterSelc){
                        case 'blur':
                            this.filters.push(new PIXI.filters.BlurFilter(blurStr, blurQty));
                            break;
                        case 'noise':
                            this.filters.push(new PIXI.filters.NoiseFilter(noiseInt, noiseSed));
                            break;
                        case 'color':
                            this.filters.push(new PIXI.filters.ColorMatrixFilter());
                            var index = this.filters.length - 1;
                            this.applyColorMatrixMethod(index, filters);
                    }
                }
            }else{
                this.filters = [this.filters[0]];
            }
        }
    }
}

Sprite_Battler.prototype.applyColorMatrixMethod = function(index, filterData){
    let filter =this._battler.isActor() ? this._mainSprite.filters[index] : this.filters[index];
    const method = filterData['Color Method'];
    switch(method){
        case 'BlackAndWhite':
            filter.blackAndWhite();
            break;
        case 'Brightness':
            filter.brightness(filterData['Color Brightness']);
            break;
        case 'Contrast':
            filter.contrast(filterData['Color Contrast']);
            break;
        case 'Hue':
            filter.hue(filterData['Color Hue']);
            break;
        case 'LSD':
            filter.lsd();
            break;
        case 'Negative':
            filter.negative();
            break;
        case 'Night':
            filter.night(filterData['Color Night']);
            break;
        case 'Predator':
            filter.predator(filterData['Color Predator']);
            break;
        case 'Saturate':
            filter.predator(filterData['Color Saturate']);
            break;
        case 'Sepia':
            filter.sepia();
            break;
        case 'Tint':
            filter.sepia(filterData['Color Tint']);
            break;
        case 'ToBGR':
            filter.toBGR();
            break;
    }
    filter.alpha = !isNaN(filterData['Method Alpha']) ? eval(filterData['Method Alpha']) : 1;
}

Sprite_Battler.prototype.getGenderConfiguration = function(gender){
    const configs = Syn_MC.GENDER_CONFIGURATIONS;
    return configs.find((config)=>{
        const name = config['Gender Name'];
        return name == gender;
    })
}

Syn_MC_SprtBatt_UpdtSelcEfct = Sprite_Battler.prototype.updateSelectionEffect;
Sprite_Battler.prototype.updateSelectionEffect = function() {
    Syn_MC_SprtBatt_UpdtSelcEfct.call(this)
    const target = this.mainSprite ? this.mainSprite() : this;
    if(this._blendColorGend){
        if (this._battler.isSelected()) {
            this._selectionEffectCount++;
            if (this._selectionEffectCount % 30 < 15) {
                target.setBlendColor([255, 255, 255, 255]);
            } else {
                target.setBlendColor(this._blendColorGend);
            }
        } else if (this._selectionEffectCount > 0) {
            this._selectionEffectCount = 0;
            target.setBlendColor(this._blendColorGend);
        }
        this._updateColorFilter();
    }
}

Syn_MC_SprtEnem_RvrtNrm = Sprite_Enemy.prototype.revertToNormal;
Sprite_Enemy.prototype.revertToNormal = function() {
    Syn_MC_SprtEnem_RvrtNrm.call(this);
    if(this._blendColorGend){
        this.setBlendColor(this._blendColorGend);
        this._updateColorFilter();
    }
}

Syn_MC_SprtsetBatt_Updt = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    Syn_MC_SprtsetBatt_Updt.call(this);
    this.updateEnemySort();
    this.updateActorSort();
}

Spriteset_Battle.prototype.updateEnemySort = function(){
    this._enemySprites.sort(this.compareSprites.bind(this, true))
    this._enemySprites.forEach((enemy)=>{
        if(!enemy._battler)enemy._movementDuration = 0;
    })
}

Spriteset_Battle.prototype.updateActorSort = function(){
    this._actorSprites.sort(this.compareSprites.bind(this, false))
    this._actorSprites.forEach((actor)=>{
        if(!actor._battler)actor._movementDuration = 0;
    })
}
Syn_MC_WinSklList_DrwSklCost = Window_SkillList.prototype.drawSkillCost;
Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
    const actor = this._actor;
    const skill_id = skill.id;
    const power_skill_data = actor.powerSkills(skill_id)[skill_id];
    if (power_skill_data) {
        const pp = power_skill_data['PP'];
        const max_pp = power_skill_data['Max PP'];
        if(pp > 0){
            this.changeTextColor(`#aaffaa`);
        }else if(pp == 1 && pp != max_pp){
            this.changeTextColor(`#ffffaa`);
        }else if(pp == 0){
            this.changeTextColor(`#ffaaaa`);
        }
        this.drawText(`${pp}/${max_pp}`, x, y, width, "right");
    } else{
        Syn_MC_WinSklList_DrwSklCost.call(this, ...arguments);
    }
}

function WindowMC_GameData(){
    this.initialize(...arguments);
}

WindowMC_GameData.prototype = Object.create(Window_Base.prototype);
WindowMC_GameData.prototype.constructor = WindowMC_GameData;

WindowMC_GameData.prototype.initialize = function(data){
    const mz_mode = Utils.RPGMAKER_NAME == "MZ";
    const rect = this.createRect(data);
    this._window_data = data;
    this._style_data = data['Window Font and Style Configuration'];
    if(mz_mode){
        Window_Base.prototype.initialize.call(this, rect);
    }else{
        const x = rect.x;
        const y = rect.y;
        const w = rect.width;
        const h = rect.height;
        Window_Base.prototype.initialize.call(this,x,y,w,h);
    }
    this.setOpacityAndDimmer();
    this.createCharacterSprite();
}

WindowMC_GameData.prototype.createCharacterSprite = function(){
    const chara = $gamePlayer;
    const sprite = new SpriteMenu_CharacterMonster(chara);
    sprite.visible = false;
    this.addChild(sprite);
    this._chara = chara;
    this._character_sprite = sprite;
}

WindowMC_GameData.prototype.createRect = function(data){
    const dimension_config = data['Dimension Configuration'];
    const x = dimension_config['X'];
    const y = dimension_config['Y'];
    const w = dimension_config['Width'];
    const h = dimension_config['Height'];
    return new Rectangle(x,y,w,h);
}

WindowMC_GameData.prototype.standardPadding = function() {
    return 8;
}

WindowMC_GameData.prototype.loadWindowskin = function(){
    const base = Window_Base.prototype.loadWindowskin.call(this);
    const custom_config = this._style_data;
    if(!custom_config)return base;
    const skin_name = custom_config['Window Skin'];
    if(!skin_name)return base;
    this.windowskin = ImageManager.loadSystem(skin_name);
}

WindowMC_GameData.prototype.resetFontSettings = function() {
    const base = Window_Base.prototype.resetFontSettings;
    const custom_config = this._style_data;
    if(!custom_config)return base.call(this);
    const font_face = custom_config['Font Face'] || "sans-serif";
    const font_size = custom_config['Font Size'] || 16;
    const font_outline_size = custom_config['Font Outline Thickness'] || 3;
    this.contents.fontFace = font_face;
    this.contents.fontSize = font_size;
    this.contents.outlineWidth = font_outline_size;
    this.resetTextColor();
}

WindowMC_GameData.prototype.resetTextColor = function() {
    const base = Window_Base.prototype.resetTextColor;
    const custom_config = this._style_data;
    if(!custom_config)return base.call(this);
    const text_color = custom_config['Base Font Color'] || "#ffffff";
    const outline_color = custom_config['Font Outline Color'] || "rgba(0, 0, 0, 0.5)";
    this.changeTextColor(text_color);
    this.contents.outlineColor = outline_color;
}

WindowMC_GameData.prototype.setOpacityAndDimmer = function(){
    const custom_config = this._style_data;
    if(!custom_config)return;
    const show_dimmer = custom_config['Show Window Dimmer'] || false;
    const win_opacity = custom_config['Window Opacity'] || 0;
    this.opacity = win_opacity;
    show_dimmer ? this.showBackgroundDimmer() : this.hideBackgroundDimmer();
}

WindowMC_GameData.prototype.update = function(){
    Window_Base.prototype.update.call(this);
    this.updateDisplay();
}

WindowMC_GameData.prototype.updateDisplay = function(){
    const window_data = this._window_data;
    const sw_id = eval(window_data['Display Switch']);
    if(!sw_id){
        this.hide();
    }
    const sw_on = $gameSwitches.value(sw_id);
    if(sw_on){
        this.show();
    }else{
        this.hide();
    }
}

WindowMC_GameData.prototype.drawData = function(){
    this.drawGraphic();
    this.drawGauges();
    this.drawPlayerName();
    this.drawPlayerFace();
    this.drawPlayerFrontGraphic();
    this.drawPlayerBackGraphic();
    this.drawPlayTime();
    this.drawSaveCount();
    this.drawCaptureCount();
    this.displayMapCharacter();
}

WindowMC_GameData.prototype.drawGraphic = function(){
    const window = this;
    const window_data = this._window_data;
    const gauges = window_data['Gauges'];
    gauges.forEach((config)=>{
        const label = config['Label'];
        const lx = eval(config['Label X']);
        const ly = eval(config['Label Y']);
        window.drawTextEx(label, lx, ly);
        const cur_val = eval(config['Gauge Current Value']) || 0;
        const max_val = eval(config['Gauge Max Value']) || 1;
        const ratio = Math.max(0, Math.min(1, cur_val / max_val));
        const gx = eval(config['Gauge X']);
        const gy = eval(config['Gauge Y']);
        const gw = eval(config['Gauge Width']);
        const gh = eval(config['Gauge Height']);
        const gb = eval(config['Gauge Border']);
        const border_color = config['Gauge Border Color'];
        const background_color = config['Gauge Background Color'];
        const fill_color = config['Gauge Color'];
        window.contents.fillRect(gx,gy,gw,gh,border_color);
        window.contents.fillRect(gx + gb, gy + gb, gw - (gb * 2), gh - (gb * 2), background_color);
        window.contents.fillRect(gx + gb, gy + gb, (gw - (gb * 2)) * ratio, gh - (gb * 2), fill_color);
    })
}

WindowMC_GameData.prototype.drawGauges = function(){
    const window = this;
    const player = $gamePlayer;
    const window_data = this._window_data;
    const gauges = window_data['Gauges'];
    gauges.forEach((config)=>{
        const label = config['Label'];
        const lx = eval(config['Label X']);
        const ly = eval(config['Label Y']);
        window.drawTextEx(label, lx, ly);
        const cur_val = eval(config['Gauge Current Value']) || 0;
        const max_val = eval(config['Gauge Max Value']) || 1;
        const ratio = Math.max(0, Math.min(1, cur_val / max_val));
        const gx = eval(config['Gauge X']);
        const gy = eval(config['Gauge Y']);
        const gw = eval(config['Gauge Width']);
        const gh = eval(config['Gauge Height']);
        const gb = eval(config['Gauge Border']);
        const border_color = config['Gauge Border Color'];
        const background_color = config['Gauge Background Color'];
        const fill_color = config['Gauge Color'];
        window.contents.fillRect(gx,gy,gw,gh,border_color);
        window.contents.fillRect(gx + gb, gy + gb, gw - (gb * 2), gh - (gb * 2), background_color);
        window.contents.fillRect(gx + gb, gy + gb, (gw - (gb * 2)) * ratio, gh - (gb * 2), fill_color);
    })
}

WindowMC_GameData.prototype.drawPlayerName = function(){
    const window_data = this._window_data;
}

WindowMC_GameData.prototype.drawPlayerFace = function(){
    const custom_data = $gamePlayer._custom_data;
    const window_data = this._window_data;
}

WindowMC_GameData.prototype.drawPlayerFrontGraphic = function(){
    const custom_data = $gamePlayer._custom_data;
    const window_data = this._window_data;
}

WindowMC_GameData.prototype.drawPlayerBackGraphic = function(){
    const custom_data = $gamePlayer._custom_data;
    const window_data = this._window_data;
}

WindowMC_GameData.prototype.drawPlayTime = function(){
    const window_data = this._window_data;
}

WindowMC_GameData.prototype.drawSaveCount = function(){
    const window_data = this._window_data;
}

WindowMC_GameData.prototype.drawCaptureCount = function(){
    const window_data = this._window_data;
}

WindowMC_GameData.prototype.displayMapCharacter = function(){
    const window_data = this._window_data;
    if(!eval(window_data['Display Map Character'])){
        this._character_sprite.visible = false;
        return;
    }else{
        this._chara.setDirection(eval(window_data['Character Direction']) || 2);
        this._chara._screenX = eval(window_data['Character X']) || 0;
        this._chara._screenY = eval(window_data['Character Y']) || 0;
        this._character_sprite.scale.x = eval(window_data['Character Scale X']) || 0;
        this._character_sprite.scale.y = eval(window_data['Character Scale Y']) || 0;
        this._character_sprite.visible = true;
    }
}

function WindowMC_ActorData(){
    this.initialize(...arguments);
}

WindowMC_ActorData.prototype = Object.create(Window_Base.prototype);
WindowMC_ActorData.prototype.constructor = WindowMC_ActorData;

WindowMC_ActorData.prototype.initialize = function(data){
    const mz_mode = Utils.RPGMAKER_NAME == "MZ";
    const rect = this.createRect(data);
    this._window_data = data;
    this._style_data = data['Window Font and Style Configuration'];
    if(mz_mode){
        Window_Base.prototype.initialize.call(this, rect);
    }else{
        const x = rect.x;
        const y = rect.y;
        const w = rect.width;
        const h = rect.height;
        Window_Base.prototype.initialize.call(this,x,y,w,h);
    }
    this.setOpacityAndDimmer();
    this.createCharacterSprite();
    this.createBattlerSprite();
}

WindowMC_ActorData.prototype.createCharacterSprite = function(){
    const chara = new Game_MonsterCharacter();
    const sprite = new SpriteMenu_CharacterMonster(chara);
    sprite.visible = false;
    this.addChild(sprite);
    this._chara = chara;
    this._character_sprite = sprite;
}

WindowMC_ActorData.prototype.createBattlerSprite = function(){
    const sprite = new SpriteMenu_BattlerMonster();
    sprite.visible = false;
    this.addChild(sprite);
    this._battler_sprite = sprite;
}

WindowMC_ActorData.prototype.createRect = function(data){
    const dimension_config = data['Dimension Configuration'];
    const x = dimension_config['X'];
    const y = dimension_config['Y'];
    const w = dimension_config['Width'];
    const h = dimension_config['Height'];
    return new Rectangle(x,y,w,h);
}

WindowMC_ActorData.prototype.standardPadding = function() {
    return 8;
}

WindowMC_ActorData.prototype.loadWindowskin = function(){
    const base = Window_Base.prototype.loadWindowskin.call(this);
    const custom_config = this._style_data;
    if(!custom_config)return base;
    const skin_name = custom_config['Window Skin'];
    if(!skin_name)return base;
    this.windowskin = ImageManager.loadSystem(skin_name);
}

WindowMC_ActorData.prototype.resetFontSettings = function() {
    const base = Window_Base.prototype.resetFontSettings;
    const custom_config = this._style_data;
    if(!custom_config)return base.call(this);
    const font_face = custom_config['Font Face'] || "sans-serif";
    const font_size = custom_config['Font Size'] || 16;
    const font_outline_size = custom_config['Font Outline Thickness'] || 3;
    this.contents.fontFace = font_face;
    this.contents.fontSize = font_size;
    this.contents.outlineWidth = font_outline_size;
    this.resetTextColor();
}

WindowMC_ActorData.prototype.resetTextColor = function() {
    const base = Window_Base.prototype.resetTextColor;
    const custom_config = this._style_data;
    if(!custom_config)return base.call(this);
    const text_color = custom_config['Base Font Color'] || "#ffffff";
    const outline_color = custom_config['Font Outline Color'] || "rgba(0, 0, 0, 0.5)";
    this.changeTextColor(text_color);
    this.contents.outlineColor = outline_color;
}

WindowMC_ActorData.prototype.setOpacityAndDimmer = function(){
    const custom_config = this._style_data;
    if(!custom_config)return;
    const show_dimmer = custom_config['Show Window Dimmer'] || false;
    const win_opacity = custom_config['Window Opacity'] || 0;
    this.opacity = win_opacity;
    show_dimmer ? this.showBackgroundDimmer() : this.hideBackgroundDimmer();
}

WindowMC_ActorData.prototype.update = function(){
    Window_Base.prototype.update.call(this);
    this.updateActor();
}

WindowMC_ActorData.prototype.updateActor = function(){
    if(this._actor){
        const window_data = this._window_data;
    }
}

WindowMC_ActorData.prototype.setActor = function(actor){
    this.contents.clear();
    this._actor = actor;
    if(actor){
        this.drawData();
    }else{
        this.hide();
    }
}

WindowMC_ActorData.prototype.drawData = function(){
    this.drawGauges();
    this.drawName();
    this.drawProfile();
    this.drawClassLevel();
    this.drawResHP();
    this.drawResMP();
    this.drawResTP();
    this.drawBaseParams();
    this.drawExParams();
    this.drawSpParams();
    this.displayMapCharacter();
    this.displayBattler();
}

WindowMC_ActorData.prototype.drawGauges = function(){
    const window = this;
    const actor = this._actor;
    const window_data = this._window_data;
    const gauges = window_data['Gauges'];
    gauges.forEach((config)=>{
        const label = config['Label'];
        const lx = eval(config['Label X']);
        const ly = eval(config['Label Y']);
        window.drawTextEx(label, lx, ly);
        const cur_val = eval(config['Gauge Current Value']) || 0;
        const max_val = eval(config['Gauge Max Value']) || 1;
        const ratio = Math.max(0, Math.min(1, cur_val / max_val));
        const gx = eval(config['Gauge X']);
        const gy = eval(config['Gauge Y']);
        const gw = eval(config['Gauge Width']);
        const gh = eval(config['Gauge Height']);
        const gb = eval(config['Gauge Border']);
        const border_color = config['Gauge Border Color'];
        const background_color = config['Gauge Background Color'];
        const fill_color = config['Gauge Color'];
        window.contents.fillRect(gx,gy,gw,gh,border_color);
        window.contents.fillRect(gx + gb, gy + gb, gw - (gb * 2), gh - (gb * 2), background_color);
        window.contents.fillRect(gx + gb, gy + gb, (gw - (gb * 2)) * ratio, gh - (gb * 2), fill_color);
    })
}

WindowMC_ActorData.prototype.drawName = function(){
    const actor = this._actor;
    const window_data = this._window_data;
    if(!eval(window_data['Draw Actor Name']))return;
    const name = actor.name();
    const nickname = actor.nickname();
    const text = (window_data['Name Text'] || "").format(name, nickname);
    const tx = eval(window_data['Name X']) || 0;
    const ty = eval(window_data['Name Y']) || 0;
    this.drawTextEx(text, tx, ty);
}

WindowMC_ActorData.prototype.drawProfile = function(){
    const actor = this._actor;
    const window_data = this._window_data;
    if(!eval(window_data['Draw Actor Profile']))return;
    const text = actor.profile();
    const tx = eval(window_data['Profile X']) || 0;
    const ty = eval(window_data['Profile Y']) || 0;
    this.drawTextEx(text, tx, ty);
}

WindowMC_ActorData.prototype.drawClassLevel = function(){
    const actor = this._actor;
    const window_data = this._window_data;
    if(!eval(window_data['Draw Class Level']))return;
    const class_id = actor._classId;
    const class_data = $dataClasses[class_id] || {};
    const class_name = class_data ? class_data.name : "";
    const level = actor.level;
    const text = (window_data['Class Level Text'] || "").format(class_name, level);
    const tx = eval(window_data['Class Level X']) || 0;
    const ty = eval(window_data['Class Level Y']) || 0;
    this.drawTextEx(text, tx, ty);
}

WindowMC_ActorData.prototype.drawResHP = function(){
    const actor = this._actor;
    const window_data = this._window_data;
    if(!eval(window_data['Draw HP Resource']))return;
    const cur = actor.hp;
    const max = actor.mhp;
    const text = (window_data['HP Text'] || "").format(cur, max);
    const tx = eval(window_data['HP X']) || 0;
    const ty = eval(window_data['HP Y']) || 0;
    this.drawTextEx(text, tx, ty);
}

WindowMC_ActorData.prototype.drawResMP = function(){
    const actor = this._actor;
    const window_data = this._window_data;
    if(!eval(window_data['Draw MP Resource']))return;
    const cur = actor.mp;
    const max = actor.mmp;
    const text = (window_data['MP Text'] || "").format(cur, max);
    const tx = eval(window_data['MP X']) || 0;
    const ty = eval(window_data['MP Y']) || 0;
    this.drawTextEx(text, tx, ty);
}

WindowMC_ActorData.prototype.drawResTP = function(){
    const actor = this._actor;
    const window_data = this._window_data;
    if(!eval(window_data['Draw TP Resource']))return;
    const cur = actor.tp;
    const max = actor.maxTp();
    const text = (window_data['TP Text'] || "").format(cur, max);
    const tx = eval(window_data['TP X']) || 0;
    const ty = eval(window_data['TP Y']) || 0;
    this.drawTextEx(text, tx, ty);
}

WindowMC_ActorData.prototype.drawBaseParams = function(){
    const window = this;
    const actor = this._actor;
    const window_data = this._window_data;
    const draw_params = window_data['Draw Base Params'] || [];
    draw_params.forEach((param_draw)=>{
        const param_id = eval(param_draw['Base Param']);
        const param_value = actor.param(param_id) || 0;
        const text = (param_draw['Param Text'] || "").format(param_value);
        const tx = eval(param_draw['X']) || 0;
        const ty = eval(param_draw['Y']) || 0;
        window.drawTextEx(text, tx, ty);
    })
}

WindowMC_ActorData.prototype.drawExParams = function(){
    const window = this;
    const actor = this._actor;
    const window_data = this._window_data;
    const draw_params = window_data['Draw Ex Params'] || [];
    draw_params.forEach((param_draw)=>{
        const param_id = eval(param_draw['Ex Param']);
        const param_value = (actor.xparam(param_id) || 0) * 100;
        const text = (param_draw['Param Text'] || "").format(param_value);
        const tx = eval(param_draw['X']) || 0;
        const ty = eval(param_draw['Y']) || 0;
        window.drawTextEx(text, tx, ty);
    })
}

WindowMC_ActorData.prototype.drawSpParams = function(){
    const window = this;
    const actor = this._actor;
    const window_data = this._window_data;
    const draw_params = window_data['Draw Sp Params'] || [];
    draw_params.forEach((param_draw)=>{
        const param_id = eval(param_draw['Ex Param']);
        const param_value = (actor.sparam(param_id) || 0) * 100;
        const text = (param_draw['Param Text'] || "").format(param_value);
        const tx = eval(param_draw['X']) || 0;
        const ty = eval(param_draw['Y']) || 0;
        window.drawTextEx(text, tx, ty);
    })
}

WindowMC_ActorData.prototype.displayMapCharacter = function(){
    const actor = this._actor;
    const window_data = this._window_data;
    if(!eval(window_data['Display Map Character'])){
        this._character_sprite.visible = false;
        return;
    }else{
        const char_name = actor.characterName();
        const char_indx = actor.characterIndex();
        this._chara.setImage(char_name, char_indx);
        this._chara.setDirection(eval(window_data['Character Direction']) || 2);
        this._chara._screenX = eval(window_data['Character X']) || 0;
        this._chara._screenY = eval(window_data['Character Y']) || 0;
        this._character_sprite.scale.x = eval(window_data['Character Scale X']) || 0;
        this._character_sprite.scale.y = eval(window_data['Character Scale Y']) || 0;
        this._character_sprite.visible = true;
    }
}

WindowMC_ActorData.prototype.displayBattler = function(){
    const actor = this._actor;
    const window_data = this._window_data;
    if(!eval(window_data['Display Battler'])){
        this._battler_sprite.visible = false;
        return;
    }else{
        const hx = eval(window_data['Battler X']);
        const hy = eval(window_data['Battler y']);
        this._battler_sprite.setHome(hx, hy);
        this._battler_sprite.setBattler(actor);
        this._battler_sprite.scale.x = eval(window_data['Battler Scale X']);
        this._battler_sprite.scale.y = eval(window_data['Battler Scale Y']);
        this._battler_sprite.visible = true;
    }
}

Syn_MC_ScnMap_Updt = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    Syn_MC_ScnMap_Updt.call(this);
    this.updateRsvpScenes();
}

Scene_Map.prototype.updateRsvpScenes = function(){
    $gameTemp.updateReserveScene();
}

Syn_MC_ScnGmOver_Updt = Scene_Gameover.prototype.update;
Scene_Gameover.prototype.update = function() {
    if (this.isActive() && !this.isBusy() && this.isTriggered()) {
        const gameover_config = Syn_MC.GAMEOVER_CONFIGURATION;
        if(!gameover_config){
            return Syn_MC_ScnGmOver_Updt.call(this, ...arguments);
        }
        const req_item_id = eval(gameover_config['Required Item']) || 0;
        const map_id = eval(gameover_config['Gameover Map']);
        if(req_item_id > 0 && !isNaN(req_item_id)){
            const item = $dataItems[req_item_id];
            if($gameParty.hasItem(item)){
                $gameParty.gainItem(item, -1);
            }else{
                return Syn_MC_ScnGmOver_Updt.call(this, ...arguments);
            }
        }
        if(map_id){
            this.processPenalty(gameover_config);
            const map_x = eval(gameover_config['Map X']);
            const map_y = eval(gameover_config['Map Y']);
            const dir = eval(gameover_config['Direction']);
            $gameParty._actors.forEach(actor => actor.recoverAll());
            $gamePlayer.reserveTransfer(map_id, map_x, map_y, dir, 0);
        }else Syn_MC_ScnGmOver_Updt.call(this, ...arguments);
    }
    Syn_MC_ScnGmOver_Updt.call(this, ...arguments);
}

Scene_Gameover.prototype.processPenalty = function(gameover_config){
    const gold_penalty = eval(gameover_config['Gold Penalty']) || 0;
    $gameParty.loseGold(gold_penalty);
    const exp_rate = eval(gameover_config['EXP Penalty']) || 0;
    $gameParty._actors.forEach((actor)=>{
        const exp_required = actor.nextRequiredExp();
        const exp_penalty = exp_required * exp_rate;
        actor.changeExp(-exp_penalty, true);
    });
    const event = eval(gameover_config['Event']) || 0;
    if(event)$gameTemp.reserveCommonEvent(event);
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
    if(Utils.RPGMAKER_NAME == 'MZ'){
        this.createButtons();
    }
    this.createEditWindow();
    this.createInputWindow();
}