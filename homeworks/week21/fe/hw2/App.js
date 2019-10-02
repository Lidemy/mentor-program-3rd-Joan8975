/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(19 * 19).fill(null).forEach((item, index) => {
        item.push({ id: index });
      }),
      value: '⚫',
    };
  }

  checkWinner() {
    const { board, value } = this.state;
    // 贏的組合
    const winLines = [
      [0, 1, 2, 3, 4],
      [0, 19, 38, 57, 76],
      [0, 20, 40, 60, 80],
      [4, 22, 40, 58, 76],
    ];

    for (let i = 0; i <= 15; i += 1) {
      for (let j = 0; j <= 15; j += 1) {
        for (let n = 0; n < winLines.length; n += 1) {
          const [a, b, c, d, e] = [
            winLines[n][0] + (19 * i) + j,
            winLines[n][1] + (19 * i) + j,
            winLines[n][2] + (19 * i) + j,
            winLines[n][3] + (19 * i) + j,
            winLines[n][4] + (19 * i) + j,
          ];

          if (board[a] && board[a] === board[b]
            && board[b] === board[c]
            && board[c] === board[d]
            && board[d] === board[e]) {
            this.setState({
              winner: value,
            });
          }
        }
      }
    }
  }

  handleClick(index) {
    const { board, value, winner } = this.state;
    const newBoard = board;
    if (board[index] === null && !winner) { // 如果格子裡面是 null 並且沒有贏家，就會執行以下
      newBoard[index] = value; // 第幾格放什麼顏色的旗子
      this.setState({
        board: newBoard, // 放好棋子的棋盤
        value: value === '⚫' ? '⚪' : '⚫', // 下一顆旗子要改為另一個顏色
      });
      this.checkWinner();
    }
  }

  render() {
    const { board, value, winner } = this.state;
    const Box = board.map(
      (box, index) => <div role="presentation" className="box" type="button" key={index} onClick={() => this.handleClick(index)}>{box}</div>,
    );

    let status;
    if (!winner) {
      status = `Next Player: ${value}`;
    } else {
      alert(`${winner} Win!`);
      status = `Winner: ${winner}`;
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="container">
          {Box}
        </div>
      </div>
    );
  }
}
export default App;
