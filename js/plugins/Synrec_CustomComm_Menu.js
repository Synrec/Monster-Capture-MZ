/*:
 * @author Synrec/Kylestclr
 * @plugindesc [Commission Menu]<Private Use Only>
 * @url https://synrec.itch.io
 * 
 * @target MZ
 * 
 * @help
 * Build a basic custom menu scene.
 * 
 * @param Replace Menu Call
 * @desc For all instances Scene_Menu called, replace with custom scene.
 * @type boolean
 * @default false
 * 
 * @param Draw Time Text
 * @desc %1 = Hours, %2 = Minutes, %3 = Seconds
 * @type text
 * @default %1:%2:%3
 * 
 * @param Command Window Setup
 * @desc Setup Command Window Here
 * @type struct<cmdWinSetup>
 * 
 * @param Status Window Setup
 * @desc Setup Status Window Here
 * @type struct<stsWinSetup>
 * 
 * @param Time Window Setup
 * @desc Setup Time Window Here
 * @type struct<timWinSetup>
 * 
 * @param Gold Window Setup
 * @desc Setup Gold Window Here
 * @type struct<golWinSetup>
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
/*~struct~cmdWinSetup:
 * 
 * @param Dimension Configuration
 * @desc Setup position and width of the window
 * @type struct<locSize>
 * @default {"X":"0","Y":"Graphics.boxHeight - 112","Width":"Graphics.boxWidth","Height":"112"}
 * 
 * @param Window Font and Style Configuration
 * @desc Custom style the window
 * @type struct<windowStyle>
 * @default {"Font Settings":"","Font Size":"16","Font Face":"sans-serif","Base Font Color":"#ffffff","Font Outline Color":"rgba(0, 0, 0, 0.5)","Font Outline Thickness":"3","Window Skin":"Window","Window Opacity":"255","Show Window Dimmer":"false"}
 * 
 */
/*~struct~stsWinSetup:
 * 
 * @param Dimension Configuration
 * @desc Setup position and width of the window
 * @type struct<locSize>
 * @default {"X":"0","Y":"44","Width":"Graphics.boxWidth - 240","Height":"300"}
 * 
 * @param Window Font and Style Configuration
 * @desc Custom style the window
 * @type struct<windowStyle>
 * @default {"Font Settings":"","Font Size":"16","Font Face":"sans-serif","Base Font Color":"#ffffff","Font Outline Color":"rgba(0, 0, 0, 0.5)","Font Outline Thickness":"3","Window Skin":"Window","Window Opacity":"255","Show Window Dimmer":"false"}
 * 
 */
/*~struct~timWinSetup:
 * 
 * @param Dimension Configuration
 * @desc Setup position and width of the window
 * @type struct<locSize>
 * @default {"X":"0","Y":"0","Width":"240","Height":"44"}
 * 
 * @param Window Font and Style Configuration
 * @desc Custom style the window
 * @type struct<windowStyle>
 * @default {"Font Settings":"","Font Size":"16","Font Face":"sans-serif","Base Font Color":"#ffffff","Font Outline Color":"rgba(0, 0, 0, 0.5)","Font Outline Thickness":"3","Window Skin":"Window","Window Opacity":"255","Show Window Dimmer":"false"}
 * 
 */
/*~struct~golWinSetup:
 * 
 * @param Dimension Configuration
 * @desc Setup position and width of the window
 * @type struct<locSize>
 * @default {"X":"Graphics.boxWidth - 200","Y":"0","Width":"200","Height":"44"}
 * 
 * @param Window Font and Style Configuration
 * @desc Custom style the window
 * @type struct<windowStyle>
 * @default {"Font Settings":"","Font Size":"16","Font Face":"sans-serif","Base Font Color":"#ffffff","Font Outline Color":"rgba(0, 0, 0, 0.5)","Font Outline Thickness":"3","Window Skin":"Window","Window Opacity":"255","Show Window Dimmer":"false"}
 * 
 */

const Syn_CommMenu = {}
Syn_CommMenu.Plugin = PluginManager.parameters(`Synrec_CustomComm_Menu`);
Syn_CommMenu.REPLACE_MENU = eval(Syn_CommMenu.Plugin['Replace Menu Call']);
Syn_CommMenu.TIME_TEXT = Syn_CommMenu.Plugin['Draw Time Text'] || '';

function DIMENSION_CONFIGURATION_PARSER_CAPTURE(obj){
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

function WINDOW_STYLE_PARSER_CAPTURE(obj){
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

function COMMAND_MENU_PARSER(obj){
    try{
        obj = JSON.parse(obj);
        obj['Dimension Configuration'] = DIMENSION_CONFIGURATION_PARSER_CAPTURE(obj['Dimension Configuration']);
        obj['Window Font and Style Configuration'] = WINDOW_STYLE_PARSER_CAPTURE(obj['Window Font and Style Configuration']);
        return obj;
    }catch(e){
        throw new Error(`Failed to parse command window data. ${e}`);
    }
}

function STATUS_MENU_PARSER(obj){
    try{
        obj = JSON.parse(obj);
        obj['Dimension Configuration'] = DIMENSION_CONFIGURATION_PARSER_CAPTURE(obj['Dimension Configuration']);
        obj['Window Font and Style Configuration'] = WINDOW_STYLE_PARSER_CAPTURE(obj['Window Font and Style Configuration']);
        return obj;
    }catch(e){
        throw new Error(`Failed to parse status window data. ${e}`);
    }
}

function TIME_MENU_PARSER(obj){
    try{
        obj = JSON.parse(obj);
        obj['Dimension Configuration'] = DIMENSION_CONFIGURATION_PARSER_CAPTURE(obj['Dimension Configuration']);
        obj['Window Font and Style Configuration'] = WINDOW_STYLE_PARSER_CAPTURE(obj['Window Font and Style Configuration']);
        return obj;
    }catch(e){
        throw new Error(`Failed to parse time window data. ${e}`);
    }
}

function GOLD_MENU_PARSER(obj){
    try{
        obj = JSON.parse(obj);
        obj['Dimension Configuration'] = DIMENSION_CONFIGURATION_PARSER_CAPTURE(obj['Dimension Configuration']);
        obj['Window Font and Style Configuration'] = WINDOW_STYLE_PARSER_CAPTURE(obj['Window Font and Style Configuration']);
        return obj;
    }catch(e){
        throw new Error(`Failed to parse gold window data. ${e}`);
    }
}

try{
    const cmd_window = COMMAND_MENU_PARSER(Syn_CommMenu.Plugin['Command Window Setup'])
    Syn_CommMenu.COMMAND_MENU = cmd_window;
}catch(e){
    console.error(`Please check command menu setup. ${e}`);
    Syn_CommMenu.COMMAND_MENU = {};
}

try{
    const sts_window = STATUS_MENU_PARSER(Syn_CommMenu.Plugin['Status Window Setup'])
    Syn_CommMenu.STATUS_MENU = sts_window;
}catch(e){
    console.error(`Please check status menu setup. ${e}`);
    Syn_CommMenu.STATUS_MENU = {};
}

try{
    const tim_window = TIME_MENU_PARSER(Syn_CommMenu.Plugin['Time Window Setup'])
    Syn_CommMenu.TIME_MENU = tim_window;
}catch(e){
    console.error(`Please check time menu setup. ${e}`);
    Syn_CommMenu.TIME_MENU = {};
}

try{
    const gol_window = GOLD_MENU_PARSER(Syn_CommMenu.Plugin['Gold Window Setup'])
    Syn_CommMenu.GOLD_MENU = gol_window;
}catch(e){
    console.error(`Please check gold menu setup. ${e}`);
    Syn_CommMenu.GOLD_MENU = {};
}

Syn_CommMenu_ScnMngr_Goto = SceneManager.goto;
SceneManager.goto = function(sceneClass) {
    if (sceneClass == Scene_Menu && Syn_CommMenu.REPLACE_MENU) {
        sceneClass = Scene_CaptureMenu;
    }
    Syn_CommMenu_ScnMngr_Goto.call(this, sceneClass);
}

function WindowCapture_MenuCommand(){
    this.initialize(...arguments);
}

WindowCapture_MenuCommand.prototype = Object.create(Window_MenuCommand.prototype);
WindowCapture_MenuCommand.prototype.constructor = WindowCapture_MenuCommand;

WindowCapture_MenuCommand.prototype.initialize = function(){
    const data = Syn_CommMenu.COMMAND_MENU;
    const dimension = data['Dimension Configuration'];
    const rect = new Rectangle(
        dimension['X'],
        dimension['Y'],
        dimension['Width'],
        dimension['Height']
    )
    this._custom_config = data['Window Font and Style Configuration'];
    this._custom_data = data;
    Window_MenuCommand.prototype.initialize.call(this, rect);
    this.setOpacityAndDimmer();
}

WindowCapture_MenuCommand.prototype.standardPadding = function() {
    return 8;
}

WindowCapture_MenuCommand.prototype.loadWindowskin = function(){
    const base = Window_MenuCommand.prototype.loadWindowskin.call(this);
    const custom_config = this._custom_config;
    if(!custom_config)return base;
    const skin_name = custom_config['Window Skin'];
    if(!skin_name)return base;
    this.windowskin = ImageManager.loadSystem(skin_name);
}

WindowCapture_MenuCommand.prototype.resetFontSettings = function() {
    const base = Window_MenuCommand.prototype.resetFontSettings;
    const custom_config = this._custom_config;
    if(!custom_config)return base.call(this);
    const font_face = custom_config['Font Face'] || "sans-serif";
    const font_size = custom_config['Font Size'] || 16;
    const font_outline_size = custom_config['Font Outline Thickness'] || 3;
    this.contents.fontFace = font_face;
    this.contents.fontSize = font_size;
    this.contents.outlineWidth = font_outline_size;
    this.resetTextColor();
}

WindowCapture_MenuCommand.prototype.resetTextColor = function() {
    const base = Window_MenuCommand.prototype.resetTextColor;
    const custom_config = this._custom_config;
    if(!custom_config)return base.call(this);
    const text_color = custom_config['Base Font Color'] || "#ffffff";
    const outline_color = custom_config['Font Outline Color'] || "rgba(0, 0, 0, 0.5)";
    this.changeTextColor(text_color);
    this.contents.outlineColor = outline_color;
}

WindowCapture_MenuCommand.prototype.setOpacityAndDimmer = function(){
    const custom_config = this._custom_config;
    if(!custom_config)return;
    const show_dimmer = custom_config['Show Window Dimmer'] || false;
    const win_opacity = custom_config['Window Opacity'] || 0;
    this.opacity = win_opacity;
    show_dimmer ? this.showBackgroundDimmer() : this.hideBackgroundDimmer();
}

WindowCapture_MenuCommand.prototype.maxCols = function(){
    return 4;
}

function WindowCapture_Time(){
    this.initialize(...arguments);
}

WindowCapture_Time.prototype = Object.create(Window_Base.prototype);
WindowCapture_Time.prototype.constructor = WindowCapture_Time;

WindowCapture_Time.prototype.initialize = function(){
    const data = Syn_CommMenu.TIME_MENU;
    const dimension = data['Dimension Configuration'];
    const rect = new Rectangle(
        dimension['X'],
        dimension['Y'],
        dimension['Width'],
        dimension['Height']
    )
    this._custom_config = data['Window Font and Style Configuration'];
    this._custom_data = data;
    Window_Base.prototype.initialize.call(this, rect);
    this.setOpacityAndDimmer();
}

WindowCapture_Time.prototype.standardPadding = function() {
    return 8;
}

WindowCapture_Time.prototype.loadWindowskin = function(){
    const base = Window_Base.prototype.loadWindowskin.call(this);
    const custom_config = this._custom_config;
    if(!custom_config)return base;
    const skin_name = custom_config['Window Skin'];
    if(!skin_name)return base;
    this.windowskin = ImageManager.loadSystem(skin_name);
}

WindowCapture_Time.prototype.resetFontSettings = function() {
    const base = Window_Base.prototype.resetFontSettings;
    const custom_config = this._custom_config;
    if(!custom_config)return base.call(this);
    const font_face = custom_config['Font Face'] || "sans-serif";
    const font_size = custom_config['Font Size'] || 16;
    const font_outline_size = custom_config['Font Outline Thickness'] || 3;
    this.contents.fontFace = font_face;
    this.contents.fontSize = font_size;
    this.contents.outlineWidth = font_outline_size;
    this.resetTextColor();
}

WindowCapture_Time.prototype.resetTextColor = function() {
    const base = Window_Base.prototype.resetTextColor;
    const custom_config = this._custom_config;
    if(!custom_config)return base.call(this);
    const text_color = custom_config['Base Font Color'] || "#ffffff";
    const outline_color = custom_config['Font Outline Color'] || "rgba(0, 0, 0, 0.5)";
    this.changeTextColor(text_color);
    this.contents.outlineColor = outline_color;
}

WindowCapture_Time.prototype.setOpacityAndDimmer = function(){
    const custom_config = this._custom_config;
    if(!custom_config)return;
    const show_dimmer = custom_config['Show Window Dimmer'] || false;
    const win_opacity = custom_config['Window Opacity'] || 0;
    this.opacity = win_opacity;
    show_dimmer ? this.showBackgroundDimmer() : this.hideBackgroundDimmer();
}

WindowCapture_Time.prototype.update = function(){
    Window_Base.prototype.update.call(this);
    this.updateTime();
}

WindowCapture_Time.prototype.updateTime = function(){
    this.contents.clear();
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const time = Syn_CommMenu.TIME_TEXT.format(hours.padZero(2), minutes.padZero(2), seconds.padZero(2))
    this.drawText(time, 0, 0, this.contentsWidth(), 'center');
}

function WindowCapture_Gold(){
    this.initialize(...arguments);
}

WindowCapture_Gold.prototype = Object.create(Window_Gold.prototype);
WindowCapture_Gold.prototype.constructor = WindowCapture_Gold;

WindowCapture_Gold.prototype.initialize = function(){
    const data = Syn_CommMenu.TIME_MENU;
    const dimension = data['Dimension Configuration'];
    const rect = new Rectangle(
        dimension['X'],
        dimension['Y'],
        dimension['Width'],
        dimension['Height']
    )
    this._custom_config = data['Window Font and Style Configuration'];
    this._custom_data = data;
    Window_Gold.prototype.initialize.call(this, rect);
    this.setOpacityAndDimmer();
}

WindowCapture_Gold.prototype.standardPadding = function() {
    return 8;
}

WindowCapture_Gold.prototype.loadWindowskin = function(){
    const base = Window_Gold.prototype.loadWindowskin.call(this);
    const custom_config = this._custom_config;
    if(!custom_config)return base;
    const skin_name = custom_config['Window Skin'];
    if(!skin_name)return base;
    this.windowskin = ImageManager.loadSystem(skin_name);
}

WindowCapture_Gold.prototype.resetFontSettings = function() {
    const base = Window_Gold.prototype.resetFontSettings;
    const custom_config = this._custom_config;
    if(!custom_config)return base.call(this);
    const font_face = custom_config['Font Face'] || "sans-serif";
    const font_size = custom_config['Font Size'] || 16;
    const font_outline_size = custom_config['Font Outline Thickness'] || 3;
    this.contents.fontFace = font_face;
    this.contents.fontSize = font_size;
    this.contents.outlineWidth = font_outline_size;
    this.resetTextColor();
}

WindowCapture_Gold.prototype.resetTextColor = function() {
    const base = Window_Gold.prototype.resetTextColor;
    const custom_config = this._custom_config;
    if(!custom_config)return base.call(this);
    const text_color = custom_config['Base Font Color'] || "#ffffff";
    const outline_color = custom_config['Font Outline Color'] || "rgba(0, 0, 0, 0.5)";
    this.changeTextColor(text_color);
    this.contents.outlineColor = outline_color;
}

WindowCapture_Gold.prototype.setOpacityAndDimmer = function(){
    const custom_config = this._custom_config;
    if(!custom_config)return;
    const show_dimmer = custom_config['Show Window Dimmer'] || false;
    const win_opacity = custom_config['Window Opacity'] || 0;
    this.opacity = win_opacity;
    show_dimmer ? this.showBackgroundDimmer() : this.hideBackgroundDimmer();
}

function WindowCapture_MenuStatus(){
    this.initialize(...arguments);
}

WindowCapture_MenuStatus.prototype = Object.create(Window_MenuStatus.prototype);
WindowCapture_MenuStatus.prototype.constructor = WindowCapture_MenuStatus;

WindowCapture_MenuStatus.prototype.initialize = function(){
    const data = Syn_CommMenu.STATUS_MENU;
    const dimension = data['Dimension Configuration'];
    const rect = new Rectangle(
        dimension['X'],
        dimension['Y'],
        dimension['Width'],
        dimension['Height']
    )
    this._custom_config = data['Window Font and Style Configuration'];
    this._custom_data = data;
    Window_MenuStatus.prototype.initialize.call(this, rect);
    this.setOpacityAndDimmer();
}

WindowCapture_MenuStatus.prototype.standardPadding = function() {
    return 8;
}

WindowCapture_MenuStatus.prototype.loadWindowskin = function(){
    const base = Window_MenuStatus.prototype.loadWindowskin.call(this);
    const custom_config = this._custom_config;
    if(!custom_config)return base;
    const skin_name = custom_config['Window Skin'];
    if(!skin_name)return base;
    this.windowskin = ImageManager.loadSystem(skin_name);
}

WindowCapture_MenuStatus.prototype.resetFontSettings = function() {
    const base = Window_MenuStatus.prototype.resetFontSettings;
    const custom_config = this._custom_config;
    if(!custom_config)return base.call(this);
    const font_face = custom_config['Font Face'] || "sans-serif";
    const font_size = custom_config['Font Size'] || 16;
    const font_outline_size = custom_config['Font Outline Thickness'] || 3;
    this.contents.fontFace = font_face;
    this.contents.fontSize = font_size;
    this.contents.outlineWidth = font_outline_size;
    this.resetTextColor();
}

WindowCapture_MenuStatus.prototype.resetTextColor = function() {
    const base = Window_MenuStatus.prototype.resetTextColor;
    const custom_config = this._custom_config;
    if(!custom_config)return base.call(this);
    const text_color = custom_config['Base Font Color'] || "#ffffff";
    const outline_color = custom_config['Font Outline Color'] || "rgba(0, 0, 0, 0.5)";
    this.changeTextColor(text_color);
    this.contents.outlineColor = outline_color;
}

WindowCapture_MenuStatus.prototype.setOpacityAndDimmer = function(){
    const custom_config = this._custom_config;
    if(!custom_config)return;
    const show_dimmer = custom_config['Show Window Dimmer'] || false;
    const win_opacity = custom_config['Window Opacity'] || 0;
    this.opacity = win_opacity;
    show_dimmer ? this.showBackgroundDimmer() : this.hideBackgroundDimmer();
}

WindowCapture_MenuStatus.prototype.maxCols = function(){
    return 2;
}

WindowCapture_MenuStatus.prototype.numVisibleRows = function() {
    return 3;
}

WindowCapture_MenuStatus.prototype.maxItems = function(){
    return Math.min($gameParty.size(), 6);
}

WindowCapture_MenuStatus.prototype.drawItemStatus = function(index) {
    const actor = this.actor(index);
    const rect = this.itemRect(index);
    const x = rect.x;
    const y = rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5);
    this.drawActorSimpleStatus(actor, x, y);
}

WindowCapture_MenuStatus.prototype.placeBasicGauges = function(actor, x, y) {
    x -= 180;
    Window_StatusBase.prototype.placeBasicGauges.call(this, actor, x, y);
}

WindowCapture_MenuStatus.prototype.drawItemImage = function(index) {
    const actor = this.actor(index);
    const rect = this.itemRect(index);
    const width = ImageManager.faceWidth;
    const height = rect.height - 2;
    this.changePaintOpacity(actor.isBattleMember());
    this.drawActorFace(actor, rect.x + rect.width - width, rect.y + 1, width, height);
    this.changePaintOpacity(true);
};

WindowCapture_MenuStatus.prototype.drawActorLevel = function(actor, x, y) {
    x += 116;
    const lvW = this.textWidth(`000`);
    const fw = lvW + (this.textWidth(`00`));
    const oy = 48;
    this.contents.fillRect(x + fw + 30, y + oy, 54, this.lineHeight(), 'rgba(0, 0, 0, 0.5)');
    this.contents.outlineColor = "rgba(255, 64, 64, 1)";
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.levelA, x + lvW, y + oy, 84, 'right');
    this.changeTextColor(`#ffffff`);
    this.drawText(actor.level, x + fw, y + oy, 84, "right");
    this.contents.outlineColor = "rgba(0, 0, 0, 0.5)";
};

WindowCapture_MenuStatus.prototype.drawActorClass = function(actor, x, y, width) {
    width = 84;
    Window_StatusBase.prototype.drawActorClass.call(this, actor, x, y, width);
};

function Scene_CaptureMenu(){
    this.initialize(...arguments);
}

Scene_CaptureMenu.prototype = Object.create(Scene_MenuBase.prototype);
Scene_CaptureMenu.prototype.constructor = Scene_CaptureMenu;

Scene_CaptureMenu.prototype.create = function(){
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createGoldWindow();
    this.createTimeWindow();
    this.createStatusWindow();
}

Scene_CaptureMenu.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._statusWindow.refresh();
}

Scene_CaptureMenu.prototype.createCommandWindow = function(){
    const rect = this.commandWindowRect();
    const commandWindow = new WindowCapture_MenuCommand(rect);
    commandWindow.setHandler("item", this.commandItem.bind(this));
    commandWindow.setHandler("skill", this.commandPersonal.bind(this));
    commandWindow.setHandler("equip", this.commandPersonal.bind(this));
    commandWindow.setHandler("status", this.commandPersonal.bind(this));
    commandWindow.setHandler("formation", this.commandFormation.bind(this));
    commandWindow.setHandler("options", this.commandOptions.bind(this));
    commandWindow.setHandler("save", this.commandSave.bind(this));
    commandWindow.setHandler("gameEnd", this.commandGameEnd.bind(this));
    commandWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(commandWindow);
    this._commandWindow = commandWindow;
}

Scene_CaptureMenu.prototype.commandWindowRect = function() {
    const ww = Graphics.boxWidth;
    const wh = 112;
    const wx = 0;
    const wy = Graphics.boxHeight - wh;
    return new Rectangle(wx, wy, ww, wh);
}

Scene_CaptureMenu.prototype.createGoldWindow = function() {
    const rect = this.goldWindowRect();
    this._goldWindow = new Window_Gold(rect);
    this.addWindow(this._goldWindow);
}

Scene_CaptureMenu.prototype.goldWindowRect = function() {
    const ww = 200
    const wh = this.calcWindowHeight(1, true);
    const wx = Graphics.boxWidth - ww;
    const wy = 0;
    return new Rectangle(wx, wy, ww, wh);
}

Scene_CaptureMenu.prototype.createTimeWindow = function() {
    const rect = this.timeWindowRect();
    this._timeWindow = new WindowCapture_Time(rect);
    this.addWindow(this._timeWindow);
}

Scene_CaptureMenu.prototype.timeWindowRect = function() {
    const ww = this.mainCommandWidth();
    const wh = this.calcWindowHeight(1, true);
    const wx = 0;
    const wy = 0;
    return new Rectangle(wx, wy, ww, wh);
}

Scene_CaptureMenu.prototype.createStatusWindow = function() {
    const rect = this.statusWindowRect();
    this._statusWindow = new WindowCapture_MenuStatus(rect);
    this.addWindow(this._statusWindow);
}

Scene_CaptureMenu.prototype.statusWindowRect = function() {
    const ww = Graphics.boxWidth - this.mainCommandWidth();
    const wh = Graphics.boxHeight - (this.goldWindowRect().height + this.commandWindowRect().height);
    const wx = Graphics.boxWidth - ww;
    const wy = this.goldWindowRect().height;
    return new Rectangle(wx, wy, ww, wh);
}

Scene_CaptureMenu.prototype.commandItem = function() {
    SceneManager.push(Scene_Item);
}

Scene_CaptureMenu.prototype.commandPersonal = function() {
    this._statusWindow.setFormationMode(false);
    this._statusWindow.selectLast();
    this._statusWindow.activate();
    this._statusWindow.setHandler("ok", this.onPersonalOk.bind(this));
    this._statusWindow.setHandler("cancel", this.onPersonalCancel.bind(this));
}

Scene_CaptureMenu.prototype.commandFormation = function() {
    this._statusWindow.setFormationMode(true);
    this._statusWindow.selectLast();
    this._statusWindow.activate();
    this._statusWindow.setHandler("ok", this.onFormationOk.bind(this));
    this._statusWindow.setHandler("cancel", this.onFormationCancel.bind(this));
}

Scene_CaptureMenu.prototype.commandOptions = function() {
    SceneManager.push(Scene_Options);
}

Scene_CaptureMenu.prototype.commandSave = function() {
    SceneManager.push(Scene_Save);
}

Scene_CaptureMenu.prototype.commandGameEnd = function() {
    SceneManager.push(Scene_GameEnd);
}

Scene_CaptureMenu.prototype.onPersonalOk = function() {
    switch (this._commandWindow.currentSymbol()) {
        case "skill":
            SceneManager.push(Scene_Skill);
            break;
        case "equip":
            SceneManager.push(Scene_Equip);
            break;
        case "status":
            SceneManager.push(Scene_Status);
            break;
    }
}

Scene_CaptureMenu.prototype.onPersonalCancel = function() {
    this._statusWindow.deselect();
    this._commandWindow.activate();
}

Scene_CaptureMenu.prototype.onFormationOk = function() {
    const index = this._statusWindow.index();
    const pendingIndex = this._statusWindow.pendingIndex();
    if (pendingIndex >= 0) {
        $gameParty.swapOrder(index, pendingIndex);
        this._statusWindow.setPendingIndex(-1);
        this._statusWindow.redrawItem(index);
    } else {
        this._statusWindow.setPendingIndex(index);
    }
    this._statusWindow.activate();
}

Scene_CaptureMenu.prototype.onFormationCancel = function() {
    if (this._statusWindow.pendingIndex() >= 0) {
        this._statusWindow.setPendingIndex(-1);
        this._statusWindow.activate();
    } else {
        this._statusWindow.deselect();
        this._commandWindow.activate();
    }
}

Scene_CaptureMenu.prototype.createCancelButton = function() {}

//!Custom function calls Below
Scene_CaptureMenu.prototype.openPlayer = function(){
    SoundManager.playOk();
    SceneManager.push(Scene_PlayerData);
}

Scene_CaptureMenu.prototype.openBeastiary = function(){
    SoundManager.playOk();
    SceneManager.push(Scene_Beastiary);
}

Scene_CaptureMenu.prototype.openBreeder = function(){
    SceneManager.push(Scene_BreederSteps);
}