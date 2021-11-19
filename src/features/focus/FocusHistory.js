import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return (
    <View>
      {item.status === 1 ? (
        <Text style={{ color: 'green', fontWeight: 'bold' }}>
          {item.subject}
        </Text>
      ) : (
        <Text style={{ color: 'red', fontWeight: 'bold' }}>{item.subject}</Text>
      )}
    </View>
  );
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };
  console.log(focusHistory);
  return (
    <>
      <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we have focussed on</Text>
            <FlatList
              style={{ height: '100%', width: '100%' }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearButton}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => {
                  onClear();
                }}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 20,
  },
  clearButton: {
    margin:10
  }
});
