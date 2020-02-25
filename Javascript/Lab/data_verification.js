
var fs = require("fs");

function emailCheck() {

  const contents = fs.readFileSync("email.json");

  const emails = JSON.parse(contents);
  const invalid = [];

  console.log('전체 메일수 : ' + emails.length);

  emails.forEach((ele, i) => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(ele)) {
      invalid.push({
        line: i+2,
        mail: ele
      });
    }
  });

  console.log(JSON.stringify(invalid));
  console.log('부적합한 이메일 갯수 : ' + invalid.length);
}

function zipcodeChange() {

  const contents = fs.readFileSync("zipcode.json");

  const zipcodes = JSON.parse(contents);
  const invalid = [];

  console.log('전체 우편번호 : ' + zipcodes.length);

  for (let i = 0; i < zipcodes.length; i++) {
    const temp = zipcodes[i];

    if (/[\d]{6}/.test(temp)) {
      zipcodes[i] = temp.substr(0, 3) + '-' + temp.substr(3);
    } else if(/[\d]{5}/.test(temp)) {

    } else {
      zipcodes[i] = "";
    }
  }

  fs.writeFile("output.json", zipcodes, 'utf8', function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log("JSON file has been saved.");
  });

}

// emailCheck();
zipcodeChange();


