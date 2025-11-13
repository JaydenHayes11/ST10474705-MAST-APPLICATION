import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import s from '../styles';


export default function HomeScreen() {
  const nav = useNavigation<any>();

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text style={s.title}>Christoffel Culinary</Text>


      <View style={s.pill}>
        <Text style={s.pillText}>Welcome To Christoffel’s Culinary</Text>
      </View>

      <View style={s.card}>
        <Text style={s.paragraph}>
          An enthusiastic private chef with years of experience in fine dining and a dedication to creating unique culinary experiences is the creator of Christoffel’s Culinary. Chef Christoffel founded the business, which specializes in creating custom menu items that combine traditional methods with strong, modern flavors.
        </Text>
      </View>
 

      <Pressable style={s.primaryBtn} onPress={() => nav.navigate('Menu')}>
        <Text style={s.primaryBtnText}>Continue to Menu</Text>
        
      </Pressable>

    </ScrollView>
  );
}
