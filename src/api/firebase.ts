import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Task } from '../store/types/types';

export async function updateTaskToDB(allToDoList: Task[], dbId: string) {
  const docRef = doc(db, 'users', dbId);

  await updateDoc(docRef, {
    toDoList: allToDoList,
  });
}
