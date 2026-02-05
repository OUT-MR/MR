(function(){
  const CART_KEY = "bap_cart_v2";
  const FAVORITES_KEY = "bap_fav_v1";

  function $(id){ return document.getElementById(id); }
  function qs(){ return new URLSearchParams(location.search); }

  function getJSON(key, fallback){
    try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
    catch { return fallback; }
  }
  function setJSON(key, val){ localStorage.setItem(key, JSON.stringify(val)); }

  function getCart(){ return getJSON(CART_KEY, []); }
  function setCart(v){ setJSON(CART_KEY, v); syncBadges(); }

  function getFav(){ return getJSON(FAVORITES_KEY, []); }
  function setFav(v){ setJSON(FAVORITES_KEY, v); }

  function syncHeader(){
    const bar = $("bar");
    if(!bar) return;
    const sc = window.scrollY > 20;
    bar.classList.toggle("scrolled", sc);
  }

  function syncBadges(){
    const n = getCart().length;
    const b = $("bagCount");
    if(b){
      b.style.display = n ? "inline-flex" : "none";
      b.textContent = n;
    }
  }

  function open(el){ el.classList.add("open"); }
  function close(el){ el.classList.remove("open"); }

  function safeImg(img){
    img.onerror = () => { img.src = "assets/hero.jpg"; };
  }

  // ---------- INDEX ----------
  function initIndex(){
    syncBadges();
    window.addEventListener("scroll", syncHeader, {passive:true});
    syncHeader();

    // video fallback
    const v = $("heroVideo");
    const heroImg = $("heroImg");
    if(v && heroImg){
      const fallback = () => { v.style.display="none"; heroImg.style.display="block"; };
      v.addEventListener("error", fallback);
      setTimeout(() => { if(!v.currentSrc) fallback(); }, 800);
    }

    const dishes = (window.DISHES || []);
    const FILTERS = ["Alla", ...Array.from(new Set(dishes.map(d=>d.cat)))];
    let active = "Alla";

    const filterBar = $("filterBar");
    const grid = $("grid");
    const meta = $("resultMeta");

    function renderFilters(){
      filterBar.innerHTML = "";
      FILTERS.forEach(f=>{
        const b = document.createElement("button");
        b.className = "chip" + (f===active ? " active" : "");
        b.type = "button";
        b.textContent = f;
        b.onclick = () => { active=f; renderFilters(); renderGrid(); };
        filterBar.appendChild(b);
      });
    }

    function visible(d){ return active==="Alla" || d.cat===active; }

    function renderGrid(){
      const list = dishes.filter(visible);
      meta.textContent = `${list.length} rätter`;

      grid.innerHTML = "";
      list.forEach(d=>{
        const a = document.createElement("a");
        a.className = "item";
        a.href = `dish.html?id=${encodeURIComponent(d.id)}`;
        a.innerHTML = `
          <div class="studio"><img src="${d.img}" alt="${d.name}"></div>
          <div class="label">
            <p class="cat">${d.cat}</p>
            <p class="name">${d.name}</p>
          </div>
        `;
        safeImg(a.querySelector("img"));
        grid.appendChild(a);
      });
    }

    renderFilters();
    renderGrid();

    // Scroll CTA
    const go = $("goRatter");
    if(go) go.onclick = ()=> $("ratter").scrollIntoView({behavior:"smooth"});

    // MENU LEFT (categories)
    const menuOverlay = $("menuOverlay");
    const menuCats = $("menuCats");
    const menuBtn = $("menuBtn");
    const menuClose = $("menuClose");
    if(menuOverlay && menuBtn && menuClose){
      menuBtn.onclick = () => {
        menuCats.innerHTML = "";
        FILTERS.forEach(f=>{
          const row = document.createElement("div");
          row.className = "row";
          row.innerHTML = `
            <div style="flex:1">
              <b style="font-size:13px">${f}</b><div class="small">${f==="Alla"?"Alla rätter":"Filter"}</div>
            </div>
            <div class="arrow">→</div>
          `;
          row.onclick = ()=>{
            active=f;
            renderFilters();
            renderGrid();
            close(menuOverlay);
            $("ratter").scrollIntoView({behavior:"smooth"});
          };
          menuCats.appendChild(row);
        });
        open(menuOverlay);
      };
      menuClose.onclick = ()=>close(menuOverlay);
      menuOverlay.addEventListener("click",(e)=>{ if(e.target===menuOverlay) close(menuOverlay); });
    }

    // SEARCH full overlay
    const searchOverlay = $("searchOverlay");
    const searchBtn = $("searchBtn");
    const openSearch2 = $("openSearch2");
    const searchClose = $("searchClose");
    const q = $("q");
    const searchList = $("searchList");
    const searchCount = $("searchCount");

    function renderSearch(text){
      const t = (text||"").trim().toLowerCase();
      const list = dishes.filter(d=>{
        if(!t) return true;
        return d.name.toLowerCase().includes(t) || d.cat.toLowerCase().includes(t);
      });

      searchCount.textContent = list.length ? `${list.length} träffar` : "Inga träffar";
      searchList.innerHTML = "";

      list.slice(0,40).forEach(d=>{
        const row = document.createElement("div");
        row.className="row";
        row.innerHTML = `
          <div class="thumb"><img src="${d.img}" alt=""></div>
          <div style="flex:1">
            <b style="font-size:13px">${d.name}</b><div class="small">${d.cat}</div>
          </div>
          <div class="arrow">→</div>
        `;
        safeImg(row.querySelector("img"));
        row.onclick = ()=> location.href = `dish.html?id=${encodeURIComponent(d.id)}`;
        searchList.appendChild(row);
      });
    }

    function openSearch(){
      if(!searchOverlay) return;
      open(searchOverlay);
      q.value="";
      renderSearch("");
      q.focus();
    }

    if(searchBtn) searchBtn.onclick = openSearch;
    if(openSearch2) openSearch2.onclick = openSearch;
    if(searchClose) searchClose.onclick = ()=>close(searchOverlay);
    if(searchOverlay) searchOverlay.addEventListener("click",(e)=>{ if(e.target===searchOverlay) close(searchOverlay); });
    if(q) q.addEventListener("input", ()=>renderSearch(q.value));

    // CART right
    const bagOverlay = $("bagOverlay");
    const bagBtn = $("bagBtn");
    const bagClose = $("bagClose");
    const bagList = $("bagList");
    const bagEmpty = $("bagEmpty");

    function renderBag(){
      const cart = getCart();
      bagEmpty.style.display = cart.length ? "none" : "block";
      bagList.innerHTML = "";
      cart.forEach((it, idx)=>{
        const row = document.createElement("div");
        row.className="row";
        row.innerHTML = `
          <div class="thumb"><img src="${it.img || "assets/hero.jpg"}" alt=""></div>
          <div style="flex:1">
            <b style="font-size:13px">${it.name}</b><div class="small">${it.pack || "Ej vald"}</div>
          </div>
          <button class="x" type="button" aria-label="Remove">✕</button>
        `;
        safeImg(row.querySelector("img"));
        row.addEventListener("click",(e)=>{
          if(e.target.tagName.toLowerCase()==="button") return;
          location.href = `dish.html?id=${encodeURIComponent(it.id)}`;
        });
        row.querySelector("button").onclick = ()=>{
          const next = getCart().filter((_,i)=>i!==idx);
          setCart(next);
          renderBag();
        };
        bagList.appendChild(row);
      });
      syncBadges();
    }

    if(bagBtn) bagBtn.onclick = ()=>{ renderBag(); open(bagOverlay); };
    if(bagClose) bagClose.onclick = ()=>close(bagOverlay);
    if(bagOverlay) bagOverlay.addEventListener("click",(e)=>{ if(e.target===bagOverlay) close(bagOverlay); });

    // LOGIN
    const loginBtn = $("loginBtn");
    if(loginBtn) loginBtn.onclick = ()=> location.href="login.html";

    // ESC
    window.addEventListener("keydown",(e)=>{
      if(e.key!=="Escape") return;
      if(menuOverlay) close(menuOverlay);
      if(searchOverlay) close(searchOverlay);
      if(bagOverlay) close(bagOverlay);
    });

    // footer year
    const y = $("y"); if(y) y.textContent = new Date().getFullYear();
  }

  // ---------- DISH PAGE ----------
  function initDish(){
    syncBadges();

    const id = qs().get("id");
    const dish = (window.DISHES||[]).find(d=>d.id===id) || (window.DISHES||[])[0];
    if(!dish) return;

    const img = $("dishImg");
    const name = $("dishName");
    const cat = $("dishCat");
    if(img){ img.src = dish.img; safeImg(img); }
    if(name) name.textContent = dish.name;
    if(cat) cat.textContent = dish.cat;

    const packs = [
      { key:"duo", label:"Duo", people:2, price:399 },
      { key:"par", label:"Par", people:2, price:449 },
      { key:"trio", label:"Trio", people:3, price:499 },
      { key:"squad", label:"Squad", people:4, price:599 },
      { key:"plato", label:"Plato Mode", people:3, price:549 }
    ];

    let chosen = null;

    const packsEl = $("packs");
    const priceLine = $("priceLine");
    const orderBox = $("orderBox");

    const nameEl = $("name");
    const phoneEl = $("phone");
    const methodEl = $("method");
    const datetimeEl = $("datetime");
    const addressEl = $("address");
    const addressWrap = $("addressWrap");

    function syncAddr(){
      if(!methodEl) return;
      addressWrap.style.display = (methodEl.value==="leverans") ? "" : "none";
    }

    function renderPacks(){
      packsEl.innerHTML="";
      packs.forEach(p=>{
        const row = document.createElement("div");
        row.className = "row";
        row.style.borderRadius="12px";
        row.innerHTML = `
          <div style="flex:1">
            <b style="font-size:13px">${p.label}</b>
            <div class="small">${p.people} personer</div>
          </div>
          <div class="arrow">${chosen===p.key ? "✓" : "→"}</div>
        `;
        row.onclick = ()=>{
          chosen = p.key;
          renderPacks();
          updateUI();
        };
        packsEl.appendChild(row);
      });
    }

    function orderText(){
      const p = packs.find(x=>x.key===chosen);
      const method = methodEl.value==="leverans" ? "Leverans" : "Hämtning";
      const addr = methodEl.value==="leverans" ? (addressEl.value.trim()||"—") : "—";
      return [
        `Rätt: ${dish.name}`,
        `Paket: ${p ? p.label : "—"} (${p ? p.people : "—"})`,
        `Pris: ${p ? p.price : "—"} SEK`,
        `Namn: ${nameEl.value.trim()||"—"}`,
        `Telefon: ${phoneEl.value.trim()||"—"}`,
        `Datum/tid: ${datetimeEl.value.trim()||"—"}`,
        `Metod: ${method}`,
        `Adress: ${addr}`
      ].join("\n");
    }

    function updateUI(){
      const p = packs.find(x=>x.key===chosen);
      priceLine.textContent = p ? `Pris: ${p.price} SEK · ${p.label} (${p.people})` : "Välj ett paket för att se pris.";
      orderBox.textContent = orderText();
    }

    function canPay(){
      if(!chosen) return false;
      if(!nameEl.value.trim()) return false;
      if(!phoneEl.value.trim()) return false;
      if(!datetimeEl.value.trim()) return false;
      if(methodEl.value==="leverans" && !addressEl.value.trim()) return false;
      return true;
    }

    $("backBtn").onclick = ()=> location.href="index.html";
    $("recipeBtn").onclick = ()=> location.href = `recipe.html?id=${encodeURIComponent(dish.id)}`;

    $("addBtn").onclick = ()=>{
      if(!chosen){ alert("Välj paket först."); return; }
      const p = packs.find(x=>x.key===chosen);
      const next = getCart().filter(x=>x.id!==dish.id);
      next.push({ id:dish.id, name:dish.name, img:dish.img, pack:`${p.label} (${p.people})` });
      setCart(next);
      alert("Tillagd i bag.");
      syncBadges();
    };

    $("copyBtn").onclick = async ()=>{
      try { await navigator.clipboard.writeText(orderText()); alert("Kopierat."); }
      catch { alert("Kunde inte kopiera. Markera texten manuellt."); }
    };

    $("payBtn").onclick = ()=>{
      if(!canPay()){
        alert("Fyll i paket, namn, telefon, datum/tid och adress (om leverans).");
        return;
      }
      alert("Betalning: koppla din Stripe-länk här när du vill. Just nu är det en demo.");
    };

    methodEl.addEventListener("change", ()=>{ syncAddr(); updateUI(); });
    [nameEl, phoneEl, datetimeEl, addressEl].forEach(el=>el.addEventListener("input", updateUI));

    syncAddr();
    renderPacks();
    updateUI();

    // bag overlay
    wireBagOverlay();
    wireSearchOverlay();
  }

  // ---------- RECIPE PAGE ----------
  function initRecipe(){
    syncBadges();
    const id = qs().get("id");
    const dish = (window.DISHES||[]).find(d=>d.id===id) || (window.DISHES||[])[0];
    if(!dish) return;

    $("backToDish").onclick = ()=> location.href = `dish.html?id=${encodeURIComponent(dish.id)}`;

    $("rName").textContent = dish.name;
    $("rCat").textContent = dish.cat;
    $("rDesc").textContent = dish.desc || "—";

    const img = $("rImg");
    img.src = dish.img;
    safeImg(img);

    $("rTime").textContent = dish.recipe.time;
    $("rLevel").textContent = dish.recipe.level;
    $("rPortions").textContent = dish.recipe.portions;

    const ing = $("ingredients");
    ing.innerHTML = "";
    dish.recipe.ingredients.forEach(x=>{
      const li=document.createElement("li");
      li.textContent=x;
      ing.appendChild(li);
    });

    const steps = $("steps");
    steps.innerHTML = "";
    dish.recipe.steps.forEach((x,i)=>{
      const li=document.createElement("li");
      li.textContent = x;
      steps.appendChild(li);
    });

    wireBagOverlay();
    wireSearchOverlay();
  }

  // ---------- HELP PAGE ----------
  function initHelp(){
    const faqs = [
      { q:"Hur beställer jag?", a:"Välj en rätt. Välj paket. Fyll i leveransinfo. Lägg i bag. Kopiera order om du vill." },
      { q:"När ser jag pris?", a:"Pris visas när du väljer paket på rätten." },
      { q:"Levererar ni överallt?", a:"Just nu är fokus Västmanlands län. Du kan ändra området senare." },
      { q:"Kan jag avboka?", a:"Sätt din policy här. Till exempel: avbokning senast 24 timmar innan." },
      { q:"Allergier?", a:"Skriv i meddelandet i help-formuläret eller lägg en allergirad i order-texten." },
      { q:"Hur fungerar Duo/Par/Trio/Squad/Plato Mode?", a:"Det är paketstorlekar. Välj det som matchar antal personer." }
    ];

    const q = $("helpQ");
    const list = $("faqList");

    function render(t){
      const s = (t||"").trim().toLowerCase();
      list.innerHTML = "";
      faqs.filter(x=> !s || x.q.toLowerCase().includes(s) || x.a.toLowerCase().includes(s))
        .forEach(x=>{
          const div=document.createElement("div");
          div.className="panel";
          div.style.boxShadow="none";
          div.innerHTML = `
            <div class="pad">
              <div class="kick">${x.q}</div>
              <div class="desc">${x.a}</div>
            </div>
          `;
          list.appendChild(div);
        });
    }

    q.addEventListener("input", ()=>render(q.value));
    render("");

    $("helpForm").addEventListener("submit",(e)=>{
      e.preventDefault();
      alert("Skickat. Koppla detta till email eller formulär-tjänst när du vill.");
      e.target.reset();
    });

    const y = $("y"); if(y) y.textContent = new Date().getFullYear();
  }

  // ---------- CONTACT PAGE ----------
  function initContact(){
    $("contactForm").addEventListener("submit",(e)=>{
      e.preventDefault();
      alert("Skickat. Koppla detta till email när du vill.");
      e.target.reset();
    });
    const y = $("y"); if(y) y.textContent = new Date().getFullYear();
  }

  // ---------- LOGIN PAGE ----------
  function initLogin(){
    $("loginForm").addEventListener("submit",(e)=>{
      e.preventDefault();
      alert("Demo. Koppla login senare.");
    });
    const y = $("y"); if(y) y.textContent = new Date().getFullYear();
  }

  // ---------- shared overlays ----------
  function wireSearchOverlay(){
    const overlay = $("searchOverlay");
    const btn = $("searchBtn");
    const closeBtn = $("searchClose");
    const q = $("q");
    const list = $("searchList");
    const count = $("searchCount");
    if(!overlay || !btn || !closeBtn) return;

    const dishes = (window.DISHES||[]);
    function render(text){
      const t=(text||"").trim().toLowerCase();
      const res = dishes.filter(d=>!t || d.name.toLowerCase().includes(t) || d.cat.toLowerCase().includes(t));
      count.textContent = res.length ? `${res.length} träffar` : "Inga träffar";
      list.innerHTML="";
      res.slice(0,30).forEach(d=>{
        const row=document.createElement("div");
        row.className="row";
        row.innerHTML=`
          <div class="thumb"><img src="${d.img}" alt=""></div>
          <div style="flex:1">
            <b style="font-size:13px">${d.name}</b><div class="small">${d.cat}</div>
          </div>
          <div class="arrow">→</div>
        `;
        safeImg(row.querySelector("img"));
        row.onclick=()=>location.href=`dish.html?id=${encodeURIComponent(d.id)}`;
        list.appendChild(row);
      });
    }

    btn.onclick=()=>{
      open(overlay);
      if(q){ q.value=""; render(""); q.focus(); }
    };
    closeBtn.onclick=()=>close(overlay);
    overlay.addEventListener("click",(e)=>{ if(e.target===overlay) close(overlay); });
    if(q) q.addEventListener("input",()=>render(q.value));
  }

  function wireBagOverlay(){
    const overlay = $("bagOverlay");
    const btn = $("bagBtn");
    const closeBtn = $("bagClose");
    const list = $("bagList");
    const empty = $("bagEmpty");
    if(!overlay || !btn || !closeBtn) return;

    function render(){
      const cart=getCart();
      empty.style.display = cart.length ? "none" : "block";
      list.innerHTML="";
      cart.forEach((it,idx)=>{
        const row=document.createElement("div");
        row.className="row";
        row.innerHTML=`
          <div class="thumb"><img src="${it.img || "assets/hero.jpg"}" alt=""></div>
          <div style="flex:1">
            <b style="font-size:13px">${it.name}</b><div class="small">${it.pack || "Ej vald"}</div>
          </div>
          <button class="x" type="button">✕</button>
        `;
        safeImg(row.querySelector("img"));
        row.addEventListener("click",(e)=>{
          if(e.target.tagName.toLowerCase()==="button") return;
          location.href = `dish.html?id=${encodeURIComponent(it.id)}`;
        });
        row.querySelector("button").onclick=()=>{
          setCart(getCart().filter((_,i)=>i!==idx));
          render();
        };
        list.appendChild(row);
      });
      syncBadges();
    }

    btn.onclick=()=>{ render(); open(overlay); };
    closeBtn.onclick=()=>close(overlay);
    overlay.addEventListener("click",(e)=>{ if(e.target===overlay) close(overlay); });

    window.addEventListener("keydown",(e)=>{
      if(e.key!=="Escape") return;
      close(overlay);
    });
  }

  // ---------- BOOT ----------
  document.addEventListener("DOMContentLoaded", ()=>{
    syncBadges();

    const page = document.body.getAttribute("data-page");
    if(page==="index") initIndex();
    if(page==="dish") initDish();
    if(page==="recipe") initRecipe();
    if(page==="help") initHelp();
    if(page==="contact") initContact();
    if(page==="login") initLogin();
  });

  // expose tiny helpers
  function getCart(){ return getJSON(CART_KEY, []); }
})();
