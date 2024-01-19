declare type int = number;
declare type universal = string | number;
declare module AgricultureCore {
  /**
   * Объект, содержащий 2 массива, хранящих информацию о деревьях и растениях.
   */
  export const plants: { tree: []; onGrass: [] };
  /**
   * Объект, содержащий 2 массива, хранящий числовые идентификаторы ванильных растений
   */
  export const vanilla_plants: {
    item: [296, 361, 362, 391, 392, 457];
    block: [59, 104, 105, 141, 142, 244];
  };
  /**
   * Функция для постановки растений
   * @параметр item - название предмета
   * @параметр place_block - название блока для постановки
   * @параметр isBlock - название блока для проверки на соответствие
   */
  export function place(
    item: string | number,
    place_block: any,
    isBlock?: any
  ): void;

  export function seedRegistry(id, name, texture, meta, stack): void;

  export function cropRegistry(id, name, texture, meta, stack): void;

  /**
   *
   * @параметр data: {name: "Название блока растения", id: ["растение", "семена", "урожай"], steps: [текстуры], drop: []} 
   * @параметр farmland - можно ли садить на пашню, если можно то идентификатор пашни
   */

  export function plantRegistry(
    data: { name: string, id: [string, string?, string?, ("item" | "block")?], steps: string[], drop?: [int,universal,int] },

    farmland: string
  ): void;

/**
 * Регистрация кастомной пашни
 * @параметр id - строковой идентификатор пашни
 * @параметр texture - название текстуры 
 * @параметр wet - массив с двумя числовыми идентификаторами, отвечающими за жидкость, нужной для превращения пашни в мокрый вариант
 */
export function farmlandRegistry(id: string | number, texture: string, wet?: [number, number]): void;

/**
 *
 * @параметр id - название идентификатора предмета
 * @параметр name - название
 * @параметр texture - название текстуры
 * @параметр meta - последнее число текстуры: например _1
 * @параметр stack - количество предметов в стаке
 */
  }
declare function ModItem(id, name, texture, meta, stack): void;

/**
 *
 * @параметр id - название идентификатора блока
 * @параметр description - объект описания блока в массиве
 * @параметр type - название специального типа блока
 */

declare function ModBlock(id, description, type?): void;

/**
 * Класс, созданный для хранения данных.    
 * При создании нового экземпляра в объект IC вносится ключ, 
 с названием указанном при создании.   
 * Класс позволяет получать легко получать данные ключа. 
 */

declare class IContainer {
  public name: string;
  /** Метод для добавления содержимого в ваш ключ.
   * @параметр prototype - содержимое, добавляемое в ключ
   */
  public push(prototype): void;
  /**
   * Метод, позволяющий получить содержимое созданного ключа
   * @параметр value - название ключа добавляемого объекта в prototype
   */
  public get(value): any
   /**
   * Метод, позволяющий получить содержимое созданного ключа. 
   * @параметр name - название ключа, данные которого вы хотите получить
   * @параметр value - название ключа вашего объекта в ключе с названием параметра name
   */
  public static getForType(name,value): any
}

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
