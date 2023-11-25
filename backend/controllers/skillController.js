import Skill from '../models/skillModel.js';
import User from '../models/akunModels.js';

import { Op } from 'sequelize';

export const createSkill = async (req, res) => {
  try {
    const id_akun = req.params.id_akun;
    const { kategori_skill, nama_skill, level, deskripsi } = req.body;

    const user = await User.findOne({
      where: {
        id_akun: id_akun,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Mengubah nama skill menjadi huruf kecil
    const nama_skill_lowercase = nama_skill.toLowerCase();

    // Check if a skill with the same name (case insensitive) already exists
    const existingSkill = await Skill.findOne({
      where: {
        id_akun,
        nama_skill: {
          [Op.iLike]: nama_skill_lowercase,
        },
      },
    });

    if (existingSkill) {
      return res.status(400).json({ message: 'Skill with the same name already exists' });
    }

    const newSkill = await Skill.create({
      id_akun,
      kategori_skill,
      nama_skill: nama_skill_lowercase,
      level,
      deskripsi,
    });

    return res.status(201).json({ success: true, skill: newSkill, message: 'Skill created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSkillById = async (req, res) => {
  try {
    const { id_akun, id_skill } = req.params;

    const skillById = await Skill.findOne({
      where: {
        id_skill: id_skill,
        id_akun: id_akun,
      },
    });

    if (skillById) {
      return res.status(200).json({ success: true, skill: skillById });
    } else {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export const getAllSkills = async (req, res) => {
  try {
    const id_akun = req.params.id_akun;

    // Find all skills for the specified user
    const userSkills = await Skill.findAll({
      where: {
        id_akun: id_akun,
      },
    });

    // Check if there are no skills for the specified user
    if (userSkills.length === 0) {
      return res.status(404).json({ success: false, message: 'No skills found' });
    }

    return res.status(200).json({ success: true, skills: userSkills });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { id_skill } = req.params;
    const fieldsToUpdate = req.body;

    const skill = await Skill.findOne({
      where: {
        id_skill: id_skill,
      },
    });

    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    // Check if the new skill name is provided and is different from the existing name
    if (fieldsToUpdate.nama_skill) {
      // Ubah nama skill baru menjadi lowercase
      const newSkillName = fieldsToUpdate.nama_skill.toLowerCase();

      // Periksa apakah nama skill yang baru (dalam lowercase) berbeda dengan nama yang sudah ada
      if (newSkillName !== skill.nama_skill.toLowerCase()) {
        const existingSkill = await Skill.findOne({
          where: {
            id_akun: skill.id_akun,
            nama_skill: newSkillName,
          },
        });

        if (existingSkill) {
          return res.status(400).json({ message: 'Skill with the same name already exists' });
        }
      }

      // Simpan nama skill yang sudah diubah menjadi lowercase
      skill.nama_skill = newSkillName;
    }

    // Update the specified fields
    for (const field in fieldsToUpdate) {
      if (Object.prototype.hasOwnProperty.call(fieldsToUpdate, field)) {
        if (field === 'nama_skill') {
          skill[field] = fieldsToUpdate[field].toLowerCase();
        } else {
          skill[field] = fieldsToUpdate[field];
        }
      }
    }

    // Save the updated skill to the database
    await skill.save();
    return res.status(200).json({ message: 'Skill updated successfully', skill });
  } catch (error) {
    console.error('Error in updateSkill:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteSkill = async (req, res) => {
  const { id_skill } = req.params;

  try {
    const skill = await Skill.findOne({
      where: {
        id_skill: id_skill,
      },
    });

    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }

    await skill.destroy();
    return res.status(200).json({ message: 'Skill Deleted Successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteAllSkillsForUser = async (req, res) => {
  const { id_akun } = req.params;

  try {
    // Delete all skills associated with the specified id_user
    await Skill.destroy({
      where: {
        id_akun: id_akun,
      },
    });

    return res.status(200).json({ success: true, msg: 'All skills for the user deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
  