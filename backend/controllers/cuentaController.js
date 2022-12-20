const Cuenta = require('../models/cuenta')
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
    let cuenta = new Cuenta()
    cuenta.descrip = req.body.descrip
    cuenta.vigente = req.body.vigente
    await Cuenta.insert(cuenta)

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
    let cuenta = await Cuenta.get(req.params.id)
    if (!cuenta.idCuenta) {
      return next(new ErrorHandler('Cuenta no encontrada', 404))
    }

    cuenta.descrip = req.body.descrip
    cuenta.vigente = req.body.vigente

    await Cuenta.update(cuenta)
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
    let ret = await Cuenta.get(req.params.id)
    if (!ret.idCuenta) {
      return next(new ErrorHandler('Cuenta no encontrada', 404))
    }

    await Cuenta.delete(ret)
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
    let ret = await Cuenta.get(req.params.id)
    if (!ret.idCuenta) {
      return next(new ErrorHandler('Cuenta no encontrada', 404))
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
