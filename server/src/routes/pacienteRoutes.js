import { Router } from 'express';
import { crearPaciente, listarPacientes } from '../controllers/pacienteController.js';

const router = Router();

router.get('/', listarPacientes);
router.post('/', crearPaciente);

export default router;
