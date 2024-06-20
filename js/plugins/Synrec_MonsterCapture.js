/*:
 * @author Synrec/Kylestclr
 * @plugindesc v1.0.0 Allows for creation of a capture system in RPG Maker.
 * @target MZ
 * @help
 * 
 * Plugin has been remade from the base monster capture plugins set.
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
 * @param Beastiary UI Configuration
 * @desc Configure UI settings for battle
 * @type struct<beastiaryUI>
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
 */
/*~struct~captureSettings:
 * 
 * @param HP Bonus
 * @desc Applies bonus to capture rate based on HP rate.
 * @type text
 * @default 0
 * 
 * @param MP Bonus
 * @desc Applies bonus to capture rate based on HP rate.
 * @type text
 * @default 0
 * 
 * @param TP Bonus
 * @desc Applies bonus to capture rate based on HP rate.
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
 * @param Capture Actor
 * @desc The actor that would be captured.
 * Capture actor MUST be configured.
 * @type actor
 * @default 0
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
 * @param Apply Capture Rate
 * @desc Allows this skill to be used for capture.
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
 * @param Apply Capture Rate
 * @desc Allows this item to be used for capture.
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
Syn_MC.Plugin = PluginManager.Parameters(`Synrec_MonsterCapture`);

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

function ENEMY_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
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

function GAME_DATA_WINDOW_PARSER_MONSTERCAPTURE(obj){
    try{
        obj = JSON.parse(obj);
        obj['Dimension Configuration'] = DIMENSION_CONFIGURATION_PARSER_MONSTERCAPTURE(obj['Dimension Configuration']);
        obj['Window Font and Style Configuration'] = WINDOW_STYLE_PARSER_MONSTERCAPTURE(obj['Window Font and Style Configuration']);
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

function WindowMC_GameData(){
    this.initialize(...arguments);
}

function WindowMC_ActorData(){
    this.initialize(...arguments);
}