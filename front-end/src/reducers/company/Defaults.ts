export const companyControllerDefault = {
  id:  undefined,
  status: 'idle',
  error: null,
  data: undefined
}

export const companyDefault = {
  list: {...companyControllerDefault},
  create: {...companyControllerDefault},
  update: {...companyControllerDefault},
  delete: {...companyControllerDefault},
  read: {...companyControllerDefault}
}