// 在界面加载好后执行某个函数
// 注意: 必须使用 `$()` 而不是 `document.addEventListener('DOMContentLoaded'`, 后者会让实时修改失效
$(() => {
  console.log('长安诡录界面已加载');
});

// 在界面卸载时执行某个函数
$(window).on('pagehide', () => {
  console.log('长安诡录界面已卸载');
});
