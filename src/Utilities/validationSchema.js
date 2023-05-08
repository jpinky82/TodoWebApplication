import * as Yup from 'yup'

const catSchema = Yup.object().shape({
    catName: Yup.string().max(25, '25 Character Maximum for this field').required('Required'),
    catDesc: Yup.string().max(100, '100 Character Maximum for this field')
})

const todoSchema = Yup.object().shape({
    name: Yup.string().max(100, '100 Character Maximum for this field').required('Required'),
    categoryId: Yup.number().required()
})

export {catSchema, todoSchema}