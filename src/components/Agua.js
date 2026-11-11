import { useState } from "react";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';

const [pendientes, setPendientes] = useState(0);

async function actualizarPendientes() {
    const lista = await Notifications.getAllScheduledNotificationsAsync();
    setPendientes(lista.length);
}

async function recordar(segundos) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: '💧 ¡Hora de tomar agua!',
            body: 'Un vaso de agua te hará bien.'
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: segundos
        }
    })
    actualizarPendientes();
}


export default function Agua(){
    
}