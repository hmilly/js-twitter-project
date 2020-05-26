import API from "./API.js";
// Your code here

API.getUsers().then((users) => console.log(users));
API.getTweets().then((users) => console.log(users));

console.log(
  "The current user is",
  API.whichUser.person,
  "with user id: ",
  API.whichUserId.id,
  "The last clicked User is :",
  API.clickedUser.user
);


let title = document.querySelector(".title > h2");
let at = document.querySelector(".at > div > p");
let tweetContainer = document.querySelector(".tweet-container");

API.getTweets()
  .then((tweetData) => {
    for (let i in tweetData) {
      if (tweetData[i].user.name === API.whichUser.person) {
        title.innerText = `${API.whichUser.person}`;
        at.innerText = `@${API.whichUser.person}`;
      }
      let text = document.createElement("div");
      text.className = "comment-box";
      text.innerHTML = `
        <a href=""><div class="header">
          <h5 class="userName">${tweetData[i].user.name}</h5>
          <h5>${tweetData[i].date}</h5>
        </div></a>
        <div class="content">
          <p>
          ${tweetData[i].content}
          </p>
          <p class="hash"></p>
        </div>
        <div class="footer">
          <div class="cont">
            <img src="./img/heart 1.png" class="heart" alt="heart">
            <p>${tweetData[i].likes}</p>
          </div>
          <div class="cont">
            <img src="./img/retweetgrey.png" class="retweet" alt="share symbol">
            <p>${tweetData[i].retweets}</p>
          </div>
          <div class="cont">
            <button class="msgs"><img src="./img/comment.png" alt="message boxes"></button>
            <p>${tweetData[i].comments.length}</p>
          </div>
        </div>`;
      tweetContainer.append(text);
    }
  })
  .then(tweetData => {
    let users = document.querySelectorAll(".header")
    users.forEach(u =>
      u.addEventListener("click", () => {
      API.clickedUser.removeItem('user')
      API.clickedUser.setItem("user", u.firstChild.nextElementSibling.innerText)
      u.parentNode.href = "mypage.html"
      })
      )
  })
  .then((tweetData) => {
    let likes = document.querySelectorAll(".heart");
    const once = { one: true };
    likes.forEach((like) =>
      like.addEventListener(
        "click",
        (e) => {
          e.target.src = "./img/icon.png";
        },
        once
      )
    );
  })
  .then((tweetData) => {
    let retweets = document.querySelectorAll(".retweet");
    const once = { one: true };
    retweets.forEach((tweet) =>
      tweet.addEventListener(
        "click",
        (e) => {
          e.target.src = "./img/retweet.png";
        },
        once
      )
    );
  })
  .then((tweetData) => {
    let coms = document.querySelectorAll(".msgs");

    coms.forEach(item => {
      item.addEventListener(
        "click",
        e => {
          const combox = document.createElement("div");
          combox.className = "text";
          combox.innerHTML = `
        <textarea name="comment" class="commentText" placeholder="Your comment" rows="5"></textarea>
        <div>
          <img src="./img/Arrow 1.png" alt="arrow" class="arrow"></img>
          <button class="reply">Reply</button>
        </div>`;
          e.target.offsetParent.append(combox);

          item.disabled = true;

          const arrow = combox.querySelector(".arrow")
          arrow.addEventListener("click", () => {
            combox.remove(combox)
            item.disabled = false;
          })

          const reply = combox.querySelector(".reply")
          reply.addEventListener("click", () => {
          const textcont = combox.querySelector(".commentText").value
          combox.remove(combox)
          item.disabled = false;
          })

        }
      );
    });
  });
