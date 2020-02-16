import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from './Constants';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import Bird from './Bird';
import Physics from './Physics';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.GameEngine = null;
    this.entities = this.setupWorld();
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    let bird = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 4, Constants.MAX_HEIGHT / 2, 50, 50)
    Matter.World.add(world, [bird])

    return {
      physics: { engine: engine, world: world },
      bird: { body: bird, size: [50, 50], color: 'red', renderer: Bird }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <GameEngine ref={(ref) => { this.GameEngine = ref; }} style={styles.gameContainer} systems={[Physics]} entities={this.entities} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
