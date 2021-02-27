import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Snake from './components/Snake/Snake';
import Food from './components/Food/Food';
import Footer from './components/Footer/Footer';
import 'antd/dist/antd.css';
import Layout, { Content } from 'antd/lib/layout/layout';

class App extends React.Component {
  state = {
    snakeParts: [
      [0, 0],
      [20, 0],
      [40, 0],
    ],
    direction: 'RIGHT',
    foodPosition: [80, 80],
    score: 3,
    snakeColor: 'green',
  };

  componentDidMount() {
    setInterval(this.moveSnake, 100);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.increaseSnake();
    this.checkIsGameOver();
  }

  getRandomFoodPosition() {
    let x = parseInt(Math.random() * 25) * 20;
    let y = parseInt(Math.random() * 25) * 20;
    return [x, y];
  }

  onKeyDown = (event) => {
    switch (event.keyCode) {
      case 38:
      case 87:
        if (this.state.direction !== 'DOWN') {
          this.setState({ direction: 'UP' });
        }
        break;
      case 40:
      case 83:
        if (this.state.direction !== 'UP') {
          this.setState({ direction: 'DOWN' });
        }
        break;
      case 37:
      case 65:
        if (this.state.direction !== 'RIGHT') {
          this.setState({ direction: 'LEFT' });
        }
        break;
      case 39:
      case 68:
        if (this.state.direction !== 'LEFT') {
          this.setState({ direction: 'RIGHT' });
        }
        break;
      default:
        break;
    }
  };

  moveSnake = () => {
    let parts = [...this.state.snakeParts];
    let head = parts[parts.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 20, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 20, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 20];
        break;
      case 'UP':
        head = [head[0], head[1] - 20];
        break;
      default:
        break;
    }
    parts.push(head);
    parts.shift();
    this.setState({
      snakeParts: parts,
    });
  };

  checkIsGameOver() {
    let parts = [...this.state.snakeParts];
    let head = parts[parts.length - 1];
    parts.pop();
    parts.forEach((part) => {
      if (head[0] === part[0] && head[1] === part[1]) {
        // this.onGameOver();
        console.log('gg');
      }
    });
  }

  increaseSnake() {
    let parts = [...this.state.snakeParts];
    let head = parts[parts.length - 1];
    if (
      head[0] === this.state.foodPosition[0] &&
      head[1] === this.state.foodPosition[1]
    ) {
      parts.unshift([]);
      this.setState({
        snakeParts: parts,
        foodPosition: this.getRandomFoodPosition(),
        score: this.state.score + 1,
      });
    } else {
      console.log('не попал');
    }
  }

  render() {
    return (
      <div className='App'>
        <Layout>
          <Header />
          <Content className="content">
            <div className='score'>Score : {this.state.score}</div>
            <main className='main'>
              <div className='game-board'>
                <Snake
                  color={this.state.snakeColor}
                  snakeParts={this.state.snakeParts}
                />
                <Food foodPosition={this.state.foodPosition} />
              </div>
            </main>
          </Content>
          <Footer />
        </Layout>
      </div>
    );
  }
}

export default App;
