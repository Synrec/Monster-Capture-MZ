/*:@author Synrec 
 * @target MZ
 *
 * @plugindesc v1.3 Enables gender traits
 *
 * @help
 * This plugin follows the permissions outlined in Synrec_MC_Core.js
 * 
 * Modifies the EX and SP parameter calculation for actors based on their gender.
 * 
 * @param Gender Hex Blend
 * @desc Changes the color blend of named gender traits
 * @type struct<gendHex>[]
 * @default[]
 */

 /*~struct~gendHex:
 * @param Gender Name
 * @type text
 * @desc Name of gender
 *
 * @param Hex Color
 * @desc Hex Color Code for color blend
 * @type text
 * @default #000000
 * 
 * @param Color Alpha
 * @desc Alpha of the color blend
 * @type number
 * @decimals 2
 * @default 0.5
 * @min 0
 * @max 1
 * 
 * @param Apply Filter
 * @desc Apply a PIXI Filter.
 * @type select[]
 * @default []
 * @option blur
 * @option noise
 * @option color
 * 
 * @param Blur Filter Setting
 * 
 * @param Blur Strength
 * @desc Strength of the blur filter
 * @type number
 * @default 8
 * @parent Blur Filter Setting
 * 
 * @param Blur Quality
 * @desc Quality of the blur filter
 * @type number
 * @default 4
 * @parent Blur Filter Setting
 * 
 * @param Noise Filter Setting
 * 
 * @param Noise Intensity
 * @desc Intensity of the noise.
 * @type number
 * @decimals 3
 * @default 0.5
 * @min 0
 * @max 1
 * @parent Noise Filter Setting
 * 
 * @param Noise Seed
 * @desc Seed of the noise.
 * @type text
 * @default Math.random()
 * @min 0
 * @parent Noise Filter Setting
 * 
 * @param Color Filter Setting
 * 
 * @param Color Method
 * @desc Method to apply to the color filter. Applies Color Matrix Settings.
 * @type select
 * @option BlackAndWhite
 * @option Brightness
 * @option Contrast
 * @option Hue
 * @option LSD
 * @option Negative
 * @option Night
 * @option Predator
 * @option Saturate
 * @option Sepia
 * @option Tint
 * @option ToBGR
 * @parent Color Filter Setting
 * 
 * @param Color Brightness
 * @desc Brightness value for Brightness Method. 1 = Default.
 * @type number
 * @default 1
 * @decimals 3
 * @min 0
 * @max 2
 * @parent Color Filter Setting
 * 
 * @param Color Contrast
 * @desc Contrast value for Contrast Method. 1 = Default.
 * @type number
 * @default 1
 * @decimals 3
 * @min 0
 * @max 2
 * @parent Color Filter Setting
 * 
 * @param Color Hue
 * @desc Hue value for Hue Method. 0 = Default.
 * @type number
 * @default 0
 * @min 0
 * @max 359
 * @parent Color Filter Setting
 * 
 * @param Color Night
 * @desc Night value for Night Method. 0 = Default.
 * @type number
 * @decimals 3
 * @default 0
 * @min 0
 * @max 1
 * @parent Color Filter Setting
 * 
 * @param Color Predator
 * @desc Night value for Night Method. 0 = Default.
 * @type number
 * @decimals 3
 * @default 0
 * @min 0
 * @max 1
 * @parent Color Filter Setting
 * 
 * @param Color Saturate
 * @desc Night value for Night Method. 0 = Default.
 * @type number
 * @decimals 3
 * @default 0
 * @min 0
 * @max 1
 * @parent Color Filter Setting
 * 
 * @param Color Tint
 * @desc Night value for Night Method. Uses Hex Value eg: 0x000000.
 * @type text
 * @default 0x000000
 * @parent Color Filter Setting
 * 
 * @param Method Alpha
 * @desc Alpha Value For Filter.
 * @type number
 * @decimals 3
 * @default 1
 * @min 0
 * @max 1
 * @parent Color Filter Setting
 * 
 */

if(SynrecMC){
    SynrecMC.GenderTraits = {};
    SynrecMC.GenderTraits.version = '1.3';
}else{
    throw new Error("Core Plugin Missing.");
}

SynrecMC.GenderTraits.Plugins = PluginManager.parameters('Synrec_MC_GenderTraits');
SynrecMC.GenderTraits.gendColor = JSON.parse(SynrecMC.GenderTraits.Plugins['Gender Hex Blend']);
for(gc = 0; gc < SynrecMC.GenderTraits.gendColor.length; gc++){
    SynrecMC.GenderTraits.gendColor[gc] = JSON.parse(SynrecMC.GenderTraits.gendColor[gc]);
    SynrecMC.GenderTraits.gendColor[gc]['Color Alpha'] = eval(SynrecMC.GenderTraits.gendColor[gc]['Color Alpha']);
    SynrecMC.GenderTraits.gendColor[gc]['Apply Filter'] = JSON.parse(SynrecMC.GenderTraits.gendColor[gc]['Apply Filter']);
    SynrecMC.GenderTraits.gendColor[gc]['Blur Strength'] = eval(SynrecMC.GenderTraits.gendColor[gc]['Blur Strength']);
    SynrecMC.GenderTraits.gendColor[gc]['Blur Quality'] = eval(SynrecMC.GenderTraits.gendColor[gc]['Blur Quality']);
    SynrecMC.GenderTraits.gendColor[gc]['Noise Intensity'] = eval(SynrecMC.GenderTraits.gendColor[gc]['Noise Intensity']);
    SynrecMC.GenderTraits.gendColor[gc]['Noise Seed'] = eval(SynrecMC.GenderTraits.gendColor[gc]['Noise Seed']);
    SynrecMC.GenderTraits.gendColor[gc]['Color Brightness'] = eval(SynrecMC.GenderTraits.gendColor[gc]['Color Brightness']);
}

Game_BattlerBase.prototype.getGenderParamsX = function(xparamId){
    const genderName = this._gender;
    const genderData = () =>{
        let genders = SynrecMC.genders;
        for(genIdx = 0; genIdx < genders.length; genIdx++){
            if(genders[genIdx]['Gender Name'] == genderName){
                return genders[genIdx];
            }
        }
        return 0;
    };
    switch(xparamId){
        case 0:
            return genderData()['Hit Rate'];
        case 1:
            return genderData()['Evasion Rate'];
        case 2:
            return genderData()['Critical Rate'];
        case 3:
            return genderData()['Critical Evasion'];
        case 4:
            return genderData()['Magic Evasion'];
        case 5:
            return genderData()['Magic Reflection'];
        case 6:
            return genderData()['Counter Attack'];
        case 7:
            return genderData()['HP Regen'];
        case 8:
            return genderData()['MP Regen'];
        case 9:
            return genderData()['TP Regen'];
    }
}

Game_BattlerBase.prototype.getGenderParamsS = function(sparamId){
    const genderName = this._gender;
    const genderData = () =>{
        let genders = SynrecMC.genders;
        for(genIdx = 0; genIdx < genders.length; genIdx++){
            if(genders[genIdx]['Gender Name'] == genderName){
                return genders[genIdx];
            }
        }
        return 0;
    };
    switch(sparamId){
        case 0:
            return genderData()['Target Rate'];
        case 1:
            return genderData()['Guard Effect'];
        case 2:
            return genderData()['Recovery Effect'];
        case 3:
            return genderData()['Pharmacology'];
        case 4:
            return genderData()['MP Cost Rate'];
        case 5:
            return genderData()['TP Charge Rate'];
        case 6:
            return genderData()['Physical Damage'];
        case 7:
            return genderData()['Magical Damage'];
        case 8:
            return genderData()['Floor Damage'];
        case 9:
            return genderData()['Experience'];
    }
}

SynrecSCGmBattBseXparam = Game_BattlerBase.prototype.xparam;
Game_BattlerBase.prototype.xparam = function(xparamId) {
    const baseTrait = SynrecSCGmBattBseXparam.call(this, xparamId);
    let gendTrait = this.getGenderParamsX(xparamId);
    if(isNaN(gendTrait))gendTrait = 0;
    const sumTrait = baseTrait + gendTrait;
    return sumTrait;
}

SynrecSCGmBattBseSparam = Game_BattlerBase.prototype.sparam;
Game_BattlerBase.prototype.sparam = function(sparamId) {
    const baseTrait = SynrecSCGmBattBseSparam.call(this, sparamId);
    let gendTrait = this.getGenderParamsS(sparamId);
    if(isNaN(gendTrait))gendTrait = 1;
    const piTrait = baseTrait * gendTrait;
    return piTrait;
}

SynrecMCSprtBattSetBattler = Sprite_Battler.prototype.setBattler;
Sprite_Battler.prototype.setBattler = function(battler) {
    SynrecMCSprtBattSetBattler.call(this, battler);
    if(battler)this.setGendHex(battler);
    if(battler)this.setGendFilter(battler);
}

Sprite_Battler.prototype.setGendHex = function(battler){
    if(battler.isActor() && this._mainSprite){
        const gender = battler._gender;
        if(gender){
            const color = this.getGendColData(gender);
            if(color){
                const value = color['Hex Color'];
                const alpha = color['Color Alpha'];
                const redVal = parseInt(`${value[1]}${value[2]}`, 16);
                const grnVal = parseInt(`${value[3]}${value[4]}`, 16);
                const bluVal = parseInt(`${value[5]}${value[6]}`, 16);
                const alphaVal = 255 * alpha;
                this._mainSprite._blendColorGend = [redVal, grnVal, bluVal, alphaVal];
                this._mainSprite._blendColor = this._blendColorGend;
                this._updateColorFilter();
            }
        }
    }else if(battler.isEnemy()){
        const gender = battler._gender;
        if(gender){
            const color = this.getGendColData(gender);
            if(color){
                const value = color['Hex Color'];
                const alpha = color['Color Alpha'];
                const redVal = parseInt(`${value[1]}${value[2]}`, 16);
                const grnVal = parseInt(`${value[3]}${value[4]}`, 16);
                const bluVal = parseInt(`${value[5]}${value[6]}`, 16);
                const alphaVal = 255 * alpha;
                this._blendColorGend = [redVal, grnVal, bluVal, alphaVal];
                this._blendColor = this._blendColorGend;
                this._updateColorFilter();
            }
        }
    }
}

Sprite_Battler.prototype.setGendFilter = function(battler){
    if(battler.isActor() && this._mainSprite){
        if(this._mainSprite.filters){
            if(this._mainSprite.filters.length > 1){
                this._mainSprite.filters = [];
            }
        }else this._mainSprite.filters = [];
        const gender = battler._gender;
        if(gender){
            const filters = this.getGendFilterData(gender);
            if(!filters)return;
            const applyFilters = filters['Apply Filter'];
            const blurStr = filters['Blur Strength'];
            const blurQty = filters['Blur Quality'];
            const noiseInt = filters['Noise Intensity'];
            const noiseSed = filters['Noise Seed'];
            if(applyFilters){
                for(filt = 0; filt < applyFilters.length; filt++){
                    var filterSelc = applyFilters[filt];
                    switch(filterSelc){
                        case 'blur':
                            this._mainSprite.filters.push(new PIXI.filters.BlurFilter(blurStr, blurQty));
                            break;
                        case 'noise':
                            this._mainSprite.filters.push(new PIXI.filters.NoiseFilter(noiseInt, noiseSed));
                            break;
                        case 'color':
                            this._mainSprite.filters.push(new PIXI.filters.ColorMatrixFilter());
                            var index = this.filters.length - 1;
                            this.applyColorMatrixMethod(index, filters);
                    }
                }
            }else{
                this._mainSprite.filters = [];
            }
        }
    }else if(battler.isEnemy()){
        if(this.filters){
            if(this.filters.length > 1){
                this.filters = [this.filters[0]];
            }
        }
        const gender = battler._gender;
        if(gender){
            const filters = this.getGendFilterData(gender);
            const applyFilters = filters['Apply Filter'];
            const blurStr = filters['Blur Strength'];
            const blurQty = filters['Blur Quality'];
            const noiseInt = filters['Noise Intensity'];
            const noiseSed = filters['Noise Seed'];
            if(applyFilters){
                for(filt = 0; filt < applyFilters.length; filt++){
                    var filterSelc = applyFilters[filt];
                    switch(filterSelc){
                        case 'blur':
                            this.filters.push(new PIXI.filters.BlurFilter(blurStr, blurQty));
                            break;
                        case 'noise':
                            this.filters.push(new PIXI.filters.NoiseFilter(noiseInt, noiseSed));
                            break;
                        case 'color':
                            this.filters.push(new PIXI.filters.ColorMatrixFilter());
                            var index = this.filters.length - 1;
                            this.applyColorMatrixMethod(index, filters);
                    }
                }
            }else{
                this.filters = [this.filters[0]];
            }
        }
    }
}

Sprite_Battler.prototype.applyColorMatrixMethod = function(index, filterData){
    let filter =this._battler.isActor() ? this._mainSprite.filters[index] : this.filters[index];
    const method = filterData['Color Method'];
    switch(method){
        case 'BlackAndWhite':
            filter.blackAndWhite();
            break;
        case 'Brightness':
            filter.brightness(filterData['Color Brightness']);
            break;
        case 'Contrast':
            filter.contrast(filterData['Color Contrast']);
            break;
        case 'Hue':
            filter.hue(filterData['Color Hue']);
            break;
        case 'LSD':
            filter.lsd();
            break;
        case 'Negative':
            filter.negative();
            break;
        case 'Night':
            filter.night(filterData['Color Night']);
            break;
        case 'Predator':
            filter.predator(filterData['Color Predator']);
            break;
        case 'Saturate':
            filter.predator(filterData['Color Saturate']);
            break;
        case 'Sepia':
            filter.sepia();
            break;
        case 'Tint':
            filter.sepia(filterData['Color Tint']);
            break;
        case 'ToBGR':
            filter.toBGR();
            break;
    }
    filter.alpha = !isNaN(filterData['Method Alpha']) ? eval(filterData['Method Alpha']) : 1;
}

Sprite_Battler.prototype.getGendColData = function(gender){
    const allGends = SynrecMC.GenderTraits.gendColor;
    for(qc = 0; qc < allGends.length; qc++){
        var gend = allGends[qc];
        var name = gend['Gender Name'].toLowerCase();
        if(name == gender){
            return gend;
        }
    }
}

Sprite_Battler.prototype.getGendFilterData = function(gender){
    const allGends = SynrecMC.GenderTraits.gendColor;
    for(qc = 0; qc < allGends.length; qc++){
        var gend = allGends[qc];
        var name = gend['Gender Name'].toLowerCase();
        if(name == gender){
            return gend;
        }
    }
}

SynrecMCSprtBattUpdtSelcEffect = Sprite_Battler.prototype.updateSelectionEffect;
Sprite_Battler.prototype.updateSelectionEffect = function() {
    SynrecMCSprtBattUpdtSelcEffect.call(this)
    const target = this.mainSprite ? this.mainSprite() : this;
    if(this._blendColorGend){
        if (this._battler.isSelected()) {
            this._selectionEffectCount++;
            if (this._selectionEffectCount % 30 < 15) {
                target.setBlendColor([255, 255, 255, 255]);
            } else {
                target.setBlendColor(this._blendColorGend);
            }
        } else if (this._selectionEffectCount > 0) {
            this._selectionEffectCount = 0;
            target.setBlendColor(this._blendColorGend);
        }
        this._updateColorFilter();
    }
}

SynrecMCSprtEnemRvtNorm = Sprite_Enemy.prototype.revertToNormal;
Sprite_Enemy.prototype.revertToNormal = function() {
    SynrecMCSprtEnemRvtNorm.call(this);
    if(this._blendColorGend){
        this.setBlendColor(this._blendColorGend);
        this._updateColorFilter();
    }
}