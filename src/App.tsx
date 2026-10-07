import { useReducer } from 'react';
import { ROUND_SIZE, SHUFFLE_QUESTIONS } from './config';
import { QUESTIONS } from './data/questions';
import { buildRound } from './game/logic';
import { gameReducer, initialState } from './game/reducer';
import RulesScreen from './components/RulesScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const start = () =>
    dispatch({
      type: 'START',
      round: SHUFFLE_QUESTIONS ? buildRound(QUESTIONS, ROUND_SIZE) : QUESTIONS.slice(0, ROUND_SIZE),
    });

  return (
    <main className="app">
      {state.phase === 'rules' && (
        <RulesScreen questionCount={Math.min(ROUND_SIZE, QUESTIONS.length)} onStart={start} />
      )}
      {(state.phase === 'question' || state.phase === 'feedback') && (
        <QuestionScreen state={state} dispatch={dispatch} />
      )}
      {state.phase === 'result' && (
        <ResultScreen
          score={state.score}
          round={state.round}
          onRestart={() => dispatch({ type: 'RESTART' })}
        />
      )}
    </main>
  );
}
