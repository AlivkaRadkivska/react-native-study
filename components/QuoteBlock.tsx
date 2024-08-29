import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';

type QuoteBlockProps = {
  text: string;
  author: string;
};

export default function QuoteBlock({ text, author }: QuoteBlockProps) {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync("'" + text + "' -" + author);
    Alert.alert('Copied');
  };

  return (
    <View style={styles.block}>
      <Text style={styles.backgroundQuote}>"</Text>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.row}>
        <Text style={styles.author}>© {author}</Text>
        <TouchableOpacity onPress={copyToClipboard} style={styles.button}>
          <Text style={styles.buttonText}>Copy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: '#ececec',
    display: 'flex',
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    margin: 0,
    overflow: 'hidden',
  },
  backgroundQuote: {
    position: 'absolute',
    fontSize: 250,
    top: -95,
    right: 2,
    fontFamily: 'Ephesis',
    opacity: 0.1,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 15,
  },
  text: {
    width: '100%',
    fontSize: 20,
    fontStyle: 'italic',
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#212121',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    width: 'auto',
    fontSize: 16,
  },
});
