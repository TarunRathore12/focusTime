import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import {Focus} from './src/features/focus/Focus';
import {Timer} from './src/features/timer/Timer';
import {FocusHistory} from './src/features/focus/FocusHistory';

const STATUSES = {
  COMPLETE : 1,
  CANCELLED : 2
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistoryWithStatus = ( subject, status) => {
    setFocusHistory([...focusHistory, {subject,status}]);
  }

  const saveFocusHistory = async () => {
    try {
      await  AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    }
    catch(e){
      console.log(e);
    }
  }

  const loadFocusHistory = async () => {
    try{
      const history = await AsyncStorage.getItem('focusHistory');
      if(history && JSON.parse(history).length){
        setFocusHistory(JSON.parse(history));
      }
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    loadFocusHistory();
  },[])

  useEffect(() => {
    saveFocusHistory();
  },[focusHistory])

  const onClear = () => {
    setFocusHistory([]);
  }

  return (
    <View style={styles.container}>
      {focusSubject ? (<View style={styles.timerView}>
        <Timer focusSubject={focusSubject} 
          onTimerEnd={() => { 
            addFocusHistoryWithStatus(focusSubject,STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistoryWithStatus(focusSubject,STATUSES.CANCELLED);
            setFocusSubject(null);
          }}/></View>
      ) : (
        <View style={{flex:1,alignItems:'center'}}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: 'skyblue',
  },
  timerView:{
    flex:1,
    backgroundColor:'pink',
    alignItems:'center',
  }
})