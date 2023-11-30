import { doc, updateDoc } from 'firebase/firestore';
import { Task } from '../store/slices/cardListSlice/types';
import { db } from '.';

export async function updateTaskToDB(allToDoList: Task[], dbId: string) {
  const docRef = doc(db, 'users', dbId);

  await updateDoc(docRef, {
    toDoList: allToDoList,
  });
}
