// リハウス アプリ共通JavaScript
document.addEventListener('DOMContentLoaded', () => {
  console.log('リハウス アプリが読み込まれました。');

  // 必要に応じて共通処理（動的イベント等）を記述
  const alertBox = document.querySelector('.alert-box');
  if (alertBox) {
    setTimeout(() => {
      // 案内表示の自動消失等の処理枠
    }, 5000);
  }
});
