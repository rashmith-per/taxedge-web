export interface SelectOption {
  value: string
  label: string
}

const toOption = (value: string): SelectOption => ({ value, label: value })

/** Indian financial year (April–March) that contains the given date, as its starting year */
const fyStartYear = (date: Date): number => (date.getMonth() >= 3 ? date.getFullYear() : date.getFullYear() - 1)
const fyLabel = (startYear: number): string => `FY ${startYear}-${String(startYear + 1).slice(-2)}`

const today = new Date()
const currentFyStart = fyStartYear(today)

export const GST_START_YEAR = 2017
export const GST_END_YEAR = 2027

export const CURRENT_FINANCIAL_YEAR = fyLabel(currentFyStart)

/** Financial years from GST inception (FY 2017-18) up to FY 2027-28 */
export const FINANCIAL_YEAR_OPTIONS: SelectOption[] = Array.from(
  { length: GST_END_YEAR - GST_START_YEAR + 1 },
  (_, index) => toOption(fyLabel(GST_START_YEAR + index))
)

export const FILING_FREQUENCY_OPTIONS = [
  { id: 'Monthly', label: 'Monthly' },
  { id: 'Quarterly', label: 'Quarterly' },
  { id: 'Annual', label: 'Annual' },
]

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

/** All 12 months of the year without mentioning the year */
export const MONTHLY_PERIOD_OPTIONS: SelectOption[] = MONTHS.map((month) => toOption(month))

/** Four quarters of the financial year */
export const QUARTERLY_PERIOD_OPTIONS: SelectOption[] = [
  ['Quarter 1', 'Apr', 'Jun'],
  ['Quarter 2', 'Jul', 'Sep'],
  ['Quarter 3', 'Oct', 'Dec'],
  ['Quarter 4', 'Jan', 'Mar'],
].map(([name, from, to]) => toOption(`${name} (${from} - ${to})`))

/** Annual returns for the current and previous financial year */
export const ANNUAL_PERIOD_OPTIONS: SelectOption[] = [0, 1].map((back) => toOption(`${fyLabel(currentFyStart - back)} Annual Return`))

export const RETURN_PERIOD_OPTIONS: SelectOption[] = [
  ...MONTHLY_PERIOD_OPTIONS,
  ...QUARTERLY_PERIOD_OPTIONS,
]

export const RETURN_TYPE_OPTIONS: SelectOption[] = [
  { value: 'gstr1', label: 'GSTR-1 (Outward Supplies)' },
  { value: 'gstr3b', label: 'GSTR-3B (Monthly Summary)' },
]

export const FILING_TYPE_OPTIONS = [
  {
    id: 'regular' as const,
    title: 'Regular Return',
    description: 'File your GST return with actual details',
  },
  {
    id: 'nil' as const,
    title: 'Nil Return',
    description: 'File a nil return if you have no business activity',
  },
]

export const TAX_CALCULATION_METHOD_OPTIONS = [
  {
    id: 'ca_calculate' as const,
    title: 'Let TaxEdge CA calculate from documents',
    description: 'Upload your invoices & GSTR-2B; our CA computes sales, purchases & ITC',
  },
  {
    id: 'estimated_figures' as const,
    title: 'I already have estimated figures (Optional)',
    description: 'Quickly provide estimated sales, purchases, or ITC summary',
  },
]
