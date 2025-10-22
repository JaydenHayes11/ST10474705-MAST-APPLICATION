export type Course = 'Appetizers' | 'Main Course' | 'Desserts' | 'Beverages';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  course: Course;
};
