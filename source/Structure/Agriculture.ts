
var i;
var IPlants = new IContainer("plants")
var ITrees = new IContainer("trees");
var IFarmland = new IContainer("farmland") 
namespace Agriculture {
  export const plants = {
    tree: [],

    onGrass: [],
  };
  export const vanilla_plants = {
    item: [296, 361, 362, 391, 392, 457],
    block: [59, 104, 105, 141, 142, 244],
  };
  export function place(
    item: universal,
    place_block: any,
    isBlock?: any
  ): void {
    Item.registerUseFunction(item, function (coords, item, block: any, player) {
      var region = BlockSource.getDefaultForActor(player);
      var place = coords.relative;

      if (block == isBlock) {
        region.setBlock(place.x, place.y, place.z, place_block);
      } else if (isBlock == undefined && block == VanillaBlockID["grass"]) {
        region.setBlock(place.x, place.y, place.z, place_block);
      }
      if (Game.getGameMode() != 1) {
        Entity.setCarriedItem(player, item.id, item.count - 1, item.data);
      }
    });
  }
  export function seedRegistry(id, name, texture,meta, stack) {
    new ModItem("seed_" + id,name,texture,meta=meta||0,stack=stack||64)
  }
  export function cropRegistry(id, name, texture,meta, stack, isFood) {

    if (isFood == true) {
      IDRegistry.genItemID("crop_" + id);
      Item.createFoodItem(
        "crop_" + id,
        name,
        { name: "crop_" + texture, meta: meta },
        { stack: stack }
      );
    } else {
        new ModItem("crop_"+id,name,texture,meta,stack)
    }
  }
  export function plantRegistry(
    id,
    texture,
    name,
    steps,
    farmland,
    count
  ) {

    name = name || id[0].toUpperCase() + id.slice(1).replace(/_/g, " ").toString();

    let stads = [];

    for (i = 0; i < steps; i++) {
      stads.push({
        name: "plant_" + i + "_" + name,
        texture: [[texture.slice(0, texture.length - 2), i]],
        inCreative: false,
      });
    }

    Block.registerDropFunction(
      "plant_" + id,
      function (coords, id, data, toolLevel, enchantData, item, region) {
        if (World.getBlock(coords.x, coords.y, coords.z).data == i) {
          return [[ItemID["crop_" + id], count, 0]];
        } else if (World.getBlock(coords.x, coords.y, coords.z).data < i) {
          return [[ItemID["seed_" + id], count, 0]];
        }
      }
    );
    new ModBlock("plant_"+id,stads,PLANT)
    IPlants.push({
      seed: ItemID["seed_" + id],
      block: BlockID["plant_" + id],
      crop: ItemID["crop_" + id],
      steps: steps
    })
    if (farmland) {
      Agriculture.place(
        ItemID[id],
        BlockID["plant_" + id],
        BlockID["farmland_" + farmland]
      );
    }
  } 
  export function registry(
    id: universal,
    name: string,
    stack: number,
    texture: string,
    meta: number,
    isFood: boolean, 
    texture2: string,
    steps: number,
    farmland: any,
    count: number
  ) {
    Agriculture.seedRegistry(id, name, texture, meta,stack);
    Agriculture.cropRegistry(id, name, texture, meta,stack, isFood);
    Agriculture.plantRegistry(
      id,
      texture2,
      name,
      steps,
      farmland,
      count
    );
  }
  export function treeRegistry(id: any, texture: any, stack: number, name: string) {
    
    new ModItem(id,name,texture,0,stack)
    new ModBlock(
      "sapling_" + id,
      [
        {
          name: name,
          texture: [[texture, 0]],
          inCreative: true,
        },
      ],

    );
    Agriculture.place(ItemID[id], BlockID["sapling_" + id], BlockID[id]);
    ITrees.push ({
      item: ItemID[id],
      block: BlockID["sapling_" + id],
    });
  }
  export function farmlandRegistry(id: universal, texture: any,wet?: [int,int]) {
    wet = wet || [VanillaBlockID["water"],VanillaBlockID["flowing_water"]]
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
       IFarmland.push({block: BlockID["farmland_"+ id], liquid: wet})
    for (var i in Agriculture.vanilla_plants) {
        Agriculture.place(
        Agriculture.vanilla_plants.item[i],
       Agriculture.vanilla_plants.block[i],
        BlockID[id]
      );
      }
  }
}

Block.setAnimateTickCallback(
  IPlants.get("block"),
  function (x, y, z, id, data) {
    if (World.getBlock(x, y, z).data < IPlants.get("steps")) {
      World.setBlock(x, y, z, id, data + 1);
    }
  }
);


Block.setAnimateTickCallback(IFarmland.get("block"), function(x, y, z, id, data) {
  let blck;
  for(var i = -4; i < 5; i++) {
  for(var l = -4; l < 5; l++) {
  blck = World.getBlock(x + i, y, z + l);
  if(blck in IFarmland.get("liquid") && World.getBlockData(x, y, z) == 0) {
  World.setBlock(x, y, z, id, data+1);
  }
  }  
}
}); 


Callback.addCallback(
  "ItemUse",
  function (coords: any, item: any, block: any, isExternal: any, player: any) {
  
      var coords = coords.relative;
      if (
        item.id == 351 &&
        block == IPlants.get("block") &&
        block.data < i
      ) {
        World.setBlock(
          coords.x,
          coords.y,
          coords.z,
          IPlants.get("block"),
          block.data + 1
        );
      }
    
  }
);

