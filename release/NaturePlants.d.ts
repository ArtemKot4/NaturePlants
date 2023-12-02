declare namespace Agriculture {
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
   * @параметр id - ключевое название растения
   * @параметр texture - название текстуры блока растения
   * @параметр name - название блока растения
   * @параметр steps - количество стадий роста
   * @параметр farmland - можно ли садить на пашню, если можно то идентификатор пашни
   * @параметр count - количество выпадаемых предметов
   */

  export function plantRegistry(
    id,
    texture,
    name,
    texture2,
    steps,
    farmland,
    count
  ): void;

  /**
   *
   * @параметр id - ключевое слово для создания семян, плодов и блока растения.
   * @параметр name - ключевое слово
   * @параметр stack - максимальное количество предметов в слоте
   * @параметр texture - название текстур для всего кроме блока растения
   * @параметр meta - последнее число на конце текстуры предметов
   * @параметр isFood - плод будет съедобным? true || false
   * @параметр texture2 - название текстуры блока растения
   * @параметр steps - количество стадий роста
   * @параметр farmland - название пашни
   * @параметр count - количество выпадаемых предметов
   */

  export function registry(
    id: string | number,
    name: string,
    stack: number,
    texture: string,
    meta: number,
    isFood: boolean,
    texture2: string,
    steps: number,
    farmland: any,
    count: number
  );
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
