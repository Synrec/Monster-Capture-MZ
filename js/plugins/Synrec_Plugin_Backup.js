/*:
 * @author Synrec/Kylestclr
 * @plugindesc v1.0 Backs up plugin configurations in the event a modification occurs.
 * @url https://synrec.itch.io/
 * @target MZ
 * 
 * @help
 * This plugin records plugin parameters on project boot and
 * saves them to a file in your project save folder.
 * 
 * Plugin must be loaded absolutely last.
 * 
 */

function EXECUTE_SYNREC_PLUGIN_BACKUP(auto){
    const file_system = require(`fs`);

    const Syn_Backup = {};
    const parameters = PluginManager._parameters;

    const names = Object.keys(parameters);
    for(const name of names){
        const parameter = parameters[name];
        Syn_Backup[name] = (parameter);
    }
    function Perform_Auto_Backup(){
        const backup_exists = file_system.existsSync(`./js/plugin_backup_auto.json`);
        if(backup_exists){
            const backup_file = file_system.readFileSync(`./js/plugin_backup_auto.json`, 'utf8');
            const parsed_backup = JSON.parse(backup_file);
            const current_names = Object.keys(Syn_Backup);
            const backup_names = Object.keys(parsed_backup);
            for(const c_name of current_names){
                if(backup_names.includes(c_name)){
                    const cur_data = Syn_Backup[c_name];
                    const cur_data_names = Object.keys(cur_data);
                    const old_data = parsed_backup[c_name];
                    for(const data_name of cur_data_names){
                        const old_str = JSON.stringify(old_data[data_name]);
                        const cur_str = JSON.stringify(cur_data[data_name]);
                        if(old_str != cur_str){
                            console.log(
                                `
                                Plugin: ${c_name} has changed parameters!
                                ${data_name} has modified plugin parameter data!
                                ${old_data[data_name]} 
                                Has Changed To
                                ${cur_data[data_name]}
                                `
                            )
                            old_data[data_name] = cur_data[data_name];
                            // console.log(`Plugin: ${c_name} has changed parameters!`);
                            // console.log(`${data_name} has modified plugin parameter data!`);
                            // console.log(old_data[data_name]);
                            // console.log(cur_data[data_name]);
                        }
                    }
                }else{
                    parsed_backup[c_name] = Syn_Backup[c_name];
                }
            }
            file_system.writeFileSync(`./js/plugin_backup_auto.json`, `${JSON.stringify(parsed_backup)}`, (e)=>{
                console.error(`Failed to overwrite auto backup file.`)
            });
        }else{
            const backup_file = Syn_Backup;
            file_system.writeFileSync(`./js/plugin_backup_auto.json`, `${JSON.stringify(backup_file)}`, (e)=>{
                console.error(`Failed to create auto backup file.`)
            });
        }
    }

    function Perform_Manual_Backup(){
        const backup_exists = file_system.existsSync(`./js/plugin_backup_auto.json`);
        if(backup_exists){
            const backup_file = file_system.readFileSync(`./js/plugin_backup_auto.json`, 'utf8');
            const parsed_backup = JSON.parse(backup_file);
            const current_names = Object.keys(Syn_Backup);
            const backup_names = Object.keys(parsed_backup);
            for(const c_name of current_names){
                if(backup_names.includes(c_name)){
                    const cur_data = Syn_Backup[c_name];
                    const cur_data_names = Object.keys(cur_data);
                    const old_data = parsed_backup[c_name];
                    for(const data_name of cur_data_names){
                        const old_str = JSON.stringify(old_data[data_name]);
                        const cur_str = JSON.stringify(cur_data[data_name]);
                        if(old_str != cur_str){
                            console.log(
                                `
                                Plugin: ${c_name} has changed parameters!
                                ${data_name} has modified plugin parameter data!
                                ${old_data[data_name]} 
                                Has Changed To
                                ${cur_data[data_name]}
                                `
                            )
                            old_data[data_name] = cur_data[data_name];
                            // console.log(`Plugin: ${c_name} has changed parameters!`);
                            // console.log(`${data_name} has modified plugin parameter data!`);
                            // console.log(old_data[data_name]);
                            // console.log(cur_data[data_name]);
                        }
                    }
                }else{
                    parsed_backup[c_name] = Syn_Backup[c_name];
                }
            }
            file_system.writeFileSync(`./js/plugin_backup_auto.json`, `${JSON.stringify(parsed_backup)}`, (e)=>{
                console.error(`Failed to overwrite auto backup file.`)
            });
        }else{
            const backup_file = Syn_Backup;
            file_system.writeFileSync(`./js/plugin_backup_auto.json`, `${JSON.stringify(backup_file)}`, (e)=>{
                console.error(`Failed to create auto backup file.`)
            });
        }
    }

    if(auto){
        Perform_Auto_Backup();
    }else{
        Perform_Manual_Backup();
    }
}

Syn_Backup_GmTmp_Init = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    Syn_Backup_GmTmp_Init.call(this);
    const DEBUG_MODE = Utils.isOptionValid("test");
    if(DEBUG_MODE)EXECUTE_SYNREC_PLUGIN_BACKUP();
}