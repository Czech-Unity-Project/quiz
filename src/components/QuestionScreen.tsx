import { useEffect, type Dispatch } from 'react';
import { COUNTRIES, TIME_LIMIT_SECONDS, type Country } from '../config';
import type { Action, GameState } from '../game/reducer';
import { photoUrl } from '../photo';
import TimerBar from './TimerBar';

interface Props {
  state: GameState;
  dispatch: Dispatch<Action>;
}

export default function QuestionScreen({ state, dispatch }: Props) {
  const { round, index, score, picked, phase } = state;
  const question = round[index];
  const answered = phase === 'feedback';
  const correct = answered && picked === question.answer;

  // Preload the next photo so it appears instantly.
  useEffect(() => {
    const next = round[index + 1];
    if (next) new Image().src = photoUrl(next.image);
  }, [round, index]);

  const buttonState = (c: Country) => {
    if (!answered) return '';
    if (c === question.answer) return 'ok';
    return c === picked ? 'bad' : 'dim';
  };

  const toast = correct
    ? { kind: 'ok', text: 'Correct!' }
    : picked
      ? { kind: 'bad', text: `Not quite: it's ${question.answer}` }
      : { kind: 'time', text: `Time's up! It was ${question.answer}` };

  return (
    <section className="screen">
      <header className="top">
        <span className="pill">Question {index + 1} / {round.length}</span>
        <span key={score} className={`pill${score > 0 ? ' bump' : ''}`}>Score {score}</span>
      </header>

      <TimerBar
        key={`timer-${index}`}
        seconds={TIME_LIMIT_SECONDS}
        running={!answered}
        onTimeout={() => dispatch({ type: 'TIMEOUT' })}
      />

      {correct && <div key={`plus-${index}`} className="plus">+1</div>}

      <div className="stage" key={`stage-${index}`}>
        <div className="photo">
          <img src={photoUrl(question.image)} alt="Mystery photo: which country is this?" />
          {answered && (
            <>
              <div className={`toast ${toast.kind}`} role="status">{toast.text}</div>
              <button className="next" onClick={() => dispatch({ type: 'NEXT' })}>
                {index + 1 < round.length ? 'Next →' : 'See score →'}
              </button>
            </>
          )}
        </div>

        <p className="q">{answered && question.fact ? question.fact : 'Where was this photo taken?'}</p>

        <div className="grid">
          {COUNTRIES.map((c) => (
            <button
              key={c}
              className={`btn ${buttonState(c)}`}
              disabled={answered}
              onClick={() => dispatch({ type: 'ANSWER', country: c })}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
