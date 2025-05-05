  const commentsSlider = document.querySelector('.comments-slider');
  let comments = document.querySelectorAll('.comment');
  let currentIndex = 0;

  function updateComments() {
    comments = document.querySelectorAll('.comment');
  }

  function saveCommentsToStorage() {
    const allComments = Array.from(comments).map(comment => {
      const username = comment.querySelector('.username').textContent;
      const stars = comment.querySelector('.stars').textContent.length;
      const text = comment.querySelector('.comment-body').textContent;
      return { username, stars, text };
    });
    localStorage.setItem('comments', JSON.stringify(allComments));
  }

  function loadCommentsFromStorage() {
    const savedComments = JSON.parse(localStorage.getItem('comments'));
    if (savedComments) {
      commentsSlider.innerHTML = '';
      savedComments.forEach(data => {
        const newComment = document.createElement('div');
        newComment.classList.add('comment');

        const commentHeader = document.createElement('div');
        commentHeader.classList.add('comment-header');
        commentHeader.innerHTML = `<span class="username">${data.username}</span> — <span class="stars">${'⭐'.repeat(data.stars)}</span>`;

        const commentBody = document.createElement('div');
        commentBody.classList.add('comment-body');
        commentBody.textContent = data.text;

        newComment.appendChild(commentHeader);
        newComment.appendChild(commentBody);

        commentsSlider.appendChild(newComment);
      });
      updateComments();
    }
  }

  loadCommentsFromStorage();

  setInterval(function() {
    currentIndex = (currentIndex + 1) % comments.length;
    commentsSlider.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
  }, 5000);

  const modal = document.getElementById('commentModal');
  const addCommentBtn = document.getElementById('addCommentBtn');
  const closeBtn = document.querySelector('.closeBtn');
  const submitCommentBtn = document.getElementById('submitCommentBtn');

  addCommentBtn.addEventListener('click', function() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      modal.style.display = 'block';
    } else {
      alert('Пожалуйста, войдите в аккаунт, чтобы оставить комментарий.');
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  if (submitCommentBtn) {
    submitCommentBtn.addEventListener('click', function() {
      const commentInput = document.getElementById('commentInput');
      const starInput = document.getElementById('starInput');
      const newCommentText = commentInput.value.trim();
      const starsCount = starInput.value;
      const user = localStorage.getItem('currentUser') || "Аноним";

      if (newCommentText.length > 0) {
        const newComment = document.createElement('div');
        newComment.classList.add('comment');

        const commentHeader = document.createElement('div');
        commentHeader.classList.add('comment-header');
        commentHeader.innerHTML = `<span class="username">${user}</span> — <span class="stars">${'⭐'.repeat(starsCount)}</span>`;

        const commentBody = document.createElement('div');
        commentBody.classList.add('comment-body');
        commentBody.textContent = newCommentText;

        newComment.appendChild(commentHeader);
        newComment.appendChild(commentBody);

        commentsSlider.appendChild(newComment);
        updateComments();
        saveCommentsToStorage(); // Сохраняем после добавления

        commentInput.value = '';
        modal.style.display = 'none';

        currentIndex = comments.length - 1;
        commentsSlider.style.transition = 'none';
        commentsSlider.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
        setTimeout(() => {
          commentsSlider.style.transition = 'transform 1s ease';
        }, 50);
      } else {
        alert('Пожалуйста, введите текст комментария.');
      }
    });
  }