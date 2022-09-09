// Не забудьте перед отправкой изменить в module.exports = function main(game, start) {
// Не деструктурируйте game, ваше решение не будет проходить тесты.
const getAdjasentNode = (game, node) => {
    const newReachable = [];
    game.state(node.x, node.y)
        .then((state) => {
            if (state.right) newReachable.push({x: node.x + 1, y: node.y});
            if (state.left) newReachable.push({x: node.x - 1, y: node.y});
            if (state.bottom) newReachable.push({x: node.x, y: node.y + 1});
            if (state.top) newReachable.push({x: node.x, y: node.y - 1});
        });
    return newReachable;
  };

const getMoveRoute = (game, node, newNode) => {
    if (newNode.x === node.x + 1) {
        return game.right(newNode.x, newNode.y);
    } else if (newNode.x === node.x - 1) {
        return game.left(newNode.x, newNode.y);
    } else if (newNode.y === node.y + 1) {
        return game.down(newNode.x, newNode.y);
    } else if (newNode.y === node.y - 1) {
        return game.up(newNode.x, newNode.y);
    }
};

export default function main(game, start) {
    const reachable = [{x: start.x, y: start.y}];
    const explored = [];
    let currentNode = {x: start.x, y: start.y};
    let nextNode = currentNode;

    while (reachable.length !== 0) {
        reachable.shift();
        explored.push(currentNode );
        
        const exploredStr = explored.slice().map((item) => Object.values(item).join(','));
        const reachableStr = reachable.slice().map((item) => Object.values(item).join(','));

        // const newReach = getAdjasentNode(game, currentNode);
        game.state(currentNode.x, currentNode.y)
        .then((state) => {
            if(state.finish) {
                console.log(currentNode);
                return Promise.resolve(currentNode);
            }
            const newReachable = [];
            if (state.right) newReachable.push({x: currentNode.x + 1, y: currentNode.y});
            if (state.left) newReachable.push({x: currentNode.x - 1, y: currentNode.y});
            if (state.bottom) newReachable.push({x: currentNode.x, y: currentNode.y + 1});
            if (state.top) newReachable.push({x: currentNode.x, y: currentNode.y - 1});

            return newReachable;
        })
        .then((newReachable) => (newReachable.filter((item) => !exploredStr.includes(Object.values(item).join(',')))))
        .then((newReachableFiltered) => {
            newReachableFiltered.forEach((item) => !reachableStr.includes(Object.values(item).join(',')) && reachable.push(item));
            return reachable;
        })
        .then((reachable) => {
            nextNode = reachable[0];
            return nextNode;
        })
        .then((nextNode) => (getMoveRoute(game, currentNode, nextNode)))
        .then(() => currentNode = {x: nextNode.x, y: nextNode.y})

        // .then(() => game.state(nextNode.x, nextNode.y)
        //     .then((state) => {
        //         if(state.finish) {
        //             console.log(nextNode);
        //             // return Promise.resolve(nextNode);
        //         }
        //     })
        // );
        
        // const newUniqReachable = newReachable.filter((item) => {
        //     const jsonItem = JSON.stringify(item);
        //     return !exploredStr.includes(jsonItem);
        // });

        // const newUniqReachable = newReach.filter((item) => !exploredStr.includes(Object.values(item).join(',')));
        

        // newUniqReachable.forEach((item) => !reachableStr.includes(Object.values(item).join(',')) && reachable.push(item));

        // let newNode = reachable[0];
        // let newNode = {x: 1, y: 0};

        // getMoveRoute(game, currentNode, newNode)
        //     .then(() => game.state(newNode.x, newNode.y))
        //     .then((state) => {
        //         if(state.finish) {
        //             return Promise.resolve(newNode);
        //         }
        //     })
        // currentNode = {x: newNode.x, y: newNode.y};
        // game.state(node.x, node.y)
        //     .then((state) => {
        //         if(state.finish) {
        //             return Promise.resolve(node);
        //         }
        //     });
    }
    
    return Promise.resolve({ x: 1, y: 0 });
    // return game.right(start.x, start.y)
    //     .then(() => game.right(start.x + 1, start.y))
    //     .then(() => game.right(start.x + 2, start.y))
    //     .then(() => ({ x: start.x + 3, y: start.y }));
}
