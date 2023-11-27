type universal = string | number

const PLANT = Block.createSpecialType({
    destroytime: 0,
    explosionres: 0,
    rendertype: 91,
    translucency: 1,
    material: 4,
  });
  
function ModItem(id: string,name: string,texture: string,meta: number,stack: number) {
    
    Item.createItem(
        id,
        name,
        { name: texture, meta: meta },
        { stack: stack }
      );
}

function ModBlock(id,description,type?){
    IDRegistry.genBlockID(id);
    Block.createBlock(id, [
     description
    ], type=type||null);
}

EXPORT("ModItem",ModItem);
EXPORT("ModBlock",ModBlock)