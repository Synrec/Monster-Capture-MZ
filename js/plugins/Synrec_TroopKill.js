/*:
 * @author Synrec/Kylestclr
 * @plugindesc v1.0 Press button, kill enemy troop.
 * @url https://synrec.itch.io
 * 
 * @target MZ
 * 
 * @help
 * Press set button in plugin parameters.
 * Kill off enemy troop.
 * 
 * Default key is F
 * 
 * @param Kill Switch
 * @desc Javascript keycode for button kill
 * @type number
 * @default 70
 * 
 */

const Syn_TrpKill = {};
Syn_TrpKill.Plugin = PluginManager.parameters(`Synrec_TroopKill`);
Syn_TrpKill.KILL_BTN = eval(Syn_TrpKill.Plugin['Kill Switch']);

Syn_TrpKill_Inpt_KeyDn = Input._onKeyDown;
Input._onKeyDown = function(event) {
    if(event.keyCode == Syn_TrpKill.KILL_BTN){
        $gameTroop.members().forEach((member)=>{
            member.die();
            member.refresh();
            if(member.performCollapse)member.performCollapse();
        })
        event.preventDefault();
    }
    Syn_TrpKill_Inpt_KeyDn.call(this, event);
}