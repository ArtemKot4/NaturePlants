type _item_desc = {id: string, name: string,
  texture: string};
  type _block_desc = {id: string, texture: string, stages: int};
  type _drop_desc = {id?, count?, data?};
  type _farmland = {id: int, name: string, vanilla: int | null};
class Plant {
  public item: int;
  public block: int;
  public stages: int;
  public farmland: any = null;
  public static plants: {} = {};

    protected blockTick = (() => {
   if(!this.farmland) return null;
        Block.setAnimateTickCallback(
          this.block,(x, y, z, id, data) => { 
              const region = BlockSource.getDefaultForDimension(Player.getDimension());
              if(!this.getFarmland(region, x, y, z)) return null;
            for(let i in Farmland.registered){
              const reg = Farmland.registered[i][this.farmland.name];
              if(region.getBlockData(x,y, z) < this.stages) {
                   if(region.getBlockId(x, y, z) == reg.plant) {
                          region.setBlock(x, y, z, reg.plant, data + 1)
                      }
                  } 
                }
          });
      })() ;
      protected getFarmland(region: BlockSource, x: int, y: int, z: int): boolean {
        const bottom_id  = region.getBlockId(x,y - 1, z);
        const bottom_data = region.getBlockData(x,y - 1, z);
        if (bottom_id == this.farmland.id || 
          (this.farmland.vanilla == VanillaBlockID["farmland"] && bottom_id == this.farmland.vanilla) 
              && bottom_data == 1) return true;
      };
    protected setTile = (() => {
      const ratio = Farmland.registered[this.farmland.name].ratio;
      if (ratio == null) return;
     const getFarmland = this.getFarmland;
     
      TileEntity.registerPrototype(this.block, {
       tick: function() {
        const region = this.blockSource;
          if(World.getThreadTime() % ~~(20 * ratio)) {
            
    if(getFarmland(region, this.x, this.y, this.z) && this.data < this.stages){
           region.setBlock(this.x, this.y, this.z, this.data + 1);
          }}
       }
      }); // ~~ = Math.floor()
  } );

   constructor(block: _block_desc, item: _item_desc, drop: _drop_desc, farmland?: int, vanilla? : typeof VanillaBlockID ) {
        this.block = BlockID[block.id];
        this.item = ItemID[item.id];
        const standart = vanilla ? VanillaBlockID["farmland"] : null;
       this.farmland = farmland && Object.assign(this.farmland,
           {name: farmland, id: BlockID[farmland], vanilla: standart })
        this.stages = block.stages;
      this.create(item, block, drop);
    };
    public create (item: _item_desc, block: _block_desc, drop: _drop_desc): void {
      new ModItem(item.id, item.name, item.texture, 0, 1).create();
      for(let i = 1; i < this.stages; i++){

      new ModBlock(block.id, {
        name: item.name,
        texture: [[block.texture, i]],
        inCreative: false,
      }, PLANT);
      };
      Block.registerDropFunction(this.block, (coords, id, dat, toolLevel, enchantData, item, region) => {
        if(region.getBlockData(coords.x, coords.y, coords.z)==this.stages) {
          return [[drop.id || item.id, drop.count || Math.floor(Math.random()*3), drop.data || 0]];
        }
      })
    };
}

