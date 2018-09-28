/**
 * Created by whybe on 2018. 9. 24..
 */
const path = require('path'),
    utils = require('../../util/utils'),
    fileName = __filename;

console.log('path.sep ->', path.sep);
console.log('path.delimiter ->', path.delimiter);

console.log('-----------------------------------');
console.log('fileName ->', fileName);
console.log('path.dirname(fileName) ->', path.dirname(fileName));
console.log('path.extname(fileName) ->', path.extname(fileName));
console.log('path.basename(fileName) ->', path.basename(fileName));
console.log('path.basename(fileName, path.extname(fileName)) ->', path.basename(fileName, path.extname(fileName)));
console.log('-----------------------------------');
console.log('path.parse(fileName) ->', path.parse(fileName));
console.log('path.format(path.parse(fileName)) ->', path.format(path.parse(fileName)));
console.log('path.normalize("C://users\\\\zerocho\\\\path.js") ->', path.normalize("C://users\\\\zerocho\\\\path.js"));
console.log('-----------------------------------');
console.log('path.isAbsolute("/Users") ->', path.isAbsolute("/Users"));
console.log('path.isAbsolute("./home") ->', path.isAbsolute("./home"));
console.log('-----------------------------------');
console.log('path.relative("/Users/whybe/WebstormProjects/jssample/nodejs_textbook/ch_03_node_API/3.5.2_path", "/Users") ->', path.relative("/Users/whybe/WebstormProjects/jssample/nodejs_textbook/ch_03_node_API/3.5.2_path", "/Users"));
console.log('path.join(__dirname, "..", "..", "/ch_03_node_API", ".", "/3.5.2_path") ->', path.join(__dirname, "..", "..", "/ch_03_node_API", ".", "/3.5.2_path")); // "/"를 만나면 상대경로로 인식 : /Users/whybe/WebstormProjects/jssample/nodejs_textbook/ch_03_node_API/3.5.2_path
console.log('path.resolve(__dirname, "..", "ch_03_node_API", ".", "/3.5.2_path") ->', path.resolve(__dirname, "..", "ch_03_node_API", ".", "/3.5.2_path")); // "/"를 만나면 절대경로로 인식해서 앞의 경로를 무시 : /3.5.2_path

console.log();
console.log('전체--------------------------------')
console.log(path);