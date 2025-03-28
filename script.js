let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const amounts = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
const priceEl = document.getElementById("price");
const purchaseBtn = document.getElementById("purchase-btn");
const cash = document.getElementById("cash");
const changeDue = document.getElementById("change-due");

const cidEl = document.querySelectorAll(".cash-in-drawer > p > span");
let totalInDrawer = 0;

priceEl.innerText = `$${price}`;

cidEl.forEach((el, index) => {
  el.innerText = `$${cid[index][1]}`;
  totalInDrawer += cid[index][1];
});

const changeDueMessage = (message) => {
  changeDue.innerText = `Status: ${message}`;
};

const printDrawer = (usedCoin) => {
  usedCoin.forEach((element) => {
    if (element[1] !== 0) {
      changeDue.innerText += `${element[0]}: ${element[1]}`;
    }
  });
};

const updateDrawer = (changeAmount) => {
  const changeBeforeUpdate = changeAmount;
  let cidTemp = cid;
  let usedCoin = cid;

  for (let i = 0; i < usedCoin.length; i++) {
    usedCoin[i][1] = 0;
  }

  for (let i = cidTemp.length - 1; i >= 0; i--) {
    if (cidTemp[i][1] === 0) {
      continue;
    } else if (changeAmount === 0) {
      break;
    } else if (cidTemp[i][1] > changeAmount) {
      cidTemp[i][1] -= changeAmount;
      usedCoin[i][1] = changeAmount;
      changeAmount = 0;
      break;
    } else {
      changeAmount -= cidTemp[i][1];
      usedCoin[i][1] = cidTemp[i][1];
      cidTemp[i][1] = 0;
    }
  }

  if (changeAmount !== 0) {
    changeDueMessage("INSUFFICIENT_FUNDS");
  } else {
    cid = cidTemp;
    cidEl.forEach((el, index) => {
      el.innerText = `$${cid[index][1].toFixed(2)}`;
      totalInDrawer += cid[index][1];
    });

    if (totalInDrawer === changeBeforeUpdate) {
      changeDueMessage("CLOSED");
      printDrawer(usedCoin);
    } else {
      changeDueMessage("OPEN");
      printDrawer(usedCoin);
    }
  }
};

const calculateChange = () => {
  const changeAmount = cash.value - price;

  if (changeAmount < 0) {
    alert("customer does not have enough money to purchase the item");
    return;
  } else if (changeAmount === 0) {
    alert("No change due - customer paid with exact cash");
    return;
  }

  changeDue.style.display = "block";

  if (changeAmount > totalInDrawer) {
    changeDueMessage("INSUFFICIENT_FUNDS");
  } else {
    updateDrawer(changeAmount);
  }
};

purchaseBtn.addEventListener("click", calculateChange);
cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    calculateChange();
  }
});
