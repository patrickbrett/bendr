class Graph {
  constructor() {
    this.nodes = [];
    this.nodeNames = [];
    this.edges = [];
    this.counter = 0;
    this.edgeCount = 0;
  }

  addNode(node, name) {
    this.nodes.push(node);
    if (name) this.nodeNames.push(name);
    node.setId(this.counter);
    this.counter++;
  }

  addEdge(fromNode, toNode, weight = 1) {
    const newEdge = new Edge(fromNode, toNode, weight);
    newEdge.setId(this.edgeCount);
    this.edgeCount++;
    this.edges.push(newEdge);

    const newEdgeReversed = new Edge(toNode, fromNode, weight);
    newEdgeReversed.setId(this.edgeCount);
    this.edgeCount++;
    this.edges.push(newEdgeReversed);
  }

  printEdges() {
    this.edges.forEach((edge, i) => {
      // console.log(
      //   `${edge.fromNode.id} to ${edge.toNode.id}, weight ${edge.weight}`
      // );
    });
  }

  printHamiltonianTours(withLogs = true) {
    /* Exhaustively checks for and prints all Hamiltonian tours of graph, sorted in ascending order of weight */

    let tourList = [];
    let usedPaths = {};

    function isPathUsed(currentTour, prospective) {
      return (
        usedPaths[currentTour] !== undefined &&
        usedPaths[currentTour].includes(prospective)
      );
    }

    function markPathUsed(currentTour) {
      let path = currentTour.slice(0, currentTour.length - 1);
      let prospective = currentTour[currentTour.length - 1];
      if (usedPaths[path] !== undefined) {
        usedPaths[path].push(prospective); //mutates original array
      } else {
        usedPaths[path] = [prospective];
      }
    }

    let i = 0;
    tourFinder: while (true) {
      i++;
      if (withLogs) console.log(`\n--- Tour #${i} ---`);
      let currentTour = [];
      let tourWeight = 0;
      let currentNode = 0;
      currentTour.push(currentNode);
      tour: while (currentTour.length < this.nodes.length + 1) {
        let tourPosition = currentTour.length - 1;
        let nextNodeIterator = 0;
        let availableNodes = this.edges
          .filter(edge => edge.fromNode.id === currentNode)
          .map(edge => edge.toNode.id);

        if (withLogs)
          console.log(`
            Step ${tourPosition}, at node ${currentNode}
            Linked nodes: ${availableNodes}
        `);

        step: while (
          nextNodeIterator <
          this.edges.filter(edge => edge.fromNode.id === currentNode).length
          ) {
          let prospective = availableNodes[nextNodeIterator];
          if (
            (!currentTour.includes(prospective) ||
              (prospective === 0 &&
                currentTour.length === this.nodes.length)) &&
            !isPathUsed(currentTour, prospective)
          ) {
            currentTour.push(prospective);
            tourPosition++;
            tourWeight += this.edges.find(
              edge =>
                edge.fromNode.id === currentNode &&
                edge.toNode.id === prospective
            ).weight;
            if (withLogs)
              console.log(
                "position added: " + currentNode + " to " + prospective
              );
            currentNode = prospective;
            if (currentNode === 0) {
              markPathUsed(currentTour);
              if (withLogs)
                console.log(`successful tour; ban added: ${currentTour}`);
              tourList.push({ tour: currentTour, weight: tourWeight });
              break tour;
            }
            break step;
          } else {
            if (isPathUsed(currentTour, prospective)) {
              if (withLogs)
                console.log(`path used by another tour: ${currentTour}`);
            } else {
              if (withLogs)
                console.log(`node already used in tour: ${prospective}`);
            }

            nextNodeIterator++;
            if (nextNodeIterator === availableNodes.length) {
              if (withLogs) console.log(`marking path as used: ${currentTour}`);
              markPathUsed(currentTour);
              if (currentTour.length > 1) {
                break tour;
              } else {
                if (withLogs) console.log(`All tours found`);
                break tourFinder;
              }
            }
          }
        }
      }
      if (withLogs) console.log(currentTour + "\n");
    }
    tourList.sort((a, b) => a.weight - b.weight);
    tourList = tourList.slice(0, 10); // top 10 lowest weight
    let tourListNamed = tourList.map(tour => {
      tour.tourNames = tour.tour.map(node => {
        return this.nodeNames[node];
      });
      return tour;
    });
    console.log(tourListNamed);
  }

  printHamiltonianPaths(withLogs = true, noReverse = true) {
    /* Exhaustively checks for and prints all Hamiltonian paths of graph, sorted in ascending order of weight */

    let pathList = [];
    let usedPaths = {};

    function isPathUsed(currentPath, prospective) {
      return (
        usedPaths[currentPath] !== undefined &&
        usedPaths[currentPath].includes(prospective)
      );
    }

    function markPathUsed(currentPath) {
      let path = currentPath.slice(0, currentPath.length - 1);
      let prospective = currentPath[currentPath.length - 1];
      if (usedPaths[path] !== undefined) {
        usedPaths[path].push(prospective); //mutates original array
      } else {
        usedPaths[path] = [prospective];
      }
    }

    let i = 0;
    pathFinder: while (true) {
      for (
        let startPosition = 0;
        startPosition < this.nodes.length;
        startPosition++
      ) {
        i++;
        if (withLogs) console.log(`\n--- Tour #${i} ---`);
        let currentPath = [];
        let pathWeight = 0;
        currentPath.push(startPosition);
        let currentNode = startPosition;

        path: while (currentPath.length < this.nodes.length + 1) {
          let pathPosition = currentPath.length - 1;
          let nextNodeIterator = 0;
          let availableNodes = this.edges
            .filter(edge => edge.fromNode.id === currentNode)
            .map(edge => edge.toNode.id);
          if (withLogs)
            console.log(`
              Step ${pathPosition}, at node ${currentNode}
              Linked nodes: ${availableNodes}
          `);

          step: while (nextNodeIterator < availableNodes.length) {
            let prospective = availableNodes[nextNodeIterator];
            if (
              !currentPath.includes(prospective) &&
              !isPathUsed(currentPath, prospective)
            ) {
              currentPath.push(prospective);
              pathPosition++;
              pathWeight += this.edges.find(
                edge =>
                  edge.fromNode.id === currentNode &&
                  edge.toNode.id === prospective
              ).weight;
              if (withLogs)
                console.log(
                  "position added: " + currentNode + " to " + prospective
                );
              currentNode = prospective;
              if (currentPath.length === this.nodes.length) {
                markPathUsed(currentPath);
                if (withLogs)
                  console.log(`successful path; ban added: ${currentPath}`);
                pathList.push({ path: currentPath, weight: pathWeight });
                if (noReverse) markPathUsed(currentPath.slice().reverse());
                break path;
              }
              break step;
            } else {
              if (isPathUsed(currentPath, prospective)) {
                if (withLogs)
                  console.log(`path used by another path: ${currentPath}`);
              } else {
                if (withLogs)
                  console.log(`node already used in path: ${prospective}`);
              }

              nextNodeIterator++;

              if (nextNodeIterator === availableNodes.length) {
                if (withLogs)
                  console.log(`marking path as used: ${currentPath}`);
                markPathUsed(currentPath);
                if (currentPath.length > 1) {
                  break path;
                } else {
                  if (withLogs) console.log(`All paths found`);
                  break pathFinder;
                }
              }
            }
          }
        }
        if (withLogs) console.log(currentPath + "\n");
      }
    }
    console.log(`${pathList.length} paths found from ${i} attempts.`);
    pathList.sort((a, b) => a.weight - b.weight);
    pathList = pathList.slice(0, 10); // top 10 lowest weight
    let pathListNamed = pathList.map(path => {
      path.pathNames = path.path.map(node => {
        return this.nodeNames[node];
      });
      return path;
    });
    console.log(pathListNamed);
  }
}

class Node {
  setId(id) {
    this.id = id;
  }
}

class Edge {
  constructor(fromNode, toNode, weight) {
    this.fromNode = fromNode;
    this.toNode = toNode;
    this.weight = weight;
  }

  setId(id) {
    this.id = id;
  }
}

/*let ausCities = new Graph();

let sydney = new Node();
ausCities.addNode(sydney, "Sydney");
let melbourne = new Node();
ausCities.addNode(melbourne, "Melbourne");
let brisbane = new Node();
ausCities.addNode(brisbane, "Brisbane");
let perth = new Node();
ausCities.addNode(perth, "Perth");
let adelaide = new Node();
ausCities.addNode(adelaide, "Adelaide");
let canberra = new Node();
ausCities.addNode(canberra, "Canberra");
let hobart = new Node();
ausCities.addNode(hobart, "Hobart");
let darwin = new Node();
ausCities.addNode(darwin, "Darwin");

ausCities.addEdge(sydney, melbourne, 878);
ausCities.addEdge(sydney, brisbane, 916);
ausCities.addEdge(sydney, perth, 3934);
ausCities.addEdge(sydney, adelaide, 1375);
ausCities.addEdge(sydney, canberra, 293);
ausCities.addEdge(sydney, hobart, 1595);
ausCities.addEdge(sydney, darwin, 3977);

ausCities.addEdge(melbourne, brisbane, 1680);
ausCities.addEdge(melbourne, perth, 3406);
ausCities.addEdge(melbourne, adelaide, 727);
ausCities.addEdge(melbourne, canberra, 663);
ausCities.addEdge(melbourne, hobart, 720);
ausCities.addEdge(melbourne, darwin, 3741);

ausCities.addEdge(brisbane, perth, 4317);
ausCities.addEdge(brisbane, adelaide, 2022);
ausCities.addEdge(brisbane, canberra, 1190);
ausCities.addEdge(brisbane, hobart, 2402);
ausCities.addEdge(brisbane, darwin, 3427);

ausCities.addEdge(perth, adelaide, 2691);
ausCities.addEdge(perth, canberra, 3718);
ausCities.addEdge(perth, hobart, 4130);
ausCities.addEdge(perth, darwin, 4027);

ausCities.addEdge(adelaide, canberra, 1159);
ausCities.addEdge(adelaide, hobart, 1438);
ausCities.addEdge(adelaide, darwin, 3032);

ausCities.addEdge(canberra, hobart, 1380);
ausCities.addEdge(canberra, darwin, 3936);

ausCities.addEdge(hobart, darwin, 4453);

ausCities.printHamiltonianPaths(false);*/

const TravellingDrunkard = {
  calculateRoute: (bars) => {

    let barGraph = new Graph();
    const barNodes = [];

    for (let i=0; i<bars.length; i++) {
      const barNode = new Node();
      barNodes.push(barNode);
      barGraph.addNode(barNode, bars[i].name);
    }

    for (let i=0; i<bars.length; i++) {
      for (let j=i+1; j<bars.length; j++) {
        // console.log(bars[i].geometry);
        const distance = getDistance(bars[i].geometry.location, bars[j].geometry.location);
        barGraph.addEdge(barNodes[i], barNodes[j], distance);
      }
    }

    barGraph.printHamiltonianPaths(false);
  }
};

/* haversine formula */

var rad = function(x) {
  return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

module.exports = TravellingDrunkard;