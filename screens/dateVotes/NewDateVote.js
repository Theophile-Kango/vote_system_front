import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import EndPoint from '../../modules/endPoints';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { url } from '../../modules/url';

const NewDateVote = () => {
  
  const [isDateDebutVisibility, setIsDateDebutVisibility] = useState(false);
  const [isDateFinVisibility, setIsDateFinVisibility] = useState(false);
  const [message, setMessage] = useState("");
  const [dateNow, setDateNow] = useState(new Date());

  useEffect(() => {
    let secTimer = setInterval( () => {
      setDateNow(new Date())
    },1000)

    return () => clearInterval(secTimer);
  }, []);
  //const currentDate = new Date(dateNow.getTime() + dateNow.getTimezoneOffset() * 60000);
  const [dateDebut, setDateDebut] = useState(dateNow);
  const [dateFin, setDateFin] = useState(dateDebut);

  const showDatePicker1 = () => {
    setIsDateDebutVisibility(true);
  };

  const hideDatePicker1 = () => {
    setIsDateDebutVisibility(false);
  };

  const showDatePicker2 = () => {
    setIsDateFinVisibility(true);
  };

  const hideDatePicker2 = () => {
    setIsDateFinVisibility(false);
  };

  const handleConfirmDebut = (date) => {
    setDateDebut(date);
    hideDatePicker1();
  };

  const handleConfirmFin = (date) => {
    setDateFin(date);
    hideDatePicker2();
  };

  const dateVoteUrl = new EndPoint({ host: url });
  
  const createDateVote = () => { 
    if(dateDebut >= dateFin){
      setMessage("La date debut doit etre avant la date fin");
    }else{
      dateVoteUrl.newDateVote(
        {
          date_debut: dateDebut,
          date_fin: dateFin,
        }
      )
      .then(() => {
        setMessage(`Date debut vote: ${dateDebut}, date fin vote: ${dateFin} ajouté avec succès`);
      })
      .catch(error => {
        setMessage("Erreur enregistrement");
        console.warn(error)
      });
    }
  }
    
  return (
    <View style={{marginTop: 50}}>
      { !!message && <Text>{message}</Text>}
      { <Text>{`La date debut est : ${dateDebut} et la date fin est ${dateFin}`}</Text> }
      <>
        <Text>Ajouter une nouvelle date vote</Text> 
          <View>
          <Button title="Date et temps debut vote" onPress={showDatePicker1} />
          <DateTimePickerModal
            isVisible={isDateDebutVisibility}
            mode="datetime"
            minimumDate={dateNow}
            onConfirm={handleConfirmDebut}
            onCancel={hideDatePicker1}
          />
          </View> 
          <View>
            <Button title="Date et temps fin vote" onPress={showDatePicker2} />
            <DateTimePickerModal
              isVisible={isDateFinVisibility}
              mode="datetime"
              minimumDate={dateDebut}
              onConfirm={handleConfirmFin}
              onCancel={hideDatePicker2}
            />
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
