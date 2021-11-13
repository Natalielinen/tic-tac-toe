export default class Game {
    constructor() {
        this.turn = 'X'
        this.board = new Array(9).fill(null)
    }

    nextTurn() {
        this.turn = this.turn === 'X' ? 'O' : 'X'
    }

    makeMove (i) { //принимает индекс текущей ячейки
        if(!this.isInProgress()) { //чтобы после победы одного из игроков нельзя было кликнуть на пустую ячейку
            return
        }
        if(this.board[i]) { // проверка на то, что в конкретной ячейке уже есть значение,чтобы не поменять  х на о и наоборот
            return
        }
        this.board[i] = this.turn
        if(!this.findWinningCombination()){
            this.nextTurn()
        }
    }

    findWinningCombination () {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (const combination of winningCombinations) {
            const [a, b, c] = combination
            if(this.board[a] && (this.board[a] === this.board[b] // если this.board[a] не пустая И если в this.board[a] х или о
                 && this.board[a] === this.board[c])) {          // и то же самое в остальных двух ячейках
                    return combination                            // возвращаются индексы комбинации (this.board[a] = о и this.board[b] =о и this.board[с]=о
                 }                                               // то о выигрывает
        }
        return null // если нет выигрышных комбинаций
    }

    isInProgress () {
        return !this.findWinningCombination() && this.board.includes(null)
    }
}

