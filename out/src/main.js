// Не забудьте перед отправкой изменить в module.exports = function main(game, start) {
// Не деструктурируйте game, ваше решение не будет проходить тесты.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const moveRoute = {
    RIGHT: 'right',
    LEFT: 'left',
    DOWN: 'down',
    UP: 'up'
};
const getNewNode = (nextNode) => {
    switch (nextNode.route) {
        case moveRoute.RIGHT:
            return { x: nextNode.x + 1, y: nextNode.y };
        case moveRoute.LEFT:
            return { x: nextNode.x - 1, y: nextNode.y };
        case moveRoute.DOWN:
            return { x: nextNode.x, y: nextNode.y + 1 };
        case moveRoute.UP:
            return { x: nextNode.x, y: nextNode.y - 1 };
    }
};
export default function main(game, start) {
    const reachable = [{ x: start.x, y: start.y }];
    const explored = [];
    let currentNode = { x: start.x, y: start.y };
    return (() => __awaiter(this, void 0, void 0, function* () {
        while (reachable.length !== 0) {
            reachable.shift();
            explored.push(currentNode);
            const exploredStr = explored.slice().map((item) => Object.values(item).join(','));
            const reachableStr = reachable.slice().map((item) => Object.values(item).join(','));
            const gameState = yield game.state(currentNode.x, currentNode.y);
            if (gameState.finish) {
                return currentNode;
            }
            const newReachable = [];
            if (gameState.right)
                newReachable.push({ x: currentNode.x, y: currentNode.y, route: moveRoute.RIGHT });
            if (gameState.left)
                newReachable.push({ x: currentNode.x, y: currentNode.y, route: moveRoute.LEFT });
            if (gameState.bottom)
                newReachable.push({ x: currentNode.x, y: currentNode.y, route: moveRoute.DOWN });
            if (gameState.top)
                newReachable.push({ x: currentNode.x, y: currentNode.y, route: moveRoute.UP });
            const newReachableFiltered = newReachable.filter((item) => !exploredStr.includes(Object.values(getNewNode(item)).join(',')));
            newReachableFiltered.forEach((item) => !reachableStr.includes(Object.values(item).join(',')) && reachable.push(item));
            const nextNode = reachable[0];
            yield game[nextNode.route](nextNode.x, nextNode.y);
            currentNode = getNewNode(nextNode);
        }
    }))();
}
