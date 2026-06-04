function signUp() {
  const id = document.getElementById('signup-id').value
  const pw = document.getElementById('signup-pw').value
  if (!id || !pw) {
    alert('아이디와 비밀번호를 입력하세요.')
    return
  }
  const existing = localStorage.getItem('user_' + id)
  // 중복 아이디 체크
  if (existing) {
    alert('중복된 아이디입니다.')
    return
  }
  localStorage.setItem('user_' + id, pw)
  alert('회원가입 성공!')
  location.href = 'login.html'
}

function logIn() {
  const id = document.getElementById('login-id').value
  const pw = document.getElementById('login-pw').value
  const storedpw = localStorage.getItem('user_' + id)

  if (storedpw && storedpw === pw) {
    sessionStorage.setItem('loggedInUser', id)
    alert('로그인 성공')
    location.href = './mypage.html'
  } else {
    alert('로그인 실패: 아이디 또는 비밀번호를 확인하세요.')
  }
}

function logOut() {
  sessionStorage.removeItem('loggedInUser')
}

// 페이지가 로드될 때 마이페이지 환영 문구 세팅
window.addEventListener('DOMContentLoaded', () => {
  const welcome = document.getElementById('welcome')
  const user = sessionStorage.getItem('loggedInUser')
  if (welcome && user) {
    welcome.innerText = user + '님 환영합니다!'
  }

  const logoutEl = document.getElementById('logout')
  if (logoutEl) {
    if (user) {
      logoutEl.innerText = '로그아웃'
      logoutEl.addEventListener('click', () => {
        logOut()
        location.href = '../../index.html'
      })
    } else {
      logoutEl.innerText = ''
    }
  }
  // mypage-link 표시 토글
  const mypageLinks = document.querySelectorAll('.mypage-link')
  if (mypageLinks.length) {
    mypageLinks.forEach((el) => {
      el.style.display = user ? '' : 'none'
    })
  }
  // 헤더의 로그인 링크 숨김 처리
  const loginBox = document.querySelector('.header-right .login')
  if (loginBox) {
    loginBox.style.display = user ? 'none' : ''
  }
})
