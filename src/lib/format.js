// Money + budget helpers used across the review/manager/budget screens.
export const money = (n) => `$${Number(n).toLocaleString('en-US')}` // $1,250

// Amount the athlete pays above their housing budget (mirrors A-01's inline calc).
export const outOfPocket = (rent, budget) => Math.max(0, rent - budget)
