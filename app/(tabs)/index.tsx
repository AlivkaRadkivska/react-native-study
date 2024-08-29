import QuoteBlock from '@/components/QuoteBlock';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { QuoteT } from '@/constants/quote-type';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

type DataResponseT = {
  success: boolean;
  data: QuoteT[];
};

export default function HomeScreen() {
  const [isLoading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState<QuoteT[]>([]);

  const getQuotes = async () => {
    try {
      const res: DataResponseT = await fetch(
        `${process.env.BACKEND}/quotes`
      ).then((res) => res.json());

      if (res.success) setQuotes(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuotes();
  }, [isLoading]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Politekhnichni kotyky's quotes</Text>
        <TouchableOpacity onPress={() => setLoading(true)}>
          <TabBarIcon name="reload" color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.quotesWraper}
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <Text
            style={{
              width: '100%',
              paddingTop: 50,
              textAlign: 'center',
              color: '#fff',
              fontSize: 24,
            }}
          >
            Quotes are loading...
          </Text>
        ) : (
          quotes.map((item) => (
            <QuoteBlock key={item._id} text={item.text} author={item.author} />
          ))
        )}
      </ScrollView>
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
    paddingBottom: 120,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 20,
    width: '100%',
    backgroundColor: '#212121',
    paddingTop: 60,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    color: '#fff',
  },
  quotesWraper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: 10,
    padding: 10,
    margin: 0,
  },
});
