/**
 * 블로그 포스트 이미지 업데이트 스크립트
 * 준비한 이미지 파일의 URL을 블로그 포스트에 추가합니다.
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// 데이터베이스 경로
const dbPath = path.join(__dirname, '..', '..', 'mnps', 'mnps-service', 'blog.db');

if (!fs.existsSync(dbPath)) {
  console.error('블로그 데이터베이스를 찾을 수 없습니다:', dbPath);
  process.exit(1);
}

// 명령줄 인자 처리
const args = process.argv.slice(2);

if (args.length === 0) {
  // 인자가 없으면 포스트 목록만 표시
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('데이터베이스 연결 오류:', err);
      process.exit(1);
    }

    db.all('SELECT id, title, image FROM posts ORDER BY id', [], (err, rows) => {
      if (err) {
        console.error('쿼리 오류:', err);
        db.close();
        return;
      }

      console.log('\n=== 블로그 포스트 목록 ===\n');
      rows.forEach(post => {
        console.log(`ID ${post.id}: ${post.title}`);
        console.log(`  현재 이미지: ${post.image || '(없음)'}`);
      });

      console.log('\n=== 이미지 업데이트 대상 포스트 ===\n');
      console.log('✅ ID 8: 공감 능력의 결여: 차가운 공감(Cold Empathy)');
      console.log('✅ ID 16: 그림자 통합(Integrate the Shadow): 칼 융의 해법');
      
      db.close();
      console.log('\n사용법:');
      console.log('  node update-blog-images.js <post_id> <image_url>');
      console.log('\n예시:');
      console.log('  node update-blog-images.js 8 https://example.com/cold-empathy.jpg');
      console.log('  node update-blog-images.js 16 https://example.com/shadow-integration.jpg');
    });
  });
} else if (args.length === 2) {
  // 이미지 업데이트
  const postId = parseInt(args[0]);
  const imageUrl = args[1];

  if (isNaN(postId)) {
    console.error('포스트 ID는 숫자여야 합니다:', args[0]);
    process.exit(1);
  }

  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('데이터베이스 연결 오류:', err);
      process.exit(1);
    }

    // 먼저 포스트 확인
    db.get('SELECT id, title FROM posts WHERE id = ?', [postId], (err, post) => {
      if (err) {
        console.error('쿼리 오류:', err);
        db.close();
        return;
      }

      if (!post) {
        console.error(`포스트 ID ${postId}를 찾을 수 없습니다.`);
        db.close();
        process.exit(1);
      }

      console.log(`\n포스트 확인: "${post.title}" (ID: ${post.id})`);
      console.log(`이미지 URL 업데이트: ${imageUrl}\n`);

      // 이미지 URL 업데이트
      db.run('UPDATE posts SET image = ? WHERE id = ?', [imageUrl, postId], function(err) {
        if (err) {
          console.error('이미지 업데이트 오류:', err);
          db.close();
          return;
        }

        console.log(`✅ 이미지가 성공적으로 업데이트되었습니다!`);
        console.log(`   변경된 행 수: ${this.changes}`);
        
        // 업데이트 확인
        db.get('SELECT image FROM posts WHERE id = ?', [postId], (err, updated) => {
          if (err) {
            console.error('확인 쿼리 오류:', err);
          } else {
            console.log(`   새로운 이미지 URL: ${updated.image}`);
          }
          db.close();
        });
      });
    });
  });
} else {
  console.error('인자 개수가 올바르지 않습니다.');
  console.log('사용법: node update-blog-images.js <post_id> <image_url>');
  process.exit(1);
}
