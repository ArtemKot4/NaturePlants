class IContainer {
    public name: string;
    public push(prototype): void {
   
      IC[this.name].push(prototype)
    };
    constructor(name: string) {
      this.name = name
      IC[this.name] = [];
    };
    public get (value: string): any {
      for(var i in IC[this.name]){
      
        return IC[this.name][i][value]
      }
    };
    public static getForType (name,value): any {
        for(var i in IC[name]){
      
            return IC[name][i][value]
            }
    }
  }
