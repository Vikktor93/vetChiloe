import { Router } from 'express'
import { buscarDuenoPorRut } from '../controllers/duenos.controller.js'

const router = Router();

router.get('/buscar', buscarDuenoPorRut);

export default router;