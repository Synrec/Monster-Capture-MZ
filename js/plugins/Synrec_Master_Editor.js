
const Synrec_Master_Editor = {};
Synrec_Master_Editor.load_list = ["synrec_battlemovement","synrec_monstercapture"];
Synrec_Master_Editor.plugin_data = {};
Synrec_Master_Editor.src = `js/plugins/data`;

function OBJECT_JSON_PARSER(json){
    console.log(json);
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
            obj[key] = (data.value).toString();
        }
    })
    return obj;
}

async function GET_MASTER_EDITOR_PARAMETERS(file_name) {
    Synrec_Master_Editor.plugin_data[file_name] = {loaded:false, data:null};
    const src = Synrec_Master_Editor.src;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${src}/${file_name}.json`);
    xhr.onload = function(){
        console.log(xhr.responseText);
        const res_string = xhr.responseText;
        const res_json = JSON.parse(res_string);
        const param_str = CONVERT_EDITOR_JSON_TO_PARAMS(res_json);
        Synrec_Master_Editor.plugin_data[file_name].data = param_str;
    }
    await xhr.send();
}

async function LOAD_MASTER_EDITOR_SETTINGS(){
    const plugin_list = Synrec_Master_Editor.load_list;
    const parameters = PluginManager._parameters;
    plugin_list.forEach(async (file_name)=>{
        const original_parameters = parameters[file_name];
        const get_editor_parameters = await GET_MASTER_EDITOR_PARAMETERS(file_name);
        parameters[file_name] = get_editor_parameters || original_parameters;
    })
}

LOAD_MASTER_EDITOR_SETTINGS();