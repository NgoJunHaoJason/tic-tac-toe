import React from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Penguin from '../images/penguin.png';
import PolarBear from '../images/polar_bear.png';
import BlankTile from '../images/blank_tile.png'
import PenguinTile from '../images/penguin_tile.png';
import PolarBearTile from '../images/polar_bear_tile.png';
import './Game.css';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function Square(props) {
    let imageSource;
    if (props.value === 'X') {
        imageSource = PenguinTile;

    } else if (props.value === 'O') {
        imageSource = PolarBearTile;

    } else {
        imageSource = BlankTile;
    }

    return (
        <button className="square" onClick={props.onClick}>
            <img className="square-image" src={imageSource} alt={props.value} />
        </button>
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        if (squares[i] || calculateWinner(squares)) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }

    renderStatusImage(player) {
        let imageSource;
        if (player === 'X') {
            imageSource = Penguin;
        } else if (player === 'O') {
            imageSource = PolarBear;
        }

        return <img className="status-image" src={imageSource} alt={player} />
    }

    resetGame() {
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: true,
        });
    }

    render() {
        const winner = calculateWinner(this.state.squares);

        let status;
        let player;

        if (winner) {
            status = 'Winner: ';
            player = winner;

        } else {
            status = 'Next player: ';
            player = this.state.xIsNext ? 'X' : 'O';
        }

        return (
            <div>
                <div className="status">
                    <span className="status-text">{status}</span>
                    {this.renderStatusImage(player)}
                </div>
                <br />
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <br />
                <div className="bottom-text">
                    <Button variant="contained" onClick={() => this.resetGame()}>
                        Reset Game
                    </Button>
                    <br />
                    <br />
                    Graphics by: <Link
                        target="_blank"
                        href="https://linkedin.com/in/jeanette-ngo/">
                        Jeanette Ngo
                        </Link>
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="header">
                    <h1>Tic-Tac-Toe</h1>
                </div>
                <div className="game-board">
                    <Board />
                </div>
            </div>
        );
    }
}

export default Game;
