class Farmland {
  public readonly type: string; // * ключевое слово
  public readonly texture: string;
  public readonly fluid: number; // * жидкость
  public id: number;
  public static registered = {};

  public STANDART = {
    wheat: { seed: 296, plant: 59, crop: 295 },
    carrot: { seed: 391, plant: 141 },
    potato: { seed: 392, plant: 142 },
    beetroot: { seed: 457, plant: 244 },
  };
  public BLOCK = {
    pumpkin: { seed: 361, plant: 104, block: 104 },
    melon: { seed: 362, plant: 105, block: 86, crop: 360 },
  };

  constructor(type, texture, ratio?, fluid?) {
    this.type = type;
    this.texture = texture || type + "_farmland";
    ratio = ratio || null;
    this.fluid = fluid || 9;
    this.id = BlockID[type + "_farmland"];
    Farmland.registered[this.id] = {block: this.id, ratio: ratio, item: [], plant: []};
    const values = Object.values(this.STANDART);
    for(const i in values){
        this.set(values[i].seed, values[i].plant, this.id);

    }
  }
  public set(item, place_block, isBlock): void {
    Plant.prototype.place.apply(this, arguments);
  }
  public push(item: int[], plant: int[]): void {
   Farmland.registered[this.id].item.push(item);
   Farmland.registered[this.id].plant.push(plant);
      this.set(item, plant, this.id);
  }
 
  public create = (() => {
    new ModBlock(this.id, [
      {
        name: "Farmland " + this.type,
        texture: [[this.texture, 0]],
        inCreative: true,
      },
      {
        name: "Farmland " + this.type,
        texture: [[this.texture, 1]],
        inCreative: false,
      },
    ]);
    // * meta 0 = status water is empty; 
    // * meta 1 = status water is full
  })();
  public blockTick = (() => {
   
Block.setAnimateTickCallback(
    this.id,(x, y, z, id, data) => {
        const region = BlockSource.getDefaultForDimension(Player.getDimension());
        const tile = TileEntity.getTileEntity(x, y, z, region);
  
      for (let i = -4; i < 5; i++) {
        for (let l = -4; l < 5; l++) {
           
          if ( 
            region.getBlockId(x + i, y, z + l) == this.fluid &&
            region.getBlockData(x, y, z) == 0
          ) {
            region.setBlock(x, y, z, id, data + 1);
           if (tile && tile.status == 0) tile.status = 1;
          };
        }
        
    }
});

  });
  public setModel = (() => {
    const model = BlockRenderer.createModel();
    const render = new ICRender.Model();
    const collision = new ICRender.CollisionShape();
    const entry = collision.addEntry();

    model.addBox(0, 0, 0, 1, 15 / 16, 1, this.texture, 0);
    entry.addBox(0, 0, 0, 1, 15 / 16, 1);
    BlockRenderer.setCustomCollisionShape(this.id, -1, collision);
    render.addEntry(model);
    BlockRenderer.setStaticICRender(this.id, -1, render);
  })();
}

