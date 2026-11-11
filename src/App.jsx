import { useState } from 'react'

const money = new Intl.NumberFormat(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function App() {
  const [amount, setAmount] = useState('')
  const [percent, setPercent] = useState('')

  const price = Number.parseFloat(amount)
  const discount = Number.parseFloat(percent)

  const amountFilled = amount.trim() !== ''
  const percentFilled = percent.trim() !== ''

  const amountOk = amountFilled && Number.isFinite(price) && price >= 0
  const percentOk =
    percentFilled &&
    Number.isFinite(discount) &&
    discount >= 0 &&
    discount <= 100

  const ready = amountOk && percentOk

  const saved = ready ? (price * discount) / 100 : 0
  const finalPrice = ready ? price - saved : 0

  let hint = ''
  if (amountFilled && !amountOk) {
    hint = 'Enter an amount of 0 or more.'
  } else if (percentFilled && !percentOk) {
    hint = 'Enter a discount between 0 and 100.'
  }

  const reset = () => {
    setAmount('')
    setPercent('')
  }

  const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/30 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100'

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 p-6">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Discount Calculator
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Enter the original amount and the discount percentage.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Original amount</span>
            <input
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="100"
              className={inputClass}
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-sm font-medium">Discount (%)</span>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              inputMode="decimal"
              value={percent}
              onChange={(event) => setPercent(event.target.value)}
              placeholder="25"
              className={inputClass}
            />
          </label>
        </div>

        {hint && (
          <p
            role="alert"
            className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-950/40 dark:text-amber-200"
          >
            {hint}
          </p>
        )}

        <div
          aria-live="polite"
          className="rounded-xl bg-teal-50 p-5 dark:bg-teal-950/40"
        >
          {ready ? (
            <dl className="space-y-3">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-sm text-slate-600 dark:text-slate-300">
                  You save
                </dt>
                <dd className="text-lg font-semibold text-teal-700 dark:text-teal-300">
                  {money.format(saved)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-t border-teal-200/70 pt-3 dark:border-teal-800/70">
                <dt className="text-sm text-slate-600 dark:text-slate-300">
                  Final price
                </dt>
                <dd className="text-2xl font-bold text-teal-800 dark:text-teal-200">
                  {money.format(finalPrice)}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Your result will appear here as you type.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={reset}
          className="w-full rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100 active:scale-[0.98] dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          Reset
        </button>
      </div>
    </main>
  )
}

export default App
