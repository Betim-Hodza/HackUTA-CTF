import { useState, useEffect } from 'react';
import { db } from '../firebaseconfig';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const useUserScores = (limitCount = 10) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const scoresCollection = collection(db, 'users');
        const q = query(scoresCollection, orderBy('score', 'desc'), limit(limitCount));
        const querySnapshot = await getDocs(q);
        
        const fetchedScores = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setScores(fetchedScores);
      } catch (err) {
        console.error('Error fetching scores:', err);
        setError('Error fetching scores: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [limitCount]);

  return { scores, loading, error };
};

export default useUserScores;