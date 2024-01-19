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
  public id: string;
  public name: string;
  public texture: string;
  public meta: int;
  public stack: int;
  public create(): void {
    Item.createItem(
      this.id,
      this.name,
      { name: this.texture, meta: this.meta },
      { stack: this.stack }
    );
  }
  constructor(id, name, texture, meta, stack) {
    this.id = id;
    this.name = name;
    this.texture = texture;
    this.meta = meta || 0;
    this.stack = stack || 64;
  }
}

function ModBlock(id, description, type?) {
  IDRegistry.genBlockID(id);
  Block.createBlock(id, description, (type = type || null));
}
