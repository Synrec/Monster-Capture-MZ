/*:
 * @author Synrec/Kylestclr
 * @plugindesc v1.0 Backs up plugin configurations in the event a modification occurs.
 * @url https://synrec.itch.io/
 * @target MZ
 * 
 * @help
 * Plugin must be loaded absolutely last.
 * 
 * Plugin data is automatically backed up once Game_Temp is
 * initialized. This backup file may be found in the dir:
 * > `./js/plugins/`
 * With the file name: "plugin_backup_auto"
 * 
 * If you wish to do a manual backup, you may use the
 * script call:
 * > $gameTemp.executePluginBackup()
 * 
 * The above script call will save the plugin parameter
 * configurations into the directiory:
 * > `./js/plugins/`
 * With the file name: "plugin_backup_user"
 * 
 * This file will only be overwritten when the user 
 * executes the script call and as such it is a secure
 * backup.
 * 
 * In the event you wish to overwrite your "plugins.js" file
 * there are two script calls you may use:
 * 1) $gameTemp.executePluginOverwriteAuto();
 * > This will overwrite the plugins javascript file with auto
 * backup data.
 * 2) $gameTemp.executePluginOverwriteManual();
 * > This will overwrite the plugins javascript file with user
 * backup data.
 * 
 * Note: You must close the RPG Maker project before executing
 * overwrite function.
 * 
 * On any overwrite script call, if not existing, a backup file
 * will be created in `./js/plugins/` with the filename: "plugins_BACKUP.js"
 * 
 * 
 * If you wish to update the backup, you must manually delete this file.
 * If you know javascript, you may edit this plugin to remove this
 * safety feature. Know that you do this at your own risk.
 * 
 */

const Synrec_Plugin_Backup = {};
Synrec_Plugin_Backup.Plugin = PluginManager.parameters(`Synrec_Plugin_Backup`);

function EXECUTE_SYNREC_PLUGIN_BACKUP(auto){
    const file_system = require(`fs`);

    const Syn_Backup = {};
    const parameters = PluginManager._parameters;

    const names = Object.keys(parameters);
    for(const name of names){
        const parameter = parameters[name];
        Syn_Backup[name] = (parameter);
    }
    const backup_path = auto ? `./js/plugin_backup_auto.json` : `./js/plugin_backup_user.json`;
    const backup_type = auto ? `<AUTOMATIC BACKUP>` : `<USER BACKUP>`;

    function Perform_Backup(){
        const backup_exists = file_system.existsSync(backup_path);
        if(backup_exists){
            const backup_file = file_system.readFileSync(backup_path, 'utf8');
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
                                ${backup_type}
                                Plugin: ${c_name} has changed parameters!
                                ${data_name} has modified plugin parameter data!
                                ${old_data[data_name]} 
                                Has Changed To
                                ${cur_data[data_name]}
                                `
                            )
                            old_data[data_name] = cur_data[data_name];
                        }
                    }
                }else{
                    parsed_backup[c_name] = Syn_Backup[c_name];
                }
            }
            file_system.writeFileSync(backup_path, `${JSON.stringify(parsed_backup)}`, (e)=>{
                console.error(`Failed to overwrite backup file.`)
            });
        }else{
            const backup_file = Syn_Backup;
            file_system.writeFileSync(backup_path, `${JSON.stringify(backup_file)}`, (e)=>{
                console.error(`Failed to create backup file.`)
            });
        }
    }
    Perform_Backup();
}

function EXECUTE_PLUGINS_OVERWRITE(auto){
    const file_system = require(`fs`);
    const backup_path = auto ? `./js/plugin_backup_auto.json` : `./js/plugin_backup_user.json`;
    const backup_exists = file_system.existsSync(backup_path);
    if(backup_exists){
        const backup_file = file_system.readFileSync(backup_path, 'utf8');
        const parsed_backup = JSON.parse(backup_file);
        const plugin_file_path = `./js/plugins.js`;
        const plugins_exists = file_system.existsSync(plugin_file_path);
        if(plugins_exists){
            const plugin_file = file_system.readFileSync(plugin_file_path, 'utf8');
            const plugin_backup_exists = file_system.existsSync(`./js/plugins_BACKUP.js`);
            if(!plugin_backup_exists){
                file_system.writeFileSync(`./js/plugins_BACKUP.js`, plugin_file, (e)=>{
                    throw new Error(`Failed to create backup plugin file. ${e}`)
                });
            }
            const plugin_array_str = plugin_file.substring(plugin_file.indexOf('['));
            const plugin_array = plugin_array_str.split(';')[0];
            const parsed_plugins = JSON.parse(plugin_array);
            const mapped_changed_plugins = parsed_plugins.map((plugin)=>{
                const name = plugin.name.toLowerCase();
                const backup_data = parsed_backup[name];
                console.log(backup_data)
                if(backup_data){
                    plugin.parameters = backup_data;
                }
                return plugin;
            })
            const new_plugin_str = plugin_file.split('[', 1)[0];
            let new_plugin_params = new_plugin_str.concat('[');
            let index = 0;
            mapped_changed_plugins.forEach((new_plugin)=>{
                new_plugin_params = new_plugin_params.concat('\n');
                new_plugin_params = new_plugin_params.concat(JSON.stringify(new_plugin));
                index++;
                if(index < mapped_changed_plugins.length){
                    new_plugin_params = new_plugin_params.concat(',');
                }
            })
            new_plugin_params = new_plugin_params.concat('\n];');
            file_system.writeFileSync(plugin_file_path, new_plugin_params, (e)=>{
                console.error(`Failed to create plugin file.`)
            });
        }
    }else{
        console.error(`Failed to overwrite plugins.js, no backup file found!`);
    }
}

Syn_Backup_GmTmp_Init = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    Syn_Backup_GmTmp_Init.call(this);
    const DEBUG_MODE = Utils.isOptionValid("test");
    if(DEBUG_MODE)EXECUTE_SYNREC_PLUGIN_BACKUP(true);
}

Game_Temp.prototype.executePluginBackup = function(){
    const DEBUG_MODE = Utils.isOptionValid("test");
    if(DEBUG_MODE)EXECUTE_SYNREC_PLUGIN_BACKUP();
}

Game_Temp.prototype.executePluginOverwriteAuto = function(){
    const DEBUG_MODE = Utils.isOptionValid("test");
    if(DEBUG_MODE)EXECUTE_PLUGINS_OVERWRITE(true);
}

Game_Temp.prototype.executePluginOverwriteManual = function(){
    const DEBUG_MODE = Utils.isOptionValid("test");
    if(DEBUG_MODE)EXECUTE_PLUGINS_OVERWRITE();
}