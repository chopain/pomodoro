import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class Timer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			minutes: 25,
      seconds: 0,
      pomodoro: props.pomodoro,
		}
	}

  componentDidMount() {
    this.interval = setInterval(this.decrement, 1000)
  }

  reset = () => {
    this.setState(prevState => ({
      minutes: (prevState.pomodoro ? 5 : 25),
      seconds: 0,
    }))
  }

  decrement = () => {
    if ((this.state.minutes + this.state.seconds)===0){
      this.setState(prevState => ({
        pomodoro: !prevState.pomodoro,
        minutes: (prevState.pomodoro ? 25 : 5),
      }))
    } else{
      if (this.props.start){
        if (this.state.seconds===0){
          this.setState(prevState => ({
            minutes: prevState.minutes - 1,
            seconds: 59,
          }))      
        } else{
          this.setState(prevState => ({
            seconds: prevState.seconds - 1
          }))
        }
      }
    }
  }
  render() {
    return (
    <Text style={styles.time}>
      {("0"+this.state.minutes).slice(-2)}:
      {("0"+this.state.seconds).slice(-2)}
      {this.props.start}
    </Text>
    );
  }
}

export default class App extends React.Component {
  constructor (props) {
		super(props)
		this.state = {
			start: false,
      pomodoro: false,
      buttonText: "Start"
		}
  }

  toggleStart = () => this.setState(prevState => ({
    start: !prevState.start,
    buttonText: (prevState.start ? "Start" : "Stop"),
  }))

  resetTimer = () => {
    this.setState(prevState => ({
      start: false,
      buttonText: "Start",
    }))
    this._timer.reset()
  }

  render() {
    return (
      <View style={styles.container}>
        <Timer 
        start={this.state.start} 
        pomodoro={this.state.pomodoro}
        toggleStart={() => this.toggleStart}
        ref={component => { this._timer = component }}
        />
        <View style={styles.buttonRow}> 
          <Button 
          title={this.state.buttonText} 
          onPress={this.toggleStart}>
          </Button>

          <Button 
          title="Reset"
          onPress={this.resetTimer}>
          Timer.resetTime
          </Button>
        </View>
      </View>
    );
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
  	fontSize: 70,
    color: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    flexDirection: 'row'
  },
});
