const Concepto = require('../models/concepto')
const Express = require('express')
const Router = Express.Router()
const { ErrorHandler } = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
// middleware autenticacion y permisos
const { firmarYEncriptarCookie } = require('../middlewares/validadorSesionYPermisos')

const name = ''
const caption = ''

Router.get('/:id', catchAsyncErrors(getId))
Router.post('/new', catchAsyncErrors(insert))
Router.put('/:id', catchAsyncErrors(update))
Router.delete('/:id', catchAsyncErrors(del))

async function insert(req, res, next) {
  try {
    let concepto = new Concepto()
    concepto.nombre = req.body.nombre
    concepto.vigente = req.body.vigente
    await Concepto.insert(concepto)

    res.status(200).json()
  } catch (error) {
    if (error.name === 'ErrorRemotoHandler') {
      return next(error)
    }
    console.error(error)
    return next(new ErrorHandler('Error interno', 500, error.message))
  }
}

async function update(req, res, next) {
  try {
    let concepto = await Concepto.get(req.params.id)
    if (!concepto.idConcepto) {
      return next(new ErrorHandler('Concepto no encontrado', 404))
    }

    concepto.nombre = req.body.nombre
    concepto.vigente = req.body.vigente

    await Concepto.update(concepto)
    res.status(200).json()
  } catch (error) {
    if (error.name === 'ErrorRemotoHandler') {
      return next(error)
    }
    console.error(error)
    return next(new ErrorHandler('Error interno', 500, error.message))
  }
}

async function del(req, res, next) {
  try {
    let ret = await Concepto.get(req.params.id)
    if (!ret.idConcepto) {
      return next(new ErrorHandler('Concepto no encontrado', 404))
    }

    await Concepto.delete(ret)
    res.status(200).json()
  } catch (error) {
    if (error.name === 'ErrorRemotoHandler') {
      return next(error)
    }
    console.error(error)
    return next(new ErrorHandler('Error interno', 500, error.message))
  }
}

async function getId(req, res, next) {
  try {
    let ret = await Concepto.get(req.params.id)
    if (!ret.idConcepto) {
      return next(new ErrorHandler('Concepto no encontrado', 404))
    }
    res.status(200).json(ret)
  } catch (error) {
    if (error.name === 'ErrorRemotoHandler') {
      return next(error)
    }
    console.error(error)
    return next(new ErrorHandler('Error interno', 500, error.message))
  }
}

module.exports = Router
