class Farmland {
  public readonly type: string; // * ключевое слово
  public readonly fluid: int; // * жидкость
  public id: int;
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

  constructor(type: string, obj?: {exclude?: {type: "STANDART" | "BLOCK", list: string[]} | false, ratio?: int, fluid?: int}) {
    this.type = type + "_farmland";
    this.fluid = obj?.fluid || 9;
    this.id = BlockID[type];
    Farmland.registered[this.type] = {block: this.id, ratio: obj?.ratio || null, item: [], plant: []}; //push farmland data to static storage
    
    this.create();
    this.blockTick();
    this.setModel();
      Game.message("Информация о созданном экземплере класса: пашне -> \n" + this + "\n\n\n\n");
    if(obj && (obj.exclude || obj.exclude !== false)){ 
      const values = objectValues(this.STANDART);
      for(const i in values){ //vanilla plants can placing
          place(values[i].seed, values[i].plant, this.id);
      };
      if(obj.exclude instanceof Object) this.blacklist(obj.exclude.type, obj.exclude.list); //declare deletes vanilla plants from list
    };

  };
  public blacklist(type: "BLOCK" | "STANDART", list: string[]): void {
      for(const i in list){
          delete [type][list[i]];
      }
  };
  public push(item: int, plant: int): void {
   Farmland.registered[this.type].item.push(item);
   Farmland.registered[this.type].plant.push(plant);
      place(item, plant, this.id); //args uses for declare placing custom plants
  }
 
  public create(): void {
    new ModBlock(this.type, [
      {
        name: this.type,
        texture: [[this.type, 0]],
        inCreative: true,
      },
      {
        name: this.type,
        texture: [[this.type, 1]],
        inCreative: true, //false
      },
    ]);
    // * meta 0 = status water is empty; 
    // * meta 1 = status water is full
  };
  protected blockTick(): void {
   
Block.setAnimateTickCallback(
    this.id,(x, y, z, id, data) => {
        const region = BlockSource.getDefaultForDimension(Player.getDimension());
      for (let i = -4; i < 5; i++) {
        for (let l = -4; l < 5; l++) {
            region.getBlockId(x + i, y, z + l) == this.fluid &&
              region.getBlockData(x, y, z) == 0 ?
              region.setBlock(x, y, z, id, data + 1): 
            region.setBlock(x, y, z, id, data - 1);
        }
    }
});

  };
  private setModel(): void {
    const model = BlockRenderer.createModel();
    const render = new ICRender.Model();
    const collision = new ICRender.CollisionShape();
    const entry = collision.addEntry();

    model.addBox(0, 0, 0, 1, 15 / 16, 1, this.type, 0);
    entry.addBox(0, 0, 0, 1, 15 / 16, 1);
    BlockRenderer.setCustomCollisionShape(this.id, -1, collision);
    render.addEntry(model);
    BlockRenderer.setStaticICRender(this.id, -1, render);
  };
}

