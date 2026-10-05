import { COUNTRIES } from '../config';
import { CANDIDATES } from '../data/candidates';
import { photoUrl } from '../photo';

// The showcase lives one folder below the game, so photos are one level up.
const PHOTO_ROOT = '../';

// Number every candidate once, in file order, so people can refer to "#7".
const numbered = CANDIDATES.map((q, i) => ({ ...q, n: i + 1 }));

export default function Showcase() {
  return (
    <main className="showcase">
      <header className="sc-header">
        <h1 className="title sc-title">Quiz photo candidates</h1>
        <p className="sc-intro">
          Every photo we're considering for <b>Guess the country!</b> Note the numbers of your favourites.
        </p>
        <nav className="sc-counts">
          {COUNTRIES.map((c) => (
            <a key={c} className="pill" href={`#${c.toLowerCase()}`}>
              {c} · {numbered.filter((q) => q.answer === c).length}
            </a>
          ))}
        </nav>
      </header>

      {COUNTRIES.map((country) => {
        const items = numbered.filter((q) => q.answer === country);
        return (
          <section key={country} id={country.toLowerCase()} className="sc-section">
            <h2 className="sc-country">{country}</h2>
            {items.length === 0 ? (
              <p className="sc-empty">No candidates yet.</p>
            ) : (
              <div className="sc-grid">
                {items.map((q) => (
                  <article key={q.n} className="card sc-card">
                    <h3 className="sc-card-title">
                      <span className="sc-num">#{q.n}</span>
                      {q.title ?? q.fact ?? q.image}
                    </h3>
                    <a className="sc-photo" href={photoUrl(q.image, PHOTO_ROOT)} target="_blank" rel="noreferrer">
                      <img src={photoUrl(q.image, PHOTO_ROOT)} alt={q.title ?? `${country} photo`} loading="lazy" />
                    </a>
                    {(q.fact || q.credit) && (
                      <div className="sc-meta">
                        {q.fact && <p><span>After answering:</span> {q.fact}</p>}
                        {q.credit && <p className="sc-credit">{q.credit}</p>}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </main>
  );
}
