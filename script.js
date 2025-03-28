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
let usedCoin = [];

priceEl.innerText = `$${price}`;

const totalInDrawer = () => {
  let total = 0;

  cidEl.forEach((el, index) => {
    total += cid[index][1].toFixed(2);
  });

  return total;
};

const changeDueMessage = (message) => {
  changeDue.innerText = `Status: ${message}`;
};

// strange problem:
// If usedCoin.length is used in the for loop than the cid values are kept
// right, but when cid.length is used than the cid array faces problem.
// In both cases, the final change amount is not correct.

const isChangeAvailable = (changeAmount) => {
  const changeBeforeUpdate = changeAmount;
  let cidTemp = [];

  for (let i = 0; i < usedCoin.length; i++) {
    usedCoin[i] = cid[i];
    usedCoin[i][1] = 0;
    // cidTemp[i] = cid[i];
  }

  for (let i = 0; i < cid.length; i++) {
    alert(cid[i][1]);
  }

  for (let i = cidTemp.length - 1; i >= 0; i--) {
    if (cidTemp[i][1] === 0) {
      // alert(cidTemp[i][1]);
      continue;
    } else if (changeAmount === 0) {
      break;
    } else if (cidTemp[i][1] > changeAmount) {
      const changeHere = Math.floor(changeAmount / amounts[i]) * amounts[i];
      cidTemp[i][1] -= changeHere;
      usedCoin[i][1] = changeHere;
      changeAmount -= changeHere;
    } else {
      alert("Hi!");
      changeAmount -= cidTemp[i][1];
      usedCoin[i][1] = cidTemp[i][1];
      cidTemp[i][1] = 0;
    }
  }

  alert(changeAmount);

  if (changeAmount === 0.0) {
    cid = cidTemp;
    return true;
  } else {
    return false;
  }
};

const isDrawerEmpty = () => {
  for (let i = 0; i < cid.length; i++) {
    if (cid[i][1] != 0) {
      return false;
    }
  }
  return true;
};

const printChange = () => {
  usedCoin.forEach((element) => {
    if (element[1] !== 0) {
      changeDue.innerText += `${element[0]}: ${element[1]}`;
    }
  });
};

const printDrawer = () => {
  cidEl.forEach((el, index) => {
    el.innerText = `$${cid[index][1]}`;
  });
};

const calculateChange = () => {
  const changeAmount = cash.value - price;

  if (changeAmount < 0) {
    changeDue.style.display = "none";
    alert("customer does not have enough money to purchase the item");
  } else if (changeAmount === 0) {
    changeDue.style.display = "block";
    changeDue.innerText = "No change due - customer paid with exact cash";
  } else {
    changeDue.style.display = "block";

    if (isChangeAvailable(changeAmount.toFixed(2))) {
      if (isDrawerEmpty()) {
        changeDueMessage("CLOSED");
      } else {
        changeDueMessage("OPEN");
      }
      printChange();
      printDrawer();
    } else {
      changeDueMessage("INSUFFICIENT_FUNDS");
    }
  }
};

printDrawer();

purchaseBtn.addEventListener("click", calculateChange);
cash.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    calculateChange();
  }
});
