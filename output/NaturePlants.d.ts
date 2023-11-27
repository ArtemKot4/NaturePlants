declare namespace Agriculture {
    /**
     * Объект, содержащий 2 массива, хранящих информацию о деревьях и растениях.
     */
    export const plants: {tree:[],onGrass:[]}
    /**
     * Объект, содержащий 2 массива, хранящий числовые идентификаторы ванильных растений
     */
    export const vanilla_plants: {item: [296, 361, 362, 391, 392, 457],
        block: [59, 104, 105, 141, 142, 244]}
        /**
         * Функция для постановки растений
         * @параметр item - название предмета
         * @параметр place_block - название блока для постановки
         * @параметр isBlock - название блока для проверки на соответствие
         */
    export function place ( item: string | number,
        place_block: any,
        isBlock?: any): void
      
   export function seedRegistry(id,name,texture,meta,stack): void

   export function cropRegistry(id,name,texture,meta,stack): void

 /**
  * 
  * @параметр id - ключевое название растения
  * @параметр texture - название текстуры блока растения
  * @параметр name - название блока растения
  * @параметр steps - количество стадий роста
  * @параметр farmland - можно ли садить на пашню, если можно то идентификатор пашни
  * @параметр count - количество выпадаемых предметов
  */

   export function plantRegistry(id,
    texture,
    name,
    texture2,
    steps,
    farmland,
    count): void

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

    export function registry(id: string | number,
        name: string,
        stack: number,
        texture: string,
        meta: number,
        isFood: boolean,
        texture2: string,
        steps: number,
        farmland: any,
        count: number)
}

  /**
         * 
         * @параметр id - название идентификатора предмета
         * @параметр name - название
         * @параметр texture - название текстуры
         * @параметр meta - последнее число текстуры: например _1
         * @параметр stack - количество предметов в стаке
         */

declare function ModItem (id, name, texture,meta, stack): void

/**
 * 
 * @параметр id - название идентификатора блока
 * @параметр description - объект описания блока
 * @параметр type - название специального типа блока
 */

declare function ModBlock (id,description,type?): void