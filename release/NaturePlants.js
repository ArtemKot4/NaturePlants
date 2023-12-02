LIBRARY({
    name: "NaturePlants",
    version: 1,
    shared: true,
    api: "CoreEngine"
});
var PLANT = Block.createSpecialType({
    destroytime: 0,
    explosionres: 0,
    rendertype: 91,
    translucency: 1,
    material: 4,
});
var IC = {}; //Нужно будет класс для предмета потом в отдельный файл вынести.
var ModItem = /** @class */ (function () {
    function ModItem(id, name, texture, meta, stack) {
        this.id = id;
        this.name = name;
        this.texture = texture;
        this.meta = meta || 0;
        this.stack = stack || 64;
    }
    ModItem.prototype.create = function () {
        Item.createItem(this.id, this.name, { name: this.texture, meta: this.meta }, { stack: this.stack });
    };
    return ModItem;
}());
function ModBlock(id, description, type) {
    IDRegistry.genBlockID(id);
    Block.createBlock(id, description, (type = type || null));
}
var IContainer = /** @class */ (function () {
    function IContainer(name) {
        this.name = name;
        IC[this.name] = [];
    }
    IContainer.prototype.push = function (prototype) {
        IC[this.name].push(prototype);
    };
    ;
    ;
    IContainer.prototype.get = function (value) {
        for (var i in IC[this.name]) {
            return IC[this.name][i][value];
        }
    };
    ;
    IContainer.getForType = function (name, value) {
        for (var i in IC[name]) {
            return IC[name][i][value];
        }
    };
    return IContainer;
}());
var i;
var IPlants = new IContainer("plants");
var ITrees = new IContainer("trees");
var IFarmland = new IContainer("farmland");
var Agriculture;
(function (Agriculture) {
    Agriculture.plants = {
        tree: [],
        onGrass: [],
    };
    Agriculture.vanilla_plants = {
        item: [296, 361, 362, 391, 392, 457],
        block: [59, 104, 105, 141, 142, 244],
    };
    function place(item, place_block, isBlock) {
        Item.registerUseFunction(item, function (coords, item, block, player) {
            var region = BlockSource.getDefaultForActor(player);
            var place = coords.relative;
            if (block == isBlock) {
                region.setBlock(place.x, place.y, place.z, place_block);
            }
            else if (isBlock == undefined && block == VanillaBlockID["grass"]) {
                region.setBlock(place.x, place.y, place.z, place_block);
            }
            if (Game.getGameMode() != 1) {
                Entity.setCarriedItem(player, item.id, item.count - 1, item.data);
            }
        });
    }
    Agriculture.place = place;
    function seedRegistry(id, name, texture, meta, stack) {
        new ModItem("seed_" + id, name, texture, meta = meta || 0, stack = stack || 64);
    }
    Agriculture.seedRegistry = seedRegistry;
    function cropRegistry(id, name, texture, meta, stack, isFood) {
        if (isFood == true) {
            IDRegistry.genItemID("crop_" + id);
            Item.createFoodItem("crop_" + id, name, { name: "crop_" + texture, meta: meta }, { stack: stack });
        }
        else {
            new ModItem("crop_" + id, name, texture, meta, stack);
        }
    }
    Agriculture.cropRegistry = cropRegistry;
    function plantRegistry(id, texture, name, steps, farmland, count) {
        name = name || id[0].toUpperCase() + id.slice(1).replace(/_/g, " ").toString();
        var stads = [];
        for (i = 0; i < steps; i++) {
            stads.push({
                name: "plant_" + i + "_" + name,
                texture: [[texture.slice(0, texture.length - 2), i]],
                inCreative: false,
            });
        }
        Block.registerDropFunction("plant_" + id, function (coords, id, data, toolLevel, enchantData, item, region) {
            if (World.getBlock(coords.x, coords.y, coords.z).data == i) {
                return [[ItemID["crop_" + id], count, 0]];
            }
            else if (World.getBlock(coords.x, coords.y, coords.z).data < i) {
                return [[ItemID["seed_" + id], count, 0]];
            }
        });
        new ModBlock("plant_" + id, stads, PLANT);
        IPlants.push({
            seed: ItemID["seed_" + id],
            block: BlockID["plant_" + id],
            crop: ItemID["crop_" + id],
            steps: steps
        });
        if (farmland) {
            Agriculture.place(ItemID[id], BlockID["plant_" + id], BlockID["farmland_" + farmland]);
        }
    }
    Agriculture.plantRegistry = plantRegistry;
    function registry(id, name, stack, texture, meta, isFood, texture2, steps, farmland, count) {
        Agriculture.seedRegistry(id, name, texture, meta, stack);
        Agriculture.cropRegistry(id, name, texture, meta, stack, isFood);
        Agriculture.plantRegistry(id, texture2, name, steps, farmland, count);
    }
    Agriculture.registry = registry;
    function treeRegistry(id, texture, stack, name) {
        new ModItem(id, name, texture, 0, stack);
        new ModBlock("sapling_" + id, [
            {
                name: name,
                texture: [[texture, 0]],
                inCreative: true,
            },
        ]);
        Agriculture.place(ItemID[id], BlockID["sapling_" + id], BlockID[id]);
        ITrees.push({
            item: ItemID[id],
            block: BlockID["sapling_" + id],
        });
    }
    Agriculture.treeRegistry = treeRegistry;
    function farmlandRegistry(id, texture, wet) {
        wet = wet || [VanillaBlockID["water"], VanillaBlockID["flowing_water"]];
        texture = texture || id;
        var model = BlockRenderer.createModel();
        var render = new ICRender.Model();
        model.addBox(0, 0, 0, 1, 15 / 16, 1, texture, 0);
        var collision = new ICRender.CollisionShape();
        var entry = collision.addEntry();
        entry.addBox(0, 0, 0, 1, 15 / 16, 1);
        BlockRenderer.setCustomCollisionShape(BlockID[id], -1, collision);
        render.addEntry(model);
        BlockRenderer.setStaticICRender(BlockID[id], -1, render);
        new ModBlock("farmland_" + id, [{
                name: "Farmland " + id,
                texture: [[texture + "_dry", 0]],
                inCreative: true
            },
            {
                name: "Farmland " + id,
                texture: [[texture + "_wet", 0]],
                inCreative: false
            }
        ]);
        IFarmland.push({ block: BlockID["farmland_" + id], liquid: wet });
        for (var i in Agriculture.vanilla_plants) {
            Agriculture.place(Agriculture.vanilla_plants.item[i], Agriculture.vanilla_plants.block[i], BlockID[id]);
        }
    }
    Agriculture.farmlandRegistry = farmlandRegistry;
})(Agriculture || (Agriculture = {}));
Block.setAnimateTickCallback(IPlants.get("block"), function (x, y, z, id, data) {
    if (World.getBlock(x, y, z).data < IPlants.get("steps")) {
        World.setBlock(x, y, z, id, data + 1);
    }
});
Block.setAnimateTickCallback(IFarmland.get("block"), function (x, y, z, id, data) {
    var blck;
    for (var i = -4; i < 5; i++) {
        for (var l = -4; l < 5; l++) {
            blck = World.getBlock(x + i, y, z + l);
            if (blck in IFarmland.get("liquid") && World.getBlockData(x, y, z) == 0) {
                World.setBlock(x, y, z, id, data + 1);
            }
        }
    }
});
Callback.addCallback("ItemUse", function (coords, item, block, isExternal, player) {
    var coords = coords.relative;
    if (item.id == 351 &&
        block == IPlants.get("block") &&
        block.data < i) {
        World.setBlock(coords.x, coords.y, coords.z, IPlants.get("block"), block.data + 1);
    }
});
var Converter = {
    colorsArr: [
        "white_",
        "orange_",
        "magenta_",
        "light_blue_",
        "yellow_",
        "lime_",
        "pink_",
        "gray_",
        "light_gray_",
        "cyan_",
        "purple_",
        "blue_",
        "brown_",
        "green_",
        "red_",
        "black_",
    ],
    colored: [
        "_wool",
        "_stained_glass",
        "_stained_glass_panel",
        "_stained_hardened_clay",
        "_concrete",
        "_concretepowder",
    ],
    coralObj: {
        brain_coral: 2,
        bubble_coral: 3,
        fire_coral: 5,
        horn_coral: 4,
        tube_coral: 1,
    },
    coralArr: [
        "brain_coral",
        "bubble_coral",
        "fire_coral",
        "horn_coral",
        "tube_coral",
    ],
    logArr: ["oak", "spruce", "birch", "jungle", "acacia", "dark_oak"],
    stoneArr: [
        "stone",
        "granite",
        "polished_granite",
        "diorite",
        "polished_diorite",
        "andesite",
        "polished_andesite",
    ],
    skullArr: ["skeleton", "wither_skeleton", "zombie", "player", "creeper"],
    IDConverter: function (id) {
        var result = [];
        var bid = 0;
        var bdata = 0;
        if (id.includes("minecraft")) {
            for (var g in this.colored) {
                if (id.includes(this.colored[g])) {
                    for (var d in this.colorsArr) {
                        if (id.includes(this.colored[d])) {
                            bdata = d;
                        }
                    }
                    bid = this.colored[g].slice(1);
                }
                //alert("[Converter]: cannot to convert java id to bedrock id. Error 1")
            }
            for (var k in this.coralArr) {
                if (!bid && id.includes(this.coralArr[k])) {
                    bdata = this.coralObj[this.coralArr[k]];
                    if (id.includes("coral_fan")) {
                        bid = "coral_fan";
                    }
                    else if (id.includes("coral_block")) {
                        bid = "coral_block";
                    }
                    else if (id.includes("coral")) {
                        bid = "coral";
                    }
                }
            }
            if (id.includes("log")) {
                for (var c in this.logArr) {
                    if (id.includes(this.logArr[c])) {
                        if (this.logArr[c] == "acacia" || this.logArr[c] == "dark_oak") {
                            bid = "log2";
                            bdata = Number(c) - 4;
                        }
                        else {
                            bid = "log";
                            bdata = c;
                        }
                    }
                }
            }
            if (id.includes("sapling")) {
                for (var x in this.logArr) {
                    if (id.includes(this.logArr[x])) {
                        bid = "sapling";
                        bdata = x;
                    }
                }
            }
            if (id.includes("granite") ||
                id.includes("diorite") ||
                id.includes("andesite")) {
                for (var t in this.stoneArr) {
                    if (id.includes(this.stoneArr[t])) {
                        bid = "skull";
                        bdata = h;
                    }
                }
            }
            if (id.includes("red_sand")) {
                bid = "sand";
                bdata = 1;
            }
            if (id.includes("grass_block"))
                bid = "grass";
            if (id.includes("snow_block"))
                bid = "snow";
            if (id.includes("nether_bricks"))
                bid = "nether_brick";
            if (id.includes("lily_pad"))
                bid = "waterlily";
            if (id.includes("_skull") ||
                (id.includes("_head") && !id.includes("blank"))) {
                for (var h in this.skullArr) {
                    if (id.includes(this.skullArr[h])) {
                        bid = "skull";
                        bdata = h;
                    }
                }
            }
        }
        if (!bid && id.indexOf(":") > -1) {
            bid = id.slice(id.indexOf(":") + 1);
        }
        result = [bid, bdata];
        return result;
    },
    TagConverter: function (tag) {
        if (tag.indexOf(":") > 0) {
            tag = tag.slice(tag.indexOf(":") + 1);
        }
        if (tag.indexOf("/") > 0) {
            var fir = tag.slice(tag.indexOf("/") + 1, tag.indexOf("/") + tag.length);
            var sec = tag.slice(tag.length * -1, tag.indexOf("/") - 1);
            tag = fir + "_" + sec;
            return tag;
        }
    },
    RecipeConverter: function (folder) {
        //функция поддерживает только .json формат
        var recipe = FileTools.GetListOfFiles(folder, "json");
        for (var i in recipe) {
            var read = String(recipe[i]).split("/").pop().split(".")[0];
            var ebal = FileTools.ReadText(folder + read + ".json");
            var json = JSON.parse(ebal);
            var result = json.result.item;
            var count = json.result.count || 1;
            result = this.IDConverter(result);
            var date = result[1];
            result = result[0];
            if (result in VanillaBlockID) {
                result = VanillaBlockID[result];
            }
            else if (result in VanillaItemID) {
                result = VanillaItemID[result];
            }
            else {
                alert("[Converter]: this ID of result is not defined: " + result);
                result = 0;
            }
            var ass = [];
            var dildo = 0;
            var cic = Object.keys(json.key);
            for (var s = 0; s < cic.length; s++) {
                var acc = Object.keys(json.key[cic[s]]);
                if (acc.indexOf("item") > -1) {
                    dildo = this.IDConverter(json.key[cic[s]].item);
                    var dte = dildo[1];
                    dildo = dildo[0];
                }
                else if (acc.indexOf("tag") > -1) {
                    dildo = this.TagConverter(json.key[cic[s]].tag);
                    if (!(dildo in VanillaBlockID ||
                        dildo in VanillaItemID ||
                        dildo in BlockID ||
                        dildo in ItemID)) {
                        dildo = this.IDConverter(dildo);
                        var dte = dildo[1];
                        dildo = dildo[0];
                    }
                }
                else {
                    alert("[Converter]: unknown format: " + dildo);
                    result = 0;
                }
                if (dildo in VanillaBlockID && result) {
                    dildo = VanillaBlockID[dildo];
                }
                else if (dildo in VanillaItemID && result) {
                    dildo = VanillaItemID[dildo];
                }
                else if (dildo in BlockID && result) {
                    dildo = BlockID[dildo];
                }
                else if (dildo in ItemID && result) {
                    dildo = ItemID[dildo];
                }
                else {
                    alert("[Converter]: this ID of compoment is not defined: " + dildo);
                    result = 0;
                }
                ass.push(cic[s]);
                ass.push(dildo);
                ass.push(dte);
            }
            if (result) {
                Recipes.addShaped({ id: result, count: count, data: date }, json.pattern, ass);
            }
        }
    },
};
Callback.addCallback("LevelDisplayed", function () {
    Converter.RecipeConverter(__dir__ + "code/recipes/minecraft/");
});
EXPORT("IC", IC);
EXPORT("IContainer", IContainer);
EXPORT("ModItem", ModItem);
EXPORT("ModBlock", ModBlock);
EXPORT("IPlants", IPlants);
EXPORT("ITrees", ITrees);
EXPORT("AgricultureCore", Agriculture);
EXPORT("Converter", Converter);
