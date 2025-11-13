import React, { useMemo } from 'react';
import { View, Text, ScrollView, Pressable, FlatList } from 'react-native';
import s from '../styles';
import { useMenu } from '../MenuContent';
import { Course } from '../MenuTypes';

type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  course?: Course;
};

function Section({
  title,
  data,
}: {
  title: string;
  data: MenuItem[];
}) {

  const count = useMemo(() => data.length, [data]);

  const avgPrice = useMemo(() => {
    if (data.length === 0) return 0;
    const total = data.reduce((sum, item) => sum + item.price, 0);
    return total / data.length;
  }, [data]);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={s.sectionTitle}>{title}</Text>

      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <View style={s.menuRow}>
            <View style={s.thumb} />
            <View style={{ flex: 1 }}>
              <Text style={s.itemName}>{item.name}</Text>
              <Text style={s.itemDesc}>{item.description || '—'}</Text>
            </View>
            <View style={s.pricePill}>
              <Text style={s.pricePillText}>R{item.price}</Text>
            </View>
          </View>
        )}
        scrollEnabled={false}
      />

      <Text style={s.avgPrice}>
        Total Items: {count} • Avg Price: R{avgPrice.toFixed(2)}
      </Text>
    </View>
  );
}

export default function MenuScreen() {
  const { items, activeFilters } = useMenu();

  const byCourse: Record<Course, MenuItem[]> = {
    Appetizers: items.filter((i) => i.course === 'Appetizers'),
    'Main Course': items.filter((i) => i.course === 'Main Course'),
    Desserts: items.filter((i) => i.course === 'Desserts'),
    Beverages: items.filter((i) => i.course === 'Beverages'),
  };

  const visibleCourses =
    activeFilters.size > 0
      ? (Array.from(activeFilters) as Course[])
      : (['Appetizers', 'Main Course', 'Desserts', 'Beverages'] as Course[]);

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text style={s.title}>Chef’s Menu</Text>
      <View style={s.pill}>
        <Text style={s.pillText}>Discover our Carefully crafted Dishes</Text>
      </View>

      {visibleCourses.map((c) => (
        <Section key={c} title={c} data={byCourse[c]} />
      ))}
    </ScrollView>
  );
}
