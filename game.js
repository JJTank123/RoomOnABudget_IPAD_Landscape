// =======================
// ROOM DESIGNER GAME.JS
// =======================

document.addEventListener("DOMContentLoaded", () => {

  // ---------------- VARIABLES ----------------
  let budget = 3500;
  let selectedFurniture = null; // currently selected item
  let borderTimeout; // auto-remove green outline
  let currentCategory = null;
  let tierIndexes = { Basic: 0, Standard: 0, Luxury: 0 };

  const budgetDisplay = document.getElementById('budget');
  const roomCanvas = document.getElementById('roomCanvas');
  const itemOptions = document.getElementById('itemOptions');
  const categories = document.querySelectorAll('.category');
  const changeViewBtn = document.getElementById('changeView');
  const resetBtn = document.getElementById("resetBtn");
  const backBtn = document.getElementById("backtoDiceBtn");
  const finishBtn = document.getElementById("finishRoom");

  const tiers = ["Basic", "Standard", "Luxury"];

  const layerOrder = {
    rugs: 0,
    table: 1,
    couch: 2,
    entertainment: 3,
    Lighting: 4,
    paintings: 5
  };

  let selectedItems = {
    couch: null,
    table: null,
    Lighting: null,
    paintings: null,
    entertainment: null,
    rugs: null
  };

  const furnitureData = {
  couch: {
    Basic: [
      { name:"Basic Couch 1", price:500, img:"basic_couch1.png",
        flippedImg:"basic_couch1-f.png",
        rearImg:"basic_couch1_back.png",
        rearImgF:"basic_couch1_back-f.png",
        width:300
      },
      { name:"Basic Couch 2", price:500, img:"basic_couch2.png",
        flippedImg:"basic_couch2-f.png",
        rearImg:"basic_couch2_back.png",
        rearImgF:"basic_couch2_back-f.png",
        width:250
      },
      { name:"Basic Couch 3", price:500, img:"basic_couch3.png",
        flippedImg:"basic_couch3-f.png",
        rearImg:"basic_couch3_back.png",
        rearImgF:"basic_couch3_back-f.png",
        width:250
      }
  
    ],

    Standard: [
      { name:"Standard Couch 1", price:900, img:"Standard_couch1.png",
        flippedImg:"Standard_couch1-f.png",
        rearImg:"Standard_couch1_back.png",
        rearImgF:"Standard_couch1_back-f.png",
        width:250
      },

        { name:"Standard Couch 2", price:900, img:"Standard_couch2.png",
        flippedImg:"Standard_couch2-f.png",
        rearImg:"Standard_couch2_back.png",
        rearImgF:"Standard_couch2_back-f.png",
        width:250
      },
      { name:"Standard Couch 3", price:900, img:"Standard_couch3.png",
        flippedImg:"Standardcouch3-f.png",
        rearImg:"Standard_couch3_back.png",
        rearImgF:"Standard_couch3_back-f.png",
        width:250
      },


    ],

    Luxury: [
      { name:"Luxury Couch 1", price:1600, img:"luxury_couch1.png",
        flippedImg:"luxury_couch1-f.png",
        rearImg: "luxury_couch1_back.png",
        rearImgF: "luxury_couch1_back-f.png",
        width:300
      },

      { name:"Luxury Couch 2", price:1600, img:"luxury_couch2.png",
        flippedImg:"luxury_couch2-f.png",
        rearImg: "luxury_couch2_back.png",
        rearImgF: "luxury_couch2_back-f.png",
        width:300
      },

      { name:"Luxury Couch 3", price:1600, img:"luxury_couch3.png",
        flippedImg:"luxury_couch3-f.png",
        rearImg: "luxury_couch3_back.png",
        rearImgF: "luxury_couch3_back-f.png",
        width:350
      },
    ]
  },

  table: {
    Basic: [
      { name:"Basic Table 1", price: 200, img:"basic_table1.png",
        flippedImg:"basic_table1-f.png",
        rearImg: "basic_table1.png",
        rearImgF: "basic_table1-f.png",
        width: 200
      },

      { name:"Basic Table 2", price: 200, img:"basic_table2.png",
        flippedImg:"basic_table2-f.png",
        rearImg: "basic_table2.png",
        rearImgF: "basic_table2-f.png",
        width: 150
      },

      { name:"Basic Table 3", price: 200, img:"basic_table3.png",
        flippedImg:"basic_table3-f.png",
        rearImg: "basic_table3.png",
        rearImgF: "basic_table3-f.png",
        width: 200
      }
    ],

    Standard: [
      {name:"Standard Table 1", price: 400, img:"Standard_table1.png",
        flippedImg: "Standard_table1-f.png",
        rearImg:"Standard_table1.png",
        rearImgF:"Standard_table1-f.png",
        width: 200
      },
      {name:"Standard Table 2", price: 400, img:"Standard_table2.png",
        flippedImg: "Standard_table2-f.png",
        rearImg:"Standard_table2.png",
        rearImgF:"Standard_table2-f.png",
        width: 200
      },

      {name:"Standard Table 3", price: 400, img:"Standard_table3.png",
        flippedImg: "Standard_table3-f.png",
        rearImg:"Standard_table3.png",
        rearImgF:"Standard_table3-f.png",
        width: 200
      },
    ],

    Luxury: [
      {name:"Standard Table 1", price: 750, img:"luxury_table1.png",
        flippedImg: "luxury_table1-f.png",
        rearImg:"luxury_table1.png",
        rearImgF:"luxury_table1-f.png",
        width: 200
      },

      {name:"Standard Table 2", price: 750, img:"luxury_table2.png",
        flippedImg: "luxury_table2-f.png",
        rearImg:"luxury_table2.png",
        rearImgF:"luxury_table2-f.png",
        width: 200
      },

      {name:"Standard Table 3", price: 750, img:"luxury_table3.png",
        flippedImg: "luxury_table3-f.png",
        rearImg:"luxury_table3.png",
        rearImgF:"luxury_table3-f.png",
        width: 200
      },      
    ]

  },

  entertainment: {
    Basic: [
      {name:"Basic Entertainment System 1", price:350, img: "basic_entertainment1.png",
      flippedImg: "basic_entertainment1-f.png",
      rearImg: "basic_entertainment1.png",
      rearImgF: "basic_entertainment1-f.png",
      width: 200
    },

      {name: "Basic Entertainment System 2", price:350, img: "basic_entertainment2.png",
      flippedImg: "basic_entertainment2-f.png",
      rearImg: "basic_entertainment2.png",
      rearImgF: "basic_entertainment2-f.png",
      width: 200
      },

      {name: "Basic Entertainment System 3", price:350, img: "basic_entertainment3.png",
      flippedImg: "basic_entertainment3-f.png",
      rearImg: "basic_entertainment3.png",
      rearImgF: "basic_entertainment3-f.png",
      width: 200
      }  
      
    ],

    Standard: [
      {name:"Standard Entertainment System 1", price:650, img: "Standard_entertainment1.png",
        flippedImg: "Standard_entertainment1-f.png",
        rearImg: "Standard_entertainment1.png",
        rearImgF: "Standard_entertainment1-f.png",
        width: 200
      },

      {name:"Standard Entertainment System 2", price:650, img: "Standard_entertainment2.png",
        flippedImg: "Standard_entertainment2-f.png",
        rearImg: "Standard_entertainment2.png",
        rearImgF: "Standard_entertainment2-f.png",
        width: 200
      },

      {name:"Standard Entertainment System 2", price:650, img: "Standard_entertainment3.png",
        flippedImg: "Standard_entertainment3-f.png",
        rearImg: "Standard_entertainment3.png",
        rearImgF: "Standard_entertainment3-f.png",
        width: 200

      }

    ],

    Luxury: [
      {name:"Luxury Entertainment System 1", price:1200, img:"luxury_entertainment1.png",
      flippedImg:"luxury_entertainment1-f.png",
      rearImg: "luxury_entertainment1.png",
      rearImgF: "luxury_entertainment1-f.png",
      width:250
    },
      {name:"Luxury Entertainment System 2", price:1200, img:"luxury_entertainment2.png",
      flippedImg: "luxury_entertainment2-f.png",
      rearImg: "luxury_entertainment2.png",
      rearImgF: "luxury_entertainment2-f.png",
      width:250
    },

      {name:"Luxury Entertainment System 3", price:1200, img:"luxury_entertainment3.png",
      flippedImg: "luxury_entertainment3-f.png",
      rearImg: "luxury_entertainment3.png",
      rearImgF: "luxury_entertainment3-f.png",
      width:250
    },

    ]
  },

  lighting: {
    Basic: [
      {name:"Basic Lighting 1", price:120, img:"basic_lighting1.png",
        flippedImg: "basic_lighting1-f.png",
        rearImg:"basic_lighting1.png",
        rearImgF:"basic_lighting1-f.png",
        width:200
      },
      {name:"Basic Lighting 2", price: 120, img:"basic_lighting2.png",
        flippedImg:"basic_lighting2.png",
        rearImg:"basic_lighting2.png",
        rearImgF: "basic_lighting2.png",
        width: 200
      },
        {name:"Basic Lighting 3", price: 120, img:"basic_lighting3.png",
        flippedImg:"basic_lighting3.png",
        rearImg:"basic_lighting3.png",
        rearImgF: "basic_lighting3.png",
        width: 200
      }
    ],

    Standard: [
      {name:"Standard Lighting 1", price: 250, img:"Standard_Lighting1.png",
        flippedImg: "Standard_Lighting1-f.png",
        rearImg: "Standard_Lighting1.png",
        rearImgF: "Standard_Lighting1-f.png",
        width:150
      },

      {name:"Standard Lighting 2", price: 250, img:"Standard_Lighting2.png",
        flippedImg: "Standard_Lighting2-f.png",
        rearImg: "Standard_Lighting2.png",
        rearImgF: "Standard_Lighting2-f.png",
        width:150
      },

      {name:"Standard Lighting 3", price: 250, img:"Standard_Lighting3.png",
        flippedImg: "Standard_Lighting3.png",
        rearImg: "Standard_Lighting3.png",
        rearImgF: "Standard_Lighting3.png",
        width:150
      }      

    ],

    Luxury: [
      {name:"Luxury Lighting 1", price:500, img:"luxury_lighting1.png",
      flippedImg: "luxury_lighting1-f.png",
      rearImg: "luxury_ighting1.png",
      rearImgF: "luxury_lighting1-f.png",
      width:150
      },
      {name:"Luxury Lighting 2", price:500, img:"luxury_lighting2.png",
      flippedImg: "luxury_lighting2.png",
      rearImg: "luxury_lighting2.png",
      rearImgF: "luxuryl_ighting2.png",
      width:150
      },

      {name:"Luxury Lighting 3", price:500, img:"luxury_lighting3.png",
      flippedImg: "luxury_lighting3.png",
      rearImg: "luxury_lighting3.png",
      rearImgF: "luxury_lighting3.png",
      width:150
      }
    ]
  },

  rugs: {
    Basic: [
      {name:"Basic Rug 1", price:150, img:"basic_carpet1.png",
      flippedImg: "basic_carpet1.png",
      rearImg: "basic_carpet1.png",
      rearImgF: "basic_carpet1.png",
      width:300
      },

      {name:"Basic Rug 2", price:150, img:"basic_carpet2.png",
      flippedImg: "basic_carpet2-f.png",
      rearImg: "basic_carpet2.png",
      rearImgF: "basic_carpet2-f.png",
      width:300        
      },

      {name:"Basic Rug 3", price:150, img:"basic_carpet3.png",
      flippedImg: "basic_carpet3-f.png",
      rearImg: "basic_carpet3.png",
      rearImgF: "basic_carpet3-f.png",
      width:300 

      }


    ],

    Standard: [
      {name:"Standard Rug 1", price:300, img:"Standard_carpet1.png",
      flippedImg: "Standard_carpet1.png",
      rearImg: "Standard_carpet1.png",
      rearImgF: "Standard_carpet1.png",
      width:350
      },
      {name:"Standard Rug 2", price:300, img:"Standard_carpet2.png",
      flippedImg: "Standard_carpet2-f.png",
      rearImg: "Standard_carpet2.png",
      rearImgF: "Standard_carpet2-f.png",
      width:400
      },
      {name:"Standard Rug 3", price:300, img:"Standard_carpet3.png",
      flippedImg: "Standard_carpet3-f.png",
      rearImg: "Standard_carpet3.png",
      rearImgF: "Standard_carpet3-f.png",
      width:150
      }

    ],

    Luxury: [
      {name:"Luxury Rug 1", price:600, img:"luxury_carpet1.png",
      flippedImg: "luxury_carpet1-f.png",
      rearImg:"luxury_carpet1.png",
      rearImgF:"luxury_carpet1-f.png",
      width:400
      },
      {name:"Luxury Rug 2", price:600, img:"luxury_carpet2.png",
      flippedImg: "luxury_carpet2-f.png",
      rearImg:"luxury_carpet2.png",
      rearImgF:"luxury_carpet2-f.png",
      width:400
      },
      {name:"Luxury Rug 3", price:600, img:"luxury_carpet3.png",
      flippedImg: "luxury_carpet3.png",
      rearImg:"luxury_carpet3.png",
      rearImgF:"luxury_carpet3.png",
      width:350

      }
    ]
  },

  paintings: {
    Basic: [
      {name:"Basic Painting 1", price:80, img: "basic_painting1.png",
       flippedImg: "basic_painting1-f.png",
       rearImg: "basic_painting1.png",
       rearImgF: "basic_painting1-f.png",
       width: 150
      },
      {name:"Basic Painting 2", price:80, img: "basic_painting2.png",
       flippedImg: "basic_painting2-f.png",
       rearImg: "basic_painting2.png",
       rearImgF: "basic_painting2-f.png",
       width: 150
      },
      {name:"Basic Painting 3", price:80, img: "basic_painting3.png",
       flippedImg: "basic_painting3-f.png",
       rearImg: "basic_painting3.png",
       rearImgF: "basic_painting3-f.png",
       width: 100

      }
    ],

    Standard: [
      {name:"Standard Painting 1", price: 180, img: "Standard_painting1.png",
        flippedImg:"Standard_paintings1-f.png",
        rearImg: "Standard_painting1.png",
        rearImgF: "Standard_painting1-f.png",
        width:250
      },
      {name: "Standard Painting 2", price: 180, img: "Standard_painting2.png",
        flippedImg:"Standard_paintings2-f.png",
        rearImg: "Standard_painting2.png",
        rearImgF: "Standard_painting2-f.png",
        width:100
      },
      {name: "Standard Painting 3", price: 180, img: "Standard_painting3.png",
        flippedImg:"Standard_paintings3-f.png",
        rearImg: "Standard_painting3.png",
        rearImgF: "Standard_painting3-f.png",
        width:125

      }
    ],

    Luxury: [
      {name:"Luxury Painting 1", price: 400, img: "luxury_painting1.png",
        flippedImg:"luxury_painting1-f.png",
        rearImg: "luxury_painting1.png",
        rearImgF: "luxury_painting1-f.png",
        width:250
      },
      {name:"Luxury Painting 2", price: 400, img: "luxury_painting2.png",
        flippedImg:"luxury_painting2-f.png",
        rearImg: "luxury_painting2.png",
        rearImgF: "luxury_painting2-f.png",
        width:250
      },
      {name:"Luxury Painting 3", price: 400, img: "luxury_painting3.png",
        flippedImg:"luxury_painting3-f.png",
        rearImg: "luxury_painting3.png",
        rearImgF: "luxury_painting3-f.png",
        width:200
      }      
    ]
  }
};

  // ---------------- UPDATE BUDGET ----------------
  function updateBudgetDisplay() {
    budgetDisplay.textContent = `Budget Remaining: $${budget}`;
  }

  updateBudgetDisplay();

  // ---------------- DRAGGABLE ----------------
  function makeDraggable(element) {
    element.onmousedown = startDrag;
    element.ondragstart = () => false;
    element.ontouchstart = startDrag;

    function startDrag(e) {
      e.preventDefault();
      selectedFurniture = element;
      showSelectionOutline(element);
      element.style.cursor = "grabbing";

      const type = element.dataset.type;
      element.style.zIndex = 1000;

      const rect = element.getBoundingClientRect();
      const canvasRect = roomCanvas.getBoundingClientRect();

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      let shiftX = clientX - rect.left;
      let shiftY = clientY - rect.top;

      function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX - canvasRect.left + "px";
        element.style.top = pageY - shiftY - canvasRect.top + "px";
      }

      function onMove(event) {
        const moveX = event.touches ? event.touches[0].clientX : event.clientX;
        const moveY = event.touches ? event.touches[0].clientY : event.clientY;
        moveAt(moveX, moveY);
      }

      function stopDrag() {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", stopDrag);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", stopDrag);
        element.style.cursor = "grab";
        element.style.zIndex = layerOrder[type];
      }

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", stopDrag);
      document.addEventListener("touchmove", onMove, { passive: false });
      document.addEventListener("touchend", stopDrag);
    }
  }

  // ---------------- SELECTION OUTLINE ----------------
  function showSelectionOutline(element) {
    document.querySelectorAll('#roomCanvas img').forEach(img => {
      if (img !== element) img.style.border = 'none';
    });
    element.style.border = '2px solid green';
    if (borderTimeout) clearTimeout(borderTimeout);
    borderTimeout = setTimeout(() => {
      element.style.border = 'none';
    }, 5000);
  }

  // ---------------- SHOW CATEGORY ITEMS ----------------
  categories.forEach(button => {
    button.addEventListener('click', () => {
      currentCategory = button.dataset.type;
      tierIndexes = { Basic: 0, Standard: 0, Luxury: 0 };
      showCurrentItem();
    });
  });

  function showCurrentItem() {
    if (!currentCategory) return;
    itemOptions.innerHTML = "";

    tiers.forEach(tier => {
      const items = furnitureData[currentCategory][tier];
      if (!items) return;

      const index = tierIndexes[tier];
      const item = items[index];

      const viewer = document.createElement("div");
      viewer.className = "tierViewer";
      viewer.innerHTML = `
        <h3>${tier.toUpperCase()}</h3>
        <div class="viewerControls">
          <button class="prev">◀</button>
          <div class="itemDisplay">
            <img src="${item.img}" width="120">
            <p>${item.name}</p>
            <p>$${item.price}</p>
            <button class="buyBtn">Buy</button>
          </div>
          <button class="next">▶</button>
        </div>
      `;

      viewer.querySelector(".buyBtn").onclick = () => buyItem(currentCategory, item);
      viewer.querySelector(".prev").onclick = () => {
        tierIndexes[tier] = (tierIndexes[tier] - 1 + items.length) % items.length;
        showCurrentItem();
      };
      viewer.querySelector(".next").onclick = () => {
        tierIndexes[tier] = (tierIndexes[tier] + 1) % items.length;
        showCurrentItem();
      };

      itemOptions.appendChild(viewer);
    });
  }

  // ---------------- BUY ITEM ----------------
  function buyItem(type, item) {
    if (selectedItems[type]) {
      budget += selectedItems[type].price;
      const prevElem = document.getElementById(selectedItems[type].name);
      if (prevElem) prevElem.remove();
    }

    if (item.price > budget) {
      alert("Not enough budget!");
      return;
    }

    budget -= item.price;
    updateBudgetDisplay();

    const imgElem = document.createElement('img');
    imgElem.src = item.img;
    imgElem.id = item.name;
    imgElem.dataset.type = type;
    imgElem.style.width = item.width + "px";

    imgElem.dataset.views = JSON.stringify([item.img, item.flippedImg, item.rearImg, item.rearImgF || item.img]);
    imgElem.dataset.viewIndex = 0;

    const anchors = {
      couch: { top: '300px', left: '100px' },
      table: { top: '250px', left: '100px' },
      Lighting: { top: '200px', left: '100px' },
      entertainment: {top: '100px', left:'100px'},
      rugs: {top:'300px', left:'100px'},
      paintings: {top:'300px',left:'100px'}
    };
    imgElem.style.top = anchors[type].top;
    imgElem.style.left = anchors[type].left;
    imgElem.style.position = 'absolute';
    imgElem.style.cursor = 'grab';
    imgElem.style.zIndex = layerOrder[type];

    makeDraggable(imgElem);
    imgElem.addEventListener('click', () => {
      selectedFurniture = imgElem;
      showSelectionOutline(imgElem);
    });

    roomCanvas.appendChild(imgElem);
    selectedItems[type] = item;
  }

  // ---------------- CHANGE VIEW ----------------
  changeViewBtn.addEventListener('click', () => {
    if (!selectedFurniture) return;
    let views = JSON.parse(selectedFurniture.dataset.views);
    let index = parseInt(selectedFurniture.dataset.viewIndex);
    index = (index + 1) % views.length;
    selectedFurniture.src = views[index];
    selectedFurniture.dataset.viewIndex = index;
    showSelectionOutline(selectedFurniture);
  });

  // ---------------- FINISH ROOM ----------------
  finishBtn.addEventListener("click", () => {
    if (budget >= 0) {
      alert("✅ You stayed within budget! Drawer unlocked! Your code is 200");
    } else {
      alert("❌ Over Budget! Try Again");
    }
  });

  // ---------------- RESET ROOM ----------------
function resetRoom() {
  budget = 3500;
  updateBudgetDisplay();

  // Remove only furniture, not the room background
  document.querySelectorAll("#roomCanvas img").forEach(img => {
    if (!img.classList.contains('roomBackground')) img.remove();
  });

  selectedItems = { couch:null, table:null, lighting:null, paintings:null, entertainment:null, rugs:null };
  selectedFurniture = null;
  tierIndexes = { Basic:0, Standard:0, Luxury:0 };
  itemOptions.innerHTML = "";
}

  resetBtn.addEventListener("click", resetRoom);

  // ---------------- BACK TO DICE ----------------
  backBtn.addEventListener("click", () => {
    resetRoom();
    window.location.href = "dice.html";
  });

  // ---------------- LAYOUT ADJUST ----------------
  function adjustLayoutForOrientation() {
    document.body.style.height = window.innerHeight + "px";
  }
  window.addEventListener("resize", adjustLayoutForOrientation);
  window.addEventListener("orientationchange", adjustLayoutForOrientation);
  adjustLayoutForOrientation(); // initial run
});

