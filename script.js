// elements selectors
const addBtn = document.querySelector("#addToDisplay");
const inputValue = document.querySelector("#namesInput");
const displayTBody = document.querySelector("tbody");
const displaySection = document.querySelector(".bottomDisplaySection");
const generateBtn = document.querySelector("#generateBtn");

// event listeners
addBtn.addEventListener("click", addToDisplay);
generateBtn.addEventListener("click", generateSubGroupsClicked);

// array container to store submitted names
const allSubmittedNames = [];
let splitNames = [];

// variable to store amount of members of the overall group
let overallGroupSize = 0;

// variable to keep track of how many sessions created
let sessionCounter = 1;

// variable to store number of groups required
let subGroupsRequired = 0;

// variable to store number of groups required
let subGroupSize = 0;

// display input names and corresponding delete button to display section
function addToDisplay(e) {
  e.preventDefault();

  if (inputValue.value != " " && inputValue.value != "   " && inputValue.value != "") {
    // store name(s) entered by user in an array
    let newName = inputValue.value.split(" ");
    // loops through the array to append the name(s) along with a delete button
    for (let i = 0; i < newName.length; i++) {
      let newTr = document.createElement("tr");
      newTr.innerHTML = `<td class="finalNames" id="${newName[i]}">${newName[i]}</td><td><button class="btn btn-danger btnDelete" id="${newName[i]}del">Delete</button></td>`;

      // appends the new names onto the display
      displayTBody.append(newTr);

      // appends a delete button next to each name appended
      let x = newName[i];
      const deletebtn = document.querySelector(`#${newName[i]}del`);
      deletebtn.addEventListener("click", () => {
        document.querySelector(`#${x}`).parentElement.remove();
      });
    }

    // resets the input field to empty
    inputValue.value = "";

    // resets the newName arrays to empty
    newName = [];
  } else {
    inputValue.value = "";
    alert("Please enter a name");
  }
}

// Generate Sub-Groups button function and push all names into an array
function generateSubGroupsClicked() {
  // selects all finalNames class elements and store as an array
  const arrOfNames = document.querySelectorAll(".finalNames");
  
  // loops through the above array to extract the innerText value(names) and store them in another array
  for (let i = 0; i < arrOfNames.length; i++) {
    allSubmittedNames[i] = arrOfNames[i].innerText;
  }

  // updates the subGroupSize as per user choice
  subGroupSize = document.querySelector("#subGroupSize").value;

  // updates the overallGroupsize
  overallGroupSize = allSubmittedNames.length;

  // updates number of sub-groups required
  subGroupsRequired = Math.floor(overallGroupSize / subGroupSize);

  // runs the next function that will append names to each group for session1 only
  randomiseNames(allSubmittedNames, subGroupSize, subGroupsRequired);
}

function randomiseNames(arr, divider, subGroupsNum) {
  if ((subGroupSize <= subGroupsRequired) && (overallGroupSize % subGroupSize === 0 )) {
    // shuffles the array of submitted names
    let shuffled = arr.sort(() => Math.random() - 0.5);
    // console.log(shuffled);
    // split the shuffled array into arrays
    for (let i = 0; i < subGroupsNum; i++) {
      const newGroup = [];
      for (let j = 0; j < divider; j++) {
        let member = shuffled.pop();
        newGroup.push(member);
      }
      splitNames.push(newGroup);
    }

    // loops through the splitNames main array. and in each inner array, maps each element (which is an object here) to return the object's name property value and store inside a new array NamesInGroup.
    for (let i = 0; i < splitNames.length; i++) {
      const namesInGroup = splitNames[i];
      // appends the namesInGroup array in displaySection.
      const subGroup = document.createElement("div");
      subGroup.innerHTML = `Group ${i + 1} - ${namesInGroup}`;
      displaySection.append(subGroup);
    }

    // append the session number to the first grouping
    const sessionNum = document.createElement("div");
    sessionNum.innerText = `Session ${sessionCounter}`;
    displaySection.insertBefore(sessionNum, displaySection.firstChild);

    // increase the sessionCounter by 1 for the next subgroup generation
    sessionCounter++;

    // removes the first generate session button and creates a new generate button the existing.
    generateBtn.remove();

    // creates a new button that generates the next session of subGrouping
    const subsequentGenerationBtn = document.createElement("button");
    subsequentGenerationBtn.innerText = "Next Session";
    subsequentGenerationBtn.setAttribute("class", "btn btn-success");
    subsequentGenerationBtn.setAttribute("id", "subsequentGeneration");
    subsequentGenerationBtn.addEventListener("click", generateNextGroup);
    displaySection.append(subsequentGenerationBtn);
  } else alert("Members per sub-group needs to be a smaller number than the number of Sub-Groups and also be a divisible number of the overall group size.");
}

// this will be the function that will generate all subsequent sessions
function generateNextGroup() {
  document.querySelector("#subsequentGeneration").remove();
  // container to store next subGrouping
  let newGrouping = [];

  // loops through the previous array of arrays (), and pops the last member from each group to store in a tempArr. The tempArr will then be pushed into the newGrouping array to form the first subgroup of the newGrouping.
  let tempArr = [];
  for (let i = 0; i < subGroupSize; i++) {
    let newMember = splitNames[i].pop();
    tempArr.push(newMember);
  }
  newGrouping.push(tempArr);

  // the remaining names in the previousGrouping arr will then be pushed individually (they are currently in multiple nested arrays) into the leftOvers array
  let leftOvers = [];
  for (let i = 0; i < splitNames.length; i++) {
    for (let j = 0; j < splitNames[i].length; j++) {
      leftOvers.push(splitNames[i][j]);
    }
  }

  // randomise the leftOvers array
  leftOvers.sort(() => Math.random() - 0.5);

  // loops through the leftOvers array to create a new arrays of subgroups and push those new arrays to the newGrouping array
  for (let i = 0; i < subGroupsRequired - 1; i++) {
    let tempArr = [];
    for (let j = 0; j < subGroupSize; j++) {
      let newMember = leftOvers.pop();
      tempArr.push(newMember);
    }
    newGrouping.push(tempArr);
  }

  // appends the current session number
  const sessionNum = document.createElement("div");
  sessionNum.innerText = `Session ${sessionCounter}`;
  displaySection.append(sessionNum);
  sessionCounter++;

  //appends the namesInGroup array in displaySection.
  for (let i = 0; i < newGrouping.length; i++) {
    const namesInGroup = newGrouping[i];
    const subGroup = document.createElement("div");
    subGroup.innerText = `Group ${i + 1} - ${namesInGroup}`;
    displaySection.append(subGroup);
  }

  splitNames = newGrouping;

  // appends for generation button for subsequent sessions
  const subsequentGenerationBtn = document.createElement("button");
  subsequentGenerationBtn.innerText = "Next Session";
  subsequentGenerationBtn.setAttribute("class", "btn btn-success");
  subsequentGenerationBtn.setAttribute("id", "subsequentGeneration");
  subsequentGenerationBtn.addEventListener("click", generateNextGroup);
  displaySection.append(subsequentGenerationBtn);
}
