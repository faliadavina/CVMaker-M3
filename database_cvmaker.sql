CREATE TABLE data_diri (
    id_user SERIAL PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    tempat_lahir VARCHAR(255) NOT NULL,
    tanggal_lahir DATE NOT NULL,
    alamat VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    telp VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    sosial_media VARCHAR(255) NOT NULL,
    linkedin VARCHAR(255) NOT NULL
);

CREATE TABLE data_pendidikan (
    id_pend SERIAL PRIMARY KEY,
    id_user INT REFERENCES data_diri(id_user),
    jenjang VARCHAR(255) NOT NULL,
    nama_sekolah VARCHAR(255) NOT NULL,
    jurusan VARCHAR(255) NOT NULL,
    tahun_masuk INT NOT NULL,
    tahun_lulus INT NOT NULL
);

CREATE TABLE data_organisasi (
    id_org SERIAL PRIMARY KEY,
    id_user INT REFERENCES data_diri(id_user),
    nama_organisasi VARCHAR(255) NOT NULL,
    jabatan VARCHAR(255) NOT NULL,
    periode VARCHAR(255) NOT NULL,
    deskripsi_jabatan VARCHAR(255) NOT NULL
);

CREATE TYPE kategori AS ENUM ('softskill','hardskill');

CREATE TABLE data_skill (
    id_skill SERIAL PRIMARY KEY,
    id_user INT REFERENCES data_diri(id_user),
    kategori_skill kategori NOT NULL,
    nama_skill VARCHAR(255) NOT NULL,
    deskripsi VARCHAR(255) NOT NULL,
    level VARCHAR(255) NOT NULL
);

CREATE TABLE data_portofolio (
    id_porto SERIAL PRIMARY KEY,
    id_user INT REFERENCES data_diri(id_user),
    portofolio BYTEA NOT NULL,
	deskripsi VARCHAR(255)
);

CREATE TABLE data_akun (
    id_akun SERIAL PRIMARY KEY,
    id_user INT REFERENCES data_diri(id_user),
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role INT NOT NULL
);

SELECT * FROM data_diri;