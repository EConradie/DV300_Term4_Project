import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Translation } from '../models';
import { getTranslationsByUser } from '../../services/dbService';
import { auth } from '../../config/firebase';

export const SavedTranslations = () => {
  const navigation = useNavigation();
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [sortDesc, setSortDesc] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchTranslations = async () => {
        setLoading(true);
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        try {
          const data = await getTranslationsByUser(userId);
          setTranslations(data);
        } catch (error) {
          console.error('Error fetching translations:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchTranslations();
    }, [])
  );

  const sortedAndFilteredTranslations = translations
    .filter(
      (trans) =>
        trans.sourceText.toLowerCase().includes(search.toLowerCase()) ||
        trans.targetText.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortDesc) {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });

  const renderItem = ({ item }: { item: Translation }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('DetailedTranslation', { translation: item })
      }
    >
      <Text style={styles.languageText}>
        {item.sourceLanguage} ➔ {item.targetLanguage}
      </Text>
      <Text style={styles.translationText}>{item.sourceText}</Text>
      <Text style={styles.subtleText}>{item.targetText}</Text>
      <Text style={styles.dateText}>
        {new Date(item.date).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Translations</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          onChangeText={setSearch}
          value={search}
          placeholder="Search translations..."
          placeholderTextColor={colors.lightGray}
        />
        <TouchableOpacity onPress={() => setSortDesc(!sortDesc)}>
          <Ionicons
            name={sortDesc ? 'arrow-down' : 'arrow-up'}
            size={24}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={colors.white} />
      ) : (
        <FlatList
          style={styles.list}
          data={sortedAndFilteredTranslations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id || ''}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginVertical: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.white,
    backgroundColor: colors.darkGray,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.darkGray,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  languageText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: colors.lightGray,
    alignSelf: 'flex-end',
  },
  translationText: {
    fontSize: 16,
    color: colors.white,
    marginTop: 5,
  },
  subtleText: {
    fontSize: 14,
    color: colors.lightGray,
    fontStyle: 'italic',
  },
});
