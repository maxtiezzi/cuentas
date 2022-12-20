const Db = require('../utils/db');
const { ErrorHandler } = require('../utils/errorHandler');
class Concepto {
    constructor(idConcepto, nombre, vigente) {
        this.idConcepto = idConcepto
        this.nombre = nombre
        this.vigente = vigente
    }

    static async get(id) {
        try {
            var rta = await Db.llamarSP('getConcepto', { idConcepto: id })
            var ret = new Concepto()
            if (rta && rta[0] && rta[0][0]) {
                ret.idConcepto = rta[0][0].idConcepto
                ret.nombre = rta[0][0].nombre
                ret.vigente = rta[0][0].vigente
            }
            return ret;
        } catch (error) {
            throw error
        }
    }

    static async insert(obj) {
        if (!(obj instanceof Concepto)) { throw new ErrorHandler('Error parametros API', 400); }
        try {
            delete obj.idConcepto
            var rta = await Db.llamarSP('insertConcepto', obj);
        } catch (e) {
            throw e
        }
    }

    static async update(obj) {
        if (!(obj instanceof Concepto)) { throw new ErrorHandler('Error parametros API', 400); }
        try {
            var rta = await Db.llamarSP('updateConcepto', obj);
        } catch (e) {
            throw e
        }
    }

    static async delete(obj) {
        if (!(obj instanceof Concepto)) { throw new ErrorHandler('Error parametros API', 400); }
        try {
            delete obj.nombre
            delete obj.vigente
            var rta = await Db.llamarSP('deleteConcepto', obj);
        } catch (e) {
            throw e
        }
    }

}


module.exports = Concepto