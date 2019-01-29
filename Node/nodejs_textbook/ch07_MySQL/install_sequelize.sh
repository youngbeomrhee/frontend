cd /Users/whybe/WebstormProjects/jssample/nodejs_textbook/ch07_MySQL;
express learn-sequelize --view=pug;
cd learn-sequelize;
npm install;
npm i sequelize mysql2;
npm i sequelize-cli;
npx sequelize init;

vi models/index.js;
# 아래와 같이 수정
<<INDEXJS
const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
INDEXJS

# MySQL 연결
vi app.js;
# 아래 내용 추가
<<APPJS
var sequelize = require('./models').sequelize;  // require('./models') === require('./models/index.js') // index.js는 생략가
sequelize.sync();
APPJS

# model 정의
vi models/user.js;
<<USERJS
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {   // 'user' -> users라는 테이블 생성 // id를 기본키로 연결하므로 id 컬럼은 생략
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        age: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        married: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('now()')    // literal은 안에 넣은 문자를 그대로 사용할 때 쓰
        }
    }, {
        timestamp: false
    });
};
USERJS

vi models/comment.js;
<<COMMENTJS
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment', {   // 'comment' -> comments라는 테이블 생성  // id를 기본키로 연결하므로 id 컬럼은 생략
        comment: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('now()')    // literal은 안에 넣은 문자를 그대로 사용할 때 쓰
        }
    }, {
        timestamp: false
    });
};
COMMENTJS


# model과 index 연결
vi models/index.js;
# 아래 내용 추가
<<INDEXJS
db.Users = require('./user')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
INDEXJS

# 연결설정
vi config/config.js;
<<CONFIGJS
{
    "development": {
        "username": "root",
        "password": mysqlserver,
        "database": "nodejs",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "operatorsAliases": false
    }
}
CONFIGJS

# 관계설정
vi models/index.js;
# 아래 내용 추가
<<INDEXJS
db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
INDEXJS

