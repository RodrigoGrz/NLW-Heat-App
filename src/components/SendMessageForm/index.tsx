import React, { useState } from "react";
import { TextInput, View, Alert, Keyboard } from "react-native";
import { api } from "../../services/api";
import { COLORS } from "../../theme";
import { Button } from "../Button";

import { styles } from './styles';

export function SendMessageForm() {
    const [message, setMessage] = useState('');
    const [sendingMessage, setSendMessage] = useState(false);

    async function handleMessageSubmit() {
        setSendMessage(true);

        const messageFormatted = message.trim();

        if(messageFormatted.length > 0) {
            await api.post('/messages', { message: messageFormatted });

            setMessage('');
            Keyboard.dismiss();
            setSendMessage(false);
            Alert.alert('Mensagem enviada com sucesso!');
        } else {
            Alert.alert('Escreva a mensagem para enviar!');
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                keyboardAppearance="dark"
                placeholder="Qual sua expectativo para o evento"
                placeholderTextColor={COLORS.GRAY_PRIMARY}
                multiline
                maxLength={140}
                onChangeText={setMessage}
                value={message}
                style={styles.input}
                editable={!sendingMessage}
            />
            <Button 
                title="ENVIAR MENSAGEM"
                backgroundColor={COLORS.PINK}
                color={COLORS.WHITE}
                isLoading={sendingMessage}
                onPress={handleMessageSubmit}
            />
        </View>
    )
}
