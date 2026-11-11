import { useState } from "react";
import * as Notifications from 'expo-notifications';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

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
            <Text style={styles.textoClaro}>Pulsa el botón para activar el recordatorio</Text>
            <TouchableOpacity style={styles.btn} onPress={alternarRecordatorio}>
                <Text style={styles.txtBtn}>
                    {idRecordatorio ? "Desactivar recordatorio" : "Activar"}
                </Text>
            </TouchableOpacity>
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
    },

    btn: {
        backgroundColor: '#61c6f1',
        borderColor: "#FFFFFF",
        borderRadius: 90,
        borderWidth: 3,
        padding: 15
    },

    txtBtn: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 14,
    }
}))