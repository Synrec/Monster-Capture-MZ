/*:
 * @author Synrec/Kylestclair
 * @plugindesc v1.0.0 Preloads image and audio for the game on start
 * @url https://synrec.itch.io
 * @target MZ
 * 
 * @help
 * During playtesting, the plugin will create a list of image and audio
 * that was loaded to be preloaded on startup.
 * 
 * 
 * @param Bypass Load Confirm
 * @desc Bypass needing to use a confirm button
 * @type boolean
 * @default false
 * 
 * @param Loading Gauge
 * @desc Setup the loading gauge
 * @type struct<preloadGauge>
 * 
 * @param Preload Background
 * @desc Background Image used for the preload scene.
 * @type file
 * @dir img/system/
 * 
 * @param General Settings
 * 
 * @param Load Rate
 * @parent General Settings
 * @desc Speed to preload data
 * @type number
 * @default 1
 * 
 * @param Ignored Directories
 * @desc These directories are ignored by the preloader
 * @type text[]
 * @default []
 * 
 * @param Ignored Files
 * @desc These files are ignored by the preloader
 * @type struct<ignoreFile>[]
 * @default []
 * 
 */

