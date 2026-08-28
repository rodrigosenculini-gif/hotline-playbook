import { motion } from 'framer-motion';

function getSections(pb) {
  const base = [
    { id: 'essencial', label: 'O essencial' },
    { id: 'fluxo', label: 'Fluxo de abordagem' },
    { id: 'cenarios', label: 'Cenários' },
    { id: 'negociacao', label: 'Negociação' },
    { id: 'objecoes', label: 'Objeções' },
    { id: 'regras', label: 'Regras de ouro' },
  ];
  if (pb.leilao) base.push({ id: 'leilao', label: 'Leilão' });
  base.push({ id: 'checklist', label: 'Checklist' });
  return base;
}

export default function PlaybookView({ product, onClose }) {
  const pb = product.playbook;

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <motion.div
      className="playbook-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="playbook-sheet"
        style={{ '--accent': product.color }}
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="playbook-close" onClick={onClose}>✕</button>

        <nav className="playbook-nav">
          <div className="playbook-brand">
            <small>Playbook comercial</small>
            <strong>{product.icon} {product.name}</strong>
          </div>
          {getSections(pb).map((s) => (
            <a key={s.id} onClick={() => scrollTo(s.id)}>{s.label}</a>
          ))}
        </nav>

        <main className="playbook-main">
          <p className="eyebrow-pb">Treinamento rápido · abordagem</p>
          <h1>{product.name}</h1>
          <p className="subtitle-pb">{product.tagline}</p>

          <div className="hero-grid-pb">
            {pb.hero.map((h, i) => (
              <div key={i} className="hero-card-pb">
                <div className="label-pb">{h.label}</div>
                <strong>{h.value}</strong>
              </div>
            ))}
          </div>

          <section id="essencial">
            <div className="section-title-pb"><span className="section-number-pb">01</span><h2>O essencial</h2></div>
            <p className="section-subtitle-pb">Se lembrar de apenas isso, lembre disto.</p>
            <div className="grid-pb">
              {pb.essencial.map((c, i) => (
                <div key={i} className={`card-pb ${c.tone}`}>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
            {pb.highlight && (
              <div className="highlight-pb">
                <strong>Frase que você precisa dominar:</strong>
                <p>{pb.highlight}</p>
              </div>
            )}
            {pb.duvidaFrequente && (
              <div className="card-pb" style={{ marginTop: 16 }}>
                <h3>Dúvida frequente</h3>
                <p>{pb.duvidaFrequente}</p>
              </div>
            )}
          </section>

          <section id="fluxo">
            <div className="section-title-pb"><span className="section-number-pb">02</span><h2>Fluxo de abordagem</h2></div>
            <p className="section-subtitle-pb">A ligação/atendimento não precisa explicar tudo — precisa gerar interesse.</p>
            <div className="flow-pb">
              {pb.flow.map((f, i) => (
                <div key={i} className="flow-item-pb">
                  <strong>{f.title}</strong>
                  <span>{f.sub}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="cenarios">
            <div className="section-title-pb"><span className="section-number-pb">03</span><h2>Cenários comuns</h2></div>
            <p className="section-subtitle-pb">O que fazer em cada situação de atendimento.</p>
            <div className="grid-pb">
              {pb.cenarios.map((c, i) => (
                <div key={i} className="card-pb">
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="negociacao">
            <div className="section-title-pb"><span className="section-number-pb">04</span><h2>Negociação</h2></div>
            <p className="section-subtitle-pb">Não entregue a melhor condição logo de cara.</p>
            <div className="card-pb gold">
              <h3>Ordem da negociação</h3>
              <div className="steps-pb">
                {pb.negociacao.map((s, i) => (
                  <div key={i} className="step-pb">
                    <div className="step-num-pb">{i + 1}</div>
                    <div>
                      <strong>{s.step}</strong>
                      <span>{s.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="objecoes">
            <div className="section-title-pb"><span className="section-number-pb">05</span><h2>Objeções</h2></div>
            <p className="section-subtitle-pb">Descubra a dúvida antes de tentar convencer.</p>
            <div className="objections-pb">
              {pb.objections.map((o, i) => (
                <div key={i} className="objection-pb">
                  <div className="question-pb">{o.q}</div>
                  <div className="answer-pb">{o.a}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="regras">
            <div className="section-title-pb"><span className="section-number-pb">06</span><h2>Regras de ouro</h2></div>
            <div className="grid-pb">
              {pb.regrasOuro.map((r, i) => (
                <div key={i} className="card-pb">
                  <p style={{ margin: 0 }}>{r}</p>
                </div>
              ))}
            </div>
          </section>

          {pb.leilao && (
            <section id="leilao">
              <div className="section-title-pb"><span className="section-number-pb">07</span><h2>Leilão</h2></div>
              <p className="section-subtitle-pb">{pb.leilao.intro}</p>
              <h3 style={{ marginTop: 12 }}>Possíveis obstáculos</h3>
              <div className="grid-pb">
                {pb.leilao.obstaculos.map((o, i) => (
                  <div key={i} className="card-pb">
                    <p style={{ margin: 0 }}>{o}</p>
                  </div>
                ))}
              </div>
              <h3 style={{ marginTop: 16 }}>Possíveis saídas</h3>
              <div className="grid-pb">
                {pb.leilao.saidas.map((s, i) => (
                  <div key={i} className="card-pb">
                    <p style={{ margin: 0 }}>{s}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section id="checklist">
            <div className="section-title-pb"><span className="section-number-pb">{pb.leilao ? '08' : '07'}</span><h2>Checklist</h2></div>
            <div className="checklist-pb">
              {pb.checklist.map((c, i) => (
                <div key={i} className="check-pb">{c}</div>
              ))}
            </div>
          </section>
        </main>
      </motion.div>
    </motion.div>
  );
}
