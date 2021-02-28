import React from 'react';
import 'antd/dist/antd.css';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Layout, { Content } from 'antd/lib/layout/layout';
import Game from './components/Game/Game';
import GameOver from './components/GameOver/GameOver';
import musicUrl from './assets/music.mp3';
import { Button, Slider } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { SoundOutlined } from '@ant-design/icons';
import NoSoundIcon from './components/NoSoundIcon/NoSoundIcon';
import Settings from './components/Settings/Settings';

const initialSnakeParts = [
  [20, 0],
  [40, 0],
  [60, 0],
];

const initialState = {
  snakeParts: initialSnakeParts,
  direction: 'RIGHT',
  foodPosition: [80, 80],
  score: 3,
  snakeColor: 'green',
  isGameOver: false,
  musicIsPlaying: false,
  isModalVisible: false,
  musicVolume: 0,
};

const music = new Audio();
music.src = musicUrl;
class App extends React.Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, 100);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.increaseSnake();
    this.checkIsGameOver();
    this.checkIfOnBorders()
    music.volume = this.state.musicVolume;
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
        this.onGameOver();
      }
    });
  }

  stopMusic = () => {
    this.setState({
      musicIsPlaying: false,
    });
    music.pause();
  };

  onGameOver() {
    this.setState({
      snakeParts: initialSnakeParts,
      isGameOver: true,
    });
  }

  startNewGame = () => {
    this.setState(initialState);
  };

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
    }
  }

  openModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  handleMusicVolumeChange = (value) => {
    if (value === 1) {
      music.play();
    }
    this.setState({
      musicVolume: value / 100,
    });
  };

  checkIfOnBorders() {
    let parts = [...this.state.snakeParts];
    let head = this.state.snakeParts[this.state.snakeParts.length - 1];
    if (head[0] >= 500) {
      head[0] = 0;
      parts.pop();
      parts.push(head)
      this.setState({
        snakeParts: parts
      })
    } else if (head[1] >= 500) {
      head[1] = 0;
      parts.pop();
      parts.push(head)
      this.setState({
        snakeParts: parts
      })
    } else if (head[0] < 0) {
      head[0] = 480;
      parts.pop();
      parts.push(head)
      this.setState({
        snakeParts: parts
      })
    } else if (head[1] < 0) {
      head[1] = 480;
      parts.pop();
      parts.push(head)
      this.setState({
        snakeParts: parts
      })
    }
  }

  handleCancel = () => this.setState({ isModalVisible: false })

  render() {
    return (
      <div className='App'>
        <Layout>
          <Header openModal={this.openModal} />
          <Settings
            visible={this.state.isModalVisible}
            handleCancel={this.handleCancel}
            handleMusicVolumeChange={this.handleMusicVolumeChange}
            value={this.state.musicVolume * 100}
          />
          <Content className='content'>
            {this.state.isGameOver ? (
              <GameOver
                startNewGame={this.startNewGame}
                score={this.state.score}
              />
            ) : (
              <Game {...this.state} />
            )}
          </Content>
          <Footer />
        </Layout>
      </div>
    );
  }
}

export default App;
