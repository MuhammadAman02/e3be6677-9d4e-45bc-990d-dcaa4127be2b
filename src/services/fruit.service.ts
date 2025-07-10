export interface Fruit {
  id: number;
  name: string;
  color: string;
  category: string;
}

const fruitsData: Fruit[] = [
  { id: 1, name: "Apple", color: "Red", category: "Pome" },
  { id: 2, name: "Banana", color: "Yellow", category: "Berry" },
  { id: 3, name: "Orange", color: "Orange", category: "Citrus" },
  { id: 4, name: "Grape", color: "Purple", category: "Berry" },
  { id: 5, name: "Strawberry", color: "Red", category: "Berry" },
  { id: 6, name: "Mango", color: "Yellow", category: "Drupe" },
  { id: 7, name: "Pineapple", color: "Yellow", category: "Multiple" },
  { id: 8, name: "Watermelon", color: "Green", category: "Pepo" },
  { id: 9, name: "Kiwi", color: "Brown", category: "Berry" },
  { id: 10, name: "Peach", color: "Orange", category: "Drupe" },
];

export async function getFruits(): Promise<Fruit[]> {
  console.log('Fetching fruits from service');
  return fruitsData;
}

export async function getFruitById(id: number): Promise<Fruit | null> {
  console.log(`Fetching fruit with id: ${id}`);
  return fruitsData.find(fruit => fruit.id === id) || null;
}