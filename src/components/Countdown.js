import React,{useState, useEffect} from "react";
import {View, Text, StyleSheet} from 'react-native';


export const Countdown = ({
  minutes = 20,
  isPaused,
  onProgress,
  onEnd
}) => {
  const minutesToms = (minutes) => minutes*60*1000;
  const [millis,setMillis] = useState(minutesToms(minutes));
  const min = Math.floor(millis/1000/60)%60;
  const sec = Math.floor(millis/1000)%60;
  const formatTime = (time) => time < 10 ? `0${time}` : time;
  
  const countDown = () => {
    setMillis((time) => {
      if(time===0){
          clearInterval(interval.current);
          onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      onProgress(timeLeft/minutesToms(minutes));
      return timeLeft;
    })
  }
  const interval = React.useRef();
  useEffect(() => {
    setMillis(minutesToms(minutes));
  },[minutes])

  useEffect(() => {
    if(isPaused){
      if(interval.current){
        clearInterval(interval.current);
      }
      return;
    }
    interval.current = setInterval(countDown,1000);
    return () => clearInterval(interval.current);
  },[isPaused]);


  return(
    <Text style={styles.text}>
      {formatTime(min)} : {formatTime(sec)}
    </Text>
  )
}

const styles = StyleSheet.create({
  text : {
    width:'100%',
    fontSize : 40,
    fontWeight:'bold',
    color:'black',
    padding:10,
    backgroundColor:'rgba(94,132,226,0.3)'
  }
})