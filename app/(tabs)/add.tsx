import { QuoteT } from '@/constants/quote-type';
import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableHighlight,
  Alert,
} from 'react-native';

type DataResponseT = {
  success: boolean;
  data: QuoteT[];
};

export default function TabTwoScreen() {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');

  const addQuote = async () => {
    try {
      const res: DataResponseT = await fetch(
        `${process.env.BACKEND}/quotes/add`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text, author }),
        }
      ).then((res) => res.json());

      if (res.success) {
        Alert.alert('Quote added');
        setAuthor('');
        setText('');
      }
    } catch (e) {
      console.error(e);
      Alert.alert(
        "Oh no, an error occured!\nCheck if quote is unique and author's name is no longer than 40 characters"
      );
      setAuthor('');
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Adding new quote</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboard}
      >
        <View style={{ width: '100%' }}>
          <Text style={styles.label}>Quote text:</Text>
          <TextInput
            style={styles.input}
            value={text}
            onChange={(event) => setText(event.nativeEvent.text)}
          />
        </View>

        <View style={{ width: '100%' }}>
          <Text style={styles.label}>Author of text:</Text>
          <TextInput
            style={styles.input}
            value={author}
            onChange={(event) => setAuthor(event.nativeEvent.text)}
          />
        </View>

        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor="#fff"
          onPress={addQuote}
          style={styles.button}
        >
          <Text style={{ color: '#000', fontSize: 18 }}>Add</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    minHeight: '100%',
    backgroundColor: '#0C0C0C',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 70,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 20,
    width: '100%',
    backgroundColor: '#212121',
    paddingTop: 60,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    color: '#fff',
  },
  keyboard: {
    width: '100%',
    gap: 15,
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 15,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#ececec',
    width: 'auto',
    padding: 10,
    borderRadius: 10,
    color: '#000',
    fontSize: 18,
    margin: 10,
  },
  button: {
    backgroundColor: '#ececec',
    color: '#212121',
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 10,
  },
});
