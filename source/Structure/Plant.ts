class Plant {
  public item: int;
  public block: int;
  public stages: int;
  public farmland: int;
  

    public place(
        item: universal,
        place_block: any,
        isBlock?: any
      ): boolean {
        Item.registerUseFunction(item, function (coords, item, block: any, player) {
          const region = BlockSource.getDefaultForActor(player);
          const place = coords.relative;
          if(!place_block || block !== isBlock) return null;
          if(block !== isBlock && isBlock) return null;
      
            region.setBlock(place.x, place.y, place.z, place_block);
         if (!isBlock && block == VanillaBlockID["grass"]) 
            region.setBlock(place.x, place.y, place.z, place_block);
          

          if (Game.getGameMode() != 1) 
     Entity.setCarriedItem(player, item.id, item.count - 1, item.data);

        });
        return !!place_block;
      };

    protected blockTick() {
  
        Block.setAnimateTickCallback(
          this.block,(x, y, z, id, data) => { 
              const region = BlockSource.getDefaultForDimension(Player.getDimension());
          const tile = TileEntity.getTileEntity(x, y, z, region);
            for(let i in Farmland.registered){
              const reg = Farmland.registered[i][this.farmland];
              if(region.getBlockData(x,y, z) < 6 && region.getBlockId(x, y - 1, z) == this.farmland && region.getBlockData( x , y - 1, z)==1) {
                   if(region.getBlockId(x, y, z) == reg.plant) {
                          region.setBlock(x, y, z, reg.plant, data + 1)
                      }
                  } 
                }
          });
      }
    ;
    protected setTile = (() => {
    
     
      TileEntity.registerPrototype(this.block, {
          defaulValues: {
          status: 0
        },
       tick: function() {
          if(World.getThreadTime() % ~~(20 * this.ratio)) {
              const region = this.blockSource;
    if(this.status == 1 && this.data < 6) region.setBlock(this.x, this.y, this.z, this.data + 1);
          }
       }
      }); // ~~ = Math.floor()
  } );

      constructor(block: {id: string, texture: string, stages: number}, item: {id: string, name: string,
         texture: string}, drop: {id, count, data?}, farmland ) {
        this.block = BlockID[block.id];
        this.item = ItemID[item.id];
        this.farmland = BlockID[farmland];
        this.stages = block.stages;
      new ModItem(item.id, item.name, item.texture, 0, 1);
      for(let i = 1; i < this.stages; i++){

      new ModBlock(block.id, {
        name: item.name,
        texture: [[block.texture, i]],
        inCreative: false,
      },);
      };
      Block.registerDropFunction(this.block, (coords, id, dat, toolLevel, enchantData, item, region) => {
        if(region.getBlockData(coords.x, coords.y, coords.z)==this.stages) {
          return [[drop.id, drop.count, drop.data || 0]];
        }
      })
    };
}

