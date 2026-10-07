import { useEffect, useState } from 'react';
import { INSTAGRAM } from '../config';
import type { Question } from '../data/questions';
import { messageFor } from '../game/logic';
import Confetti from './Confetti';

interface Props {
  score: number;
  round: Question[];
  onRestart: () => void;
}

export default function ResultScreen({ score, round, onRestart }: Props) {
  const total = round.length;
  const { tier, text } = messageFor(score, total);
  const credits = [...new Set(round.map((q) => q.credit).filter(Boolean))] as string[];

  // Count the score up for a little drama.
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= score) return;
    const t = setTimeout(() => setShown((s) => s + 1), 1200 / Math.max(score, 1));
    return () => clearTimeout(t);
  }, [shown, score]);

  return (
    <section className="screen result">
      {(tier === 'perfect' || tier === 'great') && <Confetti />}

      <div className="card result-card">
        <div className="label">Your score</div>
        <div className="big" aria-label={`${score} out of ${total}`}>
          {shown} / {total}
        </div>
        <p className="msg">{text}</p>
        <p className="follow">
          Want more? Follow us on Instagram:{' '}
          <a href={INSTAGRAM.url} target="_blank" rel="noopener noreferrer">
            @{INSTAGRAM.handle}
          </a>
        </p>
        <button className="cta" onClick={onRestart}>
          Play again
        </button>
      </div>

      {credits.length > 0 && (
        <details className="credits">
          <summary>Photo credits</summary>
          <ul>
            {credits.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
}
