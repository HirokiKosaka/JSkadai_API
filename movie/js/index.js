const btn = document.getElementById('btn');
const resultsContainer = document.getElementById('results');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalPoster = document.getElementById('modal-poster');
const modalOverview = document.getElementById('modal-overview');
const modalMemo = document.getElementById('modal-memo');
const modalSaveButton = document.getElementById('modal-save-button');
const closeButtons = document.getElementsByClassName('close-button');

btn.addEventListener('click', () => {
  const watched = document.getElementById('watched');
  watched.classList.add('hidden');
  const language = 'ja-JP'; // 取得する情報の言語を指定
  const searchText = document.getElementById('text').value;
  const apiKey = 'bd26887845b847dd40905b0a11f980a7'; // ご自身のAPIキーに置き換えてください
  const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=${apiKey}&language=${language}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      resultsContainer.innerHTML = '';

      if (data.results.length === 0) {
        resultsContainer.innerHTML = '<p>該当する映画は見つかりませんでした。</p>';
      } else {
        data.results.forEach(movie => {
          const poster = document.createElement('img');
          poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // APIレスポンスのポスターURLのプロパティに応じて適切な設定をしてください
          poster.alt = movie.title; // APIレスポンスのタイトルのプロパティに応じて適切な設定をしてください
          poster.classList.add('poster');
          poster.addEventListener('click', () => {
            openModal(movie);
          });
          resultsContainer.appendChild(poster);
        });
      }
    })
    .catch(error => {
      console.error('APIリクエストエラー:', error);
    });
});

function openModal(movie) {
  modalTitle.textContent = movie.title; // APIレスポンスのタイトルのプロパティに応じて適切な設定をしてください
  modalPoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // APIレスポンスのポスターURLのプロパティに応じて適切な設定をしてください
  modalOverview.textContent = movie.overview; // APIレスポンスのあらすじのプロパティに応じて適切な設定をしてください
  modalMemo.value = ''; // メモ欄を初期化

  modal.style.display = 'block';

  modalSaveButton.addEventListener('click', () => {
    const memo = modalMemo.value;
    saveMemo(movie, memo);
    closeModal();
  });

  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', closeModal);
  }

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

function closeModal() {
  modal.style.display = 'none';
}

function saveMemo(movie, memo) {
  const memoData = {
    movieTitle: movie.title,
    memo: memo
  };
  const memoKey = `memo_${movie.id}`; // メモを一意に識別するためのキー
  let savedMemos = localStorage.getItem('memos');
  if (savedMemos) {
    savedMemos = JSON.parse(savedMemos);
    savedMemos[memoKey] = memoData;
  } else {
    savedMemos = {
      [memoKey]: memoData
    };
  }
  localStorage.setItem('memos', JSON.stringify(savedMemos));
}

const closeButton = document.getElementById('close');
closeButton.addEventListener('click', closeModal);

function closeModal() {
  modal.style.display = 'none';
}

const submit = document.getElementById('modal-rejister');

submit.addEventListener('click', () => {

})


// const btn = document.getElementById('btn');
// const resultsContainer = document.getElementById('results');
// const modal = document.getElementById('modal');
// const modalTitle = document.getElementById('modal-title');
// const modalPoster = document.getElementById('modal-poster');
// const modalOverview = document.getElementById('modal-overview');
// const modalMemo = document.getElementById('modal-memo');
// const modalSaveButton = document.getElementById('modal-save-button');
// const closeButtons = document.getElementsByClassName('close-button');

// btn.addEventListener('click', () => {
//   const language = 'ja-JP'; // 取得する情報の言語を指定
//   const searchText = document.getElementById('text').value;
//   const apiKey = 'bd26887845b847dd40905b0a11f980a7'; // ご自身のAPIキーに置き換えてください
//   const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=${apiKey}&language=${language}`;

//   fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//       resultsContainer.innerHTML = '';

//       if (data.results.length === 0) {
//         resultsContainer.innerHTML = '<p>該当する映画は見つかりませんでした。</p>';
//       } else {
//         data.results.forEach(movie => {
//           const poster = document.createElement('img');
//           poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // APIレスポンスのポスターURLのプロパティに応じて適切な設定をしてください
//           poster.alt = movie.title; // APIレスポンスのタイトルのプロパティに応じて適切な設定をしてください
//           poster.classList.add('poster');
//           poster.addEventListener('click', () => {
//             openModal(movie);
//           });
//           resultsContainer.appendChild(poster);
//         });
//       }
//     })
//     .catch(error => {
//       console.error('APIリクエストエラー:', error);
//     });
// });

// function openModal(movie) {
//   modalTitle.textContent = movie.title; // APIレスポンスのタイトルのプロパティに応じて適切な設定をしてください
//   modalPoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // APIレスポンスのポスターURLのプロパティに応じて適切な設定をしてください
//   modalOverview.textContent = movie.overview; // APIレスポンスのあらすじのプロパティに応じて適切な設定をしてください
//   modalMemo.value = ''; // メモ欄を初期化

//   modal.style.display = 'block';

//   modalSaveButton.addEventListener('click', () => {
//     const memo = modalMemo.value;
//     saveMemo(movie, memo);
//     closeModal();
//   });

//   for (let i = 0; i < closeButtons.length; i++) {
//     closeButtons[i].addEventListener('click', closeModal);
//   }

//   window.addEventListener('click', (event) => {
//     if (event.target === modal) {
//       closeModal();
//     }
//   });
// }

// function closeModal() {
//   modal.style.display = 'none';
// }

// function saveMemo(movie, memo) {
//   const memoData = {
//     movieTitle: movie.title,
//     memo: memo
//   };
//   const memoKey = `memo_${movie.id}`; // メモを一意に識別するためのキー
//   let savedMemos = localStorage.getItem('memos');
//   if (savedMemos) {
//     savedMemos = JSON.parse(savedMemos);
//     savedMemos[memoKey] = memoData;
//   } else {
//     savedMemos = {
//       [memoKey]: memoData
//     };
//   }
//   localStorage.setItem('memos', JSON.stringify(savedMemos));
// }






// // const btn = document.getElementById('btn');
// // const resultsContainer = document.getElementById('results');
// // const modal = document.getElementById('modal');
// // const modalTitle = document.getElementById('modal-title');
// // const modalPoster = document.getElementById('modal-poster');
// // const modalOverview = document.getElementById('modal-overview');
// // const modalMemo = document.getElementById('modal-memo');
// // const modalSaveButton = document.getElementById('modal-save-button');
// // const closeButtons = document.getElementsByClassName('close-button');

// // btn.addEventListener('click', () => {
  // const language = 'ja-JP'; // 取得する情報の言語を指定
  // const searchText = document.getElementById('text').value;
  // const apiKey = 'bd26887845b847dd40905b0a11f980a7'; // ご自身のAPIキーに置き換えてください
  // const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=${apiKey}&language=${language}`;

// //   fetch(apiUrl)
// //     .then(response => response.json())
// //     .then(data => {
// //       resultsContainer.innerHTML = '';

// //       if (data.results.length === 0) {
// //         resultsContainer.innerHTML = '<p>該当する映画は見つかりませんでした。</p>';
// //       } else {
// //         data.results.forEach(movie => {
// //           const poster = document.createElement('img');
// //           poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // APIレスポンスのポスターURLのプロパティに応じて適切な設定をしてください
// //           poster.alt = movie.title; // APIレスポンスのタイトルのプロパティに応じて適切な設定をしてください
// //           poster.classList.add('poster');
// //           poster.addEventListener('click', () => {
// //             openModal(movie);
// //           });
// //           resultsContainer.appendChild(poster);
// //         });
// //       }
// //     })
// //     .catch(error => {
// //       console.error('APIリクエストエラー:', error);
// //     });
// // });

// // function openModal(movie) {
// //   modalTitle.textContent = movie.title; // APIレスポンスのタイトルのプロパティに応じて適切な設定をしてください
// //   modalPoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // APIレスポンスのポスターURLのプロパティに応じて適切な設定をしてください
// //   modalOverview.textContent = movie.overview; // APIレスポンスのあらすじのプロパティに応じて適切な設定をしてください
// //   modalMemo.value = ''; // メモ欄を初期化

// //   modal.style.display = 'block';

// //   const saveMemoHandler = () => {
// //     const memo = modalMemo.value;
// //     saveMemo(movie, memo);
// //     closeModal();
// //   };

// //   const saveButton = document.getElementById('modal-save-button');
// //   saveButton.addEventListener('click', saveMemoHandler);

// //   for (let i = 0; i < closeButtons.length; i++) {
// //     closeButtons[i].addEventListener('click', closeModal);
// //   }

// //   window.addEventListener('click', (event) => {
// //     if (event.target === modal) {
// //       closeModal();
// //     }
// //   });
// // }

// // function closeModal() {
// //   modal.style.display = 'none';
// // }

// // function saveMemo(movie, memo) {
// //   // メモの保存処理を実装してください
// //   const memoData = {
// //     movieTitle: movie.title,
// //     memo: memo
// //   };
// //   const memoKey = `memo_${movie.id}`; // メモを一意に識別するためのキー
// //   localStorage.setItem(memoKey, JSON.stringify(memoData));
// // }


// const btn = document.getElementById('btn');
// const resultsContainer = document.getElementById('results');
// const modal = document.getElementById('modal');
// const modalTitle = document.getElementById('modal-title');
// const modalPoster = document.getElementById('modal-poster');
// const modalOverview = document.getElementById('modal-overview');
// const modalMemo = document.getElementById('modal-memo');
// const modalSaveButton = document.getElementById('modal-save-button');
// const closeButtons = document.getElementsByClassName('close-button');

// btn.addEventListener('click', () => {
//   const searchText = document.getElementById('text').value;
  
//   const language = 'ja-JP'; // 取得する情報の言語を指定
//   const apiKey = 'bd26887845b847dd40905b0a11f980a7'; // ご自身のAPIキーに置き換えてください
//   const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=${apiKey}&language=${language}`;

//   fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//       resultsContainer.innerHTML = '';

//       if (data.results.length === 0) {
//         resultsContainer.innerHTML = '<p>該当する映画は見つかりませんでした。</p>';
//       } else {
//         data.results.forEach(movie => {
//           const poster = document.createElement('img');
//           poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // APIレスポンスのポスターURLのプロパティに応じて適切な設定をしてください
//           poster.alt = movie.title; // APIレスポンスのタイトルのプロパティに応じて適切な設定をしてください
//           poster.classList.add('poster');
//           poster.addEventListener('click', () => {
//             openModal(movie);
//           });
//           resultsContainer.appendChild(poster);
//         });
//       }
//     })
//     .catch(error => {
//       console.error('APIリクエストエラー:', error);
//     });
// });

// function openModal(movie) {
//   modalTitle.textContent = movie.title; // APIレスポンスのタイトルのプロパティに応じて適切な設定をしてください
//   modalPoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // APIレスポンスのポスターURLのプロパティに応じて適切な設定をしてください
//   modalOverview.textContent = movie.overview; // APIレスポンスのあらすじのプロパティに応じて適切な設定をしてください
//   modalMemo.value = ''; // メモ欄を初期化

//   modal.style.display = 'block';

//   modalSaveButton.removeEventListener('click', saveMemoHandler);


//   modalSaveButton.addEventListener('click', () => {
//     const memo = modalMemo.value;
//     saveMemo(movie, memo);
//     closeModal();
//   });

//   for (let i = 0; i < closeButtons.length; i++) {
//     closeButtons[i].addEventListener('click', closeModal);
//   }

//   window.addEventListener('click', (event) => {
//     if (event.target === modal) {
//       closeModal();
//     }

//     const saveButton = document.getElementById('modal-save-button');
//     modalSaveButton.addEventListener('click', () => {
//       function saveMemo(movie, memo) {
//         // メモの保存処理を実装してください
//         const saveMemoHandler = () => {
//           const memo = modalMemo.value;
//           saveMemo(movie, memo);
//           closeModal();
//         };
//         const memoData = {
//           movieTitle: movie.title,
//           memo: memo
//         };
//         const memoKey = `memo_${movie.id}`; // メモを一意に識別するためのキー
//         localStorage.setItem(memoKey, JSON.stringify(memoData));
//       }
//     });

    
    
//   });
// }

// const closeButton = document.getElementById('close');
// closeButton.addEventListener('click', closeModal);

// function closeModal() {
//   modal.style.display = 'none';
// }

// const submit = document.getElementById('modal-rejister');

// submit.addEventListener('click', () => {



// })


// // const btn = document.getElementById('btn');

// // btn.addEventListener('click', () => {
// //   const watched = document.getElementById('watched');
// //   watched.classList.add('hidden');

// //   const searchText = document.getElementById('text').value;

// //   // APIリクエストを行う
// //   const language = 'ja-JP'; // 取得する情報の言語を指定
// //   const apiKey = 'bd26887845b847dd40905b0a11f980a7'; // ご自身のAPIキーに置き換えてください
// //   const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=${apiKey}&language=${language}`;

// //   fetch(apiUrl)
// //     .then(response => response.json())
// //     .then(data => {
// //       // レスポンスデータを処理する
// //       const results = data.results; // APIレスポンスから結果を取得する処理を適宜変更してください

// //       const resultsContainer = document.getElementById('results');
// //       resultsContainer.innerHTML = ''; // 既存の内容をクリア

// //       if (results.length === 0) {
// //         resultsContainer.innerHTML = '<p>該当する映画は見つかりませんでした。</p>';
// //       } else {
// //         results.forEach(movie => {
// //           const movieContainer = document.createElement('div');
// //           movieContainer.classList.add('movie');

// //           const poster = document.createElement('img');
// //           poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; // APIレスポンスのポスターURLのプロパティに応じて適切な設定をしてください
// //           poster.alt = movie.title; // APIレスポンスの映画タイトルのプロパティに応じて適切な設定をしてください

// //           const title = document.createElement('h2');
// //           title.textContent = movie.title; // APIレスポンスの映画タイトルのプロパティに応じて適切な設定をしてください

// //           movieContainer.appendChild(poster);
// //           movieContainer.appendChild(title);

// //           resultsContainer.appendChild(movieContainer);
// //         });
// //       }
// //     })
// //     .catch(error => {
// //       console.error('APIリクエストエラー:', error);
// //     });
// // });

// // // ポスター要素をクリックしたときの処理
// // const posters = document.querySelectorAll('.poster');

// // posters.forEach(poster => {
// //   poster.addEventListener('click', () => {
// //     const movieId = poster.dataset.movieId; // ポスター要素のdata属性から映画IDを取得する処理を追加してください

// //     // APIリクエストを行う
// //     const apiKey = 'bd26887845b847dd40905b0a11f980a7'; // ご自身のAPIキーに置き換えてください
// //     const movieDetailsUrl = `https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=${apiKey}&language=${language}`;

// //     fetch(movieDetailsUrl)
// //       .then(response => response.json())
// //       .then(movie => {
// //         // モーダルウィンドウの要素を取得
// //         const modal = document.getElementById('modal');
// //         const modalContent = document.getElementById('modal-content');

// //         // 映画の情報をモーダルウィンドウに設定
// //         modalContent.innerHTML = `
// //           <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Movie Poster" class="modal-poster">
// //           <h2 class="modal-title">${movie.title}</h2>
// //           <p class="modal-plot">${movie.plot}</p>
// //           <textarea id="modal-memo" class="modal-memo" placeholder="メモを残す"></textarea>
// //           <button id="modal-register" class="modal-register">登録する</button>
// //         `;

// //         // ポスター要素をクリックしたときの処理
// // const posters = document.querySelectorAll('.poster');

// // posters.forEach(poster => {
// //   poster.addEventListener('click', () => {
// //     const movieId = poster.dataset.movieId;
// //     const movie = searchResults.find(result => result.id === movieId);
// //     if (movie) {
// //       // モーダルウィンドウの要素を取得
// //       const modal = document.getElementById('modal');
// //       const modalTitle = document.getElementById('modal-title');
// //       const modalPoster = document.getElementById('modal-poster');
// //       const modalOverview = document.getElementById('modal-overview');
// //       const modalMemo = document.getElementById('modal-memo');
// //       const modalSaveButton = document.getElementById('modal-save-button');

// //       // モーダルウィンドウの内容を更新
// //       modalTitle.textContent = movie.title;
// //       modalPoster.src = movie.poster;
// //       modalOverview.textContent = movie.overview;
// //       modalMemo.value = ''; // メモ欄をクリア

// //       // 登録ボタンのクリックイベントリスナーを追加
// //       modalSaveButton.addEventListener('click', () => {
// //         const memoText = modalMemo.value;
// //         // メモの保存処理などを追加することができます

// //         // モーダルウィンドウを非表示にする
// //         modal.style.display = 'none';
// //       });

// //       // モーダルウィンドウを表示
// //       modal.style.display = 'block';
// //     }
// //   });
// // });



// //         // モーダルウィンドウを表示
// //         modal.style.display = 'block';

// //         // 登録ボタンをクリックしたときの処理
// //         const registerButton = document.getElementById('modal-register');
// //         registerButton.addEventListener('click', () => {
// //           const memo = document.getElementById('modal-memo').value;
// //           // メモの内容を利用して適切な処理を行ってください
// //           console.log('メモ:', memo);

// //           // モーダルウィンドウを閉じる
// //           modal.style.display = 'none';
// //         });
// //       })
// //       .catch(error => {
// //         console.error('APIリクエストエラー:', error);
// //       });
// //   });
// // });




// // // const btn = document.getElementById('btn');

// // // btn.addEventListener('click', () => {
// // //   const watched = document.getElementById('watched');
// // //   watched.classList.add('hidden');

// // //   const searchText = document.getElementById('text').value;

// // //   // APIリクエストを行う
// // //   const apiKey = 'bd26887845b847dd40905b0a11f980a7'; // ご自身のAPIキーに置き換えてください
// // //   const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=${apiKey}`;

// // //   fetch(apiUrl)
// // //     .then(response => response.json())
// // //     .then(data => {
// // //       // レスポンスデータを処理する
// // //       const results = data.results; // APIレスポンスから結果を取得する処理を適宜変更してください

// // //       const resultsContainer = document.getElementById('results');
// // //       resultsContainer.innerHTML = ''; // 既存の内容をクリア

// // //       if (results.length === 0) {
// // //         resultsContainer.innerHTML = '<p>該当する映画は見つかりませんでした。</p>';
// // //       } else {
// // //         const ul = document.createElement('ul');
// // //         results.forEach(movie => {
// // //           const li = document.createElement('li');
// // //           li.textContent = movie.title; // APIレスポンスの結果のプロパティに応じて適切な表示内容を設定してください
// // //           ul.appendChild(li);
// // //         });
// // //         resultsContainer.appendChild(ul);
// // //       }
// // //     })
// // //     .catch(error => {
// // //       console.error('APIリクエストエラー:', error);
// // //     });
// // // });



// // // const btn = document.getElementById('btn');

// // // btn.addEventListener('click', () => {


// // //   const searchText = document.getElementById('text').value;

// // //   // APIリクエストを行う
// // //   const apiKey = 'bd26887845b847dd40905b0a11f980a7'; // ご自身のAPIキーに置き換えてください
// // //   const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=${apiKey}`;

// // //   fetch(apiUrl)
// // //     .then(response => response.json())
// // //     .then(data => {
// // //       // レスポンスデータを処理する
// // //       const results = data.results; // APIレスポンスから結果を取得する処理を適宜変更してください

// // //       const watched = document.getElementById('watched');
// // //       watched.innerHTML = ''; // 既存の内容をクリア

// // //       if (results.length === 0) {
// // //         watched.innerHTML = '<p>該当する映画は見つかりませんでした。</p>';
// // //       } else {
// // //         const ul = document.createElement('ul');
// // //         results.forEach(movie => {
// // //           const li = document.createElement('li');
// // //           li.textContent = movie.title; // APIレスポンスの結果のプロパティに応じて適切な表示内容を設定してください
// // //           ul.appendChild(li);
// // //         });
// // //         watched.appendChild(ul);
// // //       }
// // //     })
// // //     .catch(error => {
// // //       console.error('APIリクエストエラー:', error);
// // //     });
// // // });





// // // const searchInput = document.getElementById('searchInput');
// // // const searchButton = document.getElementById('searchButton');
// // // const resultsContainer = document.getElementById('results');


// // // searchButton.addEventListener('click', performSearch);

// // // function performSearch() {
// // //   const language = 'ja-JP'; // 追加: 日本語を指定
// // //   const query = searchInput.value;
// // //   fetch(`https://api.themoviedb.org/3/search/movie?api_key=bd26887845b847dd40905b0a11f980a7&query=${query}&language=${language}`)
// // //     .then(response => response.json())
// // //     .then(data => {
// // //       const results = data.results;
// // //       displayResults(results);
// // //     })
// // //     .catch(error => {
// // //       console.error('An error occurred:', error);
// // //     });
// // // }

// // // function displayResults(results) {
// // //   resultsContainer.innerHTML = '';

// // //   results.forEach(movie => {
// // //     const movieElement = document.createElement('div');
// // //     movieElement.classList.add('movie-item');

// // //     const movieTitle = document.createElement('h2');
// // //     const moviePoster = document.createElement('img');

// // //     movieTitle.textContent = movie.title;

// // //     if (movie.poster_path) {
// // //       moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
// // //     } else {
// // //       moviePoster.src = 'placeholder-image.jpg';
// // //     }

// // //     const watchButton = document.createElement('button');
// // //     watchButton.textContent = '視聴済みにする';
// // //     watchButton.addEventListener('click', () => markAsWatched(movie.id));

// // //     movieElement.appendChild(moviePoster);
// // //     movieElement.appendChild(movieTitle);

// // //     resultsContainer.appendChild(movieElement);
// // //     movieElement.appendChild(watchButton);
// // //   });
// // // }

// // // function markAsWatched(movieId) {
// // //   const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
// // //   if (!watchedMovies.includes(movieId)) {
// // //     watchedMovies.push(movieId);
// // //     localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
// // //     displayWatchedMovies();
// // //   }
// // // }

// // // function displayWatchedMovies() {
// // //   const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
// // //   const watchedMoviesContainer = document.getElementById('watchedMoviesContainer');
// // //   watchedMoviesContainer.innerHTML = '';

// // //   resultsContainer.innerHTML = '';

// // //   watchedMovies.forEach(movieId => {
// // //     // 映画情報を取得するためのリクエスト
// // //     const apiKey = 'bd26887845b847dd40905b0a11f980a7';
// // //     const language = 'ja-JP'; // 取得する情報の言語を指定

// // //     fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=${language}`)
// // //       .then(response => response.json())
// // //       .then(movie => {
// // //         // 映画情報を表示する処理
// // //         const movieElement = document.createElement('div');
// // //         movieElement.classList.add('watched-movie-item');

// // //         const movieTitle = document.createElement('h3');
// // //         movieTitle.textContent = movie.title;

// // //         movieTitle.textContent = movie.title;
// // //         movieTitle.classList.add('watched-movie-title');

// // //         movieElement.classList.add('watched-movie-item');


// // //         const moviePoster = document.createElement('img');
// // //         if (movie.poster_path) {
// // //           moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
// // //         } else {
// // //           moviePoster.src = 'placeholder-image.jpg';
// // //         }

// // //         movieElement.appendChild(moviePoster);
// // //         movieElement.appendChild(movieTitle);

// // //         resultsContainer.appendChild(movieElement);
// // //         watchedMoviesContainer.appendChild(movieElement);
// // //         movieElement.appendChild(deleteButton);

// // //       })
// // //       .catch(error => {
// // //         console.error('An error occurred:', error);
// // //       });
// // //   });
// // //   }

// // // document.addEventListener('DOMContentLoaded', () => {
// // //   displayWatchedMovies();
// // // });
