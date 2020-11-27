
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCxKTyck2I32V8OzIrU6FCNY3FX0Qush0M",
    authDomain: "dev18-051-chat.firebaseapp.com",
    databaseURL: "https://dev18-051-chat.firebaseio.com",
    projectId: "dev18-051-chat",
    storageBucket: "dev18-051-chat.appspot.com",
    messagingSenderId: "102742728424",
    appId: "1:102742728424:web:7588ecf0c506c448a8735d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //firebaseのデーターベース（保存させる場所）を使いますよ
  // Create a root reference
  newPostRef = firebase.database().ref();

   // グローバル関数
   let mailAddress = $('#mailAddress').val();
   let password = $('#password').val();

  // 日付の取得ができた
  // console.log(date);
  // console.log(date.getFullYear() + "/" + (date.getMonth()+1)+ "/"+ date.getDate() + "/" + date.getDay());

// 新規登録処理ができた！
$("#register").on("click",function(e){
  // console.log("register")

  // ローカル
  // let mailAddress = $('#mailAddress').val();
  // let password = $('#password').val();
  console.log(mailAddress, password)
  firebase.auth().createUserWithEmailAndPassword(mailAddress, password)

  .then(function(){
    alert('登録できました！');
  })
  .catch(function(error) {
    alert('登録できません（' + error.message + '）');
  })

  // if文で書きたかったけど、何故か上手くいかず
  // function getUser(){
  //   firebase.auth().createUserWithEmailAndPassword(mailAddress, password)
  // }
  // if(getUser()==true){
  //  alert('登録できました！');
  // }
  // // else{
  // //   alert('登録できません（' + error.message + '）');
  // // }
  //   // alert('登録できました！（' + error.message + '）');
  // });
  
});


// ログイン出来てるか確認できるようにしたい
// ログイン機能の実装、できました！
$("#login").on("click",function(e){
  // let mailAddress = $('#mailAddress').val();
  // let password = $('#password').val();
  firebase.auth().signInWithEmailAndPassword(mailAddress, password)
  .then(function(){
    alert("ログインできました");
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    alert('ログインできません（' + error.message + '）');
  })
});

// 下記の仕様だとどのキーを押しても(離しても）consoleに表示される。
$("#mailAddress").on("keyup",function(e){
  // console.log("押されました");
  // このvarは何
  var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      // enterキーを離した時に表示される仕様になった！
       // alert('You pressed a "enter" key in textbox');
      //  なんでコメントにしたのにこのアラートがでるんや、、、
  firebase.auth().signInWithEmailAndPassword(mailAddress, password)
  .then(function(){
    alert("ログインできました");
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    alert('ログインできません（' + error.message + '）');
    })
  }
});

// 同じコードをpasswardにもつかってエンターを押したらログインするように
// 新規登録（register）処理はできないのか？？
// consoleすら出てこない、、、

// $("#passward").on("keyup",function(e){
//   console.log("押されました");
// });


  // var keycode = (event.keyCode ? event.keyCode : event.which);
  //   if(keycode == '13'){
  //     // enterキーを離した時に表示される仕様になった！
  //      alert('You pressed a "enter" key in textbox');
  //     //  なんでコメントにしたのにこのアラートがでるんや、、、
  // firebase.auth().signInWithEmailAndPassword(mailAddress, password)
  // .then(function(){
  //   alert("ログインできました");
  // })
  // .catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   console.log(errorMessage);
  //   alert('ログインできません（' + error.message + '）');
  //   })
  // }
// });

// ログイン機能があるならログアウトもつけないといけないのでは、、、？

$("#sendbtn").on("click",function(){
  newPostRef.push({
    // 名前とメッセージ送りましたー！
    name:$("#myName").val(),// お名前
    message:$("#imessage").val(),// テキストメッセージ
})
// なぜundifinedになるのか
// 文字列として扱われているから？たぶんこっち
// やはりstringsに変換していなかったからっぽい
$("#myName").val(""); //空にする
$("#imessage").val(""); //空にする

// 空にできた！
});

// 今はセンドボタンを押した時の処理しか書いてないよ
// 受信をさせよう
newPostRef.on("child_added", function(data){
  // cの中身はデータベースに保存されている中身ですよー。という定義
let c=data.val();
// console.log(c); console cを取得できた！
// JSONに変換する必要がある
// それをさらに文字列に変換して表示させる、、、（多分）
let strings= `<p class="message">
<p class="name">${c.name}</p>
<br><p class="ms">${c.message}</p>
</p>`;
$("#output").append(strings);
// $("#output").prepend(strings);
// 送信された日時を貼り付けます
var date=new Date();
// material iconsのところからtag_facesという名前のアイコンを呼び出します
let icons='<i class="material-icons larger">tag_faces</i>'
// dateをローカルに入れる
$("#output").append(date);
$("#output").append(icons);
console.log(icons);
});




// 以下は授業で書いたコードです。メモ及び見本
// 送信ボタンをクリックされたら次の処理をする
// $("#send").on("click", function () {
//   // データを登録で送る
//   newPostRef.push({
//     username: $("#username").val(), //名前
//     text: $("#text").val(), //テキストエリア
//   })
//   $("#text").val(""); //空にする
//   $("#username").val(""); //空にする
// });


// // const message=$("#message")
// // const form=document.querySelector("form")

// // 受信処理
// newPostRef.on("child_added", function (data) {
//   let v = data.val(); //ここに保存されたデータが全て入ってくる
//   // let k = data.key; //今回は使いません

//   // console.log(v); //vの変数に入っているオブジェクトを全てみる
//   // ここで文字列にしている
//   let str = `<p>${v.username}<br>${v.text}</p>`;

//   // console.log(date);

//   // ここでデータをhtmlに埋め込む
//   $("#output").prepend(str);
//   $("#output").prepend(date);
// })

// $("#text").on("keydown", function (e) {
//   console.log(e, "event");

//   if (e.keyCode === 13) {
//     newPostRef.push({
//       username: $("#username").val(), //名前
//       text: $("#text").val(), //テキストエリア
//     })
//     $("#text").val(""); //空にする
//     $("#username").val(""); //空にする
//   }