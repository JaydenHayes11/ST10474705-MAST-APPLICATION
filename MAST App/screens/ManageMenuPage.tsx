import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import s from '../styles';
import { Course, MenuItem } from '../MenuTypes';
import { useMenu } from '../MenuContent';
import { nanoid } from 'nanoid/non-secure';



const courseOptions: Course[] = ['Appetizers', 'Main Course', 'Desserts'];

function CourseRadio({
  value,
  current,
  onChange,
}: {
  value: Course;
  current: Course;
  onChange: (v: Course) => void;
}) {
  const selected = value === current;
  return (
    <Pressable style={s.radioRow} onPress={() => onChange(value)}>
      <View style={[s.radioOuter, selected && s.radioOuterOn]}>
        {selected ? <View style={s.radioInner} /> : null}
      </View>
      <Text style={s.radioLabel}>{value}</Text>
    </Pressable>
  );
}

export default function ManageScreen() {
  const { items, addItem, removeItem } = useMenu();
  const [name, setName] = useState('');
  const [price, setPrice] = useState<string>('0');
  const [desc, setDesc] = useState('');
  const [course, setCourse] = useState<Course>('Appetizers');

  const grouped = useMemo(() => {
    return {
      Appetizers: items.filter((i) => i.course === 'Appetizers'),
      'Main Course': items.filter((i) => i.course === 'Main Course'),
      Desserts: items.filter((i) => i.course === 'Desserts'),
      Beverages: items.filter((i) => i.course === 'Beverages'),
    };
  }, [items]);

  const onAdd = () => {
    const p = parseFloat(price);
    if (!name.trim() || isNaN(p)) {
      Alert.alert('Please enter a dish name and valid price.');
      return;
    }
    const payload: MenuItem = {
      id: nanoid(),
      name: name.trim(),
      description: desc.trim(),
      price: Math.max(0, Math.round(p * 100) / 100),
      course,
    };
    addItem(payload);
    setName('');
    setPrice('0');
    setDesc('');
    setCourse('Appetizers');
  };

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text style={s.title}>Menu Management</Text>
      <View style={s.pill}>
        <Text style={s.pillText}>Add, edit and Remove menu items</Text>
      </View>

      {/* Add Form */}
      <View style={s.card}>
        <Text style={s.subTitle}>+ Add New Menu Item</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter Dish Name"
          style={s.input}
          placeholderTextColor="#8e8e8e"
        />
        <TextInput
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholder="0.00"
          style={s.input}
          placeholderTextColor="#8e8e8e"
        />
        <Text style={s.label}>Course</Text>
        {courseOptions.map((opt) => (
          <CourseRadio
            key={opt}
            value={opt}
            current={course}
            onChange={setCourse}
          />
        ))}
        <TextInput
          value={desc}
          onChangeText={setDesc}
          placeholder="Describe the dish, ingredients and preparation..."
          multiline
          style={[s.input, { height: 100, textAlignVertical: 'top' }]}
          placeholderTextColor="#8e8e8e"
        />
        <Pressable style={s.primaryBtn} onPress={onAdd}>
          <Text style={s.primaryBtnText}>Add Menu Item</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
