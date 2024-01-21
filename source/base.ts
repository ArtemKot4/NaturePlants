type universal = string | number;
type int = number;

const PLANT = Block.createSpecialType({
  destroytime: 0,
  explosionres: 0,
  rendertype: 91,
  translucency: 1,
  material: 4,
});

class ModItem {
  
  public create(): void {
    Item.createItem(
      this.id,
      this.name,
      { name: this.texture, meta: this.meta },
      { stack: this.stack }
    );
  };
  constructor(public id: string,public name: string,public texture: string,public meta: int = 0, public stack: int = 64) {
    this.id = id;
    this.name = name;
    this.texture = texture;
    this.meta = meta || 0;
    this.stack = stack || 64;
  }
}

function ModBlock(id: string, description, type?: string | Block.SpecialType) {
  IDRegistry.genBlockID(id);
  Block.createBlock(id, description, (type = type || null));
}

function place(item: int, placeBlock: any, isBlock: int): boolean {
  Item.registerUseFunction(item, (coords, item, block: any, player) => {
    const region = BlockSource.getDefaultForActor(player);
    const place = coords.relative;
    if(!placeBlock || block !== isBlock) return null;
    if(block !== isBlock && isBlock) return null;

      region.setBlock(place.x, place.y, place.z, placeBlock);
    

    if (Game.getGameMode() != 1) 
Entity.setCarriedItem(player, item.id, item.count - 1, item.data);

  });
  return !!placeBlock;
}

const objectValues = function(obj: Object) {
  return Object.keys(obj).map((v) => {
    return obj[v]
  })
}