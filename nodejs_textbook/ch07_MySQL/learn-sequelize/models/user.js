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