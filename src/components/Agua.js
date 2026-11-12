import { useState } from "react";
//Programar y cancelar notificaciones
import * as Notifications from 'expo-notifications';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Agua() {
    //Guarda el id de la notificación programada
    //Inicia como null (no activo)
    const [idRecordatorio, setIdRecordatorio] = useState(null);

    //Se ejecuta al presionar el botón
    async function alternarRecordatorio() {
        //Si hay un recordatorio activo
        if (idRecordatorio) {
            //Cancela la notificación usando su identificador
            //await espera que la cancelación termine antes de continuar
            await Notifications.cancelScheduledNotificationAsync(idRecordatorio);
            //Pasa a inactivo
            setIdRecordatorio(null);
            //Termina la función
            return;
        }

        //Si no hay un recordatorio activo, programa una notificación
        //await Notifications.scheduleNotificationAsync() crea la notificación
        const id = await Notifications.scheduleNotificationAsync({
            //Define el título y el contenido de la notificación
            content: {
                title: '💧 ¡Hora de tomar agua!',
                body: 'Un vaso de agua te hará bien.'
            },
            //Indica cada cuanto tiempo se mostrará la notificación (en este caso)
            trigger: {
                //Esto es para controlar los intervalos de tiempo
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                //30 minutos
                seconds: 30 * 60,
                //Se activa periódicamente
                repeats: true
            }
        });

        //Se guarda en el estado para poder cancelar esa notificación después
        setIdRecordatorio(id);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Recuerda tomar agua</Text>
            <Text style={styles.textoClaro}>Te recordaré beber agua cada 30 minutos💧</Text>
            <Text style={styles.textoClaro}>
                {idRecordatorio ? "Pulsa el botón para desactivar el recordatorio" 
                :
                "Pulsa el botón para activar el recordatorio"}
            </Text>
            <TouchableOpacity style={styles.btn} onPress={alternarRecordatorio}>
                <Text style={styles.txtBtn}>
                    {/*Si hay un identificador (si está activo) muestra "Desactivar"*/}
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