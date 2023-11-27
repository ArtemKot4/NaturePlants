
var i;

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
    IDRegistry.genItemID("crop_" + id);
    if (isFood == true) {
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
    Agriculture.plants.onGrass.push({
      seed: ItemID["seed_" + id],
      block: BlockID["plant_" + id],
      crop: ItemID["crop_" + id],
    });
    if (farmland) {
      Agriculture.place(
        ItemID[id],
        BlockID["plant_" + id],
        BlockID["farmland_" + farmland]
      );

      Block.setAnimateTickCallback(
        BlockID["plant_" + id],
        function (x, y, z, id, data) {
          if (World.getBlock(x, y, z).data < steps) {
            World.setBlock(x, y, z, BlockID["plant_" + id], data + 1);
          }
        }
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
    stack = stack || 64;
    texture = texture || id;
    name = name || id[0].toUpperCase() + id.slice(1).replace(/_/g, " ").toString();
    IDRegistry.genItemID(id);
    Item.createItem(id, name, { name: texture, meta: 0 }, { stack: stack });
    IDRegistry.genBlockID("sapling_" + id);
    Block.createBlock(
      "sapling_" + id,
      [
        {
          name: name,
          texture: [[texture, 0]],
          inCreative: true,
        },
      ],
      PLANT
    );
    Agriculture.place(ItemID[id], BlockID["sapling_" + id] + BlockID[id]);
    Agriculture.plants.tree.push({
      item: ItemID[id],
      block: BlockID["sapling_" + id],
    });
  }
  export function farmlandRegistry(id: universal, texture: any) {
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

    
    IDRegistry.genBlockID("farmland_" + id);
    Block.createBlock("farmland_" + id, [
      {
        name: "Farmland " + id,
        texture: [[texture, 0]],
        inCreative: true,
      },
    ]);

    for (var i in Agriculture.vanilla_plants) {
      Agriculture.place(
        VanillaItemID[Agriculture.vanilla_plants.item[i]],
        VanillaBlockID[Agriculture.vanilla_plants.block[i]],
        BlockID[id]
      );
    }
  }
}


Callback.addCallback(
  "ItemUse",
  function (coords: any, item: any, block: any, isExternal: any, player: any) {
    for (var k in Agriculture.plants.onGrass) {
      var coords = coords.relative;
      if (
        item.id == 351 &&
        block == Agriculture.plants.onGrass[k].block &&
        block.data < i
      ) {
        World.setBlock(
          coords.x,
          coords.y,
          coords.z,
          Agriculture.plants.onGrass[k].block,
          block.data + 1
        );
      }
    }
  }
);

EXPORT("AgricultureCore", Agriculture);