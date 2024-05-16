/*:
 * @author Synrec/Kylestclr
 * @plugindesc v1.0 Changes default battle action
 * @target MZ
 * 
 * @help
 * Use plugin parameters to set motion action for
 * actor on movement.
 * 
 * Plugin should be loaded after any battle plugins.
 * 
 * Automatically re-layer battlers on scene unless 
 * battle scene has been significantly modified.
 * 
 * @param Skill Move Motions
 * @desc Setup motion to play for skill movement
 * Forces default motion setup.
 * @type struct<skillMotion>[]
 * @default []
 * 
 * @param Item Move Motions
 * @desc Setup motion to play for item movement
 * Forces default motion setup.
 * @type struct<itemMotion>[]
 * @default []
 * 
 */
/*~struct~skillMotion:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default Skill
 * 
 * @param Skill
 * @desc Select skill this config applies to.
 * Do not set duplicates.
 * @type skill
 * @default 0
 * 
 * @param Move To Target
 * @desc Move to target before execute action.
 * Forces default motion setup.
 * @type boolean
 * @default false
 * 
 * @param Motion
 * @desc Motion used
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
 * @default walk
 * 
 */
/*~struct~itemMotion:
 * 
 * @param Name
 * @desc No function
 * @type text
 * @default Skill
 * 
 * @param Item
 * @desc Select item this config applies to.
 * Do not set duplicates.
 * @type item
 * @default 0
 * 
 * @param Move To Target
 * @desc Move to target before execute action.
 * @type boolean
 * @default false
 * 
 * @param Motion
 * @desc Motion used
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
 * @default walk
 * 
 */

const Synrec_BattleMoves = {};
Synrec_BattleMoves.Plugin = PluginManager.parameters(`Synrec_BattleMovement`);

function SKILL_MOTION_PARSER_BATTLEMOVES(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

try{
    const act_motions = JSON.parse(Synrec_BattleMoves.Plugin['Skill Move Motions']).map((config)=>{
        return SKILL_MOTION_PARSER_BATTLEMOVES(config);
    }).filter(Boolean)
    Synrec_BattleMoves.SKILL_MOTIONS = act_motions;
}catch(e){
    Synrec_BattleMoves.SKILL_MOTIONS = [];
}

function ITEM_MOTION_PARSER_BATTLEMOVES(obj){
    try{
        obj = JSON.parse(obj);
        return obj;
    }catch(e){
        return;
    }
}

try{
    const act_motions = JSON.parse(Synrec_BattleMoves.Plugin['Item Move Motions']).map((config)=>{
        return ITEM_MOTION_PARSER_BATTLEMOVES(config);
    }).filter(Boolean)
    Synrec_BattleMoves.ITEM_MOTIONS = act_motions;
}catch(e){
    Synrec_BattleMoves.ITEM_MOTIONS = [];
}

Synrec_BattleMoves_SprtActr_UpdtTrgtPos = Sprite_Actor.prototype.updateTargetPosition
Sprite_Actor.prototype.updateTargetPosition = function() {
    if(this._battler._need_return)return;
    Synrec_BattleMoves_SprtActr_UpdtTrgtPos.call(this, ...arguments);
}

Synrec_BattleMoves_WinBattLog_StrtActn = Window_BattleLog.prototype.startAction;
Window_BattleLog.prototype.startAction = function(subject, action, targets) {
    const skill_motions = Synrec_BattleMoves.SKILL_MOTIONS;
    const item_motions = Synrec_BattleMoves.ITEM_MOTIONS;
    const action_data = action.item();
    const motions = DataManager.isSkill(action_data) ? skill_motions : DataManager.isItem(action_data) ? item_motions : null;
    if(!motions){
        return Synrec_BattleMoves_WinBattLog_StrtActn.call(this, ...arguments);
    }
    const id = action_data.id;
    const motion_data = motions.find((motion_config)=>{
        if(DataManager.isSkill(action_data)){
            const sid = eval(motion_config['Skill']);
            return sid == id;
        }
        if(DataManager.isItem(action_data)){
            const iid = eval(motion_config['Item']);
            return iid == id;
        }
    })
    if(!motion_data){
        return Synrec_BattleMoves_WinBattLog_StrtActn.call(this, ...arguments);
    }
    const move_to_target = eval(motion_data['Move To Target']);
    const motion = motion_data['Motion'];
    this.push("performActionStart", subject, action);
    this.push("waitForMovement");
    this.push("performSynrecBattleMotion", subject, motion);
    let tx = 0;
    let ty = 0;
    if(move_to_target){
        const scene = SceneManager._scene;
        if(scene instanceof Scene_Battle){
            const spriteset = scene._spriteset;
            if(spriteset){
                const actors = spriteset._actorSprites;
                const enemies = spriteset._enemySprites;
                let total_x = 0;
                let total_y = 0;
                targets.forEach((target)=>{
                    const sprites = target.isEnemy() ? enemies : target.isActor() ? actors : null;
                    if(Array.isArray(sprites)){
                        const target_sprite = sprites.find((sprite)=>{
                            return sprite._battler == target;
                        })
                        const x = target_sprite.x;
                        const y = target_sprite.y;
                        total_x += x || 0;
                        total_y += y || 0;
                    }
                })
                let sw = 0;
                const sprite = subject.isActor() ? actors.find((sprite)=>{
                    return sprite._battler == subject;
                }) : subject.isEnemy() ? enemies.find((sprite)=>{
                    return sprite._battler == subject;
                }) : null
                if(sprite){
                    if(sprite._mainSprite){
                        sw = sprite._mainSprite.width * 0.75;
                    }else{
                        sw = sprite.width * 0.75;
                    }
                }
                tx = (total_x / targets.length) + (subject.isActor() ? sw : -sw);
                ty = total_y / targets.length;
                this.push("performSynrecBattleMove", subject, tx, ty);
            }
        }
    }else{
        this.push("waitForBattleMove");
    }
    this.push("waitForMovement");
    this.push("performAction", subject, action);
    this.push("showAnimation", subject, targets.clone(), action_data.animationId);
    this.displayAction(subject, action_data);
    if(move_to_target){
        subject._need_return = [tx,ty];
    }
}

Synrec_BattleMoves_WinBattLog_EndActn = Window_BattleLog.prototype.endAction;
Window_BattleLog.prototype.endAction = function(subject) {
    if(subject._need_return){
        const logWindow = this;
        this.push("waitForNewLine");
        this.push("clear");
        const scene = SceneManager._scene;
        if(scene instanceof Scene_Battle){
            const spriteset = scene._spriteset;
            if(spriteset){
                const actors = spriteset._actorSprites;
                const enemies = spriteset._enemySprites;
                actors.concat(enemies).forEach((batt_sprite)=>{
                    const battler = batt_sprite._battler;
                    if(!battler)return;
                    if(battler._need_return && batt_sprite._battle_moved){
                        const tx = battler._need_return[0];
                        const ty = battler._need_return[1];
                        this.push("performActionEnd", battler);
                        logWindow.push("performSynrecBattleMoveReturn", battler, tx, ty);
                    }
                });
            }
        }
        this.push("waitForBattleMove");
    }else{
        Synrec_BattleMoves_WinBattLog_EndActn.call(this, ...arguments);
    }
}

Synrec_BattleMoves_WinBattLog_UpdtWaitMode = Window_BattleLog.prototype.updateWaitMode;
Window_BattleLog.prototype.updateWaitMode = function() {
    if(this._waitMode == 'battleMove'){
        if(this.battleMoveWait()){
            return true;
        }
    }
    return Synrec_BattleMoves_WinBattLog_UpdtWaitMode.call(this, ...arguments);
}

Window_BattleLog.prototype.battleMoveWait = function(){
    const scene = SceneManager._scene;
    if(scene instanceof Scene_Battle){
        const spriteset = scene._spriteset;
        if(spriteset){
            const actors = spriteset._actorSprites;
            const enemies = spriteset._enemySprites;
            if(actors.concat(enemies).some((sprite)=>{
                return sprite.isMoving();
            }))return true;
            if(actors.concat(enemies).some((sprite)=>{
                const battler = sprite._battler;
                if(!battler)return false;
                if(battler.isDamagePopupRequested){
                    return battler.isDamagePopupRequested();
                }
            }))return true;
        }
    }
    if(this._syn_battle_motion > 0 && !isNaN(this._syn_battle_motion)){
        this._syn_battle_motion--;
        return true;
    }
    return false;
}

Window_BattleLog.prototype.waitForBattleMove = function(){
    this.setWaitMode('battleMove');
    this._syn_battle_motion = 24;
}

Window_BattleLog.prototype.performSynrecBattleMotion = function(user, motion){
    if(user.requestMotion){
        user.requestMotion(motion);
    }
}

Window_BattleLog.prototype.performSynrecBattleMove = function(subject, tx, ty){
    const scene = SceneManager._scene;
    if(scene instanceof Scene_Battle){
        const spriteset = scene._spriteset;
        if(spriteset){
            const actors = spriteset._actorSprites;
            const enemies = spriteset._enemySprites;
            const sprite = subject.isActor() ? actors.find((sprite)=>{
                return sprite._battler == subject;
            }) : subject.isEnemy() ? enemies.find((sprite)=>{
                return sprite._battler == subject;
            }) : null
            if(sprite){
                const sx = sprite._homeX;
                const sy = sprite._homeY;
                const dx = tx - sx;
                const dy = ty - sy;
                const spd = sprite.motionSpeed ? sprite.motionSpeed() * 2 : 24;
                sprite.startMove(dx, dy, spd);
                sprite._battle_moved = true;
            }
        }
    }
}

Window_BattleLog.prototype.performSynrecBattleMoveReturn = function(subject, tx, ty){
    const scene = SceneManager._scene;
    if(scene instanceof Scene_Battle){
        const spriteset = scene._spriteset;
        if(spriteset){
            const actors = spriteset._actorSprites;
            const enemies = spriteset._enemySprites;
            const sprite = subject.isActor() ? actors.find((sprite)=>{
                return sprite._battler == subject;
            }) : subject.isEnemy() ? enemies.find((sprite)=>{
                return sprite._battler == subject;
            }) : null
            if(sprite){
                const sx = sprite.x;
                const sy = sprite.y;
                const dx = sx - tx;
                const dy = sy - ty;
                const spd = sprite.motionSpeed ? sprite.motionSpeed() * 2 : 24;
                sprite.startMove(-dx, -dy, spd);
                this.push("performSynrecBattleMotion", subject, 'wait');
                delete subject._need_return;
            }
        }
    }
}

Synrec_BattleMoves_SprtsetBatt_Updt = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    Synrec_BattleMoves_SprtsetBatt_Updt.call(this, ...arguments);
    this.updateBattlersLayer();
}

Spriteset_Battle.prototype.updateBattlersLayer = function(){
    const field = this._battleField;
    const childs = field.children;
    const index_add = 0//childs.indexOf(this._back2Sprite);
    const battler_sprites = this._actorSprites.concat(this._enemySprites);
    battler_sprites.forEach((sprite)=>{
        if(!sprite._battler)return;
        const cur_index = childs.indexOf(sprite);
        const cur_layer = sprite.y;
        let index = cur_index;
        for(let i = 0; i < childs.length; i++){
            const child = childs[i];
            if(child instanceof Sprite_Battler && child != sprite){
                const child_index = childs.indexOf(child);
                const child_layer = child.y;
                if(
                    (
                        child_layer > cur_layer && 
                        child_index < cur_index
                    )
                ){
                    index = child_index;
                }
                if(
                    (
                        child_layer < cur_layer && 
                        child_index > cur_index
                    )
                ){
                    index = child_index;
                }
            }
        }
        const sorted_battlers = battler_sprites.sort((a, b)=>{
            if (a.y !== b.y) {
                return a.y - b.y;
            } else {
                return b.spriteId - a.spriteId;
            }
        })
        battler_sprites.forEach((sprite)=>{
            if(sprite.parent){
                sprite.parent.removeChild(sprite);
            }
        })
        while(sorted_battlers.length > 0){
            const sprite = sorted_battlers.pop();
            field.addChildAt(sprite, index_add);
        }
    })
}