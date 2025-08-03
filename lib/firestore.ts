import { collection, addDoc, getDocs, orderBy, query, serverTimestamp, type Timestamp } from "firebase/firestore"
import { db } from "./firebase"

export interface GuestMessage {
  id?: string
  name: string
  message: string
  timestamp: Timestamp | Date
}

// Add a new guest message
export const addGuestMessage = async (name: string, message: string) => {
  try {
    const docRef = await addDoc(collection(db, "guestMessages"), {
      name,
      message,
      timestamp: serverTimestamp(),
    })
    return docRef.id
  } catch (error) {
    console.error("Error adding message:", error)
    throw error
  }
}

// Get all guest messages
export const getGuestMessages = async (): Promise<GuestMessage[]> => {
  try {
    const q = query(collection(db, "guestMessages"), orderBy("timestamp", "desc"))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as GuestMessage,
    )
  } catch (error) {
    console.error("Error getting messages:", error)
    throw error
  }
}
