// variables
let startBtn = document.querySelector(".control-button span");
let helloName = document.querySelector(".info-container .name span");
let controlDiv = document.querySelector(".control-button");
let blockContainer = document.querySelector(".memory-game-blocks");
let triesElement = document.querySelector(".tries span");
let winnerBtn = document.querySelector(".winner  button");
// Create Array From Game Blocks 
let blocks = Array.from(blockContainer.children);
//Create Range Of Keys
let orderRange = Array.from(Array(blocks.length).keys());
let duration = 1000;


winnerBtn.onclick = function(){
    location.reload();
}
startBtn.onclick = function(){
    let yourName = prompt("What`s Your Name ? ");
    if(yourName == null || yourName == ""){
        helloName.innerHTML = "UnKnown";
    }
    else{
        helloName.innerHTML=yourName;
    }
    controlDiv.style.display = "none";
}
    //Add Order Css Property To Game Block
    blocks.forEach( (block , index)=> {
    block.style.order = orderRange[index];
       shuffle(orderRange);
        //Add Click Event
        block.addEventListener('click' , function(){
            //Trigger The Flip Block Function 
            flipBlock(block);
        });
       
   
});

// Flip Block Function

function flipBlock(selectedBlock){
    // Add Class isflipped
    selectedBlock.classList.add('is-flipped');
    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    // If Theres Two Selected Blocks
    if(allFlippedBlocks.length === 2){
        // Stop Clicking Function
        stopClicking();
        // Check Matched Block Function 
        checkMatchedBlock(allFlippedBlocks[0] , allFlippedBlocks[1]);
    }

}
// Shuffle Function
function shuffle(array){
    let current = array.length,
                temp,
                random;
    while(current > 0){
        random = Math.floor(Math.random() * current);
        current--;

        //[1] Save Current Element in Stash
        temp = array[current];
        // [2] Current Element = Random Element 
        array[current] = array[random];
        // [3] Random Element = Get Element From Stash
        array[random] = temp;
    }
    return array ;
}

//StopClicking Function 

function stopClicking(){
    // Add Class No Clickingg on Main Container
    blockContainer.classList.add('no-clicking');

    setTimeout(() => {
        // Remove Class No Clicking After The Duration
    blockContainer.classList.remove('no-clicking');

    }, duration);
}

// Check Matched Block 
function checkMatchedBlock(firstBlock , secondBlock){
    //Check Blockes is Same or Not
    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        // Remove Class Flipped
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        // Add Class Match
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
    }
    else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML)+1;

        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);
    }
    
   
    
}