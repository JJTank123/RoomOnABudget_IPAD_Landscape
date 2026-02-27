let budget = 3500;
const budgetDisplay = document.getElementById('budget');
const roomCanvas = document.getElementById('roomCanvas');
const itemOptions = document.getElementById('itemOptions');
const categories = document.querySelectorAll('.category');
const changeViewBtn = document.getElementById('changeView');

let currentCategory = null;
let tierIndexes = {
  Basic: 0,
  Standard: 0,
  Luxury: 0
};

const tiers = ["Basic", "Standard", "luxury"];


let selectedFurniture = null; // currently selected item
let borderTimeout; // auto-remove green outline
const layerOrder = {
  rugs: 0,          // ALWAYS bottom
  table: 1,
  couch: 2,
  entertainment: 3,
  Lighting: 4,
  paintings:5
};
// Track selected furniture per type
let selectedItems = {
  couch: null,
  table: null,
  Lighting: null,
  paintings:null,
  entertainment: null,
  rugs:null
};

// Furniture data (all items have front, flipped, and back images)
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
      {name:"Standard Table 1", price: 400, img:"Standard_table2.png",
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
      {name:"Standard Entertainment System 1", price:650, img: "/Standard_entertainment1.png",
        flippedImg: "Standard_entertainment1-f.png",
        rearImg: "Standard_entertainment1.png",
        rearImgF: "Standard_entertainment1-f.png",
        width: 200
      },

      {name:"Standard Entertainment System 2", price:650, img: "Standard_entertainment2.png",
        flippedImg: "Standard_entertainment2-f.png",
        rearImg: "Standard_entertainment2.png",
        rearImgF: "Standard_entertainment2-f.png",
        width: 130
      },

      {name:"Standard Entertainment System 2", price:650, img: "/Standard_entertainment3.png",
        flippedImg: "Standard_entertainment3-f.png",
        rearImg: "Standard_entertainment3.png",
        rearImgF: "Standard_entertainment3-f.png",
        width: 130

      }

    ],

    Luxury: [
      {name:"Luxury Entertainment System 1", price:1200, img:"luxury_entertainment1.png",
      flippedImg:"luxury_entertainment1-f.png",
      rearImg: "luxury_entertainment1.png",
      rearImgF: "luxury_entertainment1-f.png",
      width:130
    },
      {name:"Luxury Entertainment System 2", price:1200, img:"luxury_entertainment2.png",
      flippedImg: "luxury_entertainment2-f.png",
      rearImg: "luxury_entertainment2.png",
      rearImgF: "luxury_entertainment2-f.png",
      width:130
    },

      {name:"Luxury Entertainment System 3", price:1200, img:"luxury_entertainment3.png",
      flippedImg: "luxury_entertainment3-f.png",
      rearImg: "luxury_entertainment3.png",
      rearImgF: "luxury_entertainment3-f.png",
      width:150
    },

    ]
  },

  Lighting: {
    Basic: [
      {name:"Basic Lighting 1", price:120, img:"/Lighting/basic_lighting1.png",
        flippedImg: "basic_lighting1-f.png",
        rearImg:"basic_lighting1.png",
        rearImgF:"basic_lighting1-f.png",
        width:150
      },
      {name:"Basic Lighting 2", price: 120, img:"/Lighting/basic_lighting2.png",
        flippedImg:"basic_lighting2.png",
        rearImg:"basic_lighting2.png",
        rearImgF: "basic_lighting2.png",
        width: 150
      },
        {name:"Basic Lighting 3", price: 120, img:"basic_lighting3.png",
        flippedImg:"basic_lighting3.png",
        rearImg:"basic_lighting3.png",
        rearImgF: "basic_lighting3.png",
        width: 150
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
      {name:"Luxury Lighting 1", price:500, img:""luxury_lighting1.png",
      flippedImg: ""luxury_lighting1-f.png",
      rearImg: ""luxury_lighting1.png",
      rearImgF: ""luxury_lighting1-f.png",
      width:150
      },
      {name:"Luxury Lighting 2", price:500, img:""luxury_lighting2.png",
      flippedImg: ""luxury_lighting2.png",
      rearImg: ""luxury_lighting2.png",
      rearImgF: ""luxury_lighting2.png",
      width:150
      },

      {name:"Luxury Lighting 3", price:500, img:""luxury_lighting3.png",
      flippedImg: ""luxury_lighting3.png",
      rearImg: ""luxury_lighting3.png",
      rearImgF: ""luxury_lighting3.png",
      width:150
      }
    ]
  },

  rugs: {
    Basic: [
      {name:"Basic Rug 1", price:150, img:"Carpet/basic_carpet1.png",
      flippedImg: "Carpet/basic_carpet1.png",
      rearImg: "Carpet/basic_carpet1.png",
      rearImgF: "Carpet/basic_carpet1.png",
      width:300
      },

      {name:"Basic Rug 2", price:150, img:"Carpet/basic_carpet2.png",
      flippedImg: "Carpet/basic_carpet2-f.png",
      rearImg: "Carpet/basic_carpet2.png",
      rearImgF: "Carpet/basic_carpet2-f.png",
      width:300        
      },

      {name:"Basic Rug 3", price:150, img:"Carpet/basic_carpet3.png",
      flippedImg: "Carpet/basic_carpet3-f.png",
      rearImg: "Carpet/basic_carpet3.png",
      rearImgF: "Carpet/basic_carpet3-f.png",
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
      {name:"Basic Painting 1", price:80, img: "Paintings/basic_painting1.png",
       flippedImg: "Paintings/basic_painting1-f.png",
       rearImg: "Paintings/basic_painting1.png",
       rearImgF: "Paintings/basic_painting1-f.png",
       width: 150
      },
      {name:"Basic Painting 2", price:80, img: "Paintings/basic_painting2.png",
       flippedImg: "Paintings/basic_painting2-f.png",
       rearImg: "Paintings/basic_painting2.png",
       rearImgF: "Paintings/basic_painting2-f.png",
       width: 150
      },
      {name:"Basic Painting 3", price:80, img: "Paintings/basic_painting3.png",
       flippedImg: "Paintings/basic_painting3-f.png",
       rearImg: "Paintings/basic_painting3.png",
       rearImgF: "Paintings/basic_painting3-f.png",
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


// Update budget display
function updateBudgetDisplay() {
  budgetDisplay.textContent = `Budget Remaining: $${budget}`;
}

//make draggable
function makeDraggable(element) {

  element.onmousedown = function(e) {
    e.preventDefault();

    selectedFurniture = element;
    showSelectionOutline(element);

    element.style.cursor = "grabbing";

    const type = element.dataset.type;
    element.style.zIndex = 1000; // bring to front while dragging

    const rect = element.getBoundingClientRect();
    const canvasRect = roomCanvas.getBoundingClientRect();

    let shiftX = e.clientX - rect.left;
    let shiftY = e.clientY - rect.top;

    function moveAt(pageX, pageY) {
      element.style.left =
        pageX - shiftX - canvasRect.left + "px";

      element.style.top =
        pageY - shiftY - canvasRect.top + "px";
    }

    function onMouseMove(e) {
      moveAt(e.clientX, e.clientY);
    }

    // ✅ listen globally
    document.addEventListener("mousemove", onMouseMove);

    function stopDrag() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", stopDrag);

      element.style.cursor = "grab";

      // restore correct layer
      element.style.zIndex = layerOrder[type];
    }

    // ✅ mouseup MUST be on document
    document.addEventListener("mouseup", stopDrag);
  };

  element.ondragstart = () => false;
}

// Highlight selected furniture with auto-remove after 5s
function showSelectionOutline(element) {
  // Remove outline from all other furniture
  document.querySelectorAll('#roomCanvas img').forEach(img => {
    if (img !== element) img.style.border = 'none';
  });

  // Highlight this element
  element.style.border = '2px solid green';

  // Clear previous timeout
  if (borderTimeout) clearTimeout(borderTimeout);

  // Remove outline after 5 seconds
  borderTimeout = setTimeout(() => {
    element.style.border = 'none';
  }, 5000);
}

// Show furniture items for a category
categories.forEach(button => {
  button.addEventListener('click', () => {

    currentCategory = button.dataset.type;

    tierIndexes = {
      Basic: 0,
      Standard: 0,
      Luxury: 0
    };

    showCurrentItem();
  });
});


// Buy or swap furniture
function buyItem(type, item) {
  // Refund previous item if exists
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

  // Create furniture image
  const imgElem = document.createElement('img');
  imgElem.src = item.img;
  imgElem.id = item.name;
  imgElem.dataset.type = type;
  imgElem.style.width = item.width + "px";

  // Store data for Change View
  imgElem.dataset.views = JSON.stringify([item.img, item.flippedImg, item.rearImg, item.rearImgF || item.img]);
  imgElem.dataset.viewIndex = 0;

  // Default positions
  const anchors = {
    couch: { top: '300px', left: '100px' },
    table: { top: '250px', left: '100px' },
    Lighting: { top: '200px', left: '100px' },
    entertainment: {top: '100px', left:'100px'},
    rugs: {tops:'300px', left:'100px'},
    paintings: {tops:'300px',left:'100px'}
  };
  imgElem.style.top = anchors[type].top;
  imgElem.style.left = anchors[type].left;
  imgElem.style.position = 'absolute';
  imgElem.style.cursor = 'grab';
  imgElem.style.zIndex = layerOrder[type];

  // Draggable and selectable
  makeDraggable(imgElem);
  imgElem.addEventListener('click', () => {
    selectedFurniture = imgElem;
    showSelectionOutline(imgElem);
  });

  roomCanvas.appendChild(imgElem);
  selectedItems[type] = item;
}

// Change View button (cycles front → flipped → back)
changeViewBtn.addEventListener('click', () => {
  if (!selectedFurniture) return;

  let views = JSON.parse(selectedFurniture.dataset.views);
  let index = parseInt(selectedFurniture.dataset.viewIndex);

  index = (index + 1) % views.length; // cycle to next
  selectedFurniture.src = views[index];
  selectedFurniture.dataset.viewIndex = index;

  // Highlight selected furniture for 5 seconds
  showSelectionOutline(selectedFurniture);
});

// Finish room button
document.getElementById('finishRoom').addEventListener('click', () => {
  alert(`Room complete! Remaining budget: $${budget}`);
});

// Initialize budget
updateBudgetDisplay();


function showCurrentItem() {

  const tiersToShow = ["Basic", "Standard", "Luxury"];

  itemOptions.innerHTML = "";

  tiersToShow.forEach(tier => {

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

    // BUY BUTTON
    viewer.querySelector(".buyBtn").onclick =
      () => buyItem(currentCategory, item);

    // PREVIOUS
    viewer.querySelector(".prev").onclick = () => {
      tierIndexes[tier]--;
      if (tierIndexes[tier] < 0)
        tierIndexes[tier] = items.length - 1;
      showCurrentItem();
    };

    // NEXT
    viewer.querySelector(".next").onclick = () => {
      tierIndexes[tier]++;
      if (tierIndexes[tier] >= items.length)
        tierIndexes[tier] = 0;
      showCurrentItem();
    };

    itemOptions.appendChild(viewer);
  });
};
