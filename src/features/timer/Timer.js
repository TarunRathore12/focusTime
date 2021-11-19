import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import {ProgressBar} from 'react-native-paper';


import {Countdown} from '../../components/Countdown';
import {RoundedButton} from '../../components/RoundedButton';
import {Timing} from './Timing';

const DEFAULT_TIME = 0.1;

export const Timer = ({focusSubject, onTimerEnd, clearSubject}) => {
  const [isStarted, setIsStarted] = useState(false);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [progress, setProgress] = useState(1);
  const onProgress = (progress) => {
    setProgress(progress);
  }
  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  }
  const onEnd = () => {
    onTimerEnd();
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
  }
  const vibrate = () => {
    if(Platform.OS === 'ios'){
      const interval = setInterval(() => Vibration.vibrate(),1000);
      setTimeout(() => clearInterval(interval), 10000)
    }
    else{
      Vibration.vibrate(10000);
    }
  }

  return (
    <>
      <View style={styles.countdownContainer}>
        <Countdown onEnd={onEnd} minutes={minutes} isPaused={!isStarted} onProgress={onProgress} />
      </View>
      <View style={styles.container}>
          <Text style={styles.title}>Focussing ON</Text>
          <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.progressBar}>
        <ProgressBar
          color='black'
          style={{height:10,margin:2}}
          progress={progress}
        />
      </View>
      <View style={styles.changeTime}>
        <Timing onChangeTime={changeTime}/>
      </View>
      <View style={styles.startStop}>
        { !isStarted ? 
        (<RoundedButton size={90} title="Start" onPress={() => {setIsStarted(true)}}/>) 
        : (<RoundedButton size={90} title="Pause" onPress={() => {setIsStarted(false)}}/>)
        }
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton size={50} title="Clear" onPress={() => clearSubject()}/>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  countdownContainer:{
    alignItems:'center',
  },
  container : {
    backgroundColor:'grey',
    margin:10,
    borderRadius:15,
    padding:5,
  },
  title:{
    color:'white',
    textAlign:'center',
  },
  task:{
    color:'white',
    fontWeight:'bold',
    textAlign:'center'
  },
  startStop:{
    marginTop:5,
    alignItems:'center',
  },
  changeTime:{
    flexDirection:'row',
    margin:5
  },
  clearSubject:{
    alignItems:'center',
    margin:50
  },
  progressBar:{
    width:'100%',
  }
})