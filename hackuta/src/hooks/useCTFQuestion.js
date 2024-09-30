import { useState, useEffect } from 'react';
import { db, auth } from '../firebaseconfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const useCTFQuestion = (questionId) => {
  const [question, setQuestion] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error('User not authenticated');
        }

        // Fetch question data
        const questionRef = doc(db, 'ctf_questions', questionId);
        const questionSnap = await getDoc(questionRef);

        if (questionSnap.exists()) {
          setQuestion(questionSnap.data());
        } else {
          throw new Error('Question not found');
        }

        // Check if user has completed this question
        const progressRef = doc(db, 'user', user.uid);
        const progressSnap = await getDoc(progressRef);

        if (progressSnap.exists()) {
          const userData = progressSnap.data();
          setCompleted(userData.completedQuestions?.includes(questionId) || false);
        }

      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [questionId]);

  const markAsCompleted = async () => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');
  
      // Fetch current user progress
      const progressRef = doc(db, 'users', user.uid);
      const progressSnap = await getDoc(progressRef);
  
      const currentScore = progressSnap.exists() ? (progressSnap.data().score || 0) : 0;
      const completedQuestions = progressSnap.exists() ? progressSnap.data().completedQuestions || [] : [];
  
      // Check if the question is already marked as completed
      if (!completedQuestions.includes(questionId)) {
        const newCompletedQuestions = [...completedQuestions, questionId];
        const newScore = currentScore + (question.points || 0);
  
        // Update user progress
        await setDoc(progressRef, {
          completedQuestions: newCompletedQuestions,
          score: newScore
        }, { merge: true });
      }
  
      // Mark the question as completed in the local state
      setCompleted(true);
  
    } catch (err) {
      console.error('Error marking question as completed:', err);
      throw err;
    }
  };  

  return { question, loading, error, completed, markAsCompleted };
};

export default useCTFQuestion;