import Portofolio from "../models/PortoModel.js";
import path from "path";
import fs from "fs";

export const getAllPorto = async (req, res) => {
    try {
        const portofolio = await Portofolio.findAll();
        res.json(portofolio);
    } catch (error) {
        console.log(error.message);
        res.json({ error: "Internal server error" });
    }
}

export const getPortoById = async (req, res) => {
    try {
        const response = await Portofolio.findAll({
            where: {
                id_akun: req.params.id_akun
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const savePorto = (req, res) => {
    if (req.files === null || req.files === undefined) return res.status(400).json({ msg: "No File Uploaded" });
    const judul = req.body.judul; // Field judul yang ditambahkan
    const deskripsi = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const { id_akun } = req.params;
    const url = `${req.protocol}://${req.get("host")}/filePorto/${fileName}`;
    const allowedType = ['.jpg', '.png', '.jpeg', 'gif', '.pdf', '.mp4', '.webm', '.mp3', '.wav'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid File" });
    if (fileSize > 1000000000) return res.status(422).json({ msg: "File must be less than 5MB" });

    file.mv(`./public/filePorto/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Portofolio.create({ id_akun, judul, portofolio: fileName, deskripsi, url });
            res.status(201).json({ msg: "Portofolio Created Successfully" });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: "Internal server error" });
        }
    });
}

export const updatePorto = async (req, res) => {
    const id_porto = req.params.id_porto;
    try {
        const portofolio = await Portofolio.findOne({
            where: { id_porto }
        });

        if (!portofolio) return res.status(404).json({ msg: "No Data Found" });

        let fileName = portofolio.portofolio;
        if (req.files !== null) {
            const file = req.files.file;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            fileName = file.md5 + ext;
            const allowedType = ['.jpg', '.png', '.jpeg', '.pdf'];

            if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid File" });
            if (fileSize > 5000000) return res.status(422).json({ msg: "File must be less than 5MB" });

            const filepath = `./public/filePorto/${portofolio.portofolio}`;
            fs.unlinkSync(filepath);

            file.mv(`./public/filePorto/${fileName}`, (err) => {
                if (err) return res.status(500).json({ msg: err.message });
            });
        }

        const judul = req.body.judul;
        const deskripsi = req.body.title;
        const url = `${req.protocol}://${req.get("host")}/filePorto/${fileName}`;

        await Portofolio.update({ judul, portofolio: fileName, deskripsi, url }, { where: { id_porto } });
        res.status(200).json({ msg: "Portofolio updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export const deletePorto = async (req, res) => {
    const id_porto = req.params.id_porto;
    try {
        const portofolio = await Portofolio.findOne({
            where: { id_porto }
        });

        if (!portofolio) return res.status(404).json({ msg: "No Data Found" });

        const filepath = `./public/filePorto/${portofolio.portofolio}`;
        fs.unlinkSync(filepath);

        await Portofolio.destroy({
            where: { id_porto }
        });

        res.status(200).json({ msg: "Portofolio deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
}