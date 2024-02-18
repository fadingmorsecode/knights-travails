const graph = {};

function possibleMoveGeneration(x, y) {
  const moves = [];
  const directions = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ];

  directions.forEach((direction) => {
    const newX = x + direction[0];
    const newY = y + direction[1];
    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
      moves.push([newX, newY]);
    }
  });
  return moves;
}

// create graph using adjacency list

function createGraph() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const vertex = [i, j];
      const possibleMoves = possibleMoveGeneration(vertex[0], vertex[1]);
      graph[vertex] = possibleMoves;
    }
  }
}

createGraph();

function knightMoves(start, end) {
  // to get the shortest path from start to end.

  const visited = [];

  const queue = [[start, [start]]];

  while (queue.length > 0) {
    const [location, path] = queue.shift(); // mutates the array
    const destinations = graph[location]; // get possible moves of location
    // eslint-disable-next-line no-restricted-syntax
    for (const destination of destinations) {
      const [destX, destY] = destination;

      if (destX === end[0] && destY === end[1]) {
        const printedPath = [...path, destination];
        console.log(
          `%cYou made it in %c${printedPath.length - 1} %cmoves! Here's your path:`,
          "color: turquoise",
          "color: lime",
          "color: turquoise",
        );
        for (loc of printedPath) {
          console.log(
            `%c[%c${loc[0]}%c,%c${loc[1]}%c]`,
            "color: pink",
            "color: lime",
            "color: pink",
            "color: lime",
            "color: pink",
          );
        }
        return;
      }

      const nextPath = [...path, destination];

      if (!visited.includes(destination)) {
        visited.push(destination);
        queue.push([destination, nextPath]);
      }
    }
  }
}

knightMoves([3, 3], [4, 3]);
