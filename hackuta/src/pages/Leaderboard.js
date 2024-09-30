import React from 'react';
import useUserScores from '../hooks/useUserScores';

const Leaderboard = () => {
  const { scores, loading, error } = useUserScores(10); // Fetch top 10 scores

  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Rank</th>
            <th className="p-2 text-left">Username</th>
            <th className="p-2 text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={score.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{score.username}</td>
              <td className="p-2">{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;