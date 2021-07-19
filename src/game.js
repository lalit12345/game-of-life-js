/**
Rules:
    1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
    2. Any live cell with two or three live neighbours lives on to the next generation.
    3. Any live cell with more than three live neighbours dies, as if by overpopulation.
    4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

Approach:
    1. Create first grid with 2D array and fill with random 0's and 1's: setup()
    2. Draw the cavas wuth first grid having 1's as 'black' and 0's as 'white': draw()
        - Create 'next' generation grid same as 2D array
        - Compute the 'next' based on first grid by applying the rules defined above
        - Assign the 'next' generation grid to original grid
    3. Put 'draw()' function in animation by using 'requestAnimationFrame' function for infinite loop: run()
 */

let grid;
let cols;
let rows;
let resolution = 5;
let width = 600;
let height = 400;

// create grid as 2D array and fill with random 0's and 1's
function setup() {

    cols = width / resolution;
    rows = height / resolution;

    grid = make2DArray(cols, rows);
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {

            let randomNumber = Math.random();

            if(randomNumber < 0.5) {
                grid[i][j] = 0;
            } else {
                grid[i][j] = 1;
            }

        }
    }
}

//main loop
function run() {
    draw();
    requestAnimationFrame(run);
}

function draw() {

    // use canvas from index.html and fill with colour: black for 0's and white for 1's
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    context.canvas.width = width;
    context.canvas.height = height;

    //draw first grid
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {

            let x = i * resolution;
            let y = j * resolution;

            if(grid[i][j] == 1) {
                context.fillStyle = 'black';
                context.fillRect(x, y, resolution - 1, resolution - 1);
            } else {
                context.fillStyle = 'white';
                context.fillRect(x, y, resolution - 1, resolution - 1);
            }
        }
    }

    // create 'next' generation 2D array
    let next = make2DArray(cols, rows);

    // compute 'next' based on grid
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rows; j++) {

            let state = grid[i][j];

            // check for grid edges
            if(i == 0 || i == cols - 1 || j == 0 || j == rows - 1) {
                
                next[i][j] = state;
            
            } else {
                
                // count the live neighbors
                let neighbors = countNeighbors(grid, i, j);

                // rules check
                if(state == 1 && (neighbors < 2 || neighbors > 3)) {
                    next[i][j] = 0;
                } else if(state == 0 && neighbors == 3) {
                    next[i][j] = 1;
                } else {
                    next[i][j] = state;
                }
            }
        }
    }

    // assign 'next' to original grid
    grid = next;
}

function make2DArray(cols, rows) {

    let arr = new Array(cols);

    for(let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }

    return arr;
}

function countNeighbors(grid, x, y) {

    let count = 0;

    for(let i = -1; i < 2; i++) {
        for(let j = -1; j < 2; j++) {
            count += grid[x + i][y + j];
        }
    }

    // remove own cell from counted neighbors
    count -= grid[x][y];
    return count;
}

setup();
run();