//testing
Callback.addCallback("LevelDisplayed", () => {
    Game.message("NaturePlantsLib has been installed!")
})

 
 new Farmland("no_vanilla", {exclude: false})
 new Farmland("no_blacklist_param")
 new Farmland("ratio", {ratio: 7})
 new Farmland("blacklist", {});
 //new Farmland("blacklist_remove", {exclude: {type: "STANDART", list: ["wheat", "carrot"]}});

 new Plant({id: "test_blacklist", texture: null, stages: 3}, 
 {id: "test1", name: "test_blacklist", texture: null },
  null, "blacklist")

 new Plant({id: "test_farmland_ratio", texture: null, stages: 3},
  {id: "test2", name: "test_farmland_ratio", texture: null },
   null, "ratio")

 new Plant({id: "test_farmland_no_vanilla", texture: null, stages: 3},
  {id: "test3", name: "test_farmland_no_vanilla", texture: null},
   null, "no_vanilla" )




