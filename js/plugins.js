// Generated by RPG Maker.
// Do not edit this file directly.
var $plugins =
[
{"name":"Synrec_MC_Core","status":true,"description":"v3.1 Monster Capture for RPG Maker MZ","parameters":{"Gameplay":"","Lock Initial Actor":"false","Follower Limit":"0","Base Item Capture":"100","Genders":"[\"{\\\"Gender Name\\\":\\\"Garbage\\\",\\\"Gender Icon\\\":\\\"4\\\",\\\"Ex Param Mod\\\":\\\"\\\",\\\"Hit Rate\\\":\\\"0\\\",\\\"Evasion Rate\\\":\\\"0\\\",\\\"Critical Rate\\\":\\\"0\\\",\\\"Critical Evasion\\\":\\\"0\\\",\\\"Magic Evasion\\\":\\\"0\\\",\\\"Magic Reflection\\\":\\\"0\\\",\\\"Counter Attack\\\":\\\"0\\\",\\\"HP Regen\\\":\\\"0\\\",\\\"MP Regen\\\":\\\"0\\\",\\\"TP Regen\\\":\\\"0\\\",\\\"Sp Param Mod\\\":\\\"\\\",\\\"Target Rate\\\":\\\"1\\\",\\\"Guard Effect\\\":\\\"1\\\",\\\"Recovery Effect\\\":\\\"1\\\",\\\"Pharmacology\\\":\\\"1\\\",\\\"MP Cost Rate\\\":\\\"1\\\",\\\"TP Charge Rate\\\":\\\"1\\\",\\\"Physical Damage\\\":\\\"1\\\",\\\"Magical Damage\\\":\\\"1\\\",\\\"Floor Damage\\\":\\\"1\\\",\\\"Experience\\\":\\\"1\\\"}\",\"{\\\"Gender Name\\\":\\\"Cure\\\",\\\"Gender Icon\\\":\\\"6\\\",\\\"Ex Param Mod\\\":\\\"\\\",\\\"Hit Rate\\\":\\\"0\\\",\\\"Evasion Rate\\\":\\\"0\\\",\\\"Critical Rate\\\":\\\"0\\\",\\\"Critical Evasion\\\":\\\"0\\\",\\\"Magic Evasion\\\":\\\"0\\\",\\\"Magic Reflection\\\":\\\"0\\\",\\\"Counter Attack\\\":\\\"0\\\",\\\"HP Regen\\\":\\\"0\\\",\\\"MP Regen\\\":\\\"0\\\",\\\"TP Regen\\\":\\\"0\\\",\\\"Sp Param Mod\\\":\\\"\\\",\\\"Target Rate\\\":\\\"1\\\",\\\"Guard Effect\\\":\\\"1\\\",\\\"Recovery Effect\\\":\\\"1\\\",\\\"Pharmacology\\\":\\\"1\\\",\\\"MP Cost Rate\\\":\\\"1\\\",\\\"TP Charge Rate\\\":\\\"1\\\",\\\"Physical Damage\\\":\\\"1\\\",\\\"Magical Damage\\\":\\\"1\\\",\\\"Floor Damage\\\":\\\"1\\\",\\\"Experience\\\":\\\"1\\\"}\"]","Capture Success Animation":"3","Capture Failure Animation":"4","Perma Death":"false","Number of Reserve Boxes":"10","Reserve Box Size":"30","UI":"","Capture Success Text":"%1 has been captured!","Team Box Name":"Monsters","Reserve Scene Background":"","Icon Index":"","Param Icons":"","HP Icon":"32","MP Icon":"33","TP Icon":"82","ATK Icon":"34","DEF Icon":"35","MAT Icon":"36","MDF Icon":"37","AGI Icon":"38","LUK Icon":"39","ExParam Icons":"","Hit Rate Icon":"119","Evasion Rate Icon":"82","Critical Rate Icon":"87","Critical Evasion Icon":"139","Magic Evasion Icon":"71","Magic Reflection Icon":"129","Counter Rate Icon":"77","HP Regen Icon":"40","MP Regen Icon":"41","TP Regen Icon":"80","SpParam Icons":"","Target Rate Icon":"75","Guard Rate Icon":"75","Recovery Rate Icon":"75","Pharmacoloy Rate Icon":"75","MP Cost Rate Icon":"75","TP Charge Rate Icon":"75","Physical Damage Effectiveness Icon":"75","Magical Damage Effectiveness Icon":"75","Floor Damage Effectiveness Icon":"75","EXP Rate Icon":"75","Non-Player Actor":"true","Character Sheet File":"Actor1","Character Sheet Index":"0"}},
{"name":"Synrec_MC_GenderTraits","status":true,"description":"v1.3 Enables gender traits","parameters":{"Gender Hex Blend":"[\"{\\\"Gender Name\\\":\\\"Null\\\",\\\"Hex Color\\\":\\\"#000000\\\",\\\"Color Alpha\\\":\\\"0.50\\\",\\\"Apply Filter\\\":\\\"[]\\\",\\\"Blur Filter Setting\\\":\\\"\\\",\\\"Blur Strength\\\":\\\"8\\\",\\\"Blur Quality\\\":\\\"4\\\",\\\"Noise Filter Setting\\\":\\\"\\\",\\\"Noise Intensity\\\":\\\"0.5\\\",\\\"Noise Seed\\\":\\\"Math.random()\\\",\\\"Color Filter Setting\\\":\\\"\\\",\\\"Color Method\\\":\\\"\\\"}\",\"{\\\"Gender Name\\\":\\\"Female\\\",\\\"Hex Color\\\":\\\"#00ff00\\\",\\\"Color Alpha\\\":\\\"0.50\\\",\\\"Apply Filter\\\":\\\"[\\\\\\\"color\\\\\\\"]\\\",\\\"Blur Filter Setting\\\":\\\"\\\",\\\"Blur Strength\\\":\\\"8\\\",\\\"Blur Quality\\\":\\\"4\\\",\\\"Noise Filter Setting\\\":\\\"\\\",\\\"Noise Intensity\\\":\\\"0.5\\\",\\\"Noise Seed\\\":\\\"Math.random()\\\",\\\"Color Filter Setting\\\":\\\"\\\",\\\"Color Method\\\":\\\"Sepia\\\",\\\"Color Brightness\\\":\\\"1.5\\\",\\\"Color Contrast\\\":\\\"1.000\\\",\\\"Color Hue\\\":\\\"180\\\",\\\"Color Night\\\":\\\"1\\\",\\\"Color Predator\\\":\\\"0.200\\\",\\\"Color Saturate\\\":\\\"0.400\\\",\\\"Color Tint\\\":\\\"0x000000\\\",\\\"Method Alpha\\\":\\\"0.500\\\"}\",\"{\\\"Gender Name\\\":\\\"Male\\\",\\\"Hex Color\\\":\\\"#0000ff\\\",\\\"Color Alpha\\\":\\\"0.50\\\",\\\"Apply Filter\\\":\\\"[]\\\",\\\"Blur Filter Setting\\\":\\\"\\\",\\\"Blur Strength\\\":\\\"8\\\",\\\"Blur Quality\\\":\\\"4\\\",\\\"Noise Filter Setting\\\":\\\"\\\",\\\"Noise Intensity\\\":\\\"0.5\\\",\\\"Noise Seed\\\":\\\"Math.random()\\\",\\\"Color Filter Setting\\\":\\\"\\\",\\\"Color Method\\\":\\\"\\\"}\",\"{\\\"Gender Name\\\":\\\"Alien\\\",\\\"Hex Color\\\":\\\"#ff0000\\\",\\\"Color Alpha\\\":\\\"0.50\\\",\\\"Apply Filter\\\":\\\"[]\\\",\\\"Blur Filter Setting\\\":\\\"\\\",\\\"Blur Strength\\\":\\\"8\\\",\\\"Blur Quality\\\":\\\"4\\\",\\\"Noise Filter Setting\\\":\\\"\\\",\\\"Noise Intensity\\\":\\\"0.5\\\",\\\"Noise Seed\\\":\\\"Math.random()\\\",\\\"Color Filter Setting\\\":\\\"\\\",\\\"Color Method\\\":\\\"\\\"}\"]"}},
{"name":"Synrec_MC_PlayerSetup","status":true,"description":"v1.3 Enables advanced non-battler player setup","parameters":{"Gameplay":"","No Gameover":"false","Gameover Map":"","Gameover Map ID":"0","Gameover Map X":"0","Gameover Map Y":"0","Gameover Penalty":"","Gameover Gold Penalty Percentage":"","Gameover Gold Penalty Flat":"","Gameover Exp Penalty Percentage":"","Gameover Exp Penalty Flat":"","Global Level Cap":"true","Level Cap Variable":"1","Effect Level Mode":"false","Player Equipment":"","Player Inventory":"[\"Head\",\"Body\",\"Accessory\"]","Graphics":"","Max Followers":"1","Player Dash Sprite":"true","Player Front Facing Bitmap":"Actor1_3","Player Back Facing Bitmap":"","Player Menu":"true","Player Menu Background":"Alpha_Blue","Player Menu Background Scroll X":"0","Player Menu Background Scroll Y":"0","Player Pos X":"0","Player Pos Y":"0","Player Switch Image 1":"","Switch 1 For Enable":"0","Switch 1 Position X":"0","Switch 1 Position Y":"0","Switch On Image Bitmap 1":"","Switch Off Image Bitmap 1":"","Player Switch Image 2":"","Switch 2 For Enable":"0","Switch 2 Position X":"0","Switch 2 Position Y":"0","Switch On Image Bitmap 2":"","Switch Off Image Bitmap 2":"","Player Switch Image 3":"","Switch 3 For Enable":"0","Switch 3 Position X":"0","Switch 3 Position Y":"0","Switch On Image Bitmap 3":"","Switch Off Image Bitmap 3":"","Player Switch Image 4":"","Switch 4 For Enable":"0","Switch 4 Position X":"0","Switch 4 Position Y":"0","Switch On Image Bitmap 4":"","Switch Off Image Bitmap 4":"","Player Switch Image 5":"","Switch 5 For Enable":"0","Switch 5 Position X":"0","Switch 5 Position Y":"0","Switch On Image Bitmap 5":"","Switch Off Image Bitmap 5":"","Player Switch Image 6":"","Switch 6 For Enable":"0","Switch 6 Position X":"0","Switch 6 Position Y":"0","Switch On Image Bitmap 6":"","Switch Off Image Bitmap 6":"","Player Switch Image 7":"","Switch 7 For Enable":"0","Switch 7 Position X":"0","Switch 7 Position Y":"0","Switch On Image Bitmap 7":"","Switch Off Image Bitmap 7":"","Player Switch Image 8":"","Switch 8 For Enable":"0","Switch 8 Position X":"0","Switch 8 Position Y":"0","Switch On Image Bitmap 8":"","Switch Off Image Bitmap 8":"","Player Switch Image 9":"","Switch 9 For Enable":"0","Switch 9 Position X":"0","Switch 9 Position Y":"0","Switch On Image Bitmap 9":"","Switch Off Image Bitmap 9":"","Player Switch Image 10":"","Switch 10 For Enable":"0","Switch 10 Position X":"0","Switch 10 Position Y":"0","Switch On Image Bitmap 10":"","Switch Off Image Bitmap 10":"","Player Dash Sprite File":"Actor1","Player Dash Sprite Index":"2","Player Damage Floor Animation":"[\"{\\\"Region ID\\\":\\\"1\\\",\\\"Region Animation\\\":\\\"1\\\",\\\"Region State\\\":\\\"0\\\",\\\"Region State Chance\\\":\\\"1\\\",\\\"Region Damage Formulae\\\":\\\"100\\\"}\",\"{\\\"Region ID\\\":\\\"2\\\",\\\"Region Animation\\\":\\\"41\\\",\\\"Region State\\\":\\\"0\\\",\\\"Region State Chance\\\":\\\"1\\\",\\\"Region Damage Formulae\\\":\\\"-100\\\"}\"]","Party Switches":"","Double Gold":"1","Double EXP":"2","Double Item":"3","No Surprise":"4","Raise Preemptive":"5","Encounter Half":"6"}},
{"name":"Synrec_MC_Evolution","status":true,"description":"v1.5 Creates a simple scene which allows actor evolution","parameters":{"Gameplay":"","Evolve Healing":"false","Evolve Level Reset":"false","Evolve Post Battle":"false","Reset Evolve Switch":"false","Graphics":"","Evolve Animation":"4","Evolve Animation Cancel":"5","Evolve Scene Background":"Alpha_Blue","Can Evolve":"Requirements Met","Can Not Evolve":"Requirements Not Met","Will Evolve To":"Will Evolve To","Required Items Text":"Items Required","Hide if No Item":"false"}},
{"name":"Synrec_MC_Beastiary","status":true,"description":"v1.4r Creates a simple scene which allows actor evolution","parameters":{"Menu Access By Default":"true","Background":"Alpha_Blue","Background Scroll X":"1","Background Scroll Y":"0","List Mode":"2","List Filter Name":"noShow","Page Names":"","Page Zero Name":"Base","Page One Name":"Params","Page Two Name":"ExParams","Page Three Name":"SpParams","Page Four Name":"Traits","Page Enable":"","Page Zero Enable":"true","Page One Enable":"true","Page Two Enable":"true","Page Three Enable":"true","Page Four Enable":"true","Profile Data":"[]","Trait Data":"[\"{\\\"Actor ID\\\":\\\"1\\\",\\\"Actor Trait Script\\\":\\\"\\\\\\\"this.drawText('Hello World!', 0, 40)\\\\\\\"\\\"}\"]"}},
{"name":"Synrec_MC_Breeder","status":true,"description":"v1.0 Breeding System for Monster Capture Plugins","parameters":{"Combination Array":"[\"{\\\"Result Actor\\\":\\\"6\\\",\\\"Required Actors\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"Actor\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Gender\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"garbage\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"Actor\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Gender\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"garbage\\\\\\\\\\\\\\\"}\\\\\\\"]\\\",\\\"Required Steps\\\":\\\"10\\\",\\\"Random Steps\\\":\\\"5\\\"}\",\"{\\\"Result Actor\\\":\\\"8\\\",\\\"Required Actors\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"Actor\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Gender\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"cure\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"{\\\\\\\\\\\\\\\"Actor\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"Gender\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"garbage\\\\\\\\\\\\\\\"}\\\\\\\"]\\\",\\\"Required Steps\\\":\\\"10\\\",\\\"Random Steps\\\":\\\"5\\\"}\"]","Breeder Scene Setup":"","Scene Background":"Nature_7","Breed Character Image":"!SF_Door2","Breed Character Index":"6","Breed Character Anim Hatch":"1","Item Name":"Core","Max Steps for Pre-Breed Generate":"10","Parent Step EXP":"true"}},
{"name":"Synrec_MC_BattleCore","status":true,"description":"v1.6 Battle Core for the Monster Capture System.[EXPERIMENTAL RELEASE!!!]","parameters":{"Gameplay":"","Default Number of Actor Battlers":"1","Default Number of Enemy Battlers":"1","Max Battle Members":"4","Enable Team Command":"true","Skip Turn on Swap":"true","Global Min Enemy Level":"1","Global Max Enemy Level":"99","Use Front Facing Actor Sprites":"false","Swap Animation":"4","UI":"","Team Command Name":"Party","Battling Text":"Battling","Stand-By Text":"Stand-By","Use Enemy Status":"true","Show Enemy HP Bar":"true","Show Enemy MP Bar":"true","Show Enemy TP Bar":"true","Battle Positioning":"","Enemy Reposition":"true","Actor Sprite Start X":"120","Actor Sprite Start Y":"312","Actor Sprite Offset X":"12","Enemy Sprite Start X":"408","Enemy Sprite Start Y":"200","Enemy Sprite Offset X":"12","Actor Step Forward X":"48","Actor Step Forward Y":"-12","Actor Step Forward Duration":"12","Actor Retreat X":"-600","Actor Retreat Y":"0","Actor Retreat Duration":"30"}},
{"name":"Synrec_MapEnemies","status":true,"description":"v1.5 Enemies spawn on the map based on notetags","parameters":{"Enemy Placement Positions":"[\"{\\\"Position X\\\":\\\"200\\\",\\\"Position Y\\\":\\\"360\\\"}\",\"{\\\"Position X\\\":\\\"400\\\",\\\"Position Y\\\":\\\"360\\\"}\",\"{\\\"Position X\\\":\\\"200\\\",\\\"Position Y\\\":\\\"560\\\"}\",\"{\\\"Position X\\\":\\\"400\\\",\\\"Position Y\\\":\\\"560\\\"}\"]","Max Enemy Count":"8","Default Character Image":"Monster","Default Character Index":"1","Enemy Detection Range":"5","Enemy Move Type":"observe","No Spawn Regions":"[]","Default Enemy Count":"10","Encounter Troop ID":"1","Retain Enemies":"true"}},
{"name":"Synrec_TextSounds","status":true,"description":"v1.1 Create Text Sounds","parameters":{"Use Font Size Volume":"true","Default Se":"Barrier","Default Volume":"90","Default Pitch":"100","Default Pan":"0","Default Pitch Variance":"100","Custom Text Sounds":"[\"{\\\"Face File\\\":\\\"Actor1\\\",\\\"Face Indices\\\":\\\"[\\\\\\\"0\\\\\\\"]\\\",\\\"Sound Effect\\\":\\\"Blow1\\\",\\\"Volume\\\":\\\"90\\\",\\\"Pitch\\\":\\\"100\\\",\\\"Pitch Variance\\\":\\\"100\\\",\\\"Pan\\\":\\\"0\\\"}\"]"}},
{"name":"Synrec_Preloader","status":false,"description":"v1.2 Preloads all image and audio for the game on start","parameters":{"Audio Settings":"","BGM To Ignore":"[]","Ignore All BGM":"false","BGS To Ignore":"[]","Ignore All BGS":"false","ME To Ignore":"[]","Ignore All ME":"false","SE To Ignore":"[]","Ignore All SE":"false","Image Settings":"","BattleBacks1 To Ignore":"[]","Ignore All BattleBacks1":"false","BattleBacks2 To Ignore":"[]","Ignore All BattleBacks2":"false","Characters To Ignore":"[]","Ignore All Characters":"false","Enemies To Ignore":"[]","Ignore All Enemies":"false","Faces To Ignore":"[]","Ignore All Faces":"false","Parallaxes To Ignore":"[]","Ignore All Parallaxes":"false","Pictures To Ignore":"[]","Ignore All Pictures":"false","SV Actors To Ignore":"[]","Ignore All SV Actors":"false","SV Enemies To Ignore":"[]","Ignore All SV Enemies":"false","System To Ignore":"[]","Ignore All System":"false","Tilesets To Ignore":"[]","Ignore All Tilesets":"false","Titles1 To Ignore":"[]","Ignore All Titles1":"false","Titles2 To Ignore":"[]","Ignore All Titles2":"false"}}
];
