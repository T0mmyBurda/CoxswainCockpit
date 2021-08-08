import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {Dimensions, StyleSheet, Text, View, Image, Button, SafeAreaView, TouchableOpacity} from 'react-native';

const RECOVERY = false;
const DRIVE = true;

var d = new Date();

function toSecs(millis) {
  return ((millis % 60000) / 1000).toFixed(2);
}

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

function notNaN(num) {
  
  if(isNaN(num)) {
    return "-";
  }
  return num;
}

export default function App() {
  const [strokeStage , setStrokeStage] = useState(RECOVERY);
  const [nextMarker , setNextMarker] = useState("CATCH");

  const [catchTime , setCatchTime ] = useState();
  const [finishTime , setFinishTime] = useState();

  const [lastCatch , setLastCatch ] = useState();
  const [lastFinish , setLastFinish ] = useState();

  const [driveDuration , setDriveDuration ] = useState();
  const [recoveryDuration , setRecoveryDuration ] = useState();

  const [strokeRate , setRate ] = useState();

  const statSpaces = "              ";
  const spaces = "     ";

  const strokeClick = () => {
    if(strokeStage == RECOVERY) {
      console.log("catch");
      setLastCatch(catchTime);
      d = new Date();
      setCatchTime(d.getTime());
      console.log(catchTime);
      setRecoveryDuration(finishTime - catchTime);
      setStrokeStage(DRIVE);
      setNextMarker("FINISH");
    }
    else {
      console.log("finsih");
      setLastFinish(finishTime);
      d = new Date();
      setFinishTime(d.getTime());
      console.log(finishTime);
      setDriveDuration(catchTime - finishTime);
      setStrokeStage(RECOVERY);
      setNextMarker("CATCH");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={{flex: .25 , justifyContent: 'center' , backgroundColor: "#fadc9b" , width: '100%'}}>
        <Text style={[{fontSize: 100} , styles.statText]} >
          {notNaN((driveDuration / recoveryDuration).toFixed(2))}
        </Text>
        <Text style={styles.labelText}>
          ratio
        </Text>
      </View>

      <View style={{flex: .25 , justifyContent: 'center' , alignItems: 'center' ,  backgroundColor: "#aff799" , width: '100%'}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[{fontSize: 42} , styles.statText]}>
            {notNaN(toSecs(driveDuration))}
          </Text>
          <Text style={[{fontSize: 36} , styles.statText]}>
            {spaces}  
          </Text>
          <Text style={[{fontSize: 52} , styles.statText]}>
            /
          </Text>
          <Text style={[{fontSize: 36} , styles.statText]}>
            {spaces}  
          </Text>
          <Text style={[{fontSize: 42} , styles.statText]}>
            {notNaN(toSecs(recoveryDuration))}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.labelText}>
            Drive Time {statSpaces}
          </Text>
          <Text style={styles.labelText}>
            {spaces}
          </Text>
          <Text style={styles.labelText}>
            Recovery Time
          </Text>
        </View>
      </View>

      <View style={{flex: .25 , justifyContent: 'center' , backgroundColor: "#9dbffa" , width: '100%'}}>
        <Text style={[{fontSize: 72} , styles.statText]}>
          {notNaN((60 / toSecs(catchTime - lastCatch)).toFixed(1))}
        </Text>
        <Text style={styles.labelText}>
          spm
        </Text>
      </View>

      <View style={{flex: .25 , justifyContent: 'center'}}>
        <TouchableOpacity
          //title={nextMarker} 
          onPress={strokeClick}
          style={styles.button}
        >
          <Text style={[{fontSize: 36} , styles.statText]}>
            {nextMarker}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 100,
  },
  button: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#00ebcb",
    padding: 10 ,
    width: 300 ,
    height: 150 ,
    borderRadius: 50
  },
  statText: {
    textAlign: "center",
    fontFamily: "Arial", //oswald
    //fontSize: 36,
    fontWeight: "bold",  
    //flex: .25
  },
  labelText: {
    textAlign: "center",
    fontFamily: "Arial", //oswald
    fontSize: 18,
    fontWeight: "100",  
    //flex: .25
  },
});
