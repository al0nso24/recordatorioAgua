import { useState } from "react";
import * as Notifications from 'expo-notifications';
import { View, Button, StyleSheet, Text } from 'react-native';

export default function Agua() {
    const [idRecordatorio, setIdRecordatorio] = useState(null);

    async function alternarRecordatorio() {
        if (idRecordatorio) {
            await Notifications.cancelScheduledNotificationAsync(idRecordatorio);
            setIdRecordatorio(null);
            return;
        }

        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title: '💧 ¡Hora de tomar agua!',
                body: 'Un vaso de agua te hará bien.'
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: 30 * 60,
                repeats: true
            }
        });

        setIdRecordatorio(id);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Recuerda tomar agua</Text>
            <Text style={styles.textoClaro}>Te recordaré beber agua cada 30 minutos💧</Text>
            <Button
                title={idRecordatorio ? "Desactivar recordatorio" : "Activar cada 30 min"}
                onPress={alternarRecordatorio}
            />
        </View>
    )
}

const styles = StyleSheet.create(({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 30
    },

    titulo: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center"
    },

    textoClaro: {
        color: "#BDBDBD",
        fontWeight: "bold"
    }
}))