import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import DateVote from './../../modules/dateVote';
import DateTimePicker from '@react-native-community/datetimepicker';

const NewDateVote = () => {
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [message, setMessage] = useState("");
  //const [date, setDate] = useState(new Date().toLocaleString());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChangeDateDebut = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDateDebut(currentDate);
  };

  const onChangeDateFin = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDateFin(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const dateVote = new DateVote({ host: 'http://localhost:3000' })
  
  const createDateVote = () => { 
    dateVote.newDateVote(
      {
        date_debut: dateDebut,
        date_fin: dateFin,
      }
    )
    .then(() => {
      setMessage(`Date debut vote: ${dateDebut}, date fin vote: ${dateFin} ajouté avec succès`)
      //navigation.navigate('My Application');
    })
    .catch(error => {
      setMessage("Erreur enregistrement");
    });
    }
    
  return (
    <View>
      { !!message && <Text>{message}</Text>}
      <>
        <Text>Ajouter une nouvelle date vote</Text>
        <View>
          <View>
            <Button onPress={showDatepicker} title="Choisissez une date debut vote" />
          </View>
          <View>
            <Button onPress={showTimepicker} title="Choisissez le temps" />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInSeconds={3600*2}
              value={dateDebut}
              mode={mode}
              is24Hour={true}
              display="default"
              minimumDate={new Date().toLocaleString()}
              onChange={onChangeDateDebut}
            />
            
          )}
        </View>

        <View>
          <View>
            <Button onPress={showDatepicker} title="Choisissez la date fin vote" />
          </View>
          <View>
            <Button onPress={showTimepicker} title="Choisissez le temps" />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInSeconds={3600*2}
              value={dateFin}
              mode={mode}
              is24Hour={true}
              display="default"
              minimumDate={dateDebut}
              onChange={onChangeDateFin}
            />
            
          )}
        </View>

        <Button
          title="Enregistrer"
          type='solid'
          color='#A9A9A9'
          onPress={() => createDateVote()}
        />
      </>

    </View>
  )
}

export default NewDateVote;

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: '#d3d3d3'
  }
})
