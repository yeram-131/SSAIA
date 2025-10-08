// models/data.js ����

const mongoose = require('mongoose');

// ������ ��Ű�� ���� (�� ����/DB ������ �°� �ʵ带 �ٲ�� ��!)
const dataSchema = new mongoose.Schema({
    // ����: ������ '�̸�', '����', '����' �ʵ尡 �־��ٸ�
    //�̸�: { type: String, required: true },         // required�� �ʼ� �׸�, ������ db�� ���� ��ü�� �ȵǰ� ������
    //����: { type: Number },
    //����: { type: Number },
    //ũ�Ѹ���¥: { type: Date, default: Date.now },     // default�� �ڵ�ä��� �׸�, ������ �ڵ����� ä���� ����
    title: { type: String },
    link: { type: String },
    date: { type: String },
    content: { type: String },

}, { collection: 'notices' }); // <-- �÷��� �̸� ��Ȯ�� �־�!

// Data ���� �ٸ� ���Ͽ��� �� �� �ְ� ��������
module.exports = mongoose.model('Data', dataSchema);