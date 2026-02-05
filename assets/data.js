// Single source of truth
// Bilder: du kan byta ut "img" senare till dina egna.
window.DISHES = [
  // PASTA (10)
  mk("pasta_truffle","Tagliatelle al Tartufo","Pasta","pasta,truffle","Krämig tryffelpasta.",
    ["Tagliatelle","Grädde","Tryffelolja","Parmesan","Salt","Svartpeppar"],
    ["Koka pastan al dente.","Värm grädde och parmesan på låg värme.","Vänd ner pasta.","Toppa med tryffelolja och peppar."]
  ),
  mk("pasta_cacio","Cacio e Pepe","Pasta","cacio,pepe,pasta","Minimalistisk klassiker.",
    ["Spaghetti","Pecorino Romano","Svartpeppar","Salt"],
    ["Koka pastan.","Rosta peppar i panna.","Rör pecorino med lite pastavatten.","Vänd runt tills det blir krämigt."]
  ),
  mk("pasta_vodka","Vodka Pasta + burrata","Pasta","vodka,pasta,burrata","Len sås med burrata.",
    ["Pasta","Tomatpuré","Grädde","Vodka","Vitlök","Burrata","Chili"],
    ["Fräs vitlök och chili.","Rör i tomatpuré.","Häll i vodka och reducera.","I med grädde.","Vänd runt pasta.","Toppa med burrata."]
  ),
  mk("pasta_pesto","Pesto Genovese","Pasta","pesto,basil,pasta","Grön och fräsch.",
    ["Pasta","Basilika","Parmesan","Vitlök","Pinjenötter","Olivolja"],
    ["Mixa pesto.","Koka pasta.","Vänd runt pesto med lite pastavatten.","Servera direkt."]
  ),
  mk("pasta_ragu","Ragu alla Bolognese","Pasta","bolognese,ragu,pasta","Långkokskänsla.",
    ["Pasta","Nötfärs","Lök","Morot","Selleri","Tomat","Mjölk"],
    ["Svetta lök, morot, selleri.","Bryn färs.","I med tomat och mjölk.","Sjud 30–60 min.","Servera med pasta."]
  ),
  mk("pasta_alfredo","Alfredo","Pasta","alfredo,cream,pasta","Smörig och krämig.",
    ["Fettuccine","Smör","Grädde","Parmesan","Salt","Peppar"],
    ["Koka pasta.","Smält smör, tillsätt grädde.","Rör i parmesan.","Vänd runt pastan."]
  ),
  mk("pasta_arrabiata","Arrabbiata","Pasta","arrabbiata,chili,pasta","Het och ren tomat.",
    ["Pasta","Tomater","Vitlök","Chili","Olivolja","Salt"],
    ["Fräs vitlök och chili.","I med tomat.","Sjud 10 min.","Vänd runt pasta.","Toppa med basilika."]
  ),
  mk("pasta_lemon","Citronpasta","Pasta","lemon,pasta","Syrlig och lätt.",
    ["Pasta","Citron","Parmesan","Smör","Svartpeppar"],
    ["Koka pasta.","Riv citron.","Smält smör.","Blanda med citron + parmesan.","Vänd runt pasta."]
  ),
  mk("pasta_mushroom","Svamppasta","Pasta","mushroom,pasta","Umami och kräm.",
    ["Pasta","Svamp","Grädde","Vitlök","Parmesan","Timjan"],
    ["Stek svamp hårt.","Fräs vitlök.","I med grädde.","Tillsätt parmesan.","Vänd runt pasta."]
  ),
  mk("pasta_seafood","Frutti di Mare","Pasta","seafood,pasta","Skaldjur och vitlök.",
    ["Pasta","Räkor","Musslor","Vitlök","Chili","Vitt vin","Persilja"],
    ["Fräs vitlök/chili.","I med vin.","Tillsätt musslor.","I med räkor.","Vänd runt pasta.","Toppa med persilja."]
  ),

  // NORDIC (10)
  mk("nordic_meatballs","Köttbullar 2.0","Nordic","meatballs,swedish","Klassiker, premium.",
    ["Köttbullar","Potatis","Gräddsås","Lingon","Pressgurka"],
    ["Stek köttbullar.","Koka potatis.","Bygg sås med steksky + grädde.","Servera med lingon och gurka."]
  ),
  mk("nordic_salmon_miso","Lax + misosmör","Nordic","salmon,miso","Silkeslen lax.",
    ["Lax","Smör","Miso","Citron","Salt"],
    ["Baka lax 10–12 min.","Smält smör och rör i miso.","Pressa citron.","Skeda smör över lax."]
  ),
  mk("nordic_steak_chimi","Biff + chimichurri","Nordic","steak,chimichurri","Hög protein, hög smak.",
    ["Biff","Salt","Peppar","Persilja","Vitlök","Olivolja","Vinäger"],
    ["Salta biffen.","Stek hårt.","Vila 5 min.","Mixa chimichurri.","Skiva och toppa."]
  ),
  mk("nordic_cod","Torsk + brynt smör","Nordic","cod,brown_butter","Ren och elegant.",
    ["Torsk","Smör","Citron","Kapris","Salt"],
    ["Stek/baka torsk.","Brynt smör i kastrull.","Tillsätt kapris.","Servera med citron."]
  ),
  mk("nordic_chicken","Kyckling + örtsås","Nordic","chicken,herbs","Lätt men lyx.",
    ["Kyckling","Yoghurt","Örter","Citron","Salt"],
    ["Stek kyckling.","Blanda yoghurt + örter + citron.","Servera med potatis eller sallad."]
  ),
  mk("nordic_venison","Vilt + enbärssås","Nordic","venison,swedish","Mörkt, djupt, premium.",
    ["Vilt","Enbär","Grädde","Fond","Salt"],
    ["Stek vilt snabbt.","Vila.","Koka sås med fond + grädde + enbär.","Servera."]
  ),
  mk("nordic_shrimp","Räkmacka deluxe","Nordic","shrimp,toast","Kall, crisp, lyx.",
    ["Räkor","Majonnäs","Dill","Citron","Rostat bröd"],
    ["Blanda majonnäs + dill + citron.","Bygg på toast.","Toppa med räkor."]
  ),
  mk("nordic_reindeer","Ren + potatispuré","Nordic","reindeer,swedish","Nordisk signatur.",
    ["Ren","Potatis","Smör","Grädde","Lingon"],
    ["Stek ren snabbt.","Gör puré.","Värm lingon.","Lägg upp snyggt."]
  ),
  mk("nordic_roots","Rotselleri + hasselnöt","Nordic","celeriac,roasted","Veg-nordic premium.",
    ["Rotselleri","Hasselnöt","Smör","Timjan","Salt"],
    ["Rosta rotselleri.","Brynt smör.","Hacka hasselnöt.","Toppa."]
  ),
  mk("nordic_soup","Fiskgryta saffran","Nordic","fish_stew,saffron","Varm och exklusiv.",
    ["Fisk","Saffran","Grädde","Tomat","Fänkål"],
    ["Svetta fänkål.","I med tomat.","Tillsätt grädde + saffran.","Lägg i fisk sist."]
  ),

  // SUSHI (8)
  mk("sushi_temaki","Temaki Kit (tillagat protein)","Sushi","temaki,sushi","Bygg själv hemma.",
    ["Ris","Nori","Lax/kyckling","Gurka","Avokado","Mayo"],
    ["Koka ris.","Skär fyllning.","Bygg temaki i nori.","Servera direkt."]
  ),
  mk("sushi_poke","Poke Bowl","Sushi","poke,bowl","Fräsch och snabb.",
    ["Ris","Lax/tonfisk","Soja","Sesam","Gurka","Avokado"],
    ["Koka ris.","Blanda protein med soja.","Skär grönsaker.","Bygg bowl.","Toppa med sesam."]
  ),
  mk("sushi_nigiri","Nigiri Mix","Sushi","nigiri,sushi","Rent och exakt.",
    ["Sushiris","Fisk","Wasabi","Soja"],
    ["Forma ris.","Lägg fisk ovanpå.","Servera med soja/wasabi."]
  ),
  mk("sushi_maki","Maki Roll","Sushi","maki,sushi","Klassisk rulle.",
    ["Ris","Nori","Gurka","Avokado","Protein"],
    ["Lägg nori.","Sprid ris.","Rulla tätt.","Skär och servera."]
  ),
  mk("sushi_sashimi","Sashimi + ponzu","Sushi","sashimi,ponzu","Minimal lyx.",
    ["Fisk","Ponzu","Sesam","Vårlök"],
    ["Skär fisk tunt.","Blanda ponzu.","Toppa med sesam och vårlök."]
  ),
  mk("sushi_crispy","Crispy Rice","Sushi","crispy_rice,sushi","Krispigt premium.",
    ["Ris","Olja","Lax","Mayo","Chili"],
    ["Forma ris och stek tills krispigt.","Toppa med lax + mayo.","Servera."]
  ),
  mk("sushi_salmon","Salmon Aburi","Sushi","aburi,salmon","Lätt bränd yta.",
    ["Nigiri","Lax","Mayo","Soja"],
    ["Bygg nigiri.","Torch snabbt.","Pensla soja/mayo."]
  ),
  mk("sushi_vegan","Vegan Sushi","Sushi","vegan,sushi","Rent och fräscht.",
    ["Ris","Nori","Avokado","Gurka","Morot","Sesam"],
    ["Bygg maki med grönsaker.","Skär och toppa med sesam."]
  ),

  // VEG (6)
  mk("veg_halloumi","Halloumi bowl + chimichurri","Veg","halloumi,bowl","Hög smak, lätt.",
    ["Halloumi","Sallad","Tomat","Gurka","Chimichurri"],
    ["Stek halloumi.","Bygg bowl.","Toppa chimichurri."]
  ),
  mk("veg_lentil","Linsbowl + tahini","Veg","lentil,bowl","Protein + kräm.",
    ["Linser","Tahini","Citron","Spiskummin","Sallad"],
    ["Koka linser.","Rör tahini + citron.","Bygg bowl.","Toppa."]
  ),
  mk("veg_mushroom","Svamp 'steak' + pepparsås","Veg","mushroom,steak","Umami premium.",
    ["Portabello","Grädde","Peppar","Smör","Salt"],
    ["Stek svamp hårt.","Koka pepparsås.","Servera med potatis."]
  ),
  mk("veg_pumpkin","Rostad pumpa + feta","Veg","pumpkin,roasted","Sötma + salt.",
    ["Pumpa","Feta","Olivolja","Timjan","Citron"],
    ["Rosta pumpa.","Smula feta.","Toppa med citron."]
  ),
  mk("veg_pasta","Vegansk pesto pasta","Veg","vegan,pesto,pasta","Grön och snabb.",
    ["Pasta","Basilika","Pinjenöt","Olivolja","Citron"],
    ["Mixa pesto.","Koka pasta.","Vänd runt.","Toppa."]
  ),
  mk("veg_toast","Avokado toast deluxe","Veg","avocado,toast","Krispigt och enkelt.",
    ["Bröd","Avokado","Citron","Chili","Salt"],
    ["Rosta bröd.","Mosa avokado.","Smaka av.","Toppa chili."]
  ),

  // GRILL / PREMIUM (6)
  mk("premium_lamb","Lamm + rosmarin","Premium","lamb,rosemary","Mör och elegant.",
    ["Lamm","Rosmarin","Vitlök","Salt","Peppar"],
    ["Salta lamm.","Stek hårt.","Vila.","Toppa rosmarin/smör."]
  ),
  mk("premium_duck","Anka + apelsin","Premium","duck,orange","Klassisk lyx.",
    ["Anka","Apelsin","Honung","Soja","Smör"],
    ["Stek anka.","Reducera apelsin + honung.","Pensla och servera."]
  ),
  mk("premium_risotto","Risotto svamp","Premium","risotto,mushroom","Krämigt premium.",
    ["Risottoris","Fond","Svamp","Parmesan","Smör"],
    ["Rosta ris.","Häll i fond lite i taget.","Rör tills krämig.","I med svamp + parmesan + smör."]
  ),
  mk("premium_tuna","Tonfisk tataki","Premium","tuna,tataki","Snabb bränning.",
    ["Tonfisk","Sesam","Soja","Lime"],
    ["Rulla i sesam.","Bränn snabbt på alla sidor.","Skär tunt.","Servera med soja/lime."]
  ),
  mk("premium_steak","Biff + pepparsås","Premium","steak,pepper_sauce","Klassisk fine dining.",
    ["Biff","Grönpeppar","Grädde","Fond","Smör"],
    ["Stek biff.","Vila.","Koka sås med fond + grädde + peppar.","Servera."]
  ),
  mk("premium_seabass","Havsbars + citron","Premium","seabass,lemon","Ren och ljus lyx.",
    ["Havsbars","Smör","Citron","Salt"],
    ["Salta fisken.","Stek med smör.","Pressa citron.","Servera."]
  )
];

function mk(id,name,cat,unsplashQuery,shortDesc,ingredients,steps){
  return {
    id,
    name,
    cat,
    desc: shortDesc,
    img: `https://source.unsplash.com/1600x2000/?${encodeURIComponent(unsplashQuery)}`,
    recipe: {
      time: "25–45 min",
      level: "Lätt",
      portions: "2–4",
      ingredients,
      steps
    }
  };
}
