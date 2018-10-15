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