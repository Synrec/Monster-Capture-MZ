/*:
 * 
 * @author Synrec/Kylestclr
 * @target MZ
 * @url https://synrec.itch.io/
 * @plugindesc v1.0 Changes skills to use a power points system instead of MP
 * 
 * @help
 * When using this system, skills setup to use
 * power points will not display MP/TP costs.
 * 
 * Those costs are still present and active and
 * as such, you will need to set both MP and TP
 * cost to zero (0) if you only wish to use TP.
 * 
 * @param Skill Configurations
 * @desc Setup skills to use power points.
 * @type struct<powerSkill>[]
 * @default []
 * 
 */
/*~struct~powerSkill:
 * 
 * @param Name
 * @desc No function.
 * @type text
 * @default Skill
 * 
 * @param Skill
 * @desc The skill to set max power points for.
 * @type skill
 * @default 1
 * 
 * @param Power Points
 * @desc Number of times skill can be used.
 * @type text
 * @default 1
 * 
 */
if(typeof SynrecMC == 'undefined')throw new Error("Core Plugin Missing.");
if(!isObject(SynrecMC))throw new Error("Bad Core Files.");

const Syn_MC_PP = {};
Syn_MC_PP.Plugin = PluginManager.parameters(`Synrec_MC_PowerPoints`);

function MONSTER_CAPTURE_SKILL_PARSER (obj){
    try{
        obj = JSON.parse(obj);
        obj['Skill'] = eval(obj['Skill']);
        return obj;
    }catch(e){
        return;
    }
}

try{
    const skill_configs = JSON.parse(Syn_MC_PP.Plugin['Skill Configurations']).map((skill_config)=>{
        return MONSTER_CAPTURE_SKILL_PARSER(skill_config);
    }).filter(Boolean);
    Syn_MC_PP.SKILL_CONFIGURATIONS = skill_configs;
}catch(e){
    console.warn(`Unable to parse power point data. ${e}`);
    Syn_MC_PP.SKILL_CONFIGURATIONS = [];
}

Syn_MC_PP_GmActn_App = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    Syn_MC_PP_GmActn_App.call(this, ...arguments);
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

Syn_MC_PP_GmBattBse_InitMems = Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers = function() {
    Syn_MC_PP_GmBattBse_InitMems.call(this);
    this.initPowerPoints();
}

Game_BattlerBase.prototype.initPowerPoints = function(){
    this._power_skills = {};
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
    const configs = Syn_MC_PP.SKILL_CONFIGURATIONS;
    const config = configs.find((configuration)=>{
        return configuration['Skill'] == id;
    })
    if(config){
        const power_skills = this.powerSkills();
        const obj = {};
        obj['PP'] = eval(config['Power Points']);
        obj['Max PP'] = eval(config['Power Points']);
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
        base && power_valid
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

Syn_MC_PP_GmActr_LrnSkl = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
    Syn_MC_PP_GmActr_LrnSkl.call(this, skillId);
    this.addPowerSkill(skillId);
}

Syn_MC_PP_GmActr_FrgtSkl = Game_Actor.prototype.forgetSkill;
Game_Actor.prototype.forgetSkill = function(skillId) {
    Syn_MC_PP_GmActr_FrgtSkl.call(this, skillId);
    this.removePowerSkill(skillId);
}

Syn_MC_PP_GmEnem_Setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
    Syn_MC_PP_GmEnem_Setup.call(this, enemyId, x, y);
    this.setupPowerSkills();
    this.recoverAll();
}

Game_Enemy.prototype.setupPowerSkills = function(){
    const battler = this;
    const actionList = this.enemy().actions.filter((a)=>{
        return this.isActionValid(a);
    })
    actionList.forEach((action)=>{
        const skill_id = action.skillId;
        battler.addPowerSkill(skill_id);
    })
}

Syn_MC_PP_WinSklList_DrwSklCost = Window_SkillList.prototype.drawSkillCost;
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
        Syn_MC_PP_WinSklList_DrwSklCost.call(this, skill, x, y, width);
    }
}