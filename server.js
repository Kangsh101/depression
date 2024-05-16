require("dotenv").config();
const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const path = require('path');
const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({  
  secret: 'mySecretKey', 
  resave: false,
  saveUninitialized: false
}));

app.use(cors({
  origin: 'http://3.37.54.62/',
  credentials: true,
  optionsSuccessStatus: 200, 
}));

app.use(express.static(path.join(__dirname, 'build')));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port :3306,
  database: 'buddy'
});

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});


connection.connect((err) => {
  if (err) {
    console.error('DB 연결 실패: ' + err.stack);
    return;
  }
  console.log('DB 연결 성공');
});

//회원가입
app.post('/api/signup', (req, res) => {
  const { username, password, email, name, birthdate, gender, phoneNumber} = req.body;

  const query = `INSERT INTO members (username, password, email, name, birthdate, gender, phoneNumber ,is_active) VALUES (?,?, ?, ?, ?, ?, ? , 1)`;

  connection.query(query, [username, password, email, name, birthdate, gender,  phoneNumber], (err, result) => {
    if (err) {
      console.error('회원가입 실패: ' + err.stack);
      res.status(500).send('회원가입 실패');
      return;
    }
    console.log('회원가입 성공');
    res.status(200).send('회원가입 성공');
  });
});

//로그인
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM members WHERE username = ? AND password = ?`;

  connection.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('로그인 실패: ' + err.stack);
      res.status(500).send('로그인 실패');
      return;
    }
    if (result.length === 0) {
      res.status(401).send('아이디 또는 비밀번호가 올바르지 않습니다.');
      return;
    }
    const user = result[0];
    if (user.is_active !== 1) {
      res.status(401).send('비활성화된 계정입니다');
      return;
    }
    req.session.userId = user.id;

    console.log('세션에 저장된 기본키:', req.session.userId);

    res.status(200).json(user);
  });
});

app.post('/api/buddy/login', (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM members WHERE username = ? AND password = ?`;

  connection.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('로그인 실패: ' + err.stack);
      res.status(500).send('로그인 실패');
      return;
    }
    if (result.length === 0) {
      res.status(401).send('아이디 또는 비밀번호가 올바르지 않습니다.');
      return;
    }
    const user = result[0];
    if (user.is_active !== 1) {
      res.status(401).send('비활성화된 계정입니다');
      return;
    }
    req.session.userId = user.id;

    console.log('세션에 저장된 기본키:', req.session.userId);

    res.status(200).json(user);
  });
});


app.get('/api/customers', (req, res) => {
  const userId = req.session.userId; 

  connection.query(
    "SELECT gender, name, phoneNumber, birthdate FROM members WHERE id = ?;",
    [userId], 
    (err, rows, fields) => {
      if (err) {
        console.error('회원 정보 조회 실패: ' + err.stack);
        res.status(500).send('회원 정보 조회 실패');
        return;
      }
      res.send(rows);
    }
  );
});


app.get('/api/cmsusers', (req, res) => {
  connection.query(
    "SELECT id, username, email, name, birthdate, gender, phoneNumber, joinDate FROM members",
    (err, rows, fields) => {
      if (err) {
        console.error('사용자 정보 조회 실패: ' + err.stack);
        res.status(500).send('사용자 정보 조회 실패');
        return;
      }
      res.json(rows);
    }
  );
});



// 아이디
app.post('/findUser', (req, res) => {
  const { name, email } = req.body;
  connection.query('SELECT username FROM members WHERE name = ? AND email = ?', [name, email], (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const username = results[0].username;
    res.json({ username });
  });
});

app.post('/findUserPhone', (req, res) => {
  const { name, phoneNumber } = req.body;
  connection.query('SELECT username FROM members WHERE name = ? AND phoneNumber = ?', [name, phoneNumber], (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const username = results[0].username;
    res.json({ username });
  });
});

// 유저 비활성하
app.put('/api/deactivateUser/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = `UPDATE members SET is_active = 0 WHERE id = ?`;

  connection.query(query, [userId], (err, result) => {
    if (err) {
      console.error('비활성화 오류:', err);
      res.status(500).send('서버 오류');
    } else {
      res.sendStatus(200);
    }
  });
});
// 유저 활성화
app.put('/api/activateUser/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = `UPDATE members SET is_active = 1 WHERE id = ?`;

  connection.query(query, [userId], (err, result) => {
    if (err) {
      console.error('활성화 오류:', err);
      res.status(500).send('서버 오류');
    } else {
      res.sendStatus(200); 
    }
  });
});
// 사용자 정보 업데이트
app.post('/api/updateuserinfo', (req, res) => {
  const userId = req.session.userId;
  const { name, gender, phoneNumber, email } = req.body;

  connection.query(
    "UPDATE members SET name = ?, gender = ?, phoneNumber = ?, email = ? WHERE id = ?",
    [name, gender, phoneNumber, email, userId],
    (err, result) => {
      if (err) {
        console.error('사용자 정보 업데이트 실패:', err);
        res.status(500).send('사용자 정보 업데이트 실패');
        return;
      }
      console.log('사용자 정보가 성공적으로 업데이트되었습니다.');
      res.status(200).send('사용자 정보가 성공적으로 업데이트되었습니다.');
    }
  );
});

app.get('/api/userinfo', (req, res) => {
  const userId = req.session.userId;

  console.log('현재 로그인된 사용자의 세션 ID:', userId);
  connection.query(
    "SELECT gender, name, phoneNumber, birthdate, email FROM members WHERE id = ?;",
    [userId], 
    (err, rows, fields) => {
      if (err) {
        console.error('회원 정보 조회 실패: ' + err.stack);
        res.status(500).send('회원 정보 조회 실패');
        return;
      }
      if (rows.length > 0) {
        res.send(rows[0]); // 첫 번째 행만 반환
      } else {
        res.status(404).send('User not found');
      }
    }
  );
});

app.post('/api/changepassword', (req, res) => {
  const userId = req.session.userId;
  const { currentPassword, newPassword } = req.body;

  connection.query(
      "SELECT * FROM members WHERE id = ? AND password = ?",
      [userId, currentPassword],
      (err, result) => {
          if (err) {
              console.error('비밀번호 변경 실패: ' + err.stack);
              res.status(500).send('비밀번호 변경 실패');
              return;
          }
          if (result.length === 0) {
              res.status(401).send('현재 비밀번호가 올바르지 않습니다.');
              return;
          }

          connection.query(
              "UPDATE members SET password = ? WHERE id = ?",
              [newPassword, userId],
              (updateErr, updateResult) => {
                  if (updateErr) {
                      console.error('비밀번호 업데이트 실패: ' + updateErr.stack);
                      res.status(500).send('비밀번호 업데이트 실패');
                      return;
                  }
                  res.status(200).send('비밀번호가 성공적으로 변경되었습니다.');
              }
          );
      }
  );
});


// 비번
app.post('/findUser1', (req, res) => {
  console.log("sadad")
  const { name, email } = req.body;
  connection.query('SELECT password FROM members WHERE name = ? AND email = ?', [name, email], (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const password  = results[0].password ;
    res.json({ password  });
  });
});

app.post('/findUserPhone2', (req, res) => {
  
  const { name, phoneNumber } = req.body;
  connection.query('SELECT password FROM members WHERE name = ? AND phoneNumber = ?', [name, phoneNumber], (error, results, fields) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const password  = results[0].password ;
    res.json({ password  });
  });
});
// 안드로이드 api
app.post('/api/buddy/login', (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM members WHERE username = ? AND password = ?`;

  connection.query(query, [username, password], (err, result) => {
      if (err) {
          console.error('로그인 실패: ' + err.stack);
          res.status(500).send('로그인 실패');
          return;
      }
      if (result.length === 0) {
          res.status(401).send('아이디 또는 비밀번호가 올바르지 않습니다.');
          return;
      }
      const user = result[0];
      if (user.is_active !== 1) {
          res.status(401).send('비활성화된 계정입니다');
          return;
      }
      req.session.userId = user.id;

      console.log('세션에 저장된 기본키:', req.session.userId);

      res.status(200).json(user);
  });
});

app.post('/api/buddy/signup', (req, res) => {
  const { username, password, email, name, birthdate, phoneNumber } = req.body;

  const insertGuardianQuery = `INSERT INTO members (username, password, email, name, birthdate, phoneNumber, is_active) VALUES (?, ?, ?, ?, ?, ?, 1)`;

  connection.query(insertGuardianQuery, [username, password, email, name, birthdate, phoneNumber], (err, result) => {
      if (err) {
          console.error('회원가입 실패: ' + err.stack);
          res.status(500).send('회원가입 실패');
          return;
      } else {
          res.status(200).send('회;원가입 성공');
      }
  });
});

app.post('/api/buddy/score/surveyscore', (req, res) => {
  const surveyScore = req.body;
  const userId = req.session.userId;

  const insertScoreQuery = `
  INSERT INTO score (surveyScore, user_id)
  SELECT ?, members.id
  FROM members
  WHERE members.id = ?;
  `;

  connection.query(insertScoreQuery, [surveyScore, userId], (err, result) => {
      if (err) {
          console.error('검사점수 추가 실패: ' + err.stack);
          res.status(500).send('검사점수 추가 실패');
          return;
      }
      res.status(200).send('검사점수 추가 성공');
  });
});


app.post('/api/buddy/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('세션 삭제 실패:', err);
      res.status(500).send('세션 삭제 실패');
      return;
    }
    console.log('세션 삭제 완료');
    res.status(200).send('로그아웃 성공');
  });
});


app.get('/api/buddy/userinfo', (req, res) => {
  // 쿠키에서 사용자 ID를 추출합니다.
  const userId = req.session.userId;
  if (!userId) {
      console.error('사용자 ID가 세션에 없습니다.');
      res.status(401).json({ error: '사용자 ID가 세션에 없습니다.' });
      return;
  }
  // 사용자 ID를 사용하여 데이터베이스에서 사용자 정보를 가져옵니다.
  connection.query(
      "SELECT username, email, password, name, birthdate, phoneNumber FROM members WHERE id = ?;",
      [userId], // userId 값을 플레이스홀더에 전달
      (err, rows, fields) => {
          if (err) {
              console.error('회원 정보 조회 실패: ' + err.stack);
              res.status(500).json({ error: '회원 정보 조회 실패' }); // JSON 형식으로 오류 응답
              return;
          }

          if (rows.length === 0) {
              console.error('사용자 정보가 없습니다.');
              res.status(404).json({ error: '사용자 정보가 없습니다.' }); // JSON 형식으로 오류 응답
              return;
          }

          // 조회된 사용자 정보를 JSON 형식으로 응답
          const user = rows[0];
          const userInfo = {
              username: user.username,
              email: user.email,
              password: user.password,
              birthdate : user.birthdate,
              name : user.name,
              phoneNumber : user.phoneNumber,
          };
          res.status(200).json(userInfo); // JSON 형식으로 사용자 정보 응답
      }
  );
});



app.get('/api/members', (req, res) => {
  connection.query(
    "SELECT * FROM MEMBERS",
    (err,rows,fileds) => {
      res.send(rows);
    }
  )
  
});

app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('세션 삭제 실패:', err);
      res.status(500).send('세션 삭제 실패');
      return;
    }
    console.log('세션 삭제 완료');
    res.status(200).send('로그아웃 성공');
  });
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = 3001;
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}`);
});