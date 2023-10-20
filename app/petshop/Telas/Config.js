import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function Config() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Configurações</Text>
      <View style={styles.setting}>
        <Text>Notificações</Text>
        <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
      </View>
      <View style={styles.setting}>
        <Text>Modo Escuro</Text>
        <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
      </View>
      <Button mode="contained" onPress={() => console.log("Salvar configurações")}>
        Salvar Configurações
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
