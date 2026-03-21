const { QuadMesh } = require("three/webgpu");

const Synrec_Master_Editor = {};
Synrec_Master_Editor.src = `js/plugins/data`;
Synrec_Master_Editor.load_count = 0;
Synrec_Master_Editor.error_count = 0;

function OBJECT_JSON_PARSER(json){
    const obj = {};
    const keys = Object.keys(json);
    keys.forEach((key)=>{
        const data = json[key];
        if(data.gen){
            if(data.list){
                obj[key] = data.list.map((arr_itm)=>{
                    if(typeof arr_itm == 'string'){
                        return arr_itm;
                    }
                    return OBJECT_JSON_PARSER(arr_itm);
                })
            }else{
                if(typeof data.gen == 'string'){
                    return data.gen;
                }else{
                    return OBJECT_JSON_PARSER(data.gen);
                }
            }
        }else{
            obj[key] = data.value;
        }
    })
    return JSON.stringify(obj);
}

function CONVERT_EDITOR_JSON_TO_PARAMS(json){
    const obj = {};
    const keys = Object.keys(json);
    keys.forEach((key)=>{
        const data = json[key];
        if(data.gen){
            if(data.list){
                obj[key] = JSON.stringify(
                    data.list.map((arr_itm)=>{
                        const gen = arr_itm.gen;
                        if(gen.no_struct){
                            return gen.value;
                        }else{
                            const converted_gen = CONVERT_EDITOR_JSON_TO_PARAMS(gen);
                            return converted_gen;
                        }
                    })
                )
            }else{
                const no_struct = data.gen.no_struct;
                if(no_struct){
                    const value = data.gen.value;
                    if(value){
                        obj[key] = value.toString();
                    }else{
                        obj[key] = value;
                    }
                }else{
                    obj[key] = CONVERT_EDITOR_JSON_TO_PARAMS(data.gen);
                }
            }
        }else{
            if(data.value){
                obj[key] = data.value.toString();
            }else{
                obj[key] = data.value;
            }
        }
    })
    return JSON.stringify(obj);
}

async function GET_MASTER_EDITOR_PARAMETERS(file_name, original_parameters) {
    Synrec_Master_Editor.plugin_data[file_name] = {loaded:false, data:null};
    const src = Synrec_Master_Editor.src;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${src}/${file_name}.json`);
    xhr.onload = async function(){
        const res_string = xhr.responseText;
        const res_json = JSON.parse(res_string);
        const param_str = CONVERT_EDITOR_JSON_TO_PARAMS(res_json);
        Synrec_Master_Editor.plugin_data[file_name].data = param_str;
        const parsed_editor_parameters = JSON.parse(param_str);
        PluginManager.setParameters(file_name, parsed_editor_parameters);
        await RELOAD_RPG_MAKER_PLUGINS();
        Synrec_Master_Editor.load_count++;
    }
    xhr.onerror = async function() {
        Synrec_Master_Editor.load_count++;
    }
    await xhr.send();
}

async function RELOAD_RPG_MAKER_PLUGINS(){
    const scene = SceneManager._scene;
    if(scene){
        scene.synrecPluginReload();
    }else{
        requestAnimationFrame(RELOAD_RPG_MAKER_PLUGINS);
    }
}

async function LOAD_MASTER_EDITOR_SETTINGS(){
    Synrec_Master_Editor.load_count = 0;
    Synrec_Master_Editor.plugin_data = {};
    const plugin_list = PluginManager._scripts.map((name)=>{
        return name.toLowerCase();
    });
    const parameters = PluginManager._parameters;
    plugin_list.forEach(async (file_name)=>{
        const original_parameters = parameters[file_name];
        await GET_MASTER_EDITOR_PARAMETERS(file_name, original_parameters);
    })
}

LOAD_MASTER_EDITOR_SETTINGS();

async function INITIALIZE_MASTER_EDITOR(){
    const plugin_count = PluginManager._scripts.length;
    const loaded = Synrec_Master_Editor.load_count;
    if(loaded >= plugin_count){
        TriggerRefresh();
    }else{
        requestAnimationFrame(INITIALIZE_MASTER_EDITOR);
    }
}

INITIALIZE_MASTER_EDITOR();

function TriggerRefresh(){
    if(typeof SceneManager == 'undefined'){
        console.error(`SceneManager is not defined. Likely called too early or erased.`);
        return;
    }
    LOAD_MASTER_EDITOR_SETTINGS();
    const scene = SceneManager._scene;
    if(scene){
        scene.synrecPluginReload();
    }
}

Scene_Base.prototype.reloadSynScene = function(){
    this.children.forEach((child)=>{
        child.parent.removeChild(child);
        if(child.destroy){
            child.destroy();
        }
    })
    if($gameParty){
        if($gameParty.inBattle()){
            $gameParty.allMembers().concat($gameTroop.members()).forEach((mem)=>{
                mem.recoverAll();
                mem.refresh();
            })
            $gameTroop._turnCount = 0;
        }
    }
    this.initialize();
    this.create();
    Graphics.startLoading();
}

Scene_Base.prototype.synrecPluginReload = function(){
    //Call the alias function after your own function for proper reload.
    this.reloadSynScene();
    /**
     * Alias this function in your own plugin.
     * On call, it must reload the plugin parameters into the variable or object
     * you have set for your plugin.
     * 
     * If not aliased, if the plugin parameters are directly referenced, it will 
     * use the editor parameters regardless
     */
}