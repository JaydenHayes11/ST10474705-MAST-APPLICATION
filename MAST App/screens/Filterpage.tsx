import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import s from '../styles';
import { useMenu } from '../MenuContent';
import { Course } from '../MenuTypes';
import { useNavigation } from '@react-navigation/native';

const courses: Course[] = ['Appetizers', 'Main Course', 'Desserts', 'Beverages'];

function Toggle({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <Pressable style={s.toggleRow} onPress={onToggle}>
      <View style={[s.check, checked && s.checkOn]}>
        {checked ? <Text style={s.checkOnText}>✓</Text> : null}
      </View>
      <View style={s.togglePill}>
        <Text style={s.toggleLabel}>{label}</Text>
      </View>
    </Pressable>
  );
}

export default function FilterScreen() {
  const nav = useNavigation<any>();
  const { activeFilters, setFilters } = useMenu();
  const [local, setLocal] = useState<Record<Course, boolean>>({
    Appetizers: false,
    'Main Course': false,
    Desserts: false,
    Beverages: false,
  });

  useEffect(() => {
    const pre: Record<Course, boolean> = {
        Appetizers: activeFilters.has('Appetizers'),
        'Main Course': activeFilters.has('Main Course'),
        Desserts: activeFilters.has('Desserts'),
        Beverages: activeFilters.has('Beverages'),
    };
    setLocal(pre);
  }, [activeFilters]);

  const apply = () => {
    const sel = new Set<Course>();
    courses.forEach((c) => local[c] && sel.add(c));
    setFilters(sel);
    nav.navigate('Menu');
  };

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text style={s.title}>Menu Filter</Text>
      <View style={s.pill}>
        <Text style={s.pillText}>Select Checkboxes on the left to add Filter for courses</Text>
      </View>

      {courses.map((c) => (
        <Toggle
          key={c}
          label={c}
          checked={local[c]}
          onToggle={() =>
            setLocal((p) => ({ ...p, [c]: !p[c] }))
          }
        />
      ))}

      <Pressable style={s.primaryBtn} onPress={apply}>
        <Text style={s.primaryBtnText}>ADD Filter</Text>
      </Pressable>
    </ScrollView>
  );
}