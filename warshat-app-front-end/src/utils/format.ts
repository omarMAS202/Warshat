import dayjs from "dayjs"

export function formatDate(input: Date | string | number, format = "YYYY-MM-DD") {
  return dayjs(input).format(format)
}
