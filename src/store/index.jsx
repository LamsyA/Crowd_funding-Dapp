import moment from "moment";
import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  createModal: "scale-0",
  updateModal: "scale-0",
  backModal: "scale-0",
  deleteModal: "scale-0",
  connectedAccount: '',
  projects: [],
  project: null,
  stats: null,
  backers: [],
  loading: { show: false, msg: '' },
  alert: { show: false, msg: '', color: '' },
})

const setAlert = (msg, color = 'green') => {
  setGlobalState('loading', { show: false, msg: '' })
  setGlobalState('alert', { show: true, msg, color })
  setTimeout(() => {
    setGlobalState('alert', { show: false, msg, color })
  }, 6000)
}

const setLoadingMsg = (msg) => {
  setGlobalState('loading', { show: true, msg })
}

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    var start = text.substring(0, startChars)
    var end = text.substring(text.length - endChars, text.length)
    while (start.length + end.length < maxLength) {
      start = start + '.'
    }
    return start + end
  }
  return text
}

const daysRemaining = (days) => {
  const todaysdate = moment()
  days = Number((days + '000').slice(0))
  days = moment(days).format('YYYY-MM-DD')
  days = moment(days)
  days = days.diff(todaysdate, 'days')
  return days == 1 ? '1day' : days + 'days'
}
export {
  daysRemaining,
  truncate,
  useGlobalState,
  setGlobalState,
  getGlobalState,
  setLoadingMsg,
  setAlert
}