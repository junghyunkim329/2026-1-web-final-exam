# 문제 만들기

1. `server.html`에 있는 내용을 복사하여 사용

```html
<div class="question-grid" id="1st">
  <h3>
    리눅스 시스템의 구조 중 하드웨어를 제어하고 운영체제의 핵심 역할을 수행하는
    것은 무엇입니까?
  </h3>
  <form action="">
    <!-- 1번 보기 -->
    <div class="option">
      <input type="radio" id="shell" name="linux_struct" value="shell" />
      <label for="shell">쉘(Shell)</label>
    </div>

    <!-- 2번 보기 -->
    <div class="option">
      <input type="radio" id="kernel" name="linux_struct" value="kernel" />
      <label for="kernel">커널(Kernel)</label>
    </div>

    <!-- 3번 보기 -->
    <div class="option">
      <input type="radio" id="library" name="linux_struct" value="library" />
      <label for="library">라이브러리(Library)</label>
    </div>

    <!-- 4번 보기 -->
    <div class="option">
      <input type="radio" id="app" name="linux_struct" value="app" />
      <label for="app">응용 프로그램(Application)</label>
    </div>
  </form>
</div>
```

2. 문제 추가 시 `<div class="question-grid" id="1st">` id 변경하기
3. `<input type="radio" id="shell" name="linux_struct" value="shell" />`의 `name`처럼 `js`로 값을 가져올 수 있는 요소 넣기
4. 안 헷갈리게 주석 잘 넣기

# 참고

전공 도움 페이지는 김정현이 수정 예정입니다.
