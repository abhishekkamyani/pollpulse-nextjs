export const formatDateTimeValue = (value?: Date | string) => {
  if (!value) return ""

  if (typeof value === "string") {
    const trimmedValue = value.trim()
    if (!trimmedValue) return ""

    const normalizedDate = new Date(trimmedValue)
    if (!Number.isNaN(normalizedDate.getTime())) {
      const year = normalizedDate.getFullYear()
      const month = `${normalizedDate.getMonth() + 1}`.padStart(2, "0")
      const day = `${normalizedDate.getDate()}`.padStart(2, "0")
      const hours = `${normalizedDate.getHours()}`.padStart(2, "0")
      const minutes = `${normalizedDate.getMinutes()}`.padStart(2, "0")

      return `${year}-${month}-${day}T${hours}:${minutes}`
    }

    return trimmedValue
  }

  const year = value.getFullYear()
  const month = `${value.getMonth() + 1}`.padStart(2, "0")
  const day = `${value.getDate()}`.padStart(2, "0")
  const hours = `${value.getHours()}`.padStart(2, "0")
  const minutes = `${value.getMinutes()}`.padStart(2, "0")

  return `${year}-${month}-${day}T${hours}:${minutes}`
}