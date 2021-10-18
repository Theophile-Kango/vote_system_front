import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import EndPoint from '../../modules/endPoints';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { url } from '../../modules/url';

const NewDateVote = () => {
  
  const [isDateDebutVisibility, setIsDateDebutVisibility] = useState(false);
  const [isDateFinVisibility, setIsDateFinVisibility] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [dateNow, setDateNow] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let secTimer = setInterval( () => {
      setDateNow(new Date())
    },1000)

    return () => clearInterval(secTimer);
  }, []);

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
    setShow(true);
  };

  const dateVoteUrl = new EndPoint({ host: url });
  
  const createDateVote = () => { 
    setIsLoading(true);
    if(title===""){ 
      alert("Remplissez le champ tititre");
      setIsLoading(false);
    }else{
      if(dateDebut >= dateFin){
        setMessage("La date debut doit etre avant la date fin");
        setIsLoading(false);
      }else{
        dateVoteUrl.newDateVote(
          {
            title: title,
            date_debut: dateDebut,
            date_fin: dateFin
          }
        )
        .then(() => {
          alert(`Dates ajoutées avec succès`);
          setIsLoading(false);
        })
        .catch(error => {
          alert("Erreur enregistrement");
          setIsLoading(false);
          console.warn(error);
        });
      }
    }
  }
    
  return (
    <View style={styles.main}>
      <View style={styles.card, { backgroundColor: '#fff', paddingTop: 10} }>
        <Text style={[styles.title, { fontWeight: 'bold', textAlign: 'left', textAlignVertical: 'center', color: '#000' }]}>
          Ajouter une nouvelle date vote 
        </Text>
      </View>
      {!!show && <View style={styles.card, { backgroundColor: '#ddd', padding: 20} }>
        <Text style={[styles.title, { fontWeight: 'bold', textAlign: 'left', textAlignVertical: 'center', color: '#000' }]}>
        {`La date debut vote est : ${dateDebut} et la date fin vote est ${dateFin}`}
        </Text>
      </View>}
      <>
        <TextInput
          style={[styles.input, styles.commun, {backgroundColor: '#ddd', color: "#000"}]}
          placeholder='Intitule du vote'
          onChangeText={text => setTitle(text)}
        />
          <View>
            <TouchableOpacity 
              onPress={showDatePicker1} 
              style={styles.commun}
            >
              <Text style={styles.input}>Choisissez la date et le temps debut vote</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDateDebutVisibility}
              mode="datetime"
              minimumDate={dateNow}
              onConfirm={handleConfirmDebut}
              onCancel={hideDatePicker1}
            />
          </View> 
          <View>
            <TouchableOpacity 
              onPress={showDatePicker2} 
              style={styles.commun}
            >
              <Text style={styles.input}>Choisissez la date et temps fin vote</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDateFinVisibility}
              mode="datetime"
              minimumDate={dateDebut}
              onConfirm={handleConfirmFin}
              onCancel={hideDatePicker2}
            />
          </View>
        

          <TouchableOpacity
            style={[styles.button, styles.commun]}
            onPress={() => createDateVote()}
          >
          {isLoading ? 
            <Image
              source={require('./../../assets/loaderimg.gif')}
              style={styles.image}
            />
            :
            <Text style={{color: '#fff'}}>
              Enregistrer
            </Text>
          }
        </TouchableOpacity>
      </>

    </View>
  )
}

export default NewDateVote;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  card: {
    padding: 7,
    paddingLeft: 10,
    paddingRight: 8,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 15,
    paddingBottom: 10,
    color: '#454545'
  },
  image: {
    width: 45,
    height: 45
  },
  commun: {
    width: 280,
    height: 55,
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#5cb85c',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderColor: '#ddd',
    height: '100%',
    color: '#fff',
    textAlign: 'left',
    textAlignVertical: 'center',
    backgroundColor: '#317AFF',
    borderWidth: 1,
    padding: 10
  }
})
