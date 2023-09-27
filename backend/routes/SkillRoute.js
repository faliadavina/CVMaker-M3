import express from 'express';
import { createSkill, getAllSkills, getSkillById, updateSkill, deleteSkill } from '../controllers/skillController.js';

const router = express.Router();

// Create a new skill
router.post('/skills/:id_akun', createSkill);

// Get all skills for a specific account (akun)
router.get('/skills/akun/:id_akun', getAllSkills);

// Get a skill by ID
router.get('/skills/akun/:id_akun/skill/:id_skill', getSkillById);

// Update a skill by ID for a specific account (akun)
router.patch('/skills/:id_skill', updateSkill);

// Delete a skill by ID for a specific account (akun)
router.delete('/skills/:id_skill', deleteSkill);

export default router;
