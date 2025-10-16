// models/data.js 파일

const mongoose = require('mongoose');

// 데이터 스키마 정의 (네 엑셀/DB 구조에 맞게 필드를 바꿔야 해!)
const dataSchema = new mongoose.Schema({
    // 예시: 엑셀에 '이름', '나이', '점수' 필드가 있었다면
    //이름: { type: String, required: true },         // required는 필수 항목, 없으면 db에 저장 자체가 안되고 에러남
    //나이: { type: Number },
    //점수: { type: Number },
    //크롤링날짜: { type: Date, default: Date.now },     // default는 자동채우기 항목, 없으면 자동으로 채워서 저장
    title: { type: String },
    link: { type: String },
    date: { type: String },
    content: { type: String },

    // 💡 내용 변경 감지를 위한 해시 필드 추가
    content_hash: {
        type: String,
        required: false,
    }

}, { collection: 'co_notice' }); // <-- 컬렉션 이름 정확히 넣어!

// Data 모델을 다른 파일에서 쓸 수 있게 내보내기
module.exports = mongoose.model('Data', dataSchema);