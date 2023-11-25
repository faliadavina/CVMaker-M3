import UserDB from "../models/usersModel.js";
import AkunDB from "../models/akunModels.js";
import path from "path";
import fs from "fs";
import bcrypt from 'bcryptjs';

// Create user
export const createUser = async (req, res) => {
    try {
        const { nama, profesi, tempat_lahir, tanggal_lahir, alamat, status, telp, sosial_media, twitter, linkedin, deskripsi } = req.body;
        const { id_akun } = req.params;
        const link_sosmed = `https://www.instagram.com/${sosial_media}/`;
        const link_twitter = `https://twitter.com/${twitter}/`;

        const userAccountById = await AkunDB.findOne({
            where:{
                id_akun : id_akun
            }
        })
        const email = userAccountById.email;
        
        if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
        //const profile_title = req.body.title;
        const profile_title = "profile-pict"
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileNameWithoutExtension = path.basename(file.name, path.extname(file.name));
        const hashedFileName = await bcrypt.hash(fileNameWithoutExtension, 10); 
        const sanitizedFileName = hashedFileName.replace(/\//g, '_');       
        const fileName = sanitizedFileName + ext;
        const url = `${req.protocol}://${req.get("host")}/profilePict/${fileName}`;
        const allowedType = ['.png','.jpg','.jpeg'];

        console.log(email);

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});
    
        file.mv(`./public/profilePict/${fileName}`, async(err)=>{
            if(err) return res.status(500).json({msg: err.message});
            try {
                // await Product.create({name: name, image: fileName, url: url});
                const newUser = await UserDB.create({
                    id_akun,
                    nama,
                    profesi,
                    tempat_lahir,
                    tanggal_lahir,
                    alamat,
                    status,
                    telp,
                    email,
                    sosial_media,
                    twitter,
                    linkedin,
                    deskripsi,
                    profile_title : profile_title,
                    profile_pict : fileName,
                    url: url,
                    link_sosmed : link_sosmed,
                    link_twitter : link_twitter
                });
        
                res.json(newUser);
                res.status(201).json({msg: "Product Created Successfuly"});
            } catch (error) {
                console.log(error.message);
            }
        })

    } catch (err) {
        console.error(err);
        res.json({ error: "Internal server error" });
    }
}


export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await UserDB.findAll();

        res.json(allUsers);
    } catch (err) {
        console.error(err);
        res.json({ error: "Internal server error" });
    }
};

export const getUserById = async(req, res)=>{
    try {
    
        const userById = await UserDB.findOne({
            where:{
                id_akun : req.params.id_akun
            }
        })

        res.json(userById);
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUser = async (req, res) => {
    try {
      const { id_akun } = req.params;
      const fieldsToUpdate = req.body;
  
      const link_sosmed = `https://www.instagram.com/${fieldsToUpdate.sosial_media}/`;
      const link_twitter = `https://twitter.com/${fieldsToUpdate.twitter}/`;

      const user = await UserDB.findOne({
        where: {
          id_akun: id_akun
        }
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      let fileName = "";
      if(req.files === null){
          fileName = user.profile_pict;
          console.log(fileName);
      }else{
          const file = req.files.file;
          const fileSize = file.data.length;
          const ext = path.extname(file.name);
          const fileNameWithoutExtension = path.basename(file.name, path.extname(file.name));
          const hashedFileName = await bcrypt.hash(fileNameWithoutExtension, 10); 
          const sanitizedFileName = hashedFileName.replace(/\//g, '_');       
          fileName = sanitizedFileName + ext;
          const allowedType = ['.png','.jpg','.jpeg'];
  
          if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
          if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});
  
          const filepath = `./public/profilePict/${user.profile_pict}`;
          fs.unlinkSync(filepath);

          console.log(fileName);
  
          file.mv(`./public/profilePict/${fileName}`, (err)=>{
              if(err) return res.status(500).json({msg: err.message});
          });
      }

      const url = `${req.protocol}://${req.get("host")}/profilePict/${fileName}`;
      user.url = url;
      user.profile_pict = fileName;
      user.link_sosmed = link_sosmed;
      user.link_twitter = link_twitter;
  
      // Update the specified fields
      for (const field in fieldsToUpdate) {
        if (Object.prototype.hasOwnProperty.call(fieldsToUpdate, field)) {
          // Update each specified field
          user[field] = fieldsToUpdate[field];
        }
      }
  
      // Save the updated data diri to the database
      await user.save();
      return res.json(user);
    } catch (error) {
      console.error('Error in updateDataDiri:', error.message);  // Log the error message
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export const deleteUser = async(req, res)=>{
    const user = await UserDB.findOne({
        where:{
            id_user : req.params.id_user
        }
    });
    if(!user) {
        res.json({error : "No Data Found"})
    }

    try {
        await UserDB.destroy({
            where:{
                id_user : req.params.id_user
            }
        });
        res.json({msg : "User Deleted Successfuly"});

    } catch (error) {
        console.log(error.message);
    }
}