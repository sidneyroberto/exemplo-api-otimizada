export type Params = {
  page: number
  perPage: number
}

export const getParams = (requestParams: any): Params => {
  const { page, perPage } = requestParams

  let pageValue = Number(page)
  let perPageValue = Number(perPage)

  if (isNaN(pageValue)) {
    pageValue = 1
  }

  if (isNaN(perPageValue)) {
    perPageValue = Number(process.env.DEFAULT_PER_PAGE)
  }

  const params: Params = {
    page: pageValue,
    perPage: perPageValue,
  }

  return params
}
