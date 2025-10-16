// server.js 파일

// require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
let db;
const DB_NAME = "schoolDB"; // 👈 네 데이터베이스 이름을 여기에 넣어줘

const app = express();
const PORT = process.env.PORT || 3000;

// 1. MongoDB 연결 (MongoClient로 변경)
MongoClient.connect(process.env.MONGO_URI)
    .then(client => {
        // 💡 연결 성공 시 DB 객체를 저장해 둠
        db = client.db(DB_NAME);
        console.log('✅ MongoDB 연결 성공!');
        // 3. 서버 시작을 연결 후에 해야 함
        app.listen(PORT, () => {
            console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중이야.`);
        });
    })
    .catch(err => console.error('❌ MongoDB 연결 오류:', err));


// JSON 형식의 요청 본문을 파싱하기 위한 미들웨어 설정
app.use(express.json());


// 2. 기본 라우트 (서버가 잘 작동하는지 테스트)
app.get('/', (req, res) => {
    res.send('API 서버가 잘 실행되고 있어!');
});


// 4. API 라우트: 사이트 A 데이터 가져오기
app.get('/api/siteA', async (req, res) => { // 👈 주소 변경!
    if (!db) {
        return res.status(500).json({ message: 'DB 연결이 아직 안 됐어.' });
    }
    try {
        // 💡 DB 객체를 사용해서 컬렉션 이름을 직접 지정
        const siteAData = await db.collection('co_notice').find({}).toArray();
        res.status(200).json(siteAData);
    } catch (error) {
        console.error('사이트 A 데이터 조회 오류:', error);
        res.status(500).json({ message: '서버 오류로 데이터를 가져오지 못했어.', error: error.message });
    }
});

//// 📌 사이트 B도 추가해 줘야겠지?
//app.get('/api/siteB', async (req, res) => {
//    if (!db) {
//        return res.status(500).json({ message: 'DB 연결이 아직 안 됐어.' });
//    }
//    try {
//        // 💡 컬렉션 이름만 바꿔주면 됨!
//        const siteBData = await db.collection('notices_siteB').find({}).toArray();
//        res.status(200).json(siteBData);
//    } catch (error) {
//        console.error('사이트 B 데이터 조회 오류:', error);
//        res.status(500).json({ message: '서버 오류로 데이터를 가져오지 못했어.', error: error.message });
//    }
//});
