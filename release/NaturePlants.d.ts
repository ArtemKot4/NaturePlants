declare type int = number;
declare type universal = string | number;
/** class for creating mod farmlands
 */
declare class Farmland {
  /** public param for create id farmland [your word + "_farmland"]
   * 
   */
  public readonly type: string;
  /**
   * public param for declare custom water id (if dont used id is vanilla water -> 9)
   */
  public readonly fluid: number;
  /**
   * public param generating in constructor - BlockID[type]
   */
  public id: string;
  /**
   * public static param, storage: Farmland.registered("your type": {block: this.id, ratio: ratio: id -> [constructor param], item: [items for planting on farmland], plant: [block of plant]})
   */
  public static registered: {}

  /**
   * public param, object -> includes vanilla plants without pumpkin and melon
   */
  public STANDART: {
    wheat: { seed: 296, plant: 59, crop: 295 },
    carrot: { seed: 391, plant: 141 },
    potato: { seed: 392, plant: 142 },
    beetroot: { seed: 457, plant: 244 },
  };

  /**
   * public param, object -> includes vanilla pumpkin and melon
   */

  public BLOCK: {
    pumpkin: { seed: 361, plant: 104, block: 104 },
    melon: { seed: 362, plant: 105, block: 86, crop: 360 },
  };
  /** public method blacklist for delete keys from: STANDART | BLOCK params
   * 
   * @param type object includes vanilla id
   * @param list list of keys
   */
  public blacklist(type: "BLOCK" | "STANDART", list: string[]): void;

  constructor(type: string, texture: string, ratio?: number, blacklist?: {type: "STANDART" | "BLOCK", list: string[]} | null,fluid?: number)
  public push(item: int, plant: int): void 
  public create(): void
  protected blockTick(): void
  private setModel(): void



} 

  /** function for placing plants on your custom farmland
   * @param item item id for clicking
   * @param place_block block id for placing
   * @param isBlock block for checking
   */
 declare function place (item: int, placeBlock: any, isBlock: int): boolean;

declare class Plant {
  public item: int;
  public block: int;
  public stages: int;
  public farmland: any;
    public static plants: {}
/**
  * 
  * @param item description item
  * @param block description block
  * @param drop description drop of block
  */
public create (item: {id: string, name: string,
  texture: string}, block: {id: string, texture: string, stages: int}, drop: {id?, count?, data?}): void
}

/**
 *
 * @параметр id - название идентификатора предмета
 * @параметр name - название
 * @параметр texture - название текстуры
 * @параметр meta - последнее число текстуры: например _1
 * @параметр stack - количество предметов в стаке
 */
declare function ModItem(id, name, texture, meta, stack): void;

/**
 *
 * @параметр id - название идентификатора блока
 * @параметр description - объект описания блока в массиве
 * @параметр type - название специального типа блока
 */

declare function ModBlock(id, description, type?): void;

declare const Converter: {
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
    "black_"
  ];

  colored: [
    "_wool",
    "_stained_glass",
    "_stained_glass_panel",
    "_stained_hardened_clay",
    "_concrete",
    "_concretepowder"
  ];

  coralObj: {
    brain_coral: 2;
    bubble_coral: 3;
    fire_coral: 5;
    horn_coral: 4;
    tube_coral: 1;
  };
  coralArr: [
    "brain_coral",
    "bubble_coral",
    "fire_coral",
    "horn_coral",
    "tube_coral"
  ];

  logArr: ["oak", "spruce", "birch", "jubgle", "acacia", "dark_oak"];
  stoneArr: [
    "stone",
    "granite",
    "polished_granite",
    "diorite",
    "polished_diorite",
    "andesite",
    "polished_andesite"
  ];
  skullArr: ["skeleton", "wither_skeleton", "zombie", "player", "creeper"];
  /**
   * Конвертирует формат текстового ID используемый в Minecraft JAVA в ID используемый Horizon (inner core).
   * @параметр id - текстовый ID используемый в Minecraft JAVA
   * @возвращает [текстовый_айди, дата]
   */
  IDConverter: (id: string) => string | number;

  /**
   * Конвертирует формат forge:items/material в material_item.
   * @параметр tag - текстовый ID который используемый в Forge
   * @возвращает tag
   */
  TagConverter: (tag: string) => string;

  /**
   * Конвертирует и регистрирует рецепты формата json в Horizon
   * @параметр folder - название папки
   */

  RecipeConverter: (folder: string) => any;
};
