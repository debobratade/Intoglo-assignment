const mongoose = require("mongoose");
const axios = require("axios");
const XLSX = require("xlsx");
const jsontoxml = require("jsontoxml");

const isValid = function (value) {
  if (typeof value == "undefined" || value == null) return false;
  if (typeof value == "string" && value.trim().length == 0) return false;
  return true;
};

const isValidRequest = function (data) {
  if (Object.keys(data).length == 0) return false;
  return true;
};

const validName = function (name) {
  return /^[a-zA-Z]{2,30}$/.test(name);
};

const isValidMail = function (v) {
  return /^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(
    v
  );
};

const isValidMobile = function (num) {
  return /^[6789]\d{9}$/.test(num);
};

const isValidPassword = function (password) {
  if (password.length >= 8 && password.length <= 15) {
    return true;
  }
  return false;
};

const capitalize = function (str) {
  str = str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
  return str;
};

async function testAxiosXlsx(url) {
  const options = {
    url,
    responseType: "arraybuffer",
  };
  let axiosResponse = await axios(options);
  const workbook = XLSX.read(axiosResponse.data);

  let worksheets = workbook.SheetNames.map((sheetName) => {
    return {
      sheetName,
      data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]),
    };
  });

  let res = JSON.stringify(worksheets);

  console.log(res);

  return res;
}

module.exports = {
  isValid,
  validName,
  isValidMail,
  isValidRequest,
  isValidMobile,
  isValidPassword,
  testAxiosXlsx,
  capitalize,
};
