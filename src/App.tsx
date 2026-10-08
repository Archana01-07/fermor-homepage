import { useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Layers3,
  Menu,
  Plus,
  Target,
  Wallet,
  X,
} from 'lucide-react'

type View = 'Overview' | 'Spending' | 'Goals'

const formatMoney = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)

const questions = [
  {
    question: 'What is Fermor?',
    answer:
      'Fermor is building a simpler way to understand, act, and grow financially. Its website includes financial calculators and educational resources to help people explore everyday money decisions.',
  },
  {
    question: 'Are these my actual financial numbers?',
    answer:
      'No. This homepage is an assignment concept. The financial overview uses illustrative sample data and does not connect to your bank or investment accounts.',
  },
  {
    question: 'How does the goal planner work?',
    answer:
      'It subtracts your existing savings from your target, then divides the remaining amount by your monthly contribution. It excludes interest, investment returns, inflation, and changes in contributions.',
  },
  {
    question: 'Does the demo store my information?',
    answer:
      'This demo does not store or submit the amounts you enter. They are used only to calculate the result in your browser.',
  },
  {
    question: 'Does Fermor provide financial advice?',
    answer:
      'Fermor describes its tools as educational and says it is not a SEBI-registered adviser. Calculators help you examine numbers and trade-offs; they are not personalised financial advice.',
  },
]

function FinancialPreview() {
  const [view, setView] = useState<View>('Overview')
  const [showInsight, setShowInsight] = useState(false)

  const bars =
    view === 'Spending'
      ? [65, 48, 72, 52, 86, 60, 44]
      : [24, 32, 30, 46, 53, 68, 85]

  return (
    <div className="preview" id="demo">
      <div className="preview-header">
        <div>
          <span className="eyebrow">YOUR MONEY AT A GLANCE</span>
          <h2>A little more clarity.</h2>
        </div>
        <span className="sample-label">Sample data</span>
      </div>

      <div className="preview-tabs" aria-label="Financial preview views">
        {(['Overview', 'Spending', 'Goals'] as View[]).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={view === item}
            className={view === item ? 'active' : ''}
            onClick={() => {
              setView(item)
              setShowInsight(false)
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="balance-row">
        <div>
          <p className="muted">
            {view === 'Overview'
              ? 'Your total balance'
              : view === 'Spending'
                ? 'Spent this month'
                : 'Saved for your goals'}
          </p>
          <p className="balance">
            {view === 'Overview'
              ? '₹4,82,500'
              : view === 'Spending'
                ? '₹28,400'
                : '₹1,20,000'}
          </p>
        </div>

        <span className="change">
          {view === 'Spending' ? (
            <ArrowDown size={14} />
          ) : (
            <ArrowUpRight size={14} />
          )}
          {view === 'Spending' ? '8% less' : 'Steady progress'}
        </span>
      </div>

      <div
        className="bar-chart"
        role="img"
        aria-label={
          view === 'Spending'
            ? 'Illustrative daily spending chart for Monday to Sunday'
            : 'Illustrative savings progress chart from April to October'
        }
      >
        {bars.map((height, index) => (
          <div className="bar-column" key={index}>
            <div
              className={`bar ${index === bars.length - 1 ? 'highlight' : ''}`}
              style={{ height: `${height}%` }}
            />
            <span>
              {view === 'Spending'
                ? ['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]
                : ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][index]}
            </span>
          </div>
        ))}
      </div>

      <div className="preview-divider" />

      <div className="mini-grid">
        <div>
          <span className="mini-icon">
            <Wallet size={17} />
          </span>
          <p className="muted">
            {view === 'Spending' ? 'Essentials' : 'Available cash'}
          </p>
          <strong>{view === 'Spending' ? '₹18,600' : '₹62,500'}</strong>
        </div>
        <div>
          <span className="mini-icon purple">
            <Target size={17} />
          </span>
          <p className="muted">
            {view === 'Goals' ? 'Emergency fund' : 'Goal savings'}
          </p>
          <strong>₹1,20,000</strong>
        </div>
      </div>

      <button
        type="button"
        className="insight-button"
        aria-expanded={showInsight}
        onClick={() => setShowInsight(!showInsight)}
      >
        <span>
          <span className="insight-dot" />
          {showInsight ? 'Hide this insight' : 'What do these numbers mean?'}
        </span>
        <Plus
          size={18}
          className={showInsight ? 'rotate-icon' : ''}
        />
      </button>

      {showInsight && (
        <p className="insight-answer">
          {view === 'Spending'
            ? 'In this example, essentials account for about 65% of spending. Reviewing the remaining categories can help you understand what changed this month.'
            : view === 'Goals'
              ? 'The sample emergency fund has reached 60% of its ₹2,00,000 target. Another ₹80,000 would complete it.'
              : 'This sample balance brings cash, goal savings, and investments into one view. Seeing each part separately helps explain the total.'}
        </p>
      )}
    </div>
  )
}

function GoalPlanner() {
  const [target, setTarget] = useState('200000')
  const [saved, setSaved] = useState('120000')
  const [monthly, setMonthly] = useState('10000')

  const goal = Number(target)
  const existing = Number(saved)
  const contribution = Number(monthly)

  const valid =
    target.trim() !== '' &&
    saved.trim() !== '' &&
    monthly.trim() !== '' &&
    Number.isFinite(goal) &&
    Number.isFinite(existing) &&
    Number.isFinite(contribution) &&
    goal > 0 &&
    existing >= 0 &&
    contribution > 0

  const remaining = valid ? Math.max(0, goal - existing) : 0
  const months = valid ? Math.ceil(remaining / contribution) : 0
  const progress = valid ? Math.min(100, (existing / goal) * 100) : 0

  return (
    <section className="planner-section section" id="planner">
      <div className="planner-copy">
        <span className="eyebrow">MAKE ROOM FOR WHAT MATTERS</span>
        <h2>
          A goal feels closer
          <br />
          when it has a plan.
        </h2>
        <p className="section-description">
          Your first safety net. A course you’ve been eyeing.
          A place of your own. Start with a number and see
          what a monthly habit can do.
        </p>
        <div className="planner-note">
          <span className="note-icon">
            <Target size={20} />
          </span>
          <p>
            Try changing your monthly contribution.
            <br />
            Small changes can shift your timeline.
          </p>
        </div>
      </div>

      <div className="planner-card">
        <div className="planner-card-heading">
          <h3>Your goal, in numbers</h3>
          <span className="sample-label">Try it yourself</span>
        </div>

        <div className="input-grid">
          <label>
            Target amount
            <span className="input-wrap">
              <span aria-hidden="true">₹</span>
              <input
                type="number"
                min="1"
                value={target}
                onChange={(event) => setTarget(event.target.value)}
              />
            </span>
          </label>

          <label>
            Already saved
            <span className="input-wrap">
              <span aria-hidden="true">₹</span>
              <input
                type="number"
                min="0"
                value={saved}
                onChange={(event) => setSaved(event.target.value)}
              />
            </span>
          </label>
        </div>

        <label>
          Monthly contribution
          <span className="input-wrap">
            <span aria-hidden="true">₹</span>
            <input
              type="number"
              min="1"
              value={monthly}
              onChange={(event) => setMonthly(event.target.value)}
            />
          </span>
        </label>

        <div className="planner-result" aria-live="polite" aria-atomic="true">
          {valid ? (
            <>
              <span className="eyebrow">YOUR ESTIMATED TIMELINE</span>
              <p className="result-number">
                {months === 0 ? (
                  'Goal reached'
                ) : (
                  <>
                    {months} <span>{months === 1 ? 'month' : 'months'}</span>
                  </>
                )}
              </p>

              <div
                className="progress-track"
                role="progressbar"
                aria-label="Goal savings progress"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div style={{ width: `${progress}%` }} />
              </div>

              <div className="progress-details">
                <span>{Math.round(progress)}% saved</span>
                <span>{formatMoney(remaining)} to go</span>
              </div>
            </>
          ) : (
            <p>
              Enter a positive target and monthly contribution,
              and a savings amount of zero or more.
            </p>
          )}
        </div>

        <p className="calculation-note">
          Simple savings estimate. Excludes interest, returns,
          and inflation. Your inputs stay in this demo.
        </p>
      </div>
    </section>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <nav className="nav container" aria-label="Main navigation">
          <a className="logo" href="#" aria-label="Fermor home">
            <span className="logo-symbol">
              <Layers3 size={22} strokeWidth={2.3} />
            </span>
            fermor<span className="logo-dot">.</span>
          </a>

          <div className="desktop-links">
            <a href="#how-it-works">How it works</a>
            <a href="#planner">Plan a goal</a>
            <a href="#resources">Resources</a>
          </div>

          <a className="nav-cta" href="#demo">
            Explore Fermor <ArrowUpRight size={16} />
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {menuOpen && (
          <div className="mobile-menu" id="mobile-menu">
            <a href="#how-it-works" onClick={closeMenu}>How it works</a>
            <a href="#planner" onClick={closeMenu}>Plan a goal</a>
            <a href="#resources" onClick={closeMenu}>Resources</a>
            <a href="#demo" onClick={closeMenu}>Explore the demo</a>
          </div>
        )}
      </header>

      <main id="main">
        <section className="hero container">
          <div className="hero-copy">
            <span className="hero-tag">
              <span /> A clearer relationship with money
            </span>

            <h1>
              Your money.
              <br />
              One clear
              <br />
              <span className="headline-highlight">picture.</span>
            </h1>

            <p className="hero-description">
              Understand where you stand, explore your options,
              and make room for what comes next.
              Meet a simpler way to think about your finances.
            </p>

            <div className="hero-actions">
              <a className="button button-dark" href="#demo">
                See how it works <ArrowUpRight size={19} />
              </a>
              <a className="text-link" href="#planner">
                Plan your next goal <ArrowRight size={17} />
              </a>
            </div>

            <p className="hero-footnote">
              <Check size={15} /> Explore the concept. No account needed.
            </p>
          </div>

          <div className="hero-visual">
            <div className="visual-caption">
              LESS GUESSWORK. MORE UNDERSTANDING.
              <ArrowDown size={16} />
            </div>
            <FinancialPreview />
            <div className="floating-note">
              <span className="floating-check"><Check size={18} /></span>
              <div>
                <strong>One view. A clearer next step.</strong>
                <p>That’s a good place to start.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="principles-strip">
          <div className="container strip-content">
            <span>Built around your everyday money questions</span>
            <span><Check size={16} /> Understand the numbers</span>
            <span><Check size={16} /> Compare your options</span>
            <span><Check size={16} /> Plan with purpose</span>
          </div>
        </div>

        <section className="section container" id="how-it-works">
          <div className="section-heading">
            <div>
              <span className="eyebrow">A SIMPLE WAY FORWARD</span>
              <h2>
                From “where do I start?”
                <br />
                to “I’ve got a plan.”
              </h2>
            </div>
            <p className="section-description">
              Money decisions get easier when you can
              see the whole picture and take one step at a time.
            </p>
          </div>

          <div className="benefit-grid">
            <article className="benefit-card">
              <div className="benefit-top">
                <span className="step-number">01 / UNDERSTAND</span>
                <Wallet size={23} />
              </div>
              <h3>See where you stand.</h3>
              <p>
                Bring spending, savings, and investments into
                focus. Start with a picture you can understand.
              </p>
              <div className="spending-example">
                <div><span>Essentials</span><strong>65%</strong></div>
                <div className="small-track"><span style={{ width: '65%' }} /></div>
                <div><span>Everything else</span><strong>35%</strong></div>
                <div className="small-track secondary">
                  <span style={{ width: '35%' }} />
                </div>
                <span className="example-caption">Illustrative spending split</span>
              </div>
            </article>

            <article className="benefit-card">
              <div className="benefit-top">
                <span className="step-number">02 / ACT</span>
                <ArrowUpRight size={23} />
              </div>
              <h3>Make the next step clearer.</h3>
              <p>
                Explore questions and compare scenarios
                before deciding what works for you.
              </p>
              <a className="question-example" href="#planner">
                What if I save ₹2,000 more each month?
                <ArrowUpRight size={21} />
              </a>
              <span className="example-caption">
                Try it in the goal planner
              </span>
            </article>

            <article className="benefit-card benefit-lime">
              <div className="benefit-top">
                <span className="step-number">03 / GROW</span>
                <Target size={23} />
              </div>
              <h3>Build toward your kind of future.</h3>
              <p>
                Turn a goal into a monthly habit.
                See how consistent contributions move you forward.
              </p>
              <div className="goal-example">
                <span>Emergency fund</span>
                <strong>60% there</strong>
                <div className="small-track"><span style={{ width: '60%' }} /></div>
                <span className="example-caption">Sample goal progress</span>
              </div>
            </article>
          </div>
        </section>

        <div className="container">
          <GoalPlanner />
        </div>

        <section className="section container resources-section" id="resources">
          <div className="section-heading">
            <div>
              <span className="eyebrow">A LITTLE KNOWLEDGE, A LOT OF CLARITY</span>
              <h2>Make sense of the details.</h2>
            </div>
            <a
              className="text-link"
              href="https://fermor.in/blogs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore Fermor resources <ArrowUpRight size={18} />
            </a>
          </div>

          <div className="resource-grid">
            <a
              className="resource-card"
              href="https://fermor.in/calculators"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="resource-art calculator-art" aria-hidden="true">
                <span className="math-label">A LITTLE MATH CAN HELP.</span>
                <span className="math-equation">₹ + time</span>
                <span className="art-circle"><ArrowUpRight size={28} /></span>
              </div>
              <div className="resource-content">
                <span className="eyebrow">CALCULATORS</span>
                <h3>Run the numbers before you decide.</h3>
                <p>Explore Fermor’s tools for savings, loans, and tax.</p>
                <span className="resource-action">
                  Explore calculators <ArrowUpRight size={17} />
                </span>
              </div>
            </a>

            <a
              className="resource-card"
              href="https://fermor.in/blogs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="resource-art reading-art" aria-hidden="true">
                <span className="math-label">FIND THE MEANING IN THE NUMBERS.</span>
                <span className="reading-word">Read.<br />Reflect.</span>
                <span className="art-circle"><ArrowUpRight size={28} /></span>
              </div>
              <div className="resource-content">
                <span className="eyebrow">FINANCIAL LEARNING</span>
                <h3>Get a clearer view of everyday finance.</h3>
                <p>Browse explanations and financial topics on Fermor.</p>
                <span className="resource-action">
                  Explore articles <ArrowUpRight size={17} />
                </span>
              </div>
            </a>
          </div>
        </section>

        <section className="section container faq-section" id="faq">
          <div>
            <span className="eyebrow">GOOD QUESTIONS DESERVE CLEAR ANSWERS</span>
            <h2>A few things<br />you might ask.</h2>
            <p className="section-description">
              A little context before you explore.
            </p>
          </div>

          <div className="faq-list">
            {questions.map((item) => (
              <details className="faq-item" key={item.question}>
                <summary>
                  {item.question}
                  <ChevronDown size={19} aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="closing-section container">
          <span className="eyebrow">YOUR NEXT CHAPTER STARTS WITH CLARITY</span>
          <h2>
            Less “I’ll figure it out.”
            <br />
            More “here’s my next step.”
          </h2>
          <a className="button button-lime" href="#planner">
            Start with a goal <ArrowUpRight size={19} />
          </a>
          <span className="closing-decoration" aria-hidden="true">↗</span>
        </section>
      </main>

      <footer className="footer container">
        <div className="footer-top">
          <a className="logo" href="#">
            <span className="logo-symbol"><Layers3 size={22} /></span>
            fermor<span className="logo-dot">.</span>
          </a>
          <p>Understand. Act. Grow.</p>
          <a
            className="text-link"
            href="https://fermor.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit official Fermor <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>Homepage concept by Archana · Frontend assignment</span>
        </div>
      </footer>
    </>
  )
}