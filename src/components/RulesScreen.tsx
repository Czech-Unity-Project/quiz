import { COUNTRIES, TIME_LIMIT_SECONDS } from '../config';

interface Props {
  questionCount: number;
  onStart: () => void;
}

export default function RulesScreen({ questionCount, onStart }: Props) {
  return (
    <section className="screen rules">
      <h1 className="title">
        Guess the
        <br />
        country!
      </h1>

      <div className="card">
        <ol className="rule-list">
          <li><span>You'll see <b>{questionCount} photos</b>, one at a time.</span></li>
          <li><span>Tap the country each photo is relevant to.</span></li>
          <li><span>You have <b>{TIME_LIMIT_SECONDS} seconds</b> per photo.</span></li>
          <li><span>Every right answer is <b>1 point</b>.</span></li>
        </ol>
        <div className="country-chips">
          {COUNTRIES.map((c) => (
            <span key={c} className="pill">{c}</span>
          ))}
        </div>
      </div>

      <button className="cta" onClick={onStart}>
        Start
      </button>
    </section>
  );
}
