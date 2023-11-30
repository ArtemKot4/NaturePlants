const Converter = {
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
    "black_",
  ],

  colored: [
    "_wool",
    "_stained_glass",
    "_stained_glass_panel",
    "_stained_hardened_clay",
    "_concrete",
    "_concretepowder",
  ],

  coralObj: {
    brain_coral: 2,
    bubble_coral: 3,
    fire_coral: 5,
    horn_coral: 4,
    tube_coral: 1,
  },
  coralArr: [
    "brain_coral",
    "bubble_coral",
    "fire_coral",
    "horn_coral",
    "tube_coral",
  ],

  logArr: ["oak", "spruce", "birch", "jungle", "acacia", "dark_oak"], //
  stoneArr: [
    "stone",
    "granite",
    "polished_granite",
    "diorite",
    "polished_diorite",
    "andesite",
    "polished_andesite",
  ],
  skullArr: ["skeleton", "wither_skeleton", "zombie", "player", "creeper"],

  IDConverter: function (id: string): universal[] {
    var result = [];
    var bid: universal = 0;
    var bdata: universal = 0;
    if (id.includes("minecraft")) {
      for (var g in this.colored) {
        if (id.includes(this.colored[g])) {
          for (var d in this.colorsArr) {
            if (id.includes(this.colored[d])) {
              bdata = d;
            }
          }
          bid = this.colored[g].slice(1);
        }
        //alert("[Converter]: cannot to convert java id to bedrock id. Error 1")
      }
      for (var k in this.coralArr) {
        if (!bid && id.includes(this.coralArr[k])) {
          bdata = this.coralObj[this.coralArr[k]];

          if (id.includes("coral_fan")) {
            bid = "coral_fan";
          } else if (id.includes("coral_block")) {
            bid = "coral_block";
          } else if (id.includes("coral")) {
            bid = "coral";
          }
        }
      }
      if (id.includes("log")) {
        for (var c in this.logArr) {
          if (id.includes(this.logArr[c])) {
            if (this.logArr[c] == "acacia" || this.logArr[c] == "dark_oak") {
              bid = "log2";
              bdata = Number(c) - 4;
            } else {
              bid = "log";
              bdata = c;
            }
          }
        }
      }
      if (id.includes("sapling")) {
        for (var x in this.logArr) {
          if (id.includes(this.logArr[x])) {
            bid = "sapling";
            bdata = x;
          }
        }
      }
      if (
        id.includes("granite") ||
        id.includes("diorite") ||
        id.includes("andesite")
      ) {
        for (var t in this.stoneArr) {
          if (id.includes(this.stoneArr[t])) {
            bid = "skull";
            bdata = h;
          }
        }
      }
      if (id.includes("red_sand")) {
        bid = "sand";
        bdata = 1;
      }
      if (id.includes("grass_block")) bid = "grass";
      if (id.includes("snow_block")) bid = "snow";
      if (id.includes("nether_bricks")) bid = "nether_brick";
      if (id.includes("lily_pad")) bid = "waterlily";
      if (
        id.includes("_skull") ||
        (id.includes("_head") && !id.includes("blank"))
      ) {
        for (var h in this.skullArr) {
          if (id.includes(this.skullArr[h] )) {
            bid = "skull";
            bdata = h;
          }
        }
      }
    }
    if (!bid && id.indexOf(":") > -1) {
      bid = id.slice(id.indexOf(":") + 1);
    }
    result = [bid, bdata];
    return result;
  },

  TagConverter: function (tag: string): string {
    if (tag.indexOf(":") > 0) {
      tag = tag.slice(tag.indexOf(":") + 1);
    }
    if (tag.indexOf("/") > 0) {
      var fir = tag.slice(tag.indexOf("/") + 1, tag.indexOf("/") + tag.length);
      var sec = tag.slice(tag.length * -1, tag.indexOf("/") - 1);
      tag = fir + "_" + sec;
      return tag;
    }
  },

  RecipeConverter: function (folder: string): any {
    //функция поддерживает только .json формат
    var recipe = FileTools.GetListOfFiles(folder, "json");
    for (var i in recipe) {
      let read = String(recipe[i]).split("/").pop().split(".")[0];
      var ebal = FileTools.ReadText(folder + read + ".json");
      var json = JSON.parse(ebal);
      var result = json.result.item;
      var count = json.result.count || 1;
      result = this.IDConverter(result);
      var date = result[1];
      result = result[0];
      if (result in VanillaBlockID) {

        result = VanillaBlockID[result];
      } else if (result in VanillaItemID) {
        result = VanillaItemID[result];
      } else {
        alert("[Converter]: this ID of result is not defined: " + result);
        result = 0;
      }
      var ass = [];
      var dildo: universal = 0;
      var cic = Object.keys(json.key);
      for (var s = 0; s < cic.length; s++) {
        var acc = Object.keys(json.key[cic[s]]);
        if (acc.indexOf("item") > -1) {
          dildo = this.IDConverter(json.key[cic[s]].item);
          var dte = dildo[1];
          dildo = dildo[0];
        } else if (acc.indexOf("tag") > -1) {
          dildo = this.TagConverter(json.key[cic[s]].tag);
          if (
            !(
              dildo in VanillaBlockID ||
              dildo in VanillaItemID ||
              dildo in BlockID ||
              dildo in ItemID
            )
          ) {
            dildo = this.IDConverter(dildo);
            var dte = dildo[1];
            dildo = dildo[0];
          }
        } else {
          alert("[Converter]: unknown format: " + dildo);
          result = 0;
        }
        if (dildo in VanillaBlockID && result) {
          dildo = VanillaBlockID[dildo];
        } else if (dildo in VanillaItemID && result) {
          dildo = VanillaItemID[dildo];
        } else if (dildo in BlockID && result) {
          dildo = BlockID[dildo];
        } else if (dildo in ItemID && result) {
          dildo = ItemID[dildo];
        } else {
          alert("[Converter]: this ID of compoment is not defined: " + dildo);
          result = 0;
        }
        ass.push(cic[s]);
        ass.push(dildo);
        ass.push(dte);
      }
      if (result) {
        Recipes.addShaped(
          { id: result, count: count, data: date },
          json.pattern,
          ass
        );
      }
    }
  },
};

Callback.addCallback("LevelDisplayed", function () {
  Converter.RecipeConverter(__dir__ + "code/recipes/minecraft/");
});
