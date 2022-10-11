import moment from 'moment';

export const nameInfo = [
    {log:'#15. A4 - 15. 6F7 8010',name:'Yamahiko Miyazawa', requestedDate : new Date('2077-05-23'), operationDate : new Date('2026-04-07'), requestID : 'f2bc80ec-7f3e-4677-8e07-f9890501701e'},
    {log:'#15. A6 - 15. 0A7 8831', name:'Peter N. Brown', requestedDate : new Date('2077-07-02'), operationDate : new Date('2033-02-11'), requestID : 'e41708a8-1726-4749-9bc0-b563e52280bf'},
    {log:'#15. A7 - 15. 168 0024', name:'Antonio R. Eberhart', requestedDate :new  Date('2077-11-11'), operationDate :new Date('2031-01-12'), requestID : '717265dc-8f0b-4c49-9cc7-97673718bd8a'},
    {log:'#15. A8 - 15. 133 3520', name:'Mstislav krylova', requestedDate : new Date('2077-12-05'), operationDate : new Date('2061-12-24'), requestID : '9af16615-4f0f-4996-87bb-d7e31c0ad29e'},
    {log:'#15. A9 - 15. B44 2595', name:'Robert Schot', requestedDate : new Date('2078-01-17'), operationDate : new Date('2033-10-10'), requestID : 'd0896e60-2db7-466c-a505-6c4bc82f65dd'},
    {log:'#15. A11 - 15. FF3 1058', name:'Yi Jie Liao', requestedDate : new Date('2078-01-20'), operationDate : new Date('2050-12-23'), requestID : '1c05485f-3e98-4e6d-baf1-6981b9bedc06'},
    {log:'#15. A24 - 15. 523 1431', name:'Erica Olofsson', requestedDate : new Date('2078-03-01'), operationDate : new Date('2048-06-01'), requestID : '6e8c1821-30ee-404f-aa1f-216227dd95ae'},
    {log:'#15. A55 - 15. 22D 5444', name:'Samira Bezrukova', requestedDate : new Date('2078-05-24'), operationDate : new Date('2055-05-11'), requestID : 'b9e7fa0c-8509-4f8f-a81e-1eab31a34f34'},
    {log:'#15. B5 - 15. 3C4 7935', name:'Benika Okuta', requestedDate : new Date('2078-07-05'), operationDate : new Date('2025-08-23'), requestID : '9d815860-3958-4b2b-bb46-b08e5bf29e49'},
    {log:'#15. C2 - 15. A4D 4971', name:'Xia Tsao', requestedDate : new Date('2078-10-29'), operationDate : new Date('2025-01-01'), requestID : '5410d623-3379-49f2-b4d0-d1ad356d7b66'},
    {log:'#15. C7 - 15. 001 5527', name:'Claudia Gruenewald', requestedDate : new Date('2078-11-02'), operationDate :new Date('2055-01-01'), requestID : 'f40eba58-c2c2-49d5-96fc-b2f619bad984'},
    {log:'#15. E1 - 15. 99C 6349', name:'Philipp Schneider', requestedDate : new Date('2078-11-15'), operationDate : new Date('2031-09-15'), requestID : 'ab3bdeb2-821b-46a3-bea0-eb90b0737f8b'},
    {log:'#19. A1 - 27. CCA 0741', name:'Taishou Koda', requestedDate : new Date('2080-06-09'), operationDate : new Date('2056-07-14'), requestID : 'f3e74f13-0871-44d6-9955-a710720a45ba'},
    {log:'#19. A5 - 27. 884 7093', name:'Jaemin Park', requestedDate : new Date('2080-07-13'), operationDate : new Date('2034-09-01'), requestID : 'ca40cd8c-7041-425b-aa1d-f5ef37091a9d'},
    {log:'#19. B7 - 27. D40 3778', name:'Chappell Duperré', requestedDate :new Date('2080-08-24'), operationDate : new Date('2049-03-16'), requestID : '56e834db-86c4-490d-b2df-ce5742aa594a'},
    {log:'#19. B8 - 27. C1A 4152', name:'Mathea Røe', requestedDate : new Date('2080-10-22'), operationDate : new Date('2037-03-31'), requestID : 'b249b46a-ced6-45e0-bf7c-fc4cdd884e0e'},
    {log:'#19. D6 - 27. 239 3495', name:'Jia Yun', requestedDate : new Date('2080-11-22'), operationDate : new Date('2048-01-21'), requestID : '6570ebba-eb15-4e6d-8fd4-d05ee865018b'},
    {log:'#19. E12 - 27. D21 5763', name:'Taishou Koda', requestedDate : new Date('2080-12-01'), operationDate : new Date('2025-08-23'), requestID : '16a88a18-cd86-4bbb-af67-76faa965173e'},
    {log:'#19. F1 - 27. C3C 1446', name:'Viollette Corbin', requestedDate : new Date('2080-12-25'), operationDate : new Date('2025-12-25'), requestID : '3e43788b-dc9a-4ace-977b-886e3afffa5c'},
    {log:'#20. A1 - 25. 001 0013', name:'Joel Mennell', requestedDate : new Date('2081-03-05'), operationDate : new Date('2060-12-27'), requestID : '82a333af-a715-4325-9b45-d77d16235689'},
]

const bookInfo =[
    '321.55 대25ㄷ : p.14-1st-30th',
    '838 무292ㅈ : p.10-2nd-22nd',
    '325.1 피64ㅈ: p.186-2nd-8th',
    '808 세14ㅁ 172 : p.61-2nd-11th',
    '181.383 커877ㄴ : p.103-1st-10th',
    '372.68 손64ㅇ : p.27-4th-1st',
    '813.7 박64ㅅ: p.9-21th-5th'
]

export const getBookInfo = () => {
    const randomNumber = Math.floor(Math.random()*(6-0)+1)
    return bookInfo[randomNumber]
}

export const getSnatcherInfo = (check) => {
    const randomNumber = Math.floor(Math.random() * (19-0)+1)//0부터 19까지의 랜덤값
    const id = randomIDGenerator[0]
    const key = randomIDGenerator[1]
    const data = nameInfo[randomNumber]
    return data
}

export const randomIDGenerator = ()=>{
    const randomNumber = Math.floor(Math.random()*(9999-1000)+1000)
    const randomString = Math.random().toString(36).substring(2,11)
    console.log(randomNumber)
    return [randomNumber,randomString]
}

export const randomMapSelecter = () => {
    const randomNumber = Math.floor(Math.random()*(2-0)+1)
    return randomNumber
}   

export const test = () => {
    console.log('?')
}

