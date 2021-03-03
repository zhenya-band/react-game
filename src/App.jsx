import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Layout, { Content } from 'antd/lib/layout/layout';
import Game from './components/Game/Game';
import GameOver from './components/GameOver/GameOver';
import musicUrl from './assets/music.mp3';
import eatSoundUrl from './assets/eat.mp3';
import Settings from './components/Settings/Settings';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import { Button } from 'antd';
import { BestScores } from './components/BestScores/BestScores';
import { snakeTypes, snakeSpeeds, bgColors } from './constants/settings';
import { initialSnakeParts } from './constants/initialSnakeParts';
import Hotkeys from './components/Hotkeys/Hotkeys';

const music = new Audio();
music.src = musicUrl;
music.loop = true;

const eatSound = new Audio();
eatSound.src = eatSoundUrl;

let interval;

class App extends React.Component {
  initialState = {
    snakeParts:
      JSON.parse(localStorage.getItem('state'))?.snakeParts ||
      initialSnakeParts,
    direction: JSON.parse(localStorage.getItem('state'))?.direction || 'RIGHT',
    foodPosition: JSON.parse(localStorage.getItem('state'))?.foodPosition || [
      80,
      80,
    ],
    score: JSON.parse(localStorage.getItem('state'))?.score || 3,
    isGameOver: false,
    musicIsPlaying: false,
    isModalVisible: false,
    isScoresVisible: false,
    musicVolume: JSON.parse(localStorage.getItem('state'))?.musicVolume || 0.01,
    soundVolume: JSON.parse(localStorage.getItem('state'))?.soundVolume || 0.2,
    currentSnakeType:
      JSON.parse(localStorage.getItem('state'))?.currentSnakeType || 'Square',
    currentSnakeSpeed:
      JSON.parse(localStorage.getItem('state'))?.currentSnakeSpeed || 140,
    snakeTypes: snakeTypes,
    snakeSpeeds: snakeSpeeds,
    bgColors: bgColors,
    currentBgcolor:
      JSON.parse(localStorage.getItem('state'))?.currentBgcolor || '',
    bestScores: JSON.parse(localStorage.getItem('score')) || [],
    isFullScreen: false,
  };

  state = this.initialState;

  componentDidMount() {
    interval = setInterval(this.moveSnake, this.state.currentSnakeSpeed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentSnakeSpeed !== this.state.currentSnakeSpeed) {
      clearInterval(interval);
      interval = setInterval(this.moveSnake, this.state.currentSnakeSpeed);
    }
    this.increaseSnake();
    this.checkIsGameOver();
    this.checkIfOnBorders();
    music.volume = this.state.musicVolume;
    eatSound.volume = this.state.soundVolume;

    localStorage.setItem('state', JSON.stringify(this.state));
  }

  getRandomFoodPosition() {
    let x = parseInt(Math.random() * 25) * 20;
    let y = parseInt(Math.random() * 25) * 20;
    return [x, y];
  }

  onKeyDown = (event) => {
    if (music.paused) {
      music.play();
    }
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
      snakeParts: [[]],
      isGameOver: true,
      bestScores: [
        ...this.state.bestScores,
        {
          key: this.state.bestScores.length + 1,
          number: this.state.bestScores.length + 1,
          score: this.state.score,
        },
      ],
    });
    localStorage.setItem(
      'score',
      JSON.stringify([
        ...this.state.bestScores,
        {
          key: this.state.bestScores.length + 1,
          number: this.state.bestScores.length + 1,
          score: this.state.score,
        },
      ])
    );
  }

  startNewGame = () => {
    this.setState({
      ...this.initialState,
      snakeParts: initialSnakeParts,
      score: 3,
      direction: 'RIGHT',
      foodPosition: [80, 80],
      musicVolume:
        JSON.parse(localStorage.getItem('state'))?.musicVolume || 0.01,
      bestScores: JSON.parse(localStorage.getItem('score')) || [],
    });
  };

  increaseSnake() {
    let parts = [...this.state.snakeParts];
    let head = parts[parts.length - 1];
    if (
      head[0] === this.state.foodPosition[0] &&
      head[1] === this.state.foodPosition[1]
    ) {
      eatSound.play();
      parts.unshift([]);
      this.setState({
        snakeParts: parts,
        foodPosition: this.getRandomFoodPosition(),
        score: this.state.score + 1,
      });
    }
  }

  openSettings = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  openScores = () => {
    this.setState({
      isScoresVisible: true,
    });
  };

  handleMusicVolumeChange = (value) => {
    this.setState({
      musicVolume: value / 100,
    });
  };

  handleSoundVolumeChange = (value) => {
    this.setState({
      soundVolume: value / 100,
    });
  };

  checkIfOnBorders() {
    let parts = [...this.state.snakeParts];
    let head = this.state.snakeParts[this.state.snakeParts.length - 1];
    if (head[0] >= 500) {
      head[0] = 0;
      parts.pop();
      parts.push(head);
      this.setState({
        snakeParts: parts,
      });
    } else if (head[1] >= 500) {
      head[1] = 0;
      parts.pop();
      parts.push(head);
      this.setState({
        snakeParts: parts,
      });
    } else if (head[0] < 0) {
      head[0] = 480;
      parts.pop();
      parts.push(head);
      this.setState({
        snakeParts: parts,
      });
    } else if (head[1] < 0) {
      head[1] = 480;
      parts.pop();
      parts.push(head);
      this.setState({
        snakeParts: parts,
      });
    }
  }

  onSnakeTypeChange = (event) => {
    this.setState({
      currentSnakeType: event.target.value,
    });
  };

  onSnakeSpeedChange = (event) => {
    this.setState({
      currentSnakeSpeed: event.target.value,
    });
  };

  onBgcolorChange = (event) => {
    this.setState({
      currentBgcolor: event.target.value,
    });
  };

  handleCancel = () => this.setState({ isModalVisible: false });

  handleScoresClose = () => this.setState({ isScoresVisible: false });

  onFullScreen = () => {
    const app = document.getElementById('app');
    if (app) {
      if (app.requestFullscreen) {
        app.requestFullscreen();
        this.setState({
          isFullScreen: true,
        });
      } else if (app.webkitRequestFullscreen) {
        app.webkitRequestFullscreen();
        this.setState({
          isFullScreen: true,
        });
      } else if (app.msRequestFullscreen) {
        app.msRequestFullscreen();
        this.setState({
          isFullScreen: true,
        });
      }
    }
  };

  offFullScreen = () => {
    if (document.exitFullscreen) {
      this.setState({
        isFullScreen: false,
      });
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      this.setState({
        isFullScreen: false,
      });
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      this.setState({
        isFullScreen: false,
      });
      document.msExitFullscreen();
    }
  };

  render() {
    return (
      <BrowserRouter>
        {this.state.isGameOver && <Redirect to='/game-over' />}
        <div className='App' id='app'>
          <Layout>
            <Header
              openSettings={this.openSettings}
              openScores={this.openScores}
              isFullScreen={this.state.isFullScreen}
              onFullScreen={this.onFullScreen}
              offFullScreen={this.offFullScreen}
            />
            <Settings
              visible={this.state.isModalVisible}
              handleCancel={this.handleCancel}
              handleMusicVolumeChange={this.handleMusicVolumeChange}
              handleSoundVolumeChange={this.handleSoundVolumeChange}
              musicVolume={this.state.musicVolume * 100}
              soundVolume={this.state.soundVolume * 100}
              snakeType={this.state.currentSnakeType}
              onSnakeTypeChange={this.onSnakeTypeChange}
              snakeTypes={this.state.snakeTypes}
              snakeSpeeds={this.state.snakeSpeeds}
              onSnakeSpeedChange={this.onSnakeSpeedChange}
              snakeSpeed={this.state.currentSnakeSpeed}
              bgColors={this.state.bgColors}
              onBgcolorChange={this.onBgcolorChange}
              currentBgcolor={this.state.currentBgcolor}
            />
            <BestScores
              visible={this.state.isScoresVisible}
              handleScoresClose={this.handleScoresClose}
              data={this.state.bestScores}
            />
            <Content className='content'>
              <Route
                path='/game-over'
                exact
                render={() => (
                  <GameOver
                    startNewGame={this.startNewGame}
                    score={this.state.score}
                  />
                )}
              />
              <Route path='/' exact>
                <div className='start-screen'>
                  <Hotkeys />
                  <Button
                    size='large'
                    type='primary'
                    onClick={() => {
                      music.play();
                      this.startNewGame();
                    }}
                  >
                    <Link to='game'>start</Link>
                  </Button>
                </div>
              </Route>
              <Route
                path='/game'
                exact
                render={() => <Game {...this.state} />}
              />
            </Content>
            <Footer />
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
