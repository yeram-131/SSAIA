// server.js 파일

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000; // API 서버를 3000번 포트로 열 거야.

// 1. MongoDB 연결
const MONGO_URI = 'mongodb+srv://syrm0310:Vo90JNSZBVtexQzc@clusterssaia.jc8e14a.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSSAIAcmd';

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB 연결 성공!'))
    .catch(err => console.error('❌ MongoDB 연결 오류:', err));

// JSON 형식의 요청 본문을 파싱하기 위한 미들웨어 설정
// 친구2가 앱에서 데이터를 POST 할 때 필요해. 지금은 GET만 하더라도 일단 넣어두자.
app.use(express.json());

// 2. 기본 라우트 (서버가 잘 작동하는지 테스트)
app.get('/', (req, res) => {
    res.send('API 서버가 잘 실행되고 있어!');
});

// server.js 파일 (2번 뒤에 추가)
const Data = require('./models/data'); // 3번에서 만든 데이터 모델 불러오기

// 4. API 라우트: 모든 데이터 가져오기
app.get('/api/data', async (req, res) => {
    try {
        // Data 모델을 사용해서 MongoDB의 모든 문서를 찾음
        const allData = await Data.find({});

        // 찾은 데이터를 JSON 형태로 앱(친구2)에게 전송
        res.status(200).json(allData);
    } catch (error) {
        console.error('데이터 조회 오류:', error);
        // 에러 발생 시 500 상태 코드와 에러 메시지 전송
        res.status(500).json({ message: '서버 오류로 데이터를 가져오지 못했어.', error: error.message });
    }
});

// 3. 서버 시작
app.listen(PORT, () => {
    console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중이야.`);
});